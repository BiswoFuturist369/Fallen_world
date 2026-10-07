import React, { useMemo } from 'react';

export default function CosmicParticleSystem({ count = 30 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.3
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_#fde047]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `floatingSmooth ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
}
