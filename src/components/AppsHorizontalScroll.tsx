import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Play,
  Pause,
  Maximize2,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { MobileApp, APPS_DATA } from '../data/appsData';
import { SafariSafeVideo } from './SafariSafeVideo';

interface AppsHorizontalScrollProps {
  onSelectPrivacy: (appId: string) => void;
  onOpenVideoModal: (app: MobileApp) => void;
}

export const AppsHorizontalScroll: React.FC<AppsHorizontalScrollProps> = ({
  onSelectPrivacy,
  onOpenVideoModal,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeAppIndex, setActiveAppIndex] = useState(0);

  // Video play state tracker for each card (updated from real playback events)
  const [playingState, setPlayingState] = useState<Record<string, boolean>>({
    isounds: false,
    myhabitsbloom: false,
    imotorlog: false,
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

      // Estimate current card
      const cardWidth = 420; // approximate width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveAppIndex(Math.min(Math.max(index, 0), APPS_DATA.length - 1));
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollContainerRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const children = scrollContainerRef.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest',
        });
      }
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -440 : 440;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const togglePlay = (appId: string) => {
    const video = videoRefs.current[appId];
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setPlayingState((prev) => ({ ...prev, [appId]: true }));
      } else {
        video.pause();
        setPlayingState((prev) => ({ ...prev, [appId]: false }));
      }
    }
  };

  return (
    <section id="apps-showcase" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <span>Mobile Application Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Mobile Applications
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Browse through each mobile application below with video previews, small descriptions, and direct access to dedicated Privacy Policy documents.
            </p>
          </div>

          {/* Controls: Prev/Next Buttons and Indicators */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span>{activeAppIndex + 1}</span>
              <span className="text-slate-600">/</span>
              <span>{APPS_DATA.length} Apps</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Segmented Indicators */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {APPS_DATA.map((app, idx) => (
            <button
              key={app.id}
              onClick={() => scrollToCard(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeAppIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="horizontal-scroll-track flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth focus:outline-none"
          tabIndex={0}
          aria-label="Mobile applications carousel"
        >
          {APPS_DATA.map((app, idx) => (
            <div
              key={app.id}
              className="snap-start shrink-0 w-[340px] sm:w-[440px] lg:w-[480px] rounded-2xl bg-slate-950 border border-slate-800/90 shadow-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              {/* Card Header & Video Stage */}
              <div>
                {/* Mobile Device Mockup / Video Frame */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-950 border-b border-slate-800/80 overflow-hidden group">
                  <SafariSafeVideo
                    src={app.videoSrc}
                    autoPlay
                    loop
                    muted
                    containerClassName="absolute inset-0"
                    className="object-contain"
                    externalRef={(el) => {
                      videoRefs.current[app.id] = el;
                    }}
                    onPlayStateChange={(isPlaying) =>
                      setPlayingState((prev) => ({ ...prev, [app.id]: isPlaying }))
                    }
                  />

                  {/* Video Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/25 pointer-events-none" />

                  {/* Top Bar on Video: Expand Video button */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-end pointer-events-auto">
                    <button
                      onClick={() => onOpenVideoModal(app)}
                      className="text-[11px] font-medium text-white/90 bg-black/60 hover:bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 transition-colors"
                      title="Watch full promo video"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand Video</span>
                    </button>
                  </div>

                  {/* Bottom bar on Video: Play/Pause Control */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center pointer-events-auto">
                    <button
                      onClick={() => togglePlay(app.id)}
                      className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
                      aria-label={playingState[app.id] ? 'Pause video' : 'Play video'}
                    >
                      {playingState[app.id] ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Category & Tagline */}
                  <div className="space-y-1.5">
                    <div className="text-xs text-slate-400">
                      <span>{app.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{app.name}</span>
                    </h3>

                    <p className="text-xs font-medium text-cyan-400 italic">
                      "{app.tagline}"
                    </p>
                  </div>

                  {/* Small Description as requested */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Feature highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Key Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {app.highlights.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Privacy Highlights Note */}
                  <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-xs text-slate-300 flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white">Privacy Architecture</div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        {app.privacyHighlight}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD FOOTER: App Store Download Now (or Available Soon) + Privacy Policy link */}
              <div className="p-6 pt-0 space-y-2.5">
                {app.appStoreUrl ? (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${app.name} on the App Store`}
                    className="w-full h-14 flex items-center justify-center px-4 rounded-xl bg-black hover:bg-zinc-900 border border-white/25 hover:border-white/60 text-white transition-all shadow-lg shadow-black/50 active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-3">
                      <svg
                        viewBox="0 0 384 512"
                        className="w-5 h-5 fill-current text-white shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-[10px] font-medium tracking-wide text-slate-200">
                          Download on the
                        </span>
                        <span className="text-base font-bold tracking-tight text-white">
                          App Store
                        </span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <div
                    aria-label={`${app.name} Available Soon`}
                    className="w-full h-14 flex items-center justify-center gap-2.5 px-4 rounded-xl bg-slate-900/90 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-black/30 select-none"
                  >
                    <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span className="text-sm font-bold tracking-wide">
                      Available Soon
                    </span>
                  </div>
                )}

                <a
                  href={app.privacyPolicy.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectPrivacy(app.id);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all text-xs font-semibold shadow-sm hover:shadow-cyan-950/50 cursor-pointer"
                  title={`${app.name} Privacy Policy`}
                >
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>{app.name} Privacy Policy</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll helper tip */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Tip: Swipe or drag horizontally to view all 3 apps.</span>
          <span className="hidden sm:inline">iSounds &amp; MyHabitsBloom available on the Apple App Store · iMotorLog coming soon.</span>
        </div>
      </div>
    </section>
  );
};
