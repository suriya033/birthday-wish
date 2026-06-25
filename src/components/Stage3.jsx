import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import StarField from './StarField';
import { useRef } from 'react';

// Birthday wish pills — shown along the TOP and BOTTOM edges only
const TOP_WISHES = [
  { text: '🎉 Happy Birthday!', color: '#FFD700', delay: 1.0 },
  { text: '✨ Have a great day!', color: '#ff6b9d', delay: 1.4 },
  { text: '🌟 You are amazing!', color: '#00e5ff', delay: 1.8 },
  { text: '🚀 Dream big!', color: '#b2ff59', delay: 2.2 },
];
const BOTTOM_WISHES = [
  { text: '🏆 You deserve the best!', color: '#FFD700', delay: 1.2 },
  { text: '⭐ Shine bright!', color: '#ff6b9d', delay: 1.6 },
  { text: '🌈 Joy & happiness!', color: '#00e5ff', delay: 2.0 },
  { text: '🌸 Life is beautiful!', color: '#b2ff59', delay: 2.4 },
];

const RandomTextReveal = ({ text, className, delayOffset = 0, style }) => (
  <div className={`flex flex-wrap justify-center gap-x-4 md:gap-x-6 ${className}`} style={style}>
    {text.split(' ').map((word, wIdx) => (
      <div key={wIdx} className="flex">
        {word.split('').map((char, cIdx) => {
          const initY = (wIdx + cIdx) % 2 === 0 ? 60 : -60;
          const initX = ((wIdx * 3 + cIdx) % 7 - 3) * 20;
          const initR = ((wIdx + cIdx) % 5 - 2) * 25;
          return (
            <motion.span
              key={cIdx}
              initial={{ opacity: 0, y: initY, x: initX, rotate: initR, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: delayOffset + (wIdx * 0.15 + cIdx * 0.05),
                type: 'spring',
                bounce: 0.45,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    ))}
  </div>
);

export default function Stage3() {
  const [showContent, setShowContent] = useState(false);
  const [count, setCount] = useState(3);
  const [isCounting, setIsCounting] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && isCounting) {
      const timer = setTimeout(() => {
        setIsCounting(false);
        const tl = gsap.timeline();
        tl.to(containerRef.current, {
          duration: 1.5,
          backgroundColor: '#000',
          background: 'none',
          ease: 'power2.inOut',
        })
          .to('.flash-overlay', { duration: 0.4, opacity: 1, background: '#fff', ease: 'power4.in' })
          .to('.flash-overlay', {
            duration: 1.6, opacity: 0, ease: 'power4.out',
            onStart: () => { setShowContent(true); triggerConfetti(); },
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isCounting]);

  const triggerConfetti = () => {
    const colors = ['#FFD700', '#ff003c', '#00FF88', '#00BFFF', '#ff6b9d'];
    confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors });
    const end = Date.now() + 14000;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 90, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 90, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      <StarField />
      <div className="flash-overlay absolute inset-0 pointer-events-none opacity-0 z-50" />

      {/* ── Countdown ── */}
      <AnimatePresence>
        {isCounting && (
          <motion.div
            key="cd"
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-black/90 backdrop-blur-md"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease: 'easeIn' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 2.2, filter: 'blur(12px)' }}
                transition={{ duration: 0.65, type: 'spring', bounce: 0.5 }}
                className="font-orbitron font-black text-[#FFD700] text-[12rem] md:text-[20rem] drop-shadow-[0_0_60px_rgba(255,215,0,0.9)] leading-none"
              >
                {count > 0 ? count : '🎂'}
              </motion.div>
            </AnimatePresence>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 font-rajdhani text-xl md:text-3xl text-gray-300 uppercase tracking-[0.5em] text-center"
            >
              INITIALIZING BIRTHDAY PROTOCOL
              <span className="flex justify-center gap-2 mt-4">
                {[1, 2, 3].map(i => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                    className="w-2 h-2 inline-block rounded-full bg-[#FFD700]"
                  />
                ))}
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <>
          {/* ── LEFT Popper ── */}
          <motion.div
            initial={{ x: -300, y: 100, opacity: 0, rotate: -80, scale: 0.3 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: 25, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3, type: 'spring', bounce: 0.5 }}
            className="absolute left-2 md:left-6 top-[38%] text-[6rem] md:text-[9rem] pointer-events-none z-20 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
          >
            🎉
          </motion.div>

          {/* ── RIGHT Popper ── */}
          <motion.div
            initial={{ x: 300, y: 100, opacity: 0, rotate: 80, scale: 0.3 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: -25, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.5, type: 'spring', bounce: 0.5 }}
            className="absolute right-2 md:right-6 top-[38%] text-[6rem] md:text-[9rem] pointer-events-none z-20 drop-shadow-[0_0_20px_rgba(255,100,180,0.5)]"
            style={{ transform: 'scaleX(-1)' }}
          >
            🎊
          </motion.div>

          {/* ── TOP Wish Row ── */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-4 inset-x-0 flex justify-center flex-wrap gap-3 px-4 pointer-events-none z-10"
          >
            {TOP_WISHES.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: [0, 2, -2, 0] }}
                transition={{ duration: 0.8, delay: w.delay, type: 'spring' }}
                className="px-3 py-1 rounded-full text-xs md:text-sm font-rajdhani font-bold uppercase tracking-widest"
                style={{
                  color: w.color,
                  background: `${w.color}18`,
                  border: `1px solid ${w.color}55`,
                  boxShadow: `0 0 10px ${w.color}33`,
                  textShadow: `0 0 8px ${w.color}`,
                  backdropFilter: 'blur(6px)',
                }}
              >
                {w.text}
              </motion.span>
            ))}
          </motion.div>

          {/* ── MAIN CENTER CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, type: 'spring', bounce: 0.3 }}
            className="relative z-30 w-full max-w-3xl mx-auto text-center px-6 py-8 md:py-12"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 40%, transparent 100%)',
            }}
          >
            {/* Glowing ring behind */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -z-10 rounded-3xl pointer-events-none"
              style={{ boxShadow: '0 0 120px 20px rgba(255,215,0,0.12), 0 0 60px 10px rgba(255,60,60,0.08)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-orbitron tracking-[0.4em] text-xs md:text-sm text-[#FFD700] mb-6"
            >
              ✦ THE MOMENT HAS ARRIVED ✦
            </motion.p>

            <RandomTextReveal
              text="HAPPY BIRTHDAY"
              className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-4 holographic-text"
              style={{ textShadow: '0 4px 24px rgba(255,215,0,0.4)' }}
              delayOffset={0.6}
            />

            <RandomTextReveal
              text="PRAKASH SANKARI"
              className="font-rajdhani font-bold text-4xl md:text-6xl lg:text-7xl mb-6 birthday-glow"
              style={{ color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.35)' }}
              delayOffset={2.0}
            />

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1.8, delay: 3.5 }}
              className="h-[2px] mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #FFD700, #ff003c, #FFD700, transparent)' }}
            />

            {/* Floating emoji row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
              className="flex justify-center gap-4 md:gap-8 text-3xl md:text-5xl"
            >
              {['🎂', '🎈', '🎁', '🌟', '🎊'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
                  transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  className="cursor-default select-none"
                  whileHover={{ scale: 1.4 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── BOTTOM Wish Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="absolute bottom-4 inset-x-0 flex justify-center flex-wrap gap-3 px-4 pointer-events-none z-10"
          >
            {BOTTOM_WISHES.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: w.delay, type: 'spring' }}
                className="px-3 py-1 rounded-full text-xs md:text-sm font-rajdhani font-bold uppercase tracking-widest"
                style={{
                  color: w.color,
                  background: `${w.color}18`,
                  border: `1px solid ${w.color}55`,
                  boxShadow: `0 0 10px ${w.color}33`,
                  textShadow: `0 0 8px ${w.color}`,
                  backdropFilter: 'blur(6px)',
                }}
              >
                {w.text}
              </motion.span>
            ))}
          </motion.div>

          {/* ── Cake (bottom center, behind text) ── */}
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 0.35 }}
            transition={{ duration: 2, delay: 1.5, type: 'spring', bounce: 0.3 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8rem] md:text-[12rem] pointer-events-none z-[5] select-none"
            style={{ filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.3))' }}
          >
            🎂
          </motion.div>
        </>
      )}
    </div>
  );
}
