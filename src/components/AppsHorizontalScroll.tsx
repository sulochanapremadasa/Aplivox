import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Info,
  CheckCircle2,
  Mail,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { MobileApp, APPS_DATA } from '../data/appsData';

interface AppsHorizontalScrollProps {
  onSelectPrivacy: (appId: string) => void;
  onOpenVideoModal: (app: MobileApp) => void;
  onOpenSpecsModal: (app: MobileApp) => void;
}

export const AppsHorizontalScroll: React.FC<AppsHorizontalScrollProps> = ({
  onSelectPrivacy,
  onOpenVideoModal,
  onOpenSpecsModal,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeAppIndex, setActiveAppIndex] = useState(0);

  // Video play state tracker for each card
  const [playingState, setPlayingState] = useState<Record<string, boolean>>({
    isounds: true,
    habitbloom: true,
    motorlog: true,
  });
  const [mutedState, setMutedState] = useState<Record<string, boolean>>({
    isounds: true,
    habitbloom: true,
    motorlog: true,
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

  const toggleMute = (appId: string) => {
    const video = videoRefs.current[appId];
    if (video) {
      video.muted = !video.muted;
      setMutedState((prev) => ({ ...prev, [appId]: video.muted }));
    }
  };

  return (
    <section id="apps-showcase" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <span>Mobile Application Portfolio</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Horizontal Scroll View</span>
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
                <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-900 border-b border-slate-800/80 overflow-hidden group">
                  <video
                    ref={(el) => {
                      videoRefs.current[app.id] = el;
                    }}
                    src={app.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onPlay={() => setPlayingState((prev) => ({ ...prev, [app.id]: true }))}
                    onPause={() => setPlayingState((prev) => ({ ...prev, [app.id]: false }))}
                  />

                  {/* Video Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Bar on Video: App badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                    <span className="text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-cyan-400" />
                      <span>{app.specs.platform}</span>
                    </span>

                    <button
                      onClick={() => onOpenVideoModal(app)}
                      className="text-[11px] font-medium text-white/90 bg-black/60 hover:bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 transition-colors"
                      title="Watch full promo video"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand Video</span>
                    </button>
                  </div>

                  {/* Bottom bar on Video: Play/Pause and Mute Controls */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-2">
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
                      <button
                        onClick={() => toggleMute(app.id)}
                        className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
                        aria-label={mutedState[app.id] ? 'Unmute video' : 'Mute video'}
                      >
                        {mutedState[app.id] ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <span className="text-[11px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                      Promo Clip
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Category & Tagline */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{app.category}</span>
                      <span className="font-mono text-[11px] text-slate-400">{app.specs.currentVersion}</span>
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

              {/* CARD FOOTER: EXACT REQUIREMENT: Link to each privacy policy page in each app */}
              <div className="p-6 pt-0 space-y-3">
                {/* PRIMARY PRIVACY POLICY BUTTON FOR THIS APP */}
                <button
                  onClick={() => onSelectPrivacy(app.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all group shadow-sm hover:shadow-cyan-950"
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>View {app.name} Privacy Policy</span>
                  </div>
                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                {/* Secondary Actions: Specs & Support Link */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onOpenSpecsModal(app)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>Specs & Details</span>
                  </button>

                  <a
                    href={`mailto:support@aplivox.com?subject=${encodeURIComponent(app.name + ' Support Inquiry')}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    title={`Contact support for ${app.name}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Support</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll helper tip */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Tip: Swipe or drag horizontally to view all 3 apps.</span>
          <span className="hidden sm:inline">All applications distributed via Apple App Store.</span>
        </div>
      </div>
    </section>
  );
};
