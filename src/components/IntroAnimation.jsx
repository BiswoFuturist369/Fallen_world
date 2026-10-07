import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ introData, onComplete }) {
  const { left = "Happy", right = "Birthday", bottom = "Oh Darling Divine" } = introData || {};

  useEffect(() => {
    // Total duration before initiating completion callback (approx 4.5 seconds total for entrance + 3s hold + fadeout)
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none px-4">
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Main Title Pair: Happy (from Left) & Birthday (from Right) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 font-cinzel text-4xl sm:text-6xl md:text-8xl tracking-widest uppercase">
          {/* LEFT word: "Happy" */}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-100 to-amber-200 text-glow-gold font-light"
            initial={{ x: '-100vw', opacity: 0, filter: 'blur(10px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {left}
          </motion.span>

          {/* RIGHT word: "Birthday" */}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-indigo-100 text-glow-violet font-light"
            initial={{ x: '100vw', opacity: 0, filter: 'blur(10px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {right}
          </motion.span>
        </div>

        {/* BOTTOM subtitle: "Oh Darling Divine" */}
        <motion.div
          className="font-garamond italic text-2xl sm:text-3xl md:text-5xl text-purple-200/90 text-glow-white tracking-wider pt-2"
          initial={{ y: '100vh', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {bottom}
        </motion.div>

        {/* Subtle celestial light bar beneath */}
        <motion.div
          className="w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-amber-200/60 to-transparent my-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.8 }}
        />
      </motion.div>
    </div>
  );
}
