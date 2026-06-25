import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import StarField from './StarField';

const IMAGES = [
  'https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5fb?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop',
];

export default function Stage3() {
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Reality Shift Sequence
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      duration: 1.5,
      background: 'radial-gradient(circle at center, #2e080b 0%, #050505 100%)',
      ease: 'power2.inOut',
    })
    .to('.flash-overlay', {
      duration: 0.5,
      opacity: 1,
      background: '#fff',
      ease: 'power4.in',
    })
    .to('.flash-overlay', {
      duration: 1.8,
      opacity: 0,
      ease: 'power4.out',
      onStart: () => {
        setShowContent(true);
        triggerConfettiSequence();
      }
    });

  }, []);

  const triggerConfettiSequence = () => {
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      const colors = ['#FFD700', '#ff003c', '#00FF88', '#00BFFF', '#FFF'];
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 120,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 120,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const imagePositions = [
    { left: '5%', top: '10%', rotate: -15, delay: 1.5 },
    { right: '5%', top: '15%', rotate: 10, delay: 1.7 },
    { left: '10%', bottom: '15%', rotate: 20, delay: 1.9 },
    { right: '12%', bottom: '10%', rotate: -25, delay: 2.1 },
    { left: '25%', top: '3%', rotate: -5, delay: 2.3 },
    { right: '28%', top: '5%', rotate: 15, delay: 2.5 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center perspective-1000">
      <StarField />
      
      <div className="flash-overlay absolute inset-0 pointer-events-none opacity-0 z-50"></div>
      
      {/* Floating Birthday Images */}
      {showContent && IMAGES.map((src, idx) => {
        const pos = imagePositions[idx];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, y: 100, rotate: pos.rotate - 45 }}
            animate={{ opacity: 0.8, scale: 1, y: 0, rotate: pos.rotate }}
            whileHover={{ scale: 1.2, opacity: 1, zIndex: 50, rotate: 0 }}
            transition={{ 
              duration: 1.5, 
              delay: pos.delay, 
              type: "spring", 
              bounce: 0.6 
            }}
            className="absolute shadow-2xl rounded-sm bg-white p-2 pb-8 cursor-pointer"
            style={{ 
              left: pos.left, 
              right: pos.right, 
              top: pos.top, 
              bottom: pos.bottom,
              width: '180px',
              height: '200px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="w-full h-full overflow-hidden absolute inset-x-0 top-0 p-2 bottom-8">
              <img src={src} className="w-full h-full object-cover filter brightness-90 hover:brightness-110 transition-all" alt="memory" />
            </div>
            {/* Ribbon Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-10 block" />
          </motion.div>
        );
      })}

      {showContent && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 2, ease: "easeOut", type: "spring", bounce: 0.5 }}
          className="relative z-10 glass-panel-strong p-10 md:p-16 w-full max-w-4xl mx-6 text-center transform-gpu"
          style={{ boxShadow: '0 0 100px rgba(255,50,50,0.15), 0 0 200px rgba(255,215,0,0.1)' }}
        >
          {/* Sparkles / Light flares */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-orbitron tracking-[0.4em] text-sm md:text-md text-[#FFD700] mb-4"
          >
            THE MOMENT HAS ARRIVED
          </motion.h2>

          <motion.h1 
            className="font-orbitron text-5xl md:text-8xl font-black mb-6 holographic-text relative inline-block"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
            style={{ textShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
          >
            HAPPY BIRTHDAY
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring", bounce: 0.7 }}
            className="font-rajdhani text-5xl md:text-8xl font-bold mb-10 birthday-glow"
            style={{ color: '#FFF' }}
          >
            PRAKASH SANKARI
          </motion.div>

          {/* Floating elements */}
          <div className="flex justify-center gap-6 md:gap-12 mb-10">
            {['🎂', '🎈', '🎉', '🌟', '🎁'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-4xl md:text-6xl drop-shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.5, rotate: 15 }}
                animate={{ 
                  y: [-15, 15, -15], 
                  rotate: [-5, 5, -5],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2.5 + i * 0.2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1.5 }}
            className="font-rajdhani text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto tracking-wide leading-relaxed bg-black/30 p-6 rounded-2xl border border-white/10"
          >
            Welcome to your personalized reality construct. Wishing you a phenomenal year packed with innovation, success, and out-of-this-world joy. The universe is yours.
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 3.5 }}
            className="h-[2px] mx-auto mt-12"
            style={{ background: 'linear-gradient(90deg, transparent, #FFD700, #ff003c, #FFD700, transparent)' }}
          />

        </motion.div>
      )}

      {/* Decorative Fireworks / Stars */}
      <AnimatePresence>
         {showContent && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2, delay: 4 }}
             className="absolute inset-0 pointer-events-none"
           >
              {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-1 h-1 bg-white rounded-full"
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     boxShadow: '0 0 10px #fff'
                   }}
                   animate={{
                     scale: [0, 1, 0],
                     opacity: [0, 1, 0]
                   }}
                   transition={{
                     duration: 1.5 + Math.random() * 2,
                     repeat: Infinity,
                     delay: Math.random() * 5
                   }}
                 />
              ))}
           </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
