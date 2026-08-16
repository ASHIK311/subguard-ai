import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

interface WebThreadsProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  threadCount?: number;
  frequency?: number;
  spread?: number;
  taper?: number;
  position?: number;
  fanMode?: "center" | "left" | "right";
  glow?: number;
  falloff?: number;
  thickness?: number;
  brightness?: number;
  opacity?: number;
  mirror?: boolean;
  shimmer?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToVec3(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const vert = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uSpeed;
  uniform int uThreadCount;
  uniform float uFrequency;
  uniform float uSpread;
  uniform float uTaper;
  uniform float uPosition;
  uniform float uGlow;
  uniform float uFalloff;
  uniform float uThickness;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform bool uMirror;
  uniform bool uShimmer;
  uniform bool uGrain;
  uniform float uGrainIntensity;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 st = vec2(uv.x * aspect, uv.y);

    float t = uTime * uSpeed;
    vec3 finalColor = vec3(0.0);
    float totalAlpha = 0.0;

    float posY = uPosition;
    vec2 mouseOffset = (uMouse - 0.5) * uMouseStrength;

    for (int i = 0; i < 16; i++) {
      if (i >= uThreadCount) break;

      float fi = float(i) / float(uThreadCount);
      float seed = fi * 43.7 + 1.23;

      float spread = uSpread * (fi - 0.5) * 2.0;
      float originX = clamp(0.5 * aspect + spread * aspect + mouseOffset.x * aspect, 0.0, aspect);
      float originY = posY + mouseOffset.y;

      float freq = uFrequency * (0.8 + fi * 0.4);
      float wave = sin((uv.x * freq + t * (0.5 + fi * 0.3)) + seed) * 0.05;
      wave += sin((uv.x * freq * 2.1 + t * 0.7 + seed * 2.0)) * 0.02;
      float threadY = originY + wave;

      float dx = uv.x * aspect - originX;
      float dy = uv.y - threadY;

      float dist = abs(dy);
      float taperX = abs(uv.x - 0.5);
      float taperMask = pow(1.0 - clamp(taperX * 2.0, 0.0, 1.0), uTaper);

      float alpha = exp(-dist * dist / (uThickness * uThickness * 0.001)) * taperMask;
      alpha *= exp(-abs(dx) * uFalloff * 0.3);

      if (uMirror) {
        float mirrorDy = abs(uv.y - (1.0 - threadY + posY * 2.0 - 1.0));
        float mirrorAlpha = exp(-mirrorDy * mirrorDy / (uThickness * uThickness * 0.001)) * taperMask;
        mirrorAlpha *= exp(-abs(dx) * uFalloff * 0.3);
        alpha = max(alpha, mirrorAlpha * 0.5);
      }

      float shimmerVal = uShimmer ? (0.5 + 0.5 * sin(t * 3.0 + fi * 6.28)) : 1.0;
      alpha *= shimmerVal;

      vec3 c1 = uColor1;
      vec3 c2 = uColor2;
      vec3 c3 = uColor3;
      vec3 threadColor = mix(mix(c1, c2, fi), c3, fi * fi);

      finalColor += threadColor * alpha * uBrightness;
      totalAlpha += alpha;
    }

    // Glow
    float glowVal = totalAlpha * uGlow * 2.0;
    finalColor += finalColor * glowVal;

    // Grain
    if (uGrain) {
      float g = hash(uv * 500.0 + vec2(t));
      finalColor += (g - 0.5) * uGrainIntensity;
    }

    float alpha = clamp(totalAlpha * uOpacity, 0.0, 1.0);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const ctxMap = new WeakMap<HTMLElement, { renderer: Renderer; raf: number }>();

export default function WebThreads({
  color1 = "#5227FF",
  color2 = "#FF9FFC",
  color3 = "#FFFFFF",
  speed = 0.2,
  threadCount = 6,
  frequency = 5,
  spread = 0.18,
  taper = 1,
  position = 0.5,
  glow = 0.02,
  falloff = 0.6,
  thickness = 1.1,
  brightness = 0.6,
  opacity = 1,
  mirror = false,
  shimmer = false,
  grain = false,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  className = "",
  style,
}: WebThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const propsRef = useRef({
    color1, color2, color3, speed, threadCount, frequency, spread, taper,
    position, glow, falloff, thickness, brightness, opacity, mirror, shimmer,
    grain, grainIntensity, mouseStrength,
  });

  useEffect(() => {
    propsRef.current = {
      color1, color2, color3, speed, threadCount, frequency, spread, taper,
      position, glow, falloff, thickness, brightness, opacity, mirror, shimmer,
      grain, grainIntensity, mouseStrength,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up any previous context
    const prev = ctxMap.get(container);
    if (prev) {
      cancelAnimationFrame(prev.raf);
      prev.renderer.gl.canvas.remove();
    }

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.canvas.style.position = "absolute";
    gl.canvas.style.inset = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";
    container.appendChild(gl.canvas);

    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uColor3: { value: hexToVec3(color3) },
        uSpeed: { value: speed },
        uThreadCount: { value: Math.min(threadCount, 16) },
        uFrequency: { value: frequency },
        uSpread: { value: spread },
        uTaper: { value: taper },
        uPosition: { value: position },
        uGlow: { value: glow },
        uFalloff: { value: falloff },
        uThickness: { value: thickness },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uMirror: { value: mirror },
        uShimmer: { value: shimmer },
        uGrain: { value: grain },
        uGrainIntensity: { value: grainIntensity },
        uMouse: { value: [0.5, 0.5] },
        uMouseStrength: { value: mouseStrength },
        uResolution: { value: [1, 1] },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId = 0;
    const tick = (t: number) => {
      rafId = requestAnimationFrame(tick);
      const p = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColor1.value = hexToVec3(p.color1);
      program.uniforms.uColor2.value = hexToVec3(p.color2);
      program.uniforms.uColor3.value = hexToVec3(p.color3);
      program.uniforms.uSpeed.value = p.speed;
      program.uniforms.uThreadCount.value = Math.min(p.threadCount, 16);
      program.uniforms.uFrequency.value = p.frequency;
      program.uniforms.uSpread.value = p.spread;
      program.uniforms.uTaper.value = p.taper;
      program.uniforms.uPosition.value = p.position;
      program.uniforms.uGlow.value = p.glow;
      program.uniforms.uFalloff.value = p.falloff;
      program.uniforms.uThickness.value = p.thickness;
      program.uniforms.uBrightness.value = p.brightness;
      program.uniforms.uOpacity.value = p.opacity;
      program.uniforms.uMirror.value = p.mirror;
      program.uniforms.uShimmer.value = p.shimmer;
      program.uniforms.uGrain.value = p.grain;
      program.uniforms.uGrainIntensity.value = p.grainIntensity;
      program.uniforms.uMouse.value = mouseRef.current;
      program.uniforms.uMouseStrength.value = p.mouseStrength;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(tick);

    ctxMap.set(container, { renderer, raf: rafId });

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      ];
    };
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      gl.canvas.remove();
      ctxMap.delete(container);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    />
  );
}
