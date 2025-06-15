import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.tsx";

export const LanguageToggle = () => {
    const { i18n } = useTranslation();

    return (
        <Button className="text-base cursor-pointer px-0" variant="link" onClick={onToggle}>
            {i18n.language === "en" ? "العربية" : "English"}
        </Button>
    );

    function onToggle() {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
        const url = new URL(window.location.href);
        url.searchParams.set("lng", newLang);
        window.history.replaceState({}, "", url);
    }
};
