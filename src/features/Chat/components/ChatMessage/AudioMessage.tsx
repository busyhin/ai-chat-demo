import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { v4 as uuidv4 } from "uuid";

import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { pollyClient, pollyClientAudioState, setPlayingId } from "@/services/awsPollyClient.ts";
import { VoiceId } from "@aws-sdk/client-polly/dist-types/models/models_0";
import { PlayIcon } from "@/icons/PlayIcon.tsx";
import { Loader2Icon, PauseIcon } from "lucide-react";
import { getDetectedLanguage } from "@/lib/getLanguage.ts";
import { getVoiceIdByLang } from "@/lib/getVoiceIdForText.ts";

type AudioMessageProps = {
    text: string;
    isUser?: boolean;
};

export const AudioMessage = ({ text, isUser }: AudioMessageProps) => {
    const idRef = useRef(uuidv4());
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const messageLanguage = getDetectedLanguage(text);
    const voiceId = getVoiceIdByLang(messageLanguage);

    const stopCurrentAudio = () => {
        if (pollyClientAudioState.current) {
            pollyClientAudioState.current.pause();
            pollyClientAudioState.current.currentTime = 0;
            pollyClientAudioState.current = null;
        }
        setPlayingId(null);
    };

    const synthesizeAndPlay = async () => {
        setIsLoading(true);
        try {
            stopCurrentAudio();

            const command = new SynthesizeSpeechCommand({
                OutputFormat: "mp3",
                Text: text,
                VoiceId: voiceId as VoiceId,
            });
            const response = await pollyClient.send(command);
            const audioBuffer = await response.AudioStream?.transformToByteArray();
            if (!audioBuffer) return;

            const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            audioRef.current = audio;
            pollyClientAudioState.current = audio;
            setPlayingId(idRef.current);

            audio.onended = () => {
                setIsPlaying(false);
                pollyClientAudioState.current = null;
                setPlayingId(null);
            };

            audio.play();
            setIsPlaying(true);
        } catch (err) {
            console.error("Polly error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePlayback = () => {
        const audio = audioRef.current;
        if (!audio) {
            synthesizeAndPlay();
        } else if (audio.paused) {
            stopCurrentAudio();
            audio.play();
            setIsPlaying(true);
            pollyClientAudioState.current = audio;
            setPlayingId(idRef.current);
        } else {
            audio.pause();
            setIsPlaying(false);
            setPlayingId(null);
        }
    };

    useEffect(() => {
        const handler = (e: Event) => {
            const id = (e as CustomEvent).detail;
            if (id !== idRef.current) {
                setIsPlaying(false);
            }
        };
        window.addEventListener("polly-playing-changed", handler);
        return () => window.removeEventListener("polly-playing-changed", handler);
    }, []);

    return (
        <Button
            className={`absolute bottom-[-10px] !h-auto !p-[4px] !rounded-full cursor-pointer ${
                isUser ? "ltr:left-[-12px] rtl:right-[-12px]" : "ltr:right-[-12px] rtl:left-[-12px]"
            }`}
            onClick={togglePlayback}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2Icon className="animate-spin w-4 h-4" />
            ) : isPlaying ? (
                <PauseIcon className="w-4 h-4" />
            ) : (
                <PlayIcon className="w-4 h-4" />
            )}
        </Button>
    );
};
