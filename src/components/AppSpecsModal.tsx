import React, { useEffect } from 'react';
import { X, Smartphone, Shield, CheckCircle2, Lock, HardDrive, WifiOff, FileCheck } from 'lucide-react';
import { MobileApp } from '../data/appsData';

interface AppSpecsModalProps {
  app: MobileApp | null;
  onClose: () => void;
  onOpenPrivacy: (appId: string) => void;
}

export const AppSpecsModal: React.FC<AppSpecsModalProps> = ({
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
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
            Technical Architecture & Specifications
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {app.name} Specifications
          </h3>
          <p className="text-xs text-slate-400">
            {app.category} · {app.specs.currentVersion}
          </p>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target OS Platform</span>
            </div>
            <div className="font-semibold text-white">{app.specs.platform}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              <span>Storage Architecture</span>
            </div>
            <div className="font-semibold text-white">{app.specs.storageMode}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
              <span>Internet Dependency</span>
            </div>
            <div className="font-semibold text-white">{app.specs.internetRequired}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Age Classification</span>
            </div>
            <div className="font-semibold text-white">{app.specs.ageRating}</div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-semibold text-slate-300">
            Core Capabilities Built-In
          </div>
          <div className="space-y-2">
            {app.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-cyan-400">
            <Shield className="w-4 h-4" />
            <span>Developer Privacy Pledge</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {app.privacyPolicy.summary}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenPrivacy(app.id);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>View Full Privacy Policy</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
