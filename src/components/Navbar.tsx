import React from 'react';
import { Mail, Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (appId?: string) => void;
  onScrollToSection: (sectionId: string) => void;
  currentView?: 'home' | 'privacy';
  onBackToHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onScrollToSection,
  currentView = 'home',
  onBackToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleBrandClick = () => {
    if (currentView === 'privacy' && onBackToHome) {
      onBackToHome();
    } else {
      onScrollToSection('hero');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark with engineering symbol */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleBrandClick}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-teal-200 text-lg tracking-tighter">
                    AV
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                  ApliVox
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Digital Innovation
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line nav links (Privacy Policy removed as requested) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {currentView === 'privacy' ? (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap focus:outline-none font-semibold text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home Showcase</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onScrollToSection('apps-showcase')}
                  className="hover:text-cyan-400 transition-colors whitespace-nowrap focus:outline-none"
                >
                  Apps Showcase
                </button>
                <button
                  onClick={() => onScrollToSection('vision-mission')}
                  className="hover:text-cyan-400 transition-colors whitespace-nowrap focus:outline-none"
                >
                  Vision & Mission
                </button>
                <button
                  onClick={() => onScrollToSection('pillars')}
                  className="hover:text-cyan-400 transition-colors whitespace-nowrap focus:outline-none"
                >
                  Engineering Pillars
                </button>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-cyan-400 transition-colors whitespace-nowrap focus:outline-none"
                >
                  Support
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="mailto:support@aplivox.com?subject=ApliVox%20Support%20Inquiry"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-950 whitespace-nowrap shrink-0 hover:shadow-cyan-500/20 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 px-5 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            {currentView === 'privacy' ? (
              <button
                onClick={() => {
                  if (onBackToHome) onBackToHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 text-cyan-400 font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home Showcase</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onScrollToSection('apps-showcase');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-cyan-400"
                >
                  Apps Showcase
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('vision-mission');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-cyan-400"
                >
                  Vision & Mission
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('pillars');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-cyan-400"
                >
                  Engineering Pillars
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-cyan-400"
                >
                  Contact & Support
                </button>
              </>
            )}
          </div>
          <div className="pt-3">
            <a
              href="mailto:support@aplivox.com?subject=ApliVox%20Support%20Inquiry"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support (support@aplivox.com)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
