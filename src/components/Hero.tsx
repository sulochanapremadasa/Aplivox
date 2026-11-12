import React from 'react';
import { ArrowDown, Shield, Sparkles, Smartphone, Lock, Terminal } from 'lucide-react';
import { COMPANY_INFO, APPS_DATA } from '../data/appsData';

interface HeroProps {
  onExploreApps: () => void;
  onOpenPrivacyHub: () => void;
  onSelectApp: (appId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreApps,
  onOpenPrivacyHub,
  onSelectApp,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-teal-500/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-emerald-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle unboxed metadata kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wider uppercase">
            <span>Modern Software Engineering</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Digital Innovation Company</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Est. 2026</span>
          </div>

          {/* Primary Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
            Crafting impactful mobile products with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              engineering excellence
            </span>{' '}
            and privacy.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            ApliVox transforms ideas into meaningful digital experiences. Explore our flagship iOS applications, crafted with offline-first architectures, respectful data ethics, and tactile simplicity.
          </p>

          {/* Action Button Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreApps}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/25 active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Explore Mobile Applications</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPrivacyHub}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all active:scale-95"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>View Privacy Policies</span>
            </button>
          </div>

          {/* Quick jump to app cards */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-slate-400">Featured Apps:</span>
            {APPS_DATA.map((app) => (
              <button
                key={app.id}
                onClick={() => onSelectApp(app.id)}
                className="hover:text-cyan-400 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-cyan-400 font-medium"
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Proof Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              03
            </div>
            <div className="text-xs font-semibold text-slate-300">Flagship Mobile Apps</div>
            <div className="text-[12px] text-slate-400">iSounds, HabitBloom & MotorLog</div>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-300">On-Device Privacy</div>
            <div className="text-[12px] text-slate-400">Offline-first local data storage</div>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums tracking-tight">
              Zero
            </div>
            <div className="text-xs font-semibold text-slate-300">Third-Party Tracking</div>
            <div className="text-[12px] text-slate-400">No ad brokers or user profiling</div>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono tabular-nums tracking-tight">
              24/48h
            </div>
            <div className="text-xs font-semibold text-slate-300">Direct Developer Support</div>
            <div className="text-[12px] text-slate-400">support@aplivox.com</div>
          </div>
        </div>
      </div>
    </section>
  );
};
