import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translateEng from "locates/en/translate.json";
import translateVi from "locates/vi/translate.json";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: translateEng,
    },
    vi: {
      translations: translateVi,
    },
  },
  fallbackLng: "en",
  debug: true,

  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false,

  interpolation: {
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
