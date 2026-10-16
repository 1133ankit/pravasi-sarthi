import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  ShoppingBag,
  Languages,
  Users,
  MapPin,
  AlertTriangle,
  ExternalLink,
  Check,
  HeartHandshake,
  Phone,
  HelpCircle,
  X,
  Globe,
  PlusCircle,
  Trash2,
  Stethoscope,
  Sparkles,
  Clock,
  Building2,
  Download,
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
  Heart
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
// 2. GERMANY CONFIGURATION & STATES
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
    { name: 'Hessen (Frankfurt)', cities: ['Frankfurt am Main', 'Wiesbaden', 'Kassel'] },
    { name: 'Bayern (Munich)', cities: ['Munich (München)', 'Nuremberg', 'Augsburg'] },
    { name: 'Berlin', cities: ['Berlin Central', 'Charlottenburg', 'Pankow'] },
    { name: 'Nordrhein-Westfalen (Cologne/Düsseldorf)', cities: ['Cologne (Köln)', 'Düsseldorf', 'Dortmund'] },
    { name: 'Baden-Württemberg (Stuttgart)', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe'] },
    { name: 'Hamburg', cities: ['Hamburg Central', 'Altona', 'Harburg'] }
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
      journey: '१. पहला महीना (३० दिन रोडमैप)',
      offices: '२. सरकारी ऑफिस व ऐप्स',
      flashcards: '३. स्क्रीन दिखाएं (कार्ड्स)',
      essentials: '४. अस्पताल व इमरजेंसी',
      desiRadar: '५. किराना व रेस्टोरेंट',
      community: '६. परिवार, मंदिर व गुरुद्वारे',
      chat: '७. कम्युनिटी चैट',
      about: '८. हमारे बारे में'
    },
    aboutHeading: 'प्रवासी सारथी जर्मनी के बारे में',
    aboutSub: 'भारतीय डेवलपर्स द्वारा, जर्मनी में आने वाले परिवारों के लिए निर्मित',
    problemTitle: 'हम किस समस्या का समाधान कर रहे हैं?',
    problemDesc1: 'जर्मनी (Anmeldung, GEZ, TK बीमा, DB ट्रेन पास) में बसना कई लोगों के लिए एक कागजी चुनौती होती है।',
    problemDesc2: 'प्रवासी सारथी इस प्रक्रिया को बिल्कुल सरल और आपकी भाषा में समझाता है।',
    roadmapHeading: 'जर्मनी में पहले ३० दिन का मास्टर रोडमैप',
    roadmapSub: 'सिम कार्ड से लेकर अपार्टमेंट रेंटिंग और टैक्स आईडी तक की पूरी कानूनी प्रक्रिया।',
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
    substitutesTitle: 'जर्मन सुपरमार्केट (Rewe/Aldi) में देसी विकल्प',
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
    liveMedicalLocator: 'लाइव मेडिकल लोकेटर',
    gpsMedicalDesc: 'निकटतम आपातकालीन कक्ष, बाल रोग विशेषज्ञ (Kinderarzt) और 24/7 फार्मेसी (Apotheke) खोजें।'
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
      journey: '1. First 30 Days Roadmap',
      offices: '2. Govt Offices & Apps',
      flashcards: '3. Point & Show Cards',
      essentials: '4. Hospitals & Emergency',
      desiRadar: '5. Groceries & Food',
      community: '6. Temples & Community',
      chat: '7. Community Chat',
      about: '8. About Us'
    },
    aboutHeading: 'About Pravasi Sarthi Germany',
    aboutSub: 'Built by Indian Developers for Expats Moving to Germany',
    problemTitle: 'The Problem We Are Solving',
    problemDesc1: 'Settling in Germany involves navigating Anmeldung, health insurance, GEZ fees, and transit passes.',
    problemDesc2: 'Pravasi Sarthi guides you step-by-step in your mother tongue.',
    roadmapHeading: 'First 30 Days Master Relocation Roadmap',
    roadmapSub: 'Complete tasks from landing in Germany to getting your Tax ID and apartment.',
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
    liveMedicalLocator: 'Live Medical Locator',
    gpsMedicalDesc: 'Find nearest emergency rooms, pediatricians (Kinderarzt), and 24/7 pharmacies (Apotheke).'
  }
};
// Fallback generator for other languages to English base if needed
['ta', 'te', 'bn', 'mr', 'gu', 'pa', 'kn', 'ml'].forEach(code => {
  if (!UI_TEXT[code]) UI_TEXT[code] = UI_TEXT.en;
});

// ============================================================================
// 4. GERMANY 30-DAY RELOCATION ROADMAP TASKS
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
    id: 'apartment_renting',
    dayTarget: 'Day 1–14',
    urgency: 'Critical',
    category: 'Housing',
    title: 'Finding Accommodation & Landlord Certificate',
    whyImportant: 'Without a permanent rental agreement and the landlord confirmation form (Wohnungsgeberbestätigung), you cannot register your address.',
    brief: {
      hi: 'फ्लैट ढूंढना (ImmoScout24, Kleinanzeigin) और मकान मालिक से Wohnungsgeberbestätigung फॉर्म लेना अनिवार्य है।',
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
      'Book your appointment online via your city\'s Bürgeramt portal (e.g., Frankfurt/Berlin portal).',
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
    id: 'transportation',
    dayTarget: 'Day 1–3',
    urgency: 'High',
    category: 'Daily Living & Transit',
    title: 'Deutschlandticket (D-Ticket) & DB Navigator',
    whyImportant: 'Essential apps and transit passes for navigating German trains (Deutsche Bahn), U-Bahn, trams, and buses nationwide.',
    brief: {
      hi: 'पूरे जर्मनी में असीमित यात्रा के लिए Deutschlandticket (€49/month) लें और DB Navigator ऐप डाउनलोड करें।',
      en: 'Download DB Navigator and get the monthly Deutschlandticket for unlimited regional/city transit across Germany.'
    },
    steps: [
      'Download DB Navigator for live train schedules.',
      'Subscribe to the Deutschlandticket via RMV, MVV, BVG, or DB for nationwide regional transport.'
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
// 5. GOVERNMENT OFFICES & MAPS DATABASE (GERMANY)
// ============================================================================
const GERMAN_OFFICES = [
  {
    id: 'ger_buergeramt',
    category: 'City Hall / Address Registration',
    name: 'Bürgeramt (Citizens Registration Office)',
    address: 'Available in every city district (e.g., Bürgeramt Innenstadt)',
    metro: 'Local U-Bahn / S-Bahn',
    hoursTip: 'Appointments open online early morning. Mandatory within 14 days of moving in.',
    portalUrl: 'https://service.berlin.de / service.frankfurt.de',
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
  { name: 'Universitätsklinikum (University Hospital)', address: 'Major University Hospitals in Frankfurt, Munich, Berlin, Heidelberg', phone: '112', type: '24/7 Adult & Trauma ER', status: '24/7 Open' },
  { name: 'Kinderklinik (Pediatric Hospital / ER)', address: 'Dedicated children hospitals in all major German cities', phone: '116 117', type: 'Children Fever & Emergency Care', status: '24/7 Children ER' }
];

const GERMAN_GROCERY_SUBSTITUTES = [
  { item: 'Paneer (पनीर)', substitute: 'Schichtkäse (10% or 20% Fett) / Türkischer Grillkäse', stores: 'Rewe, Edeka, Lidl, Turkish markets', note: 'Schichtkäse has an identical mild texture. For frying, Turkish Börek cheese or Halloumi works wonderfully.' },
  { item: 'Chakki Atta (रोटी का आटा)', substitute: 'Weizenmehl Type 1050 + Vollkornmehl (50:50 mix)', stores: 'Aldi, Lidl, Rewe, DM', note: 'Mixing German Type 1050 wheat flour with whole-wheat flour gives soft rotis.' },
  { item: 'Dahi / Curd (दही)', substitute: 'Stichfester Joghurt (3.5% or 10% Fett)', stores: 'Rewe, Aldi, Edeka', note: 'Look for "stichfest" (set curd) on the tub, not "cremig gerührt".' },
  { item: 'Jeera / Cumin (जीरा)', substitute: 'Kreuzkümmel (Not regular Kümmel)', stores: 'Any supermarket spice aisle', note: 'WARNING: Regular German "Kümmel" is caraway seed with a very different taste. Always look for "Kreuzkümmel".' }
];

const GERMAN_COMMUNITY = [
  { name: 'Gurudwara & Temples in Germany', type: 'Religious & Cultural', address: 'Frankfurt, Munich, Berlin, Cologne', note: 'Sunday Langar, community gatherings, and festival celebrations.' },
  { name: 'Indian Expat & Student Associations (ISAN / VDI)', type: 'Community Network', address: 'Active across all federal states (Bundesländer)', note: 'Networking, career guidance, and festival get-togethers.' }
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

  const [localFeedback, setLocalFeedback] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({ sim_connectivity: true });

  const [customCards, setCustomCards] = useState(() => {
    try {
      const saved = localStorage.getItem('pravasi_germany_custom_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    category: 'Daily Living',
    userText: '',
    localText: '',
    opt1: 'Ja / Yes',
    opt2: 'Nein / No',
    opt3: 'Bitte warten / Please wait'
  });

  const [isTranslating, setIsTranslating] = useState(false);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const translateString = async (text, targetLang) => {
    if (!text || !text.trim()) return text;
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      return data[0].map(item => item[0]).join('');
    } catch (err) {
      return text;
    }
  };

  const handleAutoTranslate = async (textToTranslate) => {
    const sourceText = textToTranslate ?? newCardForm.userText;
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    const translated = await translateString(sourceText, 'de');
    setNewCardForm(prev => ({ ...prev, localText: translated }));
    setIsTranslating(false);
  };

  // Chat State
  const [myUserId] = useState(() => {
    try {
      let id = localStorage.getItem('pravasi_device_id');
      if (!id) { id = 'usr_' + Math.random().toString(36).substr(2, 9); localStorage.setItem('pravasi_device_id', id); }
      return id;
    } catch (e) { return 'usr_guest'; }
  });
  const [chatName, setChatName] = useState(() => {
    try { return localStorage.getItem('pravasi_chat_name') || ''; } catch (e) { return ''; }
  });
  const [hasJoinedChat, setHasJoinedChat] = useState(() => {
    try { return !!localStorage.getItem('pravasi_chat_name'); } catch (e) { return false; }
  });
  
  const [chatView, setChatView] = useState('board');
  const [activePrivateChatUser, setActivePrivateChatUser] = useState(null);
  const [composeText, setComposeText] = useState('');
  const messagesEndRef = useRef(null);

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
          { id: 101, authorId: 'mock1', authorName: 'Rahul M.', text: 'Landing in Frankfurt next week. Can someone guide me on getting a TK health insurance certificate?', time: '10:30 AM' },
          { id: 102, authorId: 'mock2', authorName: 'Priya S.', text: 'Does anyone know how long Bürgeramt appointments take in Munich right now?', time: '09:15 AM' }
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

  const [privateChats, setPrivateChats] = useState({});

  useEffect(() => {
    try { localStorage.setItem('pravasi_germany_custom_cards', JSON.stringify(customCards)); } catch (e) { console.error(e); }
  }, [customCards]);

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
      console.error("Supabase Post Error:", error.message);
      setPublicPosts(prev => [newPost, ...prev]); // local fallback
    }
    setComposeText('');
  };

  const t = UI_TEXT[selectedLang] || UI_TEXT.en;
  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  const fontMultiplierClass = useMemo(() => {
    if (textSize === 'xl') return 'text-lg leading-relaxed';
    if (textSize === 'large') return 'text-base leading-normal';
    return 'text-sm leading-normal';
  }, [textSize]);

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
      {/* 2. MAIN HEADER (BRANDING)                                      */}
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
            { id: 'flashcards', label: t.tabs.flashcards, icon: Languages },
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

        {/* TAB 1: GERMANY 30-DAY ROADMAP */}
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

        {/* TAB 2: GERMAN OFFICES */}
        {activeTab === 'offices' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Building2 className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">{t.officeSectionTitle}</h2>
                </div>
                <p className="text-sm text-slate-500 max-w-2xl">Essential German authorities (Bürgeramt, Finanzamt) across all federal states.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_OFFICES.map((office) => (
                <div key={office.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">{office.category}</span>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{office.name}</h3>
                    <p className="text-sm text-slate-600 flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{office.address}</span></p>
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-sm space-y-1.5"><p className="font-medium text-amber-900 flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-70" /><span>Hours & Appointment Tip:</span></p><p className="text-slate-700 leading-relaxed">{office.hoursTip}</p></div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-3">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery + ' ' + selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 border border-slate-200 shadow-sm transition"><Navigation className="w-4 h-4 text-slate-400" /><span>{t.openGoogleMaps}</span></a>
                      <a href={office.portalUrl} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-sm transition"><Globe className="w-4 h-4 opacity-80" /><span>{t.openPortal}</span></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Mic className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">German Voice Bridge</span>
                  <h3 className="text-xl font-bold mt-1">Google Voice & Text German Translator</h3>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">Translate instantly between {currentLangObj.label} and German.</p>
                </div>
              </div>
              <a href="https://translate.google.com/?sl=auto&tl=de&op=translate" target="_blank" rel="noreferrer" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-5 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-sm transition shrink-0">
                <Globe className="w-4 h-4" /> <span>Open Google Translate</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: HOSPITALS */}
        {activeTab === 'essentials' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-rose-900 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>{t.liveMedicalLocator}</h3>
                 <p className="text-sm text-rose-700 mt-1.5 max-w-md leading-relaxed">{t.gpsMedicalDesc}</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href={`https://www.google.com/maps/search/?api=1&query=Hospital+Krankenhaus+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">🏥 Hospital</a>
                 <a href={`https://www.google.com/maps/search/?api=1&query=Kinderarzt+Pediatrician+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">👶 Pediatrician</a>
                 <a href={`https://www.google.com/maps/search/?api=1&query=Apotheke+Pharmacy+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">💊 Pharmacy</a>
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
                    <a href={`tel:${hosp.phone}`} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Phone className="w-4 h-4" /><span>Dial {hosp.phone}</span></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DESI RADAR */}
        {activeTab === 'desiRadar' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span>🛒</span> {selectedCity} Indian Groceries & Food</h3>
                 <p className="text-sm text-slate-500 mt-1.5">Find Indian spice stores, halal butchers, and curry houses near you.</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href={`https://www.google.com/maps/search/?api=1&query=Indian+grocery+store+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">🛒 Groceries</a>
                 <a href={`https://www.google.com/maps/search/?api=1&query=Indian+restaurant+${encodeURIComponent(selectedCity)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">🍲 Restaurants</a>
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">{t.substitutesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GERMAN_GROCERY_SUBSTITUTES.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900 text-base">{sub.item}</h3><span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase">{t.safeAlternative}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Buy On German Shelf:</span><span className="text-sm font-bold text-slate-800 block">{sub.substitute}</span></div>
                    <p className="text-sm text-slate-600 leading-relaxed flex gap-2"><span className="opacity-60">💡</span><span>{sub.note}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-400 rounded-l-3xl"></div>
              <div className="pl-2 mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span>🛕</span> Temples, Gurudwaras & Associations in Germany</h3>
                <p className="text-sm text-slate-500 mt-1.5">Connect with the spiritual and cultural Indian diaspora across German states.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-2">
                <a href="https://www.google.com/maps/search/?api=1&query=Hindu+Temple+Germany" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-4 rounded-2xl text-center font-medium text-slate-700">🛕 Temples</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Gurudwara+Germany" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-4 rounded-2xl text-center font-medium text-slate-700">🪯 Gurudwaras</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Mosque+Germany" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-4 rounded-2xl text-center font-medium text-slate-700">🕌 Mosques</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Indian+Association+Germany" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-4 rounded-2xl text-center font-medium text-slate-700">🤝 Associations</a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CHAT */}
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
              <p className="text-slate-600 leading-relaxed">{t.problemDesc1} {t.problemDesc2}</p>
            </div>
          </div>
        )}
      </main>

      {/* 2. EMERGENCY CARD MODAL */}
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

      {/* 3. LANGUAGE SELECTOR MODAL */}
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
                  <div><span className="block text-sm font-bold">{lang.name}</span><span className="text-[10px] mt-0.5 block opacity-80">{lang.label}</span></div>
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