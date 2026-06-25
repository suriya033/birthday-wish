import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';

const CORRECT_DATE = '25/06/2026';

export default function Stage2({ onSuccess }) {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('idle');
  const [shaking, setShaking] = useState(false);
  const containerRef = useRef(null);

  const handleInput = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    let formatted = '';
    if (val.length > 0) formatted = val.slice(0, 2);
    if (val.length > 2) formatted += '/' + val.slice(2, 4);
    if (val.length > 4) formatted += '/' + val.slice(4, 8);
    setDate(formatted);
    setStatus('idle');
  };

  const verify = () => {
    if (!date) return;
    setStatus('verifying');
    setTimeout(() => {
      if (date === CORRECT_DATE) {
        setStatus('success');
        setTimeout(() => onSuccess(), 2200);
      } else {
        setStatus('error');
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setStatus('idle');
        }, 600);
      }
    }, 1500);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      <StarField />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          zIndex: 1,
        }}
      />

      {/* Rotating outer rings */}
      {[300, 420, 540].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            top: '50%',
            left: '50%',
            marginTop: -size / 2,
            marginLeft: -size / 2,
            border: `1px dashed rgba(255,215,0,${0.15 - i * 0.03})`,
            animation: `${i % 2 === 0 ? 'rotateRing' : 'rotateRingReverse'} ${8 + i * 3}s linear infinite`,
            zIndex: 1,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative z-10 glass-panel-strong p-10 md:p-14 w-full max-w-md mx-6 text-center ${shaking ? 'shake' : ''}`}
        style={{ boxShadow: '0 0 80px rgba(255,215,0,0.1), 0 0 160px rgba(255,215,0,0.05)' }}
      >
        {/* Security icon */}
        <motion.div
          className="text-5xl mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🛡️
        </motion.div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map(n => (
            <div
              key={n}
              className="w-8 h-1 rounded-full"
              style={{
                background: n === 1 ? 'rgba(0,255,136,0.8)' : n === 2 ? 'rgba(255,215,0,0.8)' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>

        <div className="font-orbitron text-xs tracking-widest mb-1" style={{ color: 'rgba(255,215,0,0.4)' }}>
          STEP 2 OF 3
        </div>
        <h2 className="font-orbitron text-xl md:text-2xl font-black gold-text mb-2">
          SECONDARY SECURITY CHECK
        </h2>
        <div className="font-rajdhani text-sm tracking-widest text-gray-500 mb-8">
          Temporal Verification Protocol
        </div>

        <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)' }} />

        <div className="mb-6">
          <label className="block font-orbitron text-xs tracking-widest mb-3" style={{ color: 'rgba(255,215,0,0.6)' }}>
            ENTER CURRENT DATE
          </label>
          <div className="font-rajdhani text-xs text-gray-600 mb-3 tracking-widest">
            E.G.  25/06/2026
          </div>
          <input
            type="text"
            className="secure-input"
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={handleInput}
            onKeyDown={(e) => e.key === 'Enter' && verify()}
            maxLength={10}
            disabled={status === 'verifying' || status === 'success'}
          />
        </div>

        <AnimatePresence mode="wait">
          {status === 'verifying' && (
            <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4">
              {/* Progress rings animation */}
              <div className="flex justify-center mb-3">
                <div className="relative w-16 h-16">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `2px solid rgba(255,215,0,${0.6 - i * 0.15})`,
                        animation: `rotateRing ${1 + i * 0.5}s linear infinite`,
                        transform: `scale(${1 - i * 0.2})`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center font-orbitron text-xs" style={{ color: '#FFD700' }}>
                    ⟳
                  </div>
                </div>
              </div>
              <div className="font-orbitron text-xs tracking-widest mb-2" style={{ color: 'rgba(255,215,0,0.6)' }}>
                VERIFYING TEMPORAL DATA...
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #FFD700, #FFF0A0)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="s"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mb-4"
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                ✓
              </motion.div>
              <div className="font-orbitron text-sm tracking-widest" style={{ color: '#00FF88' }}>
                DATE CONFIRMED ✓
              </div>
              <motion.div
                className="text-xs mt-2 font-orbitron"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: 'rgba(0,255,136,0.6)' }}
              >
                TEMPORAL LOCK RELEASED
              </motion.div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4">
              <div className="font-orbitron text-sm text-red-500 tracking-widest">✕ TEMPORAL MISMATCH</div>
              <div className="font-rajdhani text-sm text-red-400 mt-1">INVALID DATE DETECTED</div>
            </motion.div>
          )}
        </AnimatePresence>

        {status !== 'success' && (
          <motion.button
            className="secure-btn w-full"
            onClick={verify}
            disabled={status === 'verifying'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'verifying' ? 'PROCESSING...' : 'CONTINUE'}
          </motion.button>
        )}

        <div className="mt-8 font-orbitron text-xs" style={{ color: 'rgba(255,215,0,0.2)' }}>
          TEMPORAL AUTH PROTOCOL v2.6 ■ SECURE
        </div>
      </motion.div>
    </div>
  );
}
