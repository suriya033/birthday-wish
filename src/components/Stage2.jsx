import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stage2({ onOpen }) {
  const [state, setState] = useState('idle'); // idle | opening | opened

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('opening');
    setTimeout(() => {
      setState('opened');
      setTimeout(() => {
        onOpen();
      }, 1200);
    }, 1500);
  };

  return (
    <motion.div
      key="stage2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8b0000 0%, #c0392b 50%, #8b0000 100%)' }}
    >
      {/* Subtle radial glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,200,100,0.15) 0%, transparent 70%)' }}
      />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: `rgba(255,${150 + Math.floor(Math.random() * 100)},0,${0.3 + Math.random() * 0.5})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* The Card */}
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
        className="relative"
        style={{ width: 380, maxWidth: '92vw' }}
      >
        {/* White card background */}
        <motion.div
          animate={state === 'opened' ? { scale: 1.08, opacity: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-2xl shadow-2xl p-8 pb-10 flex flex-col items-center gap-6"
          style={{ background: '#fffef7', boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}
        >
          {/* Birthday Text */}
          <div className="text-center mt-2">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Caveat', cursive", color: '#9b2335', letterSpacing: '0.02em' }}
            >
              Happy Birthday!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-2xl md:text-3xl font-semibold mt-1"
              style={{ fontFamily: "'Caveat', cursive", color: '#9b2335' }}
            >
              Prakash Sankar
            </motion.p>
          </div>

          {/* Envelope */}
          <motion.div
            onClick={handleClick}
            whileHover={state === 'idle' ? { scale: 1.06, y: -4 } : {}}
            whileTap={state === 'idle' ? { scale: 0.97 } : {}}
            className="relative cursor-pointer select-none"
            style={{ width: 200, height: 140 }}
            title="Click to open"
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-lg shadow-xl"
              style={{ background: '#c0392b' }}
            />

            {/* Envelope bottom fold triangle */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: 0,
                borderLeft: '100px solid transparent',
                borderRight: '100px solid transparent',
                borderBottom: '65px solid #a93226',
              }}
            />

            {/* Envelope left side */}
            <div
              className="absolute top-0 left-0 bottom-0"
              style={{
                width: 0,
                borderTop: '70px solid transparent',
                borderBottom: '70px solid transparent',
                borderLeft: '100px solid #b03a2e',
              }}
            />

            {/* Envelope right side */}
            <div
              className="absolute top-0 right-0 bottom-0"
              style={{
                width: 0,
                borderTop: '70px solid transparent',
                borderBottom: '70px solid transparent',
                borderRight: '100px solid #b03a2e',
              }}
            />

            {/* Envelope flap (top) */}
            <motion.div
              animate={state === 'opening' || state === 'opened' ? { rotateX: -180, y: -10 } : { rotateX: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 0,
                borderLeft: '100px solid transparent',
                borderRight: '100px solid transparent',
                borderTop: '70px solid #a93226',
                transformOrigin: 'top center',
                zIndex: 10,
              }}
            />

            {/* Gold seal button */}
            <motion.div
              className="absolute z-20 flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: 44,
                height: 44,
                background: 'radial-gradient(circle at 35% 35%, #ffe066, #c8a400)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid #a07800',
                boxShadow: '0 4px 16px rgba(180,130,0,0.5), inset 0 1px 2px rgba(255,255,200,0.5)',
              }}
              animate={state === 'idle' ? { scale: [1, 1.08, 1] } : { scale: 0, opacity: 0 }}
              transition={state === 'idle' ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
            >
              <span style={{ fontSize: 18, filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}>✦</span>
            </motion.div>

            {/* "Click to open" hint */}
            <AnimatePresence>
              {state === 'idle' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 left-0 right-0 text-center text-xs uppercase tracking-widest"
                  style={{ color: 'rgba(155,35,53,0.6)', fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Click to open
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c0392b66, transparent)', marginTop: 16 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="text-xs uppercase tracking-widest"
            style={{ color: 'rgba(100,20,30,0.4)', fontFamily: "'Rajdhani', sans-serif" }}
          >
            A special surprise awaits inside
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Flash on open */}
      <AnimatePresence>
        {state === 'opened' && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 1, times: [0, 0.3, 1] }}
            style={{ background: 'radial-gradient(circle at center, #fffde0 0%, #fff 50%, transparent 100%)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
