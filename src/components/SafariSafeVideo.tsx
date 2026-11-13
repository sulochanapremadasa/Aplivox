import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Play } from 'lucide-react';

interface SafariSafeVideoProps {
  src: string;
  className?: string;
  containerClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  externalRef?: (el: HTMLVideoElement | null) => void;
  onPlayStateChange?: (playing: boolean) => void;
}

export const SafariSafeVideo: React.FC<SafariSafeVideoProps> = ({
  src,
  className = '',
  containerClassName = 'w-full h-full',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  externalRef,
  onPlayStateChange,
}) => {
  const internalRef = useRef<HTMLVideoElement | null>(null);
  const [activeSrc, setActiveSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [needsUserTap, setNeedsUserTap] = useState<boolean>(false);
  const blobUrlRef = useRef<string | null>(null);
  const triedBlobFallbackRef = useRef<boolean>(false);

  const setVideoRef = (el: HTMLVideoElement | null) => {
    internalRef.current = el;
    if (externalRef) externalRef(el);
  };

  const triggerBlobFallback = async () => {
    if (triedBlobFallbackRef.current) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    triedBlobFallbackRef.current = true;
    try {
      const response = await fetch(src, { credentials: 'same-origin' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('Received HTML instead of video');
      }
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: 'video/mp4' });
      const objectUrl = URL.createObjectURL(blob);
      blobUrlRef.current = objectUrl;
      setActiveSrc(objectUrl);
      setHasError(false);

      requestAnimationFrame(() => {
        const el = internalRef.current;
        if (el) {
          el.load();
          if (autoPlay) {
            el.defaultMuted = true;
            el.muted = true;
            el.play()
              .then(() => {
                setNeedsUserTap(false);
                onPlayStateChange?.(true);
              })
              .catch(() => {
                setNeedsUserTap(true);
                onPlayStateChange?.(false);
              });
          }
        }
      });
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setActiveSrc(src);
    setIsLoading(true);
    setHasError(false);
    setNeedsUserTap(false);
    triedBlobFallbackRef.current = false;

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    const el = internalRef.current;
    if (!el) return;

    // Ensure Safari sees muted & inline attributes at DOM level before autoplay
    el.defaultMuted = muted;
    el.muted = muted;
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    if (muted) {
      el.setAttribute('muted', '');
    }

    const attemptAutoPlay = () => {
      if (!autoPlay || !internalRef.current) return;
      const vid = internalRef.current;
      vid.muted = muted;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setNeedsUserTap(false);
            onPlayStateChange?.(true);
          })
          .catch(() => {
            setNeedsUserTap(true);
            onPlayStateChange?.(false);
          });
      }
    };

    if (el.readyState >= 2) {
      setIsLoading(false);
      attemptAutoPlay();
    }

    // If Safari stalls loading metadata (common with CoreMedia behind auth/proxies), use authenticated Blob fetch
    const stallTimer = window.setTimeout(() => {
      if (internalRef.current && internalRef.current.readyState === 0 && !triedBlobFallbackRef.current) {
        triggerBlobFallback();
      }
    }, 2500);

    return () => {
      window.clearTimeout(stallTimer);
    };
  }, [activeSrc, autoPlay, muted]);

  const handleManualPlay = () => {
    const el = internalRef.current;
    if (!el) return;
    el.play()
      .then(() => {
        setNeedsUserTap(false);
        onPlayStateChange?.(true);
      })
      .catch(() => {
        onPlayStateChange?.(false);
      });
  };

  return (
    <div className={`bg-slate-950 ${containerClassName}`}>
      <video
        ref={setVideoRef}
        key={activeSrc}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        preload="auto"
        className={`absolute inset-0 w-full h-full ${className}`}
        onLoadedData={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onCanPlay={() => {
          setIsLoading(false);
          if (autoPlay && internalRef.current?.paused) {
            internalRef.current
              .play()
              .then(() => {
                setNeedsUserTap(false);
                onPlayStateChange?.(true);
              })
              .catch(() => {
                setNeedsUserTap(true);
                onPlayStateChange?.(false);
              });
          }
        }}
        onPlay={() => {
          setIsLoading(false);
          setNeedsUserTap(false);
          onPlayStateChange?.(true);
        }}
        onPause={() => onPlayStateChange?.(false)}
        onError={() => triggerBlobFallback()}
      >
        <source src={activeSrc} type="video/mp4" onError={() => triggerBlobFallback()} />
      </video>

      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 pointer-events-none">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
      )}

      {needsUserTap && !controls && !hasError && (
        <button
          type="button"
          onClick={handleManualPlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
          aria-label="Play promo video"
        >
          <span className="w-12 h-12 rounded-full bg-cyan-400/90 text-slate-950 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </span>
        </button>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-xs text-slate-400 bg-slate-950">
          <span>Promo clip unavailable</span>
        </div>
      )}
    </div>
  );
};
