import { SVGProps } from "@/type/SvgIconTypes.ts";

export function StopIcon({ width = 24, height = 24, color = "currentColor", className }: SVGProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={color}
            className={className}
            viewBox="0 0 24 24"
        >
            <path d="M6 6h12v12H6z" />
        </svg>
    );
}
