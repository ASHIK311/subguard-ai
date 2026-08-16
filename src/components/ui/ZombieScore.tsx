interface ZombieScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getColor(score: number) {
  if (score >= 76) return "#FB7185";
  if (score >= 51) return "#FBBF24";
  if (score >= 26) return "#38BDF8";
  return "#4ADE80";
}

function getLabel(score: number) {
  if (score >= 76) return "Zombie";
  if (score >= 51) return "At Risk";
  if (score >= 26) return "Watch";
  return "Healthy";
}

export default function ZombieScore({ score, size = "md", showLabel = true }: ZombieScoreProps) {
  const color = getColor(score);
  const label = getLabel(score);
  const radius = size === "lg" ? 36 : size === "sm" ? 22 : 28;
  const stroke = size === "lg" ? 4 : 3;
  const dim = (radius + stroke) * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="#ffffff10"
            strokeWidth={stroke}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)`, transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-bold tabular-nums"
          style={{ color, fontSize: size === "lg" ? 18 : size === "sm" ? 11 : 13 }}
        >
          {score}
        </span>
      </div>
      {showLabel && (
        <span className="text-sm font-medium" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}
