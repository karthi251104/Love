import { useEffect, useRef } from 'react';

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    life: number; maxLife: number;
    color: string; size: number;
    trail: Array<{ x: number; y: number }>;
}

interface Rocket {
    x: number; y: number;
    vy: number;
    targetY: number;
    color: string;
}

const Fireworks = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const rockets: Rocket[] = [];
        const colors = ['#FF6B9D', '#FFD700', '#FF1744', '#FF69B4', '#00E5FF', '#FF9100', '#E040FB', '#76FF03'];

        const createRocket = () => {
            rockets.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                vy: -(8 + Math.random() * 4),
                targetY: canvas.height * (0.15 + Math.random() * 0.35),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        };

        const explode = (x: number, y: number, color: string) => {
            const count = 60 + Math.floor(Math.random() * 40);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 2 + Math.random() * 4;
                particles.push({
                    x, y,
                    vx: Math.cos(angle) * speed + (Math.random() - 0.5),
                    vy: Math.sin(angle) * speed + (Math.random() - 0.5),
                    life: 0, maxLife: 50 + Math.random() * 30,
                    color, size: 2 + Math.random() * 2,
                    trail: []
                });
            }
        };

        let frameCount = 0;

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            frameCount++;
            if (frameCount % 40 === 0 || frameCount % 60 === 0) createRocket();

            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i];
                r.y += r.vy;
                ctx.beginPath();
                ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#FFD700';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FFD700';
                ctx.fill();
                ctx.shadowBlur = 0;
                if (r.y <= r.targetY) {
                    explode(r.x, r.y, r.color);
                    rockets.splice(i, 1);
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 5) p.trail.shift();
                p.life++;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.vx *= 0.99;
                const alpha = 1 - p.life / p.maxLife;
                if (alpha <= 0) { particles.splice(i, 1); continue; }

                for (let j = 0; j < p.trail.length; j++) {
                    const t = p.trail[j];
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = (j / p.trail.length) * alpha * 0.3;
                    ctx.fill();
                }

                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 6;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }

            animRef.current = requestAnimationFrame(animate);
        };

        setTimeout(() => createRocket(), 100);
        setTimeout(() => createRocket(), 300);
        setTimeout(() => createRocket(), 600);
        animate();

        return () => cancelAnimationFrame(animRef.current);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 40 }}
        />
    );
};

export default Fireworks;
