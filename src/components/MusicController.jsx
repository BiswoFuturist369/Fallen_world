import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicController({ audioSrc, autoStartTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  // Handle auto-start trigger when user interacts with planet or screen
  useEffect(() => {
    if (autoStartTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeAudioIn();
        })
        .catch((err) => console.log('Audio autoplay prevented:', err));
    }
  }, [autoStartTrigger]);

  const fadeAudioIn = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let vol = 0;
    const interval = setInterval(() => {
      if (vol < volume) {
        vol += 0.05;
        if (audioRef.current) audioRef.current.volume = Math.min(vol, volume);
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 pointer-events-auto"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-400/20 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-purple-400 bg-purple-950 rounded-lg cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={togglePlay}
        className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center ${
          isPlaying
            ? 'bg-purple-950/70 border-purple-400/40 text-amber-200 animate-pulse-glow'
            : 'bg-slate-950/70 border-purple-500/20 text-slate-400 hover:text-amber-200'
        }`}
        aria-label="Toggle Audio"
        title={isPlaying ? 'Pause Celestial Soundscape' : 'Play Celestial Soundscape'}
      >
        {isPlaying ? (
          <Music className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 animate-spin-slow" />
        ) : (
          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 ml-0.5" />
        )}
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-slate-950/60 border border-purple-500/20 text-purple-200 hover:text-amber-200 transition-colors backdrop-blur-md"
          aria-label="Toggle Mute"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
