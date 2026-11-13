import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  Mail,
  Search,
  Lock,
  CreditCard,
} from 'lucide-react';
import {
  MobileApp,
  APPS_DATA,
  CORPORATE_PRIVACY_POLICY,
  AppPrivacyPolicy,
} from '../data/appsData';

interface PrivacyPolicyViewerProps {
  selectedAppId: string;
  onClose?: () => void;
}

export const PrivacyPolicyViewer: React.FC<PrivacyPolicyViewerProps> = ({
  selectedAppId,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Determine which app policy is being viewed
  let currentPolicy: AppPrivacyPolicy;
  let currentApp: MobileApp | undefined = APPS_DATA.find((a) => a.id === selectedAppId);

  if (selectedAppId === 'aplivox') {
    currentPolicy = CORPORATE_PRIVACY_POLICY;
  } else if (currentApp) {
    currentPolicy = currentApp.privacyPolicy;
  } else {
    currentApp = APPS_DATA[0];
    currentPolicy = APPS_DATA[0].privacyPolicy;
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentPolicy.canonicalUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter sections by search query
  const filteredSections = currentPolicy.sections.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = sec.title.toLowerCase().includes(q);
    const contentMatch = sec.content.some((line) => line.toLowerCase().includes(q));
    return titleMatch || contentMatch;
  });

  return (
    <div id="privacy-section" className="py-10 lg:py-16 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <a
              href="./"
              onClick={(e) => {
                if (onClose) {
                  e.preventDefault();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to ApliVox Home</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Legal Document</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-cyan-400 font-semibold">{currentPolicy.appName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Canonical App Store URL */}
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="Copy official App Store privacy URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">URL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy App Store URL</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="Print policy document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Main Document Container (Dedicated to this app alone) */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

          {/* Document Header */}
          <div className="space-y-4 pb-8 border-b border-slate-800">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Official Privacy Policy</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">{currentPolicy.appIdentifier}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentPolicy.appName} Privacy Policy
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div>
                <span className="text-slate-400">Effective Date:</span>{' '}
                <span className="text-slate-300 font-medium">{currentPolicy.effectiveDate}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div>
                <span className="text-slate-400">Last Revised:</span>{' '}
                <span className="text-slate-300 font-medium">{currentPolicy.lastUpdated}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div>
                <span className="text-slate-400">Entity:</span>{' '}
                <span className="text-slate-300 font-medium">ApliVox</span>
              </div>
            </div>

            {/* In-App Purchases Notice Badge */}
            <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-semibold text-white">Apple StoreKit In-App Purchases Protected</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  All in-app purchases, subscriptions, sound packs, and upgrades in {currentPolicy.appName} are executed through Apple StoreKit. ApliVox does not collect, receive, or store your credit card or financial information.
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Executive Privacy Summary</span>
              </div>
              <p>{currentPolicy.summary}</p>
            </div>
          </div>

          {/* App Store Privacy Nutrition Label Grid */}
          <div className="py-6 border-b border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>App Store Privacy Nutrition Disclosures (Apple Review Standard)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Data Used to Track You</div>
                <div className="text-xs font-bold text-emerald-400">
                  {currentPolicy.appStoreNutrition.dataUsedToTrackYou}
                </div>
                <p className="text-[11px] text-slate-400">Zero cross-app or web tracking</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Data Linked to You</div>
                <div className="text-xs font-bold text-cyan-400">
                  {currentPolicy.appStoreNutrition.dataLinkedToYou}
                </div>
                <p className="text-[11px] text-slate-400">No account required</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Data Collection</div>
                <div className="text-xs font-bold text-white">
                  {currentPolicy.appStoreNutrition.dataCollected}
                </div>
                <p className="text-[11px] text-slate-400">Minimal telemetry standard</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">On-Device Storage</div>
                <div className="text-xs font-bold text-slate-200">
                  Local Sandboxed Storage
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentPolicy.appStoreNutrition.onDeviceStorage}
                </p>
              </div>
            </div>
          </div>

          {/* Search bar inside policy */}
          <div className="py-4">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search policy sections (e.g., purchases, StoreKit, storage, export)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Document Content Sections */}
          <div className="space-y-8 pt-4">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No policy sections matched your search query. Try another term.
              </div>
            ) : (
              filteredSections.map((section) => (
                <div key={section.id} id={section.id} className="space-y-3 scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="text-cyan-400 font-mono">§</span>
                    <span>{section.title}</span>
                  </h2>

                  <div className="space-y-2.5 text-sm text-slate-300 leading-relaxed pl-3 border-l-2 border-slate-800">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Direct Support & Contact link ending with domain URL */}
          <div className="mt-12 pt-8 border-t border-slate-800 rounded-xl bg-slate-950 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Support & Privacy Inquiries
                </div>
                <h3 className="text-base font-bold text-white">
                  Developer Support for {currentPolicy.appName}
                </h3>
                <p className="text-xs text-slate-400">
                  Our engineering team handles all customer and compliance questions directly.
                </p>
              </div>

              {/* Requirement: Contact us support link ending with domain url for all apps opening mail app */}
              <a
                href={`mailto:${currentPolicy.contactEmail}?subject=${encodeURIComponent(
                  currentPolicy.appName + ' Privacy & Support Inquiry'
                )}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-950 whitespace-nowrap active:scale-95 shrink-0"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact {currentPolicy.contactEmail}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="font-mono text-cyan-300">support@aplivox.com</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Domain: aplivox.com</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Direct Developer Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
