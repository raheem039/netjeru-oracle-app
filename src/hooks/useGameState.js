/**
 * Game State Manager
 * Handles daily free rounds, credits, subscription status, pull history,
 * and split collection (discovered = permanent, activeCards = session-based)
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'netjeru_oracle_state';
const DAILY_FREE_PULLS = 3;

function getTodayDateString() {
  return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
}

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
  // Daily free pulls tracking
  dailyPullsUsed: 0,
  lastPullDate: null, // YYYY-MM-DD string

  // Purchased credits
  credits: 0,

  // Subscription
  isSubscriber: false,
  subscriberExpiry: null,

  // Pull history (rolling)
  pullHistory: [],
  totalPulls: 0,

  // Permanent collection: tracks which deities you've ever discovered
  discovered: {}, // { deityId: { count, firstPulled } }

  // Active session cards: cleared at midnight for free users
  activeCards: [], // Array of card objects from current day's pulls

  createdAt: Date.now()
};

export function useGameState() {
  const [state, setState] = useState(() => {
    const loaded = loadState() || DEFAULT_STATE;
    return loaded;
  });
  const [showResetBanner, setShowResetBanner] = useState(false);

  // Check for midnight reset on mount and periodically
  useEffect(() => {
    function checkReset() {
      const today = getTodayDateString();
      setState(prev => {
        if (prev.lastPullDate && prev.lastPullDate !== today) {
          // It's a new day — reset daily pulls
          const isPremium = prev.isSubscriber;
          const needsReset = !isPremium && prev.activeCards.length > 0;

          if (needsReset) {
            setShowResetBanner(true);
          }

          return {
            ...prev,
            dailyPullsUsed: 0,
            lastPullDate: today,
            // Free users lose active cards; premium users keep them
            activeCards: isPremium ? prev.activeCards : []
          };
        }
        return prev;
      });
    }

    checkReset();

    // Check every 30 seconds for midnight crossing
    const interval = setInterval(checkReset, 30000);
    return () => clearInterval(interval);
  }, []);

  // Persist state on change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const today = getTodayDateString();
  const isNewDay = state.lastPullDate !== today;
  const dailyPullsUsed = isNewDay ? 0 : state.dailyPullsUsed;
  const freeRoundsRemaining = Math.max(0, DAILY_FREE_PULLS - dailyPullsUsed);
  const isPremium = state.isSubscriber || state.credits > 0;
  const canPull = freeRoundsRemaining > 0 || state.credits > 0 || state.isSubscriber;

  const dismissResetBanner = useCallback(() => {
    setShowResetBanner(false);
  }, []);

  const consumePull = useCallback(() => {
    const today = getTodayDateString();
    setState(prev => {
      const isNewDay = prev.lastPullDate !== today;
      const currentDailyUsed = isNewDay ? 0 : prev.dailyPullsUsed;

      if (prev.isSubscriber) {
        return {
          ...prev,
          totalPulls: prev.totalPulls + 1,
          lastPullDate: today,
          dailyPullsUsed: currentDailyUsed
        };
      }
      if (currentDailyUsed < DAILY_FREE_PULLS) {
        return {
          ...prev,
          dailyPullsUsed: currentDailyUsed + 1,
          lastPullDate: today,
          totalPulls: prev.totalPulls + 1
        };
      }
      if (prev.credits > 0) {
        return {
          ...prev,
          credits: prev.credits - 1,
          lastPullDate: today,
          dailyPullsUsed: currentDailyUsed,
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
      // Update permanent discovered collection
      const newDiscovered = { ...prev.discovered };
      cards.forEach(card => {
        if (!newDiscovered[card.deity.id]) {
          newDiscovered[card.deity.id] = { count: 0, firstPulled: Date.now() };
        }
        newDiscovered[card.deity.id].count += 1;
      });

      return {
        ...prev,
        pullHistory: [...prev.pullHistory, ...cards].slice(-200),
        discovered: newDiscovered,
        activeCards: [...prev.activeCards, ...cards]
      };
    });
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_STATE);
    setShowResetBanner(false);
  }, []);

  return {
    ...state,
    freeRoundsRemaining,
    canPull,
    isPremium: state.isSubscriber,
    showResetBanner,
    consumePull,
    addCredits,
    activateSubscription,
    addToHistory,
    resetState,
    dismissResetBanner
  };
}
