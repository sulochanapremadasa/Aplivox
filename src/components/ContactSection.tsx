import React, { useState } from 'react';
import {
  Mail,
  Send,
  Copy,
  Check,
  Smartphone,
  Shield,
  HelpCircle,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO, APPS_DATA } from '../data/appsData';

interface ContactSectionProps {
  initialAppId?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialAppId }) => {
  const [selectedApp, setSelectedApp] = useState<string>(initialAppId || 'general');
  const [subjectLine, setSubjectLine] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const getSubject = () => {
    if (subjectLine.trim()) return subjectLine.trim();
    if (selectedApp === 'isounds') return 'iSounds Support & Feedback';
    if (selectedApp === 'habitbloom') return 'HabitBloom Support & Feedback';
    if (selectedApp === 'motorlog') return 'MotorLog Support & Feedback';
    return 'ApliVox Support Inquiry';
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(
      userMessage.trim()
        ? `${userMessage}\n\n---\nApp: ${selectedApp.toUpperCase()}\nPlatform: iOS\nSent via ApliVox Support Portal`
        : `Hello ApliVox Support Team,\n\nI am contacting you regarding ${selectedApp.toUpperCase()}.\n\n[Please describe your inquiry or feedback here]\n\nThank you!`
    );
    return `mailto:${COMPANY_INFO.supportEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Developer Support & Inquiries</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Domain Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Us & Support
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Have questions regarding iSounds, HabitBloom, MotorLog, or our corporate privacy practices? Reach out directly to our engineering support team.
          </p>
        </div>

        {/* Support Gateway Card */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl p-6 sm:p-10 space-y-8">
          {/* Quick Domain Support Direct Button (Top Feature) */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Official Support Domain
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                {COMPANY_INFO.supportEmail}
              </div>
              <div className="text-xs text-slate-400">
                Single unified support channel ending with <span className="text-slate-300 font-mono">@{COMPANY_INFO.websiteDomain}</span> for all applications.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* PRIMARY MAIL APP TRIGGER */}
              <a
                href={`mailto:${COMPANY_INFO.supportEmail}?subject=ApliVox%20Support%20Inquiry`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-950 active:scale-95 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail App</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors active:scale-95"
                title="Copy support email address to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Pre-fill Composer */}
          <div className="space-y-5 pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Compose Customized Support Request</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Target Mobile Application
                </label>
                <select
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="general">All Applications / General Inquiry</option>
                  <option value="isounds">iSounds (Soundboard iOS App)</option>
                  <option value="habitbloom">HabitBloom (Habit Tracker iOS App)</option>
                  <option value="motorlog">MotorLog (Garage & Service Tracker iOS App)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject Line (Optional)
                </label>
                <input
                  type="text"
                  placeholder={getSubject()}
                  value={subjectLine}
                  onChange={(e) => setSubjectLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Message / Feedback / Technical Inquiry
              </label>
              <textarea
                rows={4}
                placeholder="Type your question or report here. When you click 'Launch Mail App with Request', your device's native mail program will open automatically with this information pre-filled..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Launch Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Response turnaround: Mon–Fri within 24–48 hours</span>
              </div>

              <a
                href={getMailtoUrl()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/70 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Mail App with Request</span>
              </a>
            </div>
          </div>

          {/* Quick Support FAQ / Trust Markers */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-semibold text-white">Apple StoreKit Support</div>
              <p className="text-slate-400 leading-relaxed">
                Need receipt restoration or subscription management? MotorLog Pro purchases can be restored in Settings.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-white">Privacy Inquiries</div>
              <p className="text-slate-400 leading-relaxed">
                Questions regarding on-device storage or GDPR/CCPA disclosures are reviewed directly by our engineers.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-white">Feature Requests</div>
              <p className="text-slate-400 leading-relaxed">
                Have a sound suggestion for iSounds or a habit metric for HabitBloom? We actively build from user feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
