import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 10000); // Scaled by resolution
    const stars = [];

    const colors = [
      'rgba(245, 158, 11, ', // Amber
      'rgba(251, 191, 36, ', // Gold
      'rgba(192, 132, 252, ', // Purple
      'rgba(147, 197, 253, ', // Soft Blue
      'rgba(255, 255, 255, '  // White
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        vy: (Math.random() * 0.15 + 0.05) * -1 // Gentle upward drift
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.05;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Update position
        star.y += star.vy;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Calculate twinkling opacity
        const alpha = Math.max(
          0.1,
          Math.min(0.9, star.baseAlpha + Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.3)
        );

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color + alpha + ')';
        ctx.fill();

        // Extra glow for brighter stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color + (alpha * 0.15) + ')';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
}
