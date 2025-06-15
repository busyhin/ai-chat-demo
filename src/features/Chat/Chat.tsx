import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle.tsx";
import { MessageSenderEnum } from "@/features/Chat/constants.ts";
import { ChatMessage } from "@/features/Chat/components/ChatMessage/ChatMessage.tsx";
import { ChatInput } from "@/features/Chat/components/ChatInput/ChatInput.tsx";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/api/sendMessage.ts";
import { TypingDots } from "@/features/Chat/components/TypingDots/TypingDots.tsx";
import { ChatErrorAlert } from "@/features/Chat/components/ChatErrorAlert/ChatErrorAlert.tsx";

type MessageType = {
    sender: MessageSenderEnum;
    message: string;
};

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const {
        mutate: handleSend,
        isPending,
        isError,
    } = useMutation({
        mutationFn: async (message: string) => {
            setMessages((prev) => [...prev, { sender: MessageSenderEnum.USER, message: message }]);
            await new Promise((res) => setTimeout(res, 1000));
            return sendMessage(message);
        },
        onSuccess(response) {
            setMessages((prev) => [
                ...prev,
                { sender: MessageSenderEnum.ASSISTANT, message: response },
            ]);
        },
        onError(error) {
            console.error("Error sending message:", error);
        },
    });

    useEffect(() => {
        console.log("deploy test", import.meta.env.VITE_ACCESS_KEY);
        console.log("deploy test", import.meta.env.VITE_API_URL);
    }, []);

    return (
        <div className="w-full h-full flex">
            <div className="container !px-0 flex h-full flex-col flex-grow bg-gradient-to-br from-white via-sky-50 to-sky-100">
                <div className="py-2 flex items-center justify-between gap-6 px-4">
                    <div className="flex gap-2 items-end">
                        <h1 className="font-bold text-2xl">Chat AI</h1>
                        <span className="text-gray-500">(v1.0.0)</span>
                    </div>
                    <LanguageToggle />
                </div>
                <div className="p-4 flex flex-col flex-grow overflow-y-auto">
                    {messages.map((message, idx) => (
                        <ChatMessage key={idx} {...message} />
                    ))}
                    {isPending && <TypingDots className="pt-3 justify-center" />}
                    {isError && <ChatErrorAlert className="py-3" />}
                </div>
                <div className="py-3 px-4">
                    <ChatInput onSubmit={handleSend} isLoading={isPending} />
                </div>
            </div>
        </div>
    );
};
