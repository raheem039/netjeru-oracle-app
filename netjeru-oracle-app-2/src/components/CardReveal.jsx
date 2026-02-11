import React, { useState, useEffect } from 'react';
import { RARITY_CONFIG, CARD_BACK_IMAGE } from '../data/deities';

export default function CardReveal({ cards, category, pullType, audio, onBack, onPullAgain, canPull }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [revealedCards, setRevealedCards] = useState(new Set());

  // Auto-reveal all cards on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealedCards(new Set(cards.map((_, i) => i)));
    }, 600);
    return () => clearTimeout(timer);
  }, [cards]);

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
      audio.stopAll();
    } else {
      setExpandedCard(index);
      audio.playSingle(cards[index]);
    }
  };

  const handlePlayAll = () => {
    audio.playSequence(cards);
  };

  return (
    <div className="screen screen-reveal">
      <h2 className="reveal-title">Your Reading</h2>
      <p className="reveal-subtitle">Tap a card to expand and hear the deity speak</p>

      <button className="btn-play-all" onClick={handlePlayAll}>
        {audio.isPlaying ? '⏸ Playing...' : '🔊 Hear All Voices'}
      </button>

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

      <div className={`cards-grid cards-${cards.length}`}>
        {cards.map((card, index) => {
          const rarity = RARITY_CONFIG[card.deity.rarity];
          const isRevealed = revealedCards.has(index);
          const isExpanded = expandedCard === index;
          const isSpeaking = audio.currentDeity === card.deity.id;
          const hasImage = !!card.deity.image;
          
          return (
            <div 
              key={index}
              className={`card-wrapper ${isExpanded ? 'expanded' : ''} ${isSpeaking ? 'speaking' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-position">{card.position}</div>
              
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
                  <div className="card-back">
                    <div className="card-back-image-wrap">
                      <img 
                        src={CARD_BACK_IMAGE} 
                        alt="Netjeru Oracle Card" 
                        className="card-back-img"
                        loading="lazy"
                      />
                    </div>
                    <span className="card-tap-hint">REVEALING...</span>
                  </div>
                ) : (
                  <div className="card-front">
                    <div className="card-rarity-badge" style={{ background: rarity.glow }}>
                      {rarity.label}
                    </div>
                    
                    {hasImage ? (
                      <div className="card-image-wrap">
                        <img 
                          src={card.deity.image} 
                          alt={card.deity.name} 
                          className="card-deity-img"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="card-emoji">{card.deity.emoji}</div>
                    )}
                    
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
