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
    selectLangTitle: 'अपनी मातृभाषा चुनें',
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
      about: '८. हमारे बारे में'
    },
    aboutHeading: 'प्रवासी सारथी के बारे में',
    aboutSub: 'भारतीय डेवलपर्स द्वारा, यूरोप में भारतीय परिवारों के लिए निर्मित',
    problemTitle: 'हम किस समस्या का समाधान कर रहे हैं?',
    problemDesc1: 'यूरोप (जर्मनी, नीदरलैंड, फ्रांस, आयरलैंड आदि) जाना कई भारतीय पेशेवरों और उनके परिवारों का सपना होता है। हालांकि, पहले कुछ महीने भारी प्रशासनिक उलझनों से भरे होते हैं।',
    problemDesc2: 'प्रवासी सारथी इस सटीक समस्या को एक विश्वसनीय डिजिटल साथी के रूप में हल करने के लिए बनाया गया है।',
    monetizationTitle: 'हम ऐप को मुफ्त और टिकाऊ कैसे रखते हैं?',
    monetizationDesc1: 'हमारा मानना है कि माता-पिता और नए लोगों के लिए आवश्यक निपटान और आपातकालीन उपकरण हमेशा 100% मुफ्त होने चाहिए।',
    contactTitle: 'साझेदारी और सहयोग',
    contactDesc: 'पार्टनरशिप के लिए संपर्क करें:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'पहले ३० दिन की कानूनी प्रक्रिया',
    roadmapSub: 'सभी कार्य क्रमवार पूरे करें। पता पंजीकरण के बिना कोई टैक्स या बैंक खाता नहीं बनेगा।',
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
    substitutesTitle: 'यूरोपीय सुपरमार्केट में देसी विकल्प',
    substitutesSub: 'अगर पास में कोई भारतीय दुकान न हो, तो आम सुपरमार्केट से ये खरीदें:',
    safeAlternative: 'सुरक्षित विकल्प',
    restaurantsTitle: 'भारतीय रेस्टोरेंट व किराना स्टोर',
    communityTitle: 'भारतीय परिवार, मंदिर व गुरुद्वारे',
    homeAddressLabel: 'घर का पता:',
    callFamilyBtn: 'कॉल करें',
    navigateHome: '📍 गूगल मैप्स पर घर का रास्ता',
    openGoogleMaps: '📍 गूगल मैप्स पर खोलें',
    openPortal: '🌐 आधिकारिक पोर्टल खोलें',
    officeSectionTitle: 'प्रमुख सरकारी कार्यालय और अपॉइंटमेंट गाइड्स',
    liveMedicalLocator: 'लाइव मेडिकल लोकेटर',
    gpsMedicalDesc: 'निकटतम आपातकालीन कक्ष, बाल रोग विशेषज्ञ और 24/7 फार्मेसी खोजने के लिए GPS का उपयोग करें।',
    hospitalBtn: 'अस्पताल / ER',
    pediatricianBtn: 'बाल रोग विशेषज्ञ',
    pharmacyBtn: 'फार्मेसी',
    clinicBtn: 'क्लिनिक / GP',
    nightPharmacyTitle: 'नाइट फार्मेसी (Notdienst)',
    nightPharmacyDesc: 'फार्मेसियों में 24 घंटे की नाइट ड्यूटी होती है। जरूरी सिरप के लिए नाइट बेल बजाएं।',
    findOpenPharmacy: 'खुली फार्मेसी खोजें',
    babyCareTitle: 'बेबी केयर (dm / Rossmann)',
    babyCareDesc: 'फॉर्मूला मिल्क: Aptamil, HiPP Bio Combiotik। डायपर स्टॉक में रखें।',
    locateNearestStore: 'निकटतम स्टोर ढूंढें',
    liveLocationSearch: 'लाइव लोकेशन सर्च',
    gpsGroceryDesc: 'निकटतम भारतीय किराना और टिफिन सेवाओं को खोजने के लिए GPS का उपयोग करें।',
    groceriesBtn: 'किराना',
    restaurantsBtn: 'रेस्टोरेंट',
    tiffinBtn: 'टिफिन सेंटर',
    buyOnShelf: 'शेल्फ पर यह खरीदें:',
    liveCommunityLocator: 'लाइव कम्युनिटी लोकेटर',
    gpsCommunityDesc: 'GPS का उपयोग करके निकटतम धार्मिक केंद्र और भारतीय संघ खोजें।',
    temple: 'मंदिर',
    mosque: 'मस्जिद',
    gurudwara: 'गुरुद्वारा',
    church: 'चर्च',
    associations: 'एसोसिएशन',
    publicBoard: 'पब्लिक बोर्ड',
    myInbox: 'मेरा इनबॉक्स',
    enterPublicBoard: 'पब्लिक बोर्ड में प्रवेश करें',
    noPublicPosts: 'अभी तक कोई पब्लिक पोस्ट नहीं है। पहला प्रश्न पूछें!',
    yourPost: 'आपकी पोस्ट',
    messagePrivately: 'प्राइवेट मैसेज करें',
    postToBoard: 'बोर्ड पर पोस्ट करें',
    myPrivateMessages: 'मेरे प्राइवेट मैसेज',
    emptyInbox: 'आपका इनबॉक्स खाली है। पब्लिक बोर्ड से किसी को मैसेज करें।',
    privateChatHeading: 'प्राइवेट 1-ऑन-1 चैट',
    shareWhatsapp: 'व्हाट्सएप शेयर करें',
    composePlaceholder: 'पब्लिक बोर्ड पर प्रश्न पूछें या सलाह साझा करें...',
    displayNamePlaceholder: 'डिस्प्ले नाम चुनें (उदा. राहुल एम.)'
  },
  ta: {
    appName: 'பிரவாசி சாரதி',
    editionTag: 'குடும்ப & மூத்த குடிமக்கள் தோழன்',
    tagline: 'ஐரோப்பாவில் உள்ள இந்திய குடும்பங்கள் மற்றும் பெற்றோர்களுக்கான நம்பகமான வழிகாட்டி',
    lostHelpBtn: '🚨 வழி தவறிவிட்டதா? (உதவி)',
    selectLangTitle: 'உங்கள் தாய்மொழியைத் தேர்ந்தெடுக்கவும்',
    policeAmbulance: 'காவல்துறை / அவசர ஊர்தி:',
    nonEmergencyDoc: 'மருத்துவர் ஆன்-கால்:',
    currencyCalc: 'நாணய மாற்றி (ரூபாய் ↔ யூரோ)',
    tabs: {
      journey: '1. முதல் 30 நாட்கள் (திட்டம்)',
      offices: '2. அரசு அலுவலகங்கள் & வரைபடம்',
      flashcards: '3. திரையைக் காட்டுங்கள் (கார்டுகள்)',
      essentials: '4. மருத்துவமனைகள் & அவசியங்கள்',
      desiRadar: '5. மளிகை & உணவகங்கள்',
      community: '6. குடும்பங்கள் & கோயில்கள்',
      chat: '7. சமூகம் அரட்டை',
      about: '8. எங்களைப் பற்றி'
    },
    aboutHeading: 'பிரவாசி சாரதி பற்றி',
    aboutSub: 'ஐரோப்பாவில் உள்ள இந்திய குடும்பங்களுக்காக இந்திய டெவலப்பர்களால் உருவாக்கப்பட்டது',
    problemTitle: 'நாம் தீர்க்கும் சிக்கல் என்ன?',
    problemDesc1: 'ஐரோப்பாவிற்கு மாறுவது பல இந்தியர்களின் கனவு. இருப்பினும், முதல் சில மாதங்கள் கடினமான நிர்வாக நடைமுறைகளால் நிறைந்திருக்கும்.',
    problemDesc2: 'ஐரோப்பிய அதிகாரத்துவத்தை சமாளிக்க உதவும் ஒரு நம்பகமான டிஜிட்டல் தோழனாக பிரவாசி சாரதி உருவாக்கப்பட்டுள்ளது.',
    monetizationTitle: 'இந்த செயலியை எவ்வாறு இலவசமாக பராமரிக்கிறோம்?',
    monetizationDesc1: 'அவசர மற்றும் அடிப்படை கருவிகள் எப்போதும் 100% இலவசமாக இருக்க வேண்டும்.',
    monetizationDesc2: 'எங்கள் பரிந்துரைக்கப்பட்ட பார்ட்னர் இணைப்புகள் மூலம் நீங்கள் பதிவு செய்யும்போது சிறு கமிஷன் கிடைக்கும்.',
    contactTitle: 'கூட்டாண்மை மற்றும் தொடர்புகள்',
    contactDesc: 'கூட்டாண்மைக்கு எங்களை தொடர்பு கொள்ளவும்:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'முதல் 30 நாட்களுக்கான சட்டப் பட்டியல்',
    roadmapSub: 'முகவரி பதிவு இல்லாமல் வங்கி கணக்கு அல்லது வரி எண் பெற முடியாது.',
    simpleBriefHeading: 'எளிய மொழியில்:',
    actionPlanHeading: 'செயல் திட்டம்:',
    markCompleteBtn: 'முடிந்தது என குறிக்கவும்',
    completedBtn: 'நிறைவு பெற்றது ✓',
    youAreAsking: 'நீங்கள் கேட்பது:',
    showToLocal: 'உள்ளூர் நபரிடம் காட்டவும்:',
    tapToAnswer: '👇 பதிலைத் தேர்ந்தெடுக்கவும்:',
    localAnswered: 'உள்ளூர் நபர் தேர்ந்தெடுத்தது:',
    addNewCardBtn: '➕ புதிய அட்டை உருவாக்கு',
    customCardBadge: 'தனிப்பயன் அட்டை',
    templateLabel: '⚡ வார்ப்புருவைத் தேர்ந்தெடுக்கவும்:',
    substitutesTitle: 'உள்ளூர் சூப்பர் மார்க்கெட்டுகளில் இந்திய பொருட்கள்',
    substitutesSub: 'அருகில் இந்திய கடை இல்லையெனில் இவற்றை வாங்குங்கள்:',
    safeAlternative: 'பாதுகாப்பான மாற்று',
    restaurantsTitle: 'இந்திய உணவகங்கள் & மளிகை கடைகள்',
    communityTitle: 'இந்திய குடும்பங்கள் & கோயில்கள்',
    homeAddressLabel: 'வீட்டு முகவரி:',
    callFamilyBtn: 'இப்போது அழைக்கவும்',
    navigateHome: '📍 கூகுள் மேப்ஸில் வீட்டுக்கு செல்ல',
    openGoogleMaps: '📍 கூகுள் மேப்ஸில் திற',
    openPortal: '🌐 அதிகாரப்பூர்வ போர்ட்டலைத் திற',
    officeSectionTitle: 'அரசு அலுவலகங்கள் மற்றும் வழிகாட்டிகள்',
    liveMedicalLocator: 'நேரலை மருத்துவ கண்டறிதல்',
    gpsMedicalDesc: 'அவசர சிகிச்சை பிரிவுகள் மற்றும் மருந்தகங்களை உடтடியாக கண்டறியவும்.',
    hospitalBtn: 'மருத்துவமனை',
    pediatricianBtn: 'குழந்தைகள் மருத்துவர்',
    pharmacyBtn: 'மருந்தகம்',
    clinicBtn: 'கிளினிக்',
    nightPharmacyTitle: 'இரவு மருந்தகம்',
    nightPharmacyDesc: 'அவசர மருந்துகளுக்கு இரவு மணி பெல்லை அழுத்தவும்.',
    findOpenPharmacy: 'திறந்திருக்கும் மருந்தகத்தைக் காண்க',
    babyCareTitle: 'குழந்தை பராமரிப்பு',
    babyCareDesc: 'ஃபார்முலா பால் மற்றும் டயப்பர்கள்.',
    locateNearestStore: 'அருகிலுள்ள கடையைக் கண்டறியவும்',
    liveLocationSearch: 'நேரலை இருப்பிடத் தேடல்',
    gpsGroceryDesc: 'அருகிலுள்ள இந்திய மளிகை கடைகளைக் கண்டறியவும்.',
    groceriesBtn: 'மளிகை',
    restaurantsBtn: 'உணவகங்கள்',
    tiffinBtn: 'டிபன் சென்டர்கள்',
    buyOnShelf: 'அடுக்கி வைக்கப்பட்டுள்ளவை:',
    liveCommunityLocator: 'சமூக வழிகாட்டி',
    gpsCommunityDesc: 'அருகிலுள்ள வழிபாட்டு தலங்களைக் கண்டறியவும்.',
    temple: 'கோயில்',
    mosque: 'பள்ளிவாசல்',
    gurudwara: 'குருத்துவாரா',
    church: 'தேவாலயம்',
    associations: 'சங்கங்கள்',
    publicBoard: 'பொது பலகை',
    myInbox: 'எனது இன்பாக்ஸ்',
    enterPublicBoard: 'உள்ளநுழைக',
    noPublicPosts: 'பதிவுகள் எதுவும் இல்லை.',
    yourPost: 'உங்கள் பதிவு',
    messagePrivately: 'தனிப்பட்ட முறையில் செய்தி அனுப்பவும்',
    postToBoard: 'பதிவு செய்',
    myPrivateMessages: 'தனிப்பட்ட செய்திகள்',
    emptyInbox: 'இன்பாக்ஸ் காலியாக உள்ளது.',
    privateChatHeading: 'தனிப்பட்ட அரட்டை',
    shareWhatsapp: 'WhatsApp ஐப் பகிரவும்',
    composePlaceholder: 'உங்கள் கேள்வியைப் பதிவிடவும்...',
    displayNamePlaceholder: 'பெயரை உள்ளிடவும்'
  },
  te: {
    appName: 'ప్రవాసి సార్థి',
    editionTag: 'కుటుంబ & సీనియర్ సహచరుడు',
    tagline: 'యూరప్‌లో భారతీయ కుటుంబాలు మరియు తల్లిదండ్రుల కోసం నమ్మకమైన మార్గదర్శి',
    lostHelpBtn: '🚨 దారి తప్పారా? (సహాయం)',
    selectLangTitle: 'మీ మాతృభాషను ఎంచుకోండి',
    policeAmbulance: 'పోలీసు / ఆంబులెన్స్:',
    nonEmergencyDoc: 'డాక్టర్ ఆన్-కాల్:',
    currencyCalc: 'కరెన్సీ కాలిక్యులేటర్ (రూపాయలు ↔ యూరో)',
    tabs: {
      journey: '1. మొదటి 30 రోజులు (రోడ్‌మ్యాప్)',
      offices: '2. ప్రభుత్వ కార్యాలయాలు & మ్యాప్స్',
      flashcards: '3. స్క్రీన్ చూపించండి (కార్డ్స్)',
      essentials: '4. ఆసుపత్రులు & ముఖ్యమైనవి',
      desiRadar: '5. కిరాణా & రెస్టారెంట్లు',
      community: '6. కుటుంబాలు & ఆలయాలు',
      chat: '7. కమ్యూనిటీ చాట్',
      about: '8. మా గురించి'
    },
    aboutHeading: 'ప్రవాసి సార్థి గురించి',
    aboutSub: 'యూరప్‌లోని భారతీయ కుటుంబాల కోసం భారతీయ డెవలపర్ల చేత రూపొందించబడింది',
    problemTitle: 'మేము పరిష్కరిస్తున్న సమస్య ఏమిటి?',
    problemDesc1: 'యూరప్‌కు వెళ్లడం చాలా మంది భారతీయుల కల. అయితే మొదటి కొన్ని నెలలు పరిపాలనాపరమైన ఇబ్బందికరంగా ఉంటాయి.',
    problemDesc2: 'యూరోపియన్ బ్యూరోక్రసీని ఎదుర్కోవడానికి మరియు స్థిరపడటానికి ప్రవాసి సార్థి నమ్మకమైన డిజిటల్ సహచరుడిగా సహాయపడుతుంది.',
    monetizationTitle: 'యాప్‌ను ఉచితంగా ఎలా నిర్వహిస్తాము?',
    monetizationDesc1: 'అత్యవసర మరియు సెటిల్‌మెంట్ టూల్స్ ఎల్లప్పుడూ 100% ఉచితం.',
    monetizationDesc2: 'మా భాగస్వామ్య లింక్‌ల ద్వారా మీరు సైన్ అప్ చేసినప్పుడు మాకు చిన్న కమిషన్ లభిస్తుంది.',
    contactTitle: 'భాగస్వామ్యం కోసం సంప్రదించండి',
    contactDesc: 'మా భాగస్వామ్య బృందాన్ని సంప్రదించండి:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'మొదటి 30 రోజుల చట్టపరమైన జాబితా',
    roadmapSub: 'చిరునామా నమోదు లేకుండా బ్యాంకు ఖాతా లేదా ట్యాక్స్ నంబర్ రాదు.',
    simpleBriefHeading: 'సరళమైన భాషలో:',
    actionPlanHeading: 'చర్య ప్రణాళిక:',
    markCompleteBtn: 'పూర్తయినట్లు గుర్తించండి',
    completedBtn: 'పూర్తయింది ✓',
    youAreAsking: 'మీరు అడుగుతున్నది:',
    showToLocal: 'స్థానిక వ్యక్తికి చూపించండి:',
    tapToAnswer: '👇 సమాధానాన్ని ఎంచుకోండి:',
    localAnswered: 'స్థానిక వ్యక్తి ఎంచుకున్న సమాధానం:',
    addNewCardBtn: '➕ కొత్త కార్డ్ సృష్టించండి',
    customCardBadge: 'కస్టమ్ కార్డ్',
    templateLabel: '⚡ టెంప్లేట్‌ని ఎంచుకోండి:',
    substitutesTitle: 'స్థానిక సూపర్ మార్కెట్లలో భారతీయ వస్తువులు',
    substitutesSub: 'అగ్గర్ భారతీయ దుకాణం అందుబాటులో లేకపోతే వీటిని కొనండి:',
    safeAlternative: 'సురక్షితమైన ప్రత్యామ్నాయం',
    restaurantsTitle: 'భారతీయ రెస్టారెంట్లు & కిరాణా దుకాణాలు',
    communityTitle: 'భారతీయ కుటుంబాలు & గురుద్వారాలు',
    homeAddressLabel: 'ఇంటి చిరునామా:',
    callFamilyBtn: 'ఇప్పుడే కాల్ చేయండి',
    navigateHome: '📍 గూగుల్ మ్యాప్స్‌లో ఇంటికి మార్గం',
    openGoogleMaps: '📍 గూగుల్ మ్యాప్స్‌లో తెరవండి',
    openPortal: '🌐 అధికారిక పోర్టల్‌ని తెరవండి',
    officeSectionTitle: 'ప్రభుత్వ కార్యాలయాలు మరియు గైడ్‌లు',
    liveMedicalLocator: 'లైవ్ మెడికల్ లోకేటర్',
    gpsMedicalDesc: 'సమీప ఆసుపత్రులు మరియు ఫార్మసీలను కనుగొనండి.',
    hospitalBtn: 'ఆసుపత్రి',
    pediatricianBtn: 'పిల్లల డాక్టర్',
    pharmacyBtn: 'ఫార్మసీ',
    clinicBtn: 'క్లినిక్',
    nightPharmacyTitle: 'నైట్ ఫార్మసీ',
    nightPharmacyDesc: 'అత్యవసర మందుల కోసం రాత్రి గంటను మోగించండి.',
    findOpenPharmacy: 'ఫార్మసీని కనుగొనండి',
    babyCareTitle: 'బేబీ కేర్',
    babyCareDesc: 'ఫార్ములా మిల్క్ మరియు డైపర్లు.',
    locateNearestStore: 'స్టోర్‌ని కనుగొనండి',
    liveLocationSearch: 'లైవ్ లొకేషన్ సెర్చ్',
    gpsGroceryDesc: 'భారతీయ కిరాణా దుకాణాలను కనుగొనండి.',
    groceriesBtn: 'కిరాణా',
    restaurantsBtn: 'రెస్టారెంట్లు',
    tiffinBtn: 'టిఫిన్ సెంటర్లు',
    buyOnShelf: 'ఇక్కడ కొనుగోలు చేయండి:',
    liveCommunityLocator: 'లైవ్ కమ్యూనిటీ లోకేటర్',
    gpsCommunityDesc: 'సమీప ప్రార్థనా స్థలాలను కనుగొనండి.',
    temple: 'ఆలయం',
    mosque: 'మసీదు',
    gurudwara: 'గురుద్వారా',
    church: 'చర్చి',
    associations: 'అసోసియేషన్లు',
    publicBoard: 'పబ్లిక్ బోర్డ్',
    myInbox: 'నా ఇన్‌బాక్స్',
    enterPublicBoard: 'ప్రవేశించండి',
    noPublicPosts: 'పోస్ట్‌లు లేవు.',
    yourPost: 'మీ పోస్ట్',
    messagePrivately: 'ప్రైవేట్ మెసేజ్',
    postToBoard: 'పోస్ట్ చేయండి',
    myPrivateMessages: 'నా ప్రైవేట్ మెసేజ్‌లు',
    emptyInbox: 'ఇన్‌బాక్స్ ఖాళీగా ఉంది.',
    privateChatHeading: 'ప్రైవేట్ చాట్',
    shareWhatsapp: 'WhatsApp షేర్ చేయండి',
    composePlaceholder: 'ప్రశ్నను అడగండి...',
    displayNamePlaceholder: 'పేరును నమోదు చేయండి'
  },
  bn: {
    appName: 'প্রবাসী সারথি',
    editionTag: 'পরিবার ও প্রবীণ সহচর',
    tagline: 'ইউরোপে ভারতীয় পরিবার এবং বাবা-মায়ের জন্য বিশ্বস্ত নির্দেশিকা',
    lostHelpBtn: '🚨 রাস্তা হারিয়েছেন? (সাহায্য)',
    selectLangTitle: 'আপনার মাতৃভাষা নির্বাচন করুন',
    policeAmbulance: 'পুলিশ / অ্যাম্বুলেন্স:',
    nonEmergencyDoc: 'ডাক্তার অন-কল:',
    currencyCalc: 'কারেন্সি ক্যালকুলেটর (টাকা ↔ ইউরো)',
    tabs: {
      journey: '১. প্রথম ৩০ দিন (রোডম্যাপ)',
      offices: '২. সরকারি অফিস ও মানচিত্র',
      flashcards: '৩. স্ক্রিন দেখান (কার্ড)',
      essentials: '৪. হাসপাতাল ও জরুরি পরিষেবা',
      desiRadar: '৫. গ্রোসারী ও রেস্তোরাঁ',
      community: '৬. পরিবার ও মন্দির',
      chat: '৭. কমিউনিটি চ্যাট',
      about: '৮. আমাদের সম্পর্কে'
    },
    aboutHeading: 'প্রবাসী সারথি সম্পর্কে',
    aboutSub: 'ইউরোপে ভারতীয় পরিবারগুলির জন্য ভারতীয় ডেভেলপারদের দ্বারা নির্মিত',
    problemTitle: 'আমরা কোন সমস্যার সমাধান করছি?',
    problemDesc1: 'ইউরোপে যাওয়া অনেক ভারতীয়র স্বপ্ন। তবে প্রথম কয়েক মাস বেশ জটিল হয়ে থাকে।',
    problemDesc2: 'ইউরোপীয় আমলাতন্ত্র এবং দৈনন্দিন সমস্যা সমাধানে প্রবাসী সারথি একটি নির্ভরযোগ্য ডিজিটাল সহচর।',
    monetizationTitle: 'কীভাবে অ্যাপটি বিনামূল্যে রাখা হয়?',
    monetizationDesc1: 'জরুরি এবং প্রয়োজনীয় সরঞ্জামগুলি সর্বদা ১০০% বিনামূল্যে হওয়া উচিত।',
    monetizationDesc2: 'আমাদের অংশীদার লিঙ্কগুলির মাধ্যমে সাইন আপ করার সময় আমরা একটি ছোট কমিশন পেয়ে থাকি।',
    contactTitle: 'অংশীদারিত্ব এবং যোগাযোগ',
    contactDesc: 'আমাদের অংশীদারিত্ব দলের সাথে যোগাযোগ করুন:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'প্রথম ৩০ দিনের আইনি চেকলিস্ট',
    roadmapSub: 'ঠিকানা নিবন্ধন ছাড়া কোনো ব্যাংক অ্যাকাউন্ট বা ট্যাক্স নম্বর তৈরি করা যাবে না।',
    simpleBriefHeading: 'সহজ কথায়:',
    actionPlanHeading: 'কর্মপরিকল্পনা:',
    markCompleteBtn: 'সম্পন্ন বলে চিহ্নিত করুন',
    completedBtn: 'সম্পন্ন হয়েছে ✓',
    youAreAsking: 'আপনি যা জিজ্ঞাসা করছেন:',
    showToLocal: 'স্থানীয় ব্যক্তিকে দেখান:',
    tapToAnswer: '👇 উত্তর চয়ন করুন:',
    localAnswered: 'স্থানীয় ব্যক্তি এই উত্তরটি বেছে নিয়েছেন:',
    addNewCardBtn: '➕ নতুন ফ্ল্যাশকার্ড তৈরি করুন',
    customCardBadge: 'কাস্টম কার্ড',
    templateLabel: '⚡ টেমপ্লেট নির্বাচন করুন:',
    substitutesTitle: 'স্থানীয় সুপারমার্কেটে দেশি বিকল্প',
    substitutesSub: 'কাছে ভারতীয় দোকান না থাকলে এগুলো কিনুন:',
    safeAlternative: 'নিরাপদ বিকল্প',
    restaurantsTitle: 'ভারতীয় রেস্তোরাঁ ও মুদি দোকান',
    communityTitle: 'ভারতীয় পরিবার ও মন্দির',
    homeAddressLabel: 'মূল ঠিকানা:',
    callFamilyBtn: 'এখন কল করুন',
    navigateHome: '📍 গুগল ম্যাপে বাড়ির পথ',
    openGoogleMaps: '📍 গুগল ম্যাপে খুলুন',
    openPortal: '🌐 অফিসিয়াল পোর্টাল খুলুন',
    officeSectionTitle: 'সরকারি অফিস এবং গাইড',
    liveMedicalLocator: 'লাইভ মেডিকেল লোকেটর',
    gpsMedicalDesc: 'জরুরি রুম এবং ফার্মেসি খুঁজুন।',
    hospitalBtn: 'হাসপাতাল',
    pediatricianBtn: 'শিশু বিশেষজ্ঞ',
    pharmacyBtn: 'ফার্মেসি',
    clinicBtn: 'ক্লিনিক',
    nightPharmacyTitle: 'নাইট ফার্মেসি',
    nightPharmacyDesc: 'জরুরি ওষুধের জন্য নাইট বেল বাজান।',
    findOpenPharmacy: 'ফার্মেসি খুঁজুন',
    babyCareTitle: 'বেবি কেয়ার',
    babyCareDesc: 'ফর্মুলা মিল্ক এবং ডাইপার।',
    locateNearestStore: 'নিকটতম দোকান খুঁজুন',
    liveLocationSearch: 'লাইভ লোকেশন সার্চ',
    gpsGroceryDesc: 'ভারতীয় মুদি দোকান খুঁজুন।',
    groceriesBtn: 'গ্রোসারী',
    restaurantsBtn: 'রেস্তোরাঁ',
    tiffinBtn: 'টিফিন সেন্টার',
    buyOnShelf: 'এটি কিনুন:',
    liveCommunityLocator: 'কমিউনিটি লোকেটর',
    gpsCommunityDesc: 'নিকটবর্তী উপাসনালয় খুঁজুন।',
    temple: 'মন্দির',
    mosque: 'মসজিদ',
    gurudwara: 'গুরুদ্বারা',
    church: 'চার্চ',
    associations: 'সংস্থা',
    publicBoard: 'পাবলিক বোর্ড',
    myInbox: 'ইনবক্স',
    enterPublicBoard: 'প্রবেশ করুন',
    noPublicPosts: 'কোনো পোস্ট নেই।',
    yourPost: 'আপনার পোস্ট',
    messagePrivately: 'প্রাইভেট মেসেজ',
    postToBoard: 'পোস্ট করুন',
    myPrivateMessages: 'প্রাইভেট মেসেজ',
    emptyInbox: 'ইনবক্স খালি।',
    privateChatHeading: 'প্রাইভেট চ্যাট',
    shareWhatsapp: 'WhatsApp শেয়ার করুন',
    composePlaceholder: 'প্রশ্ন জিজ্ঞাসা করুন...',
    displayNamePlaceholder: 'নাম লিখুন'
  },
  mr: {
    appName: 'प्रवासी सारथी',
    editionTag: 'कुटुंब आणि वरिष्ठ सोबती',
    tagline: 'युरोपमधील भारतीय कुटुंबे आणि पालकांसाठी विश्वासू मार्गदर्शक',
    lostHelpBtn: '🚨 रस्ता चुकलात? (मदत)',
    selectLangTitle: 'तुमची मातृभाषा निवडा',
    policeAmbulance: 'पोलिस / रुग्णवाहिका:',
    nonEmergencyDoc: 'डॉक्टर ऑन-कॉल:',
    currencyCalc: 'चलम गणक (रुपये ↔ युरो)',
    tabs: {
      journey: '१. पहिला महिना (रोडमॅप)',
      offices: '२. सरकारी कार्यालये व नकाशे',
      flashcards: '३. स्क्रीन दाखवा (कार्ड्स)',
      essentials: '४. रुग्णालये व सेवा',
      desiRadar: '५. किराणा व रेस्टॉरंट्स',
      community: '६. कुटुंबे व मंदिरे',
      chat: '७. कम्युनिटी चॅट',
      about: '८. आमच्याबद्दल'
    },
    aboutHeading: 'प्रवासी सारथीबद्दल',
    aboutSub: 'युरोपमधील भारतीय कुटुंबांसाठी भारतीय डेव्हलपर्सद्वारे निर्मित',
    problemTitle: 'आपण कोणत्या समस्येचे निराकरण करत आहोत?',
    problemDesc1: 'युरोपमध्ये जाणे अनेकांचे स्वप्न असते. मात्र पहिले काही महिने कागदपत्रे आणि प्रशासकीय कामांमुळे कठीण जाऊ शकतात.',
    problemDesc2: 'युरोपियन नोकरशाही सोडवण्यासाठी प्रवासी सारथी एक डिजिटल सोबती म्हणून काम करते.',
    monetizationTitle: 'आम्ही हे ॲप विनामूल्य कसे ठेवतो?',
    monetizationDesc1: 'अत्यावश्यक आणि आपत्कालीन साधने नेहमी १००% विनामूल्य असावीत.',
    monetizationDesc2: 'भागीदार लिंक्सद्वारे सेवा वापरताना आम्हाला लहान कमिशन मिळते.',
    contactTitle: 'भागीदारीसाठी संपर्क',
    contactDesc: 'आमच्या भागीदारी टीमशी संपर्क साधा:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'पहिल्या ३० दिवसांची कायदेशीर यादी',
    roadmapSub: 'पत्ता नोंदणीशिवाय बँक खाते किंवा टॅक्स नंबर मिळवता येणार नाही.',
    simpleBriefHeading: 'सोप्या भाषेत:',
    actionPlanHeading: 'कृती आराखडा:',
    markCompleteBtn: 'पूर्ण म्हणून चिन्हांकित करा',
    completedBtn: 'पूर्ण झाले ✓',
    youAreAsking: 'तुम्ही काय विचारत आहात:',
    showToLocal: 'स्थानिक व्यक्तीला दाखवा:',
    tapToAnswer: '👇 उत्तर निवडा:',
    localAnswered: 'स्थानिक व्यक्तीने हे उत्तर निवडले:',
    addNewCardBtn: '➕ नवीन कार्ड तयार करा',
    customCardBadge: 'कस्टम कार्ड',
    templateLabel: '⚡ टेम्पलेट निवडा:',
    substitutesTitle: 'सुपरमार्केटमधील भारतीय पर्याय',
    substitutesSub: 'जवळ भारतीय दुकान नसल्यास हे खरेदी करा:',
    safeAlternative: 'सुरक्षित पर्याय',
    restaurantsTitle: 'भारतीय रेस्टॉरंट्स व किराणा दुकाने',
    communityTitle: 'भारतीय कुटुंबे, मंदिरे व गुरुद्वारे',
    homeAddressLabel: 'घरचा पत्ता:',
    callFamilyBtn: 'कॉल करा',
    navigateHome: '📍 गुगल मॅपवर घराचा मार्ग',
    openGoogleMaps: '📍 गुगल मॅपवर उघडा',
    openPortal: '🌐 अधिकृत पोर्टल उघडा',
    officeSectionTitle: 'सरकारी कार्यालये आणि मार्गदर्शक',
    liveMedicalLocator: 'लाइव्ह मेडिकल लोकेटर',
    gpsMedicalDesc: 'जवळची रुग्णालये आणि औषधालये शोधा.',
    hospitalBtn: 'रुग्णालय',
    pediatricianBtn: 'बालरोगतज्ज्ञ',
    pharmacyBtn: 'औषधालय',
    clinicBtn: 'क्लिनिक',
    nightPharmacyTitle: 'रात्रीचे औषधालय',
    nightPharmacyDesc: 'आपत्कालीन औषधांसाठी बेल वाजवा.',
    findOpenPharmacy: 'औषधालय शोधा',
    babyCareTitle: 'बाळ काळजी',
    babyCareDesc: 'दूध आणि डायपर.',
    locateNearestStore: 'जवळचे दुकान शोधा',
    liveLocationSearch: 'लाइव्ह लोकेशन शोध',
    gpsGroceryDesc: 'भारतीय किराणा दुकाने शोधा.',
    groceriesBtn: 'किराणा',
    restaurantsBtn: 'रेस्टॉरंट्स',
    tiffinBtn: 'टिफिन सेंटर्स',
    buyOnShelf: 'हे खरेदी करा:',
    liveCommunityLocator: 'समुदाय लोकेटर',
    gpsCommunityDesc: 'जवळची प्रार्थनास्थळे शोधा.',
    temple: 'मंदिर',
    mosque: 'मशीद',
    gurudwara: 'गुरुद्वारा',
    church: 'चर्च',
    associations: 'संघटना',
    publicBoard: 'पब्लिक बोर्ड',
    myInbox: 'माझे इनबॉक्स',
    enterPublicBoard: 'प्रवेश करा',
    noPublicPosts: 'कोणत्याही पोस्ट नाहीत.',
    yourPost: 'तुमची पोस्ट',
    messagePrivately: 'खाजगी संदेश',
    postToBoard: 'पोस्ट करा',
    myPrivateMessages: 'खाजगी संदेश',
    emptyInbox: 'इनबॉक्स रिकामे आहे.',
    privateChatHeading: 'खाजगी चॅट',
    shareWhatsapp: 'WhatsApp शेअर करा',
    composePlaceholder: 'प्रश्न विचार करा...',
    displayNamePlaceholder: 'नाव प्रविष्ट करा'
  },
  gu: {
    appName: 'પ્રवासी સારથી',
    editionTag: 'કુટુંબ અને વરિષ્ઠ સાથી',
    tagline: 'યુરોપમાં ભારતીય પરિવારો અને વરિષ્ઠ માતા-પિતા માટે વિશ્વાસુ માર્ગદર્શક',
    lostHelpBtn: '🚨 રસ્તો ભૂલી ગયા? (મદદ)',
    selectLangTitle: 'તમારી માતૃભાષા પસંદ કરો',
    policeAmbulance: 'પોલીસ / એમ્બ્યુલન્સ:',
    nonEmergencyDoc: 'ડૉક્ટર ઓન-કૉલ:',
    currencyCalc: 'કરન્સી કેલ્ક્યુલેટર (રૂપિયા ↔ યુરો)',
    tabs: {
      journey: '૧. પહેલો મહિનો (રોડમેપ)',
      offices: '૨. સરકારી ઓફિસ અને નશા',
      flashcards: '૩. સ્ક્રીન બતાવો (કાર્ડ્સ)',
      essentials: '૪. હોસ્પિટલ અને સેવાઓ',
      desiRadar: '૫. કરિયાણા અને રેસ્ટોરન્ટ',
      community: '૬. પરિવારો અને મંદિરો',
      chat: '૭. કમ્યુનિટી ચેટ',
      about: '૮. અમારા વિશે'
    },
    aboutHeading: 'પ્રवासी સારથી વિશે',
    aboutSub: 'યુરોપમાં ભારતીય પરિવારો માટે ભારતીય ડેવલપર્સ દ્વારા નિર્મિત',
    problemTitle: 'આપણે કઈ સમસ્યાનું નિરાકરણ લાવી રહ્યા છીએ?',
    problemDesc1: 'યુરોપ જવું એ ઘણા ભારતીયોનું સ્વપ્ન છે. જો કે, શરૂઆતના મહિનાઓ મુશ્કેલ હોય છે.',
    problemDesc2: 'યુરોપિયન અમલશાહી સામે લડવા માટે प्रवासी सारथी એક વિશ્વસનીય ડિજિટલ સાથી તરીકે મદદ કરે છે.',
    monetizationTitle: 'આપણી એપ્લિકેશન મફત કેવી રીતે રહે છે?',
    monetizationDesc1: 'આપણા આવશ્યક સાધનો હંમેશા ૧૦૦% મફત છે.',
    monetizationDesc2: 'ભાગીદાર લિંક્સ દ્વારા સાઇન અપ કરવાથી અમને નાનું કમિશન મળે છે.',
    contactTitle: 'ભાગીદારી માટે સંપર્ક',
    contactDesc: 'અમારી પાર્ટનરશિપ ટીમનો સંપર્ક કરો:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'પહેલા ૩૦ દિવસની કાનૂની યાદી',
    roadmapSub: 'સરનામાની નોંધણી વિના બેંક ખાતું કે ટેક્સ નંબર મળશે નહીં.',
    simpleBriefHeading: 'સરળ ભાષામાં:',
    actionPlanHeading: 'કાર્ય યોજના:',
    markCompleteBtn: 'પૂર્ણ તરીકે ચિહ્નિત કરો',
    completedBtn: 'પૂર્ણ થયું ✓',
    youAreAsking: 'તમે શું પૂછી રહ્યા છો:',
    showToLocal: 'સ્થાનિક વ્યક્તિને બતાવો:',
    tapToAnswer: '👇 જવાબ પસંદ કરો:',
    localAnswered: 'સ્થાનિક વ્યક્તિએ આ જવાબ પસંદ કર્યો:',
    addNewCardBtn: '➕ નવું કાર્ડ બનાવો',
    customCardBadge: 'કસ્ટમ કાર્ડ',
    templateLabel: '⚡ ટેમ્પલેટ પસંદ કરો:',
    substitutesTitle: 'સુપરમાર્કેટમાં ભારતીય વિકલ્પો',
    substitutesSub: 'નજીકમાં ભારતીય દુકાન ન હોય તો આ ખરીદો:',
    safeAlternative: 'સુરક્ષિત વિકલ્પ',
    restaurantsTitle: 'ભારતીય રેસ્ટોરન્ટ્સ અને કરિયાણા',
    communityTitle: 'ભારતીય પરિવારો અને મંદિરો',
    homeAddressLabel: 'ઘરનું સરનામું:',
    callFamilyBtn: 'હવે કૉલ કરો',
    navigateHome: '📍 ગૂગલ મેપ પર ઘરનો રસ્તો',
    openGoogleMaps: '📍 ગૂગલ મેપ પર ખોલો',
    openPortal: '🌐 સત્તાવાર પોર્ટલ ખોલો',
    officeSectionTitle: 'સરકારી కార్యాలయాలు మరియు మార్గદર્શికਾ',
    liveMedicalLocator: 'લાઇવ મેડિકલ લોકેટર',
    gpsMedicalDesc: 'નજીકની હોસ્પિટલો અને ફાર્મસી શોધો.',
    hospitalBtn: 'હોસ્પિટલ',
    pediatricianBtn: 'બાળ રોગ નિષ્ણાત',
    pharmacyBtn: 'ફાર્મસી',
    clinicBtn: 'ક્લિનિક',
    nightPharmacyTitle: 'નાઈટ ફાર્મસી',
    nightPharmacyDesc: 'કટોકટીની દવાઓ માટે બેલ વગાડો.',
    findOpenPharmacy: 'ફાર્મસી શોધો',
    babyCareTitle: 'બાળ સંભાળ',
    babyCareDesc: 'દૂધ અને ડાયપર.',
    locateNearestStore: 'નજીકની દુકાન શોધો',
    liveLocationSearch: 'લાઇવ લોકેશન શોધ',
    gpsGroceryDesc: 'ભારતીય કરિયાણાની દુકાનો શોધો.',
    groceriesBtn: 'કરિયાણા',
    restaurantsBtn: 'રેસ્ટોરન્ટ્સ',
    tiffinBtn: 'ટિફિન સેન્ટર્સ',
    buyOnShelf: 'આ ખરીદો:',
    liveCommunityLocator: 'કમ્યુનિટી લોકેટર',
    gpsCommunityDesc: 'નજીકના પૂજા સ્થાનો શોધો.',
    temple: 'મંદિર',
    mosque: 'મસ્જિદ',
    gurudwara: 'ગુરુદ્વારા',
    church: 'ચર્ચ',
    associations: 'એસોસિએશનો',
    publicBoard: 'પબ્લિક બોર્ડ',
    myInbox: 'ઇનબોક્સ',
    enterPublicBoard: 'ప్రవేశించండి',
    noPublicPosts: 'કોઈ પોસ્ટ નથી.',
    yourPost: 'તમારી પોસ્ટ',
    messagePrivately: 'પ્રાઇવેટ મેસેજ',
    postToBoard: 'પોસ્ટ કરો',
    myPrivateMessages: 'પ્રાઇવેટ મેસેજ',
    emptyInbox: 'ઇનબોક્સ ખાલી છે.',
    privateChatHeading: 'પ્રાઇવેટ ચેટ',
    shareWhatsapp: 'WhatsApp શેર કરો',
    composePlaceholder: 'પ્રશ્ન પૂછો...',
    displayNamePlaceholder: 'નામ દાખલ કરો'
  },
  pa: {
    appName: 'ਪ੍ਰਵਾਸੀ ਸਾਰਥੀ',
    editionTag: 'ਪਰਿਵਾਰ ਅਤੇ ਸੀਨੀਅਰ ਸਾਥੀ',
    tagline: 'ਯੂਰਪ ਵਿੱਚ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਅਤੇ ਬਜ਼ੁਰਗ ਮਾਪਿਆਂ ਲਈ ਭਰੋਸੇਯੋਗ ਸਾਥੀ',
    lostHelpBtn: '🚨 ਰਸਤਾ ਭੁੱਲ ਗਏ? (ਮਦਦ)',
    selectLangTitle: 'ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਚੁਣੋ',
    policeAmbulance: 'ਪੁਲਿਸ / ਐਂਬੂਲੈਂਸ:',
    nonEmergencyDoc: 'ਡਾਕਟਰ ਆਨ-ਕਾਲ:',
    currencyCalc: 'ਕਰੰਸੀ ਕੈਲਕੁਲੇਟਰ (ਰੁਪਏ ↔ ਯੂਰੋ)',
    tabs: {
      journey: '੧. ਪਹਿਲਾ ਮਹੀਨਾ (ਰੋਡਮੈਪ)',
      offices: '੨. ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਅਤੇ ਨਕਸ਼ੇ',
      flashcards: '੩. ਸਕ੍ਰੀਨ ਦਿਖਾਓ (ਕਾਰਡ)',
      essentials: '੪. ਹਸਪਤਾਲ ਅਤੇ ਸੇਵਾਵਾਂ',
      desiRadar: '੫. ਕਰਿਆਨਾ ਅਤੇ ਰੈਸਟੋਰੈਂਟ',
      community: '੬. ਪਰਿਵਾਰ ਅਤੇ ਮੰਦਿਰ',
      chat: '੭. ਕਮਿਊਨਿਟੀ ਚੈਟ',
      about: '੮. ਸਾਡੇ ਬਾਰੇ'
    },
    aboutHeading: 'ਪ੍ਰਵਾਸੀ ਸਾਰਥੀ ਬਾਰੇ',
    aboutSub: 'ਭਾਰਤੀ ਡਿਵੈਲਪਰਾਂ ਦੁਆਰਾ, ਯੂਰਪ ਵਿੱਚ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ',
    problemTitle: 'ਅਸੀਂ ਕਿਸ ਸਮੱਸਿਆ ਦਾ ਹੱਲ ਕਰ ਰਹੇ ਹਾਂ?',
    problemDesc1: 'ਯੂਰਪ ਜਾਣਾ ਬਹੁਤ ਸਾਰੇ ਭਾਰਤੀਆਂ ਦਾ ਸੁਪਨਾ ਹੁੰਦਾ ਹੈ। ਹਾਲਾਂਕਿ, ਪਹਿਲੇ ਕੁਝ ਮਹੀਨੇ ਪ੍ਰਸ਼ਾਸਕੀ ਉਲਝਣਾਂ ਨਾਲ ਭਰੇ ਹੁੰਦੇ ਹਨ।',
    problemDesc2: 'ਯੂਰਪੀਅਨ ਨੌਕਰਸ਼ਾਹੀ ਨਾਲ ਨਜਿੱਠਣ ਲਈ ਪ੍ਰਵਾਸੀ ਸਾਰਥੀ ਇੱਕ ਭਰੋਸੇਯੋਗ ਡਿਜੀਟਲ ਸਾਥੀ ਹੈ।',
    monetizationTitle: 'ਅਸੀਂ ਐਪ ਨੂੰ ਮੁਫ਼ਤ ਕਿਵੇਂ ਰੱਖਦੇ ਹਾਂ?',
    monetizationDesc1: 'ਜ਼ਰੂਰੀ ਅਤੇ ਐਮਰਜੈਂਸੀ ਟੂਲ ਹਮੇਸ਼ਾ 100% ਮੁਫ਼ਤ ਹੁੰਦੇ ਹਨ।',
    monetizationDesc2: 'ਸਾਡੇ ਭਾਈਵਾਲ ਲਿੰਕਾਂ ਰਾਹੀਂ ਸਾਈਨ ਅੱਪ ਕਰਨ ‘ਤੇ ਸਾਨੂੰ ਕਮਿਸ਼ਨ ਮਿਲਦਾ ਹੈ।',
    contactTitle: 'ਸਾਂਝੇਦਾਰੀ ਲਈ ਸੰਪਰਕ',
    contactDesc: 'ਸਾਡੀ ਭਾਈਵਾਲੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'ਪਹਿਲੇ 30 ਦਿਨਾਂ ਦੀ ਕਾਨੂੰਨੀ ਸੂਚੀ',
    roadmapSub: 'ਪਤਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤੋਂ ਬਿਨਾਂ ਕੋਈ ਬੈਂਕ ਖਾਤਾ ਜਾਂ ਟੈਕਸ ਨੰਬਰ ਨਹੀਂ ਬਣੇਗਾ।',
    simpleBriefHeading: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ:',
    actionPlanHeading: 'ਐਕਸ਼ਨ ਪਲਾਨ:',
    markCompleteBtn: 'ਪੂਰਾ ਹੋ ਗਿਆ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
    completedBtn: 'ਮੁਕੰਮਲ ✓',
    youAreAsking: 'ਤੁਸੀਂ ਕੀ ਪੁੱਛ ਰਹੇ ਹੋ:',
    showToLocal: 'ਸਥਾਨਕ ਵਿਅਕਤੀ ਨੂੰ ਦਿਖਾਓ:',
    tapToAnswer: '👇 ਜਵਾਬ ਚੁਣੋ:',
    localAnswered: 'ਸਥਾਨਕ ਵਿਅਕਤੀ ਨੇ ਇਹ ਜਵਾਬ ਚੁਣਿਆ:',
    addNewCardBtn: '➕ ਨਵਾਂ ਫਲੈਸ਼ਕਾਰਡ ਬਣਾਓ',
    customCardBadge: 'ਕਸਟਮ ਕਾਰਡ',
    templateLabel: '⚡ ਟೆಂਪਲੇਟ ਚੁਣੋ:',
    substitutesTitle: 'ਸੁਪਰਮਾਰਕੀਟਾਂ ਵਿੱਚ ਦੇਸੀ ਵਿਕਲਪ',
    substitutesSub: 'ਜੇਕਰ ਨੇੜੇ ਕੋਈ ਭਾਰਤੀ ਦੁਕਾਨ ਨਾ ਹੋਵੇ, ਤਾਂ ਇਹ ਖਰੀਦੋ:',
    safeAlternative: 'ਸੁਰੱਖਿਅਤ ਵਿਕਲਪ',
    restaurantsTitle: 'ਭਾਰਤੀ ਰੈਸਟੋਰੈਂਟ ਅਤੇ ਕਰਿਆਨੇ ਦੀਆਂ ਦੁکانਾਂ',
    communityTitle: 'ਭਾਰਤੀ ਪਰਿਵਾਰ ਅਤੇ ਗੁਰਦੁਆਰੇ',
    homeAddressLabel: 'ਘਰ ਦਾ ਪਤਾ:',
    callFamilyBtn: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
    navigateHome: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਘਰ ਦਾ ਰਸਤਾ',
    openGoogleMaps: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਖੋਲ੍ਹੋ',
    openPortal: '🌐 ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
    officeSectionTitle: 'ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਅਤੇ ਗਾਈਡ',
    liveMedicalLocator: 'ਲਾਈਵ ਮੈਡੀਕਲ ਲੋਕੇਟਰ',
    gpsMedicalDesc: 'ਨੇੜਲੇ ਹਸਪਤਾਲ ਅਤੇ ਫਾਰਮਸੀ ਲੱਭੋ।',
    hospitalBtn: 'ਹਸਪਤਾਲ',
    pediatricianBtn: 'ਬਾਲ ਡਾਕਟਰ',
    pharmacyBtn: 'ਫਾਰਮਸੀ',
    clinicBtn: 'ਕਲੀਨਿਕ',
    nightPharmacyTitle: 'ਰਾਤ ਦੀ ਫਾਰਮਸੀ',
    nightPharmacyDesc: 'ਐਮਰਜੈਂਸੀ ਦਵਾਈਆਂ ਲਈ ਘੰਟੀ बजाओ।',
    findOpenPharmacy: 'ਫਾਰਮਸੀ ਲੱਭੋ',
    babyCareTitle: 'ਬੇਬੀ ਕੇਅਰ',
    babyCareDesc: 'ਦੁੱਧ ਅਤੇ ਡਾਇਪਰ।',
    locateNearestStore: 'ਸਟੋਰ ਲੱਭੋ',
    liveLocationSearch: 'ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਖੋਜ',
    gpsGroceryDesc: 'ਭਾਰਤੀ ਕਰਿਆਨੇ ਦੀਆਂ ਦੁکانਾਂ ਲੱਭੋ।',
    groceriesBtn: 'ਕਰਿਆਨਾ',
    restaurantsBtn: 'ਰੈਸਟੋਰੈਂਟ',
    tiffinBtn: 'ਟਿਫਿਨ ਸੈਂਟਰ',
    buyOnShelf: 'ਇਹ ਖਰੀਦੋ:',
    liveCommunityLocator: 'ਕਮਿਊਨਿਟੀ ਲੋਕੇਟਰ',
    gpsCommunityDesc: 'ਨੇੜਲੇ ਧਾਰਮਿਕ ਕੇਂਦਰ ਲੱਭੋ।',
    temple: 'ਮੰਦਿਰ',
    mosque: 'ਮਸਜਿਦ',
    gurudwara: 'ਗੁਰਦੁਆਰਾ',
    church: 'ਚਰਚ',
    associations: 'ਸੰਸਥਾਵਾਂ',
    publicBoard: 'ਪਬਲਿਕ ਬੋਰਡ',
    myInbox: 'ਇਨਬਾਕਸ',
    enterPublicBoard: 'ਦਾਖਲ ਹੋਵੋ',
    noPublicPosts: 'ਕੋਈ ਪੋਸਟ ਨਹੀਂ ਹੈ।',
    yourPost: 'ਤੁਹਾਡੀ ਪੋਸਟ',
    messagePrivately: 'ਨਿੱਜੀ ਸੁਨੇਹਾ',
    postToBoard: 'ਪੋਸਟ ਕਰੋ',
    myPrivateMessages: 'ਨਿੱਜੀ ਸੁਨੇਹੇ',
    emptyInbox: 'ਇਨਬਾਕਸ ਖਾਲੀ ਹੈ।',
    privateChatHeading: 'ਨਿੱਜੀ ਚੈਟ',
    shareWhatsapp: 'WhatsApp ਸਾਂਝਾ ਕਰੋ',
    composePlaceholder: 'ਸਵਾਲ ਪੁੱਛੋ...',
    displayNamePlaceholder: 'ਨਾਮ ਦਰਜ ਕਰੋ'
  },
  kn: {
    appName: 'ಪ್ರವಾಸಿ ಸಾರಥಿ',
    editionTag: 'ಕುಟುಂಬ & ಹಿರಿಯರ ಸಂಗಾತಿ',
    tagline: 'ಯುರೋಪ್‌ನಲ್ಲಿರುವ ಭಾರತೀಯ ಕುಟುಂಬಗಳು ಮತ್ತು ಪೋಷಕರಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಮಾರ್ಗದರ್ಶಿ',
    lostHelpBtn: '🚨 ದಾರಿ ತಪ್ಪಿದೆಯೇ? (ಸಹಾಯ)',
    selectLangTitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    policeAmbulance: 'ಪೊಲೀಸ್ / ಆಂಬುಲೆನ್ಸ್:',
    nonEmergencyDoc: 'ವೈದ್ಯರು ಆನ್-ಕాల్:',
    currencyCalc: 'ಕರೆನ್ಸಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (ರೂಪಾಯಿ ↔ ಯೂರೋ)',
    tabs: {
      journey: '೧. ಮೊದಲ 30 ದಿನಗಳು (ರೋಡ್‌ಮ್ಯಾಪ್)',
      offices: '೨. ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು & ನಕ್ಷೆಗಳು',
      flashcards: '೩. ಪರದೆಯನ್ನು ತೋರಿಸಿ (ಕಾರ್ಡ್‌ಗಳು)',
      essentials: '೪. ಆಸ್ಪತ್ರೆಗಳು & ಅಗತ್ಯತೆಗಳು',
      desiRadar: '೫. ಕಿರಾಣಿ & ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
      community: '೬. ಕುಟುಂಬಗಳು & ದೇವಾಲಯಗಳು',
      chat: '೭. ಕಮ್ಯೂನಿಟಿ ಚಾಟ್',
      about: '೮. ನಮ್ಮ ಬಗ್ಗೆ'
    },
    aboutHeading: 'ಪ್ರವಾಸಿ ಸಾರಥಿ ಬಗ್ಗೆ',
    aboutSub: 'ಯುರೋಪ್‌ನಲ್ಲಿರುವ ಭಾರತೀಯ ಕುಟುಂಬಗಳಿಗಾಗಿ ಭಾರತೀಯ ಡೆವಲಪರ್‌ಗಳಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ',
    problemTitle: 'ನಾವು ಯಾವ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸುತ್ತಿದ್ದೇವೆ?',
    problemDesc1: 'ಯುರೋಪ್‌ಗೆ ತೆರಳುವುದು ಅನೇಕ ಭಾರತೀಯರ ಕನಸು. ಆದಾಗ್ಯೂ, ಮೊದಲ ಕೆಲವು ತಿಂಗಳುಗಳು ಆಡಳಿತಾತ್ಮಕ ತೊಡಕುಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ.',
    problemDesc2: 'ಯುರೋಪಿಯನ್ ಅಧಿಕಾರಶಾಹಿಯನ್ನು ಎದುರಿಸಲು ಪ್ರವಾಸಿ ಸಾರಥಿ ವಿಶ್ವಾಸಾರ್ಹ ಡಿಜಿಟಲ್ ಸಂಗಾತಿಯಾಗಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    monetizationTitle: 'ನಾವು ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಉಚಿತವಾಗಿ ಹೇಗೆ ಇಟ್ಟುಕೊಳ್ಳುತ್ತೇವೆ?',
    monetizationDesc1: 'ಅಗತ್ಯವಿರುವ ಸೆಟಲ್ಮೆಂಟ್ ಮತ್ತು ತುರ್ತು ಉಪಕರಣಗಳು ಯಾವಾಗಲೂ 100% ಉಚಿತ.',
    monetizationDesc2: 'ಪಾಲುದಾರ ಲಿಂಕ್‌ಗಳ ಮೂಲಕ ನೀವು ಸೈನ್ ಅಪ್ ಮಾಡಿದಾಗ ನಮಗೆ ಸಣ್ಣ ಕಮಿಷನ್ ಸಿಗುತ್ತದೆ.',
    contactTitle: 'ಪಾಲುದಾರಿಕೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ',
    contactDesc: 'ನಮ್ಮ ಪಾಲುದಾರಿಕೆ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'ಮೊದಲ 30 ದಿನಗಳ ಕಾನೂನು ಪರಿಶೀಲನಾಪಟ್ಟಿ',
    roadmapSub: 'ವಿಳಾಸ ನೋಂದಣಿ ಇಲ್ಲದೆ ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ ತೆರಿಗೆ ಸಂಖ್ಯೆ ಸಿಗುವುದಿಲ್ಲ.',
    simpleBriefHeading: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ:',
    actionPlanHeading: 'ಕ್ರಿಯಾ ಯೋಜನೆ:',
    markCompleteBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    completedBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ✓',
    youAreAsking: 'ನೀವು ಕೇಳುತ್ತಿರುವುದು:',
    showToLocal: 'ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿಗೆ ತೋರಿಸಿ:',
    tapToAnswer: '👇 ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    localAnswered: 'ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿ ಈ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಾರೆ:',
    addNewCardBtn: '➕ ಹೊಸ ಕಾರ್ಡ್ ರಚಿಸಿ',
    customCardBadge: 'ಕಸ್ಟಮ್ ಕಾರ್ಡ್',
    templateLabel: '⚡ ಟೆಂಪ್ಲೇಟ್ ಆಯ್ಕೆಮಾಡಿ:',
    substitutesTitle: 'ಸ್ಥಳೀಯ ಸೂಪರ್‌ಮಾರ್ಕೆಟ್‌ಗಳಲ್ಲಿ ಭಾರತೀಯ ಪರ್ಯಾಯಗಳು',
    substitutesSub: 'ಹತ್ತಿರದಲ್ಲಿ ಭಾರತೀಯ ಅಂಗಡಿ ಇಲ್ಲದಿದ್ದರೆ ಇವುಗಳನ್ನು ಖರೀದಿಸಿ:',
    safeAlternative: 'ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ',
    restaurantsTitle: 'ಭಾರತೀಯ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು & ಕಿರಾಣಿ ಅಂಗಡಿಗಳು',
    communityTitle: 'ಭಾರತೀಯ ಕುಟುಂಬಗಳು & ದೇವಾಲಯಗಳು',
    homeAddressLabel: 'ಮನೆ ವಿಳಾಸ:',
    callFamilyBtn: 'ಈಗ ಕರೆ ಮಾಡಿ',
    navigateHome: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಮನೆಗೆ ದಾರಿ',
    openGoogleMaps: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    openPortal: '🌐 ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    officeSectionTitle: 'ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿಗಳು',
    liveMedicalLocator: 'ಲೈವ್ ಮೆಡಿಕಲ್ ಲೊಕೇಟರ್',
    gpsMedicalDesc: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ.',
    hospitalBtn: 'ಆಸ್ಪತ್ರೆ',
    pediatricianBtn: 'ಮಕ್ಕಳ ವೈದ್ಯರು',
    pharmacyBtn: 'ಔಷಧ ಅಂಗಡಿ',
    clinicBtn: 'ಕ್ಲಿನಿಕ್',
    nightPharmacyTitle: 'ರಾತ್ರಿ ಔಷಧ ಅಂಗಡಿ',
    nightPharmacyDesc: 'ತುರ್ತು ಔಷಧಿಗಳಿಗಾಗಿ ಬೆಲ್ ಒತ್ತಿ.',
    findOpenPharmacy: 'ಔಷಧ ಅಂಗಡಿ ಹುಡುಕಿ',
    babyCareTitle: 'ಮಕ್ಕಳ ಆರೈಕೆ',
    babyCareDesc: 'ಹಾಲು ಮತ್ತು ಡೈಪರ್‌ಗಳು.',
    locateNearestStore: 'ಅಂಗಡಿ ಹುಡುಕಿ',
    liveLocationSearch: 'ಲೈವ್ ಸ್ಥಳ ಹುಡುಕಾಟ',
    gpsGroceryDesc: 'ಭಾರತೀಯ ಕಿರಾಣಿ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ.',
    groceriesBtn: 'ಕಿರಾಣಿ',
    restaurantsBtn: 'ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
    tiffinBtn: 'ಟಿಫಿನ್ ಸೆಂಟರ್‌ಗಳು',
    buyOnShelf: 'ಇದನ್ನು ಖರೀದಿಸಿ:',
    liveCommunityLocator: 'ಸಮುದಾಯ ಲೊಕೇಟರ್',
    gpsCommunityDesc: 'ಹತ್ತಿರದ ಪ್ರಾರ್ಥನಾ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ.',
    temple: 'ದೇವಾಲಯ',
    mosque: 'ಮಸೀದಿ',
    gurudwara: 'ಗುರುದ್ವಾರ',
    church: 'ಚರ್ಚ್',
    associations: 'ಸಂಘಗಳು',
    publicBoard: 'ಸಾರ್ವಜನಿಕ ಬೋರ್ಡ್',
    myInbox: 'ಇನ್‌ಬಾಕ್ಸ್',
    enterPublicBoard: 'ಪ್ರವೇಶಿಸಿ',
    noPublicPosts: 'ಯಾವುದೇ ಪೋಸ್ಟ್‌ಗಳಿಲ್ಲ.',
    yourPost: 'ನಿಮ್ಮ ಪೋಸ್ಟ್',
    messagePrivately: 'ಖಾಸಗಿ ಸಂದೇಶ',
    postToBoard: 'ಪೋಸ್ಟ್ ಮಾಡಿ',
    myPrivateMessages: 'ಖಾಸಗಿ ಸಂದೇಶಗಳು',
    emptyInbox: 'ಇನ್‌ಬಾಕ್ಸ್ ಖಾಲಿಯಿದೆ.',
    privateChatHeading: 'ಖಾಸಗಿ ಚಾಟ್',
    shareWhatsapp: 'WhatsApp ಹಂಚಿಕೊಳ್ಳಿ',
    composePlaceholder: 'ಪ್ರಶ್ನೆ ಕೇಳಿ...',
    displayNamePlaceholder: 'ಹೆಸರನ್ನು ನಮूदಿಸಿ'
  },
  ml: {
    appName: 'പ്രവാസി സാരഥി',
    editionTag: 'കുടുംബ & മുതിർന്നവരുടെ കൂട്ടുകാരൻ',
    tagline: 'യൂറോപ്പിലെ ഇന്ത്യൻ കുടുംബങ്ങൾക്കും മാതാപിതാക്കൾക്കും വിശ്വസ്ത ഗൈഡ്',
    lostHelpBtn: '🚨 വഴി തെറ്റിയോ? (സഹായം)',
    selectLangTitle: 'നിങ്ങളുടെ മാതൃഭാഷ തിരഞ്ഞെടുക്കുക',
    policeAmbulance: 'പോലീസ് / ആംബുലൻസ്:',
    nonEmergencyDoc: 'ഡോക്ടർ ഓൺ-കോൾ:',
    currencyCalc: 'കറൻസി കാൽക്കുലേറ്റർ (രൂപ ↔ യൂറോ)',
    tabs: {
      journey: '1. ആദ്യ 30 ദിവസങ്ങൾ (റോഡ്‌മാപ്പ്)',
      offices: '2. സർക്കാർ ഓഫീസുകൾ & മാപ്പുകൾ',
      flashcards: '3. സ്ക്രീൻ കാണിക്കുക (കാർഡുകൾ)',
      essentials: '4. ആശുപത്രികളും സേവനങ്ങളും',
      desiRadar: '5. പലചരക്ക് & റെസ്റ്റോറന്റുകൾ',
      community: '6. കുടുംബങ്ങൾ & ക്ഷേത്രങ്ങൾ',
      chat: '7. കമ്മ്യൂണിറ്റി ചാറ്റ്',
      about: '8. ഞങ്ങളെക്കുറിച്ച്'
    },
    aboutHeading: 'പ്രവാസി സാരഥിയെക്കുറിച്ച്',
    aboutSub: 'യൂറോപ്പിലെ ഇന്ത്യൻ കുടുംബങ്ങൾക്കായി ഇന്ത്യൻ ഡെവലപ്പർമാർ നിർമ്മിച്ചത്',
    problemTitle: 'ഞങ്ങൾ പരിഹരിക്കുന്ന പ്രശ്നം എന്താണ്?',
    problemDesc1: 'യൂറോപ്പിലേക്ക് പോകുന്നത് നിരവധി ഇന്ത്യക്കാരുടെ സ്വപ്നമാണ്. എങ്കിലും ആദ്യ മാസങ്ങളിൽ ഭാഷാ തടസ്സങ്ങളും രേഖകളും ആശങ്ക സൃഷ്ടിക്കാറുണ്ട്.',
    problemDesc2: 'യൂറോപ്യൻ ബ്യൂറോക്രസിയെ നേരിടാൻ പ്രവാസി സാരഥി ഒരു വിശ്വസ്ത ഡിജിറ്റൽ കൂട്ടുകാരനായി സഹായിക്കുന്നു.',
    monetizationTitle: 'ഞങ്ങൾ ആപ്പ് എങ്ങനെ സൗജന്യമായി നിലനിർത്തുന്നു?',
    monetizationDesc1: 'അത്യാവശ്യമായ സെറ്റിൽമെന്റ് ടൂളുകൾ എപ്പോഴും 100% സൗജന്യമാണ്.',
    monetizationDesc2: 'പങ്കാളി ലിങ്കുകൾ വഴി സൈൻ അപ്പ് ചെയ്യുമ്പോൾ ചെറിയ കമ്മീഷൻ ലഭിക്കുന്നു.',
    contactTitle: 'പങ്കാളിത്ത അന്വേഷണങ്ങൾ',
    contactDesc: 'ഞങ്ങളുടെ പങ്കാളിത്ത ടീമുമായി ബന്ധപ്പെടുക:',
    contactEmail: '📧 1122ankitverma@gmail.com',
    roadmapHeading: 'ആദ്യ 30 ദിവസത്തെ നിയമപരമായ ചെക്ക്‌ലിസ്റ്റ്',
    roadmapSub: 'വിലാസ രജിസ്‌ടേഷൻ ഇല്ലാതെ ബാങ്ക് അക്കൗണ്ടോ ടാക്സ് നമ്പറോ ലഭിക്കില്ല.',
    simpleBriefHeading: 'ലളിതമായ ഭാഷയിൽ:',
    actionPlanHeading: 'കർമ്മപദ്ധതി:',
    markCompleteBtn: 'പൂർത്തിയായി എന്ന് അടയാളപ്പെടുത്തുക',
    completedBtn: 'പൂർത്തിയായി ✓',
    youAreAsking: 'നിങ്ങൾ ചോദിക്കുന്നത്:',
    showToLocal: 'പ്രാദേശിക വ്യക്തിക്ക് കാണിക്കുക:',
    tapToAnswer: '👇 മറുപടി തിരഞ്ഞെടുക്കുക:',
    localAnswered: 'പ്രാദേശിക വ്യക്തി ഈ ഉത്തരം തിരഞ്ഞെടുത്തിരിക്കുന്നു:',
    addNewCardBtn: '➕ പുതിയ കാർഡ് നിർമ്മിക്കുക',
    customCardBadge: 'കസ്റ്റം കാർഡ്',
    templateLabel: '⚡ ടെംപ്ലേറ്റ് തിരഞ്ഞെടുക്കുക:',
    substitutesTitle: 'സൂപ്പർമാർക്കറ്റുകളിലെ ഇന്ത്യൻ പകരക്കാർ',
    substitutesSub: 'അടുത്ത് ഇന്ത്യൻ കട ഇല്ലെങ്കിൽ ഇവ വാങ്ങുക:',
    safeAlternative: 'സുരക്ഷിതമായ പകരക്കാരൻ',
    restaurantsTitle: 'ഇന്ത്യൻ റെസ്റ്റോറന്റുകൾ & പലചരക്ക് കടകൾ',
    communityTitle: 'ഇന്ത്യൻ കുടുംബങ്ങൾ & ആരാധനാലയങ്ങൾ',
    homeAddressLabel: 'വീട്ടു വിലാസം:',
    callFamilyBtn: 'ഇപ്പോൾ വിളിക്കുക',
    navigateHome: '📍 ഗൂഗിൾ മാപ്പിൽ വീട്ടിലേക്കുള്ള വഴി',
    openGoogleMaps: '📍 ഗൂഗിൾ മാപ്പിൽ തുറക്കുക',
    openPortal: '🌐 ഔദ്യോഗിക പോർട്ടൽ തുറക്കുക',
    officeSectionTitle: 'സർക്കാർ ഓഫീസുകളും ഗൈഡുകളും',
    liveMedicalLocator: 'ലൈവ് മെഡിക്കൽ ലൊക്കേറ്റർ',
    gpsMedicalDesc: 'അടുത്തുള്ള ആശുപത്രികൾ കണ്ടെത്തുക.',
    hospitalBtn: 'ആശുപത്രി',
    pediatricianBtn: 'ശിശുരോഗ വിദഗ്ദ്ധൻ',
    pharmacyBtn: 'ഫാർമസി',
    clinicBtn: 'ക്ലിനിക്ക്',
    nightPharmacyTitle: 'രാത്രി ഫാർമസി',
    nightPharmacyDesc: 'അത്യാവശ്യ മരുന്നുകൾക്കായി ബെൽ അടിക്കുക.',
    findOpenPharmacy: 'ഫാർമസി കണ്ടെത്തുക',
    babyCareTitle: 'ശിശുപരിപാലനം',
    babyCareDesc: 'പാലും ഡൈപ്പറും.',
    locateNearestStore: 'കട കണ്ടെത്തുക',
    liveLocationSearch: 'ലൈവ് ലൊക്കേഷൻ തിരയൽ',
    gpsGroceryDesc: 'ഇന്ത്യൻ പലചരക്ക് കടകൾ കണ്ടെത്തുക.',
    groceriesBtn: 'പലചരക്ക്',
    restaurantsBtn: 'റെസ്റ്റോറന്റുകൾ',
    tiffinBtn: 'ടിഫിൻ സെന്ററുകൾ',
    buyOnShelf: 'ഇത് വാങ്ങുക:',
    liveCommunityLocator: 'കമ്മ്യൂണിറ്റി ലൊക്കേറ്റർ',
    gpsCommunityDesc: 'അടുത്തുള്ള ആരാധനാലയങ്ങൾ കണ്ടെത്തുക.',
    temple: 'ക്ഷേത്രം',
    mosque: 'പള്ളി',
    gurudwara: 'ഗുരുദ്വാര',
    church: 'പള്ളി',
    associations: 'അസോസിയേഷനുകൾ',
    publicBoard: 'പബ്ലിക് ബോർഡ്',
    myInbox: 'ഇൻബോക്സ്',
    enterPublicBoard: 'പ്രവേശിക്കുക',
    noPublicPosts: 'പോസ്റ്റുകൾ ഒന്നും ഇല്ല.',
    yourPost: 'നിങ്ങളുടെ പോസ്റ്റ്',
    messagePrivately: 'പ്രൈവറ്റ് സന്ദേശം',
    postToBoard: 'പോസ്റ്റ് ചെയ്യുക',
    myPrivateMessages: 'പ്രൈവറ്റ് സന്ദേശങ്ങൾ',
    emptyInbox: 'ഇൻബോക്സ് കാലിയാണ്.',
    privateChatHeading: 'പ്രൈവറ്റ് ചാറ്റ്',
    shareWhatsapp: 'WhatsApp പങ്കിടുക',
    composePlaceholder: 'ചോദ്യം ചോദിക്കുക...',
    displayNamePlaceholder: 'പേര് നൽകുക'
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
    problemDesc1: 'Moving to Europe (Germany, Netherlands, France, Ireland, etc.) is a dream for many Indian professionals and their families. However, the first few months are an absolute bureaucratic maze.',
    problemDesc2: 'Pravasi Sarthi was built to solve this exact problem by acting as a trusted digital companion.',
    monetizationTitle: 'How We Keep the App Free & Sustainable',
    monetizationDesc1: 'We believe that essential settlement and emergency tools should always be 100% free for parents and newcomers.',
    monetizationDesc2: 'When users sign up for essential expat services through our recommended partner links, we earn a small referral commission.',
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
    substitutesSub: 'If an Indian grocery is not nearby, buy these in standard European stores:',
    safeAlternative: 'Safe Alternative',
    restaurantsTitle: 'Indian Restaurants & Grocery Stores',
    communityTitle: 'Indian Families, Temples & Gurudwaras',
    homeAddressLabel: 'Home Address:',
    callFamilyBtn: 'Call Now',
    navigateHome: '📍 Navigate Home on Google Maps',
    openGoogleMaps: '📍 Open on Google Maps',
    openPortal: '🌐 Open Official Portal',
    officeSectionTitle: 'Official Government Offices & Maps',
    liveMedicalLocator: 'Live Medical Locator',
    gpsMedicalDesc: 'Use your phone\'s GPS to find the nearest emergency rooms, pediatricians, and 24/7 pharmacies instantly.',
    hospitalBtn: 'Hospital / ER',
    pediatricianBtn: 'Pediatrician',
    pharmacyBtn: 'Pharmacy',
    clinicBtn: 'Clinic / GP',
    nightPharmacyTitle: 'Night Pharmacy (Notdienst)',
    nightPharmacyDesc: 'Pharmacies rotate 24-hour night duty. Ring the night bell (Notdienstglocke) for urgent baby fever syrup.',
    findOpenPharmacy: 'Find Open Pharmacy',
    babyCareTitle: 'Baby Care (dm / Rossmann)',
    babyCareDesc: 'Formula milk: Aptamil (Pre / 1), HiPP Bio Combiotik. Stock up on diapers.',
    locateNearestStore: 'Locate Nearest Store',
    liveLocationSearch: 'Live Location Search',
    gpsGroceryDesc: 'Access your device\'s GPS to find the nearest curated Indian groceries, tiffins, and food services.',
    groceriesBtn: 'Groceries',
    restaurantsBtn: 'Restaurants',
    tiffinBtn: 'Tiffin Centers',
    buyOnShelf: 'Buy this on shelf:',
    liveCommunityLocator: 'Live Community Locator',
    gpsCommunityDesc: 'Find the nearest religious centers and Indian associations securely using GPS.',
    temple: 'Temple',
    mosque: 'Mosque',
    gurudwara: 'Gurudwara',
    church: 'Church',
    associations: 'Associations',
    publicBoard: 'Public Board',
    myInbox: 'My Inbox',
    enterPublicBoard: 'Enter Public Board',
    noPublicPosts: 'No public posts yet. Be the first to ask a question!',
    yourPost: 'Your Post',
    messagePrivately: 'Message Privately',
    postToBoard: 'Post to Board',
    myPrivateMessages: 'My Private Messages',
    emptyInbox: 'Your inbox is empty. Message someone from the Public Board.',
    privateChatHeading: 'Private 1-on-1 Chat',
    shareWhatsapp: 'Share WhatsApp',
    composePlaceholder: 'Ask a question or share advice to the public board...',
    displayNamePlaceholder: 'Choose a Display Name (e.g. Rahul M.)'
  }
};

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

  // 1. Live Public Posts state & real-time sync
  const [publicPosts, setPublicPosts] = useState([]);
  
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('public_posts')
        .select('*')
        .order('id', { ascending: false });
      if (data && data.length > 0) {
        setPublicPosts(data);
      } else {
        // Fallback default posts if database is empty
        setPublicPosts([
          { id: 101, country: 'germany', authorId: 'mock1', authorName: 'Rahul M.', text: 'Landing in Munich next week. Can someone guide me on which SIM card to buy at the airport?', time: '10:30 AM' },
          { id: 102, country: 'germany', authorId: 'mock2', authorName: 'Priya S.', text: 'Does anyone have a contact for a reliable moving van in Berlin?', time: '09:15 AM' }
        ]);
      }
    }
    fetchPosts();

    const postSub = supabase
      .channel('public_posts_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'public_posts' }, (payload) => {
        setPublicPosts((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postSub);
    };
  }, []);

  // --- ADD THIS: Community Recommendations State & Fetching ---
  const [recommendations, setRecommendations] = useState([]);
  const [recCategory, setRecCategory] = useState('grocery'); 
  const [newRecTitle, setNewRecTitle] = useState('');
  const [newRecDesc, setNewRecDesc] = useState('');

  useEffect(() => {
    async function fetchRecommendations() {
      const { data } = await supabase
        .from('city_recommendations')
        .select('*')
        .eq('country', currentCountryKey)
        .eq('city', selectedCity)
        .order('id', { ascending: false });

      if (data && data.length > 0) {
        setRecommendations(data);
      } else {
        setRecommendations([
          {
            id: 1,
            country: currentCountryKey,
            city: selectedCity,
            category: 'grocery',
            title: 'EuroGourmet Indian Spices',
            description: 'Best place for fresh paneer, basmati rice, and South Indian staples.',
            rating: 4.8,
            author_name: 'Rahul M.'
          },
          {
            id: 2,
            country: currentCountryKey,
            city: selectedCity,
            category: 'restaurant',
            title: 'Taj Mahal Authentic Curry',
            description: 'Amazing garlic naan and butter chicken. Feels just like home.',
            rating: 4.6,
            author_name: 'Priya S.'
          }
        ]);
      }
    }
    fetchRecommendations();
  }, [currentCountryKey, selectedCity]);

  const handleAddRecommendation = async (e) => {
    e.preventDefault();
    if (!newRecTitle.trim() || !newRecDesc.trim()) return;

    const item = {
      country: currentCountryKey,
      city: selectedCity,
      category: recCategory,
      title: newRecTitle,
      description: newRecDesc,
      rating: 5.0,
      author_name: chatName || 'Expat Member'
    };

    const { error } = await supabase.from('city_recommendations').insert([item]);
    if (!error) {
      setRecommendations(prev => [item, ...prev]);
      setNewRecTitle('');
      setNewRecDesc('');
    }
  };

  // 2. Live Private Chats state & real-time sync
  const [privateChats, setPrivateChats] = useState({});

  useEffect(() => {
    if (!activePrivateChatUser) return;

    async function fetchPrivateMessages() {
      const { data } = await supabase
        .from('private_messages')
        .select('*')
        .or(`and(sender_id.eq.${myUserId},recipient_id.eq.${activePrivateChatUser.id}),and(sender_id.eq.${activePrivateChatUser.id},recipient_id.eq.${myUserId})`)
        .order('id', { ascending: true });

      if (data) {
        setPrivateChats(prev => ({
          ...prev,
          [activePrivateChatUser.id]: {
            name: activePrivateChatUser.name,
            messages: data
          }
        }));
      }
    }
    fetchPrivateMessages();

    const chatSub = supabase
      .channel(`private_${myUserId}_${activePrivateChatUser.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'private_messages' }, (payload) => {
        const msg = payload.new;
        if (
          (msg.sender_id === activePrivateChatUser.id && msg.recipient_id === myUserId) ||
          (msg.sender_id === myUserId && msg.recipient_id === activePrivateChatUser.id)
        ) {
          setPrivateChats(prev => ({
            ...prev,
            [activePrivateChatUser.id]: {
              ...prev[activePrivateChatUser.id],
              messages: [...(prev[activePrivateChatUser.id]?.messages || []), msg]
            }
          }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatSub);
    };
  }, [activePrivateChatUser, myUserId]);

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

  const handlePostToBoard = async (e) => {
    e.preventDefault();
    if (!composeText.trim()) return;

    const newPost = { 
      id: Date.now(), 
      country: currentCountryKey, 
      author_name: chatName || 'Anonymous', 
      text: composeText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    console.log("Attempting to insert post:", newPost);

    const { data, error } = await supabase
      .from('public_posts')
      .insert([newPost]);

    if (error) {
      console.error("Supabase Post Error:", error.message, error.details, error.hint);
      alert("Error posting: " + error.message);
    } else {
      console.log("Post inserted successfully!", data);
      setComposeText('');
    }
  };

  const handleSendPrivateMessage = async (e) => {
    e.preventDefault();
    if (!composeText.trim() || !activePrivateChatUser) return;

    const newMsg = { 
      id: Date.now(), 
      sender_id: myUserId, 
      recipient_id: activePrivateChatUser.id, 
      text: composeText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    console.log("Attempting to send private message:", newMsg);

    const { data, error } = await supabase
      .from('private_messages')
      .insert([newMsg]);

    if (error) {
      console.error("Supabase Message Error:", error.message, error.details, error.hint);
      alert("Error sending message: " + error.message);
    } else {
      console.log("Private message sent successfully!", data);
      setComposeText('');
    }
  };

  const startPrivateChat = (post) => {
    // Fallback to check both snake_case (Supabase) and camelCase (Mock/Local)
    const authorId = post.author_id || post.authorId;
    const authorName = post.author_name || post.authorName;

    if (!authorId) {
      console.error("Missing author ID on post object:", post);
      return;
    }

    if (!privateChats[authorId]) {
      setPrivateChats(prev => ({ 
        ...prev, 
        [authorId]: { name: authorName, messages: [] } 
      }));
    }
    
    setActivePrivateChatUser({ id: authorId, name: authorName });
    setChatView('private');
  };

  const shareWhatsAppNumber = async () => {
    const num = window.prompt("Enter your WhatsApp number with country code (e.g., +49176... or +9198...):");
    if (num) {
      const cleanNum = num.replace(/[^0-9]/g, '');
      const newMsg = { 
        id: Date.now(), 
        sender_id: myUserId, 
        recipient_id: activePrivateChatUser.id,
        text: `📱 I have shared my WhatsApp number with you. Let's chat there!\n\nClick here: https://wa.me/${cleanNum}`, 
        is_system: true, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      };
      await supabase.from('private_messages').insert([newMsg]);
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
            { id: 'about', label: t.tabs.about || 'About Us', icon: Info },
            { id: 'recommendations', label: t.tabs?.recommendations || 'Expat Guide', icon: MapPin }
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
                 <h3 className="font-bold text-rose-900 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>{t.liveMedicalLocator}</h3>
                 <p className="text-sm text-rose-700 mt-1.5 max-w-md leading-relaxed">{t.gpsMedicalDesc}</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href="https://www.google.com/maps/search/?api=1&query=Emergency+Hospital+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">🏥</span> {t.hospitalBtn}</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Pediatrician+Kinderarzt+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">👶</span> {t.pediatricianBtn}</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Pharmacy+Apotheke+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">💊</span> {t.pharmacyBtn}</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=General+Doctor+Clinic+Hausarzt+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><span className="text-lg opacity-80">🩺</span> {t.clinicBtn}</a>
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
                <h4 className="font-bold text-slate-900 text-base">{t.nightPharmacyTitle}</h4>
                <p className="text-sm text-slate-500 leading-relaxed pb-6">{t.nightPharmacyDesc}</p>
                <div className="absolute bottom-6 left-6"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Notdienst Apotheke ' + selectedCity)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5"><span>{t.findOpenPharmacy}</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100"><Package className="w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900 text-base">{t.babyCareTitle}</h4>
                <p className="text-sm text-slate-500 leading-relaxed pb-6">{t.babyCareDesc}</p>
                <div className="absolute bottom-6 left-6"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('dm drogerie ' + selectedCity)}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center gap-1.5"><span>{t.locateNearestStore}</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
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
                 <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>{t.liveLocationSearch}</h3>
                 <p className="text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">{t.gpsGroceryDesc}</p>
               </div>
               <div className="flex flex-wrap gap-3 shrink-0">
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+grocery+store+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><ShoppingBag className="w-4 h-4 text-slate-400"/> {t.groceriesBtn}</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+restaurant+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><MapPin className="w-4 h-4 text-slate-400"/> {t.restaurantsBtn}</a>
                 <a href="https://www.google.com/maps/search/?api=1&query=Indian+tiffin+service+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition"><Package className="w-4 h-4 text-slate-400"/> {t.tiffinBtn}</a>
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">{t.substitutesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GROCERY_SUBSTITUTES.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900 text-base">{sub.item}</h3><span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">{t.safeAlternative}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">{t.buyOnShelf}</span><span className="text-sm font-bold text-slate-800 block">{sub.substitute}</span></div>
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
                <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>{t.liveCommunityLocator}</h3>
                <p className="text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">{t.gpsCommunityDesc}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pl-2">
                <a href="https://www.google.com/maps/search/?api=1&query=Hindu+Temple+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🛕</span> {t.temple}</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Mosque+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🕌</span> {t.mosque}</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Gurudwara+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🪯</span> {t.gurudwara}</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Church+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">⛪</span> {t.church}</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Indian+Community+Association+Club+near+me" target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-3 rounded-2xl text-sm font-medium text-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm transition"><span className="text-2xl mb-1 opacity-90">🤝</span> {t.associations}</a>
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
                <button onClick={() => setChatView('board')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${chatView === 'board' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}><MessageSquare className="w-4 h-4"/> {t.publicBoard}</button>
                <button onClick={() => setChatView('inbox')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${chatView === 'inbox' || chatView === 'private' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}><Inbox className="w-4 h-4"/> {t.myInbox}</button>
              </div>
            </div>

            {!hasJoinedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-slate-200">👋</div>
                <div><h4 className="font-bold text-xl text-slate-900 mb-2">Join {currentCountry.name} Community</h4><p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">Choose a display name. Your identity is hidden until you choose to safely share your WhatsApp number in a private chat.</p></div>
                <form onSubmit={joinChat} className="w-full max-w-sm space-y-4 pt-4">
                  <input type="text" required placeholder={t.displayNamePlaceholder} value={chatName} onChange={(e) => setChatName(e.target.value)} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 text-center font-medium shadow-sm transition" />
                  <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-2xl shadow-sm hover:bg-slate-800 transition">{t.enterPublicBoard}</button>
                </form>
              </div>
            ) : (
              <>
                {chatView === 'board' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
                      {publicPosts.filter(p => p.country === currentCountryKey).length === 0 ? (
                        <div className="text-center text-slate-400 text-sm mt-10">{t.noPublicPosts}</div>
                      ) : (
                        publicPosts.filter(p => p.country === currentCountryKey).map((post) => (
                          <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                            <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-900">{post.authorName}</span><span className="text-xs text-slate-400 font-medium">{post.time}</span></div>
                            <p className="text-sm text-slate-700 leading-relaxed">{post.text}</p>
                            <div className="pt-3 flex justify-end">
                              {post.authorId === myUserId ? (
                                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">{t.yourPost}</span>
                              ) : (
                                <button onClick={() => startPrivateChat(post)} className="text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-xl transition border border-indigo-100 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5"/> {t.messagePrivately}</button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                      <form onSubmit={handlePostToBoard} className="flex flex-col gap-3">
                        <textarea rows={2} placeholder={t.composePlaceholder} value={composeText} onChange={(e) => setComposeText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 font-medium transition resize-none" />
                        <div className="flex justify-end"><button type="submit" disabled={!composeText.trim()} className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-2.5 rounded-xl transition shadow-sm text-sm font-semibold">{t.postToBoard}</button></div>
                      </form>
                    </div>
                  </div>
                )}

                {chatView === 'inbox' && (
                  <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">{t.myPrivateMessages}</h2>
                    {Object.keys(privateChats).length === 0 ? (
                      <div className="text-center text-slate-400 text-sm mt-10">{t.emptyInbox}</div>
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
                        <div><div className="font-bold text-sm text-slate-900">{activePrivateChatUser.name}</div><div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t.privateChatHeading}</div></div>
                      </div>
                      <button onClick={shareWhatsAppNumber} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200"><Smartphone className="w-3.5 h-3.5" /> <span>{t.shareWhatsapp}</span></button>
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

        {activeTab === 'recommendations' && (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto my-4 animate-in fade-in duration-300">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">🌟 Expat Guide: {selectedCity}</h2>
        <p className="text-sm text-slate-500">Trusted Indian grocery stores, eateries, and clubs recommended by peers.</p>
      </div>
      
      {/* Category Filter Pills */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button type="button" onClick={() => setRecCategory('grocery')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${recCategory === 'grocery' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>🛒 Groceries</button>
        <button type="button" onClick={() => setRecCategory('restaurant')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${recCategory === 'restaurant' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>🍲 Food</button>
        <button type="button" onClick={() => setRecCategory('club')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${recCategory === 'club' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>🤝 Clubs</button>
      </div>
    </div>

    {/* Recommendations Feed */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.filter(r => r.category === recCategory).map((item, idx) => (
        <div key={item.id || idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 transition space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">★ {item.rating}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
          <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400 font-medium">
            <span>Suggested by {item.author_name}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Add Recommendation Form */}
    <form onSubmit={handleAddRecommendation} className="pt-6 border-t border-slate-100 space-y-3">
      <h3 className="font-semibold text-slate-800 text-sm">💡 Share a Secret Spot in {selectedCity}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input 
          type="text" 
          placeholder="Place or Club Name" 
          value={newRecTitle} 
          onChange={(e) => setNewRecTitle(e.target.value)} 
          className="p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="text" 
          placeholder="Short review or specialty..." 
          value={newRecDesc} 
          onChange={(e) => setNewRecDesc(e.target.value)} 
          className="p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition shadow-sm">
          Submit Recommendation
        </button>
      </div>
    </form>
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