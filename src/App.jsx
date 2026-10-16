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
  { code: 'gu', name: 'ગુજરાતી', label: 'Gujarati', greeting: 'નમસ્ते' },
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
      essentials: '४. अस्पताल व 24/7 फार्मेसी',
      desiRadar: '५. किराना व रेस्टोरेंट',
      community: '६. मंदिर व पार्क',
      chat: '७. कम्युनिटी चैट',
      about: '८. हमारे बारे में'
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
  ta: {
    appName: 'பிரவாசி சாரதி: ஜெர்மனி',
    editionTag: 'ஜெர்மனி வழிகாட்டி',
    tagline: 'ஜெர்மனியில் உள்ள இந்திய குடும்பங்களுக்கான நம்பகமான தோழன்',
    lostHelpBtn: '🚨 வழி தவறிவிட்டதா?',
    selectLangTitle: 'உங்கள் தாய்மொழியைத் தேர்ந்தெடுக்கவும்',
    policeAmbulance: 'காவல்துறை / அவசர ஊர்தி:',
    nonEmergencyDoc: 'மருத்துவர் ஆன்-கால்:',
    currencyCalc: 'நாணய மாற்றி',
    tabs: {
      journey: '1. முதல் 30 நாட்கள் திட்டம்',
      offices: '2. அரசு அலுவலகங்கள்',
      regulations: '3. ஜெர்மன் சட்டங்கள்',
      essentials: '4. மருத்துவமனைகள்',
      desiRadar: '5. மளிகை & உணவு',
      community: '6. கோயில்கள் & பூங்காக்கள்',
      chat: '7. சமூகம் அரட்டை',
      about: '8. எங்களைப் பற்றி'
    },
    roadmapHeading: 'ஜெர்மனிக்கான 30 நாள் மாஸ்டர் திட்டம்',
    roadmapSub: 'சிம் கார்டு, D-Ticket முதல் வீடு வாடகை மற்றும் வரி எண் வரை.',
    regulationsHeading: 'ஜெர்மன் விதிகள் மற்றும் சட்டங்கள்',
    regulationsSub: 'ஜெர்மனியில் வாழும்போது தெரிந்து கொள்ள வேண்டிய முக்கிய சட்டங்கள்.',
    simpleBriefHeading: 'எளிய மொழியில்:',
    actionPlanHeading: 'செயல் திட்டம்:',
    markCompleteBtn: 'முடிந்தது என குறிக்கவும்',
    completedBtn: 'நிறைவு பெற்றது ✓',
    youAreAsking: 'நீங்கள் கேட்பது:',
    showToLocal: 'உள்ளூர் நபரிடம் காட்டவும்:',
    tapToAnswer: '👇 பததைத் தேர்ந்தெடுக்கவும்:',
    localAnswered: 'உள்ளூர் நபர் தேர்ந்தெடுத்தது:',
    substitutesTitle: 'ஜெர்மன் சூப்பர் மார்க்கெட் பொருட்கள்',
    substitutesSub: 'பன்னீர் மற்றும் மாவுக்கான மாற்றுகள்:',
    safeAlternative: 'பாதுகாப்பான மாற்று',
    restaurantsTitle: 'இந்திய உணவகங்கள்',
    communityTitle: 'இந்திய குடும்பங்கள் & கோயில்கள்',
    homeAddressLabel: 'வீட்டு முகவரி:',
    callFamilyBtn: 'அழை',
    navigateHome: '📍 கூகுள் மேப்ஸில் வீட்டுக்கு செல்ல',
    openGoogleMaps: '📍 கூகுள் மேப்ஸில் திற',
    openPortal: '🌐 போர்ட்டலைத் திற',
    officeSectionTitle: 'ஜெர்மன் அரசு அலுவலகங்கள்',
    liveMedicalLocator: 'மருத்துவ கண்டறிதல்',
    gpsMedicalDesc: 'அருகிலுள்ள மருத்துவமனைகள் மற்றும் மருந்தகங்களைக் கண்டறியவும்.'
  },
  te: {
    appName: 'ప్రవాసి సార్థి: జర్మనీ',
    editionTag: 'జర్మనీ గైడ్',
    tagline: 'జర్మనీలో భారతీయ కుటుంబాలు మరియు నిపుణుల కోసం నమ్మకమైన సహచరుడు',
    lostHelpBtn: '🚨 దారి తప్పారా?',
    selectLangTitle: 'మీ మాతృభాషను ఎంచుకోండి',
    policeAmbulance: 'పోలీసు / ఆంబులెన్స్:',
    nonEmergencyDoc: 'డాక్టర్ ఆన్-కాల్:',
    currencyCalc: 'కరెన్సీ కాలిక్యులేటర్',
    tabs: {
      journey: '1. మొదటి 30 రోజులు రోడ్‌మ్యాప్',
      offices: '2. ప్రభుత్వ కార్యాలయాలు',
      regulations: '3. జర్మన్ నిబంధనలు',
      essentials: '4. ఆసుపత్రులు',
      desiRadar: '5. కిరాణా & ఆహారం',
      community: '6. ఆలయాలు & పార్కులు',
      chat: '7. కమ్యూనిటీ చాట్',
      about: '8. మా గురించి'
    },
    roadmapHeading: 'జర్మనీలో మొదటి 30 రోజుల రోడ్‌మ్యాప్',
    roadmapSub: 'సిమ్ కార్డ్, డి-టికెట్ నుండి అపార్ట్‌మెంట్ మరియు టాక్స్ ఐడి వరకు.',
    regulationsHeading: 'జర్మన్ నిబంధనలు మరియు చట్టాలు',
    regulationsSub: 'జర్మనీలో అనుసరించాల్సిన ముఖ్యమైన చట్టపరమైన నియమాలు.',
    simpleBriefHeading: 'సరళమైన భాషలో:',
    actionPlanHeading: 'చర్య ప్రణాళిక:',
    markCompleteBtn: 'పూర్తయినట్లు గుర్తించండి',
    completedBtn: 'పూర్తయింది ✓',
    youAreAsking: 'మీరు అడుగుతున్నది:',
    showToLocal: 'స్థానిక వ్యక్తికి చూపించండి:',
    tapToAnswer: '👇 సమాధానాన్ని ఎంచుకోండి:',
    localAnswered: 'స్థానిక వ్యక్తి ఎంచుకున్న సమాధానం:',
    substitutesTitle: 'జర్మన్ సూపర్ మార్కెట్ ప్రత్యామ్నాయాలు',
    substitutesSub: 'పన్నీర్ మరియు పిండి కోసం ప్రత్యామ్నాయాలు:',
    safeAlternative: 'సురక్షితమైన ప్రత్యామ్నాయం',
    restaurantsTitle: 'భారతీయ రెస్టారెంట్లు',
    communityTitle: 'భారతీయ కుటుంబాలు & ఆలయాలు',
    homeAddressLabel: 'ఇంటి చిరునామా:',
    callFamilyBtn: 'కాల్ చేయండి',
    navigateHome: '📍 గూగుల్ మ్యాప్స్‌లో ఇంటికి మార్గం',
    openGoogleMaps: '📍 గూగుల్ మ్యాప్స్‌లో తెరవండి',
    openPortal: '🌐 పోర్టల్‌ని తెరవండి',
    officeSectionTitle: 'జర్మన్ ప్రభుత్వ కార్యాలయాలు',
    liveMedicalLocator: 'లైవ్ మెడికల్ లోకేటర్',
    gpsMedicalDesc: 'సమీప ఆసుపత్రులు మరియు ఫార్మసీలను కనుగొనండి.'
  },
  bn: {
    appName: 'প্রবাসী সারথি: জার্মানি',
    editionTag: 'জার্মানি গাইড',
    tagline: 'জার্মানিতে ভারতীয় পরিবার এবং পেশাদারদের জন্য বিশ্বস্ত সহচর',
    lostHelpBtn: '🚨 রাস্তা হারিয়েছেন?',
    selectLangTitle: 'আপনার মাতৃভাষা নির্বাচন করুন',
    policeAmbulance: 'পুলিশ / অ্যাম্বুলেন্স:',
    nonEmergencyDoc: 'ডাক্তার অন-কল:',
    currencyCalc: 'কারেন্সি ক্যালকুলেটর',
    tabs: {
      journey: '১. প্রথম ৩০ দিন রোডম্যাপ',
      offices: '২. সরকারি অফিস',
      regulations: '৩. জার্মান নিয়মকানুন',
      essentials: '৪. হাসপাতাল',
      desiRadar: '৫. গ্রোসারী ও খাদ্য',
      community: '৬. মন্দির ও পার্ক',
      chat: '৭. কমিউনিটি চ্যাট',
      about: '৮. আমাদের সম্পর্কে'
    },
    roadmapHeading: 'জার্মানিতে প্রথম ৩০ দিনের মাস্টার রোডম্যাপ',
    roadmapSub: 'সিম কার্ড, ডি-টিকিট থেকে শুরু করে অ্যাপার্টমেন্ট এবং ট্যাক্স আইডি।',
    regulationsHeading: 'জার্মান নিয়ম ও আইন',
    regulationsSub: 'জার্মানিতে বসবাসের জন্য গুরুত্বপূর্ণ আইন ও প্রবিধান।',
    simpleBriefHeading: 'সহজ কথায়:',
    actionPlanHeading: 'কর্মপরিকল্পনা:',
    markCompleteBtn: 'সম্পন্ন বলে চিহ্নিত করুন',
    completedBtn: 'সম্পন্ন হয়েছে ✓',
    youAreAsking: 'আপনি যা জিজ্ঞাসা করছেন:',
    showToLocal: 'স্থানীয় ব্যক্তিকে দেখান:',
    tapToAnswer: '👇 উত্তর চয়ন করুন:',
    localAnswered: 'স্থানীয় ব্যক্তি এই উত্তরটি বেছে নিয়েছেন:',
    substitutesTitle: 'জার্মান সুপারমার্কেটের বিকল্প',
    substitutesSub: 'পনির ও আটার স্থানীয় বিকল্প:',
    safeAlternative: 'নিরাপদ বিকল্প',
    restaurantsTitle: 'ভারতীয় রেস্তোরাঁ',
    communityTitle: 'ভারতীয় পরিবার ও মন্দির',
    homeAddressLabel: 'মূল ঠিকানা:',
    callFamilyBtn: 'কল করুন',
    navigateHome: '📍 গুগল ম্যাপে বাড়ির পথ',
    openGoogleMaps: '📍 গুগল ম্যাপে খুলুন',
    openPortal: '🌐 পোর্টাল খুলুন',
    officeSectionTitle: 'জার্মান সরকারি অফিস',
    liveMedicalLocator: 'মেডিকেল লোকেটর',
    gpsMedicalDesc: 'নিকটবর্তী হাসপাতাল এবং ফার্মেসি খুঁজুন।'
  },
  mr: {
    appName: 'प्रवासी सारथी: जर्मनी',
    editionTag: 'जर्मनी विशेष गाइड',
    tagline: 'जर्मनीतील भारतीय कुटुंबे आणि व्यावसायिकांसाठी विश्वासू सोबती',
    lostHelpBtn: '🚨 रस्ता चुकलात?',
    selectLangTitle: 'तुमची मातृभाषा निवडा',
    policeAmbulance: 'पोलिस / रुग्णवाहिका:',
    nonEmergencyDoc: 'डॉक्टर ऑन-कॉल:',
    currencyCalc: 'चलम गणक',
    tabs: {
      journey: '१. पहिला महिना रोडमॅप',
      offices: '२. सरकारी कार्यालये',
      regulations: '३. जर्मन नियम व कायदे',
      essentials: '४. रुग्णालये',
      desiRadar: '५. किराणा व अन्न',
      community: '६. मंदिरे व उद्याने',
      chat: '७. कम्युनिटी चॅट',
      about: '८. आमच्याबद्दल'
    },
    roadmapHeading: 'जर्मनीतील पहिल्या ३० दिवसांचा मास्टर रोडमॅप',
    roadmapSub: 'सिम कार्ड, डी-तिकीटपासून अपार्टमेन्ट आणि टॅक्स आयडीपर्यंत सर्व काही.',
    regulationsHeading: 'जर्मन नियम आणि कायदे',
    regulationsSub: 'जर्मनीमध्ये राहताना पाळायचे महत्त्वाचे कायदेशीर नियम.',
    simpleBriefHeading: 'सोप्या भाषेत:',
    actionPlanHeading: 'कृती आराखडा:',
    markCompleteBtn: 'पूर्ण म्हणून चिन्हांकित करा',
    completedBtn: 'पूर्ण झाले ✓',
    youAreAsking: 'तुम्ही काय विचारत आहात:',
    showToLocal: 'स्थानिक व्यक्तीला दाखवा:',
    tapToAnswer: '👇 उत्तर निवडा:',
    localAnswered: 'स्थानिक व्यक्तीने हे उत्तर निवडले:',
    substitutesTitle: 'जर्मन सुपरमार्केटमधील भारतीय पर्याय',
    substitutesSub: 'पनीर आणि गव्हाच्या पिठाचे पर्याय:',
    safeAlternative: 'सुरक्षित पर्याय',
    restaurantsTitle: 'भारतीय रेस्टॉरंट्स',
    communityTitle: 'भारतीय कुटुंबे व मंदिरे',
    homeAddressLabel: 'घरचा पत्ता:',
    callFamilyBtn: 'कॉल करा',
    navigateHome: '📍 गुगल मॅपवर घराचा मार्ग',
    openGoogleMaps: '📍 गुगल मॅपवर उघडा',
    openPortal: '🌐 पोर्टल उघडा',
    officeSectionTitle: 'जर्मन सरकारी कार्यालये',
    liveMedicalLocator: 'वैद्यकीय लोकेटर',
    gpsMedicalDesc: 'जवळची रुग्णालये आणि औषधालये शोधा.'
  },
  gu: {
    appName: 'પ્રवासी સારથી: જર્મની',
    editionTag: 'જર્મની ગાઈડ',
    tagline: 'જર્મનીમાં ભારતીય પરિવારો અને વ્યાવસાયિકો માટે વિશ્વાસુ સાથી',
    lostHelpBtn: '🚨 રસ્તો ભૂલી ગયા?',
    selectLangTitle: 'તમારી માતૃભાષા પસંદ કરો',
    policeAmbulance: 'પોલીસ / એમ્બ્યુલન્સ:',
    nonEmergencyDoc: 'ડૉક્ટર ઓન-કૉલ:',
    currencyCalc: 'કરન્સી કેલ્ક્યુલેટર',
    tabs: {
      journey: '૧. પહેલો મહિનો રોડમેપ',
      offices: '૨. સરકારી ઓફિસ',
      regulations: '૩. જર્મન નિયમો',
      essentials: '૪. હોસ્પિટલ',
      desiRadar: '૫. કરિયાણા અને ખોરાક',
      community: '૬. મંદિરો અને બગીચા',
      chat: '૭. કમ્યુનિટી ચેટ',
      about: '૮. અમારા વિશે'
    },
    roadmapHeading: 'જર્મનીમાં પ્રથમ ૩૦ દિવસનો માસ્ટર રોડમેપ',
    roadmapSub: 'સિમ કાર્ડ, ડી-ટિકિટથી લઈને અપાર્ટમેન્ટ અને ટેક્સ આઈડી સુધી.',
    regulationsHeading: 'જર્મન નિયમો અને કાયદાઓ',
    regulationsSub: 'જર્મનીમાં રહેતી વખતે પાળવાના મહત્વપૂર્ણ નિયમો.',
    simpleBriefHeading: 'સરળ ભાષામાં:',
    actionPlanHeading: 'કાર્ય યોજના:',
    markCompleteBtn: 'પૂર્ણ તરીકે ચિહ્નિત કરો',
    completedBtn: 'પૂર્ણ થયું ✓',
    youAreAsking: 'તમે શું પૂછી રહ્યા છો:',
    showToLocal: 'સ્થાનિક વ્યક્તિને બતાવો:',
    tapToAnswer: '👇 જવાબ પસંદ કરો:',
    localAnswered: 'સ્થાનિક વ્યક્તિએ આ જવાબ પસંદ કર્યો:',
    substitutesTitle: 'જર્મન સુપરમાર્કેટ વિકલ્પો',
    substitutesSub: 'પનીર અને લોટના સ્થાનિક વિકલ્પો:',
    safeAlternative: 'સુરક્ષિત વિકલ્પ',
    restaurantsTitle: 'ભારતીય રેસ્ટોરન્ટ્સ',
    communityTitle: 'ભારતીય પરિવારો અને મંદિરો',
    homeAddressLabel: 'ઘરનું સરનામું:',
    callFamilyBtn: 'કૉલ કરો',
    navigateHome: '📍 ગૂગલ મેપ પર ઘરનો રસ્તો',
    openGoogleMaps: '📍 ગૂગલ મેપ પર ખોલો',
    openPortal: '🌐 પોર્ટલ ખોલો',
    officeSectionTitle: 'જર્મન સરકારી કાર્યાલયો',
    liveMedicalLocator: 'મેડિકल લોકેટર',
    gpsMedicalDesc: 'નજીકની હોસ્પિટલો અને ફાર્મસી શોધો.'
  },
  pa: {
    appName: 'ਪ੍ਰਵਾਸੀ ਸਾਰਥੀ: ਜਰਮਨੀ',
    editionTag: 'ਜਰਮਨੀ ਗਾਈਡ',
    tagline: 'ਜਰਮਨੀ ਵਿੱਚ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਅਤੇ ਪੇਸ਼ੇਵਰਾਂ ਲਈ ਭਰੋਸੇਯੋਗ ਸਾਥੀ',
    lostHelpBtn: '🚨 ਰਸਤਾ ਭੁੱਲ ਗਏ?',
    selectLangTitle: 'ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਚੁਣੋ',
    policeAmbulance: 'ਪੁਲਿਸ / ਐਂਬੂਲੈਂਸ:',
    nonEmergencyDoc: 'ਡਾਕਟਰ ਆਨ-ਕਾਲ:',
    currencyCalc: 'ਕਰੰਸੀ ਕੈਲਕੁਲੇਟਰ',
    tabs: {
      journey: '੧. ਪਹਿਲਾ ਮਹੀਨਾ ਰੋਡਮੈਪ',
      offices: '੨. ਸਰਕਾਰੀ ਦਫ਼ਤਰ',
      regulations: '੩. ਜਰਮਨ ਨਿਯਮ',
      essentials: '੪. ਹਸਪਤਾਲ',
      desiRadar: '੫. ਕਰਿਆਨਾ ਅਤੇ ਭੋਜਨ',
      community: '੬. ਮੰਦਿਰ ਅਤੇ ਪਾਰਕ',
      chat: '੭. ਕਮਿਊਨਿਟੀ ਚੈਟ',
      about: '੮. ਸਾਡੇ ਬਾਰੇ'
    },
    roadmapHeading: 'ਜਰਮਨੀ ਵਿੱਚ ਪਹਿਲੇ 30 ਦਿਨਾਂ ਦਾ ਮਾਸਟਰ ਰੋਡਮੈਪ',
    roadmapSub: 'ਸਿਮ ਕਾਰਡ, ਡੀ-ਟਿਕਟ ਤੋਂ ਲੈ ਕੇ ਅਪਾਰਟਮੈਂਟ ਅਤੇ ਟੈਕਸ ਆਈਡੀ ਤੱਕ।',
    regulationsHeading: 'ਜਰਮਨ ਨਿਯਮ ਅਤੇ ਕਾਨੂੰਨ',
    regulationsSub: 'ਜਰਮਨੀ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਪਾਲਣਯੋਗ ਮਹੱਤਵਪੂਰਨ ਕਾਨੂੰਨੀ ਨਿਯਮ।',
    simpleBriefHeading: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ:',
    actionPlanHeading: 'ਐਕਸ਼ਨ ਪਲਾਨ:',
    markCompleteBtn: 'ਪੂਰਾ ਹੋ ਗਿਆ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
    completedBtn: 'ਮੁਕੰਮਲ ✓',
    youAreAsking: 'ਤੁਸੀਂ ਕੀ ਪੁੱਛ ਰਹੇ ਹੋ:',
    showToLocal: 'ਸਥਾਨਕ ਵਿਅਕਤੀ ਨੂੰ ਦਿਖਾਓ:',
    tapToAnswer: '👇 ਜਵਾਬ ਚੁਣੋ:',
    localAnswered: 'ਸਥਾਨਕ ਵਿਅਕਤੀ ਨੇ ਇਹ ਜਵਾਬ ਚੁਣਿਆ:',
    substitutesTitle: 'ਜਰਮਨ ਸੁਪਰਮਾਰਕੀਟ ਵਿਕਲਪ',
    substitutesSub: 'ਪਨੀਰ ਅਤੇ ਆਟੇ ਦੇ ਸਥਾਨਕ ਬਦਲ:',
    safeAlternative: 'ਸੁਰੱਖਿਅਤ ਵਿਕਲਪ',
    restaurantsTitle: 'ਭਾਰਤੀ ਰੈਸਟੋਰੈਂਟ',
    communityTitle: 'ਭਾਰਤੀ ਪਰਿਵਾਰ ਅਤੇ ਮੰਦਿਰ',
    homeAddressLabel: 'ਘਰ ਦਾ ਪਤਾ:',
    callFamilyBtn: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
    navigateHome: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਘਰ ਦਾ ਰਸਤਾ',
    openGoogleMaps: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਖੋਲ੍ਹੋ',
    openPortal: '🌐 ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
    officeSectionTitle: 'ਜਰਮਨ ਸਰਕਾਰੀ ਦਫ਼ਤਰ',
    liveMedicalLocator: 'ਮੈਡੀਕਲ ਲੋਕੇਟਰ',
    gpsMedicalDesc: 'ਨੇੜਲੇ ਹਸਪਤਾਲ ਅਤੇ ਫਾਰਮਸੀ ਲੱਭੋ।'
  },
  kn: {
    appName: 'ಪ್ರವಾಸಿ ಸಾರಥಿ: ಜರ್ಮನಿ',
    editionTag: 'ಜರ್ಮನಿ ಗೈಡ್',
    tagline: 'ಜರ್ಮರಿಯಲ್ಲಿ ಭಾರತೀಯ ಕುಟುಂಬಗಳು ಮತ್ತು ವೃತ್ತಿಪರರಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಸಂಗಾತಿ',
    lostHelpBtn: '🚨 ದಾರಿ ತಪ್ಪಿದೆಯೇ?',
    selectLangTitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    policeAmbulance: 'ಪೊಲೀಸ್ / ಆಂಬುಲೆನ್ಸ್:',
    nonEmergencyDoc: 'ವೈದ್ಯರು ಆನ್-ಕాల్:',
    currencyCalc: 'ಕರೆನ್ಸಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    tabs: {
      journey: '೧. ಮೊದಲ 30 ದಿನಗಳು',
      offices: '೨. ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು',
      regulations: '೩. ಜರ್ಮನ್ ನಿಯಮಗಳು',
      essentials: '೪. ಆಸ್ಪತ್ರೆಗಳು',
      desiRadar: '೫. ಕಿರಾಣಿ & ಆಹಾರ',
      community: '೬. ದೇವಾಲಯಗಳು & ಪಾರ್ಕ್',
      chat: '೭. ಕಮ್ಯೂನಿಟಿ ಚಾಟ್',
      about: '೮. ನಮ್ಮ ಬಗ್ಗೆ'
    },
    roadmapHeading: 'ಜರ್ಮರಿಯಲ್ಲಿ ಮೊದಲ 30 ದಿನಗಳ ರೋಡ್‌ಮ್ಯಾಪ್',
    roadmapSub: 'ಸಿಮ್ ಕಾರ್ಡ್, ಡಿ-ಟಿಕೆಟ್‌ನಿಂದ ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ಮತ್ತು ಟ್ಯಾಕ್ಸ್ ಐಡಿ ವರೆಗೆ.',
    regulationsHeading: 'ಜರ್ಮನ್ ನಿಯಮಗಳು ಮತ್ತು ಕಾನೂನುಗಳು',
    regulationsSub: 'ಜರ್ಮರಿಯಲ್ಲಿ ವಾಸಿಸುವಾಗ ತಿಳಿದಿರಬೇಕಾದ ಪ್ರಮುಖ ಕಾನೂನುಗಳು.',
    simpleBriefHeading: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ:',
    actionPlanHeading: 'ಕ್ರಿಯಾ ಯೋಜನೆ:',
    markCompleteBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    completedBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ✓',
    youAreAsking: 'ನೀವು ಕೇಳುತ್ತಿರುವುದು:',
    showToLocal: 'ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿಗೆ ತೋರಿಸಿ:',
    tapToAnswer: '👇 ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    localAnswered: 'ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿ ಈ ಉತ್ತರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಾರೆ:',
    substitutesTitle: 'ಜರ್ಮನ್ ಸೂಪರ್‌ಮಾರ್ಕೆಟ್ ಪರ್ಯಾಯಗಳು',
    substitutesSub: 'ಪನ್ನೀರ್ ಮತ್ತು ಹಿಟ್ಟಿನ ಸ್ಥಳೀಯ ಪರ್ಯಾಯಗಳು:',
    safeAlternative: 'ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ',
    restaurantsTitle: 'ಭಾರತೀಯ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
    communityTitle: 'ಭಾರತೀಯ ಕುಟುಂಬಗಳು & ದೇವಾಲಯಗಳು',
    homeAddressLabel: 'ಮನೆ ವಿಳಾಸ:',
    callFamilyBtn: 'ಈಗ ಕರೆ ಮಾಡಿ',
    navigateHome: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಮನೆಗೆ ದಾರಿ',
    openGoogleMaps: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    openPortal: '🌐 ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    officeSectionTitle: 'ಜರ್ಮನ್ ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು',
    liveMedicalLocator: 'ವೈದ್ಯಕೀಯ ಲೊಕೇಟರ್',
    gpsMedicalDesc: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ.'
  },
  ml: {
    appName: 'പ്രവാസി സാരഥി: ജർമ്മനി',
    editionTag: 'ജർമ്മനി ഗൈഡ്',
    tagline: 'ജർമ്മനിയിലെ ഇന്ത്യൻ കുടുംബങ്ങൾക്കും പ്രൊഫഷണലുകൾക്കുമുള്ള വിശ്വസ്ത കൂട്ടുകാരൻ',
    lostHelpBtn: '🚨 വഴി തെറ്റിയോ?',
    selectLangTitle: 'നിങ്ങളുടെ മാതൃഭാഷ തിരഞ്ഞെടുക്കുക',
    policeAmbulance: 'പോലീസ് / ആംബുലൻസ്:',
    nonEmergencyDoc: 'ഡോക്ടർ ഓൺ-കോൾ:',
    currencyCalc: 'കറൻസി കാൽക്കുലേറ്റർ',
    tabs: {
      journey: '1. ആദ്യ 30 ദിവസ റോഡ്‌മാപ്പ്',
      offices: '2. സർക്കാർ ഓഫീസുകൾ',
      regulations: '3. ജർമ്മൻ നിയമങ്ങൾ',
      essentials: '4. ആശുപത്രികൾ',
      desiRadar: '5. പലചരക്ക് & ഭക്ഷണം',
      community: '6. ക്ഷേത്രങ്ങളും പാർക്കുകളും',
      chat: '7. കമ്മ്യൂണിറ്റി ചാറ്റ്',
      about: '8. ഞങ്ങളെക്കുറിച്ച്'
    },
    roadmapHeading: 'ജർമ്മനിയിലെ ആദ്യ 30 ദിവസത്തെ മാസ്റ്റർ റോഡ്‌മാപ്പ്',
    roadmapSub: 'സിം കാർഡ്, ഡി-ടിക്കറ്റ് മുതൽ അപ്പാർട്ട്മെന്റും ടാക്സ് ഐഡിയും വരെ.',
    regulationsHeading: 'ജർമ്മൻ നിയമങ്ങളും ചട്ടങ്ങളും',
    regulationsSub: 'ജർമ്മനിയിൽ ജീവിക്കുമ്പോൾ പാലിക്കേണ്ട പ്രധാന നിയമങ്ങൾ.',
    simpleBriefHeading: 'ലളിതമായ ഭാഷയിൽ:',
    actionPlanHeading: 'കർമ്മപദ്ധതി:',
    markCompleteBtn: 'പൂർത്തിയായി എന്ന് അടയാളപ്പെടുത്തുക',
    completedBtn: 'പൂർത്തിയായി ✓',
    youAreAsking: 'നിങ്ങൾ ചോദിക്കുന്നത്:',
    showToLocal: 'പ്രാദേശിക വ്യക്തിക്ക് കാണിക്കുക:',
    tapToAnswer: '👇 മറുപടി തിരഞ്ഞെടുക്കുക:',
    localAnswered: 'പ്രാദേശിക വ്യക്തി ഈ ഉത്തരം തിരഞ്ഞെടുത്തിരിക്കുന്നു:',
    substitutesTitle: 'ജർമ്മൻ സൂപ്പർമാർക്കറ്റ് പകരക്കാർ',
    substitutesSub: 'പനീറും പൊടിയും കണ്ടെത്താനുള്ള വഴികൾ:',
    safeAlternative: 'സുരക്ഷിതമായ പകരക്കാരൻ',
    restaurantsTitle: 'ഇന്ത്യൻ റെസ്റ്റോറന്റുകൾ',
    communityTitle: 'ഇന്ത്യൻ കുടുംബങ്ങളും ക്ഷേത്രങ്ങളും',
    homeAddressLabel: 'വീട്ടു വിലാസം:',
    callFamilyBtn: 'ഇപ്പോൾ വിളിക്കുക',
    navigateHome: '📍 ഗൂഗിൾ മാപ്പിൽ വീട്ടിലേക്കുള്ള വഴി',
    openGoogleMaps: '📍 ഗൂഗിൾ മാപ്പിൽ തുറക്കുക',
    openPortal: '🌐 പോർട്ടൽ തുറക്കുക',
    officeSectionTitle: 'ജർമ്മൻ സർക്കാർ ഓഫീസുകൾ',
    liveMedicalLocator: 'മെഡിക്കൽ ലൊക്കേറ്റർ',
    gpsMedicalDesc: 'അടുത്തുള്ള ആശുപത്രികളും ഫാർമസികളും കണ്ടെത്തുക.'
  }
};

// ============================================================================
// 4. CITY-SPECIFIC DIRECTORY (GROCERIES, RESTAURANTS, TEMPLES, PARKS)
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