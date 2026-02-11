/**
 * Game State Manager
 * Handles free rounds, credits, subscription status, and pull history
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'netjeru_oracle_state';
const FREE_ROUNDS = 3;

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Could not load state:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

const DEFAULT_STATE = {
  freeRoundsUsed: 0,
  credits: 0,
  isSubscriber: false,
  subscriberExpiry: null,
  pullHistory: [],
  totalPulls: 0,
  collection: {},
  createdAt: Date.now()
};

export function useGameState() {
  const [state, setState] = useState(() => loadState() || DEFAULT_STATE);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const freeRoundsRemaining = Math.max(0, FREE_ROUNDS - state.freeRoundsUsed);
  const canPull = freeRoundsRemaining > 0 || state.credits > 0 || state.isSubscriber;

  const consumePull = useCallback(() => {
    setState(prev => {
      if (prev.isSubscriber) {
        return { ...prev, totalPulls: prev.totalPulls + 1 };
      }
      if (prev.freeRoundsUsed < FREE_ROUNDS) {
        return { 
          ...prev, 
          freeRoundsUsed: prev.freeRoundsUsed + 1, 
          totalPulls: prev.totalPulls + 1 
        };
      }
      if (prev.credits > 0) {
        return { 
          ...prev, 
          credits: prev.credits - 1, 
          totalPulls: prev.totalPulls + 1 
        };
      }
      return prev;
    });
  }, []);

  const addCredits = useCallback((amount) => {
    setState(prev => ({ ...prev, credits: prev.credits + amount }));
  }, []);

  const activateSubscription = useCallback(() => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    setState(prev => ({ 
      ...prev, 
      isSubscriber: true, 
      subscriberExpiry: expiry.toISOString() 
    }));
  }, []);

  const addToHistory = useCallback((cards) => {
    setState(prev => {
      const newCollection = { ...prev.collection };
      cards.forEach(card => {
        if (!newCollection[card.deity.id]) {
          newCollection[card.deity.id] = { count: 0, firstPulled: Date.now() };
        }
        newCollection[card.deity.id].count += 1;
      });
      return {
        ...prev,
        pullHistory: [...prev.pullHistory, ...cards].slice(-200), // Keep last 200
        collection: newCollection
      };
    });
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return {
    ...state,
    freeRoundsRemaining,
    canPull,
    consumePull,
    addCredits,
    activateSubscription,
    addToHistory,
    resetState
  };
}
