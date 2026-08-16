import type { ReactNode } from "react";

type BadgeVariant = "healthy" | "review" | "zombie" | "trial" | "info" | "warning" | "critical" | "purple" | "cyan" | "default";

const variants: Record<BadgeVariant, string> = {
  healthy: "bg-sg-green/15 text-sg-green border-sg-green/30",
  review: "bg-sg-amber/15 text-sg-amber border-sg-amber/30",
  zombie: "bg-sg-red/15 text-sg-red border-sg-red/30",
  trial: "bg-sg-blue/15 text-sg-blue border-sg-blue/30",
  info: "bg-sg-blue/15 text-sg-blue border-sg-blue/30",
  warning: "bg-sg-amber/15 text-sg-amber border-sg-amber/30",
  critical: "bg-sg-critical/15 text-sg-critical border-sg-critical/30",
  purple: "bg-sg-purple/15 text-sg-purple border-sg-purple/30",
  cyan: "bg-sg-cyan/15 text-sg-cyan border-sg-cyan/30",
  default: "bg-white/8 text-sg-text2 border-white/10",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export default function Badge({ variant = "default", children, className = "", dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}
