import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCover from './BookCover';
import BookSpread from './BookSpread';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function FloatingBook({ spreads, title, onCloseBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [isTurning, setIsTurning] = useState(false);

  const touchStartX = useRef(0);
  const totalSpreads = spreads ? spreads.length : 5;

  // Keyboard Navigation Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        nextSpread();
      } else if (e.key === 'ArrowLeft') {
        prevSpread();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSpreadIndex, isTurning]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseBook) {
      setTimeout(() => {
        onCloseBook();
      }, 500);
    }
  };

  const nextSpread = () => {
    if (isTurning || currentSpreadIndex >= totalSpreads - 1) return;
    setIsTurning(true);
    setDirection(1);
    setCurrentSpreadIndex((prev) => prev + 1);
    setTimeout(() => setIsTurning(false), 900);
  };

  const prevSpread = () => {
    if (isTurning || currentSpreadIndex <= 0) return;
    setIsTurning(true);
    setDirection(-1);
    setCurrentSpreadIndex((prev) => prev - 1);
    setTimeout(() => setIsTurning(false), 900);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    if (!isOpen) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!isOpen) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSpread(); // Swipe left -> Next spread
    } else if (diff < -50) {
      prevSpread(); // Swipe right -> Prev spread
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
      {/* Top Floating Close Button */}
      <motion.button
        onClick={handleClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-5 right-5 z-50 p-3 rounded-full bg-purple-950/80 border border-purple-400/40 text-amber-200 hover:text-white hover:bg-purple-900 hover:scale-110 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.4)] pointer-events-auto flex items-center space-x-2 group"
        title="Close Book and Return to Space Universe"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline font-cinzel text-xs tracking-widest text-amber-200/90 pr-1">
          CLOSE BOOK
        </span>
      </motion.button>

      {/* Book Outer Wrapper - 60-70% Viewport Width Desktop, 88-92% Mobile */}
      <div className="w-[92vw] sm:w-[88vw] md:w-[76vw] lg:w-[68vw] h-[70vh] sm:h-[75vh] max-h-[720px] relative pointer-events-auto animate-float-slow">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED BOOK STATE WITH COVER */
            <BookCover
              key="cover"
              title={title}
              onOpen={() => setIsOpen(true)}
            />
          ) : (
            /* OPEN BOOK SPREAD SYSTEM */
            <motion.div
              key="spread-container"
              className="w-full h-full relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* 3D Animated Spread Transition Container */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSpreadIndex}
                  className="w-full h-full absolute inset-0"
                  initial={{
                    rotateY: direction > 0 ? 90 : -90,
                    opacity: 0,
                    scale: 0.96
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    rotateY: direction > 0 ? -90 : 90,
                    opacity: 0,
                    scale: 0.96
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <BookSpread
                    spread={spreads[currentSpreadIndex]}
                    isActive={!isTurning}
                    spreadIndex={currentSpreadIndex}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Left Edge Click Zone & Chevron */}
              {currentSpreadIndex > 0 && (
                <button
                  onClick={prevSpread}
                  className="absolute left-[-20px] sm:left-[-35px] top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-slate-950/70 border border-purple-400/30 text-amber-200/80 hover:text-amber-100 hover:scale-110 hover:border-amber-300/60 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  aria-label="Previous Spread"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Navigation Right Edge Click Zone & Chevron */}
              {currentSpreadIndex < totalSpreads - 1 && (
                <button
                  onClick={nextSpread}
                  className="absolute right-[-20px] sm:right-[-35px] top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-slate-950/70 border border-purple-400/30 text-amber-200/80 hover:text-amber-100 hover:scale-110 hover:border-amber-300/60 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  aria-label="Next Spread"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SPREAD INDICATOR & FINAL SPREAD RESET BUTTON */}
      {isOpen && (
        <motion.div
          className="mt-4 sm:mt-6 flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Spread Count Indicator (e.g., 01 / 05) */}
          <div className="flex items-center space-x-3 bg-purple-950/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-400/20 text-xs font-cinzel tracking-widest text-amber-200/80 shadow-lg">
            <span>
              0{currentSpreadIndex + 1} / 0{totalSpreads}
            </span>
          </div>

          {/* Final Spread Close / Return Button on Spread 5 */}
          {currentSpreadIndex === totalSpreads - 1 && (
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={handleClose}
                className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-200 bg-purple-900/60 border border-amber-300/40 px-6 py-2 rounded-full hover:bg-purple-800 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(245,208,120,0.3)]"
              >
                ✦ RETURN TO COSMOS ✦
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
