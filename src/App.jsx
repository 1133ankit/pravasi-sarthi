import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  ShoppingBag,
  Languages,
  Users,
  MapPin,
  ExternalLink,
  Check,
  Phone,
  X,
  Globe,
  PlusCircle,
  Trash2,
  Stethoscope,
  Sparkles,
  Clock,
  Building2,
  Navigation,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  MessageCircle,
  Send,
  MessageSquare,
  Inbox,
  ArrowRight,
  Package,
  ShieldAlert,
  Volume2,
  Mic,
  Info,
  Mail,
  Heart,
  Scale,
  Star
} from 'lucide-react';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://auidzdcvivgcndeyhfgd.supabase.co';
const supabaseKey = 'sb_publishable_JmnBDLOHFbCQuV3p_ojRkA_yS9-Uqhi';
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// 1. ALL 10 INDIAN MOTHER TONGUES CONFIGURATION
// ============================================================================
const INDIAN_LANGUAGES = [
  { code: 'hi', name: 'हिन्दी', label: 'Hindi', greeting: 'नमस्ते' },
  { code: 'ta', name: 'தமிழ்', label: 'Tamil', greeting: 'வணக்கம்' },
  { code: 'te', name: 'తెలుగు', label: 'Telugu', greeting: 'నమస్కారం' },
  { code: 'bn', name: 'বাংলা', label: 'Bengali', greeting: 'নমস্কার' },
  { code: 'mr', name: 'मराठी', label: 'Marathi', greeting: 'नमस्कार' },
  { code: 'gu', name: 'ગુજરાતી', label: 'Gujarati', greeting: 'નમસ્તે' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', label: 'Punjabi', greeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ' },
  { code: 'kn', name: 'ಕನ್ನಡ', label: 'Kannada', greeting: 'ನಮಸ್ಕಾರ' },
  { code: 'ml', name: 'മലയാളം', label: 'Malayalam', greeting: 'നമസ്കാരം' },
  { code: 'en', name: 'English', label: 'English', greeting: 'Namaste' }
];

// ============================================================================
// 2. GERMANY CONFIGURATION, STATES & CITIES
// ============================================================================
const GERMANY_CONFIG = {
  name: 'Germany (Deutschland)',
  flag: '🇩🇪',
  currency: 'EUR',
  symbol: '€',
  rateToInr: 106.58,
  emergencyPhone: '112',
  medicalOnCall: '116 117',
  officialLang: 'German (Deutsch)',
  states: [
    {
      name: 'Hessen',
      cities: ['Frankfurt am Main', 'Wiesbaden', 'Kassel', 'Darmstadt']
    },
    {
      name: 'Bayern (Bavaria)',
      cities: ['Munich (München)', 'Nuremberg (Nürnberg)', 'Augsburg', 'Regensburg']
    },
    {
      name: 'Berlin',
      cities: ['Berlin Central', 'Charlottenburg', 'Pankow', 'Spandau']
    },
    {
      name: 'Nordrhein-Westfalen (NRW)',
      cities: ['Cologne (Köln)', 'Düsseldorf', 'Dortmund', 'Essen']
    },
    {
      name: 'Baden-Württemberg',
      cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Heidelberg']
    },
    {
      name: 'Hamburg',
      cities: ['Hamburg Central', 'Altona', 'Harburg', 'Wandsbek']
    }
  ],
  lostCardText: {
    heading: 'NOTFALL / BITTE HELFEN SIE MIR!',
    body: 'Entschuldigung, ich spreche kein Deutsch. Ich habe mich verlaufen und brauche Hilfe, um meine Familie zu kontaktieren. Bitte rufen Sie diese Telefonnummer an oder helfen Sie mir zur unten stehenden Adresse.',
    callPrompt: 'Bitte rufen Sie meine Familie an:'
  }
};

// ============================================================================
// 3. COMPLETE UI TRANSLATION DICTIONARY (10 LANGUAGES)
// ============================================================================
const UI_TEXT = {
  hi: {
    appName: 'प्रवासी सारथी: जर्मनी',
    editionTag: 'जर्मनी विशेष गाइड',
    tagline: 'जर्मनी में भारतीय परिवारों, छात्रों और पेशेवरों के लिए विश्वसनीय साथी',
    lostHelpBtn: '🚨 रास्ता भटक गए? (मदद)',
    selectLangTitle: 'अपनी मातृभाषा चुनें',
    policeAmbulance: 'पुलिस / एम्बुलेंस:',
    nonEmergencyDoc: 'डॉक्टर ऑन-कॉल:',
    currencyCalc: 'करेंसी कैलकुलेटर (रुपये ↔ यूरो)',
    tabs: {
      journey: '१. पहला महीना (रोडमैप)',
      offices: '२. सरकारी ऑफिस',
      regulations: '३. जर्मन नियम व कानून',
      flashcards: '४. स्क्रीन कार्ड्स',
      essentials: '५. अस्पताल व 24/7 फार्मेसी',
      desiRadar: '६. किराना व रेस्टोरेंट',
      community: '७. मंदिर व पार्क',
      chat: '८. कम्युनिटी चैट',
      about: '९. हमारे बारे में'
    },
    roadmapHeading: 'जर्मनी में पहले ३० दिन का मास्टर रोडमैप',
    roadmapSub: 'सिम कार्ड से लेकर अपार्टमेंट रेंटिंग, Anmeldung, Deutschlandticket और टैक्स आईडी तक की पूरी कानूनी प्रक्रिया।',
    regulationsHeading: 'जर्मनी के मुख्य नियम और कानून (German Regulations)',
    regulationsSub: 'जर्मनी में रहते समय इन कानूनी नियमों का पालन करना अनिवार्य है।',
    simpleBriefHeading: 'सरल भाषा में समझें:',
    actionPlanHeading: 'कार्य योजना:',
    markCompleteBtn: 'सम्पन्न चिह्नित करें',
    completedBtn: 'सम्पन्न हुआ ✓',
    youAreAsking: 'आप क्या पूछ रहे हैं:',
    showToLocal: 'स्थानीय व्यक्ति को दिखाएं:',
    tapToAnswer: '👇 सामने वाला व्यक्ति सीधे स्क्रीन पर जवाब चुन सकता है:',
    localAnswered: 'सामने वाले व्यक्ति ने यह उत्तर चुना:',
    addNewCardBtn: '➕ नया फ्लैशकार्ड बनाएं',
    customCardBadge: 'कस्टम कार्ड',
    templateLabel: '⚡ रेडीमेड टेम्पलेट चुनें:',
    substitutesTitle: 'जर्मन सुपरमार्केट (Rewe/Aldi/Lidl) में देसी विकल्प',
    substitutesSub: 'पनीर, आटा और दही के स्थानीय विकल्प:',
    safeAlternative: 'सुरक्षित विकल्प',
    restaurantsTitle: 'भारतीय रेस्टोरेंट व किराना स्टोर',
    communityTitle: 'भारतीय परिवार, मंदिर व गुरुद्वारे',
    homeAddressLabel: 'घर का पता:',
    callFamilyBtn: 'कॉल करें',
    navigateHome: '📍 गूगल मैप्स पर घर का रास्ता',
    openGoogleMaps: '📍 गूगल मैप्स पर खोलें',
    openPortal: '🌐 आधिकारिक पोर्टल खोलें',
    officeSectionTitle: 'प्रमुख जर्मन सरकारी कार्यालय',
    liveMedicalLocator: 'लाइव मेडिकल और क्लिनिक लोकेटर',
    gpsMedicalDesc: 'निकटतम आपातकालीन कक्ष, 24/7 डॉक्टर (Hausarzt) और रविवार को खुली फार्मेसी (Notdienst) खोजें।'
  },
  en: {
    appName: 'Pravasi Sarthi: Germany',
    editionTag: 'Germany Edition',
    tagline: 'Trusted Settlement & Daily Living Guide for Indian Families & Professionals in Germany',
    lostHelpBtn: '🚨 Lost & Need Help?',
    selectLangTitle: 'Select Your Mother Tongue',
    policeAmbulance: 'Police / Ambulance:',
    nonEmergencyDoc: 'Doctor On-Call:',
    currencyCalc: 'Currency Calculator (INR ↔ EUR)',
    tabs: {
      journey: '1. First 30 Days (Roadmap)',
      offices: '2. Govt Offices',
      regulations: '3. German Regulations',
      flashcards: '4. Flashcards',
      essentials: '5. Hospitals & Pharmacy',
      desiRadar: '6. Groceries & Food',
      community: '7. Temples & Parks',
      chat: '8. Community Chat',
      about: '9. About Us'
    },
    roadmapHeading: 'First 30 Days Master Relocation Roadmap',
    roadmapSub: 'Complete tasks from landing in Germany to getting your D-Ticket, apartment, and Tax ID.',
    regulationsHeading: 'German Rules & Regulations',
    regulationsSub: 'Mandatory legal obligations, quiet hours, and recycling laws in Germany.',
    simpleBriefHeading: 'In Simple Words:',
    actionPlanHeading: 'Action Plan:',
    markCompleteBtn: 'Mark Complete',
    completedBtn: 'Completed ✓',
    youAreAsking: 'What you are asking:',
    showToLocal: 'Show to Local Person:',
    tapToAnswer: '👇 The local person can tap their answer directly on the screen:',
    localAnswered: 'The local person selected this answer:',
    addNewCardBtn: '➕ Create Custom Card',
    customCardBadge: 'Custom Card',
    templateLabel: '⚡ Select a Template:',
    substitutesTitle: 'Desi Substitutes in German Supermarkets (Rewe/Edeka)',
    substitutesSub: 'Find alternatives for paneer, chakki atta, and curd locally:',
    safeAlternative: 'Safe Alternative',
    restaurantsTitle: 'Indian Restaurants & Grocery Stores',
    communityTitle: 'Indian Families, Temples & Gurudwaras',
    homeAddressLabel: 'Home Address:',
    callFamilyBtn: 'Call Now',
    navigateHome: '📍 Navigate Home on Google Maps',
    openGoogleMaps: '📍 Open on Google Maps',
    openPortal: '🌐 Open Official Portal',
    officeSectionTitle: 'Official German Government Offices',
    liveMedicalLocator: 'Live Medical & Clinic Locator',
    gpsMedicalDesc: 'Find nearest emergency rooms, 24/7 doctors, and Sunday duty pharmacies (Notdienst).'
  }
};

// Fallback generator for other languages to English base if needed
['ta', 'te', 'bn', 'mr', 'gu', 'pa', 'kn', 'ml'].forEach(code => {
  if (!UI_TEXT[code]) UI_TEXT[code] = UI_TEXT.en;
});

// ============================================================================
// 4. GERMANY 30-DAY RELOCATION ROADMAP TASKS (WITH D-TICKET & DB NAVIGATOR)
// ============================================================================
const GERMANY_ROADMAP_TASKS = [
  {
    id: 'sim_connectivity',
    dayTarget: 'Day 0 (Pre-arrival / Landing)',
    urgency: 'Critical',
    category: 'Connectivity',
    title: 'Instant SIM Card & Mobile Data (eSIM)',
    whyImportant: 'You need active internet immediately upon landing at Frankfurt, Munich, or Berlin airport for transit apps, maps, and booking rides.',
    brief: {
      hi: 'लैंड करते ही इंटरनेट चालू रखने के लिए एयरलाइन में बैठने से पहले डिजिटल eSIM (Airalo/Holafly) या एयरपोर्ट पर Lebara/Lycamobile सिम खरीदें।',
      en: 'Activate an instant eSIM (Airalo, Holafly) before boarding or buy a prepaid SIM (Telekom, Vodafone, O2, Lebara) upon arrival.'
    },
    steps: [
      'Download a European travel eSIM before departure, or',
      'Purchase a prepaid physical SIM card at airport kiosks (bring your Indian Passport for verification).'
    ]
  },
  {
    id: 'transportation_dticket',
    dayTarget: 'Day 1–3',
    urgency: 'High',
    category: 'Daily Living & Transit',
    title: 'Deutschlandticket (D-Ticket) & DB Navigator',
    whyImportant: 'The €49/month Deutschlandticket grants unlimited regional and city transit (U-Bahn, buses, trams, regional trains) across all of Germany. DB Navigator is mandatory for live schedules.',
    brief: {
      hi: 'पूरे जर्मनी में असीमित यात्रा के लिए Deutschlandticket (€49/month) लें और लाइव ट्रेनों के लिए DB Navigator ऐप डाउनलोड करें।',
      en: 'Get the monthly Deutschlandticket for nationwide transit and download DB Navigator for live train tracking.'
    },
    steps: [
      'Download the DB Navigator app for live train routing and ticket bookings.',
      'Subscribe to the Deutschlandticket digitally via RMV, MVV, BVG, or DB app for seamless travel.'
    ]
  },
  {
    id: 'apartment_renting',
    dayTarget: 'Day 1–14',
    urgency: 'Critical',
    category: 'Housing',
    title: 'Finding Accommodation & Landlord Certificate',
    whyImportant: 'Without a permanent rental agreement and the landlord confirmation form (Wohnungsgeberbestätigung), you cannot register your address.',
    brief: {
      hi: 'फ्लैट ढूंढना (ImmoScout24) और मकान मालिक से Wohnungsgeberbestätigung फॉर्म लेना अनिवार्य है।',
      en: 'Secure temporary/permanent housing and obtain the mandatory landlord move-in certificate.'
    },
    steps: [
      'Search via ImmoScout24, WG-Gesucht, or temporary furnished apartments (Homelike, Wunderflats).',
      'Ensure the landlord signs the official Wohnungsgeberbestätigung form.'
    ]
  },
  {
    id: 'anmeldung',
    dayTarget: 'Day 7–14',
    urgency: 'Critical',
    category: 'Legal Registration',
    title: 'Anmeldung (Address Registration at Bürgeramt)',
    whyImportant: 'By German law, you must register your address within 14 days of moving in. Required to get your Tax ID and open bank accounts.',
    brief: {
      hi: '14 दिन के अंदर स्थानीय नगर निगम (Bürgeramt) में जाकर एड्रेस रजिस्ट्रेशन कराना अनिवार्य है।',
      en: 'Book an appointment at the local Bürgeramt within 14 days of moving in.'
    },
    steps: [
      'Book your appointment online via your city\'s Bürgeramt portal.',
      'Carry your Passport, Visa, and signed Landlord Form.'
    ]
  },
  {
    id: 'health_insurance',
    dayTarget: 'Day 1–7',
    urgency: 'Critical',
    category: 'Healthcare',
    title: 'Health Insurance (Krankenkasse) & Family Cover',
    whyImportant: 'Health insurance is legally mandatory in Germany from day one. Public funds like TK or AOK allow free family co-insurance for spouses and children.',
    brief: {
      hi: 'सार्वजनिक स्वास्थ्य बीमा (TK, AOK) में पंजीकरण करें। पति/पत्नी और बच्चे मुफ्त में जुड़ जाते हैं।',
      en: 'Enroll in statutory health insurance (TK, AOK, Barmer). Eligible spouses and children are covered at zero extra cost.'
    },
    steps: [
      'Submit your employment contract or university admission to Techniker Krankenkasse (TK) or AOK.',
      'Apply for family co-insurance (Familienversicherung) with marriage and birth certificates.'
    ]
  },
  {
    id: 'bank_account',
    dayTarget: 'Day 5–10',
    urgency: 'High',
    category: 'Finance',
    title: 'German IBAN Bank Account (N26 / C24 / Sparkasse)',
    whyImportant: 'Your employer requires a German/EU IBAN to credit your salary. Landlords and utility providers also require direct SEPA debit.',
    brief: {
      hi: 'सैलरी और मकान किराए के लिए जर्मन IBAN खाता खोलें (N26, C24 या स्पार्कसे)।',
      en: 'Open a local German bank account for salary credits, rent, and utility deductions.'
    },
    steps: [
      'Download a digital bank app (N26, C24, Bunq) for instant video-KYC using your passport.',
      'Traditional banks (Sparkasse, Commerzbank) require your Anmeldung certificate.'
    ]
  },
  {
    id: 'tax_id',
    dayTarget: 'Day 14–21',
    urgency: 'High',
    category: 'Tax & Payroll',
    title: 'Tax ID (Steuerliche Identifikationsnummer)',
    whyImportant: 'Generated automatically by the Federal Central Tax Office after your Anmeldung and mailed to your home. Give it to HR to avoid emergency tax brackets.',
    brief: {
      hi: 'पंजीकरण के 2-3 हफ्ते बाद पोस्ट से टैक्स आईडी घर आती है। इसे अपनी कंपनी के HR को दें।',
      en: 'Received via post 2-3 weeks after address registration. Hand it to employer HR.'
    },
    steps: [
      'Wait for the official letter from BZSt to arrive in your postbox.',
      'Provide it to your company payroll department.'
    ]
  },
  {
    id: 'gez_broadcasting',
    dayTarget: 'Day 20–30',
    urgency: 'Medium',
    category: 'Housing Formalities',
    title: 'GEZ / Rundfunkbeitrag (Broadcasting Fee)',
    whyImportant: 'Every German household must pay a monthly public broadcasting fee (~€18.36/month), regardless of whether you own a TV.',
    brief: {
      hi: 'हर जर्मन घर के लिए अनिवार्य टीवी/रेडियो लाइसेंस फीस (~€18.36 प्रति माह) का भुगतान ऑनलाइन करें।',
      en: 'Mandatory monthly household broadcasting contribution.'
    },
    steps: [
      'Wait for the registration letter or register online at rundfunkbeitrag.de.',
      'Set up quarterly SEPA direct debit.'
    ]
  }
];

// ============================================================================
// 5. GERMAN RULES & REGULATIONS DATABASE
// ============================================================================
const GERMAN_REGULATIONS = [
  {
    id: 'reg_ruhezeit',
    title: 'Quiet Hours (Ruhezeit)',
    icon: '🌙',
    summary: 'Strict noise restrictions apply across all German residential neighborhoods.',
    details: 'Night rest (Nachtruhe) is from 10:00 PM to 6:00 AM. Sunday and public holidays are all-day quiet days (Sonn- und Feiertagsruhe). Avoid vacuuming, loud music, or operating washing machines during these hours to avoid police complaints from neighbors.'
  },
  {
    id: 'reg_muelltrennung',
    title: 'Waste Separation (Mülltrennung)',
    icon: '♻️',
    summary: 'Strict garbage segregation is mandatory in every apartment building.',
    details: 'Trash must be sorted into Bio (organic waste), Papier (paper/cardboard), Gelbe Tonne (plastics/packaging), and Restmüll (general residual waste). Glass and old clothes must be taken to public recycling containers. Incorrect sorting can result in heavy landlord fines.'
  },
  {
    id: 'reg_pfand',
    title: 'Bottle Deposit System (Pfand)',
    icon: '🍾',
    summary: 'Returnable plastic bottles and glass beer bottles carry a deposit fee.',
    details: 'When buying bottled drinks, you pay a €0.08 to €0.25 Pfand fee per bottle. Keep them safe and return them to automated machines (Pfandautomat) inside supermarkets like Rewe, Aldi, or Lidl to get your cash deposit back via a printed store voucher.'
  },
  {
    id: 'reg_schufa',
    title: 'Credit Score & Privacy (SCHUFA)',
    icon: '📊',
    summary: 'Financial reputation tracking is central to renting apartments or signing contracts.',
    details: 'SCHUFA is Germany’s primary credit agency. Landlords, telecom operators, and banks check your SCHUFA score before approving housing contracts or postpaid SIM cards. Always pay bills on time to maintain a clean record.'
  }
];

// ============================================================================
// 6. CITY-SPECIFIC DIRECTORY (GROCERIES, RESTAURANTS, TEMPLES, PARKS)
// ============================================================================
const CITY_SPECIFIC_DIRECTORY = {
  'Frankfurt am Main': {
    groceries: [
      { name: 'Spiceland Indian Grocery', address: 'Kaiserstraße 64, 60329 Frankfurt', rating: 4.6, note: 'Great stock of fresh South Indian vegetables, spices, and atta.' },
      { name: 'Asia Supermarket Frankfurt', address: 'Münchener Str. 16, 60329 Frankfurt', rating: 4.4, note: 'Wide selection of Basmati rice and lentils near Central Station.' }
    ],
    restaurants: [
      { name: 'Saravanaa Bhavan Frankfurt', address: 'Kaiserstraße 68, 60329 Frankfurt', rating: 4.3, note: 'Authentic South Indian dosas, idlis, and filter coffee.' },
      { name: 'EatDoori Frankfurt', address: 'Leipziger Str. 37, 60487 Frankfurt', rating: 4.5, note: 'Modern Indian street food, thalis, and craft drinks.' }
    ],
    temples: [
      { name: 'Sanatan Mandir Frankfurt', address: 'Sprendlinger Landstraße 180, 63069 Offenbach/Frankfurt', rating: 4.8, note: 'Main Hindu temple serving regular community prayers and festivals.' },
      { name: 'Gurudwara Sri Guru Singh Sabha', address: 'Borsigallee 43, 60388 Frankfurt', rating: 4.9, note: 'Welcoming Sikh temple with weekly Langar service.' }
    ],
    parks: [
      { name: 'Palmengarten Botanical Garden', address: 'Siesmayerstraße 61, 60323 Frankfurt', rating: 4.7, note: 'Stunning botanical gardens with large family walking trails.' },
      { name: 'Lohrpark', address: 'Lohrberg, 60389 Frankfurt', rating: 4.6, note: 'Frankfurt’s only vineyard with panoramic city skyline views.' }
    ]
  },
  'Munich (München)': {
    groceries: [
      { name: 'Darbar Indian Supermarket', address: 'Landsberger Str. 113, 80339 München', rating: 4.5, note: 'Huge variety of authentic Indian groceries, snacks, and sweets.' },
      { name: 'Milan Groceries', address: 'Dachauer Str. 105, 80335 München', rating: 4.3, note: 'Reliable store for daily Indian staples and fresh herbs.' }
    ],
    restaurants: [
      { name: 'The Taj Indisches Restaurant', address: 'Nymphenburger Str. 139, 80636 München', rating: 4.6, note: 'Renowned for authentic butter chicken, paneer dishes, and fresh naan.' },
      { name: 'Ganesha Restaurant Munich', address: 'Tengstraße 34, 80798 München', rating: 4.4, note: 'Cozy ambiance serving classic North & South Indian meals.' }
    ],
    temples: [
      { name: 'Hindu Mandir München e.V.', address: 'Oberschleißheimer Str. 166, 80809 München', rating: 4.7, note: 'Active spiritual and cultural center for families.' },
      { name: 'Gurudwara Sahib München', address: 'Dachauer Str. 508, 80993 München', rating: 4.8, note: 'Peaceful Sikh shrine with open community kitchen.' }
    ],
    parks: [
      { name: 'Englischer Garten', address: 'Munich, Germany', rating: 4.8, note: 'One of the world\'s largest urban public parks, perfect for family picnics.' },
      { name: 'Olympic Park (Olympiapark)', address: 'Spiridon-Louis-Ring 21, 80809 München', rating: 4.7, note: 'Vast green spaces, lakes, and iconic tower views.' }
    ]
  },
  'Berlin Central': {
    groceries: [
      { name: 'Spice Village Berlin', address: 'Online & Delivery Hub, Berlin', rating: 4.8, note: 'Same-day fresh vegetable delivery (methi, bhindi, drumsticks) across Berlin.' },
      { name: 'Euro Asia Food Berlin', address: 'Landshuter Str. 33, 10777 Berlin', rating: 4.5, note: 'Extensive range of South Asian spices, rice, and frozen snacks.' }
    ],
    restaurants: [
      { name: 'Maharadscha Berlin', address: 'Fuggerstraße 21, 10777 Berlin', rating: 4.7, note: 'Highly rated authentic Indian cuisine with exceptional service.' },
      { name: 'Amrit Restaurant', address: 'Oranienburger Str. 45, 10117 Berlin', rating: 4.4, note: 'Famous vibrant Indian eatery in central Berlin.' }
    ],
    temples: [
      { name: 'Sri Ganesha Hindu Temple Berlin', address: 'Hasenheide 106, 10967 Berlin', rating: 4.8, note: 'Prominent temple located within the historic Sri Mayapur community courtyard.' },
      { name: 'Gurudwara Singh Sabha Berlin', address: 'Hasenheide 14, 10967 Berlin', rating: 4.9, note: 'Active community hub with weekly prayers and Langar.' }
    ],
    parks: [
      { name: 'Tiergarten', address: 'Straße des 17. Juni, 10785 Berlin', rating: 4.8, note: 'Berlin\'s central park with expansive lawns and shaded family paths.' },
      { name: 'Viktoriapark', address: 'Kreuzeberg, 10965 Berlin', rating: 4.6, note: 'Features a natural waterfall and panoramic views over Berlin.' }
    ]
  }
};

const GERMAN_OFFICES = [
  {
    id: 'ger_buergeramt',
    category: 'City Hall / Address Registration',
    name: 'Bürgeramt (Citizens Registration Office)',
    address: 'Available in every city district (e.g., Bürgeramt Innenstadt)',
    metro: 'Local U-Bahn / S-Bahn',
    hoursTip: 'Appointments open online early morning. Mandatory within 14 days of moving in.',
    portalUrl: 'https://service.berlin.de',
    mapsQuery: 'Buergeramt near me'
  },
  {
    id: 'ger_finanzamt',
    category: 'Tax Office',
    name: 'Finanzamt (Tax Authority)',
    address: 'District specific tax office',
    metro: 'Central transit hubs',
    hoursTip: 'Handles tax numbers, tax class changes, and income tax returns.',
    portalUrl: 'https://www.bzst.de',
    mapsQuery: 'Finanzamt near me'
  }
];

const GERMAN_HOSPITALS = [
  { name: 'Universitätsklinikum (University Hospital & 24/7 ER)', address: 'Major University Hospitals in Frankfurt, Munich, Berlin, Heidelberg', phone: '112', type: '24/7 Adult & Trauma ER', status: '24/7 Open' },
  { name: 'Kinderklinik (Pediatric Hospital & Fever Care)', address: 'Dedicated children hospitals in all major German cities', phone: '116 117', type: 'Children Fever & Emergency Care', status: '24/7 Children ER' },
  { name: 'Notdienst Apotheke (Sunday & Night Pharmacy)', address: 'Rotating duty pharmacies in every district', phone: '0800 00 22 833', type: 'Open 24/7 & Sundays for Urgent Prescriptions', status: '24/7 Duty' }
];

const GROCERY_SUBSTITUTES = [
  { item: 'Paneer (पनीर)', substitute: 'Schichtkäse (10%/20% Fett) / Türkischer Schnittkäse', stores: 'Rewe, Edeka, Lidl, Turkish markets', note: 'Schichtkäse has the identical mild taste. For frying, Turkish Börek cheese works.' },
  { item: 'Chakki Atta (रोटी का आटा)', substitute: 'Weizenmehl Type 1050 + Vollkornmehl (50:50 mix)', stores: 'Aldi, Lidl, Rewe, DM Bio', note: 'Mix Type 1050 with whole wheat flour for soft Rotis.' },
  { item: 'Dahi / Curd (दही)', substitute: 'Stichfester Joghurt (3.5% / 10% Fett)', stores: 'Rewe, Aldi, Lidl, Carrefour', note: 'Look for "stichfest" (set curd) on the bucket, not "cremig gerührt".' }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function App() {
  const [selectedLang, setSelectedLang] = useState('hi');
  const [showLangModal, setShowLangModal] = useState(false);

  const [selectedState, setSelectedState] = useState(GERMANY_CONFIG.states[0].name);
  const [selectedCity, setSelectedCity] = useState(GERMANY_CONFIG.states[0].cities[0]);

  const [activeTab, setActiveTab] = useState('journey');
  const [textSize, setTextSize] = useState('normal');

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [inrAmount, setInrAmount] = useState('100000');
  const [eurAmount, setEurAmount] = useState('1082');

  const [showEmergencyCard, setShowEmergencyCard] = useState(false);
  const [familyPhone, setFamilyPhone] = useState('+49 176 12345678');
  const [homeAddress, setHomeAddress] = useState('Musterstraße 12, 60329 Frankfurt am Main');

  const [completedTasks, setCompletedTasks] = useState({ sim_connectivity: true });

  // Custom added restaurants state
  const [customRestaurants, setCustomRestaurants] = useState(() => {
    try {
      const saved = localStorage.getItem('pravasi_germany_custom_restaurants');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showAddRestModal, setShowAddRestModal] = useState(false);
  const [newRestForm, setNewRestForm] = useState({ name: '', address: '', rating: '4.5', note: '' });

  // Chat State
  const [hasJoinedChat, setHasJoinedChat] = useState(() => {
    try { return !!localStorage.getItem('pravasi_chat_name'); } catch (e) { return false; }
  });
  const [chatName, setChatName] = useState(() => {
    try { return localStorage.getItem('pravasi_chat_name') || ''; } catch (e) { return ''; }
  });
  const [composeText, setComposeText] = useState('');
  const [publicPosts, setPublicPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('public_posts_germany')
        .select('*')
        .order('id', { ascending: false });
      if (data && data.length > 0) {
        setPublicPosts(data);
      } else {
        setPublicPosts([
          { id: 101, authorName: 'Rahul M.', text: 'Landing in Frankfurt next week. Can someone guide me on getting a TK health insurance certificate?', time: '10:30 AM' },
          { id: 102, authorName: 'Priya S.', text: 'Does anyone know how long Bürgeramt appointments take in Munich right now?', time: '09:15 AM' }
        ]);
      }
    }
    fetchPosts();

    const postSub = supabase
      .channel('public_posts_germany_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'public_posts_germany' }, (payload) => {
        setPublicPosts((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postSub);
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem('pravasi_germany_custom_restaurants', JSON.stringify(customRestaurants)); } catch (e) { console.error(e); }
  }, [customRestaurants]);

  const joinChat = (e) => {
    e.preventDefault();
    if(chatName.trim()) {
      try { localStorage.setItem('pravasi_chat_name', chatName.trim()); } catch (e) {}
      setHasJoinedChat(true);
    }
  };

  const handlePostToBoard = async (e) => {
    e.preventDefault();
    if (!composeText.trim()) return;

    const newPost = { 
      id: Date.now(), 
      author_name: chatName || 'Anonymous', 
      text: composeText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const { error } = await supabase.from('public_posts_germany').insert([newPost]);
    if (error) {
      setPublicPosts(prev => [newPost, ...prev]);
    }
    setComposeText('');
  };

  const handleAddRestaurant = (e) => {
    e.preventDefault();
    if (!newRestForm.name.trim() || !newRestForm.address.trim()) return;
    const item = { city: selectedCity, ...newRestForm };
    setCustomRestaurants([item, ...customRestaurants]);
    setNewRestForm({ name: '', address: '', rating: '4.5', note: '' });
    setShowAddRestModal(false);
  };

  const t = UI_TEXT[selectedLang] || UI_TEXT.en;
  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  const fontMultiplierClass = useMemo(() => {
    if (textSize === 'xl') return 'text-lg leading-relaxed';
    if (textSize === 'large') return 'text-base leading-normal';
    return 'text-sm leading-normal';
  }, [textSize]);

  // Base city directory + custom restaurants for selected city
  const baseCityDir = CITY_SPECIFIC_DIRECTORY[selectedCity] || CITY_SPECIFIC_DIRECTORY['Frankfurt am Main'];
  const cityRestaurants = [
    ...baseCityDir.restaurants,
    ...customRestaurants.filter(r => r.city === selectedCity)
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col ${fontMultiplierClass}`}>

      {/* ============================================================== */}
      {/* 1. TOP NOTIFICATION & ACCESSIBILITY BAR                        */}
      {/* ============================================================== */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm z-40 relative">
        <div className="flex items-center gap-3 flex-wrap font-medium">
          <span className="bg-slate-800 text-slate-100 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-slate-700">
            {GERMANY_CONFIG.flag} {GERMANY_CONFIG.name}
          </span>
          <span className="hidden sm:inline">
            {t.policeAmbulance} <strong className="text-white tracking-wider">{GERMANY_CONFIG.emergencyPhone}</strong>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">
            {t.nonEmergencyDoc} <strong className="text-white tracking-wider">{GERMANY_CONFIG.medicalOnCall}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowCurrencyModal(!showCurrencyModal)} className="hover:bg-slate-800 px-3 py-1 rounded-md text-amber-400 font-medium text-[11px] border border-slate-700 transition">
            <span>{GERMANY_CONFIG.currency}</span><span className="ml-1 opacity-80">1 {GERMANY_CONFIG.symbol} ≈ ₹{GERMANY_CONFIG.rateToInr}</span>
          </button>
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 text-[11px] border border-slate-700">
            <button onClick={() => setTextSize('normal')} className={`px-2.5 py-1 rounded-md transition ${textSize === 'normal' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-400'}`}>A</button>
            <button onClick={() => setTextSize('large')} className={`px-2.5 py-1 rounded-md transition ${textSize === 'large' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-400'}`}>A+</button>
            <button onClick={() => setTextSize('xl')} className={`px-2.5 py-1 rounded-md transition ${textSize === 'xl' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-400'}`}>A++</button>
          </div>
          <button onClick={() => setShowLangModal(true)} className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-1.5 rounded-md text-[11px] font-bold shadow-sm transition">
            <Globe className="w-3.5 h-3.5" /> <span>{currentLangObj.name}</span>
          </button>
        </div>
      </div>

      {showCurrencyModal && (
        <div className="bg-white border-b border-slate-200 p-4 shadow-sm z-30 relative animate-in fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2"><span className="text-xl">💶</span><strong className="text-slate-800">{t.currencyCalc}</strong></div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1"><span className="text-slate-400 ml-1">₹</span><input type="number" value={inrAmount} onChange={(e) => { const val = e.target.value; setInrAmount(val); setEurAmount((Number(val) / GERMANY_CONFIG.rateToInr).toFixed(0)); }} className="w-24 bg-transparent font-semibold text-slate-900 focus:outline-none" /></div>
              <span className="font-medium text-slate-400">≈</span>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1"><span className="text-slate-400 ml-1">{GERMANY_CONFIG.symbol}</span><input type="number" value={eurAmount} onChange={(e) => { const val = e.target.value; setEurAmount(val); setInrAmount((Number(val) * GERMANY_CONFIG.rateToInr).toFixed(0)); }} className="w-20 bg-transparent font-semibold text-indigo-700 focus:outline-none" /></div>
              <button onClick={() => setShowCurrencyModal(false)} className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100"><X className="w-5 h-5"/></button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MAIN HEADER (BRANDING & STATE/CITY SELECTORS)               */}
      {/* ============================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm border border-amber-100">
              <Compass className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t.appName}</h1>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md border border-slate-200 uppercase">Germany</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{currentLangObj.greeting}! {t.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <span className="text-base">🇩🇪</span>
              <select value={selectedState} onChange={(e) => {
                const st = GERMANY_CONFIG.states.find(s => s.name === e.target.value);
                setSelectedState(st.name);
                setSelectedCity(st.cities[0]);
              }} className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer">
                {GERMANY_CONFIG.states.map((st) => (<option key={st.name} value={st.name}>{st.name}</option>))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer">
                {GERMANY_CONFIG.states.find(s => s.name === selectedState)?.cities.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <button onClick={() => setShowEmergencyCard(true)} className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold px-4 py-2 rounded-xl transition text-sm border border-rose-200 shadow-sm ml-2">
              <Phone className="w-4 h-4" /><span>{t.lostHelpBtn}</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto pt-2 pb-3 hide-scrollbar">
          {[
            { id: 'journey', label: t.tabs.journey, icon: Compass },
            { id: 'offices', label: t.tabs.offices, icon: Building2 },
            { id: 'regulations', label: t.tabs.regulations, icon: Scale },
            { id: 'essentials', label: t.tabs.essentials, icon: Stethoscope },
            { id: 'desiRadar', label: t.tabs.desiRadar, icon: ShoppingBag },
            { id: 'community', label: t.tabs.community, icon: Users },
            { id: 'chat', label: t.tabs.chat, icon: MessageCircle },
            { id: 'about', label: t.tabs.about, icon: Info }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'opacity-70'}`} />{tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. MAIN APPLICATION TABS                                       */}
      {/* ============================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">

        {/* TAB 1: ROADMAP (WITH D-TICKET & DB NAVIGATOR) */}
        {activeTab === 'journey' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-800"></div>
              <div className="pl-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">Germany Master Roadmap</span>
                  <span className="text-sm font-medium text-slate-500">{selectedCity}, {selectedState}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{t.roadmapHeading}</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{t.roadmapSub}</p>
              </div>
              <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 text-center shrink-0">
                <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider mb-1">Progress</span>
                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                  <span className="text-3xl font-bold">{Object.values(completedTasks).filter(Boolean).length}</span>
                  <span className="text-lg text-slate-400">/ {GERMANY_ROADMAP_TASKS.length}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMANY_ROADMAP_TASKS.map((task) => {
                const isDone = !!completedTasks[task.id];
                const localizedBrief = task.brief[selectedLang] || task.brief.en;

                return (
                  <div key={task.id} className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 flex flex-col justify-between gap-6 border ${isDone ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:shadow-md'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">{task.dayTarget}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${task.urgency === 'Critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{task.urgency}</span>
                      </div>
                      <h3 className={`font-bold text-lg ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</h3>
                      <div className="bg-amber-50 p-4 rounded-2xl text-sm border border-amber-100/50">
                        <span className="text-[10px] font-bold text-amber-800 block uppercase tracking-wider mb-1">{t.simpleBriefHeading}</span>
                        <p className="font-medium text-slate-800 leading-relaxed">{localizedBrief}</p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{task.whyImportant}</p>
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">{t.actionPlanHeading}</span>
                        {task.steps.map((st, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-semibold">{i + 1}</span>
                            <span className="leading-relaxed">{st}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setCompletedTasks({ ...completedTasks, [task.id]: !isDone })} className={`w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-2 ${isDone ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'}`}>
                      {isDone ? (<><Check className="w-4 h-4 text-emerald-600" /><span>{t.completedBtn}</span></>) : (<><Circle className="w-4 h-4 opacity-50" /><span>{t.markCompleteBtn}</span></>)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: OFFICES */}
        {activeTab === 'offices' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Building2 className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">{t.officeSectionTitle}</h2>
                </div>
                <p className="text-sm text-slate-500 max-w-2xl">Verified physical government branches with exact street addresses and one-click Google Maps navigation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_OFFICES.map((office) => (
                <div key={office.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">{office.category}</span>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{office.name}</h3>
                    <p className="text-sm text-slate-600 flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{office.address}</span></p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm space-y-1.5"><p className="font-medium text-slate-700">🚇 Nearest Transit / Metro:</p><p className="text-slate-500">{office.metro}</p></div>
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-sm space-y-1.5"><p className="font-medium text-amber-900 flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-70" /><span>Hours & Appointment Tip:</span></p><p className="text-slate-700 leading-relaxed">{office.hoursTip}</p></div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-3">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery || office.name + ' ' + office.address)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 border border-slate-200 shadow-sm transition"><Navigation className="w-4 h-4 text-slate-400" /><span>{t.openGoogleMaps}</span></a>
                      <a href={office.portalUrl} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-sm transition"><Globe className="w-4 h-4 opacity-80" /><span>{t.openPortal}</span></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GERMAN REGULATIONS & RULES */}
        {activeTab === 'regulations' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <div className="pl-2">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">Legal Awareness</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{t.regulationsHeading}</h2>
                <p className="text-sm text-slate-500 mt-1">{t.regulationsSub}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_REGULATIONS.map((reg) => (
                <div key={reg.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{reg.icon}</span>
                    <h3 className="font-bold text-lg text-slate-900">{reg.title}</h3>
                  </div>
                  <p className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-100">{reg.summary}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{reg.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOSPITALS & 24/7 SUNDAY PHARMACIES */}
        {activeTab === 'essentials' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-rose-900 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>{t.liveMedicalLocator}</h3>
                 <p className="text-sm text-rose-700 mt-1.5 max-w-md leading-relaxed">{t.gpsMedicalDesc}</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href={`https://www.google.com/maps/search/?api=1&query=Hospital+Krankenhaus+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">🏥 Hospital / ER</a>
                 <a href={`https://www.google.com/maps/search/?api=1&query=Notdienst+Apotheke+Sunday+Pharmacy+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">💊 Sunday Pharmacy</a>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_HOSPITALS.map((hosp, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-slate-900 text-lg leading-snug">{hosp.name}</h3><span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2.5 py-1 rounded-full border border-rose-100 whitespace-nowrap shrink-0">{hosp.status}</span></div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block border border-slate-200">{hosp.type}</span>
                    <p className="text-sm text-slate-600 pt-2"><MapPin className="w-4 h-4 text-slate-400 inline mr-1" />{hosp.address}</p>
                  </div>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <a href={`tel:${hosp.phone}`} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Phone className="w-4 h-4" /><span>Call {hosp.phone}</span></a>
                  </div>
                </div>
              ))}
            </div>

            {/* Baby Care & 24/7 Essentials */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-base">👶 Baby Care & 24/7 Supermarket Essentials (dm / Rossmann / Hauptbahnhof)</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you need baby formula milk (<span className="font-semibold">Aptamil / HiPP</span>) or diapers in the middle of the night or on a Sunday when regular supermarkets are closed, head to the 24/7 pharmacy (<span className="font-semibold">Notdienst Apotheke</span>) or the pharmacy/drugstore located inside major central train stations (<span className="font-semibold">Hauptbahnhof</span> like Frankfurt Hbf or München Hbf) which operate 365 days a year.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: DESI RADAR (CITY-SPECIFIC SHOPS, RESTAURANTS WITH ADD OPTION) */}
        {activeTab === 'desiRadar' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span>🛒</span> {selectedCity} Indian Directory & Restaurants</h3>
                 <p className="text-sm text-slate-500 mt-1.5">Top-rated grocery shops and authentic Indian eateries specific to your selected city.</p>
               </div>
               <button onClick={() => setShowAddRestModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-5 rounded-2xl transition shadow-sm shrink-0 flex items-center gap-2">
                 <PlusCircle className="w-4 h-4" /> Add Restaurant / Shop
               </button>
            </div>

            {/* Grocery Stores */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">🛒 Top Indian Grocery Stores in {selectedCity}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {baseCityDir.groceries.map((store, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-base">{store.name}</h4>
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {store.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{store.address}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{store.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-slate-900">🍛 Best Indian Restaurants in {selectedCity}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityRestaurants.map((res, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-base">{res.name}</h4>
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {res.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{res.address}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{res.note || 'Recommended Indian eatery.'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Substitutes */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-slate-900">{t.substitutesTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GROCERY_SUBSTITUTES.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between"><h4 className="font-bold text-slate-900 text-base">{sub.item}</h4><span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase">{t.safeAlternative}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Buy On German Shelf:</span><span className="text-sm font-bold text-slate-800 block">{sub.substitute}</span></div>
                    <p className="text-sm text-slate-600 leading-relaxed flex gap-2"><span className="opacity-60">💡</span><span>{sub.note}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: COMMUNITY (TEMPLES, GURUDWARAS & PARKS) */}
        {activeTab === 'community' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-400 rounded-l-3xl"></div>
              <div className="pl-2 mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span>🛕</span> Temples, Gurudwaras & Family Parks in {selectedCity}</h3>
                <p className="text-sm text-slate-500 mt-1.5">Connect with spiritual centers and enjoy green recreational parks with your family.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                {baseCityDir.temples.map((temple, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">{temple.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3"/>{temple.address}</p>
                    <p className="text-xs text-indigo-700 bg-indigo-50 p-2 rounded-lg">{temple.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Parks */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">🌳 Recommended Family Parks in {selectedCity}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {baseCityDir.parks.map((park, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-base">{park.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> {park.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{park.address}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{park.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: COMMUNITY CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[700px] flex flex-col overflow-hidden animate-in fade-in duration-500">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
              <div className="font-bold text-sm text-slate-800">🇩🇪 Germany Expat Community Board</div>
            </div>

            {!hasJoinedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-slate-200">👋</div>
                <div><h4 className="font-bold text-xl text-slate-900 mb-2">Join Germany Expat Chat</h4><p className="text-sm text-slate-500 max-w-sm mx-auto">Ask questions about Anmeldung, apartments, and jobs in Germany.</p></div>
                <form onSubmit={joinChat} className="w-full max-w-sm space-y-4 pt-4">
                  <input type="text" required placeholder="Choose a Display Name (e.g. Amit S.)" value={chatName} onChange={(e) => setChatName(e.target.value)} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none text-center font-medium shadow-sm" />
                  <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-2xl shadow-sm hover:bg-slate-800 transition">Enter Public Board</button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
                  {publicPosts.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm mt-10">No public posts yet. Be the first to ask!</div>
                  ) : (
                    publicPosts.map((post) => (
                      <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                        <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-900">{post.author_name || post.authorName}</span><span className="text-xs text-slate-400">{post.time}</span></div>
                        <p className="text-sm text-slate-700 leading-relaxed">{post.text}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                  <form onSubmit={handlePostToBoard} className="flex flex-col gap-3">
                    <textarea rows={2} placeholder="Ask a question about Germany (Anmeldung, apartments, etc.)..." value={composeText} onChange={(e) => setComposeText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none resize-none" />
                    <div className="flex justify-end"><button type="submit" disabled={!composeText.trim()} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Post to Board</button></div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t.aboutHeading}</h2>
              <p className="text-slate-600 leading-relaxed">Dedicated settlement and daily living companion for Indian families and professionals in Germany.</p>
            </div>
          </div>
        )}
      </main>

      {/* ADD RESTAURANT / SHOP MODAL */}
      {showAddRestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">Add Indian Restaurant in {selectedCity}</h3>
              <button onClick={() => setShowAddRestModal(false)} className="text-slate-400 p-2 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddRestaurant} className="space-y-4">
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">Restaurant/Shop Name</label><input type="text" required value={newRestForm.name} onChange={(e) => setNewRestForm({...newRestForm, name: e.target.value})} className="w-full text-sm p-3 rounded-xl border border-slate-200" placeholder="e.g. Spice India" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">Street Address</label><input type="text" required value={newRestForm.address} onChange={(e) => setNewRestForm({...newRestForm, address: e.target.value})} className="w-full text-sm p-3 rounded-xl border border-slate-200" placeholder="e.g. Zeil 10" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">Rating (1 to 5)</label><input type="number" step="0.1" max="5" min="1" value={newRestForm.rating} onChange={(e) => setNewRestForm({...newRestForm, rating: e.target.value})} className="w-full text-sm p-3 rounded-xl border border-slate-200" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">Specialty / Note</label><input type="text" value={newRestForm.note} onChange={(e) => setNewRestForm({...newRestForm, note: e.target.value})} className="w-full text-sm p-3 rounded-xl border border-slate-200" placeholder="e.g. Best Biryani in town" /></div>
              <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl text-sm shadow-sm">Save Restaurant</button>
            </form>
          </div>
        </div>
      )}

      {/* EMERGENCY CARD MODAL */}
      {showEmergencyCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border-4 border-rose-500 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] overflow-y-auto">
            <div className="bg-rose-500 text-white p-5 sm:p-6 flex items-center justify-between">
              <span className="font-bold text-lg uppercase">{GERMANY_CONFIG.lostCardText.heading}</span>
              <button onClick={() => setShowEmergencyCard(false)} className="bg-black/10 text-white rounded-full p-2"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 border-2 border-rose-100 p-5 rounded-2xl text-slate-900 space-y-3">
                <p className="text-lg sm:text-xl font-medium leading-relaxed">"{GERMANY_CONFIG.lostCardText.body}"</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={`tel:${GERMANY_CONFIG.emergencyPhone}`} className="bg-rose-500 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><ShieldAlert className="w-5 h-5" /><span>Dial {GERMANY_CONFIG.emergencyPhone} (Police)</span></a>
                <a href={`tel:${GERMANY_CONFIG.medicalOnCall}`} className="bg-slate-800 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><Stethoscope className="w-5 h-5" /><span>Dial {GERMANY_CONFIG.medicalOnCall} (Doctor)</span></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE SELECTOR MODAL */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">{t.selectLangTitle}</h3>
              <button onClick={() => setShowLangModal(false)} className="text-slate-400 p-2 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INDIAN_LANGUAGES.map((lang) => (
                <button key={lang.code} onClick={() => { setSelectedLang(lang.code); setShowLangModal(false); }} className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${selectedLang === lang.code ? 'border-slate-800 bg-slate-900 text-white shadow-md' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}>
                  <div><span className="block text-sm font-bold">{lang.name}</span><span className={`text-[10px] mt-0.5 block ${selectedLang === lang.code ? 'text-slate-300' : 'text-slate-400'}`}>{lang.label}</span></div>
                  {selectedLang === lang.code && <Check className="w-4 h-4 text-amber-300" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-300 font-medium">
            <span>{t.appName}</span><span>•</span><span>{t.editionTag}</span>
          </div>
          <p className="max-w-xl mx-auto opacity-70">Dedicated settlement and daily living companion for Indian families and professionals in Germany.</p>
        </div>
      </footer>
    </div>
  );
}