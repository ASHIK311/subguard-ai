import { useEffect, useRef } from "react";

export default function HyperspeedEffect({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(active ? 1 : 0);

  useEffect(() => {
    targetSpeedRef.current = active ? 1 : 0;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    interface Star {
      angle: number;
      dist: number;
      speed: number;
      hue: number;
      width: number;
    }

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 0.3 + 0.05,
      speed: Math.random() * 0.004 + 0.002,
      hue: Math.random() > 0.7 ? 280 : Math.random() > 0.5 ? 190 : 200,
      width: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.02;

      ctx.fillStyle = "rgba(5, 7, 11, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const maxDim = Math.max(canvas.width, canvas.height);

      for (const star of stars) {
        const spd = star.speed * (1 + speedRef.current * 15);
        const prevDist = star.dist;
        star.dist += spd * speedRef.current;

        if (star.dist > 1.2) {
          star.dist = 0.01;
          star.angle = Math.random() * Math.PI * 2;
          star.hue = Math.random() > 0.7 ? 280 : 190;
        }

        const x1 = cx + Math.cos(star.angle) * prevDist * maxDim * 0.6;
        const y1 = cy + Math.sin(star.angle) * prevDist * maxDim * 0.6;
        const x2 = cx + Math.cos(star.angle) * star.dist * maxDim * 0.6;
        const y2 = cy + Math.sin(star.angle) * star.dist * maxDim * 0.6;

        const alpha = Math.min(1, star.dist * 2) * speedRef.current;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsla(${star.hue}, 80%, 70%, ${alpha})`;
        ctx.lineWidth = star.width * (0.5 + star.dist);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
