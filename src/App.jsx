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
// 2. EUROPEAN DESTINATION COUNTRIES
// ============================================================================
const EUROPEAN_COUNTRIES = {
  germany: {
    name: 'Germany (Deutschland)',
    flag: '🇩🇪',
    currency: 'EUR',
    symbol: '€',
    rateToInr: 92.4,
    emergencyPhone: '112',
    medicalOnCall: '116 117',
    officialLang: 'German (Deutsch)',
    cities: ['Frankfurt', 'Munich', 'Berlin', 'Hamburg', 'Stuttgart', 'Düsseldorf'],
    lostCardText: {
      heading: 'NOTFALL / BITTE HELFEN SIE MIR!',
      body: 'Entschuldigung, ich spreche kein Deutsch. Ich habe mich verlaufen und brauche Hilfe, um meine Familie zu kontaktieren. Bitte rufen Sie diese Telefonnummer an oder helfen Sie mir zur unten stehenden Adresse.',
      callPrompt: 'Bitte rufen Sie meine Familie an:'
    }
  },
  netherlands: {
    name: 'Netherlands (Nederland)',
    flag: '🇳🇱',
    currency: 'EUR',
    symbol: '€',
    rateToInr: 92.4,
    emergencyPhone: '112',
    medicalOnCall: '0900-8844',
    officialLang: 'Dutch (Nederlands)',
    cities: ['Amsterdam', 'Eindhoven', 'Rotterdam'],
    lostCardText: {
      heading: 'NOODGEVAL / HULP ALSTUBLIEFT!',
      body: 'Pardon, ik spreek geen Nederlands. Ik ben de weg kwijt en heb hulp nodig om contact op te nemen met mijn familie. Wilt u alstublieft dit telefoonnummer bellen of mij helpen naar dit adres te gaan?',
      callPrompt: 'Bel alstublieft mijn familie:'
    }
  },
  france: {
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    symbol: '€',
    rateToInr: 92.4,
    emergencyPhone: '112',
    medicalOnCall: '15',
    officialLang: 'French (Français)',
    cities: ['Paris', 'Lyon'],
    lostCardText: {
      heading: 'URGENCE / AIDEZ-MOI S\'IL VOUS PLAÎT!',
      body: 'Excusez-moi, je ne parle pas français. Je suis perdu(e) et j\'ai besoin d\'aide pour joindre ma famille. Pourriez-vous s\'il vous plaît appeler ce numéro ou m\'aider à rejoindre cette adresse ?',
      callPrompt: 'Veuillez contacter ma famille :'
    }
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    symbol: '€',
    rateToInr: 92.4,
    emergencyPhone: '112',
    medicalOnCall: '1850 777 911',
    officialLang: 'English / Irish',
    cities: ['Dublin', 'Cork'],
    lostCardText: {
      heading: 'EMERGENCY / PLEASE HELP ME!',
      body: 'Excuse me, I am lost and do not speak the local language well. I urgently need help contacting my family. Please call this phone number or direct me to this address.',
      callPrompt: 'Please call my family:'
    }
  },
  spain: {
    name: 'Spain (España)',
    flag: '🇪🇸',
    currency: 'EUR',
    symbol: '€',
    rateToInr: 92.4,
    emergencyPhone: '112',
    medicalOnCall: '061',
    officialLang: 'Spanish (Español)',
    cities: ['Madrid', 'Barcelona'],
    lostCardText: {
      heading: '¡EMERGENCIA / AYUDA POR FAVOR!',
      body: 'Disculpe, no hablo español. Me he perdido y necesito ayuda urgente para comunicarme con mi familia. ¿Podría llamar a este número o indicarme cómo llegar a esta dirección?',
      callPrompt: 'Por favor llame a mi familia:'
    }
  },
  sweden: {
    name: 'Sweden (Sverige)',
    flag: '🇸🇪',
    currency: 'SEK',
    symbol: 'kr',
    rateToInr: 8.1,
    emergencyPhone: '112',
    medicalOnCall: '1177',
    officialLang: 'Swedish (Svenska)',
    cities: ['Stockholm', 'Gothenburg'],
    lostCardText: {
      heading: 'NÖDFALL / HJÄLP MIG!',
      body: 'Ursäkta, jag talar inte svenska. Jag har gått vilse och behöver hjälp med att kontakta min familj. Vänligen ring detta telefonnummer eller hjälp mig hitta till denna adress.',
      callPrompt: 'Var god ring min familj:'
    }
  },
  poland: {
    name: 'Poland (Polska)',
    flag: '🇵🇱',
    currency: 'PLN',
    symbol: 'zł',
    rateToInr: 21.6,
    emergencyPhone: '112',
    medicalOnCall: '999',
    officialLang: 'Polish (Polski)',
    cities: ['Warsaw', 'Krakow'],
    lostCardText: {
      heading: 'PILNE / PROSZĘ O POMOC!',
      body: 'Przepraszam, nie mówię po polsku. Zgubiłem/am się i potrzebuję pomocy w skontaktowaniu się z rodziną. Proszę zadzwonić pod ten numer telefonu lub pomóc mi dotrzeć pod ten adres.',
      callPrompt: 'Proszę zadzwonić do mojej rodziny:'
    }
  }
};

// ============================================================================
// 3. COMPLETE UI TRANSLATION DICTIONARY (10 LANGUAGES)
// ============================================================================
const UI_TEXT = {
  hi: {
    appName: 'प्रवासी सारथी',
    editionTag: 'कुटुंब व वरिष्ठ साथी',
    tagline: 'यूरोप में भारतीय परिवारों और बुजुर्ग माता-पिता का विश्वसनीय साथी',
    lostHelpBtn: '🚨 रास्ता भटक गए? (मदद)',
    selectLangTitle: 'अपनी मातृभाषा चुनें (Select Language)',
    policeAmbulance: 'पुलिस / एम्बुलेंस:',
    nonEmergencyDoc: 'डॉक्टर ऑन-कॉल:',
    currencyCalc: 'करेंसी कैलकुलेटर (रुपये ↔ यूरो)',
    tabs: {
      journey: '१. पहला महीना (रोडमैप)',
      offices: '२. सरकारी ऑफिस व मैप्स',
      flashcards: '३. स्क्रीन दिखाएं (कार्ड्स)',
      essentials: '४. अस्पताल व जरूरी सेवाएं',
      desiRadar: '५. किराना व रेस्टोरेंट',
      community: '६. परिवार व मंदिर',
      chat: '७. कम्युनिटी चैट',
      about: '८. हमारे बारे में (About)'
    },
    aboutHeading: 'प्रवासी सारथी के बारे में',
    aboutSub: 'भारतीय डेवलपर्स द्वारा, यूरोप में भारतीय परिवारों के लिए निर्मित',
    problemTitle: 'हम किस समस्या का समाधान कर रहे हैं?',
    problemDesc1: 'यूरोप (जर्मनी, नीदरलैंड, फ्रांस, आयरलैंड आदि) जाना कई भारतीय पेशेवरों और उनके परिवारों का सपना होता है। हालांकि, पहले कुछ महीने भारी प्रशासनिक उलझनों से भरे होते हैं। जब बुजुर्ग माता-पिता घूमने आते हैं या नए लोग उतरते हैं, तो उन्हें भाषा की बाधाओं, सख्त कागजी कार्रवाई (जैसे Anmeldung पता पंजीकरण), सख्त शाकाहारी भोजन नियमों और विदेशी आपातकालीन कमरों से निपटने के कारण भारी चिंता का सामना करना पड़ता है।',
    problemDesc2: 'मौजूदा ऐप्स संग्रहालयों का दौरा करने वाले पश्चिमी पर्यटकों के लिए बनाए गए हैं - उन परिवारों के लिए नहीं जो यूरोपीय नौकरशाही से जूझ रहे हैं। प्रवासी सारथी इस सटीक समस्या को एक विश्वसनीय डिजिटल साथी के रूप में हल करने के लिए बनाया गया है।',
    monetizationTitle: 'हम ऐप को मुफ्त और टिकाऊ कैसे रखते हैं?',
    monetizationDesc1: 'हमारा मानना है कि माता-पिता और नए लोगों के लिए आवश्यक निपटान और आपातकालीन उपकरण हमेशा 100% मुफ्त होने चाहिए। बिना उपयोगकर्ता शुल्क लिए या कष्टप्रद बैनर विज्ञापनों से परेशान किए प्रवासी सारथी को मुफ्त रखने के लिए, हम विश्वसनीय रिलेकेशन, बैंकिंग और बीमा प्रदाताओं के साथ साझेदारी करते हैं।',
    monetizationDesc2: 'जब उपयोगकर्ता हमारे अनुशंसित पार्टनर लिंक के माध्यम से आवश्यक प्रवासी सेवाओं (जैसे Wise के साथ सीमा पार से पैसे ट्रांसफर, Feather या Expatrio के साथ प्रवासी स्वास्थ्य बीमा, या N26 के साथ डिजिटल बैंक खाते) के लिए साइन अप करते हैं, तो हमें प्रदाता से शून्य अतिरिक्त लागत पर एक छोटा रेफरल कमीशन मिलता है।',
    contactTitle: 'साझेदारी और सहयोग (Partnerships)',
    contactDesc: 'क्या आप यूरोपीय रीलोकेशन सेवा, बीमा प्रदाता या देसी रेस्टोरेंट हैं जो प्रवासी सारथी के साथ साझेदारी करना चाहते हैं? हम आपके साथ सहयोग करना पसंद करेंगे।',
    contactEmail: '📧 हमारी पार्टनरशिप टीम से संपर्क करें: 1122ankitverma@gmail.com',
    roadmapHeading: 'पहले ३० दिन की कानूनी प्रक्रिया',
    roadmapSub: 'सभी कार्य क्रमवार पूरे करें। पता पंजीकरण के बिना कोई टैक्स या बैंक खाता नहीं बनेगा।',
    simpleBriefHeading: 'सरल भाषा में समझें:',
    actionPlanHeading: 'कार्य योजना (Action Plan):',
    markCompleteBtn: 'सम्पन्न चिह्नित करें',
    completedBtn: 'सम्पन्न हुआ ✓',
    youAreAsking: 'आप क्या पूछ रहे हैं:',
    showToLocal: 'स्थानीय व्यक्ति को दिखाएं (Show to Local):',
    tapToAnswer: '👇 सामने वाला व्यक्ति सीधे स्क्रीन पर जवाब चुन सकता है:',
    localAnswered: 'सामने वाले व्यक्ति ने यह उत्तर चुना:',
    addNewCardBtn: '➕ नया फ्लैशकार्ड बनाएं',
    customCardBadge: 'कस्टम कार्ड',
    templateLabel: '⚡ रेडीमेड टेम्पलेट चुनें:',
    substitutesTitle: 'यूरोपीय सुपरमार्केट में देसी विकल्प',
    substitutesSub: 'अगर पास में कोई भारतीय दुकान न हो, तो आम सुपरमार्केट (Rewe, Lidl, Aldi) से ये खरीदें:',
    safeAlternative: 'सुरक्षित विकल्प',
    vegAlertHeading: 'शाकाहारी परिवारों के लिए चेतावनी (Vegetarian Alert):',
    vegAlertText: 'सामग्री सूची में Gelatine (सुअर का जिलेटिन), Karmin / E120 (कीटों का लाल रंग), और Tierisches Lab (जानवरों का रेनेट) अवश्य जांचें। हमेशा "Mikrobielles Lab" या हरे V-Label वाले उत्पाद चुनें।',
    restaurantsTitle: 'भारतीय रेस्टोरेंट व किराना स्टोर',
    restaurantsSub: 'प्रमाणित किराना स्टोर और शुद्ध शाकाहारी भोजनालय।',
    communityTitle: 'भारतीय परिवार, मंदिर व गुरुद्वारे',
    communitySub: 'सप्ताहांत मिलन और सांस्कृतिक उत्सवों के लिए स्थानीय परिवारों से जुड़ें।',
    lostCardNotice: 'यह कार्ड स्थानीय भाषा में है। अगर आप रास्ता भटक जाएं, तो इसे किसी भी राहगीर, बस ड्राइवर या पुलिस को दिखाएं।',
    homeAddressLabel: 'घर का पता (Home Address):',
    callFamilyBtn: 'कॉल करें',
    navigateHome: '📍 गूगल मैप्स पर घर का रास्ता',
    openGoogleMaps: '📍 गूगल मैप्स पर खोलें',
    openPortal: '🌐 आधिकारिक पोर्टल खोलें',
    downloadForm: '📄 फॉर्म डाउनलोड करें (PDF)',
    officeSectionTitle: 'प्रमुख सरकारी कार्यालय और अपॉइंटमेंट गाइड्स'
  },
  en: {
    appName: 'Pravasi Sarthi',
    editionTag: 'Pan-Europe Kutumb Companion',
    tagline: 'Trusted Settlement & Daily Living Guide for Indian Families and Parents in Europe',
    lostHelpBtn: '🚨 Lost & Need Help?',
    selectLangTitle: 'Select Your Mother Tongue',
    policeAmbulance: 'Police / Ambulance:',
    nonEmergencyDoc: 'Doctor On-Call:',
    currencyCalc: 'Currency Calculator (INR ↔ EUR)',
    tabs: {
      journey: '1. First 30 Days (Roadmap)',
      offices: '2. Govt Offices & Maps',
      flashcards: '3. Point & Show Cards',
      essentials: '4. Hospitals & Essentials',
      desiRadar: '5. Groceries & Food',
      community: '6. Community & Temples',
      chat: '7. Community Chat',
      about: '8. About Us & Partnerships'
    },
    aboutHeading: 'About Pravasi Sarthi',
    aboutSub: 'Built by Indian Developers, For Indian Families in Europe',
    problemTitle: 'The Problem We Are Solving',
    problemDesc1: 'Moving to Europe (Germany, Netherlands, France, Ireland, etc.) is a dream for many Indian professionals and their families. However, the first few months are an absolute bureaucratic maze. When elderly parents visit or newcomers land, they face massive anxiety due to language barriers, strict paperwork (like Anmeldung address registration), strict vegetarian food rules, and navigating foreign emergency rooms.',
    problemDesc2: 'Existing apps are built for Western tourists visiting museums—not for families trying to survive European bureaucracy and settle down. Pravasi Sarthi was built to solve this exact problem by acting as a trusted digital companion.',
    monetizationTitle: 'How We Keep the App Free & Sustainable',
    monetizationDesc1: 'We believe that essential settlement and emergency tools should always be 100% free for parents and newcomers. To keep Pravasi Sarthi free without charging user fees or bombarding you with banner ads, we partner with trusted relocation, banking, and insurance providers.',
    monetizationDesc2: 'When users sign up for essential expat services (such as cross-border money transfers with Wise, expat health insurance with Feather or Expatrio, or digital bank accounts with N26) through our recommended partner links, we earn a small referral commission from the provider at zero extra cost to you.',
    contactTitle: 'Partnership & Affiliate Inquiries',
    contactDesc: 'Are you a European relocation service, insurance provider, or desi restaurant looking to partner with Pravasi Sarthi? We would love to collaborate.',
    contactEmail: '📧 Reach out to our partnership team at: 1122ankitverma@gmail.com',
    roadmapHeading: 'First 30 Days Legal Checklist',
    roadmapSub: 'Complete tasks in chronological order. Address registration is required for tax and bank setup.',
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
    substitutesTitle: 'Desi Cooking Substitutes in Local Supermarkets',
    substitutesSub: 'If an Indian grocery is not nearby, buy these in standard European stores (Rewe, Lidl, Aldi):',
    safeAlternative: 'Safe Alternative',
    vegAlertHeading: 'Strict Vegetarian Warning (Vegetarian Alert):',
    vegAlertText: 'Always check ingredients for Gelatine (pork collagen), Karmin / E120 (insect red dye), and Tierisches Lab (animal rennet). Choose "Mikrobielles Lab" or green V-Label products.',
    restaurantsTitle: 'Indian Restaurants & Grocery Stores',
    restaurantsSub: 'Verified desi supermarkets and pure vegetarian dining options.',
    communityTitle: 'Indian Families, Temples & Gurudwaras',
    communitySub: 'Connect with local Indian families for weekend get-togethers and cultural festivals.',
    winterGearTitle: 'Pre-Loved Kids Winter Gear & Snowsuit Exchange',
    winterGearText: 'Children outgrow -15°C winter jackets fast. Share and exchange winter gear and strollers freely with local families.',
    lostCardNotice: 'This card is written in the local country language. If you are lost, show this screen to any passerby, driver, or police officer.',
    homeAddressLabel: 'Home Address:',
    callFamilyBtn: 'Call Now',
    navigateHome: '📍 Navigate Home on Google Maps',
    openGoogleMaps: '📍 Open on Google Maps',
    openPortal: '🌐 Open Official Portal',
    downloadForm: '📄 Download Form (PDF)',
    officeSectionTitle: 'Official Government Offices & Maps'
  }
};

// Fallback logic for other languages keeping appName as 'प्रवासी सारथी'
['ta', 'te', 'bn', 'mr', 'gu', 'pa', 'kn', 'ml'].forEach(lang => {
  UI_TEXT[lang] = {
    ...UI_TEXT.en,
    appName: 'प्रवासी सारथी',
    aboutHeading: 'प्रवासी सारथी के बारे में',
    aboutSub: 'भारतीय डेवलपर्स द्वारा, यूरोप में भारतीय परिवारों के लिए निर्मित',
    problemTitle: 'हम किस समस्या का समाधान कर रहे हैं?',
    problemDesc1: 'यूरोप जाना कई भारतीय परिवारों का सपना होता है। पहले कुछ महीने प्रशासनिक उलझनों से भरे होते हैं। भाषा की बाधाओं और कागजी कार्रवाई के कारण भारी चिंता का सामना करना पड़ता है।',
    problemDesc2: 'प्रवासी सारथी एक विश्वसनीय डिजिटल साथी के रूप में इस समस्या को हल करता है।',
    monetizationTitle: 'हम ऐप को मुफ्त और टिकाऊ कैसे रखते हैं?',
    monetizationDesc1: 'आवश्यक निपटान और आपातकालीन उपकरण हमेशा 100% मुफ्त हैं।',
    monetizationDesc2: 'जब उपयोगकर्ता हमारे अनुशंसित पार्टनर लिंक से साइन अप करते हैं, तो हमें एक छोटा रेफरल कमीशन मिलता है।',
    contactTitle: 'साझेदारी और सहयोग',
    contactDesc: 'पार्टनरशिप के लिए संपर्क करें:',
    contactEmail: '📧 1122ankitverma@gmail.com'
  };
});

// ============================================================================
// 4. GOVERNMENT OFFICES & MAPS DATABASE
// ============================================================================
const GOVERNMENT_OFFICES_DATA = {
  Frankfurt: [
    {
      id: 'fra_cityhall',
      category: 'City Hall (Bürgeramt)',
      name: 'Bürgeramt Frankfurt Innenstadt (Zeil)',
      address: 'Zeil 3, 60313 Frankfurt am Main',
      metro: 'S-Bahn/U-Bahn Konstablerwache',
      hoursTip: 'Mon, Wed, Fri: 08:00 - 13:00; Tue, Thu: 07:30 - 18:00.',
      portalUrl: 'https://frankfurt.de',
      downloadDocName: 'Wohnungsgeberbestätigung (Landlord Form PDF)',
      downloadDocUrl: 'https://frankfurt.de',
      mapsQuery: 'Bürgeramt Innenstadt Zeil 3 Frankfurt am Main'
    },
    {
      id: 'fra_tax',
      category: 'Tax Office (Finanzamt)',
      name: 'Finanzamt Frankfurt am Main I–V',
      address: 'Gutleutstraße 122, 60327 Frankfurt am Main',
      metro: 'Frankfurt Central Station (Hauptbahnhof) - 8 min walk',
      hoursTip: 'Open Mon-Fri 08:00 - 12:00.',
      portalUrl: 'https://finanzamt.hessen.de',
      mapsQuery: 'Finanzamt Frankfurt Gutleutstraße 122'
    }
  ],
  Munich: [
    {
      id: 'muc_cityhall',
      category: 'City Hall (Bürgeramt)',
      name: 'Kreisverwaltungsreferat (KVR) München',
      address: 'Ruppertstraße 19, 80337 München',
      metro: 'U-Bahn Poccistraße (U3 / U6)',
      hoursTip: 'Appointments released every weekday at 07:45 AM online.',
      portalUrl: 'https://stadt.muenchen.de',
      mapsQuery: 'KVR Ruppertstraße 19 München'
    }
  ]
};

const SETTLEMENT_TASKS = [
  {
    id: 'registration',
    dayTarget: 'Day 1–7',
    urgency: 'Critical',
    category: 'Registration',
    title: 'Address Registration (City Hall)',
    whyImportant: 'By European law, you must register your apartment address within 7-14 days. Without this registration certificate, you cannot receive your Tax ID, open a traditional bank account, or enroll your child in school.',
    brief: {
      hi: 'मकान का पता नगर निगम (City Hall) में दर्ज कराना। इसके बिना कोई भी सरकारी काम या टैक्स नंबर नहीं बनेगा।',
      en: 'Registering your flat address at the local city hall. Required to get your Tax ID, school admissions, and bank account.'
    },
    steps: [
      'Obtain the signed Landlord Move-In Certificate.',
      'Book an appointment online at your city\'s primary registration office.',
      'Carry original Indian Passports, Visas, and apostilled certificates.',
      'Collect your official registration paper immediately at the counter.'
    ]
  },
  {
    id: 'bank_sim',
    dayTarget: 'Day 3–10',
    urgency: 'High',
    category: 'Finance & Telecom',
    title: 'Expat Salary Bank Account & Local SIM Card',
    whyImportant: 'Your European company requires an EU IBAN to credit your monthly earnings. Digital expat banks allow fast video-KYC using Indian passports.',
    brief: {
      hi: 'सैलरी पाने के लिए यूरोपियन IBAN बैंक खाता और लोकल सिम कार्ड एक्टिवेट करना।',
      en: 'Opening an expat IBAN bank account for salary credit and activating a local mobile SIM.'
    },
    steps: [
      'Download bank app (C24 / N26 / Bunq).',
      'Complete online passport video verification.',
      'Set up SEPA direct debits for rent, electricity, and health insurance.'
    ]
  },
  {
    id: 'health_insurance',
    dayTarget: 'Day 5–14',
    urgency: 'Critical',
    category: 'Healthcare',
    title: 'Statutory Health Insurance & Free Family Cover',
    whyImportant: 'Health insurance is legally mandatory from day 1. If one spouse is working on a valid employment contract, the dependent spouse and children are usually covered at ZERO extra premium.',
    brief: {
      hi: 'सरकारी स्वास्थ्य बीमा में परिवार (पति/पत्नी व बच्चों) को बिना किसी अतिरिक्त खर्च के मुफ्त जोड़ना।',
      en: 'Enrolling spouse and children in statutory public health insurance at zero extra premium.'
    },
    steps: [
      'Submit employment contract to public health fund.',
      'Apply for Family Co-insurance with translated marriage & birth papers.',
      'Submit the membership certificate to employer HR.'
    ]
  },
  {
    id: 'tax_id',
    dayTarget: 'Day 10–20',
    urgency: 'High',
    category: 'Tax & Payroll',
    title: 'Tax ID & Payroll Setup',
    whyImportant: 'Your national Tax ID is automatically generated following your address registration and sent by post. Give it to your employer to avoid emergency tax.',
    brief: {
      hi: 'पोस्ट द्वारा टैक्स आईडी प्राप्त करना और अपनी कंपनी के HR को देना ताकि अधिकतम टैक्स न कटे।',
      en: 'Retrieving your Tax ID generated by the government to ensure correct payroll tax bracket.'
    },
    steps: [
      'Allow 2-3 weeks after Address Registration for the letter to arrive.',
      'If delayed, submit an online retrieval request directly on the national tax portal.',
      'Instruct company payroll on chosen Tax Class.'
    ]
  },
  {
    id: 'child_benefit',
    dayTarget: 'Day 15–30',
    urgency: 'Medium',
    category: 'Family Benefits',
    title: 'Apply for Monthly State Child Allowance',
    whyImportant: 'The state child benefit office grants a monthly tax-free allowance directly into your bank account for all families holding eligible residence permits.',
    brief: {
      hi: 'हर बच्चे के लिए सरकार से वित्तीय सहायता प्राप्त करने का फॉर्म भरना।',
      en: 'Applying for the monthly government child allowance deposited directly to your bank account.'
    },
    steps: [
      'Wait for child\'s Tax ID to arrive.',
      'Fill out the official Child Benefit application form.',
      'Post printed packet to your district family office via registered post.'
    ]
  },
  {
    id: 'broadcasting',
    dayTarget: 'Day 20–30',
    urgency: 'Medium',
    category: 'Housing Formalities',
    title: 'Broadcasting/TV Fee Registration',
    whyImportant: 'By law in many European countries, every household must pay a monthly fee for public broadcasting. Only one person per apartment pays.',
    brief: {
      hi: 'प्रति घर टीवी/रेडियो लाइसेंस फीस का ऑनलाइन पंजीकरण करना। इसे अनदेखा न करें।',
      en: 'Registering your household for the mandatory public broadcasting contribution.'
    },
    steps: [
      'Wait for the official letter addressed to your mailbox.',
      'Open the official online portal.',
      'Opt for SEPA direct debit quarterly for hassle-free payment.'
    ]
  }
];

const PRESET_FLASHCARDS = [
  {
    id: 'f_water',
    category: 'Cafe & Restaurant',
    meaning: {
      hi: 'मुझे बिना गैस वाला सादा पानी (Still Water) चाहिए। क्या आप नल का पानी (Tap water) दे सकते हैं?',
      en: 'I would like regular still water (no gas). Could you please provide tap water?'
    },
    translations: {
      germany: { prompt: 'Ich hätte gerne stilles Wasser (ohne Kohlensäure). Könnten Sie mir Leitungswasser bringen?', options: ['Ja, gerne (Kostenlos)', 'Leitungswasser kostet extra', 'Wir haben nur Flaschenwasser'] },
      netherlands: { prompt: 'Mag ik plat water (zonder bubbels)? Heeft u misschien kraanwater?', options: ['Ja, natuurlijk', 'Kraanwater kost geld', 'Alleen flessenwater'] },
      france: { prompt: 'Je voudrais de l\'eau plate (sans gaz). Puis-je avoir une carafe d\'eau (eau du robinet) s\'il vous plaît ?', options: ['Oui, bien sûr', 'Seulement en bouteille', 'L\'eau n\'est pas potable'] },
      ireland: { prompt: 'I would like still water. Could I please get a glass of tap water?', options: ['Yes, of course', 'We only serve bottled water', 'Let me check'] },
      spain: { prompt: 'Quisiera agua sin gas. ¿Me podría traer un vaso de agua del grifo, por favor?', options: ['Sí, claro', 'Solo tenemos embotellada', 'El agua del grifo no es buena'] },
      sweden: { prompt: 'Jag skulle vilja ha stilla vatten. Kan jag få kranvatten?', options: ['Ja, självklart', 'Kranvatten kostar extra', 'Bara på flaska'] },
      poland: { prompt: 'Poproszę wodę niegazowaną. Czy mogę prosić o wodę z kranu?', options: ['Tak, jasne', 'Mamy tylko butelkowaną', 'Woda z kranu jest płatna'] }
    }
  },
  {
    id: 'f1',
    category: 'Doctor & Medical',
    meaning: {
      hi: 'मेरे बच्चे को तेज बुखार और गले में दर्द है। क्या डॉक्टर देख सकते हैं?',
      en: 'My child has a high fever and a sore throat. Could a doctor examine them?'
    },
    translations: {
      germany: { prompt: 'Mein Kind hat hohes Fieber und Halsschmerzen. Können Sie uns bitte helfen?', options: ['Sofort ins Wartezimmer', 'Bitte 15 Min. warten', 'Nur mit Termin heute'] },
      netherlands: { prompt: 'Mijn kind heeft hohe koorts en keelpijn. Kunt u ons alstublieft helpen?', options: ['Ga naar wachtkamer', '15 minuten wachten', 'Alleen op afspraak'] },
      france: { prompt: 'Mon enfant a une forte fièvre et mal à la gorge. Pouvez-vous nous aider?', options: ['Entrez en salle d\'attente', 'Attendez 15 min', 'Sur rendez-vous uniquement'] },
      ireland: { prompt: 'My child has a high fever and a sore throat. Could you please help us?', options: ['Please take a seat inside', 'Wait about 15 mins', 'Appointment only'] },
      spain: { prompt: 'Mi hijo tiene fiebre alta y dolor de garganta. ¿Puede ayudarnos por favor?', options: ['Pase a la sala de espera', 'Espere 15 minutos', 'Solo con cita previa'] }
    }
  },
  {
    id: 'f2',
    category: 'Supermarket & Food',
    meaning: {
      hi: 'क्या यह पूरी तरह शाकाहारी है? इसमें कोई जिलेटिन या मांस तो नहीं?',
      en: 'Is this strictly vegetarian? Does it contain gelatin or animal ingredients?'
    },
    translations: {
      germany: { prompt: 'Ist dieses Produkt rein vegetarisch? Enthält es Gelatine oder tierisches Lab?', options: ['Ja, 100% vegetarisch', 'Nein, enthält Gelatine/Fleisch', 'Ich bin mir nicht sicher'] },
      netherlands: { prompt: 'Is dit product 100% vegetarisch? Bevat het gelatine of dierlijk stremsel?', options: ['Ja, vegetarisch', 'Nee, bevat gelatine/vlees', 'Niet zeker'] },
      france: { prompt: 'Ce produit est-il végétarien? Contient-il de la gélatine animale?', options: ['Oui, végétarien', 'Non, contient gélatine/viande', 'Pas sûr'] },
      ireland: { prompt: 'Is this item strictly vegetarian? Does it contain gelatin or animal rennet?', options: ['Yes, 100% vegetarian', 'No, contains gelatin/meat', 'Not sure'] },
      spain: { prompt: '¿Este producto es 100% vegetariano? ¿Contiene gelatina o grasa animal?', options: ['Sí, vegetariano', 'No, contiene gelatina/carne', 'No estoy seguro'] }
    }
  },
  {
    id: 'f3',
    category: 'Bus, Tram & Train',
    meaning: {
      hi: 'क्या यह बस या ट्रेन मुख्य रेलवे स्टेशन (Central Station) तक जाती है?',
      en: 'Does this bus or train go to the Central Station?'
    },
    translations: {
      germany: { prompt: 'Hält dieser Bus oder Zug am Hauptbahnhof? Wann kommt die Haltestelle?', options: ['Ja, fährt direkt dorthin', 'Nein, andere Richtung', 'In 3 Haltestellen aussteigen'] },
      netherlands: { prompt: 'Stopt deze bus of trein bij het Centraal Station?', options: ['Ja, gaat er direct heen', 'Nee, verkeerde kant', 'Over 3 haltes'] },
      france: { prompt: 'Ce bus ou train va-t-il à la Gare Centrale?', options: ['Oui, direct', 'Non, mauvaise direction', 'Descendre dans 3 arrêts'] },
      ireland: { prompt: 'Does this bus or train stop at the Central Station?', options: ['Yes, goes directly there', 'No, wrong direction', 'Get off in 3 stops'] },
      spain: { prompt: '¿Este autobús o tren para en la Estación Central?', options: ['Sí, directo', 'No, otra dirección', 'Bajar en 3 paradas'] }
    }
  }
];

const FLASHCARD_TEMPLATES = [
  {
    title: 'No Beef/Pork (कोई बीफ/पोर्क नहीं)',
    category: 'Food & Diet',
    userText: 'Does this dish contain any beef, pork, or alcohol? We are strictly vegetarian.',
    localText: 'Enthält dieses Gericht Rindfleisch, Schweinefleisch oder Alkohol?',
    opt1: 'Nein, alles sicher (No, safe)',
    opt2: 'Ja, enthält Fleisch (Contains meat)',
    opt3: 'Ja, enthält Alkohol (Contains alcohol)'
  },
  {
    title: 'Make it Indian Spicy',
    category: 'Restaurant',
    userText: 'Can you please make this dish very spicy (Indian style) with extra chili?',
    localText: 'Können Sie dieses Gericht bitte sehr scharf (mit extra Chili) machen?',
    opt1: 'Ja, sehr scharf (Yes, very spicy)',
    opt2: 'Ein bisschen scharf (A little spicy)',
    opt3: 'Nicht möglich (Not possible)'
  },
  {
    title: 'Public Toilet & Coins',
    category: 'Daily Living',
    userText: 'Excuse me, where is the nearest public toilet? Is it free or do I need coins?',
    localText: 'Entschuldigung, wo ist die nächste Toilette? Brauche ich Kleingeld dafür?',
    opt1: 'Kostenlos hier (Free right here)',
    opt2: 'Kostet 50 Cent (Costs 50 cents)',
    opt3: 'Nur für Gäste (Only for guests)'
  },
  {
    title: 'Weighing Veggies',
    category: 'Supermarket',
    userText: 'Do I need to weigh these vegetables myself here, or will you weigh them at the checkout counter?',
    localText: 'Muss ich das Gemüse hier selbst abwiegen oder machen Sie das an der Kasse?',
    opt1: 'Selbst abwiegen (Weigh it yourself)',
    opt2: 'An der Kasse (At the checkout)',
    opt3: 'Ich helfe Ihnen (I will help you)'
  },
  {
    title: 'Student Discount',
    category: 'Tickets & Shopping',
    userText: 'Do you offer a student discount? Here is my university ID card.',
    localText: 'Bieten Sie einen Studentenrabatt an? Hier ist mein Ausweis.',
    opt1: 'Ja, mit Rabatt (Yes, with discount)',
    opt2: 'Nein, leider nicht (No, unfortunately not)',
    opt3: 'Nur mit ISIC Karte (Only with ISIC card)'
  },
  {
    title: 'Train Platform',
    category: 'Transport',
    userText: 'Excuse me, which platform does the train to the airport/central station leave from?',
    localText: 'Entschuldigung, von welchem Gleis fährt der Zug zum Flughafen/Hauptbahnhof?',
    opt1: 'Gleis 1 (Platform 1)',
    opt2: 'Fällt heute aus (Cancelled today)',
    opt3: 'Gleis 3, dort drüben (Platform 3, over there)'
  }
];

const HOSPITALS_DATA = {
  Frankfurt: [
    { name: 'Universitätsklinikum Frankfurt', address: 'Theodor-Stern-Kai 7, 60590 Frankfurt', phone: '+49 69 6301 7777', type: '24/7 Adult & Trauma ER', status: '24/7 Open', metro: 'Tram 12, 21' },
    { name: 'Clementine Kinderhospital', address: 'Theobald-Christ-Straße 16, 60316 Frankfurt', phone: '+49 69 949920', type: 'Dedicated Pediatric ER', status: '24/7 Children ER', metro: 'U-Bahn Merianplatz' }
  ],
  Munich: [
    { name: 'Dr. von Haunersches Kinderspital', address: 'Lindwurmstraße 4, 80337 München', phone: '+49 89 4400 52811', type: 'Pediatric University Hospital', status: '24/7 Children ER', metro: 'Goetheplatz' }
  ]
};

const GROCERY_SUBSTITUTES = [
  { item: 'Paneer (पनीर)', substitute: 'Schichtkäse (10%/20% Fett) / Türkischer Schnittkäse', stores: 'Rewe, Edeka, Lidl, Turkish markets', note: 'Schichtkäse has the identical mild taste. For frying, Turkish Börek cheese works.' },
  { item: 'Chakki Atta (रोटी का आटा)', substitute: 'Weizenmehl Type 1050 + Vollkornmehl (50:50 mix)', stores: 'Aldi, Lidl, Rewe, DM Bio', note: 'Mix Type 1050 with whole wheat flour for soft Rotis.' },
  { item: 'Dahi / Curd (दही)', substitute: 'Stichfester Joghurt (3.5% / 10% Fett)', stores: 'Rewe, Aldi, Lidl, Carrefour', note: 'Look for "stichfest" (set curd) on the bucket, not "cremig gerührt".' },
  { item: 'Jeera / Cumin (जीरा)', substitute: 'Kreuzkümmel (Not regular Kümmel)', stores: 'Supermarket spice aisle', note: 'WARNING: Regular European "Kümmel" is caraway seed. Always choose "Kreuzkümmel".' }
];

const DIRECTORY_DATA = {
  Frankfurt: [
    { name: 'Spiceland Indian Grocery', type: 'Grocery', address: 'Kaiserstraße 64', rating: 4.6, note: 'Fresh Methi & Tindora deliveries Tue/Thu' },
    { name: 'Saravanaa Bhavan', type: 'Pure Veg / South', address: 'Kaiserstraße 68', rating: 4.3, note: 'Authentic Dosa & Filter Coffee' }
  ]
};

const COMMUNITY_DATA = {
  Frankfurt: [
    { name: 'Gurudwara Sri Guru Singh Sabha', type: 'Gurudwara', address: 'Borsigallee 43', note: 'Sunday Langar & Kirtan' },
    { name: 'Sanatan Mandir Frankfurt', type: 'Temple', address: 'Sprendlinger Landstraße 180', note: 'Aarti every Tuesday & Sunday' }
  ]
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function App() {
  const [selectedLang, setSelectedLang] = useState('hi');
  const [showLangModal, setShowLangModal] = useState(false);

  const [currentCountryKey, setCurrentCountryKey] = useState('germany');
  const currentCountry = EUROPEAN_COUNTRIES[currentCountryKey];
  const [selectedCity, setSelectedCity] = useState(currentCountry.cities[0]);

  const [activeTab, setActiveTab] = useState('journey');
  const [textSize, setTextSize] = useState('normal');

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [inrAmount, setInrAmount] = useState('100000');
  const [eurAmount, setEurAmount] = useState('1082');

  const [showEmergencyCard, setShowEmergencyCard] = useState(false);
  const [familyPhone, setFamilyPhone] = useState('+49 176 12345678');
  const [homeAddress, setHomeAddress] = useState('Musterstraße 12, 60329 Frankfurt am Main');

  const [localFeedback, setLocalFeedback] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({ registration: true });

  const [customCards, setCustomCards] = useState(() => {
    try {
      const saved = localStorage.getItem('pravasi_custom_flashcards_v4');
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

  const COUNTRY_LANG_CODES = {
    germany: { tl: 'de', tts: 'de-DE' },
    netherlands: { tl: 'nl', tts: 'nl-NL' },
    france: { tl: 'fr', tts: 'fr-FR' },
    ireland: { tl: 'en', tts: 'en-IE' },
    spain: { tl: 'es', tts: 'es-ES' },
    sweden: { tl: 'sv', tts: 'sv-SE' },
    poland: { tl: 'pl', tts: 'pl-PL' }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = COUNTRY_LANG_CODES[currentCountryKey]?.tts || 'de-DE';
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
    const tl = COUNTRY_LANG_CODES[currentCountryKey]?.tl || 'de';
    const translated = await translateString(sourceText, tl);
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

  const [publicPosts, setPublicPosts] = useState([
    { id: 101, country: 'germany', authorId: 'mock1', authorName: 'Rahul M.', text: 'Landing in Munich next week. Can someone guide me on which SIM card to buy at the airport?', time: '10:30 AM' },
    { id: 102, country: 'germany', authorId: 'mock2', authorName: 'Priya S.', text: 'Does anyone have a contact for a reliable moving van in Berlin?', time: '09:15 AM' }
  ]);
  const [privateChats, setPrivateChats] = useState({
    'mock1': { name: 'Rahul M.', messages: [{ id: 1, senderId: myUserId, text: 'Hey Rahul! Get a Lebara SIM at REWE.', time: '10:45 AM' }] }
  });

  useEffect(() => {
    try { localStorage.setItem('pravasi_custom_flashcards_v4', JSON.stringify(customCards)); } catch (e) { console.error(e); }
  }, [customCards]);

  useEffect(() => {
    if (chatView === 'private' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [privateChats, chatView, activePrivateChatUser]);

  const handleCountryChange = (key) => {
    setCurrentCountryKey(key);
    setSelectedCity(EUROPEAN_COUNTRIES[key].cities[0]);
    setLocalFeedback(null);
    setEurAmount((Number(inrAmount) / EUROPEAN_COUNTRIES[key].rateToInr).toFixed(0));
    setChatView('board'); 
  };

  const joinChat = (e) => {
    e.preventDefault();
    if(chatName.trim()) {
      try { localStorage.setItem('pravasi_chat_name', chatName.trim()); } catch (e) {}
      setHasJoinedChat(true);
    }
  };

  const handlePostToBoard = (e) => {
    e.preventDefault();
    if (!composeText.trim()) return;
    const newPost = { id: Date.now(), country: currentCountryKey, authorId: myUserId, authorName: chatName, text: composeText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setPublicPosts([newPost, ...publicPosts]);
    setComposeText('');
  };

  const startPrivateChat = (userObj) => {
    if (!privateChats[userObj.authorId]) {
      setPrivateChats(prev => ({ ...prev, [userObj.authorId]: { name: userObj.authorName, messages: [] } }));
    }
    setActivePrivateChatUser({ id: userObj.authorId, name: userObj.authorName });
    setChatView('private');
  };

  const handleSendPrivateMessage = (e) => {
    e.preventDefault();
    if (!composeText.trim() || !activePrivateChatUser) return;
    const newMsg = { id: Date.now(), senderId: myUserId, text: composeText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setPrivateChats(prev => ({ ...prev, [activePrivateChatUser.id]: { ...prev[activePrivateChatUser.id], messages: [...prev[activePrivateChatUser.id].messages, newMsg] } }));
    setComposeText('');
  };

  const shareWhatsAppNumber = () => {
    const num = window.prompt("Enter your WhatsApp number with country code (e.g., +49176... or +9198...):");
    if (num) {
      const cleanNum = num.replace(/[^0-9]/g, '');
      const newMsg = { id: Date.now(), senderId: myUserId, text: `📱 I have shared my WhatsApp number with you. Let's chat there!\n\nClick here: https://wa.me/${cleanNum}`, isSystem: true, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setPrivateChats(prev => ({ ...prev, [activePrivateChatUser.id]: { ...prev[activePrivateChatUser.id], messages: [...prev[activePrivateChatUser.id].messages, newMsg] } }));
    }
  };

  const handleAddCustomCard = (e) => {
    e.preventDefault();
    if (!newCardForm.userText || !newCardForm.localText) return;
    const newCard = { id: 'custom_' + Date.now(), category: newCardForm.category, userText: newCardForm.userText, localText: newCardForm.localText, options: [newCardForm.opt1, newCardForm.opt2, newCardForm.opt3].filter(Boolean) };
    setCustomCards([newCard, ...customCards]);
    setShowNewCardModal(false);
    setNewCardForm({ category: 'Daily Living', userText: '', localText: '', opt1: 'Ja / Yes', opt2: 'Nein / No', opt3: 'Bitte warten / Please wait' });
  };

  const handleDeleteCustomCard = (id) => {
    setCustomCards(customCards.filter(c => c.id !== id));
  };

  const applyTemplate = async (tmpl) => {
    const tl = COUNTRY_LANG_CODES[currentCountryKey]?.tl || 'de';
    setNewCardForm({ category: tmpl.category, userText: tmpl.userText, localText: tmpl.localText, opt1: tmpl.opt1, opt2: tmpl.opt2, opt3: tmpl.opt3 });
    if (currentCountryKey !== 'germany') {
      setIsTranslating(true);
      const [transLocal, transOpt1, transOpt2, transOpt3] = await Promise.all([
        translateString(tmpl.userText, tl),
        translateString(tmpl.opt1, tl),
        translateString(tmpl.opt2, tl),
        translateString(tmpl.opt3, tl)
      ]);
      setNewCardForm({
        category: tmpl.category,
        userText: tmpl.userText,
        localText: transLocal,
        opt1: transOpt1,
        opt2: transOpt2,
        opt3: transOpt3
      });
      setIsTranslating(false);
    }
  };

  const t = UI_TEXT[selectedLang] || UI_TEXT.en;
  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  const fontMultiplierClass = useMemo(() => {
    if (textSize === 'xl') return 'text-lg leading-relaxed';
    if (textSize === 'large') return 'text-base leading-normal';
    return 'text-sm leading-normal';
  }, [textSize]);

  const cityOffices = GOVERNMENT_OFFICES_DATA[selectedCity] || GOVERNMENT_OFFICES_DATA.Frankfurt || [];
  const primaryCityHall = cityOffices.find(o => o.category.includes('City Hall') || o.category.includes('Intreo') || o.category.includes('Mairie')) || cityOffices[0];

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col ${fontMultiplierClass}`}>

      {/* ================= ============================================ */}
      {/* 1. TOP NOTIFICATION & ACCESSIBILITY BAR                        */}
      {/* ============================================================== */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm z-40 relative">
        <div className="flex items-center gap-3 flex-wrap font-medium">
          <span className="bg-slate-800 text-slate-100 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-slate-700">
            {currentCountry.flag} {currentCountry.name}
          </span>
          <span className="hidden sm:inline">
            {t.policeAmbulance} <strong className="text-white tracking-wider">{currentCountry.emergencyPhone}</strong>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">
            {t.nonEmergencyDoc} <strong className="text-white tracking-wider">{currentCountry.medicalOnCall}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowCurrencyModal(!showCurrencyModal)} className="hover:bg-slate-800 px-3 py-1 rounded-md text-amber-400 font-medium text-[11px] border border-slate-700 transition">
            <span>{currentCountry.currency}</span><span className="ml-1 opacity-80">1 {currentCountry.symbol} ≈ ₹{currentCountry.rateToInr}</span>
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
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1"><span className="text-slate-400 ml-1">₹</span><input type="number" value={inrAmount} onChange={(e) => { const val = e.target.value; setInrAmount(val); setEurAmount((Number(val) / currentCountry.rateToInr).toFixed(0)); }} className="w-24 bg-transparent font-semibold text-slate-900 focus:outline-none" /></div>
              <span className="font-medium text-slate-400">≈</span>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1"><span className="text-slate-400 ml-1">{currentCountry.symbol}</span><input type="number" value={eurAmount} onChange={(e) => { const val = e.target.value; setEurAmount(val); setInrAmount((Number(val) * currentCountry.rateToInr).toFixed(0)); }} className="w-20 bg-transparent font-semibold text-indigo-700 focus:outline-none" /></div>
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
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md border border-slate-200 uppercase">Companion</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{currentLangObj.greeting}! {t.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm hover:border-slate-300 transition">
              <span className="text-base">{currentCountry.flag}</span>
              <select value={currentCountryKey} onChange={(e) => handleCountryChange(e.target.value)} className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer">
                {Object.keys(EUROPEAN_COUNTRIES).map((key) => (<option key={key} value={key}>{EUROPEAN_COUNTRIES[key].name}</option>))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm hover:border-slate-300 transition">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer">
                {currentCountry.cities.map((city) => (<option key={city} value={city}>{city}</option>))}
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
            { id: 'chat', label: t.tabs.chat || 'Chat', icon: MessageCircle },
            { id: 'about', label: t.tabs.about || 'About Us', icon: Info }
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

        {/* TAB 1: ROADMAP */}
        {activeTab === 'journey' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-800"></div>
              <div className="pl-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">Roadmap</span>
                  <span className="text-sm font-medium text-slate-500">{selectedCity}, {currentCountry.name}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{t.roadmapHeading}</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{t.roadmapSub}</p>
              </div>
              <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 text-center shrink-0">
                <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider mb-1">Progress</span>
                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                  <span className="text-3xl font-bold">{Object.values(completedTasks).filter(Boolean).length}</span>
                  <span className="text-lg text-slate-400">/ {SETTLEMENT_TASKS.length}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SETTLEMENT_TASKS.map((task) => {
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

                      {task.id === 'registration' && primaryCityHall && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm space-y-2 mt-4">
                          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-1">
                            <Building2 className="w-4 h-4" /><span>Primary Office in {selectedCity}:</span>
                          </div>
                          <p className="font-semibold text-slate-900">{primaryCityHall.name}</p>
                          <p className="text-slate-500 flex items-start gap-1.5 text-xs">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" /><span className="leading-snug">{primaryCityHall.address}</span>
                          </p>
                          <div className="pt-3 flex flex-wrap gap-2">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryCityHall.mapsQuery || primaryCityHall.name + ' ' + primaryCityHall.address)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-3 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 border border-slate-200 shadow-sm transition"><Navigation className="w-3.5 h-3.5 text-slate-400" /><span>{t.openGoogleMaps}</span></a>
                            <a href={primaryCityHall.portalUrl} target="_blank" rel="noreferrer" className="bg-white hover:bg-indigo-50 text-indigo-600 font-medium px-3 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 border border-slate-200 shadow-sm transition"><span>{t.openPortal}</span><ExternalLink className="w-3.5 h-3.5 opacity-70" /></a>
                          </div>
                        </div>
                      )}
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
              {(GOVERNMENT_OFFICES_DATA[selectedCity] || GOVERNMENT_OFFICES_DATA.Frankfurt).map((office) => (
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

        {/* TAB 3: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Mic className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">2-Way Voice Bridge</span>
                  <h3 className="text-xl font-bold mt-1">Google Live Voice & Text Translator</h3>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">Speak in {currentLangObj.label} and translate directly into {currentCountry.officialLang}.</p>
                </div>
              </div>
              <a
                href={`https://translate.google.com/?sl=${selectedLang}&tl=${COUNTRY_LANG_CODES[currentCountryKey]?.tl || 'de'}&op=translate`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-5 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-sm transition shrink-0"
              >
                <Globe className="w-4 h-4" />
                <span>🎙️ Open Google Translator</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
              <div className="flex items-center gap-4 pl-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100"><Languages className="w-6 h-6" /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{t.tabs.flashcards} — <span className="text-slate-500 font-normal">{currentCountry.officialLang}</span></h2>
                  <p className="text-sm text-slate-500 mt-1">{t.tapToAnswer}</p>
                </div>
              </div>
              <button onClick={() => setShowNewCardModal(true)} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-3 rounded-2xl shadow-sm text-sm transition active:scale-95 shrink-0"><PlusCircle className="w-4 h-4 opacity-80" /><span>{t.addNewCardBtn}</span></button>
            </div>

            {localFeedback && (
              <div className="bg-emerald-50 text-emerald-900 p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between gap-4 animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0"><CheckCircle2 className="w-5 h-5" /></div><div><span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block mb-0.5">{t.localAnswered}</span><p className="text-base font-semibold">{localFeedback}</p></div></div>
                <button onClick={() => setLocalFeedback(null)} className="text-emerald-500 hover:text-emerald-700 bg-white p-2 rounded-full border border-emerald-100 transition"><X className="w-4 h-4" /></button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customCards.map((card) => (
                <div key={card.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 relative">
                  <div className="flex items-center justify-between"><span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-indigo-100"><Sparkles className="w-3.5 h-3.5" /><span>{card.category} ({t.customCardBadge})</span></span><button onClick={() => handleDeleteCustomCard(card.id)} className="text-slate-300 hover:text-rose-500 p-1.5 rounded-full hover:bg-rose-50 transition" title="Delete card"><Trash2 className="w-4 h-4" /></button></div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{t.youAreAsking}</span><p className="text-sm font-medium text-slate-800 leading-relaxed">{card.userText}</p></div>
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 text-slate-900">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase text-amber-700 block tracking-widest">{currentCountry.officialLang} ({t.showToLocal}):</span>
                      <button type="button" onClick={() => speakText(card.localText)} className="bg-amber-200/70 hover:bg-amber-300 text-amber-950 px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition">
                        <Volume2 className="w-3.5 h-3.5" /> <span>🔊 Speak</span>
                      </button>
                    </div>
                    <p className="text-lg font-semibold leading-snug">"{card.localText}"</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-medium text-slate-400 block tracking-wide">{t.tapToAnswer}</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {card.options.map((opt, i) => (<button key={i} onClick={() => setLocalFeedback(opt)} className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium text-sm text-slate-700 transition flex items-center justify-between shadow-sm hover:shadow"><span>{opt}</span><ChevronRight className="w-4 h-4 text-slate-300" /></button>))}
                    </div>
                  </div>
                </div>
              ))}

              {PRESET_FLASHCARDS.map((card) => {
                const countryTranslation = card.translations[currentCountryKey] || card.translations.germany;
                const localizedQuestion = card.meaning[selectedLang] || card.meaning.en;
                return (
                  <div key={card.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block border border-slate-200">{card.category}</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{t.youAreAsking}</span><p className="text-sm font-medium text-slate-800 leading-relaxed">{localizedQuestion}</p><p className="text-[11px] text-slate-400 mt-2 font-serif italic">"{card.meaning.en}"</p></div>
                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-widest">{currentCountry.officialLang} ({t.showToLocal}):</span>
                        <button type="button" onClick={() => speakText(countryTranslation.prompt)} className="bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 border border-slate-700 transition">
                          <Volume2 className="w-3.5 h-3.5" /> <span>🔊 Speak</span>
                        </button>
                      </div>
                      <p className="text-lg font-semibold leading-snug">"{countryTranslation.prompt}"</p>
                    </div>
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-medium text-slate-400 block tracking-wide">{t.tapToAnswer}</span>
                      <div className="grid grid-cols-1 gap-2.5">
                        {countryTranslation.options.map((opt, i) => (<button key={i} onClick={() => setLocalFeedback(opt)} className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium text-sm text-slate-700 transition flex items-center justify-between shadow-sm hover:shadow"><span>{opt}</span><ChevronRight className="w-4 h-4 text-slate-300" /></button>))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: HOSPITALS */}
        {activeTab === 'essentials' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-rose-900 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>Live Medical Locator</h3>
                 <p className="text-sm text-rose-700 mt-1.5 max-w-md leading-relaxed">Use your phone's GPS to find the nearest emergency rooms, pediatricians, and 24/7 pharmacies instantly.</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href="https://www.google.com/maps/search/?api=1&query=Emergency+Hospital+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">🏥</span> Hospital / ER</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Pediatrician+Kinderarzt+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">👶</span> Pediatrician</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Pharmacy+Apotheke+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">💊</span> Pharmacy</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=General+Doctor+Clinic+Hausarzt+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">🩺</span> Clinic / GP</a>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(HOSPITALS_DATA[selectedCity] || HOSPITALS_DATA.Frankfurt).map((hosp, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:shadow-md transition duration-300">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-slate-900 text-lg leading-snug">{hosp.name}</h3><span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2.5 py-1 rounded-full border border-rose-100 whitespace-nowrap shrink-0">{hosp.status}</span></div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block border border-slate-200">{hosp.type}</span>
                    <div className="pt-2 space-y-2 text-sm text-slate-600"><p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{hosp.address}</span></p></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                    <a href={`tel:${hosp.phone}`} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><Phone className="w-4 h-4 opacity-80" /><span>{hosp.phone}</span></a>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ' ' + hosp.address)}`} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span>{t.openGoogleMaps}</span><Navigation className="w-3.5 h-3.5 text-slate-400" /></a>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100"><Stethoscope className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">Night Pharmacy (Notdienst)</h4>
                <p className="text-sm text-slate-500 leading-relaxed pb-6">Pharmacies rotate 24-hour night duty. Ring the night bell (Notdienstglocke) for urgent baby fever syrup.</p>
                <div className="absolute bottom-6 left-6"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Notdienst Apotheke ' + selectedCity)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5"><span>Find Open Pharmacy</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100"><Package className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">Baby Care (dm / Rossmann)</h4>
                <p className="text-sm text-slate-500 leading-relaxed pb-6">Formula milk: Aptamil (Pre / 1), HiPP Bio Combiotik. 'Pre' is closest to breast milk. Stock up on diapers.</p>
                <div className="absolute bottom-6 left-6"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('dm drogerie ' + selectedCity)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5"><span>Locate Nearest Store</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DESI RADAR */}
        {activeTab === 'desiRadar' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-3xl"></div>
               <div className="pl-2">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>Live Location Search</h3>
                 <p className="text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">Access your device's GPS to find the nearest curated Indian groceries, tiffins, and food services.</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+grocery+store+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><ShoppingBag className="w-4 h-4 text-slate-400"/> Groceries</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+restaurant+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><MapPin className="w-4 h-4 text-slate-400"/> Restaurants</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+tiffin+service+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><Package className="w-4 h-4 text-slate-400"/> Tiffin Centers</a>
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">{t.substitutesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GROCERY_SUBSTITUTES.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900 text-base">{sub.item}</h3><span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">{t.safeAlternative}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Buy this on shelf:</span><span className="text-sm font-bold text-slate-800 block">{sub.substitute}</span></div>
                    <p className="text-sm text-slate-600 leading-relaxed flex gap-2"><span className="opacity-60">💡</span><span>{sub.note}</span></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">{t.restaurantsTitle} ({selectedCity})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(DIRECTORY_DATA[selectedCity] || DIRECTORY_DATA.Frankfurt).map((store, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2"><div><h4 className="font-bold text-slate-900 text-base">{store.name}</h4><span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-md mt-1.5 inline-block border border-slate-200">{store.type}</span></div></div>
                      <p className="text-sm text-slate-500 flex items-start gap-2 pt-1"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{store.address}</span></p>
                    </div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5 pt-2"><span>{t.openGoogleMaps}</span><ExternalLink className="w-3.5 h-3.5" /></a>
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
                <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>Live Community Locator</h3>
                <p className="text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">Find the nearest religious centers and Indian associations securely using GPS.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pl-2">
                <a href="https://www.google.com/maps/search/?api=1&query=Hindu+Temple+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🛕</span> Temple</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Mosque+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🕌</span> Mosque</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Gurudwara+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🪯</span> Gurudwara</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Church+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">⛪</span> Church</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Indian+Community+Association+Club+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🤝</span> Associations</a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(COMMUNITY_DATA[selectedCity] || COMMUNITY_DATA.Frankfurt).map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm"><Users className="w-5 h-5 text-slate-400" /></div>
                    <div><h3 className="font-bold text-slate-900 text-base">{item.name}</h3><span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md mt-1.5 inline-block border border-slate-200">{item.type}</span></div>
                    <p className="text-sm text-slate-500 flex items-start gap-2 pt-1"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{item.address}</span></p>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium mt-2 leading-relaxed">{item.note}</div>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.address)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5 pt-2"><span>{t.openGoogleMaps}</span><ExternalLink className="w-3.5 h-3.5" /></a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[700px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
              <div className="flex bg-slate-200/60 p-1 rounded-xl">
                <button onClick={() => setChatView('board')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${chatView === 'board' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}><MessageSquare className="w-4 h-4"/> Public Board</button>
                <button onClick={() => setChatView('inbox')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${chatView === 'inbox' || chatView === 'private' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}><Inbox className="w-4 h-4"/> My Inbox</button>
              </div>
            </div>

            {!hasJoinedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-slate-200">👋</div>
                <div><h4 className="font-bold text-xl text-slate-900 mb-2">Join {currentCountry.name} Community</h4><p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">Choose a display name. Your identity is hidden until you choose to safely share your WhatsApp number in a private chat.</p></div>
                <form onSubmit={joinChat} className="w-full max-w-sm space-y-4 pt-4">
                  <input type="text" required placeholder="Choose a Display Name (e.g. Rahul M.)" value={chatName} onChange={(e) => setChatName(e.target.value)} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 text-center font-medium shadow-sm transition" />
                  <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-2xl shadow-sm hover:bg-slate-800 transition">Enter Public Board</button>
                </form>
              </div>
            ) : (
              <>
                {chatView === 'board' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
                      {publicPosts.filter(p => p.country === currentCountryKey).length === 0 ? (
                        <div className="text-center text-slate-400 text-sm mt-10">No public posts yet. Be the first to ask a question!</div>
                      ) : (
                        publicPosts.filter(p => p.country === currentCountryKey).map((post) => (
                          <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                            <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-900">{post.authorName}</span><span className="text-xs text-slate-400 font-medium">{post.time}</span></div>
                            <p className="text-sm text-slate-700 leading-relaxed">{post.text}</p>
                            <div className="pt-3 flex justify-end">
                              {post.authorId === myUserId ? (
                                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Your Post</span>
                              ) : (
                                <button onClick={() => startPrivateChat(post)} className="text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-xl transition border border-indigo-100 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5"/> Message Privately</button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                      <form onSubmit={handlePostToBoard} className="flex flex-col gap-3">
                        <textarea rows={2} placeholder="Ask a question or share advice to the public board..." value={composeText} onChange={(e) => setComposeText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 font-medium transition resize-none" />
                        <div className="flex justify-end"><button type="submit" disabled={!composeText.trim()} className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-2.5 rounded-xl transition shadow-sm text-sm font-semibold">Post to Board</button></div>
                      </form>
                    </div>
                  </div>
                )}

                {chatView === 'inbox' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">My Private Messages</h2>
                    {Object.keys(privateChats).length === 0 ? (
                      <div className="text-center text-slate-400 text-sm mt-10">Your inbox is empty. Message someone from the Public Board.</div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(privateChats).map(([uid, chatData]) => {
                          const lastMsg = chatData.messages[chatData.messages.length - 1];
                          return (
                            <div key={uid} onClick={() => { setActivePrivateChatUser({id: uid, name: chatData.name}); setChatView('private'); }} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition flex items-center justify-between">
                              <div><div className="font-bold text-slate-900 text-sm">{chatData.name}</div><div className="text-xs text-slate-500 truncate max-w-[250px] mt-1">{lastMsg ? lastMsg.text : 'Click to chat'}</div></div>
                              <ChevronRight className="w-5 h-5 text-slate-300" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {chatView === 'private' && activePrivateChatUser && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setChatView('inbox')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 transition"><ChevronLeft className="w-5 h-5" /></button>
                        <div><div className="font-bold text-sm text-slate-900">{activePrivateChatUser.name}</div><div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Private 1-on-1 Chat</div></div>
                      </div>
                      <button onClick={shareWhatsAppNumber} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200"><Smartphone className="w-3.5 h-3.5" /> <span>Share WhatsApp</span></button>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
                      {(!privateChats[activePrivateChatUser.id] || privateChats[activePrivateChatUser.id].messages.length === 0) ? (
                        <div className="text-center text-slate-400 text-sm mt-10">Start the conversation with {activePrivateChatUser.name}.</div>
                      ) : (
                        privateChats[activePrivateChatUser.id].messages.map((msg) => {
                          const isMe = msg.senderId === myUserId;
                          if (msg.isSystem) return (<div key={msg.id} className="flex justify-center my-4"><div className="bg-emerald-100 border border-emerald-200 px-4 py-3 rounded-2xl text-center max-w-[85%] shadow-sm"><p className="text-sm font-semibold text-emerald-900 whitespace-pre-wrap">{msg.text}</p></div></div>);
                          return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                              <div className="flex items-baseline gap-2 mb-1 px-1"><span className="text-[9px] text-slate-400 font-medium">{msg.time}</span></div>
                              <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm shadow-sm leading-relaxed ${isMe ? 'bg-slate-900 text-white rounded-tr-sm font-medium' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'}`}>{msg.text}</div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                      <form onSubmit={handleSendPrivateMessage} className="flex items-center gap-3">
                        <input type="text" placeholder={`Message ${activePrivateChatUser.name}...`} value={composeText} onChange={(e) => setComposeText(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 font-medium transition" />
                        <button type="submit" disabled={!composeText.trim()} className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white p-3.5 rounded-full transition shrink-0 shadow-sm"><Send className="w-5 h-5" /></button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 8: ABOUT US & PARTNERSHIPS */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm border border-amber-100 shrink-0">
                  <Heart className="w-8 h-8 fill-amber-500 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{t.aboutHeading}</h2>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">{t.aboutSub}</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                <h3 className="text-lg font-bold text-slate-900">{t.problemTitle}</h3>
                <p>{t.problemDesc1}</p>
                <p>{t.problemDesc2}</p>

                <h3 className="text-lg font-bold text-slate-900 pt-4">{t.monetizationTitle}</h3>
                <p>{t.monetizationDesc1}</p>
                <p>{t.monetizationDesc2}</p>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 space-y-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-600" /><span>{t.contactTitle}</span>
                  </h4>
                  <p className="text-sm text-slate-600">{t.contactDesc}</p>
                  <p className="text-sm font-semibold text-indigo-700">{t.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODALS                                                         */}
      {/* ============================================================== */}
      
      {/* 1. NEW CUSTOM FLASHCARD MODAL */}
      {showNewCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"><Sparkles className="w-5 h-5" /></div>
                <h3 className="font-bold text-lg text-slate-900">{t.addNewCardBtn}</h3>
              </div>
              <button onClick={() => setShowNewCardModal(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">{t.templateLabel}</span>
              <div className="flex flex-wrap gap-2">
                {FLASHCARD_TEMPLATES.map((tmpl, idx) => (
                  <button key={idx} type="button" onClick={() => applyTemplate(tmpl)} className="text-[11px] bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-semibold text-slate-600 transition shadow-sm">{tmpl.title}</button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddCustomCard} className="space-y-5 pt-2">
              <div><label className="text-sm font-semibold text-slate-700 block mb-1.5">Category</label><input type="text" required value={newCardForm.category} onChange={(e) => setNewCardForm({ ...newCardForm, category: e.target.value })} className="w-full text-sm p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition" /></div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Your Question (Type in English or Mother Tongue)</label>
                  <button
                    type="button"
                    onClick={() => handleAutoTranslate()}
                    disabled={isTranslating || !newCardForm.userText.trim()}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-200 transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isTranslating ? 'Translating...' : `🪄 Auto-Translate to ${currentCountry.officialLang.split(' ')[0]}`}</span>
                  </button>
                </div>
                <textarea rows={2} required placeholder="e.g. Could I please have a glass of warm water?" value={newCardForm.userText} onChange={(e) => setNewCardForm({ ...newCardForm, userText: e.target.value })} onBlur={() => { if (newCardForm.userText.trim() && !newCardForm.localText.trim()) handleAutoTranslate(); }} className="w-full text-sm p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition resize-none" />
              </div>
              <div><label className="text-sm font-semibold text-slate-700 block mb-1.5">Local Translation ({currentCountry.officialLang})</label><textarea rows={2} required placeholder="e.g. Könnte ich bitte ein Glas warmes Wasser bekommen?" value={newCardForm.localText} onChange={(e) => setNewCardForm({ ...newCardForm, localText: e.target.value })} className="w-full text-sm p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition resize-none font-medium" /></div>
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Options for Local to Tap:</label>
                <input type="text" placeholder="Option 1" value={newCardForm.opt1} onChange={(e) => setNewCardForm({ ...newCardForm, opt1: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-300" />
                <input type="text" placeholder="Option 2" value={newCardForm.opt2} onChange={(e) => setNewCardForm({ ...newCardForm, opt2: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-300" />
                <input type="text" placeholder="Option 3" value={newCardForm.opt3} onChange={(e) => setNewCardForm({ ...newCardForm, opt3: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-300" />
              </div>
              <div className="pt-2"><button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 rounded-2xl text-sm shadow-sm transition active:scale-95">Save to Flashcards</button></div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EMERGENCY CARD MODAL */}
      {showEmergencyCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full border-4 border-rose-500 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] overflow-y-auto relative">
            <div className="bg-rose-500 text-white p-5 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><Phone className="w-6 h-6 animate-pulse" /></div>
                <span className="font-bold text-lg uppercase tracking-wide">{currentCountry.lostCardText.heading}</span>
              </div>
              <button onClick={() => setShowEmergencyCard(false)} className="bg-black/10 hover:bg-black/20 text-white rounded-full p-2 transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 border-2 border-rose-100 p-5 rounded-2xl text-slate-900 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400"></div>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block pl-2">SHOW THIS TO A LOCAL OR POLICE:</span>
                <p className="text-lg sm:text-xl font-medium leading-relaxed pl-2">"{currentCountry.lostCardText.body}"</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">{currentCountry.lostCardText.callPrompt}</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" value={familyPhone} onChange={(e) => setFamilyPhone(e.target.value)} className="flex-1 text-base font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-slate-400 transition" />
                    <a href={`tel:${familyPhone}`} className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 flex-shrink-0 shadow-sm transition"><Phone className="w-4 h-4" /><span>{t.callFamilyBtn}</span></a>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.homeAddressLabel}</span>
                  <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="w-full text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-slate-400 transition" />
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(homeAddress)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"><span>{t.navigateHome}</span><ExternalLink className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a href={`tel:${currentCountry.emergencyPhone}`} className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition"><ShieldAlert className="w-5 h-5" /><span>Dial {currentCountry.emergencyPhone} (Police)</span></a>
                <a href={`tel:${currentCountry.medicalOnCall}`} className="bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition"><Stethoscope className="w-5 h-5 opacity-80" /><span>Dial {currentCountry.medicalOnCall} (Doctor)</span></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. LANGUAGE SELECTOR MODAL */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200"><Globe className="w-5 h-5 text-slate-600" /></div>
                <h3 className="font-bold text-lg text-slate-900">{t.selectLangTitle}</h3>
              </div>
              <button onClick={() => setShowLangModal(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INDIAN_LANGUAGES.map((lang) => (
                <button key={lang.code} onClick={() => { setSelectedLang(lang.code); setShowLangModal(false); }} className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${selectedLang === lang.code ? 'border-slate-800 bg-slate-900 text-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'}`}>
                  <div><span className="block text-sm font-bold">{lang.name}</span><span className={`text-[10px] mt-0.5 block ${selectedLang === lang.code ? 'text-slate-300' : 'text-slate-400'}`}>{lang.label}</span></div>
                  {selectedLang === lang.code && <Check className="w-4 h-4 text-amber-300" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FOOTER                                                         */}
      {/* ============================================================== */}
      <footer className="mt-12 bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-300 font-medium">
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-amber-400/80"/> {t.appName}</span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>{t.editionTag}</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed opacity-70">
            Built for Indian expatriates, young families, and visiting elderly parents settling across Europe.
          </p>
        </div>
      </footer>

    </div>
  );
}