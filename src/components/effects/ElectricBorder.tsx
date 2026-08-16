import { type ReactNode, type CSSProperties } from "react";

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number; // Ignored for CSS version
  chaos?: number; // Ignored
  thickness?: number; // Ignored
  /** @deprecated use style={{ borderRadius }} */
  borderRadius?: number;
  /** @deprecated use chaos */
  intensity?: "subtle" | "normal" | "intense";
  className?: string;
  style?: CSSProperties;
}

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export default function ElectricBorder({
  children,
  color = "#dd8448",
  borderRadius,
  className = "",
  style,
}: ElectricBorderProps) {
  const rgbColor = hexToRgb(color);
  
  const rad = borderRadius ?? 
    (style && typeof (style as Record<string, unknown>).borderRadius === "number"
      ? (style as Record<string, unknown>).borderRadius as number
      : style?.borderRadius
      ? parseInt(String(style.borderRadius))
      : 14);

  return (
    <div 
      className={`dramatic-card ${className}`}
      style={{
        "--electric-border-color": color,
        "--border-radius": `${rad}px`,
        ...style
      } as any}
    >
      <div className="dramatic-inner">
        <div className="dramatic-border-outer" style={{ borderColor: `rgba(${rgbColor}, 0.5)` }}>
          <div className="dramatic-main-card"></div>
        </div>
        <div className="dramatic-glow-1" style={{ borderColor: `rgba(${rgbColor}, 0.6)` }}></div>
        <div className="dramatic-glow-2"></div>
      </div>
      
      <div className="dramatic-overlay-1"></div>
      <div className="dramatic-overlay-2"></div>
      <div className="dramatic-bg-glow"></div>
      
      <div className="dramatic-content h-full">
        {children}
      </div>
    </div>
  );
}
