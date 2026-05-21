"use client";

import { useEffect, useRef } from "react";

export default function InfinityGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Particles floating in space
    const particles: {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      opacity: number;
      pulsePhase: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate floating particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 1.5 + 0.5,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    function project(
      x3d: number,
      y3d: number,
      z3d: number,
      w: number,
      h: number
    ) {
      const fov = 600;
      const scale = fov / (fov + z3d);
      return {
        x: x3d * scale + w / 2,
        y: y3d * scale + h / 2,
        scale,
      };
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      time += 0.004;

      ctx.clearRect(0, 0, W, H);

      // ─── 3D INFINITE PERSPECTIVE GRID ───
      const gridLines = 30;
      const gridSpacing = 60;
      const gridDepth = 1800;
      const cameraHeight = 250;
      const scrollOffset = (time * 120) % gridSpacing;

      ctx.lineWidth = 1;

      // Horizontal lines (receding into distance)
      for (let i = 0; i < gridLines; i++) {
        const z = i * gridSpacing - scrollOffset;
        if (z < 10) continue;
        const depthRatio = 1 - z / gridDepth;
        if (depthRatio <= 0) continue;

        const leftP = project(-W * 1.5, cameraHeight, z, W, H);
        const rightP = project(W * 1.5, cameraHeight, z, W, H);

        const alpha = Math.pow(depthRatio, 2.5) * 0.25;
        ctx.strokeStyle = `rgba(120, 140, 180, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(leftP.x, leftP.y);
        ctx.lineTo(rightP.x, rightP.y);
        ctx.stroke();
      }

      // Vertical lines (converging at horizon)
      const vertCount = 40;
      for (let i = -vertCount / 2; i <= vertCount / 2; i++) {
        const x = i * gridSpacing;

        const nearP = project(x, cameraHeight, 10, W, H);
        const farP = project(x, cameraHeight, gridDepth * 0.9, W, H);

        const distFromCenter = Math.abs(i) / (vertCount / 2);
        const alpha = (1 - distFromCenter * 0.7) * 0.2;
        ctx.strokeStyle = `rgba(120, 140, 180, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(nearP.x, nearP.y);
        ctx.lineTo(farP.x, farP.y);
        ctx.stroke();
      }

      // ─── GLOWING HORIZON LINE ───
      const horizonY = project(0, cameraHeight, gridDepth * 0.9, W, H).y;
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 2);
      horizonGrad.addColorStop(0, "rgba(100, 140, 255, 0)");
      horizonGrad.addColorStop(0.5, "rgba(100, 140, 255, 0.15)");
      horizonGrad.addColorStop(1, "rgba(100, 140, 255, 0)");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 30, W, 60);

      // ─── FLOATING PARTICLES ───
      for (const p of particles) {
        p.y -= p.speed * 0.002;
        if (p.y < -1.2) p.y = 1.2;

        const pulse = Math.sin(time * 3 + p.pulsePhase) * 0.3 + 0.7;
        const sx = (p.x * 0.5 + 0.5) * W;
        const sy = (p.y * 0.5 + 0.5) * H;
        const r = p.size * pulse;

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4);
        grad.addColorStop(0, `rgba(160, 180, 255, ${p.opacity * pulse})`);
        grad.addColorStop(0.5, `rgba(120, 140, 220, ${p.opacity * pulse * 0.3})`);
        grad.addColorStop(1, "rgba(100, 120, 200, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── VERTICAL SCAN LINE ───
      const scanX = ((Math.sin(time * 0.5) + 1) / 2) * W;
      const scanGrad = ctx.createLinearGradient(scanX - 80, 0, scanX + 80, 0);
      scanGrad.addColorStop(0, "rgba(100, 160, 255, 0)");
      scanGrad.addColorStop(0.5, "rgba(100, 160, 255, 0.04)");
      scanGrad.addColorStop(1, "rgba(100, 160, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 80, 0, 160, H);

      // ─── TOP FADE (so navbar blends in) ───
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.25);
      topFade.addColorStop(0, "rgba(5, 5, 5, 0.9)");
      topFade.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, H * 0.25);

      // ─── BOTTOM FADE ───
      const bottomFade = ctx.createLinearGradient(0, H * 0.75, 0, H);
      bottomFade.addColorStop(0, "rgba(5, 5, 5, 0)");
      bottomFade.addColorStop(1, "rgba(5, 5, 5, 0.95)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, H * 0.75, W, H * 0.25);

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
