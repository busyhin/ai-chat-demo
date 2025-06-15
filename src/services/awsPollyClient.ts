import { PollyClient } from "@aws-sdk/client-polly";

export const pollyClient = new PollyClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY!,
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY!,
    },
});

export const pollyClientAudioState = {
    current: null as HTMLAudioElement | null,
    playingId: null as string | null,
};

export const setPlayingId = (id: string | null) => {
    pollyClientAudioState.playingId = id;
    window.dispatchEvent(new CustomEvent("polly-playing-changed", { detail: id }));
};
