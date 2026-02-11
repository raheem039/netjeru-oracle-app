import React from 'react';
import { DEITIES, RARITY_CONFIG } from '../data/deities';

export default function Collection({ collection, onBack }) {
  const totalFound = Object.keys(collection).length;

  return (
    <div className="screen screen-collection">
      <h2 className="collection-title">📿 Your Collection</h2>
      <p className="collection-progress">
        {totalFound} / {DEITIES.length} Deities Discovered
      </p>
      
      {/* Progress bar */}
      <div className="collection-bar">
        <div 
          className="collection-bar-fill" 
          style={{ width: `${(totalFound / DEITIES.length) * 100}%` }}
        />
      </div>

      {/* Deity Grid */}
      <div className="collection-grid">
        {DEITIES.map(deity => {
          const found = collection[deity.id];
          const rarity = RARITY_CONFIG[deity.rarity];
          
          return (
            <div 
              key={deity.id}
              className={`collection-card ${found ? 'found' : 'locked'}`}
              style={{ '--card-gradient': found ? deity.gradient : 'none' }}
            >
              {found ? (
                <>
                  <div className="coll-rarity" style={{ color: rarity.glow }}>
                    {rarity.label}
                  </div>
                  <div className="coll-emoji">{deity.emoji}</div>
                  <div className="coll-name">{deity.name}</div>
                  <div className="coll-title">{deity.title}</div>
                  <div className="coll-count">×{found.count}</div>
                </>
              ) : (
                <>
                  <div className="coll-emoji locked-emoji">?</div>
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

      {totalFound === DEITIES.length && (
        <div className="collection-complete">
          ☥ ALL 13 DEITIES DISCOVERED — YOU HAVE ACHIEVED MA'AT ☥
        </div>
      )}

      <button className="btn-back-collection" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
}
