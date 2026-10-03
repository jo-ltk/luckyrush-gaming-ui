"use client";

import { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: "spark" | "star";
};

const COLORS = [
  "#FFFFFF", // white
  "#FFD700", // gold
  "#FF69B4", // hot pink
  "#FFA500", // orange
  "#87CEEB", // sky blue
];

interface SparkleBadgeProps {
  children: React.ReactNode;
  className?: string;
  badgeType?: "NEW" | "EXCLUSIVE" | "HOT" | "JACKPOT" | "VIP" | "BONUS";
}

export function SparkleBadge({ children, className = "", badgeType = "NEW" }: SparkleBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;

      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: Math.random() > 0.6 ? "star" : "spark",
      });
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const radius = i % 2 === 0 ? size : size * 0.25;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Randomly create new particles
      if (Math.random() < 0.15) {
        createParticle(
          Math.random() * rect.width,
          Math.random() * rect.height
        );
      }

      particles.current = particles.current.filter((p) => p.life > 0);

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy -= 0.02;
        particle.life -= 0.02;

        const alpha = Math.max(particle.life / particle.maxLife, 0);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;

        if (particle.type === "star") {
          drawStar(ctx, particle.x, particle.y, particle.size * 2, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block badge-sparkle ${className}`}>
      <div className="absolute inset-0 badge-shimmer rounded-md pointer-events-none z-20" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />
      <span className="relative z-30">{children}</span>
    </div>
  );
}
