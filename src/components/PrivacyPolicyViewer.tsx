import React, { useState, useEffect } from 'react';
import {
  Shield,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  Mail,
  Search,
  ExternalLink,
  ChevronRight,
  Lock,
  FileText,
  Smartphone,
  Eye,
  Download,
} from 'lucide-react';
import {
  MobileApp,
  APPS_DATA,
  CORPORATE_PRIVACY_POLICY,
  AppPrivacyPolicy,
} from '../data/appsData';

interface PrivacyPolicyViewerProps {
  selectedAppId: string;
  onSelectAppId: (appId: string) => void;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export const PrivacyPolicyViewer: React.FC<PrivacyPolicyViewerProps> = ({
  selectedAppId,
  onSelectAppId,
  onClose,
  isStandalonePage = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(selectedAppId || 'isounds');

  useEffect(() => {
    if (selectedAppId) {
      setActiveTab(selectedAppId);
    }
  }, [selectedAppId]);

  // Determine which policy is being viewed
  let currentPolicy: AppPrivacyPolicy;
  let currentApp: MobileApp | undefined = APPS_DATA.find((a) => a.id === activeTab);

  if (activeTab === 'aplivox') {
    currentPolicy = CORPORATE_PRIVACY_POLICY;
  } else if (currentApp) {
    currentPolicy = currentApp.privacyPolicy;
  } else {
    currentApp = APPS_DATA[0];
    currentPolicy = APPS_DATA[0].privacyPolicy;
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#privacy-${activeTab}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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
    <div id="privacy-section" className="py-12 lg:py-20 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Showcase</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Legal & Privacy Center</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-cyan-400 font-semibold">{currentPolicy.appName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="Copy direct link to this policy"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">URL Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
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

        {/* Tab Navigation to switch between app policies */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Select Application Privacy Policy
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {APPS_DATA.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setActiveTab(app.id);
                  onSelectAppId(app.id);
                  window.history.replaceState(null, '', `#privacy-${app.id}`);
                }}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                  activeTab === app.id
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40 text-white'
                    : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{app.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">iOS</span>
                </div>
                <span className="text-[11px] text-slate-400 truncate mt-1">
                  Privacy Policy
                </span>
              </button>
            ))}

            {/* Corporate Policy */}
            <button
              onClick={() => {
                setActiveTab('aplivox');
                onSelectAppId('aplivox');
                window.history.replaceState(null, '', '#privacy-aplivox');
              }}
              className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                activeTab === 'aplivox'
                  ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40 text-white'
                  : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">ApliVox Corporate</span>
                <span className="text-[10px] text-slate-400 font-mono">Web & Platform</span>
              </div>
              <span className="text-[11px] text-slate-400 truncate mt-1">
                Company-wide Standards
              </span>
            </button>
          </div>
        </div>

        {/* Main Document Container */}
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
                <span className="text-slate-400">Governing Entity:</span>{' '}
                <span className="text-slate-300 font-medium">ApliVox</span>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
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
                <p className="text-[11px] text-slate-400">No cross-app or web tracking</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Data Linked to You</div>
                <div className="text-xs font-bold text-emerald-400">
                  {currentPolicy.appStoreNutrition.dataLinkedToYou}
                </div>
                <p className="text-[11px] text-slate-400">No account required</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Data Collection</div>
                <div className="text-xs font-bold text-cyan-400">
                  {currentPolicy.appStoreNutrition.dataCollected}
                </div>
                <p className="text-[11px] text-slate-400">Minimal telemetry standard</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">On-Device Storage</div>
                <div className="text-xs font-bold text-white">
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
                placeholder="Search policy sections (e.g., storage, export, cookies)..."
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
                    <span className="text-cyan-400">§</span>
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

          {/* Direct Support & Contact link ending with domain URL as required */}
          <div className="mt-12 pt-8 border-t border-slate-800 rounded-xl bg-slate-950 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Need Help or Have Privacy Inquiries?
                </div>
                <h3 className="text-base font-bold text-white">
                  Direct Developer Support for {currentPolicy.appName}
                </h3>
                <p className="text-xs text-slate-400">
                  Our software engineering team handles support inquiries directly with no intermediary ticketing bots.
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

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="font-mono text-cyan-300">support@aplivox.com</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Domain: aplivox.com</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Response SLA: 24–48 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
