import React from 'react';
import MediaPage from './MediaPage';
import PoetryPage from './PoetryPage';

export default function BookSpread({ spread, isActive, spreadIndex }) {
  const { left, right } = spread || {};

  return (
    <div className="w-full h-full glass-book-container flex flex-col md:flex-row relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
      {/* LEFT PAGE: MEDIA (Page 1, 3, 5, 7, 9) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10 border-b md:border-b-0 md:border-r border-purple-500/10">
        <MediaPage
          mediaData={left}
          isActive={isActive}
          pageNumber={left?.page}
        />
      </div>

      {/* CENTER BOOK SPINE */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 book-spine pointer-events-none z-30" />

      {/* RIGHT PAGE: POETRY (Page 2, 4, 6, 8, 10) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10">
        <PoetryPage
          poetryData={right}
          isActive={isActive}
          pageNumber={right?.page}
        />
      </div>
    </div>
  );
}
