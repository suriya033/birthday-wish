import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stage1({ onSuccess }) {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // idle | verifying | success
  
  const MAX_LENGTH = 8;
  
  const handlePadClick = (val) => {
    if (status !== 'idle') return;

    if (val === 'clear') {
      setPin('');
    } else if (val === 'back') {
      setPin(prev => prev.slice(0, -1));
    } else {
      if (pin.length < MAX_LENGTH) {
        const newPin = pin + val;
        setPin(newPin);
        
        if (newPin.length === MAX_LENGTH) {
          if (newPin === '02072005') {
            triggerSuccessAnimation(newPin);
          } else {
            triggerErrorAnimation();
          }
        }
      }
    }
  };

  const triggerErrorAnimation = () => {
    setStatus('error');
    setTimeout(() => {
      setPin('');
      setStatus('idle');
    }, 600);
  };

  const triggerSuccessAnimation = (enteredPin) => {
    setStatus('success');
    // We will let the animation play out for ~3 seconds, then call onSuccess
    setTimeout(() => {
      onSuccess();
    }, 4000);
  };

  const padKeys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'clear', '0', 'back'
  ];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-[#992222]">
      
      {/* Background vignette/texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }} />

      <AnimatePresence>
        {status === 'idle' && (
          <motion.div 
            key="polaroid"
            initial={{ opacity: 0, x: -50, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            exit={{ opacity: 0, x: -100, rotate: -25, scale: 0.5 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative z-10 w-full max-w-sm md:w-1/2 flex items-center justify-center p-8 mt-10 md:mt-0"
          >
            <div className="bg-[#f4f4f0] p-4 pb-12 shadow-2xl rounded-sm transform relative" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              {/* Red Ribbon/Pin */}
              <div className="absolute -top-4 -left-4 text-red-600 drop-shadow-md z-20">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C9.243 2 7 4.243 7 7C7 8.163 7.411 9.23 8.09 10.086L10.586 16H13.414L15.91 10.086C16.589 9.23 17 8.163 17 7C17 4.243 14.757 2 12 2ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.16 14.28 9.07 13.568 9.947L12 13.25L10.432 9.947C9.72 9.07 9 8.16 9 7Z"/>
                  <path d="M7.5 7.5L3 13L6 14L8.5 9.5Z" />
                  <path d="M16.5 7.5L21 13L18 14L15.5 9.5Z" />
                </svg>
              </div>
              
              <div className="overflow-hidden bg-black w-full aspect-square relative shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=800&auto=format&fit=crop" 
                  alt="Birthday memory"
                  className="w-full h-full object-cover opacity-90 sepia-[0.3]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
              <div className="absolute bottom-4 inset-x-0 text-center">
                <p className="font-caveat text-2xl text-red-800/80 -rotate-2" style={{ fontFamily: "'Caveat', cursive" }}>Happy Birthday!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side: Keypad OR Full Screen Success Animation */}
      <motion.div 
        layout
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
        className={`relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center p-8 gap-8 ${status === 'success' ? 'fixed inset-0 !w-full !flex-row z-50 bg-[#992222]' : 'max-w-md'}`}
      >
        <AnimatePresence>
          {(status === 'idle' || status === 'error') && (
            <motion.div 
              key="header"
              exit={{ opacity: 0, y: -50 }}
              className="text-center"
            >
              <motion.div className="text-2xl mb-4 text-[#eacbb3]">🔒</motion.div>
              <h2 className={`font-rajdhani text-sm tracking-[0.2em] font-semibold ${status === 'error' ? 'text-red-400' : 'text-[#eacbb3]'}`}>
                {status === 'error' ? 'INCORRECT PASSCODE' : 'ENTER A PASSCODE'}
              </h2>
              <p className={`text-xs mt-1 tracking-widest uppercase font-rajdhani ${status === 'error' ? 'text-red-400/70' : 'text-[#eacbb3]/50'}`}>
                DATE OF BIRTH
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pin slots - Layout animated for incredible transition */}
        <motion.div 
          layout
          className={`flex justify-center flex-wrap ${status === 'success' ? 'gap-4 md:gap-8 scale-150 relative z-50' : 'gap-1 sm:gap-2 mb-2'} `}
        >
          {Array.from({ length: MAX_LENGTH }).map((_, i) => {
            const isFilled = i < pin.length;
            const isSuccess = status === 'success';
            const isError = status === 'error';
            const digit = pin[i];
            
            return (
              <motion.div
                layout
                key={i}
                initial={isSuccess ? {} : { scale: 0.8, opacity: 0 }}
                animate={
                  isSuccess ? {
                    scale: [1, 1.2, 1],
                    y: [0, -20, 0],
                    boxShadow: '0 0 40px rgba(255,215,0,0.8)',
                    borderColor: '#FFD700',
                    background: 'rgba(255,215,0,0.2)'
                  } 
                  : isError ? {
                    x: [-10, 10, -10, 10, 0],
                  }
                  : { scale: 1, opacity: 1 }
                }
                transition={isSuccess ? { 
                  duration: 2, 
                  delay: i * 0.1, 
                  repeat: Infinity, 
                  repeatType: "reverse"
                } : { delay: i * 0.05 }}
                className={`flex items-center justify-center transition-all duration-300
                  ${isSuccess 
                    ? 'w-12 h-16 sm:w-16 sm:h-20 rounded-xl' 
                    : 'w-8 h-10 sm:w-10 sm:h-12 rounded-md'}
                  ${isSuccess 
                    ? 'bg-[#ffeedd]/30 border-[#FFD700] border-2 shadow-[0_0_20px_rgba(255,238,221,0.5)]' 
                    : isError
                      ? 'bg-red-500/20 border-red-500 border-2 shadow-[0_0_10px_rgba(255,0,0,0.5)]'
                      : isFilled 
                        ? 'bg-[#ffeedd]/20 border-[#ffeedd] border-2 shadow-[0_0_10px_rgba(255,238,221,0.3)]' 
                        : 'bg-black/10 border-black/20 border'}
                `}
              >
                {isFilled && (
                  <motion.div 
                    layout
                    initial={isSuccess ? { rotateX: 90 } : { scale: 0 }}
                    animate={isSuccess ? { rotateX: 0, textShadow: '0 0 20px #FFD700' } : { scale: 1 }}
                    transition={isSuccess ? { delay: i * 0.1 + 0.5, duration: 0.8, type: "spring" } : {}}
                    className={`font-bold font-orbitron ${isSuccess ? 'text-4xl text-[#FFD700]' : isError ? 'text-lg sm:text-xl text-red-500' : 'text-lg sm:text-xl text-[#ffeedd]'}`}
                  >
                    {isSuccess ? digit : '∗'}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Number Pad - disappears on success */}
        <AnimatePresence>
          {(status === 'idle' || status === 'error') && (
            <motion.div 
              key="keypad"
              exit={{ opacity: 0, scale: 0.5, y: 100 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-[280px]"
            >
              {padKeys.map((key) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 238, 221, 0.25)' }}
                  whileTap={{ scale: 0.9, backgroundColor: 'rgba(255, 238, 221, 0.4)' }}
                  onClick={() => handlePadClick(key)}
                  className="aspect-square rounded-full bg-white/10 flex items-center justify-center text-[#ffeedd] shadow-lg backdrop-blur-sm border border-white/5 font-rajdhani text-2xl md:text-3xl font-light transition-colors"
                >
                  {key === 'clear' ? (
                    <span className="text-xl">C</span>
                  ) : key === 'back' ? (
                    <span className="text-xl">⌫</span>
                  ) : (
                    key
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success Overlay text */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1, type: "spring" }}
              className="absolute bottom-20 left-0 right-0 text-center pointer-events-none"
            >
               <h1 className="font-orbitron font-black text-3xl md:text-5xl text-[#FFD700] tracking-[0.2em] shadow-lg drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                  ACCESS GRANTED
               </h1>
               <div className="mt-4 flex justify-center gap-2">
                 {[0, 1, 2].map(i => (
                   <motion.div 
                     key={i}
                     animate={{ opacity: [0, 1, 0] }}
                     transition={{ duration: 1.5, delay: 1.5 + (i * 0.3), repeat: Infinity }}
                     className="w-3 h-3 rounded-full bg-[#FFD700]"
                   />
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
}
