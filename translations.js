/**
 * Translations for D STUDIOS Website
 * --------------------------------------
 * This file contains translations for all website content in multiple languages.
 * Currently supported languages: English (en), Kurdish (ku), and Arabic (ar)
 * 
 * To add a new language:
 * 1. Add a new language object to the translations object with the language code as the key
 * 2. Copy all the translation keys from the 'en' object and translate the values
 * 3. Add a button in the language-switcher div in index.html
 * 
 * For RTL (Right-to-Left) languages like Arabic:
 * - The changeLanguage function will automatically add RTL support
 * - RTL-specific styles are defined in styles.css
 */

const translations = {    en: {
        // Navigation
        home: "Home",
        about: "About",
        products: "Products",
    contact: "Contact",
    admin: "Admin",
        
        // Hero Section
        heroTitle: "Premium Digital Products for Professionals",
        heroSubtitle: "Discover our collection of Python GUI apps, AI/ML models, and professional PowerPoint templates.",
        exploreProducts: "Explore Products",
        learnMore: "Learn More",
        
        // About Section
        aboutTitle: "About D STUDIOS",
        aboutDescription: "D STUDIOS was founded by Divan Ezadin with a passion for creating high-quality digital products that help professionals and businesses streamline their workflows and enhance their presentations.",
        ourMission: "Our Mission",
        missionDescription: "To provide innovative digital solutions that simplify complex tasks and empower users to achieve more.",
        ourProducts: "Our Products",
        productsDescription: "We develop Python GUI applications, AI/ML models, and professional PowerPoint templates designed for various industries and use cases.",
        
        // Products Section
        productsTitle: "Our Products",
        productsSubtitle: "Browse our collection of premium digital products",
        allCategories: "All Categories",
        pythonGUI: "Python GUI",
        aimlModels: "AI/ML Models",
        powerpointTemplates: "PowerPoint Templates",
    viewDetails: "View Details",
    viewVideo: "View Video",
        developer: "Developer",
        
        // Features Section
        featuresTitle: "Why Choose Our Products",
        highQuality: "High Quality",
        highQualityDesc: "All our products are crafted with attention to detail and designed to meet professional standards.",
        easyToUse: "Easy to Use",
        easyToUseDesc: "User-friendly interfaces and comprehensive documentation make our products accessible to everyone.",
        customerSupport: "Customer Support",
        customerSupportDesc: "We provide ongoing support to ensure you get the most out of our products.",
        satisfactionGuaranteed: "Satisfaction Guaranteed",
        satisfactionDesc: "Not happy with your purchase? We offer a 30-day money-back guarantee.",
          // Contact Section
        contactTitle: "Get in Touch",
        contactSubtitle: "Have questions or need custom solutions? Reach out to us!",
        fullName: "Full Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        yourName: "Your name",
        yourEmail: "Your email",
        yourMessage: "Your message",
        
        // Footer
        copyright: "© 2025 D STUDIOS by Divan Ezadin. All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        footerTagline: "Premium digital products for professionals",
        linksTitle: "Links",
        emailLabel: "Email",
        supportLabel: "Support",
        emailUs: "Email Us",
        reachOut: "Reach out with questions or inquiries:"
    },    ku: {
        // Navigation
        home: "سەرەکی",
        about: "دەربارە",
        products: "بەرهەمەکان",
    contact: "پەیوەندی",
    admin: "ئا‌دمین",
        
        // Hero Section
        heroTitle: "بەرهەمی دیجیتاڵی باش بۆ پیشەوەران",
        heroSubtitle: "کۆکراوەی بەرنامەکانی Python GUI، مۆدێلەکانی AI/ML و ڕووکاری پاوەرپۆینتی پیشەیی بدۆزەوە.",
        exploreProducts: "بینینی بەرهەمەکان",
        learnMore: "زیاتر بزانە",
        
        // About Section
        aboutTitle: "دەربارەی D STUDIOS",
        aboutDescription: "D STUDIOS لە لایەن دیڤان ئەزەدینەوە دامەزراوە بە حەزێکەوە بۆ دروستکردنی بەرهەمی دیجیتاڵی باش کە یارمەتی پیشەوەران و بیزنسەکان دەدات بۆ ڕێکخستنی کارەکانیان و باشترکردنی پێشکەشکردنەکانیان.",
        ourMission: "ئامانجی ئێمە",
        missionDescription: "دابینکردنی چارەسەری نوێی دیجیتاڵی کە کارە ئاڵۆزەکان سادە دەکاتەوە و توانا دەدات بە بەکارهێنەران بۆ بەدەستهێنانی زیاتر.",
        ourProducts: "بەرهەمەکانی ئێمە",
        productsDescription: "ئێمە بەرنامەکانی Python GUI، مۆدێلەکانی AI/ML و ڕووکاری پاوەرپۆینتی پیشەیی دروست دەکەین کە بۆ پیشەسازی و کەیسی جیاواز دیزاین کراون.",
        
        // Products Section
        productsTitle: "بەرهەمەکانی ئێمە",
        productsSubtitle: "کۆکراوەی بەرهەمە باشەکانمان ببینە",
        allCategories: "هەموو جۆرەکان",
        pythonGUI: "Python GUI",
        aimlModels: "مۆدێلەکانی AI/ML",
        powerpointTemplates: "ڕووکاری پاوەرپۆینت",
    viewDetails: "بینینی وردەکاری",
    viewVideo: "بینینی ڤیدیۆ",
        developer: "دروستکەر",
        
        // Features Section
        featuresTitle: "بۆچی بەرهەمەکانی ئێمە هەڵدەبژێریت",
        highQuality: "کوالێتی بەرز",
        highQualityDesc: "هەموو بەرهەمەکانمان بە وردی دروست کراون و بۆ گەیشتن بە ستانداردی پیشەیی دیزاین کراون.",
        easyToUse: "ئاسان بۆ بەکارهێنان",
        easyToUseDesc: "ڕووکاری بەکارهێنەر دۆستانە و بەڵگەنامەی تەواو دەکات بەرهەمەکانمان بۆ هەمووان بەردەست بن.",
        customerSupport: "پشتگیری کڕیار",
        customerSupportDesc: "ئێمە پشتگیری بەردەوام دابین دەکەین بۆ دڵنیابوون لەوەی کە باشترین سوود لە بەرهەمەکانمان وەردەگریت.",
        satisfactionGuaranteed: "گەرەنتی ڕەزامەندی",
        satisfactionDesc: "لە کڕینەکەت ڕازی نیت؟ ئێمە گەرەنتی ٣٠ ڕۆژی گێڕانەوەی پارە پێشکەش دەکەین.",
          // Contact Section
        contactTitle: "پەیوەندیمان پێوە بکە",
        contactSubtitle: "پرسیارت هەیە یان پێویستت بە چارەسەری تایبەت هەیە؟ پەیوەندیمان پێوە بکە!",
        fullName: "ناوی تەواو",
        email: "ئیمەیل",
        message: "نامە",
        send: "ناردنی نامە",
        yourName: "ناوی خۆت",
        yourEmail: "ئیمەیلی خۆت",
        yourMessage: "نامەی خۆت",
        
        // Footer
        copyright: "© 2025 D STUDIOS بە دیڤان ئەزەدین. هەموو مافەکان پارێزراون.",
        privacyPolicy: "سیاسەتی تایبەتمەندی",
        termsOfService: "مەرجەکانی خزمەتگوزاری",
        footerTagline: "بەرهەمی دیجیتاڵی باش بۆ پیشەوەران",
        linksTitle: "بەستەرەکان",
        emailLabel: "ئیمەیل",
        supportLabel: "پشتگیری",
        emailUs: "ئیمەیلمان بۆ بنێرە",
        reachOut: "بۆ پرسیار یان داواکاری پەیوەندیمان پێوە بکە:"
    },    ar: {
        // Navigation
        home: "الرئيسية",
        about: "حول",
        products: "المنتجات",
    contact: "اتصل بنا",
    admin: "الإدارة",
        
        // Hero Section
        heroTitle: "منتجات رقمية متميزة للمحترفين",
        heroSubtitle: "اكتشف مجموعتنا من تطبيقات واجهة مستخدم بايثون، ونماذج الذكاء الاصطناعي/التعلم الآلي، وقوالب العروض التقديمية الاحترافية.",
        exploreProducts: "استكشاف المنتجات",
        learnMore: "اعرف المزيد",
        
        // About Section
        aboutTitle: "حول D STUDIOS",
        aboutDescription: "تأسست D STUDIOS بواسطة ديفان عزالدين بشغف لإنشاء منتجات رقمية عالية الجودة تساعد المحترفين والشركات على تبسيط سير العمل وتعزيز العروض التقديمية.",
        ourMission: "مهمتنا",
        missionDescription: "توفير حلول رقمية مبتكرة تُبسط المهام المعقدة وتُمكن المستخدمين من تحقيق المزيد.",
        ourProducts: "منتجاتنا",
        productsDescription: "نقوم بتطوير تطبيقات واجهة مستخدم بايثون، ونماذج الذكاء الاصطناعي/التعلم الآلي، وقوالب العروض التقديمية الاحترافية المصممة لمختلف الصناعات وحالات الاستخدام.",
        
        // Products Section
        productsTitle: "منتجاتنا",
        productsSubtitle: "تصفح مجموعتنا من المنتجات الرقمية المتميزة",
        allCategories: "جميع الفئات",
        pythonGUI: "واجهة بايثون",
        aimlModels: "نماذج الذكاء الاصطناعي",
        powerpointTemplates: "قوالب باوربوينت",
    viewDetails: "عرض التفاصيل",
    viewVideo: "عرض الفيديو",
        developer: "المطور",
        
        // Features Section
        featuresTitle: "لماذا تختار منتجاتنا",
        highQuality: "جودة عالية",
        highQualityDesc: "تم صنع جميع منتجاتنا بعناية للتفاصيل ومصممة لتلبية المعايير المهنية.",
        easyToUse: "سهل الاستخدام",
        easyToUseDesc: "واجهات سهلة الاستخدام وتوثيق شامل يجعل منتجاتنا في متناول الجميع.",
        customerSupport: "دعم العملاء",
        customerSupportDesc: "نحن نقدم دعمًا مستمرًا لضمان حصولك على أقصى استفادة من منتجاتنا.",
        satisfactionGuaranteed: "رضا مضمون",
        satisfactionDesc: "غير راضٍ عن مشترياتك؟ نقدم ضمان استرداد الأموال لمدة 30 يومًا.",
          // Contact Section
        contactTitle: "تواصل معنا",
        contactSubtitle: "هل لديك أسئلة أو تحتاج إلى حلول مخصصة؟ تواصل معنا!",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال الرسالة",
        yourName: "اسمك",
        yourEmail: "بريدك الإلكتروني",
        yourMessage: "رسالتك",
        
        // Footer
        copyright: "© 2025 D STUDIOS بواسطة ديفان عزالدين. جميع الحقوق محفوظة.",
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        footerTagline: "منتجات رقمية متميزة للمحترفين",
        linksTitle: "روابط",
        emailLabel: "البريد الإلكتروني",
        supportLabel: "الدعم",
        emailUs: "راسلنا",
        reachOut: "تواصل معنا للأسئلة أو الاستفسارات:"
    }
};

// Default language
let currentLanguage = 'en';

// Function to change the language
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Translation not available for language: ${lang}`);
        return;
    }
    
    currentLanguage = lang;
    
    // Make the current language and translations available globally
    window.currentLanguage = lang;
    window.translations = translations;
    
    // Save the selected language to localStorage
    localStorage.setItem('d-studios-language', lang);
    
    // Update the HTML with the new language
    updateLanguage();
    
    // Update the direction for Arabic (right-to-left)
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl-layout');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-layout');
    }
    
    // Update active language button
    const langButtons = document.querySelectorAll('.language-switcher button');
    langButtons.forEach(button => {
        if (button.id === `lang-${lang}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Dispatch a custom event to notify other scripts about language change
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Function to update all text elements with the translation
function updateLanguage() {
    // Update elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    const currentTranslations = translations[currentLanguage];
    
    elements.forEach(element => {
        const translationKey = element.getAttribute('data-i18n');
        
        if (currentTranslations[translationKey]) {
            // For submit button
            if (element.tagName === 'INPUT' && element.getAttribute('type') === 'submit') {
                element.value = currentTranslations[translationKey];
            }
            // For all other elements
            else {
                element.textContent = currentTranslations[translationKey];
            }
        }
    });
    
    // Update elements with data-i18n-placeholder attribute
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const placeholderKey = element.getAttribute('data-i18n-placeholder');
        if (currentTranslations[placeholderKey]) {
            element.setAttribute('placeholder', currentTranslations[placeholderKey]);
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // First check if there's a saved language preference
    const savedLanguage = localStorage.getItem('d-studios-language');
    
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    } else {
        // Try to detect user's browser language
        const browserLang = navigator.language || navigator.userLanguage;
        let detectedLang = 'en'; // Default to English
        
        // Check if the browser language starts with any of our supported languages
        if (browserLang.startsWith('ar')) {
            detectedLang = 'ar';
        } else if (browserLang.startsWith('ku')) {
            detectedLang = 'ku';
        }
        
        changeLanguage(detectedLang);
    }
});
