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
import { MobileApp, APPS_DATA } from './data/appsData';

export default function App() {
  // 'home' | 'privacy'
  const [currentView, setCurrentView] = useState<'home' | 'privacy'>('home');
  const [selectedPrivacyAppId, setSelectedPrivacyAppId] = useState<string>('isounds');
  const [videoModalApp, setVideoModalApp] = useState<MobileApp | null>(null);

  // Helper to parse route from current window location
  const syncRouteFromLocation = () => {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const queryPrivacy = searchParams.get('privacy')?.toLowerCase();

    const resolveAppId = (id?: string) => {
      if (id === 'habitbloom' || id === 'isounds' || id === 'motorlog') {
        return id;
      }
      if (id === 'corporate' || id === 'aplivox') {
        return 'aplivox';
      }
      return 'isounds';
    };

    if (queryPrivacy) {
      setSelectedPrivacyAppId(resolveAppId(queryPrivacy));
      setCurrentView('privacy');
      return;
    }

    // Check pathname: /privacy/habitbloom or /<repo>/privacy/habitbloom
    const parts = pathname.split('/').filter(Boolean);
    const privacyIdx = parts.indexOf('privacy');
    if (privacyIdx !== -1) {
      setSelectedPrivacyAppId(resolveAppId(parts[privacyIdx + 1]));
      setCurrentView('privacy');
      return;
    }

    // Check hash fallback: #privacy-habitbloom, etc.
    if (hash.startsWith('#privacy-')) {
      const appId = hash.replace('#privacy-', '');
      setSelectedPrivacyAppId(resolveAppId(appId));
      setCurrentView('privacy');
      return;
    }

    // Otherwise home
    setCurrentView('home');
  };

  // Sync route on mount and on popstate
  useEffect(() => {
    syncRouteFromLocation();

    const handlePopState = () => {
      syncRouteFromLocation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update browser document title based on view
  useEffect(() => {
    if (currentView === 'privacy') {
      const app = APPS_DATA.find((a) => a.id === selectedPrivacyAppId);
      if (app) {
        document.title = `${app.name} Privacy Policy — ApliVox`;
      } else if (selectedPrivacyAppId === 'aplivox') {
        document.title = `Corporate Privacy Policy — ApliVox`;
      } else {
        document.title = `Privacy Policy — ApliVox`;
      }
    } else {
      document.title = `ApliVox — Modern Software Engineering & Digital Innovation`;
    }
  }, [currentView, selectedPrivacyAppId]);

  const handleSelectPrivacy = (appId: string) => {
    setSelectedPrivacyAppId(appId);
    setCurrentView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
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
      {/* Top Navigation without Privacy tab */}
      <Navbar
        onOpenContact={handleOpenContact}
        onScrollToSection={scrollToSection}
        currentView={currentView}
        onBackToHome={handleBackToHome}
      />

      {/* Main View Switching */}
      {currentView === 'privacy' ? (
        <main className="flex-1">
          <PrivacyPolicyViewer
            selectedAppId={selectedPrivacyAppId}
            onClose={handleBackToHome}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExploreApps={() => scrollToSection('apps-showcase')}
            onExploreVision={() => scrollToSection('vision-mission')}
            onSelectApp={(appId) => {
              scrollToSection('apps-showcase');
            }}
          />

          {/* Horizontal Scroll View for Mobile Applications:
              Each app card contains ONLY the direct link to open the privacy policy for that app */}
          <AppsHorizontalScroll
            onSelectPrivacy={handleSelectPrivacy}
            onOpenVideoModal={(app) => setVideoModalApp(app)}
          />

          {/* Vision & Mission Section */}
          <VisionMission />

          {/* Contact Us & Support Section (Opens Mail App with domain url) */}
          <ContactSection />
        </main>
      )}

      {/* Global Footer (Privacy links removed as requested) */}
      <Footer
        onScrollToSection={scrollToSection}
      />

      {/* Modals */}
      <VideoModal
        app={videoModalApp}
        onClose={() => setVideoModalApp(null)}
        onOpenPrivacy={handleSelectPrivacy}
      />
    </div>
  );
}
