import React from 'react';
import { motion } from 'framer-motion';

export default function PoetryPage({ poetryData, isActive, pageNumber }) {
  const { title, content, footer } = poetryData || {};
  const isFinalPage = pageNumber === 10;

  return (
    <div className="w-full h-full glass-page p-6 sm:p-8 md:p-12 flex flex-col justify-between items-center relative text-slate-100 custom-scrollbar overflow-y-auto">
      {/* Subtle Corner Filigree */}
      <div className="absolute top-3 left-3 text-amber-200/30 text-xs font-cinzel">✦</div>
      <div className="absolute top-3 right-3 text-amber-200/30 text-xs font-cinzel">✦</div>

      {/* Header / Poem Title */}
      <motion.div
        className="w-full text-center pt-2 pb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title && (
          <h2 className="font-cinzel text-sm sm:text-base md:text-lg tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-200 to-amber-200 text-glow-gold uppercase">
            {title}
          </h2>
        )}
        <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mx-auto mt-2" />
      </motion.div>

      {/* Main Poem Content */}
      <motion.div
        className="my-auto w-full max-w-lg text-center leading-relaxed px-2 sm:px-4"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="font-garamond text-base sm:text-lg md:text-xl text-purple-100/95 font-normal tracking-wide whitespace-pre-line text-glow-white">
          {content}
        </div>

        {/* Footer concluding quote if present (Page 10 final page accent) */}
        {footer && (
          <motion.div
            className="mt-6 pt-4 border-t border-purple-400/20 text-center"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <p className="font-alex text-2xl sm:text-3xl text-amber-200 text-glow-gold">
              “{footer}”
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Page Number */}
      <div className="pb-2 text-center w-full">
        <span className="font-cinzel text-[10px] sm:text-xs text-amber-200/40 tracking-widest">
          PAGE {pageNumber < 10 ? `0${pageNumber}` : pageNumber}
        </span>
      </div>
    </div>
  );
}
