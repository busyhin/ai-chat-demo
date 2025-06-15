import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChatInputProps = {
    isLoading?: boolean;
    onSubmit: (message: string) => void;
};

export const ChatInput = ({ isLoading, onSubmit }: ChatInputProps) => {
    const { t, i18n } = useTranslation();
    const [input, setInput] = useState("");
    const [isListening, setListening] = useState(false);
    const recognitionRef = useRef<any | null>(null);
    const isEnglish = i18n.language === "en";

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        onSubmit(trimmed);
        setInput("");
    };

    const startDictation = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = isEnglish ? "en-US" : "ar-SA";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onerror = () => setListening(false);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput((prev) => `${prev} ${transcript}`.trim());
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    return (
        <>
            <div className="flex gap-2 items-end">
                <Textarea
                    className="h-[80px] resize-none text-sm flex-1 !bg-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("typeYourMessage")}
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon" onClick={startDictation}>
                        <Mic
                            className={`h-4 w-4 ${isListening ? "text-red-500 animate-pulse" : ""}`}
                        />
                    </Button>
                    <Button
                        size="icon"
                        onClick={handleSend}
                        title="Send message"
                        disabled={!input.trim() || isLoading}
                    >
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {isListening && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-2 animate-pulse">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                    <span>{t("listening")}</span>
                </div>
            )}
        </>
    );
};
