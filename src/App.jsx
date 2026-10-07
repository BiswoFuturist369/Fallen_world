import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { birthdayContent } from './data/birthdayContent';
import SpaceScene from './components/SpaceScene';
import IntroAnimation from './components/IntroAnimation';
import Planet from './components/Planet';
import FloatingBook from './components/FloatingBook';
import MusicController from './components/MusicController';
import CosmicParticleSystem from './components/CosmicParticleSystem';

export default function App() {
  // Application Stage Flow: 'intro' -> 'planet' -> 'book'
  const [stage, setStage] = useState('intro');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Callback when Intro Animation finishes (~4.5s)
  const handleIntroComplete = () => {
    setStage('planet');
  };

  // Callback when User taps/clicks Planet
  const handlePlanetClick = () => {
    setHasInteracted(true);
    setStage('book');
  };

  // Callback when User closes the book (resets back to planet stage)
  const handleCloseBook = () => {
    setStage('planet');
  };

  // Allow clicking anywhere to trigger audio if user clicks early
  const handleGlobalClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-[#03030a] select-none"
      onClick={handleGlobalClick}
    >
      {/* 3D Cosmic Background Environment with Draggable Space & Scattered Planets */}
      <SpaceScene
        celestialBodies={birthdayContent.celestialBodies}
        onSelectGateway={handlePlanetClick}
      >
        {/* Subtle Stardust Sparkles Overlay when in Planet or Book mode */}
        {(stage === 'planet' || stage === 'book') && (
          <CosmicParticleSystem count={25} />
        )}

        <AnimatePresence mode="wait">
          {/* STAGE 1: INTRO ANIMATION */}
          {stage === 'intro' && (
            <IntroAnimation
              key="intro"
              introData={birthdayContent.intro}
              onComplete={handleIntroComplete}
            />
          )}

          {/* STAGE 2: CENTRAL PLANET GATEWAY */}
          {stage === 'planet' && (
            <Planet
              key="planet"
              onPlanetClick={handlePlanetClick}
            />
          )}

          {/* STAGE 3: MAGICAL FLOATING BOOK EXPERIENCE */}
          {stage === 'book' && (
            <FloatingBook
              key="book"
              spreads={birthdayContent.spreads}
              title={birthdayContent.title}
              onCloseBook={handleCloseBook}
            />
          )}
        </AnimatePresence>

        {/* Minimal Audio Controller */}
        <MusicController
          audioSrc={birthdayContent.music}
          autoStartTrigger={hasInteracted}
        />
      </SpaceScene>
    </div>
  );
}
