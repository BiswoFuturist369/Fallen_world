import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Planet({ onPlanetClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const canvasRef = useRef(null);
  const rippleRef = useRef(null);

  // Render atmospheric cloud details and surface reflection on 2D canvas for guaranteed crisp quality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 20;

    const render = () => {
      rotation += 0.003;
      ctx.clearRect(0, 0, size, size);

      // 1. Planet sphere gradient base (Navy, Violet, Deep Purple, Pink Rim)
      const grad = ctx.createRadialGradient(
        cx - r * 0.35, cy - r * 0.35, r * 0.1,
        cx, cy, r
      );
      grad.addColorStop(0, '#7e22ce');   // Bright Violet center highlight
      grad.addColorStop(0.3, '#3b0764'); // Deep purple
      grad.addColorStop(0.65, '#0f172a'); // Dark navy
      grad.addColorStop(0.9, '#030712');  // Outer shadow
      grad.addColorStop(1, 'rgba(168, 85, 247, 0.9)'); // Soft atmospheric rim glow

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.clip();

      // 2. Swirling cloud bands & cosmic texture
      ctx.fillStyle = 'rgba(236, 72, 153, 0.15)'; // Subtle pink cloud accent
      for (let i = 0; i < 6; i++) {
        const yOffset = cy + Math.sin(rotation + i) * 30 - 60 + i * 25;
        ctx.beginPath();
        ctx.ellipse(cx, yOffset, r * 0.9, 12 + i * 2, rotation * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(147, 197, 253, 0.18)'; // Blue starlight reflection clouds
      for (let i = 0; i < 4; i++) {
        const yOffset = cy + Math.cos(rotation * 0.8 + i) * 40 - 40 + i * 30;
        ctx.beginPath();
        ctx.ellipse(cx, yOffset, r * 0.85, 8 + i * 3, -rotation * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Tiny sparkling surface dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 20; i++) {
        const angle = rotation * 0.2 + (i * Math.PI) / 10;
        const dist = (i * 7) % (r - 20);
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle * 1.5) * dist * 0.7;
        ctx.beginPath();
        ctx.arc(px, py, (i % 3 === 0) ? 1.5 : 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // 4. Outer Glowing Atmosphere Ring
      const rimGrad = ctx.createRadialGradient(cx, cy, r - 5, cx, cy, r + 15);
      rimGrad.addColorStop(0, 'rgba(192, 132, 252, 0.5)');
      rimGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)');
      rimGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, r + 15, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleClick = (e) => {
    if (isClicked) return;
    setIsClicked(true);

    // Trigger ripple animation
    if (onPlanetClick) {
      setTimeout(() => {
        onPlanetClick();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto">
      {/* Ripple Effect Container */}
      {isClicked && (
        <div
          ref={rippleRef}
          className="planet-ripple left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* "TOUCH ME" Floating Text Above Planet */}
      <AnimatePresence>
        {!isClicked && (
          <motion.div
            className="mb-8 flex flex-col items-center cursor-pointer select-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 1.2 }}
            onClick={handleClick}
          >
            <span className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-purple-200/90 text-glow-violet animate-pulse-glow">
              ✦ TOUCH ME ✦
            </span>
            <span className="font-garamond italic text-xs text-amber-200/60 tracking-widest mt-1">
              the gateway to her universe
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Planet */}
      <motion.div
        className="relative cursor-pointer group flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isClicked ? 8 : isHovered ? 1.08 : 1,
          opacity: isClicked ? 0 : 1,
          rotate: [0, 360]
        }}
        transition={{
          scale: isClicked
            ? { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] }
            : { duration: 0.5, ease: 'easeOut' },
          opacity: isClicked
            ? { duration: 1.4, ease: 'easeInOut' }
            : { duration: 1 },
          rotate: { duration: 120, repeat: Infinity, ease: 'linear' }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Outer Halo Glow */}
        <div
          className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full transition-all duration-700 ${
            isHovered
              ? 'bg-purple-600/30 blur-2xl scale-125'
              : 'bg-indigo-600/20 blur-xl scale-100'
          }`}
        />

        {/* Orbiting Stardust Particles Ring */}
        <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-purple-400/20 animate-spin-slow pointer-events-none">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-amber-200 rounded-full shadow-[0_0_10px_#fde047]" />
          <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full shadow-[0_0_8px_#f472b6]" />
          <div className="absolute top-1/3 left-2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* 2D Canvas Sphere */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]"
        />
      </motion.div>
    </div>
  );
}
