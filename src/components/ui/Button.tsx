import type { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline" | "cyan";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-sg-purple hover:bg-sg-purple-deep text-white border-transparent",
  secondary: "bg-sg-surface2 hover:bg-sg-elevated text-sg-text border-sg-border hover:border-white/20",
  ghost: "bg-transparent hover:bg-white/5 text-sg-text2 hover:text-sg-text border-transparent",
  danger: "bg-sg-red/15 hover:bg-sg-red/25 text-sg-red border-sg-red/30",
  success: "bg-sg-green/15 hover:bg-sg-green/25 text-sg-green border-sg-green/30",
  outline: "bg-transparent hover:bg-white/5 text-sg-text border-sg-border hover:border-white/30",
  cyan: "bg-sg-cyan/15 hover:bg-sg-cyan/25 text-sg-cyan border-sg-cyan/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  loading,
  icon,
  iconRight,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`inline-flex items-center gap-2 font-medium border transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : icon ? (
        <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && <span className="w-4 h-4 flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
