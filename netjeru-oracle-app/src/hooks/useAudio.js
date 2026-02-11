/**
 * Audio Manager for Deity Voices
 * Handles playback queue for multi-card pulls
 */

import { useState, useRef, useCallback } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDeity, setCurrentDeity] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const queueRef = useRef([]);
  const intervalRef = useRef(null);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    queueRef.current = [];
    setIsPlaying(false);
    setCurrentDeity(null);
    setProgress(0);
  }, []);

  const playNext = useCallback(() => {
    if (queueRef.current.length === 0) {
      setIsPlaying(false);
      setCurrentDeity(null);
      setProgress(0);
      return;
    }

    const next = queueRef.current.shift();
    setCurrentDeity(next.deityId);
    setIsPlaying(true);

    // Try to load the audio file
    const audioPath = `/audio/${next.voiceFile}`;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioPath);
    audioRef.current = audio;

    // Track progress
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    }, 100);

    audio.onended = () => {
      clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => playNext(), 500); // Brief pause between voices
    };

    audio.onerror = () => {
      // If audio file not found, simulate with a delay (for development)
      console.warn(`Audio not found: ${audioPath} — simulating playback`);
      clearInterval(intervalRef.current);
      
      let simProgress = 0;
      intervalRef.current = setInterval(() => {
        simProgress += 2;
        setProgress(simProgress);
        if (simProgress >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => playNext(), 500);
        }
      }, 80); // ~4 seconds simulated playback
    };

    audio.play().catch(() => {
      // Autoplay blocked — trigger error handler
      audio.onerror();
    });
  }, []);

  const playSequence = useCallback((cards) => {
    stopAll();
    queueRef.current = cards.map(card => ({
      deityId: card.deity.id,
      voiceFile: card.deity.voiceFile
    }));
    playNext();
  }, [stopAll, playNext]);

  const playSingle = useCallback((card) => {
    stopAll();
    queueRef.current = [{
      deityId: card.deity.id,
      voiceFile: card.deity.voiceFile
    }];
    playNext();
  }, [stopAll, playNext]);

  return {
    isPlaying,
    currentDeity,
    progress,
    playSequence,
    playSingle,
    stopAll
  };
}
