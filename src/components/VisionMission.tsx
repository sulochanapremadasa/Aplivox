import React from 'react';
import { Target, Compass, Sparkles, Shield, Cpu, Code2, Layers, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/appsData';

export const VisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>Corporate Philosophy</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ApliVox Digital Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Driven by Purpose, Guided by Engineering Craft
          </h2>
          <p className="text-base text-slate-300">
            ApliVox operates at the intersection of modern software architecture, human-centered mobile utility, and uncompromising user trust.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Vision Card */}
          <div className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/90 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Corporate Vision
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Vision Statement
                </h3>
                <blockquote className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
                  "{COMPANY_INFO.vision}"
                </blockquote>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Building globally recognized digital solutions that scale responsibly.</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/90 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Guiding Mission
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Mission Statement
                </h3>
                <blockquote className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed italic border-l-2 border-teal-400 pl-4 py-1">
                  "{COMPANY_INFO.mission}"
                </blockquote>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Commitment to meaningful experiences and technical rigor in every release.</span>
            </div>
          </div>
        </div>

        {/* 4 Engineering Pillars with Editorial Numbering */}
        <div id="pillars" className="pt-10 space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our Engineering Pillars
            </h3>
            <p className="text-sm text-slate-400">
              Four fundamental commitments embedded into every line of code we ship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs font-mono text-cyan-400 font-semibold">
                  0{idx + 1}. Pillar
                </div>
                <h4 className="text-base font-bold text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
