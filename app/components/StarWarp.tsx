"use client";

import { useEffect, useRef } from "react";

export function StarWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      // REDUCED STAR COUNT FOR PERFORMANCE
      stars = Array.from({ length: 150 }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width
      }));
    };

    const animate = () => {
      ctx.fillStyle = "#050505"; // Void black
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = 1.5; // Slightly slower for relaxed feel

      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // Batch fill style
      
      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
           star.z = canvas.width;
           star.x = (Math.random() - 0.5) * canvas.width * 2;
           star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        
        const radius = Math.max(0.1, (1 - star.z / canvas.width) * 1.5);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // REMOVED TRAILS FOR PERFORMANCE (Expensive stroke calls)
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none -z-50 opacity-30" // Lower opacity
    />
  );
}
