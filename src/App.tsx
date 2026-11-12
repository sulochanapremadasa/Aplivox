/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppsHorizontalScroll } from './components/AppsHorizontalScroll';
import { VisionMission } from './components/VisionMission';
import { PrivacyPolicyViewer } from './components/PrivacyPolicyViewer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { AppSpecsModal } from './components/AppSpecsModal';
import { MobileApp, APPS_DATA } from './data/appsData';
import { Shield, Sparkles, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

export default function App() {
  // 'home' | 'privacy'
  const [currentView, setCurrentView] = useState<'home' | 'privacy'>('home');
  const [selectedPrivacyAppId, setSelectedPrivacyAppId] = useState<string>('isounds');
  const [videoModalApp, setVideoModalApp] = useState<MobileApp | null>(null);
  const [specsModalApp, setSpecsModalApp] = useState<MobileApp | null>(null);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#privacy-')) {
        const appId = hash.replace('#privacy-', '');
        setSelectedPrivacyAppId(appId);
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#privacy') {
        setSelectedPrivacyAppId('isounds');
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPrivacy = (appId: string) => {
    setSelectedPrivacyAppId(appId);
    setCurrentView('privacy');
    window.location.hash = `privacy-${appId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (appId?: string) => {
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navigation */}
      <Navbar
        onSelectPrivacy={handleSelectPrivacy}
        onOpenContact={handleOpenContact}
        onScrollToSection={scrollToSection}
      />

      {/* Main View Switching */}
      {currentView === 'privacy' ? (
        <main className="flex-1">
          <PrivacyPolicyViewer
            selectedAppId={selectedPrivacyAppId}
            onSelectAppId={(id) => setSelectedPrivacyAppId(id)}
            onClose={handleBackToHome}
            isStandalonePage={true}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExploreApps={() => scrollToSection('apps-showcase')}
            onOpenPrivacyHub={() => handleSelectPrivacy('isounds')}
            onSelectApp={(appId) => {
              scrollToSection('apps-showcase');
            }}
          />

          {/* Horizontal Scroll View for Mobile Applications with direct Privacy Policy links */}
          <AppsHorizontalScroll
            onSelectPrivacy={handleSelectPrivacy}
            onOpenVideoModal={(app) => setVideoModalApp(app)}
            onOpenSpecsModal={(app) => setSpecsModalApp(app)}
          />

          {/* Vision & Mission Section */}
          <VisionMission />

          {/* Privacy & Trust Banner Callout */}
          <section className="py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-gradient-to-tr from-cyan-950/40 via-slate-900 to-indigo-950/30 border border-cyan-500/30 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    <span>Uncompromising Privacy Standard</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Transparent, Legally Compliant Privacy Policies for Every App
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We practice zero ad broker surveillance, minimal telemetry, and offline-first local storage. Review the complete privacy policies for iSounds, HabitBloom, and MotorLog.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  {APPS_DATA.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleSelectPrivacy(app.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400/50 transition-all shadow-sm"
                    >
                      <span>{app.name} Policy</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Us & Support Section (Opens Mail App with domain url) */}
          <ContactSection />
        </main>
      )}

      {/* Global Footer */}
      <Footer
        onSelectPrivacy={handleSelectPrivacy}
        onScrollToSection={scrollToSection}
      />

      {/* Modals */}
      <VideoModal
        app={videoModalApp}
        onClose={() => setVideoModalApp(null)}
        onOpenPrivacy={handleSelectPrivacy}
      />

      <AppSpecsModal
        app={specsModalApp}
        onClose={() => setSpecsModalApp(null)}
        onOpenPrivacy={handleSelectPrivacy}
      />
    </div>
  );
}
