import React, { useEffect } from 'react';
import { X, Shield, Mail } from 'lucide-react';
import { MobileApp } from '../data/appsData';
import { SafariSafeVideo } from './SafariSafeVideo';

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
        <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[360px] md:min-h-[500px]">
          <SafariSafeVideo
            src={app.videoSrc}
            autoPlay
            loop
            muted
            controls
            containerClassName="absolute inset-0"
            className="object-contain"
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
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${app.name} on the App Store`}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-900 border border-white/25 hover:border-white/60 text-white transition-all shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <svg
                    viewBox="0 0 384 512"
                    className="w-5 h-5 fill-current text-white shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span className="flex flex-col text-left leading-tight">
                    <span className="text-[9px] font-medium tracking-wide text-slate-200">
                      Download on the
                    </span>
                    <span className="text-sm font-bold tracking-tight text-white">
                      App Store
                    </span>
                  </span>
                </span>
              </a>
            )}
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
