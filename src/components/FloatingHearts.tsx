import { useEffect, useRef, useCallback } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  vx: number;
  vy: number;
  originalSpeed: number;
}

const FloatingHearts = ({ count = 30 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const touchRef = useRef<{ x: number; y: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    touchRef.current = Array.from(e.touches).map(touch => ({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    }));
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Add mouse/touch listeners for interactivity
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);

    // Initialize hearts
    const colors = ['#FF6B9D', '#FF1744', '#F8BBD9', '#FFD700', '#FFB6C1'];
    heartsRef.current = Array.from({ length: count }, () => {
      const speed = Math.random() * 1 + 0.5;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 15 + 10,
        speed: speed,
        originalSpeed: speed,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: 0,
        vy: 0
      };
    });

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(size / 2, -size, size, -size / 3, 0, size);
      ctx.bezierCurveTo(-size, -size / 3, -size / 2, -size, 0, -size / 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const repelFromPoint = (heart: Heart, px: number, py: number, force: number) => {
      const dx = heart.x - px;
      const dy = heart.y - py;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 100;

      if (distance < repelRadius && distance > 0) {
        const repelStrength = (1 - distance / repelRadius) * force;
        heart.vx += (dx / distance) * repelStrength;
        heart.vy += (dy / distance) * repelStrength;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current.forEach((heart) => {
        // Apply repulsion from mouse
        repelFromPoint(heart, mouseRef.current.x, mouseRef.current.y, 3);

        // Apply repulsion from touches
        touchRef.current.forEach(touch => {
          repelFromPoint(heart, touch.x, touch.y, 4);
        });

        // Apply velocity damping
        heart.vx *= 0.95;
        heart.vy *= 0.95;

        // Update position with velocity
        heart.x += heart.vx;
        heart.y += heart.vy;

        // Normal upward movement
        heart.y -= heart.speed;
        heart.rotation += heart.rotationSpeed;

        // Reset if off screen
        if (heart.y < -50) {
          heart.y = canvas.height + 50;
          heart.x = Math.random() * canvas.width;
          heart.vx = 0;
          heart.vy = 0;
        }

        // Keep within horizontal bounds
        if (heart.x < -50) heart.x = canvas.width + 50;
        if (heart.x > canvas.width + 50) heart.x = -50;

        // Draw heart
        drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.rotation, heart.opacity);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, handleMouseMove, handleTouchMove, handleTouchEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity: 0.6, cursor: 'crosshair' }}
    />
  );
};

export default FloatingHearts;
