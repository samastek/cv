const arMessages = {
  name: "سامي الزين",
  initials: "س.ز",
  location: "نورمبرغ، ألمانيا",
  about: "مهندس برمجيات بروح الفريق والحزم وأسلوب عمل موجه نحو الحلول",
  summary: "مهندس برمجيات مُخلص يتمتع بفهم رياضي قوي واستعداد مستمر للتعلم. أحمل روح الفريق والحزم والقدرة على التفكير والعمل بشكل مستقل. مثابرتي وانضباطي الذاتي يدفعانني لتقديم نتائج موجهة نحو الحلول في البيئات التقنية المتحدية.",
  
  // Section headings
  sections: {
    workExperience: "الخبرة المهنية",
    education: "التعليم",
    recognitions: "الجوائز والتقديرات",
    languages: "اللغات",
    skills: "المهارات والتقنيات",
    projects: "المشاريع",
    personalInfo: "المعلومات الشخصية",
    interests: "الاهتمامات"
  },
  
  // Work experience
  work: {
    siemens: {
      title: "مطور برمجيات البحث والتطوير",
      description: "قيادة تطوير حلول برمجيات مبتكرة لأنظمة الأتمتة الصناعية. متخصص في تطوير الواجهة الخلفية Java/Spring Boot وتكامل الأنظمة وأنظمة Linux المدمجة. المساهمة في منصات إنترنت الأشياء من الجيل التالي وحلول المصانع الرقمية التي تعزز كفاءة التصنيع وموثوقيته."
    },
    adorsys: {
      title: "مهندس برمجيات",
      description: "مهندس برمجيات يعمل مع Java و Spring Boot و Spring Security و OAuth2 و Maven و Hibernate و JUnit5 و Mockito. خبرة مع Angular و Flutter و Jenkins و Docker و Helm و OpenShift. جزء من برنامج الدراسة المزدوجة بالتعاون مع الجامعة التقنية في نورمبرغ."
    }
  },
  
  // Education
  education: {
    university: {
      school: "الجامعة التقنية في نورمبرغ (Technische Hochschule Nürnberg)",
      degree: "درجة البكالوريوس المزدوجة I.C.S. في علوم الحاسوب",
      description: "بالتعاون مع adorsys GmbH & CO KG، الدرجة النهائية: 2.0"
    },
    abitur: {
      school: "مؤهل القبول الجامعي العام",
      degree: "البكالوريا الألمانية (Abitur)",
      description: "الدرجة النهائية: 1.5 (صادرة عن مكتب الاعتراف الألماني للتعليم الأجنبي)"
    }
  },
  
  // Recognitions
  recognitions: {
    scholarship: {
      title: "منحة ألمانيا (Deutschlandstipendium)",
      organization: "الجامعة التقنية في نورمبرغ",
      type: "منحة دراسية",
      description: "منحة دراسية قائمة على الجدارة تُمنح للتميز الأكاديمي والإمكانات في علوم الحاسوب."
    },
    sponsorship: {
      title: "ترشيح برنامج الرعاية I.C.S.",
      organization: "الجامعة التقنية في نورمبرغ",
      type: "تقدير أكاديمي",
      description: "تم ترشيحي واختياري لبرنامج الرعاية I.C.S. تقديراً للأداء الأكاديمي المتميز في برنامج الدراسة المزدوجة."
    },
    excellence: {
      title: "أداء أكاديمي ممتاز",
      organization: "مؤهل القبول الجامعي العام",
      type: "إنجاز أكاديمي",
      description: "حققت درجة نهائية 1.5 في مؤهل القبول الجامعي العام (Abitur)."
    }
  },
  
  // Languages with proficiency levels
  languageSkills: {
    arabic: {
      language: "العربية",
      proficiency: "لغة أم"
    },
    german: {
      language: "الألمانية",
      proficiency: "طلاقة"
    },
    english: {
      language: "الإنجليزية",
      proficiency: "جيد جداً"
    }
  },
  
  // Personal info labels
  personalInfo: {
    dateOfBirth: "تاريخ الميلاد",
    placeOfBirth: "مكان الميلاد",
    nationality: "الجنسية",
    maritalStatus: "الحالة الاجتماعية",
    values: {
      dateOfBirth: "01 سبتمبر 1997",
      placeOfBirth: "حمص",
      nationality: "ألماني",
      maritalStatus: "متزوج"
    }
  },
  
  // Interests
  interestsList: [
    "المشاركة الاجتماعية: دعم اللاجئين، الترجمة، دعم تعلم اللغة الألمانية",
    "العمل التطوعي مع مودرا (منظمة استشارية)",
    "الموسيقى الكلاسيكية: محب لشوبان وفيفالدي وبرامز",
    "الأدب المهني: أندرو تانينباوم، وليام ستالينغز"
  ],
  
  // Projects
  projects: {
    iot: {
      title: "منصة إنترنت الأشياء الصناعية",
      description: "تطوير حلول شاملة لإنترنت الأشياء للأتمتة الصناعية في شركة سيمنز، مما يتيح المراقبة والتحكم في الوقت الفعلي لعمليات التصنيع."
    },
    financial: {
      title: "حلول البرمجيات المالية",
      description: "تطوير حلول برمجيات مالية قوية في adorsys باستخدام Java ونظام Spring Boot البيئي. التركيز على أنظمة الواجهة الخلفية الآمنة مع مصادقة OAuth2."
    },
    dualStudy: {
      title: "مشروع الدراسة المزدوجة",
      description: "مشروع هندسة برمجيات شامل تم إنجازه كجزء من برنامج الدراسة المزدوجة بالتعاون بين الجامعة التقنية في نورمبرغ و adorsys."
    },
    portfolio: {
      title: "المحفظة الشخصية",
      description: "موقع محفظة حديث يعرض عملي المهني ومهاراتي التقنية. تم بناؤه مع التركيز على الأداء وإمكانية الوصول."
    }
  },
  
  // Footer
  footer: {
    builtWith: "تم البناء باستخدام Next.js & Tailwind CSS",
    visitPortfolio: "زيارة المحفظة",
    comingSoon: "المشاريع قادمة قريباً...",
    focusingOn: "التركيز حالياً على التطوير المهني في شركة سيمنز"
  },
  
  // UI Elements
  ui: {
    languageSelector: "اختيار اللغة",
    timeline: {
      professional: "مهني",
      academic: "أكاديمي",
      current: "حالي",
      technologiesExpertise: "التقنيات والخبرات"
    }
  }
};

export default arMessages;
