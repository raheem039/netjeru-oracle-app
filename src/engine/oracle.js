/**
 * Netjeru Oracle Engine™
 * © 2026 Dwayne Richardson - Proprietary Algorithm
 * Weighted randomization with position-aware selection
 * Duplicates allowed (gacha mechanic)
 */

import { DEITIES, POSITION_NAMES, TOTAL_DEITIES } from '../data/deities';

/**
 * Weighted random selection - deities with lower weight numbers are rarer
 * Mythic (weight 1) = <1% chance (premium only)
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
 * @param {boolean} isPremium - Whether the user is a premium subscriber
 * @returns {Array} Array of card objects with position, deity, and message
 */
export function generateReading(category, pullType, isPremium = false) {
  // Filter deity pool: exclude premiumOnly deities for free users
  const basePool = isPremium
    ? DEITIES
    : DEITIES.filter(d => !d.premiumOnly);

  // Apply category affinity boost (2x weight for matching deities)
  const pool = basePool.map(deity => ({
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
 * Get collection stats for a user's discovered deities (permanent)
 */
export function getCollectionStats(discovered) {
  const uniqueCount = Object.keys(discovered).length;

  return {
    uniqueDeities: uniqueCount,
    totalDeities: TOTAL_DEITIES,
    completionPercent: Math.round((uniqueCount / TOTAL_DEITIES) * 100),
    deityCounts: Object.fromEntries(
      Object.entries(discovered).map(([id, data]) => [id, data.count])
    )
  };
}
