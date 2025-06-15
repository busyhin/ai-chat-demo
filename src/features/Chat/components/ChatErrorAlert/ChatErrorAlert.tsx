import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { CheckCircle2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChatErrorAlertProps = {
    className?: string;
};

export const ChatErrorAlert = ({ className }: ChatErrorAlertProps) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <Alert className="bg-red-50 border-red-400" variant="destructive">
                <CheckCircle2Icon />
                <AlertTitle>{t("somethingWentWrong")}</AlertTitle>
                <AlertDescription>{t("pleaseTryAgainLater")}</AlertDescription>
            </Alert>
        </div>
    );
};
