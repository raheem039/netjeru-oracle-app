import React, { useState } from 'react';
import { RARITY_CONFIG } from '../data/deities';

export default function CardReveal({ cards, category, pullType, audio, onBack, onPullAgain, canPull }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [revealedCards, setRevealedCards] = useState(new Set());

  const handleCardClick = (index) => {
    setRevealedCards(prev => new Set([...prev, index]));
    
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
      // Play this deity's voice
      audio.playSingle(cards[index]);
    }
  };

  const handlePlayAll = () => {
    setRevealedCards(new Set(cards.map((_, i) => i)));
    audio.playSequence(cards);
  };

  return (
    <div className="screen screen-reveal">
      <h2 className="reveal-title">Your Reading</h2>
      <p className="reveal-subtitle">Tap each card to hear the deity speak</p>

      {/* Play All Button */}
      <button className="btn-play-all" onClick={handlePlayAll}>
        {audio.isPlaying ? '⏸ Playing...' : '🔊 Hear All Voices'}
      </button>

      {/* Audio Progress */}
      {audio.isPlaying && audio.currentDeity && (
        <div className="audio-indicator">
          <div className="audio-deity-name">
            {cards.find(c => c.deity.id === audio.currentDeity)?.deity.emoji}{' '}
            {cards.find(c => c.deity.id === audio.currentDeity)?.deity.name} is speaking...
          </div>
          <div className="audio-progress-bar">
            <div className="audio-progress-fill" style={{ width: `${audio.progress}%` }} />
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className={`cards-grid cards-${cards.length}`}>
        {cards.map((card, index) => {
          const rarity = RARITY_CONFIG[card.deity.rarity];
          const isRevealed = revealedCards.has(index);
          const isExpanded = expandedCard === index;
          const isSpeaking = audio.currentDeity === card.deity.id;
          
          return (
            <div 
              key={index}
              className={`card-wrapper ${isExpanded ? 'expanded' : ''} ${isSpeaking ? 'speaking' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {/* Position label */}
              <div className="card-position">{card.position}</div>
              
              {/* Card */}
              <div 
                className={`oracle-card ${isRevealed ? 'revealed' : 'face-down'}`}
                style={{ 
                  '--card-color': card.deity.color,
                  '--card-gradient': card.deity.gradient,
                  '--rarity-glow': rarity.glow,
                  animationDelay: `${index * 0.15}s`
                }}
              >
                {!isRevealed ? (
                  // Card back
                  <div className="card-back">
                    <div className="card-back-pattern">
                      <div className="card-back-ankh">☥</div>
                    </div>
                    <span className="card-tap-hint">TAP</span>
                  </div>
                ) : (
                  // Card front
                  <div className="card-front">
                    <div className="card-rarity-badge" style={{ background: rarity.glow }}>
                      {rarity.label}
                    </div>
                    <div className="card-emoji">{card.deity.emoji}</div>
                    <h3 className="card-deity-name">{card.deity.name}</h3>
                    <p className="card-deity-title">{card.deity.title}</p>
                    
                    {isSpeaking && (
                      <div className="card-speaking-indicator">
                        <span className="wave" /><span className="wave" /><span className="wave" />
                      </div>
                    )}

                    {isExpanded && (
                      <div className="card-message">
                        <p className="card-message-text">"{card.message}"</p>
                        {card.isReversed && (
                          <span className="card-reversed-badge">⟲ REVERSED</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="reveal-actions">
        <button className="btn-pull-again" onClick={onPullAgain}>
          {canPull ? '☥ Pull Again' : '🔒 Get More Pulls'}
        </button>
        <button className="btn-home" onClick={onBack}>
          ← Home
        </button>
      </div>
    </div>
  );
}
