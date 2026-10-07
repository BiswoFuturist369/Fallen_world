import React, { useRef, useEffect } from 'react';

export default function MediaPage({ mediaData, isActive, pageNumber }) {
  const videoRef = useRef(null);
  const { type = 'image', src, caption } = mediaData || {};

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, type]);

  return (
    <div className="w-full h-full glass-page p-4 sm:p-6 md:p-8 flex flex-col justify-between items-center relative group">
      {/* Subtle Corner Filigree */}
      <div className="absolute top-3 left-3 text-amber-200/30 text-xs font-cinzel">✦</div>
      <div className="absolute top-3 right-3 text-amber-200/30 text-xs font-cinzel">✦</div>

      {/* Main Media Frame Container */}
      <div className="w-full h-full flex flex-col items-center justify-center my-auto overflow-hidden relative rounded-lg border border-purple-300/20 bg-black/40 shadow-inner">
        {type === 'video' ? (
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={src}
            alt={caption || `Memory Page ${pageNumber}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Ethereal Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

        {/* Media Caption */}
        {caption && (
          <div className="absolute bottom-3 inset-x-4 text-center pointer-events-none">
            <span className="font-garamond italic text-xs sm:text-sm text-purple-100/90 text-glow-white tracking-wider bg-black/50 px-3 py-1 rounded-full border border-purple-500/20 backdrop-blur-sm inline-block">
              {caption}
            </span>
          </div>
        )}
      </div>

      {/* Page Number */}
      <div className="pt-2 text-center">
        <span className="font-cinzel text-[10px] sm:text-xs text-amber-200/40 tracking-widest">
          PAGE {pageNumber < 10 ? `0${pageNumber}` : pageNumber}
        </span>
      </div>
    </div>
  );
}
