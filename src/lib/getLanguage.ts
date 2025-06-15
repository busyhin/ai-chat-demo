import i18n from "i18next";

export const isCurrentLangEn = (): boolean => {
    return i18n.language === "en";
};

export const getDetectedLanguage = (text: string): "ar" | "en" | "other" => {
    const arabicRegex = /[\u0600-\u06FF]/;
    const latinRegex = /[a-zA-Z]/;

    if (arabicRegex.test(text)) return "ar";
    if (latinRegex.test(text)) return "en";
    return "other";
};
