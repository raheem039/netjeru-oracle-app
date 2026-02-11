/**
 * Audio Manager for Deity Voices
 * Streams from WordPress media library
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

    if (audioRef.current) {
      audioRef.current.pause();
    }

    // voiceFile is now a full WordPress URL
    const audio = new Audio(next.voiceFile);
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    }, 100);

    audio.onended = () => {
      clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => playNext(), 800);
    };

    audio.onerror = () => {
      console.warn(`Audio failed to load: ${next.voiceFile}`);
      clearInterval(intervalRef.current);
      // Skip to next after brief delay
      setTimeout(() => playNext(), 500);
    };

    audio.play().catch((err) => {
      console.warn('Autoplay blocked:', err);
      // On mobile, autoplay may be blocked on first interaction
      // The audio will play on next user tap
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setCurrentDeity(null);
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
