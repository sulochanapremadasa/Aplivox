export interface PrivacySection {
  id: string;
  title: string;
  content: string[];
}

export interface AppPrivacyPolicy {
  appName: string;
  appIdentifier: string;
  path: string;
  canonicalUrl: string;
  effectiveDate: string;
  lastUpdated: string;
  summary: string;
  contactEmail: string;
  sections: PrivacySection[];
  appStoreNutrition: {
    dataCollected: string;
    dataLinkedToYou: string;
    dataUsedToTrackYou: string;
    onDeviceStorage: string;
  };
}

export interface MobileApp {
  id: 'isounds' | 'habitbloom' | 'motorlog';
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  category: string;
  badge: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  videoSrc: string;
  description: string;
  highlights: string[];
  privacyHighlight: string;
  specs: {
    platform: string;
    currentVersion: string;
    pricing: string;
    storageMode: string;
    internetRequired: string;
    ageRating: string;
  };
  privacyPolicy: AppPrivacyPolicy;
}

export const APPS_DATA: MobileApp[] = [
  {
    id: 'isounds',
    name: 'iSounds',
    shortName: 'iSounds',
    tagline: 'A little fun. A tap away.',
    heroHeadline: '100 sounds. Endless reactions. Find your favorite sound.',
    category: 'Entertainment / Soundboard',
    badge: 'Mobile App',
    accentColor: 'emerald',
    accentBorder: 'border-emerald-500/30 hover:border-emerald-500/60',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-400',
    videoSrc: './assets/aistudio/iSounds_Promo_video_1ff991e3.mp4',
    description:
      'A responsive, offline-ready soundboard mobile application delivering over 100 funny and expressive reaction sounds. Built with tap-to-play immediacy, sound search, customizable sound packs, and dark/light themes.',
    highlights: [
      '100+ high-quality curated reaction & comedic sounds',
      'Instant tap-to-play & tap-to-stop audio engine',
      'Optional premium sound packs via Apple StoreKit',
      'Dual appearance: Optimized Dark & Light modes',
      'Completely functional offline without network access',
    ],
    privacyHighlight:
      'No audio or microphone recording. Optional In-App Purchases via Apple StoreKit. Displays Google Ads (AdMob) with ATT & GDPR consent controls.',
    specs: {
      platform: 'iOS 15.0 or later',
      currentVersion: 'Version 1.1.0',
      pricing: 'Free (Ad-Supported) with In-App Purchases',
      storageMode: '100% On-Device Asset Bundle',
      internetRequired: 'Optional (Offline playback; internet used for Google Ads & App Store purchases)',
      ageRating: 'Rated 4+ (Family Friendly)',
    },
    privacyPolicy: {
      appName: 'iSounds',
      appIdentifier: 'com.aplivox.isounds',
      path: '/privacy/isounds',
      canonicalUrl: 'https://aplivox.com/privacy/isounds',
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'iSounds is built to respect your privacy while keeping the core soundboard free through Google Ads (AdMob) and optional Apple StoreKit In-App Purchases. iSounds never accesses your microphone or records audio, requires no account registration, and enforces Apple App Tracking Transparency (ATT) and regional consent controls for advertising.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'Advertising Data, Device ID, IP-Based Coarse Location & Diagnostics (via Google Ads); Purchase History (Apple StoreKit)',
        dataLinkedToYou: 'Purchase history (Apple StoreKit); Advertising & Device identifiers if tracking consent is granted',
        dataUsedToTrackYou: 'Device ID & Advertising Data (only if you opt in via Apple ATT prompt)',
        onDeviceStorage: 'User UI preferences, ad-consent choices, and unlocked sound pack entitlement tokens',
      },
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction & Overview',
          content: [
            'ApliVox ("we", "us", or "our") built the iSounds application as a lightweight mobile soundboard application.',
            'This Privacy Policy informs you regarding our policies on the collection, use, and disclosure of information when you use the iSounds mobile application, including our use of Google Ads (Google AdMob) and Apple StoreKit In-App Purchases.',
            'iSounds does not require user accounts, does not collect names or contact lists, and never accesses or records through your device microphone.',
          ],
        },
        {
          id: 'information-collection',
          title: '2. Information Collection and Local Storage',
          content: [
            'No Direct Personal Account Data: ApliVox does not ask for or collect your name, email address, phone number, or physical address inside iSounds.',
            'No Audio Recording: iSounds only plays pre-bundled sound effects. It never requests microphone permission and never records audio.',
            'Local Preferences Only: Settings such as Dark/Light Mode, sound preferences, and consent flags are stored locally on your device and are not uploaded to ApliVox servers.',
            'Third-Party Advertising Data: While ApliVox does not operate its own tracking servers, iSounds integrates the Google Mobile Ads SDK (Google Ads / AdMob), which may automatically process certain device and ad-interaction data as detailed in Section 4.',
          ],
        },
        {
          id: 'in-app-purchases',
          title: '3. In-App Purchases & Apple StoreKit Integration',
          content: [
            'Optional In-App Purchases: iSounds offers optional In-App Purchases, including non-consumable premium sound packs, extra reaction sets, and voluntary developer tip unlocks.',
            'Payment Processing by Apple: All financial transactions, billing operations, and payment methods (such as Apple Pay, credit cards, and PayPal) are managed solely by Apple Inc. through Apple StoreKit. ApliVox never receives, processes, or stores your credit card numbers, billing addresses, or banking information.',
            'Receipt Validation & Entitlements: When you make a purchase, Apple provides a cryptographic transaction receipt. This receipt is verified locally on your device via Apple StoreKit APIs to activate your unlocked features. The entitlement state is saved within sandboxed app storage.',
            'Restore Purchases: If you reinstall iSounds or switch to a new iOS device signed into the same Apple ID, you can restore all previously purchased content by tapping "Restore Purchases" in Settings at no extra cost.',
            'Billing Inquiries & Refunds: Because Apple handles all billing directly, any refund requests or purchase disputes are governed by Apple Media Services Terms and Conditions and must be submitted to Apple at reportaproblem.apple.com.',
          ],
        },
        {
          id: 'google-ads',
          title: '4. Advertising & Google Ads (Google AdMob)',
          content: [
            'Use of Google Ads: To support ongoing development and offer iSounds for free, the app displays advertisements served by Google LLC ("Google Ads" / "Google AdMob") via the Google Mobile Ads SDK.',
            'Information Processed by Google Ads: When loading or displaying ads, the Google Mobile Ads SDK may automatically collect and process: (a) Device & Advertising Identifiers (such as Apple IDFA if tracking permission is granted, or IDFV); (b) IP Address, which may be used to estimate general/coarse geographic location (country or city level) and prevent ad fraud; (c) Ad Interaction & Performance Data (ad views, clicks, and latency diagnostics); and (d) Device Information (device model, OS version, screen size, and language).',
            'Personalized vs. Non-Personalized Ads (Apple ATT): iSounds complies with Apple’s App Tracking Transparency (ATT) framework. Before accessing your device’s Advertising Identifier (IDFA) for personalized ads, iOS will prompt you for permission. If you select "Ask App Not to Track", Google Ads will not use IDFA for cross-app behavioral tracking and will only serve non-personalized / contextual ads.',
            'Regional Consent (GDPR / EEA / UK / U.S. State Privacy Laws): For users in the European Economic Area (EEA), the United Kingdom, Switzerland, and applicable U.S. states, iSounds uses Google’s User Messaging Platform (UMP) to present a consent dialog allowing you to accept, manage, or decline personalized advertising cookies and data processing.',
            'Managing Your Ad Preferences: You can revoke or change advertising tracking permissions at any time on your device via iOS Settings > Privacy & Security > Tracking, or enable "Limit Ad Tracking" / reset your advertising identifier. You may also learn how Google uses information from apps that use its services at https://policies.google.com/technologies/partner-sites and review Google’s Privacy Policy at https://policies.google.com/privacy.',
          ],
        },
        {
          id: 'network-usage',
          title: '5. Internet and Network Usage',
          content: [
            'Offline Sound Playback: Core soundboard playback works offline without requiring an active internet connection.',
            'Network Connections: Internet connectivity is used to fetch and display Google Ads, display regional ad-consent prompts, and communicate with Apple App Store servers during StoreKit In-App Purchases or purchase restoration.',
            'Support Email Trigger: If you tap the "Contact Us" support option, your device opens its native mail app to draft an email directly to support@aplivox.com.',
          ],
        },
        {
          id: 'children-privacy',
          title: "6. Children's Privacy (COPPA & Global Standards)",
          content: [
            'iSounds complies with the Children’s Online Privacy Protection Act (COPPA) and the EU General Data Protection Regulation (GDPR).',
            'ApliVox does not knowingly collect personal information from children under the age of 13. Where applicable, Google AdMob ad requests are configured in accordance with child-directed and age-appropriate advertising standards (excluding interest-based behavioral targeting for underage users).',
            'In-App Purchases are protected by iOS Screen Time and Apple Ask to Buy parental controls.',
          ],
        },
        {
          id: 'third-party',
          title: '7. Third-Party Services & Links',
          content: [
            'Google LLC (Google AdMob / Google Mobile Ads SDK): Used for displaying in-app advertisements and managing regional ad consent. Privacy Policy: https://policies.google.com/privacy',
            'Apple Inc. (Apple App Store & StoreKit): Used for app distribution, StoreKit In-App Purchase billing, and anonymized aggregate analytics via App Store Connect. Privacy Policy: https://www.apple.com/legal/privacy/',
          ],
        },
        {
          id: 'contact',
          title: '8. Support & Contact Information',
          content: [
            'If you have questions, data requests, or concerns regarding this privacy policy, Google Ads usage, or iSounds, please contact our support desk directly:',
            'Email: support@aplivox.com',
            'Website: https://aplivox.com',
            'Canonical Privacy URL: https://aplivox.com/privacy/isounds',
            'Support requests are answered by our engineering team within 24 to 48 business hours.',
          ],
        },
      ],
    },
  },
  {
    id: 'habitbloom',
    name: 'HabitBloom',
    shortName: 'HabitBloom',
    tagline: 'Start small. Stay consistent. Bloom every day.',
    heroHeadline: 'Meet your daily momentum. Better habits. Brighter days.',
    category: 'Health & Lifestyle / Productivity',
    badge: 'Mobile App',
    accentColor: 'indigo',
    accentBorder: 'border-indigo-500/30 hover:border-indigo-500/60',
    accentBg: 'bg-indigo-500/10',
    accentText: 'text-indigo-400',
    videoSrc: './assets/aistudio/HabitBloom_Promo_video_6cc0582d.mp4',
    description:
      'A mindful daily habit tracker engineered to build lasting consistency. Create personalized routines, track streaks, inspect monthly habit matrices, unlock HabitBloom Pro features, and export your personal data at any time.',
    highlights: [
      'Single-tap daily habit checkoffs and streak counters',
      'Visual Habit Consistency Matrix with 30-day analytics',
      'HabitBloom Pro In-App Purchases for unlimited habits & themes',
      'Configurable push reminders with custom Silent Hours',
      'Complete CSV data export and instant local storage reset',
    ],
    privacyHighlight:
      'Strict on-device storage. No habit logging sent to cloud servers. In-App Purchases processed securely via Apple StoreKit.',
    specs: {
      platform: 'iOS 16.0 or later',
      currentVersion: 'Version 1.2.0',
      pricing: 'Free with HabitBloom Pro In-App Purchases',
      storageMode: 'Local Encrypted SQLite / CoreData',
      internetRequired: 'No (Offline-first architecture; network only for App Store purchases)',
      ageRating: 'Rated 4+ (All ages)',
    },
    privacyPolicy: {
      appName: 'HabitBloom',
      appIdentifier: 'com.aplivox.habitbloom',
      path: '/privacy/habitbloom',
      canonicalUrl: 'https://aplivox.com/privacy/habitbloom',
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'HabitBloom is dedicated to protecting your personal routines and wellness data. All habits, schedules, logs, and streak metrics are stored strictly on your local device. We never sell, monetize, or transmit your habit data. Optional HabitBloom Pro In-App Purchases are processed through Apple StoreKit with zero access to your billing instruments.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'In-App Purchase History (processed via Apple StoreKit for Pro feature unlocks)',
        dataLinkedToYou: 'Purchase records handled by Apple StoreKit (not linked to habit data or identity by ApliVox)',
        dataUsedToTrackYou: 'None',
        onDeviceStorage: 'Habits, streaks, notes, notification schedules, and local Pro license token',
      },
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction & Philosophy',
          content: [
            'Habits are deeply personal. When you record your meditation, medication, sleep schedule, or fitness routines, that information belongs solely to you.',
            'ApliVox operates HabitBloom under an "Offline-First, Privacy-First" standard. We do not require account registration, social login, or cloud syncing to use core features.',
            'Your routines, streak records, and completion matrices remain strictly inside your device sandbox.',
          ],
        },
        {
          id: 'data-storage',
          title: '2. Local Data Storage & Encryption',
          content: [
            'On-Device Storage: All habit titles, target frequencies, completion timestamps, streaks, and custom notes are stored in a sandboxed database directly on your iOS device.',
            'No Cloud Mirroring: ApliVox does not maintain remote servers that store or profile your daily habits.',
            'Backup: If you enable iOS iCloud device backups, your HabitBloom data is backed up within your personal, encrypted Apple iCloud account governed by Apple’s security protocols.',
          ],
        },
        {
          id: 'in-app-purchases',
          title: '3. In-App Purchases & HabitBloom Pro Subscriptions',
          content: [
            'HabitBloom Pro Features: HabitBloom offers optional In-App Purchases, including HabitBloom Pro auto-renewable subscriptions (monthly or annual) and one-time lifetime unlock licenses that enable unlimited active routines, custom icons and color palettes, and advanced 30-day analytics.',
            'Secure Payment Execution by Apple: All transactions and billing cycles are processed exclusively through Apple StoreKit. ApliVox never has access to your banking information, payment card numbers, billing addresses, or Apple ID credentials.',
            'Subscription Management & Auto-Renewal: Auto-renewable subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing cycle. You can manage or cancel your subscription at any time in your iOS Apple ID Account Settings (Settings > [Your Name] > Subscriptions).',
            'Restore Purchases: You can restore your HabitBloom Pro access at any time across all your personal iOS devices signed into your Apple ID via Settings > Restore Purchases without incurring additional charges.',
            'Separation of Purchases from Personal Habits: Your purchase receipt is validated strictly to unlock Pro capabilities; your actual habits and completion logs are never linked to your Apple ID purchase records or transmitted to third parties.',
          ],
        },
        {
          id: 'notifications',
          title: '4. Device Notifications & Silent Hours',
          content: [
            'HabitBloom allows you to set daily reminders for your routines.',
            'Local Push Notifications: All reminders are scheduled locally on the device using Apple’s UserNotifications framework. No external remote push notification servers are used to trigger your reminders.',
            'Silent Hours: You can configure quiet hours during which no alerts will be generated.',
            'You may revoke notification permissions at any time through your iOS Settings.',
          ],
        },
        {
          id: 'data-ownership',
          title: '5. Data Ownership, Export (CSV) & Deletion',
          content: [
            'Export Data: HabitBloom includes a built-in "Export Data (CSV)" tool allowing you to export your complete habit logs at any time.',
            'Clear Local Storage: You can permanently erase all stored habits, history, and preferences from your device directly via Settings > Clear Local Storage.',
            'Uninstalling the app also purges all locally stored app sandbox data immediately.',
          ],
        },
        {
          id: 'analytics',
          title: '6. Analytics & Diagnostics',
          content: [
            'HabitBloom does not use third-party user behavioral tracking SDKs (no Facebook Pixel, no Google Firebase Analytics, no Mixpanel).',
            'Only crash reports explicitly opted into by the user via Apple TestFlight or iOS Diagnostics are collected in aggregate by Apple and shared with developers.',
          ],
        },
        {
          id: 'contact',
          title: '7. Contact & Support',
          content: [
            'For any questions regarding your data or feature suggestions:',
            'Email: support@aplivox.com',
            'Organization: ApliVox Digital Innovation',
            'Website: https://aplivox.com',
            'Canonical Privacy URL: https://aplivox.com/privacy/habitbloom',
          ],
        },
      ],
    },
  },
  {
    id: 'motorlog',
    name: 'MotorLog',
    shortName: 'MotorLog',
    tagline: 'Your vehicle story. Beautifully kept.',
    heroHeadline: 'Care for every journey. Keep your garage organized.',
    category: 'Auto & Vehicles / Fleet & Utilities',
    badge: 'Mobile App',
    accentColor: 'cyan',
    accentBorder: 'border-cyan-500/30 hover:border-cyan-500/60',
    accentBg: 'bg-cyan-500/10',
    accentText: 'text-cyan-400',
    videoSrc: './assets/aistudio/MotorLog_Promo_video_1c8d6bca.mp4',
    description:
      'A comprehensive vehicle garage manager and maintenance history tracker. Log services, oil changes, repairs, odometer readings, and costs, while assigning drivers with license expiry records.',
    highlights: [
      'Multi-vehicle digital garage with photos, plates, and VIN records',
      'Complete maintenance timeline with costs, receipts, and odometer readings',
      'Assigned driver management with license expiration alerts',
      'MotorLog Pro subscription & restore purchases via StoreKit',
      'Dark & Light appearance tailored for day or night garage inspections',
    ],
    privacyHighlight:
      'All vehicle logs, VIN records, and receipts remain strictly on your device. In-app purchases managed through secure Apple StoreKit.',
    specs: {
      platform: 'iOS 16.0 or later',
      currentVersion: 'Version 1.0.0',
      pricing: 'Free with MotorLog Pro Tier',
      storageMode: 'On-Device Vehicle Database',
      internetRequired: 'Optional (Receipt sync & StoreKit purchase validation)',
      ageRating: 'Rated 4+ (Drivers & Fleet Owners)',
    },
    privacyPolicy: {
      appName: 'MotorLog',
      appIdentifier: 'com.aplivox.motorlog',
      path: '/privacy/motorlog',
      canonicalUrl: 'https://aplivox.com/privacy/motorlog',
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'MotorLog values the confidentiality of your vehicle fleet and maintenance records. Your vehicle photos, license plates, chassis numbers, odometer milestones, service receipts, and driver licenses are stored securely on your device. We do not sell vehicle data or share your logs with insurance providers or advertising brokers.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'In-App Purchase Records (processed via Apple StoreKit for MotorLog Pro)',
        dataLinkedToYou: 'In-App Purchase history (processed by Apple StoreKit, not linked to garage records)',
        dataUsedToTrackYou: 'None',
        onDeviceStorage: 'Vehicles, maintenance records, driver details, odometer readings',
      },
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction',
          content: [
            'MotorLog was created by ApliVox to help drivers and vehicle enthusiasts meticulously maintain their vehicles without forfeiting their privacy.',
            'This Privacy Policy describes how MotorLog handles data including vehicle specifications, service records, and driver assignments.',
          ],
        },
        {
          id: 'garage-data',
          title: '2. Garage & Vehicle Information Handled Locally',
          content: [
            'Vehicle Details: Make, model, year, trim, license plate number, VIN/chassis number, fuel type (petrol, diesel, hybrid, electric), color, and current mileage are stored locally on your device.',
            'Maintenance Records: Service dates, service provider names (e.g., local workshops), part replacements, costs, and notes are held in the local app database.',
            'Driver Information: Names, license expiration dates, and vehicle assignments entered into the Drivers tab remain on your device.',
            'We do not transmit your VIN or vehicle license plates to any third-party marketing, telematics, or insurance brokers.',
          ],
        },
        {
          id: 'camera-photos',
          title: '3. Camera and Photo Library Access',
          content: [
            'MotorLog allows you to attach photos of your vehicles and maintenance receipts.',
            'Photo access is requested solely to let you choose or capture an image.',
            'Vehicle photos and receipt images are stored exclusively in the app’s local directory and are not uploaded to our servers.',
          ],
        },
        {
          id: 'in-app-purchases',
          title: '4. In-App Purchases & MotorLog Pro (Apple StoreKit)',
          content: [
            'MotorLog offers an optional MotorLog Pro subscription and lifetime license that unlocks unlimited vehicles and advanced service records.',
            'All payment processing is handled strictly by Apple Inc. via Apple StoreKit. ApliVox does not collect, receive, or store your credit card numbers, billing addresses, or payment credentials.',
            'Subscriptions can be canceled at any time in Apple ID Account Settings.',
            'You can restore previously purchased Pro licenses using the "Restore Purchases" button in Settings.',
          ],
        },
        {
          id: 'erase-data',
          title: '5. Data Erasure & Control',
          content: [
            'MotorLog provides an explicit "Erase all data" action inside Settings > Data.',
            'Tapping this action permanently wipes all vehicles, drivers, records, receipts, and photos stored on the device.',
          ],
        },
        {
          id: 'contact',
          title: '6. Support & Inquiries',
          content: [
            'For technical support, warranty questions, or privacy disclosures:',
            'Email: support@aplivox.com',
            'Organization: ApliVox Engineering Studio',
            'Website: https://aplivox.com',
            'Canonical Privacy URL: https://aplivox.com/privacy/motorlog',
          ],
        },
      ],
    },
  },
];

export const COMPANY_INFO = {
  name: 'ApliVox',
  legalName: 'ApliVox Digital Innovation & Software Engineering',
  tagline: 'A modern software engineering and digital innovation company.',
  vision:
    'To become a globally recognised technology company, empowering businesses and individuals through innovative digital solutions.',
  mission:
    'To transform ideas into impactful software products through innovation, engineering excellence and a commitment to delivering meaningful digital experiences.',
  supportEmail: 'support@aplivox.com',
  websiteDomain: 'aplivox.com',
  foundedYear: '2026',
  headquarters: 'Digital Innovation Hub',
  pillars: [
    {
      title: 'Engineering Excellence',
      description:
        'Crafting resilient, high-performance mobile and web software with precision architectures and clean codebase standards.',
    },
    {
      title: 'Privacy By Design',
      description:
        'Championing offline-first storage, transparent data disclosures, and zero unwanted tracking across all consumer applications.',
    },
    {
      title: 'Meaningful Digital Experiences',
      description:
        'Designing intuitive interfaces with tactile responsiveness, purposeful micro-interactions, and accessible typography.',
    },
    {
      title: 'Continuous Innovation',
      description:
        'Transforming conceptual ideas into production-ready platforms that deliver concrete utility and delight to everyday users.',
    },
  ],
};

export const CORPORATE_PRIVACY_POLICY: AppPrivacyPolicy = {
  appName: 'ApliVox Corporate & Platform',
  appIdentifier: 'com.aplivox.corporate',
  path: '/privacy',
  canonicalUrl: 'https://aplivox.com/privacy',
  effectiveDate: 'November 1, 2026',
  lastUpdated: 'November 12, 2026',
  summary:
    'This overarching Privacy Policy explains how ApliVox manages data across our company website, mobile applications, and customer support channels. We practice strict data minimization and adhere to global standards including GDPR, CCPA, and Apple App Store Review Guidelines.',
  contactEmail: 'support@aplivox.com',
  appStoreNutrition: {
    dataCollected: 'App-specific (Google Ads SDK in iSounds; StoreKit purchase records)',
    dataLinkedToYou: 'Customer support communication records only when initiated by you',
    dataUsedToTrackYou: 'None (except opt-in Apple ATT advertising in iSounds)',
    onDeviceStorage: 'Application state stored strictly on-device',
  },
  sections: [
    {
      id: 'commitment',
      title: '1. Our Privacy Commitment',
      content: [
        'At ApliVox, we believe privacy is a fundamental human right. Our products are engineered with privacy as a foundational constraint, not an afterthought.',
        'We never sell your personal data to data brokers. Where an application displays advertisements (such as Google Ads / AdMob in iSounds), we provide explicit disclosures, Apple App Tracking Transparency (ATT) prompts, and regional consent controls.',
      ],
    },
    {
      id: 'website-data',
      title: '2. Website Visits & Telemetry',
      content: [
        'When you visit aplivox.com, our hosting infrastructure receives standard HTTP request headers necessary to transmit web pages (such as IP address and browser user agent).',
        'We do not use invasive tracking cookies, session replay recording tools, or cross-site tracking beacons.',
      ],
    },
    {
      id: 'support-inquiries',
      title: '3. Customer Support Inquiries',
      content: [
        'When you contact our support desk via support@aplivox.com, we receive your email address, message body, and any attachments you provide.',
        'We use this information exclusively to resolve your support inquiry or troubleshoot technical issues with iSounds, HabitBloom, or MotorLog.',
        'We never sell your email address to mailing lists or marketing aggregators.',
      ],
    },
    {
      id: 'app-privacy-links',
      title: '4. Application-Specific Privacy Policies & In-App Purchases',
      content: [
        'Each mobile application developed by ApliVox maintains its own dedicated privacy policy reflecting its technical architecture:',
        '• iSounds (https://aplivox.com/privacy/isounds): On-device soundboard featuring Google Ads (AdMob) with ATT/GDPR consent controls, Apple StoreKit in-app purchases, and zero audio recording.',
        '• HabitBloom (https://aplivox.com/privacy/habitbloom): Offline-first mindful habit tracker with HabitBloom Pro StoreKit subscriptions, local storage, and CSV export.',
        '• MotorLog (https://aplivox.com/privacy/motorlog): Vehicle garage and maintenance tracker with sandboxed device logs and MotorLog Pro StoreKit subscriptions.',
      ],
    },
    {
      id: 'rights',
      title: '5. Your Rights & Data Requests',
      content: [
        'Depending on your jurisdiction (such as the EEA, UK, or California), you have rights regarding access, portability, and deletion of any data you have submitted to us.',
        'Because our applications store data locally on your device, you have direct, instantaneous control: you can export data via CSV or clear your local storage at any time.',
        'To submit formal data inquiries or GDPR/CCPA requests, contact support@aplivox.com.',
      ],
    },
    {
      id: 'contact-corporate',
      title: '6. Corporate Contact',
      content: [
        'ApliVox Digital Innovation & Software Engineering',
        'Support Desk: support@aplivox.com',
        'Website: https://aplivox.com',
      ],
    },
  ],
};
