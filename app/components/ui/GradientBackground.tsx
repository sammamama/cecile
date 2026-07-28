"use client";

import React, { useEffect, useRef, useState } from "react";

type ColorStop = {
  color: string;
  stop: string;
};

type GradientOrigin =
  | "top-left"
  | "top-middle"
  | "top-right"
  | "left-middle"
  | "center"
  | "right-middle"
  | "bottom-left"
  | "bottom-middle"
  | "bottom-right";

type GradientBackgroundProps = {
  gradientOrigin?: GradientOrigin;
  colors: ColorStop[];
  noiseIntensity?: number;
  noisePatternSize?: number;
  noisePatternRefreshInterval?: number;
  className?: string;
};

const ORIGIN_POSITION: Record<GradientOrigin, string> = {
  "top-left": "at top left",
  "top-middle": "at top",
  "top-right": "at top right",
  "left-middle": "at left",
  center: "at center",
  "right-middle": "at right",
  "bottom-left": "at bottom left",
  "bottom-middle": "at bottom",
  "bottom-right": "at bottom right",
};

export default function GradientBackground({
  gradientOrigin = "center",
  colors,
  noiseIntensity = 1,
  noisePatternSize = 64,
  noisePatternRefreshInterval = 2,
  className = "",
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [noiseUrl, setNoiseUrl] = useState<string>("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = noisePatternSize;
    canvas.height = noisePatternSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvasRef.current = canvas;

    let frame = 0;
    let timer: ReturnType<typeof setInterval>;

    const paint = () => {
      const imageData = ctx.createImageData(noisePatternSize, noisePatternSize);
      const data = imageData.data;
      const alpha = Math.max(0, Math.min(255, 80 * noiseIntensity));
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = alpha;
      }
      ctx.putImageData(imageData, 0, 0);
      setNoiseUrl(canvas.toDataURL());
      frame += 1;
    };

    paint();
    timer = setInterval(paint, Math.max(16, noisePatternRefreshInterval * 1000));
    return () => clearInterval(timer);
  }, [noiseIntensity, noisePatternSize, noisePatternRefreshInterval]);

  const gradient = `radial-gradient(${ORIGIN_POSITION[gradientOrigin]}, ${colors
    .map((c) => `${c.color} ${c.stop}`)
    .join(", ")})`;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: gradient }} />
      {noiseUrl && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url(${noiseUrl})`,
            backgroundRepeat: "repeat",
            backgroundSize: `${noisePatternSize}px ${noisePatternSize}px`,
          }}
        />
      )}
    </div>
  );
}
