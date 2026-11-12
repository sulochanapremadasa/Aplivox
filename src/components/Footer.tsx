import React from 'react';
import { Mail, Shield, ArrowUp, Smartphone, ExternalLink, Heart } from 'lucide-react';
import { COMPANY_INFO, APPS_DATA } from '../data/appsData';

interface FooterProps {
  onSelectPrivacy: (appId: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPrivacy,
  onScrollToSection,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-teal-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <span className="font-mono font-black text-cyan-400 text-sm">AV</span>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">ApliVox</span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline} We build impactful software products through innovation, engineering excellence, and privacy-first architectures.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-400">
              <span>Domain:</span>
              <a
                href={`mailto:${COMPANY_INFO.supportEmail}`}
                className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
              >
                {COMPANY_INFO.supportEmail}
              </a>
            </div>
          </div>

          {/* Column 2: Mobile Applications */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Mobile Applications
            </div>
            <ul className="space-y-2">
              {APPS_DATA.map((app) => (
                <li key={app.id}>
                  <button
                    onClick={() => onScrollToSection('apps-showcase')}
                    className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{app.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">iOS</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onScrollToSection('apps-showcase')}
                  className="hover:text-cyan-400 transition-colors text-left text-slate-400"
                >
                  All Showcase Apps
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Privacy Policies (Primary requirement) */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Privacy Policies
            </div>
            <ul className="space-y-2">
              {APPS_DATA.map((app) => (
                <li key={app.id}>
                  <button
                    onClick={() => onSelectPrivacy(app.id)}
                    className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5"
                  >
                    <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{app.name} Privacy</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectPrivacy('aplivox')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 text-cyan-400"
                >
                  <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>ApliVox Corporate Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Support Desk
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.supportEmail}?subject=ApliVox%20Support%20Inquiry`}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300"
                >
                  <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{COMPANY_INFO.supportEmail}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Help & Feedback Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('vision-mission')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Vision & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('pillars')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Engineering Standards
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectPrivacy('aplivox')}
              className="hover:text-slate-300 transition-colors"
            >
              Corporate Privacy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onScrollToSection('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact Developer
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
