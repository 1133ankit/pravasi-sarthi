import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass, Circle, ShoppingBag, Users, MapPin, Check, Phone, X, Globe,
  PlusCircle, Stethoscope, Clock, Building2, Navigation, MessageCircle,
  ShieldAlert, Info, Scale, Star
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';


// ============================================================================
// i18n.js — languages, translations, and helpers
// Any key missing in a language automatically falls back to English (EN).
// ============================================================================

const INDIAN_LANGUAGES = [
  { code: 'hi', name: 'हिन्दी', label: 'Hindi', greeting: 'नमस्ते', locale: 'hi-IN' },
  { code: 'ta', name: 'தமிழ்', label: 'Tamil', greeting: 'வணக்கம்', locale: 'ta-IN' },
  { code: 'te', name: 'తెలుగు', label: 'Telugu', greeting: 'నమస్కారం', locale: 'te-IN' },
  { code: 'bn', name: 'বাংলা', label: 'Bengali', greeting: 'নমস্কার', locale: 'bn-IN' },
  { code: 'mr', name: 'मराठी', label: 'Marathi', greeting: 'नमस्कार', locale: 'mr-IN' },
  { code: 'gu', name: 'ગુજરાતી', label: 'Gujarati', greeting: 'નમસ્તે', locale: 'gu-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', label: 'Punjabi', greeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', locale: 'pa-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ', label: 'Kannada', greeting: 'ನಮಸ್ಕಾರ', locale: 'kn-IN' },
  { code: 'ml', name: 'മലയാളം', label: 'Malayalam', greeting: 'നമസ്കാരം', locale: 'ml-IN' },
  { code: 'en', name: 'English', label: 'English', greeting: 'Namaste', locale: 'en-IN' }
];

// Replace {placeholders}: fmt('Hello {city}', { city: 'Berlin' })
const fmt = (str = '', vars = {}) =>
  str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));

// Pick a first-visit language from the browser settings
const detectLang = () => {
  try {
    const list = navigator.languages || [navigator.language || ''];
    for (const l of list) {
      const c = l.slice(0, 2).toLowerCase();
      if (INDIAN_LANGUAGES.some((x) => x.code === c)) return c;
    }
  } catch (e) {}
  return 'hi';
};

// ----------------------------------------------------------------------------
// English (base / fallback)
// ----------------------------------------------------------------------------
const EN = {
  appName: 'Pravasi Sarthi: Germany',
  editionTag: 'Germany Special Guide',
  tagline: 'A trusted companion for Indian families, students and professionals in Germany',
  lostHelpBtn: '🚨 Lost? (Help)',
  selectLangTitle: 'Choose your mother tongue',
  policeAmbulance: 'Police / Ambulance:',
  nonEmergencyDoc: 'Doctor on call:',
  currencyCalc: 'Currency calculator (₹ ↔ €)',
  tabs: {
    journey: '1. First 30 days',
    offices: '2. Govt offices',
    regulations: '3. German rules',
    essentials: '4. Hospitals & pharmacy',
    desiRadar: '5. Groceries & food',
    community: '6. Temples & parks',
    chat: '7. Community chat',
    about: '8. About us'
  },
  roadmapHeading: 'Your 30-day master roadmap for Germany',
  roadmapSub: 'From SIM card and apartment to Anmeldung, Deutschlandticket and tax ID.',
  regulationsHeading: 'Key German rules & laws',
  regulationsSub: 'Rules you must follow while living in Germany.',
  simpleBriefHeading: 'In simple words:',
  actionPlanHeading: 'Action plan:',
  markCompleteBtn: 'Mark as done',
  completedBtn: 'Done ✓',
  showToLocal: 'Show this to a local person:',
  substitutesTitle: 'Desi substitutes at German supermarkets (Rewe / Aldi / Lidl)',
  safeAlternative: 'Safe alternative',
  homeAddressLabel: 'Home address',
  callFamilyBtn: 'Call family',
  navigateHome: '📍 Route home on Google Maps',
  openGoogleMaps: '📍 Open in Google Maps',
  openPortal: '🌐 Open official portal',
  officeSectionTitle: 'Key German government offices',
  liveMedicalLocator: 'Live medical locator',
  gpsMedicalDesc: 'Find the nearest ER, 24/7 doctor (Hausarzt) and Sunday-open pharmacy (Notdienst).',

  // --- newly localised UI text ---
  progress: 'Progress',
  roadmapBadge: 'Germany master roadmap',
  regulationsBadge: 'Legal awareness',
  hospitalBtn: '🏥 Hospital / ER',
  pharmacyBtn: '💊 Sunday pharmacy',
  callWord: 'Call',
  transitLabel: '🚇 Nearest transit / metro:',
  hoursLabel: 'Hours & appointment tip:',
  officesSub: 'Key government offices with street addresses and one-click Google Maps navigation.',
  addPlaceBtn: 'Add restaurant / shop',
  desiSub: 'Top-rated grocery shops and Indian eateries for your selected city.',
  groceryTitle: '🛒 Top Indian grocery stores in {city}',
  restTitle: '🍛 Best Indian restaurants in {city}',
  shelfLabel: 'Buy on German shelf:',
  templesTitle: '🛕 Temples, gurudwaras & family places in {city}',
  templesSub: 'Connect with spiritual centres and enjoy green parks with your family.',
  parksTitle: '🌳 Family parks in {city}',
  noCityData: 'We have not curated a list for {city} yet. Search Google Maps instead:',
  boardTitle: '🇩🇪 Germany expat community board',
  joinTitle: 'Join the Germany expat chat',
  joinSub: 'Ask about Anmeldung, apartments and jobs in Germany.',
  namePh: 'Choose a display name (e.g. Amit S.)',
  enterBoard: 'Enter public board',
  noPosts: 'No posts yet. Be the first to ask!',
  askPh: 'Ask a question about Germany (Anmeldung, apartments…)',
  postBtn: 'Post',
  fName: 'Name',
  fAddress: 'Street address',
  fRating: 'Rating (1–5)',
  fNote: 'Specialty / note',
  saveBtn: 'Save',
  babyTitle: '👶 Baby care & 24/7 essentials',
  babyBody:
    'If you need baby formula (Aptamil / HiPP) or diapers at night or on a Sunday when supermarkets are closed, go to a duty pharmacy (Notdienst Apotheke) or the pharmacy / drugstore inside a major train station (Hauptbahnhof), which often stays open on Sundays.',
  aboutHeading: 'About us',
  aboutBody: 'A dedicated settlement and daily-living companion for Indian families and professionals in Germany.',
  familyPhoneLabel: 'Family phone number',
  emergencyExplain:
    'Show this card to a person nearby. It explains in German that you are lost and need help.',
  urgCritical: 'Critical',
  urgImportant: 'Important',
  dayRange: 'Day {a}–{b}'
};

// ----------------------------------------------------------------------------
// Core translations (existing keys, typos fixed)
// ----------------------------------------------------------------------------
const CORE = {
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
    roadmapSub: 'सिम कार्ड से लेकर अपार्टमेंट, Anmeldung, Deutschlandticket और टैक्स आईडी तक की पूरी प्रक्रिया।',
    regulationsHeading: 'जर्मनी के मुख्य नियम और कानून',
    regulationsSub: 'जर्मनी में रहते समय इन नियमों का पालन करना ज़रूरी है।',
    simpleBriefHeading: 'सरल भाषा में समझें:',
    actionPlanHeading: 'कार्य योजना:',
    markCompleteBtn: 'सम्पन्न चिह्नित करें',
    completedBtn: 'सम्पन्न हुआ ✓',
    showToLocal: 'स्थानीय व्यक्ति को दिखाएं:',
    substitutesTitle: 'जर्मन सुपरमार्केट (Rewe/Aldi/Lidl) में देसी विकल्प',
    safeAlternative: 'सुरक्षित विकल्प',
    homeAddressLabel: 'घर का पता',
    callFamilyBtn: 'परिवार को कॉल करें',
    navigateHome: '📍 गूगल मैप्स पर घर का रास्ता',
    openGoogleMaps: '📍 गूगल मैप्स पर खोलें',
    openPortal: '🌐 आधिकारिक पोर्टल खोलें',
    officeSectionTitle: 'प्रमुख जर्मन सरकारी कार्यालय',
    liveMedicalLocator: 'लाइव मेडिकल और क्लिनिक लोकेटर',
    gpsMedicalDesc: 'निकटतम ER, 24/7 डॉक्टर (Hausarzt) और रविवार को खुली फार्मेसी (Notdienst) खोजें।'
  },
  ta: {
    appName: 'பிரவாசி சாரதி: ஜெர்மனி',
    editionTag: 'ஜெர்மனி வழிகாட்டி',
    tagline: 'ஜெர்மனியில் உள்ள இந்திய குடும்பங்களுக்கான நம்பகமான தோழன்',
    lostHelpBtn: '🚨 வழி தவறிவிட்டதா?',
    selectLangTitle: 'உங்கள் தாய்மொழியைத் தேர்ந்தெடுக்கவும்',
    policeAmbulance: 'காவல்துறை / அவசர ஊர்தி:',
    nonEmergencyDoc: 'மருத்துவர் ஆன்-கால்:',
    currencyCalc: 'நாணய மாற்றி (₹ ↔ €)',
    tabs: {
      journey: '1. முதல் 30 நாட்கள்',
      offices: '2. அரசு அலுவலகங்கள்',
      regulations: '3. ஜெர்மன் சட்டங்கள்',
      essentials: '4. மருத்துவமனைகள்',
      desiRadar: '5. மளிகை & உணவு',
      community: '6. கோயில்கள் & பூங்காக்கள்',
      chat: '7. சமூக அரட்டை',
      about: '8. எங்களைப் பற்றி'
    },
    roadmapHeading: 'ஜெர்மனிக்கான 30 நாள் மாஸ்டர் திட்டம்',
    roadmapSub: 'சிம் கார்டு, வீடு முதல் Anmeldung, Deutschlandticket மற்றும் வரி எண் வரை.',
    regulationsHeading: 'ஜெர்மன் விதிகள் மற்றும் சட்டங்கள்',
    regulationsSub: 'ஜெர்மனியில் வாழும்போது பின்பற்ற வேண்டிய முக்கிய விதிகள்.',
    simpleBriefHeading: 'எளிய மொழியில்:',
    actionPlanHeading: 'செயல் திட்டம்:',
    markCompleteBtn: 'முடிந்தது என குறிக்கவும்',
    completedBtn: 'நிறைவு ✓',
    showToLocal: 'உள்ளூர் நபரிடம் காட்டவும்:',
    substitutesTitle: 'ஜெர்மன் சூப்பர் மார்க்கெட் மாற்றுப் பொருட்கள்',
    safeAlternative: 'பாதுகாப்பான மாற்று',
    homeAddressLabel: 'வீட்டு முகவரி',
    callFamilyBtn: 'குடும்பத்தை அழை',
    navigateHome: '📍 கூகுள் மேப்ஸில் வீட்டுக்கு வழி',
    openGoogleMaps: '📍 கூகுள் மேப்ஸில் திற',
    openPortal: '🌐 அதிகாரப்பூர்வ தளத்தைத் திற',
    officeSectionTitle: 'ஜெர்மன் அரசு அலுவலகங்கள்',
    liveMedicalLocator: 'மருத்துவ இருப்பிடம் கண்டறிதல்',
    gpsMedicalDesc: 'அருகிலுள்ள மருத்துவமனை, 24/7 மருத்துவர், ஞாயிறு மருந்தகத்தைக் கண்டறியவும்.'
  },
  te: {
    appName: 'ప్రవాసి సార్థి: జర్మనీ',
    editionTag: 'జర్మనీ గైడ్',
    tagline: 'జర్మనీలో భారతీయ కుటుంబాలు మరియు నిపుణుల కోసం నమ్మకమైన సహచరుడు',
    lostHelpBtn: '🚨 దారి తప్పారా?',
    selectLangTitle: 'మీ మాతృభాషను ఎంచుకోండి',
    policeAmbulance: 'పోలీసు / ఆంబులెన్స్:',
    nonEmergencyDoc: 'డాక్టర్ ఆన్-కాల్:',
    currencyCalc: 'కరెన్సీ కాలిక్యులేటర్ (₹ ↔ €)',
    tabs: {
      journey: '1. మొదటి 30 రోజులు',
      offices: '2. ప్రభుత్వ కార్యాలయాలు',
      regulations: '3. జర్మన్ నిబంధనలు',
      essentials: '4. ఆసుపత్రులు',
      desiRadar: '5. కిరాణా & ఆహారం',
      community: '6. ఆలయాలు & పార్కులు',
      chat: '7. కమ్యూనిటీ చాట్',
      about: '8. మా గురించి'
    },
    roadmapHeading: 'జర్మనీలో మొదటి 30 రోజుల రోడ్‌మ్యాప్',
    roadmapSub: 'సిమ్ కార్డ్, ఇల్లు నుండి Anmeldung, Deutschlandticket మరియు టాక్స్ ఐడి వరకు.',
    regulationsHeading: 'జర్మన్ నిబంధనలు మరియు చట్టాలు',
    regulationsSub: 'జర్మనీలో నివసించేటప్పుడు పాటించాల్సిన ముఖ్యమైన నియమాలు.',
    simpleBriefHeading: 'సరళమైన భాషలో:',
    actionPlanHeading: 'చర్య ప్రణాళిక:',
    markCompleteBtn: 'పూర్తయినట్లు గుర్తించండి',
    completedBtn: 'పూర్తయింది ✓',
    showToLocal: 'స్థానిక వ్యక్తికి చూపించండి:',
    substitutesTitle: 'జర్మన్ సూపర్ మార్కెట్ ప్రత్యామ్నాయాలు',
    safeAlternative: 'సురక్షితమైన ప్రత్యామ్నాయం',
    homeAddressLabel: 'ఇంటి చిరునామా',
    callFamilyBtn: 'కుటుంబానికి కాల్ చేయండి',
    navigateHome: '📍 గూగుల్ మ్యాప్స్‌లో ఇంటికి మార్గం',
    openGoogleMaps: '📍 గూగుల్ మ్యాప్స్‌లో తెరవండి',
    openPortal: '🌐 అధికారిక పోర్టల్ తెరవండి',
    officeSectionTitle: 'జర్మన్ ప్రభుత్వ కార్యాలయాలు',
    liveMedicalLocator: 'లైవ్ మెడికల్ లోకేటర్',
    gpsMedicalDesc: 'సమీప ఆసుపత్రి, 24/7 డాక్టర్, ఆదివారం తెరిచే ఫార్మసీని కనుగొనండి.'
  },
  bn: {
    appName: 'প্রবাসী সারথি: জার্মানি',
    editionTag: 'জার্মানি গাইড',
    tagline: 'জার্মানিতে ভারতীয় পরিবার এবং পেশাদারদের জন্য বিশ্বস্ত সহচর',
    lostHelpBtn: '🚨 রাস্তা হারিয়েছেন?',
    selectLangTitle: 'আপনার মাতৃভাষা নির্বাচন করুন',
    policeAmbulance: 'পুলিশ / অ্যাম্বুলেন্স:',
    nonEmergencyDoc: 'ডাক্তার অন-কল:',
    currencyCalc: 'কারেন্সি ক্যালকুলেটর (₹ ↔ €)',
    tabs: {
      journey: '১. প্রথম ৩০ দিন',
      offices: '২. সরকারি অফিস',
      regulations: '৩. জার্মান নিয়মকানুন',
      essentials: '৪. হাসপাতাল',
      desiRadar: '৫. গ্রোসারি ও খাবার',
      community: '৬. মন্দির ও পার্ক',
      chat: '৭. কমিউনিটি চ্যাট',
      about: '৮. আমাদের সম্পর্কে'
    },
    roadmapHeading: 'জার্মানিতে প্রথম ৩০ দিনের মাস্টার রোডম্যাপ',
    roadmapSub: 'সিম কার্ড, বাসা থেকে শুরু করে Anmeldung, Deutschlandticket ও ট্যাক্স আইডি।',
    regulationsHeading: 'জার্মান নিয়ম ও আইন',
    regulationsSub: 'জার্মানিতে বসবাসের সময় মানতে হবে এমন গুরুত্বপূর্ণ নিয়ম।',
    simpleBriefHeading: 'সহজ কথায়:',
    actionPlanHeading: 'কর্মপরিকল্পনা:',
    markCompleteBtn: 'সম্পন্ন বলে চিহ্নিত করুন',
    completedBtn: 'সম্পন্ন হয়েছে ✓',
    showToLocal: 'স্থানীয় ব্যক্তিকে দেখান:',
    substitutesTitle: 'জার্মান সুপারমার্কেটের বিকল্প',
    safeAlternative: 'নিরাপদ বিকল্প',
    homeAddressLabel: 'বাড়ির ঠিকানা',
    callFamilyBtn: 'পরিবারকে কল করুন',
    navigateHome: '📍 গুগল ম্যাপে বাড়ির পথ',
    openGoogleMaps: '📍 গুগল ম্যাপে খুলুন',
    openPortal: '🌐 অফিসিয়াল পোর্টাল খুলুন',
    officeSectionTitle: 'জার্মান সরকারি অফিস',
    liveMedicalLocator: 'মেডিকেল লোকেটর',
    gpsMedicalDesc: 'নিকটবর্তী হাসপাতাল, ২৪/৭ ডাক্তার ও রবিবার খোলা ফার্মেসি খুঁজুন।'
  },
  mr: {
    appName: 'प्रवासी सारथी: जर्मनी',
    editionTag: 'जर्मनी विशेष गाइड',
    tagline: 'जर्मनीतील भारतीय कुटुंबे आणि व्यावसायिकांसाठी विश्वासू सोबती',
    lostHelpBtn: '🚨 रस्ता चुकलात?',
    selectLangTitle: 'तुमची मातृभाषा निवडा',
    policeAmbulance: 'पोलिस / रुग्णवाहिका:',
    nonEmergencyDoc: 'डॉक्टर ऑन-कॉल:',
    currencyCalc: 'चलन गणक (₹ ↔ €)',
    tabs: {
      journey: '१. पहिला महिना',
      offices: '२. सरकारी कार्यालये',
      regulations: '३. जर्मन नियम व कायदे',
      essentials: '४. रुग्णालये',
      desiRadar: '५. किराणा व अन्न',
      community: '६. मंदिरे व उद्याने',
      chat: '७. कम्युनिटी चॅट',
      about: '८. आमच्याबद्दल'
    },
    roadmapHeading: 'जर्मनीतील पहिल्या ३० दिवसांचा मास्टर रोडमॅप',
    roadmapSub: 'सिम कार्ड, घरापासून Anmeldung, Deutschlandticket आणि टॅक्स आयडीपर्यंत सर्व काही.',
    regulationsHeading: 'जर्मन नियम आणि कायदे',
    regulationsSub: 'जर्मनीमध्ये राहताना पाळायचे महत्त्वाचे नियम.',
    simpleBriefHeading: 'सोप्या भाषेत:',
    actionPlanHeading: 'कृती आराखडा:',
    markCompleteBtn: 'पूर्ण म्हणून चिन्हांकित करा',
    completedBtn: 'पूर्ण झाले ✓',
    showToLocal: 'स्थानिक व्यक्तीला दाखवा:',
    substitutesTitle: 'जर्मन सुपरमार्केटमधील भारतीय पर्याय',
    safeAlternative: 'सुरक्षित पर्याय',
    homeAddressLabel: 'घराचा पत्ता',
    callFamilyBtn: 'कुटुंबाला कॉल करा',
    navigateHome: '📍 गुगल मॅपवर घराचा मार्ग',
    openGoogleMaps: '📍 गुगल मॅपवर उघडा',
    openPortal: '🌐 अधिकृत पोर्टल उघडा',
    officeSectionTitle: 'जर्मन सरकारी कार्यालये',
    liveMedicalLocator: 'वैद्यकीय लोकेटर',
    gpsMedicalDesc: 'जवळचे रुग्णालय, २४/७ डॉक्टर आणि रविवारी उघडे औषधालय शोधा.'
  },
  gu: {
    appName: 'પ્રવાસી સારથી: જર્મની',
    editionTag: 'જર્મની ગાઈડ',
    tagline: 'જર્મનીમાં ભારતીય પરિવારો અને વ્યાવસાયિકો માટે વિશ્વાસુ સાથી',
    lostHelpBtn: '🚨 રસ્તો ભૂલી ગયા?',
    selectLangTitle: 'તમારી માતૃભાષા પસંદ કરો',
    policeAmbulance: 'પોલીસ / એમ્બ્યુલન્સ:',
    nonEmergencyDoc: 'ડૉક્ટર ઓન-કૉલ:',
    currencyCalc: 'કરન્સી કેલ્ક્યુલેટર (₹ ↔ €)',
    tabs: {
      journey: '૧. પહેલો મહિનો',
      offices: '૨. સરકારી ઓફિસ',
      regulations: '૩. જર્મન નિયમો',
      essentials: '૪. હોસ્પિટલ',
      desiRadar: '૫. કરિયાણા અને ખોરાક',
      community: '૬. મંદિરો અને બગીચા',
      chat: '૭. કમ્યુનિટી ચેટ',
      about: '૮. અમારા વિશે'
    },
    roadmapHeading: 'જર્મનીમાં પ્રથમ ૩૦ દિવસનો માસ્ટર રોડમેપ',
    roadmapSub: 'સિમ કાર્ડ, ઘરથી લઈને Anmeldung, Deutschlandticket અને ટેક્સ આઈડી સુધી.',
    regulationsHeading: 'જર્મન નિયમો અને કાયદાઓ',
    regulationsSub: 'જર્મનીમાં રહેતી વખતે પાળવાના મહત્વપૂર્ણ નિયમો.',
    simpleBriefHeading: 'સરળ ભાષામાં:',
    actionPlanHeading: 'કાર્ય યોજના:',
    markCompleteBtn: 'પૂર્ણ તરીકે ચિહ્નિત કરો',
    completedBtn: 'પૂર્ણ થયું ✓',
    showToLocal: 'સ્થાનિક વ્યક્તિને બતાવો:',
    substitutesTitle: 'જર્મન સુપરમાર્કેટ વિકલ્પો',
    safeAlternative: 'સુરક્ષિત વિકલ્પ',
    homeAddressLabel: 'ઘરનું સરનામું',
    callFamilyBtn: 'પરિવારને કૉલ કરો',
    navigateHome: '📍 ગૂગલ મેપ પર ઘરનો રસ્તો',
    openGoogleMaps: '📍 ગૂગલ મેપ પર ખોલો',
    openPortal: '🌐 સત્તાવાર પોર્ટલ ખોલો',
    officeSectionTitle: 'જર્મન સરકારી કાર્યાલયો',
    liveMedicalLocator: 'મેડિકલ લોકેટર',
    gpsMedicalDesc: 'નજીકની હોસ્પિટલ, ૨૪/૭ ડૉક્ટર અને રવિવારે ખુલ્લી ફાર્મસી શોધો.'
  },
  pa: {
    appName: 'ਪ੍ਰਵਾਸੀ ਸਾਰਥੀ: ਜਰਮਨੀ',
    editionTag: 'ਜਰਮਨੀ ਗਾਈਡ',
    tagline: 'ਜਰਮਨੀ ਵਿੱਚ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਅਤੇ ਪੇਸ਼ੇਵਰਾਂ ਲਈ ਭਰੋਸੇਯੋਗ ਸਾਥੀ',
    lostHelpBtn: '🚨 ਰਸਤਾ ਭੁੱਲ ਗਏ?',
    selectLangTitle: 'ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਚੁਣੋ',
    policeAmbulance: 'ਪੁਲਿਸ / ਐਂਬੂਲੈਂਸ:',
    nonEmergencyDoc: 'ਡਾਕਟਰ ਆਨ-ਕਾਲ:',
    currencyCalc: 'ਕਰੰਸੀ ਕੈਲਕੁਲੇਟਰ (₹ ↔ €)',
    tabs: {
      journey: '੧. ਪਹਿਲਾ ਮਹੀਨਾ',
      offices: '੨. ਸਰਕਾਰੀ ਦਫ਼ਤਰ',
      regulations: '੩. ਜਰਮਨ ਨਿਯਮ',
      essentials: '੪. ਹਸਪਤਾਲ',
      desiRadar: '੫. ਕਰਿਆਨਾ ਅਤੇ ਭੋਜਨ',
      community: '੬. ਮੰਦਿਰ ਅਤੇ ਪਾਰਕ',
      chat: '੭. ਕਮਿਊਨਿਟੀ ਚੈਟ',
      about: '੮. ਸਾਡੇ ਬਾਰੇ'
    },
    roadmapHeading: 'ਜਰਮਨੀ ਵਿੱਚ ਪਹਿਲੇ 30 ਦਿਨਾਂ ਦਾ ਮਾਸਟਰ ਰੋਡਮੈਪ',
    roadmapSub: 'ਸਿਮ ਕਾਰਡ, ਘਰ ਤੋਂ ਲੈ ਕੇ Anmeldung, Deutschlandticket ਅਤੇ ਟੈਕਸ ਆਈਡੀ ਤੱਕ।',
    regulationsHeading: 'ਜਰਮਨ ਨਿਯਮ ਅਤੇ ਕਾਨੂੰਨ',
    regulationsSub: 'ਜਰਮਨੀ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਮੰਨਣ ਵਾਲੇ ਮਹੱਤਵਪੂਰਨ ਨਿਯਮ।',
    simpleBriefHeading: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ:',
    actionPlanHeading: 'ਐਕਸ਼ਨ ਪਲਾਨ:',
    markCompleteBtn: 'ਪੂਰਾ ਹੋ ਗਿਆ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
    completedBtn: 'ਮੁਕੰਮਲ ✓',
    showToLocal: 'ਸਥਾਨਕ ਵਿਅਕਤੀ ਨੂੰ ਦਿਖਾਓ:',
    substitutesTitle: 'ਜਰਮਨ ਸੁਪਰਮਾਰਕੀਟ ਵਿਕਲਪ',
    safeAlternative: 'ਸੁਰੱਖਿਅਤ ਵਿਕਲਪ',
    homeAddressLabel: 'ਘਰ ਦਾ ਪਤਾ',
    callFamilyBtn: 'ਪਰਿਵਾਰ ਨੂੰ ਕਾਲ ਕਰੋ',
    navigateHome: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਘਰ ਦਾ ਰਸਤਾ',
    openGoogleMaps: '📍 ਗੂਗਲ ਮੈਪਸ ਉੱਤੇ ਖੋਲ੍ਹੋ',
    openPortal: '🌐 ਸਰਕਾਰੀ ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
    officeSectionTitle: 'ਜਰਮਨ ਸਰਕਾਰੀ ਦਫ਼ਤਰ',
    liveMedicalLocator: 'ਮੈਡੀਕਲ ਲੋਕੇਟਰ',
    gpsMedicalDesc: 'ਨੇੜਲਾ ਹਸਪਤਾਲ, 24/7 ਡਾਕਟਰ ਅਤੇ ਐਤਵਾਰ ਖੁੱਲ੍ਹੀ ਫਾਰਮੇਸੀ ਲੱਭੋ।'
  },
  kn: {
    appName: 'ಪ್ರವಾಸಿ ಸಾರಥಿ: ಜರ್ಮನಿ',
    editionTag: 'ಜರ್ಮನಿ ಗೈಡ್',
    tagline: 'ಜರ್ಮನಿಯಲ್ಲಿ ಭಾರತೀಯ ಕುಟುಂಬಗಳು ಮತ್ತು ವೃತ್ತಿಪರರಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಸಂಗಾತಿ',
    lostHelpBtn: '🚨 ದಾರಿ ತಪ್ಪಿದೆಯೇ?',
    selectLangTitle: 'ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    policeAmbulance: 'ಪೊಲೀಸ್ / ಆಂಬುಲೆನ್ಸ್:',
    nonEmergencyDoc: 'ವೈದ್ಯರು ಆನ್-ಕಾಲ್:',
    currencyCalc: 'ಕರೆನ್ಸಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (₹ ↔ €)',
    tabs: {
      journey: '೧. ಮೊದಲ 30 ದಿನಗಳು',
      offices: '೨. ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು',
      regulations: '೩. ಜರ್ಮನ್ ನಿಯಮಗಳು',
      essentials: '೪. ಆಸ್ಪತ್ರೆಗಳು',
      desiRadar: '೫. ಕಿರಾಣಿ & ಆಹಾರ',
      community: '೬. ದೇವಾಲಯ & ಪಾರ್ಕ್',
      chat: '೭. ಕಮ್ಯೂನಿಟಿ ಚಾಟ್',
      about: '೮. ನಮ್ಮ ಬಗ್ಗೆ'
    },
    roadmapHeading: 'ಜರ್ಮನಿಯಲ್ಲಿ ಮೊದಲ 30 ದಿನಗಳ ರೋಡ್‌ಮ್ಯಾಪ್',
    roadmapSub: 'ಸಿಮ್ ಕಾರ್ಡ್, ಮನೆಯಿಂದ Anmeldung, Deutschlandticket ಮತ್ತು ಟ್ಯಾಕ್ಸ್ ಐಡಿ ವರೆಗೆ.',
    regulationsHeading: 'ಜರ್ಮನ್ ನಿಯಮಗಳು ಮತ್ತು ಕಾನೂನುಗಳು',
    regulationsSub: 'ಜರ್ಮನಿಯಲ್ಲಿ ವಾಸಿಸುವಾಗ ಪಾಲಿಸಬೇಕಾದ ಪ್ರಮುಖ ನಿಯಮಗಳು.',
    simpleBriefHeading: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ:',
    actionPlanHeading: 'ಕ್ರಿಯಾ ಯೋಜನೆ:',
    markCompleteBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    completedBtn: 'ಪೂರ್ಣಗೊಂಡಿದೆ ✓',
    showToLocal: 'ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿಗೆ ತೋರಿಸಿ:',
    substitutesTitle: 'ಜರ್ಮನ್ ಸೂಪರ್‌ಮಾರ್ಕೆಟ್ ಪರ್ಯಾಯಗಳು',
    safeAlternative: 'ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ',
    homeAddressLabel: 'ಮನೆ ವಿಳಾಸ',
    callFamilyBtn: 'ಕುಟುಂಬಕ್ಕೆ ಕರೆ ಮಾಡಿ',
    navigateHome: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಮನೆಗೆ ದಾರಿ',
    openGoogleMaps: '📍 ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    openPortal: '🌐 ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    officeSectionTitle: 'ಜರ್ಮನ್ ಸರ್ಕಾರಿ ಕಚೇರಿಗಳು',
    liveMedicalLocator: 'ವೈದ್ಯಕೀಯ ಲೊಕೇಟರ್',
    gpsMedicalDesc: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ, 24/7 ವೈದ್ಯರು ಮತ್ತು ಭಾನುವಾರ ತೆರೆದಿರುವ ಫಾರ್ಮಸಿ ಹುಡುಕಿ.'
  },
  ml: {
    appName: 'പ്രവാസി സാരഥി: ജർമ്മനി',
    editionTag: 'ജർമ്മനി ഗൈഡ്',
    tagline: 'ജർമ്മനിയിലെ ഇന്ത്യൻ കുടുംബങ്ങൾക്കും പ്രൊഫഷണലുകൾക്കുമുള്ള വിശ്വസ്ത കൂട്ടുകാരൻ',
    lostHelpBtn: '🚨 വഴി തെറ്റിയോ?',
    selectLangTitle: 'നിങ്ങളുടെ മാതൃഭാഷ തിരഞ്ഞെടുക്കുക',
    policeAmbulance: 'പോലീസ് / ആംബുലൻസ്:',
    nonEmergencyDoc: 'ഡോക്ടർ ഓൺ-കോൾ:',
    currencyCalc: 'കറൻസി കാൽക്കുലേറ്റർ (₹ ↔ €)',
    tabs: {
      journey: '1. ആദ്യ 30 ദിവസം',
      offices: '2. സർക്കാർ ഓഫീസുകൾ',
      regulations: '3. ജർമ്മൻ നിയമങ്ങൾ',
      essentials: '4. ആശുപത്രികൾ',
      desiRadar: '5. പലചരക്ക് & ഭക്ഷണം',
      community: '6. ക്ഷേത്രങ്ങളും പാർക്കുകളും',
      chat: '7. കമ്മ്യൂണിറ്റി ചാറ്റ്',
      about: '8. ഞങ്ങളെക്കുറിച്ച്'
    },
    roadmapHeading: 'ജർമ്മനിയിലെ ആദ്യ 30 ദിവസത്തെ മാസ്റ്റർ റോഡ്‌മാപ്പ്',
    roadmapSub: 'സിം കാർഡ്, വീട് മുതൽ Anmeldung, Deutschlandticket, ടാക്സ് ഐഡി വരെ.',
    regulationsHeading: 'ജർമ്മൻ നിയമങ്ങളും ചട്ടങ്ങളും',
    regulationsSub: 'ജർമ്മനിയിൽ ജീവിക്കുമ്പോൾ പാലിക്കേണ്ട പ്രധാന നിയമങ്ങൾ.',
    simpleBriefHeading: 'ലളിതമായ ഭാഷയിൽ:',
    actionPlanHeading: 'കർമ്മപദ്ധതി:',
    markCompleteBtn: 'പൂർത്തിയായി എന്ന് അടയാളപ്പെടുത്തുക',
    completedBtn: 'പൂർത്തിയായി ✓',
    showToLocal: 'പ്രാദേശിക വ്യക്തിക്ക് കാണിക്കുക:',
    substitutesTitle: 'ജർമ്മൻ സൂപ്പർമാർക്കറ്റ് പകരക്കാർ',
    safeAlternative: 'സുരക്ഷിതമായ പകരക്കാരൻ',
    homeAddressLabel: 'വീട്ടു വിലാസം',
    callFamilyBtn: 'കുടുംബത്തെ വിളിക്കുക',
    navigateHome: '📍 ഗൂഗിൾ മാപ്പിൽ വീട്ടിലേക്കുള്ള വഴി',
    openGoogleMaps: '📍 ഗൂഗിൾ മാപ്പിൽ തുറക്കുക',
    openPortal: '🌐 ഔദ്യോഗിക പോർട്ടൽ തുറക്കുക',
    officeSectionTitle: 'ജർമ്മൻ സർക്കാർ ഓഫീസുകൾ',
    liveMedicalLocator: 'മെഡിക്കൽ ലൊക്കേറ്റർ',
    gpsMedicalDesc: 'അടുത്തുള്ള ആശുപത്രി, 24/7 ഡോക്ടർ, ഞായറാഴ്ച തുറന്ന ഫാർമസി എന്നിവ കണ്ടെത്തുക.'
  }
};

// ----------------------------------------------------------------------------
// Extra translations (new keys). Long texts exist for Hindi + English only;
// other languages fall back to English for those few keys.
// ----------------------------------------------------------------------------
const EXTRA = {
  hi: {
    progress: 'प्रगति',
    roadmapBadge: 'जर्मनी मास्टर रोडमैप',
    regulationsBadge: 'कानूनी जागरूकता',
    hospitalBtn: '🏥 अस्पताल / ER',
    pharmacyBtn: '💊 रविवार फार्मेसी',
    callWord: 'कॉल',
    transitLabel: '🚇 नज़दीकी मेट्रो / ट्रांज़िट:',
    hoursLabel: 'समय व अपॉइंटमेंट टिप:',
    officesSub: 'पूरे पते और एक क्लिक में गूगल मैप्स नेविगेशन के साथ प्रमुख सरकारी कार्यालय।',
    addPlaceBtn: 'रेस्टोरेंट / दुकान जोड़ें',
    desiSub: 'आपके चुने शहर के टॉप-रेटेड किराना स्टोर और भारतीय रेस्टोरेंट।',
    groceryTitle: '🛒 {city} में भारतीय किराना स्टोर',
    restTitle: '🍛 {city} में भारतीय रेस्टोरेंट',
    shelfLabel: 'जर्मन शेल्फ पर खरीदें:',
    templesTitle: '🛕 {city} में मंदिर व गुरुद्वारे',
    templesSub: 'आध्यात्मिक केंद्रों से जुड़ें और परिवार के साथ पार्कों का आनंद लें।',
    parksTitle: '🌳 {city} में फैमिली पार्क',
    noCityData: 'हमने {city} की सूची अभी तैयार नहीं की है। गूगल मैप्स पर खोजें:',
    boardTitle: '🇩🇪 जर्मनी प्रवासी कम्युनिटी बोर्ड',
    joinTitle: 'जर्मनी कम्युनिटी चैट से जुड़ें',
    joinSub: 'Anmeldung, फ्लैट और नौकरी के बारे में सवाल पूछें।',
    namePh: 'अपना नाम चुनें (जैसे अमित एस.)',
    enterBoard: 'पब्लिक बोर्ड में जाएं',
    noPosts: 'अभी कोई पोस्ट नहीं। पहला सवाल आप पूछें!',
    askPh: 'जर्मनी के बारे में सवाल पूछें (Anmeldung, फ्लैट…)',
    postBtn: 'पोस्ट करें',
    fName: 'नाम',
    fAddress: 'पता',
    fRating: 'रेटिंग (1–5)',
    fNote: 'खासियत / नोट',
    saveBtn: 'सहेजें',
    babyTitle: '👶 बेबी केयर व 24/7 ज़रूरी सामान',
    babyBody:
      'रात में या रविवार को जब सुपरमार्केट बंद हों और आपको बेबी फॉर्मूला (Aptamil / HiPP) या डायपर चाहिए, तो ड्यूटी फार्मेसी (Notdienst Apotheke) या बड़े रेलवे स्टेशन (Hauptbahnhof) के अंदर की फार्मेसी / ड्रगस्टोर जाएं, जो अक्सर रविवार को भी खुले रहते हैं।',
    aboutHeading: 'हमारे बारे में',
    aboutBody: 'जर्मनी में भारतीय परिवारों और पेशेवरों के लिए बसने और रोज़मर्रा के जीवन का समर्पित साथी।',
    familyPhoneLabel: 'परिवार का फोन नंबर',
    emergencyExplain:
      'यह कार्ड पास के व्यक्ति को दिखाएं। इसमें जर्मन में लिखा है कि आप रास्ता भटक गए हैं और आपको मदद चाहिए।',
    urgCritical: 'ज़रूरी',
    urgImportant: 'महत्वपूर्ण',
    dayRange: 'दिन {a}–{b}'
  },
  ta: {
    progress: 'முன்னேற்றம்',
    hospitalBtn: '🏥 மருத்துவமனை / ER',
    pharmacyBtn: '💊 ஞாயிறு மருந்தகம்',
    callWord: 'அழை',
    transitLabel: '🚇 அருகிலுள்ள மெட்ரோ:',
    hoursLabel: 'நேரம் & முன்பதிவு குறிப்பு:',
    addPlaceBtn: 'உணவகம் / கடை சேர்',
    groceryTitle: '🛒 {city} இந்திய மளிகைக் கடைகள்',
    restTitle: '🍛 {city} இந்திய உணவகங்கள்',
    shelfLabel: 'ஜெர்மன் அலமாரியில் வாங்கவும்:',
    templesTitle: '🛕 {city} கோயில்கள் & குருத்வாராக்கள்',
    parksTitle: '🌳 {city} குடும்பப் பூங்காக்கள்',
    boardTitle: '🇩🇪 ஜெர்மனி சமூகப் பலகை',
    joinTitle: 'ஜெர்மனி சமூக அரட்டையில் சேரவும்',
    namePh: 'உங்கள் பெயரைத் தேர்ந்தெடுக்கவும்',
    enterBoard: 'பொதுப் பலகைக்குள் செல்',
    noPosts: 'இன்னும் பதிவுகள் இல்லை. முதலில் கேளுங்கள்!',
    askPh: 'ஜெர்மனி பற்றி கேள்வி கேளுங்கள்…',
    postBtn: 'பதிவிடு',
    fName: 'பெயர்',
    fAddress: 'முகவரி',
    fRating: 'மதிப்பீடு (1–5)',
    fNote: 'சிறப்பு / குறிப்பு',
    saveBtn: 'சேமி',
    babyTitle: '👶 குழந்தை பராமரிப்பு & 24/7 தேவைகள்',
    aboutHeading: 'எங்களைப் பற்றி',
    aboutBody: 'ஜெர்மனியில் உள்ள இந்தியக் குடும்பங்கள் மற்றும் தொழில்முறையாளர்களுக்கான குடியேற்ற, அன்றாட வாழ்க்கைத் துணை.',
    familyPhoneLabel: 'குடும்ப தொலைபேசி எண்',
    emergencyExplain: 'இந்த அட்டையை அருகிலுள்ளவரிடம் காட்டுங்கள். நீங்கள் வழி தவறிவிட்டீர்கள், உதவி தேவை என ஜெர்மன் மொழியில் உள்ளது.',
    urgCritical: 'மிக முக்கியம்',
    urgImportant: 'முக்கியம்',
    dayRange: 'நாள் {a}–{b}'
  },
  te: {
    progress: 'పురోగతి',
    hospitalBtn: '🏥 ఆసుపత్రి / ER',
    pharmacyBtn: '💊 ఆదివారం ఫార్మసీ',
    callWord: 'కాల్',
    transitLabel: '🚇 సమీప మెట్రో:',
    hoursLabel: 'సమయం & అపాయింట్‌మెంట్ చిట్కా:',
    addPlaceBtn: 'రెస్టారెంట్ / షాపు జోడించండి',
    groceryTitle: '🛒 {city} భారతీయ కిరాణా దుకాణాలు',
    restTitle: '🍛 {city} భారతీయ రెస్టారెంట్లు',
    shelfLabel: 'జర్మన్ షెల్ఫ్‌లో కొనండి:',
    templesTitle: '🛕 {city} ఆలయాలు & గురుద్వారాలు',
    parksTitle: '🌳 {city} కుటుంబ పార్కులు',
    boardTitle: '🇩🇪 జర్మనీ కమ్యూనిటీ బోర్డు',
    joinTitle: 'జర్మనీ కమ్యూనిటీ చాట్‌లో చేరండి',
    namePh: 'మీ పేరును ఎంచుకోండి',
    enterBoard: 'పబ్లిక్ బోర్డులోకి వెళ్లండి',
    noPosts: 'ఇంకా పోస్టులు లేవు. మొదట అడగండి!',
    askPh: 'జర్మనీ గురించి ప్రశ్న అడగండి…',
    postBtn: 'పోస్ట్ చేయండి',
    fName: 'పేరు',
    fAddress: 'చిరునామా',
    fRating: 'రేటింగ్ (1–5)',
    fNote: 'ప్రత్యేకత / గమనిక',
    saveBtn: 'సేవ్ చేయండి',
    babyTitle: '👶 శిశు సంరక్షణ & 24/7 అవసరాలు',
    aboutHeading: 'మా గురించి',
    aboutBody: 'జర్మనీలోని భారతీయ కుటుంబాలు, నిపుణుల కోసం స్థిరపడటానికి, రోజువారీ జీవితానికి అంకితమైన సహచరుడు.',
    familyPhoneLabel: 'కుటుంబ ఫోన్ నంబర్',
    emergencyExplain: 'ఈ కార్డును దగ్గరలోని వ్యక్తికి చూపించండి. మీరు దారి తప్పారని, సహాయం కావాలని జర్మన్‌లో ఉంది.',
    urgCritical: 'అత్యవసరం',
    urgImportant: 'ముఖ్యం',
    dayRange: 'రోజు {a}–{b}'
  },
  bn: {
    progress: 'অগ্রগতি',
    hospitalBtn: '🏥 হাসপাতাল / ER',
    pharmacyBtn: '💊 রবিবারের ফার্মেসি',
    callWord: 'কল',
    transitLabel: '🚇 নিকটতম মেট্রো:',
    hoursLabel: 'সময় ও অ্যাপয়েন্টমেন্ট টিপ:',
    addPlaceBtn: 'রেস্তোরাঁ / দোকান যোগ করুন',
    groceryTitle: '🛒 {city}-এ ভারতীয় মুদি দোকান',
    restTitle: '🍛 {city}-এ ভারতীয় রেস্তোরাঁ',
    shelfLabel: 'জার্মান তাকে কিনুন:',
    templesTitle: '🛕 {city}-এ মন্দির ও গুরুদ্বার',
    parksTitle: '🌳 {city}-এ ফ্যামিলি পার্ক',
    boardTitle: '🇩🇪 জার্মানি প্রবাসী কমিউনিটি বোর্ড',
    joinTitle: 'জার্মানি কমিউনিটি চ্যাটে যোগ দিন',
    namePh: 'আপনার নাম বেছে নিন',
    enterBoard: 'পাবলিক বোর্ডে যান',
    noPosts: 'এখনও কোনো পোস্ট নেই। প্রথম প্রশ্নটি আপনি করুন!',
    askPh: 'জার্মানি সম্পর্কে প্রশ্ন করুন…',
    postBtn: 'পোস্ট করুন',
    fName: 'নাম',
    fAddress: 'ঠিকানা',
    fRating: 'রেটিং (১–৫)',
    fNote: 'বিশেষত্ব / নোট',
    saveBtn: 'সংরক্ষণ করুন',
    babyTitle: '👶 শিশু যত্ন ও ২৪/৭ প্রয়োজনীয় জিনিস',
    aboutHeading: 'আমাদের সম্পর্কে',
    aboutBody: 'জার্মানিতে ভারতীয় পরিবার ও পেশাদারদের জন্য থিতু হওয়া ও দৈনন্দিন জীবনের একনিষ্ঠ সঙ্গী।',
    familyPhoneLabel: 'পরিবারের ফোন নম্বর',
    emergencyExplain: 'এই কার্ডটি কাছের কাউকে দেখান। এতে জার্মান ভাষায় লেখা আছে যে আপনি পথ হারিয়েছেন এবং সাহায্য দরকার।',
    urgCritical: 'জরুরি',
    urgImportant: 'গুরুত্বপূর্ণ',
    dayRange: 'দিন {a}–{b}'
  },
  mr: {
    progress: 'प्रगती',
    hospitalBtn: '🏥 रुग्णालय / ER',
    pharmacyBtn: '💊 रविवार औषधालय',
    callWord: 'कॉल',
    transitLabel: '🚇 जवळची मेट्रो:',
    hoursLabel: 'वेळ व अपॉइंटमेंट टिप:',
    addPlaceBtn: 'रेस्टॉरंट / दुकान जोडा',
    groceryTitle: '🛒 {city} मधील भारतीय किराणा दुकाने',
    restTitle: '🍛 {city} मधील भारतीय रेस्टॉरंट्स',
    shelfLabel: 'जर्मन शेल्फवर खरेदी करा:',
    templesTitle: '🛕 {city} मधील मंदिरे व गुरुद्वारे',
    parksTitle: '🌳 {city} मधील फॅमिली पार्क',
    boardTitle: '🇩🇪 जर्मनी प्रवासी कम्युनिटी बोर्ड',
    joinTitle: 'जर्मनी कम्युनिटी चॅटमध्ये सामील व्हा',
    namePh: 'तुमचे नाव निवडा',
    enterBoard: 'पब्लिक बोर्डवर जा',
    noPosts: 'अजून पोस्ट नाहीत. पहिला प्रश्न तुम्ही विचारा!',
    askPh: 'जर्मनीबद्दल प्रश्न विचारा…',
    postBtn: 'पोस्ट करा',
    fName: 'नाव',
    fAddress: 'पत्ता',
    fRating: 'रेटिंग (१–५)',
    fNote: 'वैशिष्ट्य / टीप',
    saveBtn: 'जतन करा',
    babyTitle: '👶 बाळाची काळजी व २४/७ गरजा',
    aboutHeading: 'आमच्याबद्दल',
    aboutBody: 'जर्मनीतील भारतीय कुटुंबे आणि व्यावसायिकांसाठी स्थायिक होण्यासाठी व दैनंदिन जीवनासाठी समर्पित सोबती.',
    familyPhoneLabel: 'कुटुंबाचा फोन नंबर',
    emergencyExplain: 'हे कार्ड जवळच्या व्यक्तीला दाखवा. त्यात जर्मनमध्ये लिहिले आहे की तुम्ही रस्ता चुकला आहात आणि मदत हवी आहे.',
    urgCritical: 'अत्यावश्यक',
    urgImportant: 'महत्त्वाचे',
    dayRange: 'दिवस {a}–{b}'
  },
  gu: {
    progress: 'પ્રગતિ',
    hospitalBtn: '🏥 હોસ્પિટલ / ER',
    pharmacyBtn: '💊 રવિવારની ફાર્મસી',
    callWord: 'કૉલ',
    transitLabel: '🚇 નજીકનું મેટ્રો:',
    hoursLabel: 'સમય અને એપોઇન્ટમેન્ટ ટિપ:',
    addPlaceBtn: 'રેસ્ટોરન્ટ / દુકાન ઉમેરો',
    groceryTitle: '🛒 {city}માં ભારતીય કરિયાણાની દુકાનો',
    restTitle: '🍛 {city}માં ભારતીય રેસ્ટોરન્ટ',
    shelfLabel: 'જર્મન શેલ્ફ પર ખરીદો:',
    templesTitle: '🛕 {city}માં મંદિરો અને ગુરુદ્વારા',
    parksTitle: '🌳 {city}માં ફેમિલી પાર્ક',
    boardTitle: '🇩🇪 જર્મની પ્રવાસી કમ્યુનિટી બોર્ડ',
    joinTitle: 'જર્મની કમ્યુનિટી ચેટમાં જોડાઓ',
    namePh: 'તમારું નામ પસંદ કરો',
    enterBoard: 'પબ્લિક બોર્ડમાં જાઓ',
    noPosts: 'હજુ કોઈ પોસ્ટ નથી. પહેલો પ્રશ્ન તમે પૂછો!',
    askPh: 'જર્મની વિશે પ્રશ્ન પૂછો…',
    postBtn: 'પોસ્ટ કરો',
    fName: 'નામ',
    fAddress: 'સરનામું',
    fRating: 'રેટિંગ (૧–૫)',
    fNote: 'વિશેષતા / નોંધ',
    saveBtn: 'સાચવો',
    babyTitle: '👶 બાળ સંભાળ અને ૨૪/૭ જરૂરિયાતો',
    aboutHeading: 'અમારા વિશે',
    aboutBody: 'જર્મનીમાં ભારતીય પરિવારો અને વ્યાવસાયિકો માટે સ્થાયી થવા અને રોજિંદા જીવન માટેનો સમર્પિત સાથી.',
    familyPhoneLabel: 'પરિવારનો ફોન નંબર',
    emergencyExplain: 'આ કાર્ડ નજીકની વ્યક્તિને બતાવો. તેમાં જર્મનમાં લખ્યું છે કે તમે રસ્તો ભૂલી ગયા છો અને મદદ જોઈએ છે.',
    urgCritical: 'અત્યંત જરૂરી',
    urgImportant: 'મહત્વનું',
    dayRange: 'દિવસ {a}–{b}'
  },
  pa: {
    progress: 'ਤਰੱਕੀ',
    hospitalBtn: '🏥 ਹਸਪਤਾਲ / ER',
    pharmacyBtn: '💊 ਐਤਵਾਰ ਫਾਰਮੇਸੀ',
    callWord: 'ਕਾਲ',
    transitLabel: '🚇 ਨੇੜਲੀ ਮੈਟਰੋ:',
    hoursLabel: 'ਸਮਾਂ ਅਤੇ ਅਪੌਇੰਟਮੈਂਟ ਟਿਪ:',
    addPlaceBtn: 'ਰੈਸਟੋਰੈਂਟ / ਦੁਕਾਨ ਜੋੜੋ',
    groceryTitle: '🛒 {city} ਵਿੱਚ ਭਾਰਤੀ ਕਰਿਆਨਾ ਦੁਕਾਨਾਂ',
    restTitle: '🍛 {city} ਵਿੱਚ ਭਾਰਤੀ ਰੈਸਟੋਰੈਂਟ',
    shelfLabel: 'ਜਰਮਨ ਸ਼ੈਲਫ ਤੋਂ ਖਰੀਦੋ:',
    templesTitle: '🛕 {city} ਵਿੱਚ ਮੰਦਿਰ ਤੇ ਗੁਰਦੁਆਰੇ',
    parksTitle: '🌳 {city} ਵਿੱਚ ਫੈਮਿਲੀ ਪਾਰਕ',
    boardTitle: '🇩🇪 ਜਰਮਨੀ ਪ੍ਰਵਾਸੀ ਕਮਿਊਨਿਟੀ ਬੋਰਡ',
    joinTitle: 'ਜਰਮਨੀ ਕਮਿਊਨਿਟੀ ਚੈਟ ਨਾਲ ਜੁੜੋ',
    namePh: 'ਆਪਣਾ ਨਾਂ ਚੁਣੋ',
    enterBoard: 'ਪਬਲਿਕ ਬੋਰਡ ਵਿੱਚ ਜਾਓ',
    noPosts: 'ਹਾਲੇ ਕੋਈ ਪੋਸਟ ਨਹੀਂ। ਪਹਿਲਾ ਸਵਾਲ ਤੁਸੀਂ ਪੁੱਛੋ!',
    askPh: 'ਜਰਮਨੀ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ…',
    postBtn: 'ਪੋਸਟ ਕਰੋ',
    fName: 'ਨਾਂ',
    fAddress: 'ਪਤਾ',
    fRating: 'ਰੇਟਿੰਗ (੧–੫)',
    fNote: 'ਖਾਸੀਅਤ / ਨੋਟ',
    saveBtn: 'ਸੰਭਾਲੋ',
    babyTitle: '👶 ਬੱਚੇ ਦੀ ਸੰਭਾਲ ਅਤੇ 24/7 ਜ਼ਰੂਰਤਾਂ',
    aboutHeading: 'ਸਾਡੇ ਬਾਰੇ',
    aboutBody: 'ਜਰਮਨੀ ਵਿੱਚ ਭਾਰਤੀ ਪਰਿਵਾਰਾਂ ਅਤੇ ਪੇਸ਼ੇਵਰਾਂ ਲਈ ਵਸਣ ਅਤੇ ਰੋਜ਼ਮੱਰਾ ਜ਼ਿੰਦਗੀ ਦਾ ਸਮਰਪਿਤ ਸਾਥੀ।',
    familyPhoneLabel: 'ਪਰਿਵਾਰ ਦਾ ਫ਼ੋਨ ਨੰਬਰ',
    emergencyExplain: 'ਇਹ ਕਾਰਡ ਨੇੜਲੇ ਵਿਅਕਤੀ ਨੂੰ ਦਿਖਾਓ। ਇਸ ਵਿੱਚ ਜਰਮਨ ਵਿੱਚ ਲਿਖਿਆ ਹੈ ਕਿ ਤੁਸੀਂ ਰਸਤਾ ਭੁੱਲ ਗਏ ਹੋ ਅਤੇ ਮਦਦ ਚਾਹੀਦੀ ਹੈ।',
    urgCritical: 'ਬਹੁਤ ਜ਼ਰੂਰੀ',
    urgImportant: 'ਮਹੱਤਵਪੂਰਨ',
    dayRange: 'ਦਿਨ {a}–{b}'
  },
  kn: {
    progress: 'ಪ್ರಗತಿ',
    hospitalBtn: '🏥 ಆಸ್ಪತ್ರೆ / ER',
    pharmacyBtn: '💊 ಭಾನುವಾರದ ಫಾರ್ಮಸಿ',
    callWord: 'ಕರೆ',
    transitLabel: '🚇 ಹತ್ತಿರದ ಮೆಟ್ರೋ:',
    hoursLabel: 'ಸಮಯ ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಸಲಹೆ:',
    addPlaceBtn: 'ರೆಸ್ಟೋರೆಂಟ್ / ಅಂಗಡಿ ಸೇರಿಸಿ',
    groceryTitle: '🛒 {city}ನಲ್ಲಿ ಭಾರತೀಯ ಕಿರಾಣಿ ಅಂಗಡಿಗಳು',
    restTitle: '🍛 {city}ನಲ್ಲಿ ಭಾರತೀಯ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
    shelfLabel: 'ಜರ್ಮನ್ ಶೆಲ್ಫ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ:',
    templesTitle: '🛕 {city}ನಲ್ಲಿ ದೇವಾಲಯಗಳು ಮತ್ತು ಗುರುದ್ವಾರಗಳು',
    parksTitle: '🌳 {city}ನಲ್ಲಿ ಕುಟುಂಬ ಪಾರ್ಕ್‌ಗಳು',
    boardTitle: '🇩🇪 ಜರ್ಮನಿ ಕಮ್ಯೂನಿಟಿ ಬೋರ್ಡ್',
    joinTitle: 'ಜರ್ಮನಿ ಕಮ್ಯೂನಿಟಿ ಚಾಟ್‌ಗೆ ಸೇರಿ',
    namePh: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ಆರಿಸಿ',
    enterBoard: 'ಸಾರ್ವಜನಿಕ ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ',
    noPosts: 'ಇನ್ನೂ ಪೋಸ್ಟ್‌ಗಳಿಲ್ಲ. ಮೊದಲು ನೀವು ಕೇಳಿ!',
    askPh: 'ಜರ್ಮನಿ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ…',
    postBtn: 'ಪೋಸ್ಟ್ ಮಾಡಿ',
    fName: 'ಹೆಸರು',
    fAddress: 'ವಿಳಾಸ',
    fRating: 'ರೇಟಿಂಗ್ (೧–೫)',
    fNote: 'ವಿಶೇಷತೆ / ಟಿಪ್ಪಣಿ',
    saveBtn: 'ಉಳಿಸಿ',
    babyTitle: '👶 ಮಗುವಿನ ಆರೈಕೆ ಮತ್ತು 24/7 ಅಗತ್ಯಗಳು',
    aboutHeading: 'ನಮ್ಮ ಬಗ್ಗೆ',
    aboutBody: 'ಜರ್ಮನಿಯಲ್ಲಿನ ಭಾರತೀಯ ಕುಟುಂಬಗಳು ಮತ್ತು ವೃತ್ತಿಪರರಿಗೆ ನೆಲೆಸಲು ಹಾಗೂ ದೈನಂದಿನ ಜೀವನಕ್ಕೆ ಮೀಸಲಾದ ಸಂಗಾತಿ.',
    familyPhoneLabel: 'ಕುಟುಂಬದ ಫೋನ್ ಸಂಖ್ಯೆ',
    emergencyExplain: 'ಈ ಕಾರ್ಡ್ ಅನ್ನು ಹತ್ತಿರದವರಿಗೆ ತೋರಿಸಿ. ನೀವು ದಾರಿ ತಪ್ಪಿದ್ದೀರಿ, ಸಹಾಯ ಬೇಕು ಎಂದು ಜರ್ಮನ್‌ನಲ್ಲಿ ಬರೆದಿದೆ.',
    urgCritical: 'ಅತ್ಯಗತ್ಯ',
    urgImportant: 'ಮುಖ್ಯ',
    dayRange: 'ದಿನ {a}–{b}'
  },
  ml: {
    progress: 'പുരോഗതി',
    hospitalBtn: '🏥 ആശുപത്രി / ER',
    pharmacyBtn: '💊 ഞായറാഴ്ച ഫാർമസി',
    callWord: 'വിളിക്കുക',
    transitLabel: '🚇 അടുത്തുള്ള മെട്രോ:',
    hoursLabel: 'സമയവും അപ്പോയിന്റ്മെന്റ് ടിപ്പും:',
    addPlaceBtn: 'റെസ്റ്റോറന്റ് / കട ചേർക്കുക',
    groceryTitle: '🛒 {city}-ലെ ഇന്ത്യൻ പലചരക്ക് കടകൾ',
    restTitle: '🍛 {city}-ലെ ഇന്ത്യൻ റെസ്റ്റോറന്റുകൾ',
    shelfLabel: 'ജർമ്മൻ ഷെൽഫിൽ നിന്ന് വാങ്ങുക:',
    templesTitle: '🛕 {city}-ലെ ക്ഷേത്രങ്ങളും ഗുരുദ്വാരകളും',
    parksTitle: '🌳 {city}-ലെ ഫാമിലി പാർക്കുകൾ',
    boardTitle: '🇩🇪 ജർമ്മനി കമ്മ്യൂണിറ്റി ബോർഡ്',
    joinTitle: 'ജർമ്മനി കമ്മ്യൂണിറ്റി ചാറ്റിൽ ചേരുക',
    namePh: 'നിങ്ങളുടെ പേര് തിരഞ്ഞെടുക്കുക',
    enterBoard: 'പൊതു ബോർഡിലേക്ക് പോകുക',
    noPosts: 'ഇതുവരെ പോസ്റ്റുകളില്ല. ആദ്യ ചോദ്യം നിങ്ങളുടേതാകട്ടെ!',
    askPh: 'ജർമ്മനിയെക്കുറിച്ച് ചോദിക്കൂ…',
    postBtn: 'പോസ്റ്റ് ചെയ്യുക',
    fName: 'പേര്',
    fAddress: 'വിലാസം',
    fRating: 'റേറ്റിംഗ് (1–5)',
    fNote: 'പ്രത്യേകത / കുറിപ്പ്',
    saveBtn: 'സേവ് ചെയ്യുക',
    babyTitle: '👶 കുഞ്ഞുങ്ങളുടെ പരിചരണവും 24/7 ആവശ്യങ്ങളും',
    aboutHeading: 'ഞങ്ങളെക്കുറിച്ച്',
    aboutBody: 'ജർമ്മനിയിലെ ഇന്ത്യൻ കുടുംബങ്ങൾക്കും പ്രൊഫഷണലുകൾക്കും താമസമുറപ്പിക്കാനും ദൈനംദിന ജീവിതത്തിനുമുള്ള സമർപ്പിത കൂട്ടുകാരൻ.',
    familyPhoneLabel: 'കുടുംബത്തിന്റെ ഫോൺ നമ്പർ',
    emergencyExplain: 'ഈ കാർഡ് അടുത്തുള്ളവരെ കാണിക്കുക. നിങ്ങൾക്ക് വഴി തെറ്റിയെന്നും സഹായം വേണമെന്നും ജർമ്മൻ ഭാഷയിൽ ഇതിലുണ്ട്.',
    urgCritical: 'അടിയന്തരം',
    urgImportant: 'പ്രധാനം',
    dayRange: 'ദിവസം {a}–{b}'
  }
};

// ----------------------------------------------------------------------------
// Public helper: always returns a complete dictionary (missing keys -> English)
// ----------------------------------------------------------------------------
function getText(code) {
  const core = CORE[code] || {};
  const extra = EXTRA[code] || {};
  return {
    ...EN,
    ...core,
    ...extra,
    tabs: { ...EN.tabs, ...(core.tabs || {}) }
  };
}

// Pick the right language from a { en, hi, ta, … } object
const pickLang = (obj, code) => (obj ? obj[code] || obj.en || '' : '');

// ============================================================================
// data.js — static content for the Germany edition
// Text that needs translating uses { en, hi, ta, … } objects; the app falls back
// to English for any language that is missing (see pickLang in i18n.js).
// ============================================================================

const GERMANY_CONFIG = {
  name: 'Germany (Deutschland)',
  flag: '🇩🇪',
  currency: 'EUR',
  symbol: '€',
  rateToInr: 106.58, // TODO: fetch a live rate; this value goes stale
  emergencyPhone: '112',
  medicalOnCall: '116 117',
  officialLang: 'German (Deutsch)',
  states: [
    { name: 'Hessen', cities: ['Frankfurt am Main', 'Wiesbaden', 'Kassel', 'Darmstadt'] },
    { name: 'Bayern (Bavaria)', cities: ['Munich (München)', 'Nuremberg (Nürnberg)', 'Augsburg', 'Regensburg'] },
    { name: 'Berlin', cities: ['Berlin Central', 'Charlottenburg', 'Pankow', 'Spandau'] },
    { name: 'Nordrhein-Westfalen (NRW)', cities: ['Cologne (Köln)', 'Düsseldorf', 'Dortmund', 'Essen'] },
    { name: 'Baden-Württemberg', cities: ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Heidelberg'] },
    { name: 'Hamburg', cities: ['Hamburg Central', 'Altona', 'Harburg', 'Wandsbek'] }
  ],
  // This card is for the German-speaking person who helps, so it stays in German
  lostCardText: {
    heading: 'NOTFALL / BITTE HELFEN SIE MIR!',
    body: 'Entschuldigung, ich spreche kein Deutsch. Ich habe mich verlaufen und brauche Hilfe, um meine Familie zu kontaktieren. Bitte rufen Sie diese Telefonnummer an oder helfen Sie mir zur unten stehenden Adresse.',
    callPrompt: 'Bitte rufen Sie meine Familie an:',
    addressPrompt: 'Meine Adresse:'
  }
};

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
      { name: 'Lohrpark', address: 'Lohrberg, 60389 Frankfurt', rating: 4.6, note: "Frankfurt's only vineyard with panoramic city skyline views." }
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
      { name: 'Englischer Garten', address: 'Munich, Germany', rating: 4.8, note: "One of the world's largest urban public parks, perfect for family picnics." },
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
      { name: 'Sri Ganesha Hindu Temple Berlin', address: 'Hasenheide 106, 10967 Berlin', rating: 4.8, note: 'Prominent temple in the historic Sri Mayapur community courtyard.' },
      { name: 'Gurudwara Singh Sabha Berlin', address: 'Hasenheide 14, 10967 Berlin', rating: 4.9, note: 'Active community hub with weekly prayers and Langar.' }
    ],
    parks: [
      { name: 'Tiergarten', address: 'Straße des 17. Juni, 10785 Berlin', rating: 4.8, note: "Berlin's central park with expansive lawns and shaded family paths." },
      { name: 'Viktoriapark', address: 'Kreuzberg, 10965 Berlin', rating: 4.6, note: 'Features a natural waterfall and panoramic views over Berlin.' }
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
    hoursTip: 'Appointments open online early morning. Registration is mandatory within 14 days of moving in.',
    portalUrl: 'https://service.berlin.de',
    mapsQuery: 'Bürgeramt'
  },
  {
    id: 'ger_finanzamt',
    category: 'Tax Office',
    name: 'Finanzamt (Tax Authority)',
    address: 'District-specific tax office',
    metro: 'Central transit hubs',
    hoursTip: 'Handles tax numbers, tax class changes, and income tax returns.',
    portalUrl: 'https://www.bzst.de',
    mapsQuery: 'Finanzamt'
  }
];

const GERMAN_HOSPITALS = [
  { name: 'Universitätsklinikum (University Hospital & 24/7 ER)', address: 'Major University Hospitals in Frankfurt, Munich, Berlin, Heidelberg', phone: '112', type: '24/7 Adult & Trauma ER', status: '24/7 Open' },
  { name: 'Kinderklinik (Pediatric Hospital & Fever Care)', address: 'Dedicated children hospitals in all major German cities', phone: '116117', type: 'Children Fever & Emergency Care', status: '24/7 Children ER' },
  { name: 'Notdienst Apotheke (Sunday & Night Pharmacy)', address: 'Rotating duty pharmacies in every district', phone: '0800 00 22 833', type: 'Open nights & Sundays for urgent prescriptions', status: '24/7 Duty' }
];

// ---------------------------------------------------------------------------
// 30-day roadmap. `brief` is the translated plain-language summary.
// ---------------------------------------------------------------------------
const GERMANY_ROADMAP_TASKS = [
  {
    id: 'sim_connectivity',
    title: 'Get a German SIM & mobile number',
    dayFrom: 1, dayTo: 3, urgency: 'Important',
    brief: {
      en: 'Buy a prepaid German SIM so you can receive OTPs and book appointments.',
      hi: 'OTP और अपॉइंटमेंट के लिए जर्मन प्रीपेड सिम खरीदें।',
      ta: 'OTP மற்றும் முன்பதிவுகளுக்கு ஜெர்மன் ப்ரீபெய்ட் சிம் வாங்குங்கள்.',
      te: 'OTP మరియు అపాయింట్‌మెంట్ల కోసం జర్మన్ ప్రీపెయిడ్ సిమ్ కొనండి.',
      bn: 'OTP ও অ্যাপয়েন্টমেন্টের জন্য জার্মান প্রিপেইড সিম কিনুন।',
      mr: 'OTP आणि अपॉइंटमेंटसाठी जर्मन प्रीपेड सिम खरेदी करा.',
      gu: 'OTP અને એપોઇન્ટમેન્ટ માટે જર્મન પ્રીપેડ સિમ ખરીદો.',
      pa: 'OTP ਅਤੇ ਅਪੌਇੰਟਮੈਂਟ ਲਈ ਜਰਮਨ ਪ੍ਰੀਪੇਡ ਸਿਮ ਖਰੀਦੋ।',
      kn: 'OTP ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಾಗಿ ಜರ್ಮನ್ ಪ್ರೀಪೇಡ್ ಸಿಮ್ ಖರೀದಿಸಿ.',
      ml: 'OTP, അപ്പോയിന്റ്മെന്റ് എന്നിവയ്ക്കായി ജർമ്മൻ പ്രീപെയ്ഡ് സിം വാങ്ങുക.'
    },
    whyImportant: 'Banks, landlords and the Bürgeramt all send codes or call you. A local number makes everything easier.',
    steps: [
      'Buy a prepaid SIM at a supermarket or mobile shop (e.g. Aldi Talk, Lidl Connect, Telekom).',
      'Carry your passport; activation often needs ID or a video-ident.',
      'Keep this number for your bank, Anmeldung and insurance forms.'
    ]
  },
  {
    id: 'anmeldung',
    title: 'Anmeldung – register your address',
    dayFrom: 1, dayTo: 14, urgency: 'Critical',
    brief: {
      en: 'Register your address at the Bürgeramt within 14 days of moving in. Almost everything else depends on it.',
      hi: 'घर बदलने के 14 दिन के अंदर Bürgeramt में पता दर्ज कराएं। बाकी लगभग हर काम इसी पर निर्भर है।',
      ta: 'குடிபெயர்ந்த 14 நாட்களுக்குள் Bürgeramt-ல் முகவரியைப் பதிவு செய்யுங்கள். மற்ற பெரும்பாலான வேலைகள் இதைச் சார்ந்தவை.',
      te: 'ఇంట్లో చేరిన 14 రోజుల్లో Bürgeramt లో చిరునామా నమోదు చేయండి. మిగతా దాదాపు అన్ని పనులు దీనిపైనే ఆధారపడతాయి.',
      bn: 'বাসা নেওয়ার ১৪ দিনের মধ্যে Bürgeramt-এ ঠিকানা নিবন্ধন করুন। বাকি প্রায় সব কাজ এর ওপর নির্ভর করে।',
      mr: 'घरात राहायला आल्यापासून १४ दिवसांत Bürgeramt मध्ये पत्ता नोंदवा. बाकी जवळपास सर्व कामे यावर अवलंबून आहेत.',
      gu: 'રહેવા આવ્યાના ૧૪ દિવસમાં Bürgeramt માં સરનામું નોંધાવો. બાકીનાં લગભગ બધાં કામ આના પર નિર્ભર છે.',
      pa: 'ਘਰ ਵਿੱਚ ਆਉਣ ਦੇ 14 ਦਿਨਾਂ ਅੰਦਰ Bürgeramt ਵਿੱਚ ਪਤਾ ਦਰਜ ਕਰਵਾਓ। ਬਾਕੀ ਲਗਭਗ ਸਾਰੇ ਕੰਮ ਇਸ ਉੱਤੇ ਨਿਰਭਰ ਹਨ।',
      kn: 'ಮನೆಗೆ ಬಂದ 14 ದಿನಗಳೊಳಗೆ Bürgeramt ನಲ್ಲಿ ವಿಳಾಸ ನೋಂದಾಯಿಸಿ. ಉಳಿದ ಬಹುತೇಕ ಕೆಲಸಗಳು ಇದರ ಮೇಲೆ ಅವಲಂಬಿತ.',
      ml: 'താമസം തുടങ്ങി 14 ദിവസത്തിനകം Bürgeramt-ൽ വിലാസം രജിസ്റ്റർ ചെയ്യുക. മറ്റ് മിക്ക കാര്യങ്ങളും ഇതിനെ ആശ്രയിച്ചിരിക്കുന്നു.'
    },
    whyImportant: 'The Anmeldung confirmation (Meldebescheinigung) is needed for a bank account, tax ID, health insurance and residence permit matters.',
    steps: [
      'Book a Bürgeramt appointment online as early as possible.',
      'Bring your passport, rental contract and the landlord confirmation (Wohnungsgeberbestätigung).',
      'Fill in the registration form (Anmeldeformular) before the visit.',
      'Keep the Meldebescheinigung safe — you will need it many times.'
    ]
  },
  {
    id: 'health_insurance',
    title: 'Health insurance (Krankenversicherung)',
    dayFrom: 1, dayTo: 14, urgency: 'Critical',
    brief: {
      en: 'Health insurance is mandatory in Germany. Pick a public (e.g. TK, AOK) or private plan.',
      hi: 'जर्मनी में स्वास्थ्य बीमा अनिवार्य है। सरकारी (जैसे TK, AOK) या निजी योजना चुनें।',
      ta: 'ஜெர்மனியில் மருத்துவக் காப்பீடு கட்டாயம். அரசு (TK, AOK) அல்லது தனியார் திட்டத்தைத் தேர்ந்தெடுங்கள்.',
      te: 'జర్మనీలో ఆరోగ్య బీమా తప్పనిసరి. ప్రభుత్వ (TK, AOK) లేదా ప్రైవేట్ ప్లాన్ ఎంచుకోండి.',
      bn: 'জার্মানিতে স্বাস্থ্য বিমা বাধ্যতামূলক। সরকারি (TK, AOK) বা বেসরকারি প্ল্যান বেছে নিন।',
      mr: 'जर्मनीत आरोग्य विमा अनिवार्य आहे. सरकारी (TK, AOK) किंवा खाजगी योजना निवडा.',
      gu: 'જર્મનીમાં આરોગ્ય વીમો ફરજિયાત છે. સરકારી (TK, AOK) અથવા ખાનગી યોજના પસંદ કરો.',
      pa: 'ਜਰਮਨੀ ਵਿੱਚ ਸਿਹਤ ਬੀਮਾ ਲਾਜ਼ਮੀ ਹੈ। ਸਰਕਾਰੀ (TK, AOK) ਜਾਂ ਪ੍ਰਾਈਵੇਟ ਯੋਜਨਾ ਚੁਣੋ।',
      kn: 'ಜರ್ಮನಿಯಲ್ಲಿ ಆರೋಗ್ಯ ವಿಮೆ ಕಡ್ಡಾಯ. ಸರ್ಕಾರಿ (TK, AOK) ಅಥವಾ ಖಾಸಗಿ ಯೋಜನೆ ಆಯ್ಕೆಮಾಡಿ.',
      ml: 'ജർമ്മനിയിൽ ആരോഗ്യ ഇൻഷുറൻസ് നിർബന്ധമാണ്. പൊതു (TK, AOK) അല്ലെങ്കിൽ സ്വകാര്യ പ്ലാൻ തിരഞ്ഞെടുക്കുക.'
    },
    whyImportant: 'Doctors, hospitals and many employers require proof of insurance. Being uninsured can lead to back-payments.',
    steps: [
      'Compare a public insurer (TK, AOK, Barmer) with private options; ask your employer or university for guidance.',
      'Apply online and receive your insurance certificate (Versicherungsbescheinigung).',
      'Give the certificate to your employer or university.',
      'Wait for the insurance card (Gesundheitskarte) by post.'
    ]
  },
  {
    id: 'deutschlandticket',
    title: 'Deutschlandticket (public transport pass)',
    dayFrom: 3, dayTo: 20, urgency: 'Important',
    brief: {
      en: 'The Deutschlandticket is a monthly pass for local and regional trains and buses across Germany.',
      hi: 'Deutschlandticket पूरे जर्मनी में लोकल और रीजनल ट्रेन व बस के लिए मासिक पास है।',
      ta: 'Deutschlandticket என்பது ஜெர்மனி முழுவதும் உள்ளூர் ரயில், பேருந்துகளுக்கான மாதாந்திர பாஸ்.',
      te: 'Deutschlandticket జర్మనీ అంతటా లోకల్, రీజనల్ రైళ్లు, బస్సులకు నెలవారీ పాస్.',
      bn: 'Deutschlandticket হলো জার্মানি জুড়ে লোকাল ও রিজিওনাল ট্রেন-বাসের মাসিক পাস।',
      mr: 'Deutschlandticket म्हणजे संपूर्ण जर्मनीतील लोकल व रीजनल ट्रेन-बससाठी मासिक पास.',
      gu: 'Deutschlandticket આખા જર્મનીમાં લોકલ અને રીજનલ ટ્રેન-બસ માટે માસિક પાસ છે.',
      pa: 'Deutschlandticket ਪੂਰੇ ਜਰਮਨੀ ਵਿੱਚ ਲੋਕਲ ਤੇ ਰੀਜਨਲ ਰੇਲ-ਬੱਸ ਲਈ ਮਹੀਨਾਵਾਰ ਪਾਸ ਹੈ।',
      kn: 'Deutschlandticket ಜರ್ಮನಿಯಾದ್ಯಂತ ಸ್ಥಳೀಯ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ರೈಲು-ಬಸ್‌ಗಳಿಗೆ ಮಾಸಿಕ ಪಾಸ್.',
      ml: 'Deutschlandticket ജർമ്മനിയിലുടനീളമുള്ള ലോക്കൽ, റീജിയണൽ ട്രെയിൻ-ബസുകൾക്കുള്ള പ്രതിമാസ പാസാണ്.'
    },
    whyImportant: 'One monthly subscription replaces most single tickets for local transport and is easy to cancel.',
    steps: [
      'Subscribe through DB Navigator, your local transport app or website.',
      'Check the current monthly price and whether your employer or university offers a discount.',
      'Keep the digital ticket on your phone; carry ID if asked.'
    ]
  },
  {
    id: 'tax_id',
    title: 'Tax ID (Steuer-ID)',
    dayFrom: 14, dayTo: 30, urgency: 'Important',
    brief: {
      en: 'You will receive your tax ID (Steuer-ID) by post a few weeks after Anmeldung. Keep it safe; your employer needs it.',
      hi: 'Anmeldung के कुछ हफ्ते बाद टैक्स आईडी (Steuer-ID) डाक से आएगी। इसे संभालकर रखें; नियोक्ता को चाहिए।',
      ta: 'Anmeldung-க்குப் பிறகு சில வாரங்களில் வரி எண் (Steuer-ID) அஞ்சலில் வரும். பத்திரமாக வைக்கவும்; நிறுவனத்துக்குத் தேவை.',
      te: 'Anmeldung తర్వాత కొన్ని వారాల్లో టాక్స్ ఐడి (Steuer-ID) పోస్ట్‌లో వస్తుంది. భద్రంగా ఉంచండి; యజమానికి అవసరం.',
      bn: 'Anmeldung-এর কয়েক সপ্তাহ পর ডাকে ট্যাক্স আইডি (Steuer-ID) আসবে। যত্নে রাখুন; নিয়োগকর্তার লাগবে।',
      mr: 'Anmeldung नंतर काही आठवड्यांत टपालाने टॅक्स आयडी (Steuer-ID) येईल. जपून ठेवा; नियोक्त्याला लागेल.',
      gu: 'Anmeldung પછી થોડા અઠવાડિયામાં ટપાલથી ટેક્સ આઈડી (Steuer-ID) આવશે. સાચવી રાખો; નોકરીદાતાને જોઈશે.',
      pa: 'Anmeldung ਤੋਂ ਕੁਝ ਹਫ਼ਤਿਆਂ ਬਾਅਦ ਟੈਕਸ ਆਈਡੀ (Steuer-ID) ਡਾਕ ਰਾਹੀਂ ਆਵੇਗੀ। ਸੰਭਾਲ ਕੇ ਰੱਖੋ; ਮਾਲਕ ਨੂੰ ਲੋੜ ਹੋਵੇਗੀ।',
      kn: 'Anmeldung ನಂತರ ಕೆಲವು ವಾರಗಳಲ್ಲಿ ತೆರಿಗೆ ಐಡಿ (Steuer-ID) ಅಂಚೆಯಲ್ಲಿ ಬರುತ್ತದೆ. ಜೋಪಾನವಾಗಿಡಿ; ಉದ್ಯೋಗದಾತರಿಗೆ ಬೇಕು.',
      ml: 'Anmeldung കഴിഞ്ഞ് ഏതാനും ആഴ്ചകൾക്കകം ടാക്സ് ഐഡി (Steuer-ID) തപാലിൽ വരും. സൂക്ഷിച്ചു വയ്ക്കുക; തൊഴിലുടമയ്ക്ക് വേണം.'
    },
    whyImportant: 'Your employer uses the Steuer-ID to calculate your payroll tax correctly.',
    steps: [
      'Wait 2–4 weeks after Anmeldung for the letter from the Federal Central Tax Office.',
      'If it has not arrived, request it via the BZSt portal.',
      'Give the number to your employer and keep a copy.'
    ]
  }
];

// ---------------------------------------------------------------------------
// Regulations (titles + one-line summaries translated for Hindi; English otherwise)
// ---------------------------------------------------------------------------
const GERMAN_REGULATIONS = [
  {
    id: "waste",
    icon: "♻️",
    title: {
      en: "Waste sorting & Pfand",
      hi: "कचरा छंटाई और Pfand",
      ta: "குப்பை பிரித்தல் & Pfand",
      te: "చెత్త వేరుచేయడం & Pfand",
      bn: "বর্জ্য আলাদা করা ও Pfand",
      mr: "कचरा वर्गीकरण आणि Pfand",
      gu: "કચરાનું વર્ગીકરણ અને Pfand",
      pa: "ਕੂੜਾ ਛਾਂਟੀ ਅਤੇ Pfand",
      kn: "ಕಸ ವಿಂಗಡಣೆ & Pfand",
      ml: "മാലിന്യം തരംതിരിക്കലും Pfand-ഉം"
    },
    summary: {
      en: "Sort waste into the right bins and return bottles for your deposit.",
      hi: "कचरा सही डिब्बों में डालें और बोतलें लौटाकर जमा राशि वापस लें।",
      ta: "குப்பையைச் சரியான தொட்டிகளில் போடுங்கள்; பாட்டில்களைத் திருப்பிக் கொடுத்து வைப்புத் தொகையைப் பெறுங்கள்.",
      te: "చెత్తను సరైన డబ్బాల్లో వేయండి; సీసాలను తిరిగి ఇచ్చి డిపాజిట్ తిరిగి పొందండి.",
      bn: "বর্জ্য সঠিক বিনে ফেলুন এবং বোতল ফেরত দিয়ে জমানো টাকা ফেরত নিন।",
      mr: "कचरा योग्य डब्यांत टाका आणि बाटल्या परत करून ठेव रक्कम परत मिळवा.",
      gu: "કચરો સાચા ડબ્બામાં નાખો અને બોટલો પરત કરીને ડિપોઝિટ પાછી મેળવો.",
      pa: "ਕੂੜਾ ਸਹੀ ਡੱਬਿਆਂ ਵਿੱਚ ਪਾਓ ਅਤੇ ਬੋਤਲਾਂ ਮੋੜ ਕੇ ਜਮ੍ਹਾਂ ਰਕਮ ਵਾਪਸ ਲਓ।",
      kn: "ಕಸವನ್ನು ಸರಿಯಾದ ಡಬ್ಬಗಳಲ್ಲಿ ಹಾಕಿ; ಬಾಟಲಿಗಳನ್ನು ಹಿಂತಿರುಗಿಸಿ ಠೇವಣಿ ಮರಳಿ ಪಡೆಯಿರಿ.",
      ml: "മാലിന്യം ശരിയായ ബിന്നുകളിൽ ഇടുക; കുപ്പികൾ തിരികെ നൽകി ഡെപ്പോസിറ്റ് വീണ്ടെടുക്കുക."
    },
    details: {
      en: "Germany separates paper, packaging, organic and residual waste, and colours or labels differ by city. Bottles and cans with the Pfand logo carry a small deposit that you get back from machines in supermarkets.",
      hi: "जर्मनी में कागज़, पैकेजिंग, जैविक और बाकी कचरा अलग-अलग डाला जाता है, और डिब्बों के रंग या लेबल शहर के हिसाब से बदलते हैं। Pfand लोगो वाली बोतलों और कैन पर थोड़ी जमा राशि होती है, जो सुपरमार्केट की मशीनों में लौटाने पर वापस मिलती है।",
      ta: "ஜெர்மனியில் காகிதம், பேக்கேஜிங், இயற்கைக் கழிவு, மற்ற குப்பை தனித்தனியாகப் பிரிக்கப்படுகின்றன; தொட்டிகளின் நிறம் அல்லது லேபிள் நகரத்துக்கு நகரம் மாறும். Pfand சின்னம் உள்ள பாட்டில்கள், கேன்களுக்குச் சிறிய வைப்புத் தொகை உண்டு; சூப்பர் மார்க்கெட் இயந்திரங்களில் திருப்பிக் கொடுத்தால் அது திரும்பக் கிடைக்கும்.",
      te: "జర్మనీలో కాగితం, ప్యాకేజింగ్, సేంద్రియ, మిగతా చెత్తను వేర్వేరుగా వేస్తారు; డబ్బాల రంగులు లేదా లేబుళ్లు నగరాన్ని బట్టి మారుతాయి. Pfand లోగో ఉన్న సీసాలు, క్యాన్లపై చిన్న డిపాజిట్ ఉంటుంది; సూపర్ మార్కెట్ మెషీన్లలో తిరిగి ఇస్తే అది వాపసు వస్తుంది.",
      bn: "জার্মানিতে কাগজ, প্যাকেজিং, জৈব ও অন্যান্য বর্জ্য আলাদা করে ফেলা হয়, আর বিনের রং বা লেবেল শহরভেদে আলাদা। Pfand লোগো থাকা বোতল ও ক্যানে সামান্য জমা টাকা থাকে, সুপারমার্কেটের মেশিনে ফেরত দিলে তা ফেরত পাওয়া যায়।",
      mr: "जर्मनीत कागद, पॅकेजिंग, सेंद्रिय आणि उर्वरित कचरा वेगवेगळा टाकला जातो, आणि डब्यांचे रंग किंवा लेबल शहरानुसार बदलतात. Pfand लोगो असलेल्या बाटल्या व कॅनवर थोडी ठेव रक्कम असते, ती सुपरमार्केटमधील मशीनमध्ये परत केल्यावर मिळते.",
      gu: "જર્મનીમાં કાગળ, પેકેજિંગ, જૈવિક અને બાકીનો કચરો અલગ અલગ નાખવામાં આવે છે, અને ડબ્બાના રંગ કે લેબલ શહેર પ્રમાણે બદલાય છે. Pfand લોગોવાળી બોટલ અને કેન પર નાની ડિપોઝિટ હોય છે, જે સુપરમાર્કેટના મશીનમાં પરત કરતાં પાછી મળે છે.",
      pa: "ਜਰਮਨੀ ਵਿੱਚ ਕਾਗਜ਼, ਪੈਕੇਜਿੰਗ, ਜੈਵਿਕ ਅਤੇ ਬਾਕੀ ਕੂੜਾ ਵੱਖ-ਵੱਖ ਪਾਇਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਡੱਬਿਆਂ ਦੇ ਰੰਗ ਜਾਂ ਲੇਬਲ ਸ਼ਹਿਰ ਅਨੁਸਾਰ ਬਦਲਦੇ ਹਨ। Pfand ਲੋਗੋ ਵਾਲੀਆਂ ਬੋਤਲਾਂ ਤੇ ਕੈਨਾਂ ਉੱਤੇ ਥੋੜ੍ਹੀ ਜਮ੍ਹਾਂ ਰਕਮ ਹੁੰਦੀ ਹੈ, ਜੋ ਸੁਪਰਮਾਰਕੀਟ ਦੀਆਂ ਮਸ਼ੀਨਾਂ ਵਿੱਚ ਮੋੜਨ ਤੇ ਵਾਪਸ ਮਿਲਦੀ ਹੈ।",
      kn: "ಜರ್ಮನಿಯಲ್ಲಿ ಕಾಗದ, ಪ್ಯಾಕೇಜಿಂಗ್, ಸಾವಯವ ಮತ್ತು ಉಳಿದ ಕಸವನ್ನು ಬೇರೆ ಬೇರೆಯಾಗಿ ಹಾಕಲಾಗುತ್ತದೆ; ಡಬ್ಬಗಳ ಬಣ್ಣ ಅಥವಾ ಲೇಬಲ್ ನಗರಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಗುತ್ತದೆ. Pfand ಲೋಗೋ ಇರುವ ಬಾಟಲಿ ಮತ್ತು ಕ್ಯಾನ್‌ಗಳ ಮೇಲೆ ಸಣ್ಣ ಠೇವಣಿ ಇರುತ್ತದೆ; ಸೂಪರ್‌ಮಾರ್ಕೆಟ್ ಯಂತ್ರಗಳಲ್ಲಿ ಹಿಂತಿರುಗಿಸಿದರೆ ಅದು ಮರಳಿ ಸಿಗುತ್ತದೆ.",
      ml: "ജർമ്മനിയിൽ പേപ്പർ, പാക്കേജിംഗ്, ജൈവം, ബാക്കി മാലിന്യം എന്നിവ വെവ്വേറെയാണ് ഇടുന്നത്; ബിന്നുകളുടെ നിറമോ ലേബലോ നഗരം അനുസരിച്ച് മാറും. Pfand ലോഗോയുള്ള കുപ്പികൾക്കും ക്യാനുകൾക്കും ചെറിയ ഡെപ്പോസിറ്റ് ഉണ്ട്; സൂപ്പർമാർക്കറ്റ് മെഷീനുകളിൽ തിരികെ നൽകിയാൽ അത് തിരികെ ലഭിക്കും."
    }
  },
  {
    id: "quiet",
    icon: "🤫",
    title: {
      en: "Quiet hours (Ruhezeiten)",
      hi: "शांति के घंटे (Ruhezeiten)",
      ta: "அமைதி நேரம் (Ruhezeiten)",
      te: "నిశ్శబ్ద వేళలు (Ruhezeiten)",
      bn: "নীরব সময় (Ruhezeiten)",
      mr: "शांतता वेळ (Ruhezeiten)",
      gu: "શાંતિનો સમય (Ruhezeiten)",
      pa: "ਸ਼ਾਂਤੀ ਦਾ ਸਮਾਂ (Ruhezeiten)",
      kn: "ಮೌನ ಸಮಯ (Ruhezeiten)",
      ml: "നിശബ്ദ സമയം (Ruhezeiten)"
    },
    summary: {
      en: "No loud noise at night and all day on Sundays.",
      hi: "रात में और रविवार को पूरे दिन तेज़ आवाज़ न करें।",
      ta: "இரவிலும் ஞாயிறு முழுவதும் அதிக சத்தம் கூடாது.",
      te: "రాత్రి, ఆదివారం రోజంతా పెద్ద శబ్దం చేయకండి.",
      bn: "রাতে এবং রবিবার সারা দিন উচ্চ শব্দ করবেন না।",
      mr: "रात्री आणि रविवारी दिवसभर मोठा आवाज करू नका.",
      gu: "રાત્રે અને રવિવારે આખો દિવસ મોટો અવાજ ન કરો.",
      pa: "ਰਾਤ ਨੂੰ ਅਤੇ ਐਤਵਾਰ ਨੂੰ ਸਾਰਾ ਦਿਨ ਉੱਚੀ ਆਵਾਜ਼ ਨਾ ਕਰੋ।",
      kn: "ರಾತ್ರಿ ಮತ್ತು ಭಾನುವಾರ ಇಡೀ ದಿನ ಜೋರಾಗಿ ಶಬ್ದ ಮಾಡಬೇಡಿ.",
      ml: "രാത്രിയിലും ഞായറാഴ്ച മുഴുവനും ഉച്ചത്തിൽ ശബ്ദമുണ്ടാക്കരുത്."
    },
    details: {
      en: "Quiet hours are typically at night and all day on Sundays and public holidays; exact times depend on your city and rental contract. Avoid drilling, vacuuming or loud music then.",
      hi: "शांति के घंटे आमतौर पर रात में और रविवार व सार्वजनिक छुट्टियों में पूरे दिन होते हैं; सही समय शहर और किराये के अनुबंध पर निर्भर करता है। उस समय ड्रिलिंग, वैक्यूम या तेज़ संगीत से बचें।",
      ta: "அமைதி நேரம் பொதுவாக இரவிலும், ஞாயிறு மற்றும் பொது விடுமுறை நாட்களில் முழுநாளும் இருக்கும்; சரியான நேரம் நகரம் மற்றும் வாடகை ஒப்பந்தத்தைப் பொறுத்தது. அந்நேரத்தில் துளையிடுதல், வெற்றிட சுத்தம் செய்தல், உரத்த இசையைத் தவிர்க்கவும்.",
      te: "నిశ్శబ్ద వేళలు సాధారణంగా రాత్రి, అలాగే ఆదివారాలు, ప్రభుత్వ సెలవు రోజుల్లో రోజంతా ఉంటాయి; ఖచ్చితమైన సమయాలు నగరం, అద్దె ఒప్పందాన్ని బట్టి మారుతాయి. ఆ సమయంలో డ్రిల్లింగ్, వాక్యూమ్, పెద్ద సంగీతం మానండి.",
      bn: "নীরব সময় সাধারণত রাতে এবং রবিবার ও সরকারি ছুটির দিনে সারা দিন থাকে; সঠিক সময় শহর ও ভাড়ার চুক্তির ওপর নির্ভর করে। তখন ড্রিল, ভ্যাকুয়াম বা জোরে গান বাজানো এড়িয়ে চলুন।",
      mr: "शांतता वेळ साधारणपणे रात्री, तसेच रविवार व सार्वजनिक सुट्टीच्या दिवशी पूर्ण दिवस असते; नेमकी वेळ शहर आणि भाडेकरारावर अवलंबून असते. त्या वेळी ड्रिलिंग, व्हॅक्यूम किंवा मोठे संगीत टाळा.",
      gu: "શાંતિનો સમય સામાન્ય રીતે રાત્રે, તેમજ રવિવાર અને જાહેર રજાઓમાં આખો દિવસ હોય છે; ચોક્કસ સમય શહેર અને ભાડા કરાર પર આધાર રાખે છે. તે સમયે ડ્રિલિંગ, વેક્યૂમ કે મોટું સંગીત ટાળો.",
      pa: "ਸ਼ਾਂਤੀ ਦਾ ਸਮਾਂ ਆਮ ਤੌਰ ਤੇ ਰਾਤ ਨੂੰ, ਅਤੇ ਐਤਵਾਰ ਤੇ ਸਰਕਾਰੀ ਛੁੱਟੀਆਂ ਵਿੱਚ ਸਾਰਾ ਦਿਨ ਹੁੰਦਾ ਹੈ; ਸਹੀ ਸਮਾਂ ਸ਼ਹਿਰ ਅਤੇ ਕਿਰਾਏ ਦੇ ਇਕਰਾਰਨਾਮੇ ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਉਸ ਵੇਲੇ ਡ੍ਰਿਲਿੰਗ, ਵੈਕਿਊਮ ਜਾਂ ਉੱਚਾ ਸੰਗੀਤ ਨਾ ਕਰੋ।",
      kn: "ಮೌನ ಸಮಯ ಸಾಮಾನ್ಯವಾಗಿ ರಾತ್ರಿ, ಹಾಗೂ ಭಾನುವಾರ ಮತ್ತು ಸಾರ್ವಜನಿಕ ರಜಾದಿನಗಳಲ್ಲಿ ಇಡೀ ದಿನ ಇರುತ್ತದೆ; ನಿಖರ ಸಮಯ ನಗರ ಮತ್ತು ಬಾಡಿಗೆ ಒಪ್ಪಂದವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ. ಆ ಸಮಯದಲ್ಲಿ ಡ್ರಿಲ್ಲಿಂಗ್, ವ್ಯಾಕ್ಯೂಮ್ ಅಥವಾ ಜೋರಾದ ಸಂಗೀತ ತಪ್ಪಿಸಿ.",
      ml: "നിശബ്ദ സമയം സാധാരണയായി രാത്രിയിലും, ഞായറാഴ്ചകളിലും പൊതു അവധി ദിവസങ്ങളിലും ദിവസം മുഴുവനും ആയിരിക്കും; കൃത്യമായ സമയം നഗരത്തെയും വാടക കരാറിനെയും ആശ്രയിച്ചിരിക്കുന്നു. ആ സമയത്ത് ഡ്രില്ലിംഗ്, വാക്വം, ഉച്ചത്തിലുള്ള സംഗീതം എന്നിവ ഒഴിവാക്കുക."
    }
  },
  {
    id: "rundfunk",
    icon: "📺",
    title: {
      en: "Broadcasting fee (Rundfunkbeitrag)",
      hi: "ब्रॉडकास्टिंग शुल्क (Rundfunkbeitrag)",
      ta: "ஒளிபரப்புக் கட்டணம் (Rundfunkbeitrag)",
      te: "ప్రసార రుసుము (Rundfunkbeitrag)",
      bn: "সম্প্রচার ফি (Rundfunkbeitrag)",
      mr: "प्रसारण शुल्क (Rundfunkbeitrag)",
      gu: "પ્રસારણ ફી (Rundfunkbeitrag)",
      pa: "ਪ੍ਰਸਾਰਣ ਫੀਸ (Rundfunkbeitrag)",
      kn: "ಪ್ರಸಾರ ಶುಲ್ಕ (Rundfunkbeitrag)",
      ml: "പ്രക്ഷേപണ ഫീസ് (Rundfunkbeitrag)"
    },
    summary: {
      en: "Every household pays a monthly broadcasting fee.",
      hi: "हर घर को मासिक ब्रॉडकास्टिंग शुल्क देना होता है।",
      ta: "ஒவ்வொரு வீடும் மாதாந்திர ஒளிபரப்புக் கட்டணம் செலுத்த வேண்டும்.",
      te: "ప్రతి ఇల్లు నెలవారీ ప్రసార రుసుము చెల్లించాలి.",
      bn: "প্রতিটি পরিবারকে মাসিক সম্প্রচার ফি দিতে হয়।",
      mr: "प्रत्येक घराला मासिक प्रसारण शुल्क भरावे लागते.",
      gu: "દરેક ઘરે માસિક પ્રસારણ ફી ચૂકવવી પડે છે.",
      pa: "ਹਰ ਘਰ ਨੂੰ ਮਹੀਨਾਵਾਰ ਪ੍ਰਸਾਰਣ ਫੀਸ ਦੇਣੀ ਪੈਂਦੀ ਹੈ।",
      kn: "ಪ್ರತಿ ಮನೆಯೂ ಮಾಸಿಕ ಪ್ರಸಾರ ಶುಲ್ಕ ಪಾವತಿಸಬೇಕು.",
      ml: "ഓരോ വീടും പ്രതിമാസ പ്രക്ഷേപണ ഫീസ് അടയ്ക്കണം."
    },
    details: {
      en: "After Anmeldung you will receive a letter from the Beitragsservice. One payment per household; check the current amount at rundfunkbeitrag.de.",
      hi: "Anmeldung के बाद आपको Beitragsservice से एक पत्र मिलेगा। हर घर के लिए एक ही भुगतान होता है; मौजूदा राशि rundfunkbeitrag.de पर देखें।",
      ta: "Anmeldung-க்குப் பிறகு Beitragsservice-இடமிருந்து ஒரு கடிதம் வரும். ஒரு வீட்டுக்கு ஒரு கட்டணம் மட்டுமே; தற்போதைய தொகையை rundfunkbeitrag.de-ல் பாருங்கள்.",
      te: "Anmeldung తర్వాత Beitragsservice నుండి మీకు ఒక లేఖ వస్తుంది. ఒక ఇంటికి ఒకే చెల్లింపు; ప్రస్తుత మొత్తాన్ని rundfunkbeitrag.de లో చూడండి.",
      bn: "Anmeldung-এর পর Beitragsservice থেকে আপনি একটি চিঠি পাবেন। প্রতি পরিবারের জন্য একটি পেমেন্ট; বর্তমান পরিমাণ rundfunkbeitrag.de-তে দেখুন।",
      mr: "Anmeldung नंतर तुम्हाला Beitragsservice कडून पत्र मिळेल. प्रत्येक घरासाठी एकच भरणा; सध्याची रक्कम rundfunkbeitrag.de वर पाहा.",
      gu: "Anmeldung પછી તમને Beitragsservice તરફથી પત્ર મળશે. દરેક ઘર માટે એક જ ચુકવણી; હાલની રકમ rundfunkbeitrag.de પર જુઓ.",
      pa: "Anmeldung ਤੋਂ ਬਾਅਦ ਤੁਹਾਨੂੰ Beitragsservice ਵੱਲੋਂ ਇੱਕ ਚਿੱਠੀ ਮਿਲੇਗੀ। ਹਰ ਘਰ ਲਈ ਇੱਕੋ ਭੁਗਤਾਨ; ਮੌਜੂਦਾ ਰਕਮ rundfunkbeitrag.de ਤੇ ਵੇਖੋ।",
      kn: "Anmeldung ನಂತರ Beitragsservice ನಿಂದ ನಿಮಗೆ ಪತ್ರ ಬರುತ್ತದೆ. ಪ್ರತಿ ಮನೆಗೆ ಒಂದೇ ಪಾವತಿ; ಪ್ರಸ್ತುತ ಮೊತ್ತವನ್ನು rundfunkbeitrag.de ನಲ್ಲಿ ನೋಡಿ.",
      ml: "Anmeldung കഴിഞ്ഞാൽ Beitragsservice-ൽ നിന്ന് നിങ്ങൾക്ക് ഒരു കത്ത് ലഭിക്കും. ഒരു വീടിന് ഒരു പേയ്മെന്റ് മാത്രം; നിലവിലെ തുക rundfunkbeitrag.de-ൽ നോക്കുക."
    }
  },
  {
    id: "insurance",
    icon: "🏥",
    title: {
      en: "Mandatory health insurance",
      hi: "अनिवार्य स्वास्थ्य बीमा",
      ta: "கட்டாய மருத்துவக் காப்பீடு",
      te: "తప్పనిసరి ఆరోగ్య బీమా",
      bn: "বাধ্যতামূলক স্বাস্থ্য বিমা",
      mr: "अनिवार्य आरोग्य विमा",
      gu: "ફરજિયાત આરોગ્ય વીમો",
      pa: "ਲਾਜ਼ਮੀ ਸਿਹਤ ਬੀਮਾ",
      kn: "ಕಡ್ಡಾಯ ಆರೋಗ್ಯ ವಿಮೆ",
      ml: "നിർബന്ധിത ആരോഗ്യ ഇൻഷുറൻസ്"
    },
    summary: {
      en: "You must always be insured while living in Germany.",
      hi: "जर्मनी में रहते हुए आपका बीमा हमेशा होना चाहिए।",
      ta: "ஜெர்மனியில் வாழும் வரை எப்போதும் காப்பீடு இருக்க வேண்டும்.",
      te: "జర్మనీలో ఉన్నంతకాలం మీకు ఎల్లప్పుడూ బీమా ఉండాలి.",
      bn: "জার্মানিতে থাকাকালীন সবসময় বিমা থাকতে হবে।",
      mr: "जर्मनीत वास्तव्यात नेहमी विमा असणे आवश्यक आहे.",
      gu: "જર્મનીમાં રહેતી વખતે હંમેશા વીમો હોવો જરૂરી છે.",
      pa: "ਜਰਮਨੀ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਹਮੇਸ਼ਾ ਬੀਮਾ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ।",
      kn: "ಜರ್ಮನಿಯಲ್ಲಿ ವಾಸಿಸುವಾಗ ಯಾವಾಗಲೂ ವಿಮೆ ಇರಬೇಕು.",
      ml: "ജർമ്മനിയിൽ താമസിക്കുമ്പോൾ എപ്പോഴും ഇൻഷുറൻസ് ഉണ്ടായിരിക്കണം."
    },
    details: {
      en: "Public insurers (TK, AOK, Barmer) and private insurers are options. Your employer or university can guide you, and gaps in cover can lead to back-payments.",
      hi: "सरकारी (TK, AOK, Barmer) और निजी बीमाकर्ता विकल्प हैं। आपका नियोक्ता या विश्वविद्यालय मार्गदर्शन कर सकता है, और बीमा में अंतराल होने पर पिछला भुगतान देना पड़ सकता है।",
      ta: "அரசு (TK, AOK, Barmer) மற்றும் தனியார் காப்பீட்டு நிறுவனங்கள் தேர்வுகளாகும். உங்கள் நிறுவனம் அல்லது பல்கலைக்கழகம் வழிகாட்டும்; காப்பீட்டில் இடைவெளி இருந்தால் பின்தேதியிட்ட கட்டணம் செலுத்த நேரிடலாம்.",
      te: "ప్రభుత్వ (TK, AOK, Barmer) మరియు ప్రైవేట్ బీమా సంస్థలు ఎంపికలు. మీ యజమాని లేదా విశ్వవిద్యాలయం మార్గనిర్దేశం చేయగలదు; బీమాలో అంతరాలు ఉంటే వెనుకటి చెల్లింపులు చేయాల్సి రావచ్చు.",
      bn: "সরকারি (TK, AOK, Barmer) ও বেসরকারি বিমা কোম্পানি বিকল্প। আপনার নিয়োগকর্তা বা বিশ্ববিদ্যালয় পথ দেখাতে পারে, আর বিমায় ফাঁক থাকলে বকেয়া টাকা দিতে হতে পারে।",
      mr: "सरकारी (TK, AOK, Barmer) आणि खाजगी विमा कंपन्या हे पर्याय आहेत. तुमचा नियोक्ता किंवा विद्यापीठ मार्गदर्शन करू शकते, आणि विम्यात खंड पडल्यास मागील रक्कम भरावी लागू शकते.",
      gu: "સરકારી (TK, AOK, Barmer) અને ખાનગી વીમા કંપનીઓ વિકલ્પ છે. તમારા નોકરીદાતા કે યુનિવર્સિટી માર્ગદર્શન આપી શકે, અને વીમામાં ખાલી સમય રહે તો પાછલી રકમ ભરવી પડી શકે.",
      pa: "ਸਰਕਾਰੀ (TK, AOK, Barmer) ਅਤੇ ਪ੍ਰਾਈਵੇਟ ਬੀਮਾ ਕੰਪਨੀਆਂ ਵਿਕਲਪ ਹਨ। ਤੁਹਾਡਾ ਮਾਲਕ ਜਾਂ ਯੂਨੀਵਰਸਿਟੀ ਸਲਾਹ ਦੇ ਸਕਦੀ ਹੈ, ਅਤੇ ਬੀਮੇ ਵਿੱਚ ਵਕਫ਼ਾ ਪਵੇ ਤਾਂ ਪਿਛਲੀ ਰਕਮ ਭਰਨੀ ਪੈ ਸਕਦੀ ਹੈ।",
      kn: "ಸರ್ಕಾರಿ (TK, AOK, Barmer) ಮತ್ತು ಖಾಸಗಿ ವಿಮಾ ಕಂಪನಿಗಳು ಆಯ್ಕೆಗಳು. ನಿಮ್ಮ ಉದ್ಯೋಗದಾತ ಅಥವಾ ವಿಶ್ವವಿದ್ಯಾಲಯ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಹುದು; ವಿಮೆಯಲ್ಲಿ ಅಂತರವಿದ್ದರೆ ಹಿಂದಿನ ಮೊತ್ತ ಪಾವತಿಸಬೇಕಾಗಬಹುದು.",
      ml: "പൊതു (TK, AOK, Barmer), സ്വകാര്യ ഇൻഷുറർമാർ എന്നിവ ഓപ്ഷനുകളാണ്. നിങ്ങളുടെ തൊഴിലുടമയോ സർവകലാശാലയോ മാർഗനിർദേശം നൽകും; ഇൻഷുറൻസിൽ ഇടവേള വന്നാൽ കുടിശ്ശിക അടയ്ക്കേണ്ടി വന്നേക്കാം."
    }
  },
  {
    id: "traffic",
    icon: "🚦",
    title: {
      en: "Traffic rules",
      hi: "ट्रैफिक नियम",
      ta: "போக்குவரத்து விதிகள்",
      te: "ట్రాఫిక్ నియమాలు",
      bn: "ট্রাফিক নিয়ম",
      mr: "वाहतूक नियम",
      gu: "ટ્રાફિક નિયમો",
      pa: "ਟ੍ਰੈਫਿਕ ਨਿਯਮ",
      kn: "ಸಂಚಾರ ನಿಯಮಗಳು",
      ml: "ട്രാഫിക് നിയമങ്ങൾ"
    },
    summary: {
      en: "Wait for the green pedestrian light, especially around children.",
      hi: "पैदल यात्री की हरी बत्ती का इंतज़ार करें, खासकर बच्चों के पास।",
      ta: "பாதசாரிகளுக்கான பச்சை விளக்கு வரும் வரை காத்திருங்கள், குறிப்பாக குழந்தைகள் அருகில் இருக்கும்போது.",
      te: "పాదచారుల ఆకుపచ్చ లైట్ వచ్చే వరకు ఆగండి, ముఖ్యంగా పిల్లలు ఉన్నప్పుడు.",
      bn: "পথচারীদের সবুজ বাতির জন্য অপেক্ষা করুন, বিশেষ করে শিশুদের কাছে থাকলে।",
      mr: "पादचाऱ्यांसाठी हिरवा दिवा लागेपर्यंत थांबा, विशेषतः मुले आसपास असताना.",
      gu: "રાહદારીની લીલી લાઇટની રાહ જુઓ, ખાસ કરીને બાળકો આસપાસ હોય ત્યારે.",
      pa: "ਪੈਦਲ ਯਾਤਰੀਆਂ ਦੀ ਹਰੀ ਬੱਤੀ ਦੀ ਉਡੀਕ ਕਰੋ, ਖਾਸ ਕਰਕੇ ਬੱਚਿਆਂ ਦੇ ਨੇੜੇ।",
      kn: "ಪಾದಚಾರಿಗಳ ಹಸಿರು ದೀಪಕ್ಕಾಗಿ ಕಾಯಿರಿ, ವಿಶೇಷವಾಗಿ ಮಕ್ಕಳ ಬಳಿ.",
      ml: "കാൽനടയാത്രക്കാരുടെ പച്ച ലൈറ്റിനായി കാത്തിരിക്കുക, പ്രത്യേകിച്ച് കുട്ടികൾ അടുത്തുള്ളപ്പോൾ."
    },
    details: {
      en: "Crossing on red can be fined and sets a poor example for children. Cyclists should use bike lanes where available and have working lights after dark.",
      hi: "लाल बत्ती पर सड़क पार करने पर जुर्माना लग सकता है और यह बच्चों के सामने बुरा उदाहरण बनता है। साइकिल चालकों को जहाँ उपलब्ध हो वहाँ बाइक लेन का उपयोग करना चाहिए और अँधेरे के बाद चालू लाइट रखनी चाहिए।",
      ta: "சிவப்பு விளக்கில் சாலையைக் கடந்தால் அபராதம் விதிக்கப்படலாம்; குழந்தைகளுக்கும் தவறான முன்மாதிரியாகும். சைக்கிள் ஓட்டுபவர்கள் இருக்கும் இடங்களில் சைக்கிள் பாதையைப் பயன்படுத்த வேண்டும்; இருட்டிய பிறகு வேலை செய்யும் விளக்குகள் இருக்க வேண்டும்.",
      te: "ఎరుపు లైట్ వద్ద రోడ్డు దాటితే జరిమానా పడవచ్చు; పిల్లలకు చెడు ఉదాహరణ అవుతుంది. సైక్లిస్టులు అందుబాటులో ఉన్న చోట బైక్ లేన్లను వాడాలి; చీకటి పడ్డాక పనిచేసే లైట్లు ఉండాలి.",
      bn: "লাল বাতিতে রাস্তা পার হলে জরিমানা হতে পারে এবং শিশুদের সামনে এটি খারাপ দৃষ্টান্ত। সাইকেল চালকদের যেখানে আছে সেখানে বাইক লেন ব্যবহার করা উচিত এবং অন্ধকারের পর কার্যকর বাতি রাখা উচিত।",
      mr: "लाल दिव्यावर रस्ता ओलांडल्यास दंड होऊ शकतो आणि मुलांसमोर हे वाईट उदाहरण ठरते. सायकलस्वारांनी उपलब्ध असेल तिथे बाइक लेन वापरावी आणि अंधार पडल्यावर चालू दिवे ठेवावेत.",
      gu: "લાલ લાઇટે રસ્તો ઓળંગવા પર દંડ થઈ શકે છે અને બાળકો સામે તે ખરાબ ઉદાહરણ બને છે. સાયકલ ચલાવનારાએ જ્યાં ઉપલબ્ધ હોય ત્યાં બાઇક લેન વાપરવી અને અંધારા પછી ચાલુ લાઇટ રાખવી.",
      pa: "ਲਾਲ ਬੱਤੀ ਤੇ ਸੜਕ ਪਾਰ ਕਰਨ ਤੇ ਜੁਰਮਾਨਾ ਲੱਗ ਸਕਦਾ ਹੈ ਅਤੇ ਬੱਚਿਆਂ ਸਾਹਮਣੇ ਇਹ ਮਾੜੀ ਮਿਸਾਲ ਬਣਦੀ ਹੈ। ਸਾਈਕਲ ਚਾਲਕਾਂ ਨੂੰ ਜਿੱਥੇ ਹੋਵੇ ਉੱਥੇ ਬਾਈਕ ਲੇਨ ਵਰਤਣੀ ਚਾਹੀਦੀ ਹੈ ਅਤੇ ਹਨੇਰੇ ਤੋਂ ਬਾਅਦ ਚਾਲੂ ਲਾਈਟਾਂ ਰੱਖਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ।",
      kn: "ಕೆಂಪು ದೀಪದಲ್ಲಿ ರಸ್ತೆ ದಾಟಿದರೆ ದಂಡ ವಿಧಿಸಬಹುದು ಮತ್ತು ಮಕ್ಕಳಿಗೆ ಕೆಟ್ಟ ಮಾದರಿಯಾಗುತ್ತದೆ. ಸೈಕಲ್ ಸವಾರರು ಲಭ್ಯವಿರುವ ಕಡೆ ಬೈಕ್ ಲೇನ್ ಬಳಸಬೇಕು ಮತ್ತು ಕತ್ತಲೆಯ ನಂತರ ಕೆಲಸ ಮಾಡುವ ದೀಪಗಳಿರಬೇಕು.",
      ml: "ചുവപ്പ് ലൈറ്റിൽ റോഡ് മുറിച്ചുകടന്നാൽ പിഴ ചുമത്തിയേക്കാം, കുട്ടികൾക്ക് മോശം മാതൃകയുമാകും. സൈക്കിൾ യാത്രക്കാർ ലഭ്യമായിടത്ത് ബൈക്ക് ലെയ്ൻ ഉപയോഗിക്കണം, ഇരുട്ടിയ ശേഷം പ്രവർത്തിക്കുന്ന ലൈറ്റുകളും വേണം."
    }
  }
];

const GROCERY_SUBSTITUTES = [
  { item: 'Paneer', substitute: 'Hirtenkäse or Halloumi', note: 'Halloumi holds its shape when fried. For soft paneer, press fresh Quark in a cheesecloth.' },
  { item: 'Atta (wheat flour)', substitute: 'Weizenmehl Type 1050 or Vollkornmehl', note: 'Look for chapati / atta flour in Indian or Asian stores for the best rotis.' },
  { item: 'Dahi (curd)', substitute: 'Naturjoghurt (3.5% fat)', note: 'Choose plain yogurt without added sugar or fruit; Turkish-style yogurt works well.' },
  { item: 'Ghee', substitute: 'Butterschmalz', note: 'Sold in jars near the butter and oils in most supermarkets.' }
];

// NOTE: this is a publishable key, so it is fine in the browser, but make sure
// Row Level Security is ON for public_posts_germany (allow only select + insert).
const supabaseUrl = 'https://auidzdcvivgcndeyhfgd.supabase.co';
const supabaseKey = 'sb_publishable_JmnBDLOHFbCQuV3p_ojRkA_yS9-Uqhi';
const supabase = createClient(supabaseUrl, supabaseKey);

// ---------- small helpers ----------
const lsGet = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch (e) {
    return fallback;
  }
};
const lsSet = (key, value) => {
  try { localStorage.setItem(key, value); } catch (e) {}
};
const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700' +
  '&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700' +
  '&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700' +
  '&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@400;500;600;700' +
  '&family=Noto+Sans+Kannada:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&display=swap';
const FONT_STACK =
  "'Noto Sans','Noto Sans Devanagari','Noto Sans Tamil','Noto Sans Telugu','Noto Sans Bengali'," +
  "'Noto Sans Gujarati','Noto Sans Gurmukhi','Noto Sans Kannada','Noto Sans Malayalam',system-ui,sans-serif";

const TEXT_SIZE_PX = { normal: 16, large: 18, xl: 20 };

// Reusable card for shops, restaurants, temples and parks
function PlaceCard({ place, nf, t, tone = 'amber', city }) {
  const badge = tone === 'emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';
  const star = tone === 'emerald' ? 'fill-emerald-500 text-emerald-500' : 'fill-amber-500 text-amber-500';
  const rating = Number(place.rating);
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex justify-between items-start gap-3">
        <h4 className="font-bold text-slate-900 text-base">{place.name}</h4>
        {!Number.isNaN(rating) && (
          <span className={`${badge} text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0`}>
            <Star className={`w-3 h-3 ${star}`} /> {nf(rating, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" />{place.address}</p>
      {place.note && <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{place.note}</p>}
      <a href={mapsUrl(`${place.name} ${place.address} ${city}`)} target="_blank" rel="noreferrer" className="text-xs font-medium text-indigo-700 hover:underline inline-flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5" />{t.openGoogleMaps}
      </a>
    </div>
  );
}

export default function App() {
  // ---------- language ----------
  const [selectedLang, setSelectedLang] = useState(() => {
    const saved = lsGet('pravasi_lang', null);
    return saved && INDIAN_LANGUAGES.some((l) => l.code === saved) ? saved : detectLang();
  });
  const [showLangModal, setShowLangModal] = useState(false);

  const t = useMemo(() => getText(selectedLang), [selectedLang]);
  const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === selectedLang) || INDIAN_LANGUAGES[0];
  const nf = (n, opts) => new Intl.NumberFormat(currentLangObj.locale, opts).format(n);
  const L = (obj) => pickLang(obj, selectedLang);

  // ---------- location, tabs, text size ----------
  const [selectedState, setSelectedState] = useState(GERMANY_CONFIG.states[0].name);
  const [selectedCity, setSelectedCity] = useState(GERMANY_CONFIG.states[0].cities[0]);
  const [activeTab, setActiveTab] = useState('journey');
  const [textSize, setTextSize] = useState(() => lsGet('pravasi_text_size', 'normal'));

  // ---------- currency ----------
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [inrAmount, setInrAmount] = useState('100000');
  const [eurAmount, setEurAmount] = useState(String(Math.round(100000 / GERMANY_CONFIG.rateToInr)));

  // ---------- emergency card (saved on device) ----------
  const [showEmergencyCard, setShowEmergencyCard] = useState(false);
  const [familyPhone, setFamilyPhone] = useState(() => lsGet('pravasi_family_phone', ''));
  const [homeAddress, setHomeAddress] = useState(() => lsGet('pravasi_home_address', ''));

  // ---------- roadmap progress (saved on device) ----------
  const [completedTasks, setCompletedTasks] = useState(() => {
    try { return JSON.parse(lsGet('pravasi_tasks', 'null')) || { sim_connectivity: true }; } catch (e) { return { sim_connectivity: true }; }
  });

  // ---------- custom restaurants ----------
  const [customRestaurants, setCustomRestaurants] = useState(() => {
    try { return JSON.parse(lsGet('pravasi_germany_custom_restaurants', '[]')); } catch (e) { return []; }
  });
  const [showAddRestModal, setShowAddRestModal] = useState(false);
  const [newRestForm, setNewRestForm] = useState({ name: '', address: '', rating: '4.5', note: '' });

  // ---------- chat ----------
  const [hasJoinedChat, setHasJoinedChat] = useState(() => !!lsGet('pravasi_chat_name', ''));
  const [chatName, setChatName] = useState(() => lsGet('pravasi_chat_name', ''));
  const [composeText, setComposeText] = useState('');
  const [publicPosts, setPublicPosts] = useState([]);

  // ---------- effects ----------
  // Language: persist, set <html lang>, load Indic fonts once
  useEffect(() => {
    lsSet('pravasi_lang', selectedLang);
    document.documentElement.lang = selectedLang;
  }, [selectedLang]);

  useEffect(() => {
    if (document.getElementById('pravasi-fonts')) return;
    const link = document.createElement('link');
    link.id = 'pravasi-fonts';
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);

  // Text size: scale the root so every rem-based Tailwind class grows
  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_SIZE_PX[textSize] || 16}px`;
    lsSet('pravasi_text_size', textSize);
  }, [textSize]);

  useEffect(() => { lsSet('pravasi_tasks', JSON.stringify(completedTasks)); }, [completedTasks]);
  useEffect(() => { lsSet('pravasi_germany_custom_restaurants', JSON.stringify(customRestaurants)); }, [customRestaurants]);
  useEffect(() => { lsSet('pravasi_family_phone', familyPhone); }, [familyPhone]);
  useEffect(() => { lsSet('pravasi_home_address', homeAddress); }, [homeAddress]);

  const addPost = (p) =>
    setPublicPosts((prev) => (prev.some((x) => String(x.id) === String(p.id)) ? prev : [p, ...prev]));

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('public_posts_germany').select('*').order('id', { ascending: false });
      if (data && data.length > 0) {
        setPublicPosts(data.map((p) => ({ ...p, author_name: p.author_name || p.authorName })));
      } else {
        setPublicPosts([
          { id: 101, author_name: 'Rahul M.', text: 'Landing in Frankfurt next week. Can someone guide me on getting a TK health insurance certificate?', time: '10:30' },
          { id: 102, author_name: 'Priya S.', text: 'Does anyone know how long Bürgeramt appointments take in Munich right now?', time: '09:15' }
        ]);
      }
    }
    fetchPosts();

    const sub = supabase
      .channel('public_posts_germany_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'public_posts_germany' }, (payload) => addPost(payload.new))
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  // ---------- handlers ----------
  const joinChat = (e) => {
    e.preventDefault();
    if (chatName.trim()) {
      lsSet('pravasi_chat_name', chatName.trim());
      setHasJoinedChat(true);
    }
  };

  const handlePostToBoard = async (e) => {
    e.preventDefault();
    const text = composeText.trim();
    if (!text) return;
    const draft = {
      id: Date.now(),
      author_name: chatName || 'Anonymous',
      text,
      time: new Date().toLocaleTimeString(currentLangObj.locale, { hour: '2-digit', minute: '2-digit' })
    };
    setComposeText('');
    const { data, error } = await supabase.from('public_posts_germany').insert([draft]).select().single();
    addPost(error || !data ? draft : data);
  };

  const handleAddRestaurant = (e) => {
    e.preventDefault();
    if (!newRestForm.name.trim() || !newRestForm.address.trim()) return;
    setCustomRestaurants([{ city: selectedCity, ...newRestForm }, ...customRestaurants]);
    setNewRestForm({ name: '', address: '', rating: '4.5', note: '' });
    setShowAddRestModal(false);
  };

  const onInrChange = (val) => {
    setInrAmount(val);
    setEurAmount(val === '' ? '' : String(Math.round(Number(val) / GERMANY_CONFIG.rateToInr)));
  };
  const onEurChange = (val) => {
    setEurAmount(val);
    setInrAmount(val === '' ? '' : String(Math.round(Number(val) * GERMANY_CONFIG.rateToInr)));
  };

  // ---------- derived data ----------
  const cityDir = CITY_SPECIFIC_DIRECTORY[selectedCity] || null;
  const cityRestaurants = [
    ...(cityDir ? cityDir.restaurants : []),
    ...customRestaurants.filter((r) => r.city === selectedCity)
  ];
  const tabs = [
    { id: 'journey', label: t.tabs.journey, icon: Compass },
    { id: 'offices', label: t.tabs.offices, icon: Building2 },
    { id: 'regulations', label: t.tabs.regulations, icon: Scale },
    { id: 'essentials', label: t.tabs.essentials, icon: Stethoscope },
    { id: 'desiRadar', label: t.tabs.desiRadar, icon: ShoppingBag },
    { id: 'community', label: t.tabs.community, icon: Users },
    { id: 'chat', label: t.tabs.chat, icon: MessageCircle },
    { id: 'about', label: t.tabs.about, icon: Info }
  ];
  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const stripColon = (s) => s.replace(/[:：]\s*$/, '');

  // Shown when we have no curated list for the selected city
  const NoCityData = ({ queries }) => (
    <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl space-y-3 text-sm">
      <p className="text-slate-700">{fmt(t.noCityData, { city: selectedCity })}</p>
      <div className="flex flex-wrap gap-3">
        {queries.map((q) => (
          <a key={q} href={mapsUrl(`${q} ${selectedCity}`)} target="_blank" rel="noreferrer" className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-slate-400" />{q}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col" style={{ fontFamily: FONT_STACK }}>

      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm z-40 relative">
        <div className="flex items-center gap-3 flex-wrap font-medium">
          <span className="bg-slate-800 text-slate-100 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-slate-700">
            {GERMANY_CONFIG.flag} {GERMANY_CONFIG.name}
          </span>
          <span className="hidden sm:inline">{t.policeAmbulance} <strong className="text-white tracking-wider">{GERMANY_CONFIG.emergencyPhone}</strong></span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">{t.nonEmergencyDoc} <strong className="text-white tracking-wider">{GERMANY_CONFIG.medicalOnCall}</strong></span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowCurrencyModal(!showCurrencyModal)} className="hover:bg-slate-800 px-3 py-1 rounded-md text-amber-400 font-medium text-[11px] border border-slate-700 transition">
            <span>{GERMANY_CONFIG.currency}</span>
            <span className="ml-1 opacity-80">1 {GERMANY_CONFIG.symbol} ≈ ₹{nf(GERMANY_CONFIG.rateToInr, { maximumFractionDigits: 2 })}</span>
          </button>
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 text-[11px] border border-slate-700">
            {[['normal', 'A'], ['large', 'A+'], ['xl', 'A++']].map(([id, label]) => (
              <button key={id} onClick={() => setTextSize(id)} className={`px-2.5 py-1 rounded-md transition ${textSize === id ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-400'}`}>{label}</button>
            ))}
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
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1">
                <span className="text-slate-400 ml-1">₹</span>
                <input type="number" min="0" value={inrAmount} onChange={(e) => onInrChange(e.target.value)} className="w-24 bg-transparent font-semibold text-slate-900 focus:outline-none" />
              </div>
              <span className="font-medium text-slate-400">≈</span>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1">
                <span className="text-slate-400 ml-1">{GERMANY_CONFIG.symbol}</span>
                <input type="number" min="0" value={eurAmount} onChange={(e) => onEurChange(e.target.value)} className="w-20 bg-transparent font-semibold text-indigo-700 focus:outline-none" />
              </div>
              <button onClick={() => setShowCurrencyModal(false)} aria-label="Close" className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADER */}
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
                const st = GERMANY_CONFIG.states.find((s) => s.name === e.target.value);
                setSelectedState(st.name);
                setSelectedCity(st.cities[0]);
              }} className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer">
                {GERMANY_CONFIG.states.map((st) => (<option key={st.name} value={st.name}>{st.name}</option>))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer">
                {GERMANY_CONFIG.states.find((s) => s.name === selectedState)?.cities.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <button onClick={() => setShowEmergencyCard(true)} className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold px-4 py-2 rounded-xl transition text-sm border border-rose-200 shadow-sm ml-2">
              <Phone className="w-4 h-4" /><span>{t.lostHelpBtn}</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto pt-2 pb-3">
          {tabs.map((tab) => {
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

      {/* 3. MAIN */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">

        {/* TAB 1: ROADMAP */}
        {activeTab === 'journey' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-800"></div>
              <div className="pl-2">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">{t.roadmapBadge}</span>
                  <span className="text-sm font-medium text-slate-500">{selectedCity}, {selectedState}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{t.roadmapHeading}</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{t.roadmapSub}</p>
              </div>
              <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 text-center shrink-0">
                <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider mb-1">{t.progress}</span>
                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                  <span className="text-3xl font-bold">{nf(doneCount)}</span>
                  <span className="text-lg text-slate-400">/ {nf(GERMANY_ROADMAP_TASKS.length)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMANY_ROADMAP_TASKS.map((task) => {
                const isDone = !!completedTasks[task.id];
                const critical = task.urgency === 'Critical';
                return (
                  <div key={task.id} className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 flex flex-col justify-between gap-6 border ${isDone ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:shadow-md'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                          {fmt(t.dayRange, { a: nf(task.dayFrom), b: nf(task.dayTo) })}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${critical ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                          {critical ? t.urgCritical : t.urgImportant}
                        </span>
                      </div>
                      <h3 className={`font-bold text-lg ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</h3>
                      <div className="bg-amber-50 p-4 rounded-2xl text-sm border border-amber-100/50">
                        <span className="text-[10px] font-bold text-amber-800 block uppercase tracking-wider mb-1">{t.simpleBriefHeading}</span>
                        <p className="font-medium text-slate-800 leading-relaxed">{L(task.brief)}</p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{task.whyImportant}</p>
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">{t.actionPlanHeading}</span>
                        {task.steps.map((st, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-semibold">{nf(i + 1)}</span>
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Building2 className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">{t.officeSectionTitle}</h2>
                </div>
                <p className="text-sm text-slate-500 max-w-2xl">{t.officesSub}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_OFFICES.map((office) => (
                <div key={office.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 inline-block">{office.category}</span>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{office.name}</h3>
                    <p className="text-sm text-slate-600 flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span className="leading-relaxed">{office.address}</span></p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm space-y-1.5"><p className="font-medium text-slate-700">{t.transitLabel}</p><p className="text-slate-500">{office.metro}</p></div>
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-sm space-y-1.5"><p className="font-medium text-amber-900 flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-70" /><span>{t.hoursLabel}</span></p><p className="text-slate-700 leading-relaxed">{office.hoursTip}</p></div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                    <a href={mapsUrl(`${office.mapsQuery} ${selectedCity}`)} target="_blank" rel="noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 border border-slate-200 shadow-sm transition"><Navigation className="w-4 h-4 text-slate-400" /><span>{t.openGoogleMaps}</span></a>
                    <a href={office.portalUrl} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-sm transition"><Globe className="w-4 h-4 opacity-80" /><span>{t.openPortal}</span></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REGULATIONS */}
        {activeTab === 'regulations' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <div className="pl-2">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest">{t.regulationsBadge}</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{t.regulationsHeading}</h2>
                <p className="text-sm text-slate-500 mt-1">{t.regulationsSub}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GERMAN_REGULATIONS.map((reg) => (
                <div key={reg.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{reg.icon}</span>
                    <h3 className="font-bold text-lg text-slate-900">{L(reg.title)}</h3>
                  </div>
                  <p className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-100">{L(reg.summary)}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{L(reg.details)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOSPITALS & PHARMACIES */}
        {activeTab === 'essentials' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400 rounded-l-3xl"></div>
              <div className="pl-2">
                <h3 className="font-bold text-rose-900 flex items-center gap-2.5 text-lg"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>{t.liveMedicalLocator}</h3>
                <p className="text-sm text-rose-700 mt-1.5 max-w-md leading-relaxed">{t.gpsMedicalDesc}</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href={mapsUrl(`Krankenhaus Hospital ${selectedCity}`)} target="_blank" rel="noreferrer" className="bg-white hover:bg-rose-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">{t.hospitalBtn}</a>
                <a href={mapsUrl(`Notdienst Apotheke ${selectedCity}`)} target="_blank" rel="noreferrer" className="bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 shadow-sm transition">{t.pharmacyBtn}</a>
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
                    <a href={`tel:${hosp.phone.replace(/\s/g, '')}`} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"><Phone className="w-4 h-4" /><span>{t.callWord} {hosp.phone}</span></a>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-base">{t.babyTitle}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{t.babyBody}</p>
            </div>
          </div>
        )}

        {/* TAB 5: DESI RADAR */}
        {activeTab === 'desiRadar' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-3xl"></div>
              <div className="pl-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2.5 text-lg"><span>🛒</span> {t.tabs.desiRadar} · {selectedCity}</h3>
                <p className="text-sm text-slate-500 mt-1.5">{t.desiSub}</p>
              </div>
              <button onClick={() => setShowAddRestModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-5 rounded-2xl transition shadow-sm shrink-0 flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> {t.addPlaceBtn}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">{fmt(t.groceryTitle, { city: selectedCity })}</h3>
              {cityDir ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityDir.groceries.map((s, i) => <PlaceCard key={i} place={s} nf={nf} t={t} city={selectedCity} />)}
                </div>
              ) : <NoCityData queries={['Indian grocery store', 'Asia Markt']} />}
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-slate-900">{fmt(t.restTitle, { city: selectedCity })}</h3>
              {cityRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityRestaurants.map((r, i) => <PlaceCard key={i} place={r} nf={nf} t={t} city={selectedCity} />)}
                </div>
              ) : <NoCityData queries={['Indian restaurant']} />}
            </div>

            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-slate-900">{t.substitutesTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GROCERY_SUBSTITUTES.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between gap-2"><h4 className="font-bold text-slate-900 text-base">{sub.item}</h4><span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase">{t.safeAlternative}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1"><span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">{t.shelfLabel}</span><span className="text-sm font-bold text-slate-800 block">{sub.substitute}</span></div>
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
            <div className="bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-400 rounded-l-3xl"></div>
              <div className="pl-2 mb-6">
                <h3 className="font-bold text-slate-800 text-lg">{fmt(t.templesTitle, { city: selectedCity })}</h3>
                <p className="text-sm text-slate-500 mt-1.5">{t.templesSub}</p>
              </div>
              {cityDir ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                  {cityDir.temples.map((p, i) => <PlaceCard key={i} place={p} nf={nf} t={t} city={selectedCity} />)}
                </div>
              ) : <div className="pl-2"><NoCityData queries={['Hindu temple', 'Gurudwara']} /></div>}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">{fmt(t.parksTitle, { city: selectedCity })}</h3>
              {cityDir ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityDir.parks.map((p, i) => <PlaceCard key={i} place={p} nf={nf} t={t} tone="emerald" city={selectedCity} />)}
                </div>
              ) : <NoCityData queries={['Park']} />}
            </div>
          </div>
        )}

        {/* TAB 7: CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[700px] flex flex-col overflow-hidden animate-in fade-in duration-500">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
              <div className="font-bold text-sm text-slate-800">{t.boardTitle}</div>
            </div>

            {!hasJoinedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-slate-200">👋</div>
                <div><h4 className="font-bold text-xl text-slate-900 mb-2">{t.joinTitle}</h4><p className="text-sm text-slate-500 max-w-sm mx-auto">{t.joinSub}</p></div>
                <form onSubmit={joinChat} className="w-full max-w-sm space-y-4 pt-4">
                  <input type="text" required placeholder={t.namePh} value={chatName} onChange={(e) => setChatName(e.target.value)} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none text-center font-medium shadow-sm" />
                  <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-2xl shadow-sm hover:bg-slate-800 transition">{t.enterBoard}</button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
                  {publicPosts.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm mt-10">{t.noPosts}</div>
                  ) : (
                    publicPosts.map((post) => (
                      <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                        <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-900">{post.author_name || post.authorName}</span><span className="text-xs text-slate-400">{post.time}</span></div>
                        {/* user posts can be in any language, so don't force a direction or language */}
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words" dir="auto">{post.text}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                  <form onSubmit={handlePostToBoard} className="flex flex-col gap-3">
                    <textarea rows={2} placeholder={t.askPh} value={composeText} onChange={(e) => setComposeText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none resize-none" />
                    <div className="flex justify-end"><button type="submit" disabled={!composeText.trim()} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40">{t.postBtn}</button></div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">{t.aboutHeading}</h2>
              <p className="text-slate-600 leading-relaxed">{t.aboutBody}</p>
            </div>
          </div>
        )}
      </main>

      {/* ADD RESTAURANT MODAL */}
      {showAddRestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">{t.addPlaceBtn} · {selectedCity}</h3>
              <button onClick={() => setShowAddRestModal(false)} aria-label="Close" className="text-slate-400 p-2 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddRestaurant} className="space-y-4">
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">{t.fName}</label><input type="text" required value={newRestForm.name} onChange={(e) => setNewRestForm({ ...newRestForm, name: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">{t.fAddress}</label><input type="text" required value={newRestForm.address} onChange={(e) => setNewRestForm({ ...newRestForm, address: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">{t.fRating}</label><input type="number" step="0.1" max="5" min="1" value={newRestForm.rating} onChange={(e) => setNewRestForm({ ...newRestForm, rating: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200" /></div>
              <div><label className="text-xs font-semibold text-slate-600 block mb-1">{t.fNote}</label><input type="text" value={newRestForm.note} onChange={(e) => setNewRestForm({ ...newRestForm, note: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200" /></div>
              <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl text-sm shadow-sm">{t.saveBtn}</button>
            </form>
          </div>
        </div>
      )}

      {/* EMERGENCY CARD MODAL */}
      {showEmergencyCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border-4 border-rose-500 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] overflow-y-auto">
            <div className="bg-rose-500 text-white p-5 sm:p-6 flex items-center justify-between" lang="de">
              <span className="font-bold text-lg uppercase">{GERMANY_CONFIG.lostCardText.heading}</span>
              <button onClick={() => setShowEmergencyCard(false)} aria-label="Close" className="bg-black/10 text-white rounded-full p-2"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              {/* For the user, in their own language */}
              <p className="text-sm text-slate-600 leading-relaxed">{t.emergencyExplain}</p>

              {/* For the German speaker helping them */}
              <div className="bg-slate-50 border-2 border-rose-100 p-5 rounded-2xl text-slate-900 space-y-3" lang="de">
                <p className="text-[11px] font-bold text-rose-600 uppercase tracking-wider" lang={selectedLang}>{t.showToLocal}</p>
                <p className="text-lg sm:text-xl font-medium leading-relaxed">"{GERMANY_CONFIG.lostCardText.body}"</p>
                {familyPhone && (
                  <p className="font-semibold text-base">{GERMANY_CONFIG.lostCardText.callPrompt} <a href={`tel:${familyPhone.replace(/\s/g, '')}`} className="text-rose-600 underline">{familyPhone}</a></p>
                )}
                {homeAddress && (
                  <p className="font-semibold text-base">{GERMANY_CONFIG.lostCardText.addressPrompt} {homeAddress}</p>
                )}
              </div>

              {/* Editable details, saved on the device */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">{t.familyPhoneLabel}</label>
                  <input type="tel" value={familyPhone} onChange={(e) => setFamilyPhone(e.target.value)} placeholder="+49 …" className="w-full text-sm p-3 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">{t.homeAddressLabel}</label>
                  <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {familyPhone && (
                  <a href={`tel:${familyPhone.replace(/\s/g, '')}`} className="bg-emerald-600 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><Phone className="w-5 h-5" /><span>{t.callFamilyBtn}</span></a>
                )}
                {homeAddress && (
                  <a href={mapsUrl(homeAddress)} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><Navigation className="w-5 h-5" /><span>{t.navigateHome}</span></a>
                )}
                <a href={`tel:${GERMANY_CONFIG.emergencyPhone}`} className="bg-rose-500 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><ShieldAlert className="w-5 h-5" /><span>{t.callWord} {GERMANY_CONFIG.emergencyPhone} · {stripColon(t.policeAmbulance)}</span></a>
                <a href={`tel:${GERMANY_CONFIG.medicalOnCall.replace(/\s/g, '')}`} className="bg-slate-800 text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 text-sm shadow-sm"><Stethoscope className="w-5 h-5" /><span>{t.callWord} {GERMANY_CONFIG.medicalOnCall} · {stripColon(t.nonEmergencyDoc)}</span></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE MODAL */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">{t.selectLangTitle}</h3>
              <button onClick={() => setShowLangModal(false)} aria-label="Close" className="text-slate-400 p-2 rounded-full"><X className="w-5 h-5" /></button>
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
          <p className="max-w-xl mx-auto opacity-70">{t.aboutBody}</p>
        </div>
      </footer>
    </div>
  );
}
