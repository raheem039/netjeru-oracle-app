import React from 'react';
import { DEITIES, RARITY_CONFIG, CARD_BACK_IMAGE, TOTAL_DEITIES } from '../data/deities';

export default function Collection({ discovered, isPremium, onBack }) {
  const totalFound = Object.keys(discovered).length;

  return (
    <div className="screen screen-collection">
      <h2 className="collection-title">📿 Your Collection</h2>
      <p className="collection-progress">
        {totalFound} / {TOTAL_DEITIES} Deities Discovered
      </p>

      <div className="collection-bar">
        <div
          className="collection-bar-fill"
          style={{ width: `${(totalFound / TOTAL_DEITIES) * 100}%` }}
        />
      </div>

      <div className="collection-grid">
        {DEITIES.map(deity => {
          const found = discovered[deity.id];
          const rarity = RARITY_CONFIG[deity.rarity];
          const isMythic = deity.rarity === 'mythic';

          // Amun-Ra: show as glowing mystery card for non-premium users
          if (isMythic && !isPremium) {
            return (
              <div key={deity.id} className="collection-card premium-mystery-card">
                <div className="mystery-glow" />
                <div className="mystery-icon">?</div>
                <div className="mystery-label">Premium Only</div>
                <div className="coll-rarity" style={{ color: rarity.glow }}>
                  {rarity.label}
                </div>
              </div>
            );
          }

          return (
            <div
              key={deity.id}
              className={`collection-card ${found ? 'found' : 'locked'} ${isMythic && found ? 'mythic-found' : ''}`}
              style={{ '--card-gradient': found ? deity.gradient : 'none' }}
            >
              {found ? (
                <>
                  <div className={`coll-rarity ${isMythic ? 'mythic-rarity' : ''}`} style={{ color: rarity.glow }}>
                    {rarity.label}
                  </div>
                  {deity.image ? (
                    <img src={deity.image} alt={deity.name} className="coll-img" loading="lazy" />
                  ) : (
                    <div className={`coll-emoji ${isMythic ? 'mythic-emoji' : ''}`}>{deity.emoji}</div>
                  )}
                  <div className="coll-name">{deity.name}</div>
                  <div className="coll-title">{deity.title}</div>
                  <div className="coll-count">×{found.count}</div>
                </>
              ) : (
                <>
                  <img src={CARD_BACK_IMAGE} alt="Undiscovered" className="coll-img locked-img" loading="lazy" />
                  <div className="coll-name">???</div>
                  <div className="coll-rarity" style={{ color: rarity.glow }}>
                    {rarity.label}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {totalFound === TOTAL_DEITIES && (
        <div className="collection-complete">
          ☥ ALL {TOTAL_DEITIES} DEITIES DISCOVERED — YOU HAVE ACHIEVED MA'AT ☥
        </div>
      )}

      <button className="btn-back-collection" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
}
