import React, { useRef, useEffect } from 'react';
import { X, Smartphone, Shield, Play, Pause, Volume2, VolumeX, Mail } from 'lucide-react';
import { MobileApp } from '../data/appsData';

interface VideoModalProps {
  app: MobileApp | null;
  onClose: () => void;
  onOpenPrivacy: (appId: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  app,
  onClose,
  onOpenPrivacy,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Column (Left / Main) */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[320px] md:min-h-[500px]">
          <video
            ref={videoRef}
            src={app.videoSrc}
            autoPlay
            controls
            playsInline
            className="w-full h-full max-h-[500px] object-contain"
          />
        </div>

        {/* Info Column (Right) */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                {app.category}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {app.name}
              </h3>
              <p className="text-xs text-cyan-300 font-medium italic">
                "{app.tagline}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {app.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Feature Highlights
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {app.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy highlights */}
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>On-Device Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">{app.privacyHighlight}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenPrivacy(app.id);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Read {app.name} Privacy Policy</span>
            </button>

            <a
              href={`mailto:support@aplivox.com?subject=${encodeURIComponent(app.name + ' Support Inquiry')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Email Support (support@aplivox.com)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
