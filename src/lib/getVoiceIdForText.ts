export const getVoiceIdByLang = (lang: "ar" | "en" | "other"): string => {
    switch (lang) {
        case "ar":
            return "Zeina";
        case "en":
            return "Joanna";
        default:
            return "Joanna";
    }
};
