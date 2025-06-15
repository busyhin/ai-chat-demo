import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./lang/ar.json";
import en from "./lang/en.json";

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
};

i18n.on("languageChanged", (lng) => {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

i18n.use(LanguageDetector) // 👈 детектор языка
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lng",
            caches: ["localStorage"],
        },
    });

export default i18n;
