import { MessageSenderEnum } from "@/features/Chat/constants.ts";
import { cn } from "@/lib/utils.ts";
import { useTranslation } from "react-i18next";
import { AudioMessage } from "@/features/Chat/components/ChatMessage/AudioMessage.tsx";

type ChatMessageProps = {
    className?: string;
    sender: MessageSenderEnum;
    message: string;
};

export const ChatMessage = ({ className, sender, message }: ChatMessageProps) => {
    const { t } = useTranslation();
    const isUser = sender === MessageSenderEnum.USER;

    return (
        <div
            className={cn(
                "w-full mx-auto py-3 flex flex-col",
                isUser ? "items-end" : "items-start",
                className,
            )}
        >
            <span className="mb-1 text-xs font-medium text-neutral-500 select-none">
                {isUser ? t("you") : t("assistant")}
            </span>
            <div
                className={cn(
                    "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm border relative",
                    "max-w-[90%]",
                    isUser
                        ? "bg-neutral-200 text-neutral-900 border-neutral-300"
                        : "bg-white text-neutral-900 border-neutral-200",
                    "text-left rtl:text-right",
                )}
            >
                <p dir="auto">{message}</p>
                <AudioMessage text={message} isUser={isUser} />
            </div>
        </div>
    );
};
