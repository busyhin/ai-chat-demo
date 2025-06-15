import { cn } from "@/lib/utils.ts";

type TypingDotsProps = {
    className?: string;
}

export const TypingDots = ({ className}: TypingDotsProps) => {
    return (
        <div className={cn("flex items-center gap-1 text-gray-500 text-sm px-3 py-2", className)}>
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:200ms]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:400ms]" />
        </div>
    );
};