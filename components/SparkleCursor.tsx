"use client";

import { useEffect, useRef } from "react";

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
  "#A855F7", // purple
  "#D946EF", // magenta
  "#38BDF8", // electric blue
  "#FACC15", // gold
  "#FFFFFF", // white
];

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number | null>(null);
  const lastMove = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticle = (
      x: number,
      y: number,
      burst = false
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst
        ? Math.random() * 5 + 2
        : Math.random() * 1.8 + 0.4;

      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: burst ? 1 : 0.7,
        maxLife: burst ? 1 : 0.7,
        size: burst
          ? Math.random() * 3 + 1.5
          : Math.random() * 2.5 + 1,
        color:
          COLORS[Math.floor(Math.random() * COLORS.length)],
        type: Math.random() > 0.7 ? "star" : "spark",
      });
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const now = performance.now();

      // Prevent too many particles
      if (now - lastMove.current > 25) {
        lastMove.current = now;

        // Create a few particles around cursor
        for (let i = 0; i < 2; i++) {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 8,
            e.clientY + (Math.random() - 0.5) * 8
          );
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Strong sparkle burst
      for (let i = 0; i < 28; i++) {
        createParticle(e.clientX, e.clientY, true);
      }

      // Small secondary ring burst
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const distance = 18;

        createParticle(
          e.clientX + Math.cos(angle) * distance,
          e.clientY + Math.sin(angle) * distance,
          true
        );
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

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
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      particles.current = particles.current.filter(
        (particle) => particle.life > 0
      );

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.96;
        particle.vy *= 0.96;

        particle.vy += 0.025;

        particle.life -= particle.type === "star" ? 0.018 : 0.025;

        const alpha = Math.max(
          particle.life / particle.maxLife,
          0
        );

        ctx.save();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;

        // Neon glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = particle.color;

        if (particle.type === "star") {
          drawStar(
            ctx,
            particle.x,
            particle.y,
            particle.size * 2,
            alpha
          );
        } else {
          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
