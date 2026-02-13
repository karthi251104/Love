import { useEffect, useRef } from 'react';

const SparkleTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Array<{ x: number; y: number; size: number; life: number; maxLife: number; vx: number; vy: number; color: string }>>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = ['#FF6B9D', '#FFD700', '#FF1744', '#FF69B4', '#FFC0CB', '#FFB6C1'];

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            // Spawn 2-3 sparkles per move
            for (let i = 0; i < 2; i++) {
                particles.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 10,
                    y: e.clientY + (Math.random() - 0.5) * 10,
                    size: Math.random() * 4 + 1,
                    life: 0,
                    maxLife: 30 + Math.random() * 20,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2 - 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current = particles.current.filter(p => {
                p.life++;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02; // slight gravity

                const alpha = 1 - (p.life / p.maxLife);
                const size = p.size * alpha;

                if (alpha <= 0) return false;

                // Draw sparkle star
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;

                ctx.beginPath();
                for (let j = 0; j < 4; j++) {
                    const angle = (j * Math.PI) / 2;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(
                        p.x + Math.cos(angle) * size * 2,
                        p.y + Math.sin(angle) * size * 2
                    );
                }
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                return true;
            });

            // Keep max 200 particles
            if (particles.current.length > 200) {
                particles.current = particles.current.slice(-200);
            }

            animRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
        />
    );
};

export default SparkleTrail;
