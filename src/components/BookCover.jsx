import React from 'react';
import { motion } from 'framer-motion';

export default function BookCover({ title, onOpen }) {
  return (
    <motion.div
      className="relative w-full h-full glass-book-container p-6 md:p-12 flex flex-col items-center justify-between text-center cursor-pointer group overflow-hidden border border-amber-200/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      onClick={onOpen}
      initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={{ rotateY: -90, opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      whileHover={{ scale: 1.02, rotateY: 3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative Golden Filigree Border */}
      <div className="absolute inset-4 md:inset-8 border border-amber-300/30 rounded-lg pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between items-center text-amber-300/40 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="flex justify-between items-center text-amber-300/40 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>

      {/* Subtle Background Celestial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl group-hover:bg-purple-500/25 transition-all duration-700 pointer-events-none" />

      {/* Header Symbol */}
      <div className="pt-6 md:pt-10 z-10 flex flex-col items-center">
        <span className="text-amber-200/70 text-sm tracking-[0.3em] font-cinzel uppercase">
          A Celestial Memory Book
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent my-3" />
      </div>

      {/* Book Main Title */}
      <div className="my-auto py-8 z-10 px-4 max-w-lg">
        <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-purple-100 to-amber-200/90 text-glow-gold font-normal leading-relaxed tracking-wide italic">
          “{title}”
        </h1>
        <p className="font-garamond italic text-purple-200/70 text-sm sm:text-base md:text-lg mt-4 tracking-wider">
          written for one goddess in an infinite universe
        </p>
      </div>

      {/* Footer "Tap to Open" callout */}
      <div className="pb-6 md:pb-10 z-10 flex flex-col items-center">
        <motion.div
          className="flex items-center space-x-2 text-amber-200/90 font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase py-2 px-6 rounded-full bg-purple-950/40 border border-amber-300/30 shadow-[0_0_15px_rgba(245,208,120,0.2)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>✦ TAP TO OPEN BOOK ✦</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
