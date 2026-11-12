export interface PrivacySection {
  id: string;
  title: string;
  content: string[];
}

export interface AppPrivacyPolicy {
  appName: string;
  appIdentifier: string;
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
    videoSrc: '/assets/aistudio/iSounds_Promo_video_1ff991e3.mp4',
    description:
      'A responsive, offline-ready soundboard mobile application delivering over 100 funny and expressive reaction sounds. Built with tap-to-play immediacy, sound search, and custom dark/light themes.',
    highlights: [
      '100+ high-quality curated reaction & comedic sounds',
      'Instant tap-to-play & tap-to-stop audio engine',
      'Dual appearance: Optimized Dark & Light modes',
      'Completely functional offline without network access',
      'Minimalist, distraction-free sound navigation',
    ],
    privacyHighlight:
      'Zero personal data collection. No microphone or audio recordings. 100% on-device audio playback.',
    specs: {
      platform: 'iOS 15.0 or later',
      currentVersion: 'Version 1.0.0',
      pricing: 'Free with optional sound packs',
      storageMode: '100% On-Device Asset Bundle',
      internetRequired: 'No (Full offline playback)',
      ageRating: 'Rated 4+ (Family Friendly)',
    },
    privacyPolicy: {
      appName: 'iSounds',
      appIdentifier: 'com.aplivox.isounds',
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'iSounds is designed from the ground up to respect your privacy. The app operates entirely locally on your device, does not record any audio, does not require an account, and does not sell or share personal data.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'None (Data Not Collected)',
        dataLinkedToYou: 'None',
        dataUsedToTrackYou: 'None',
        onDeviceStorage: 'User UI preferences (Dark/Light mode) saved locally',
      },
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction & Overview',
          content: [
            'ApliVox ("we", "us", or "our") built the iSounds application as a privacy-first mobile soundboard application.',
            'This Privacy Policy informs you regarding our policies on the collection, use, and disclosure of personal data when you use the iSounds mobile application.',
            'Our core principle is simple: your device is your own. iSounds does not collect personal information, does not harvest contact details, and does not listen to your microphone.',
          ],
        },
        {
          id: 'information-collection',
          title: '2. Information Collection and Storage',
          content: [
            'No Personal Information: We do not ask for or collect names, email addresses, phone numbers, or physical addresses within iSounds.',
            'No Audio Recording: iSounds only outputs pre-bundled sound effects. It does not access, request permission for, or record through your device microphone.',
            'Local Settings Only: User preferences such as theme selection (Light vs. Dark Mode) and volume levels are stored exclusively in local device storage (UserDefaults / Keychain) and never uploaded to our servers.',
          ],
        },
        {
          id: 'network-usage',
          title: '3. Internet and Network Usage',
          content: [
            'iSounds is engineered to run seamlessly in airplane mode without internet connectivity.',
            'The app does not communicate with any external analytics servers, behavioral tracking trackers, or ad networks.',
            'The only optional network interaction occurs if you choose to tap the "Contact Us" support button, which will launch your native mail client to draft an email to support@aplivox.com.',
          ],
        },
        {
          id: 'children-privacy',
          title: "4. Children's Privacy (COPPA & Global Standards)",
          content: [
            'iSounds complies with the Children’s Online Privacy Protection Act (COPPA) and the EU General Data Protection Regulation (GDPR).',
            'We do not knowingly collect any personally identifiable information from children under the age of 13.',
            'Because the app collects no personal information whatsoever, it is safe for family use.',
          ],
        },
        {
          id: 'third-party',
          title: '5. Third-Party Services & Apple App Store',
          content: [
            'iSounds is distributed through the Apple App Store. When you download, update, or purchase anything through Apple, Apple Inc. handles billing and licensing according to their Apple Privacy Policy.',
            'ApliVox receives only anonymized aggregate download metrics provided standard by Apple App Store Connect without individual identifiers.',
          ],
        },
        {
          id: 'contact',
          title: '6. Support & Contact Information',
          content: [
            'If you have questions, feedback, or concerns regarding this privacy policy or iSounds, please contact our support desk directly:',
            'Email: support@aplivox.com',
            'Domain: aplivox.com',
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
    videoSrc: '/assets/aistudio/HabitBloom_Promo_video_6cc0582d.mp4',
    description:
      'A mindful daily habit tracker engineered to build lasting consistency. Create personalized routines, track streaks, inspect monthly habit matrices, and export your personal data at any time.',
    highlights: [
      'Single-tap daily habit checkoffs and streak counters',
      'Visual Habit Consistency Matrix with 30-day analytics',
      'Personalized habit icons, frequencies, and color themes',
      'Configurable push reminders with custom Silent Hours',
      'Complete CSV data export and instant local storage reset',
    ],
    privacyHighlight:
      'Strict on-device storage. No habit logging sent to cloud servers. User maintains full ownership and CSV export rights.',
    specs: {
      platform: 'iOS 16.0 or later',
      currentVersion: 'Version 1.2.0',
      pricing: 'Free with Pro Features',
      storageMode: 'Local Encrypted SQLite / CoreData',
      internetRequired: 'No (Offline-first architecture)',
      ageRating: 'Rated 4+ (All ages)',
    },
    privacyPolicy: {
      appName: 'HabitBloom',
      appIdentifier: 'com.aplivox.habitbloom',
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'HabitBloom is dedicated to protecting your personal routines and wellness data. All your habits, schedules, completion logs, and streak metrics are stored strictly on your local device. We never sell, monetize, or transmit your habit data.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'None (Data Not Collected)',
        dataLinkedToYou: 'None',
        dataUsedToTrackYou: 'None',
        onDeviceStorage: 'Habits, streaks, notes, and notification schedules',
      },
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction & Philosophy',
          content: [
            'Habits are deeply personal. When you record your meditation, medication, sleep schedule, or fitness routines, that information belongs solely to you.',
            'ApliVox operates HabitBloom under an "Offline-First, Privacy-First" standard. We do not require account registration, social login, or cloud syncing to use core features.',
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
          id: 'notifications',
          title: '3. Device Notifications & Silent Hours',
          content: [
            'HabitBloom allows you to set daily reminders for your routines.',
            'Local Push Notifications: All reminders are scheduled locally on the device using Apple’s UserNotifications framework. No external remote push notification servers are used to trigger your reminders.',
            'Silent Hours: You can configure quiet hours during which no alerts will be generated.',
            'You may revoke notification permissions at any time through your iOS Settings.',
          ],
        },
        {
          id: 'data-ownership',
          title: '4. Data Ownership, Export (CSV) & Deletion',
          content: [
            'Export Data: HabitBloom includes a built-in "Export Data (CSV)" tool allowing you to export your complete habit logs at any time.',
            'Clear Local Storage: You can permanently erase all stored habits, history, and preferences from your device directly via Settings > Clear Local Storage.',
            'Uninstalling the app also purges all locally stored app sandbox data immediately.',
          ],
        },
        {
          id: 'analytics',
          title: '5. Analytics & Diagnostics',
          content: [
            'HabitBloom does not use third-party user behavioral tracking SDKs (no Facebook Pixel, no Google Firebase Analytics, no Mixpanel).',
            'Only crash reports explicitly opted into by the user via Apple TestFlight or iOS Diagnostics are collected in aggregate by Apple and shared with developers.',
          ],
        },
        {
          id: 'contact',
          title: '6. Contact & Support',
          content: [
            'For any questions regarding your data or feature suggestions:',
            'Email: support@aplivox.com',
            'Organization: ApliVox Digital Innovation',
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
    videoSrc: '/assets/aistudio/MotorLog_Promo_video_1c8d6bca.mp4',
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
      effectiveDate: 'November 1, 2026',
      lastUpdated: 'November 12, 2026',
      summary:
        'MotorLog values the confidentiality of your vehicle fleet and maintenance records. Your vehicle photos, license plates, chassis numbers, odometer milestones, service receipts, and driver licenses are stored securely on your device. We do not sell vehicle data or share your logs with insurance providers or advertising brokers.',
      contactEmail: 'support@aplivox.com',
      appStoreNutrition: {
        dataCollected: 'None (Data Not Collected for Tracking)',
        dataLinkedToYou: 'In-App Purchase history (processed by Apple StoreKit)',
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
          title: '4. In-App Purchases & MotorLog Pro',
          content: [
            'MotorLog offers an optional MotorLog Pro subscription that unlocks unlimited vehicles and advanced service records.',
            'All payment processing is handled strictly by Apple Inc. via Apple StoreKit.',
            'ApliVox does not collect, receive, or store your credit card numbers, billing addresses, or payment credentials.',
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
  effectiveDate: 'November 1, 2026',
  lastUpdated: 'November 12, 2026',
  summary:
    'This overarching Privacy Policy explains how ApliVox manages data across our company website, mobile applications, and customer support channels. We practice strict data minimization and adhere to global standards including GDPR, CCPA, and Apple App Store Review Guidelines.',
  contactEmail: 'support@aplivox.com',
  appStoreNutrition: {
    dataCollected: 'Zero ad tracking or broker selling',
    dataLinkedToYou: 'Customer support communication records only when initiated by you',
    dataUsedToTrackYou: 'None',
    onDeviceStorage: 'Application state stored strictly on-device',
  },
  sections: [
    {
      id: 'commitment',
      title: '1. Our Privacy Commitment',
      content: [
        'At ApliVox, we believe privacy is a fundamental human right. Our products are engineered with privacy as a foundational constraint, not an afterthought.',
        'We do not monetize your attention, harvest personal data for advertising brokers, or inject third-party surveillance scripts into our mobile apps or website.',
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
      title: '4. Application-Specific Privacy Policies',
      content: [
        'Each mobile application developed by ApliVox maintains its own dedicated privacy policy reflecting its technical architecture:',
        '• iSounds: 100% on-device entertainment soundboard with zero data collection.',
        '• HabitBloom: Offline-first mindful habit tracker with local storage and CSV export.',
        '• MotorLog: Vehicle garage and maintenance tracker with sandboxed device logs.',
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
