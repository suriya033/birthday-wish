import { useEffect, useRef } from 'react';

export default function ParticleTrail() {
  const particles = useRef([]);

  useEffect(() => {
    const createParticle = (x, y) => {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      const colors = ['#FFD700', '#FFA500', '#FFF0A0', '#FFFFFF', '#FFE066'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        animation-duration: ${0.5 + Math.random() * 0.5}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    };

    let lastX = 0, lastY = 0;
    const onMove = (e) => {
      const x = e.clientX, y = e.clientY;
      if (Math.hypot(x - lastX, y - lastY) > 8) {
        createParticle(x, y);
        lastX = x; lastY = y;
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}
