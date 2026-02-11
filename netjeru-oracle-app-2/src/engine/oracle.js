/**
 * Netjeru Oracle Engine™
 * © 2026 Dwayne Richardson - Proprietary Algorithm
 * Weighted randomization with position-aware selection
 * Duplicates allowed (gacha mechanic)
 */

import { DEITIES, POSITION_NAMES } from '../data/deities';

/**
 * Weighted random selection - deities with lower weight numbers are rarer
 * Legendary (weight 4-5) = ~15% chance
 * Epic (weight 8) = ~35% chance  
 * Rare (weight 12) = ~50% chance
 */
function weightedRandom(pool) {
  const totalWeight = pool.reduce((sum, deity) => sum + deity.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const deity of pool) {
    random -= deity.weight;
    if (random <= 0) return deity;
  }
  return pool[pool.length - 1];
}

/**
 * Generate a reading based on category and pull type
 * @param {string} category - One of: clarity, business, shadow, renewal, creative, leadership
 * @param {string} pullType - One of: trinity, crossroads, pyramid
 * @returns {Array} Array of card objects with position, deity, and message
 */
export function generateReading(category, pullType) {
  // Filter deities that have affinity for this category (boosted weight)
  // All deities CAN appear, but category-aligned ones are more likely
  const pool = DEITIES.map(deity => ({
    ...deity,
    weight: deity.categories.includes(category) ? deity.weight * 2 : deity.weight
  }));

  const positions = POSITION_NAMES[pullType];
  const cards = [];

  for (let i = 0; i < positions.length; i++) {
    const deity = weightedRandom(pool);
    cards.push({
      position: positions[i],
      positionIndex: i,
      deity: { ...deity },
      message: deity.messages[category],
      isReversed: Math.random() < 0.15, // 15% chance of reversed meaning
      timestamp: Date.now()
    });
  }

  return cards;
}

/**
 * Get collection stats for a user's pull history
 */
export function getCollectionStats(pullHistory) {
  const uniqueDeities = new Set(pullHistory.map(p => p.deity.id));
  const deityCounts = {};
  
  pullHistory.forEach(pull => {
    deityCounts[pull.deity.id] = (deityCounts[pull.deity.id] || 0) + 1;
  });

  return {
    totalPulls: pullHistory.length,
    uniqueDeities: uniqueDeities.size,
    totalDeities: DEITIES.length,
    completionPercent: Math.round((uniqueDeities.size / DEITIES.length) * 100),
    deityCounts,
    rarest: Object.entries(deityCounts)
      .sort(([, a], [, b]) => a - b)
      .map(([id]) => DEITIES.find(d => d.id === id))
      .filter(Boolean)
  };
}
