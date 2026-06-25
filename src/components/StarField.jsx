import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      twinkle: Math.random() * Math.PI * 2,
      cx: canvas.width / 2,
      cy: canvas.height / 2,
      dist: 0,
    }));

    stars.forEach(s => {
      s.dist = Math.sqrt(Math.pow(s.x - s.cx, 2) + Math.pow(s.y - s.cy, 2));
      s.angle = Math.atan2(s.y - s.cy, s.x - s.cx);
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      stars.forEach(s => {
        s.angle += 0.0003;
        s.x = s.cx + s.dist * Math.cos(s.angle);
        s.y = s.cy + s.dist * Math.sin(s.angle);
        s.twinkle += 0.05;

        const opacity = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.twinkle));
        const color = Math.random() > 0.95 ? 'rgba(255,215,0,' : 'rgba(255,255,255,';

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color + opacity + ')';
        ctx.fill();

        if (s.r > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = color + opacity * 0.1 + ')';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stars-bg"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
