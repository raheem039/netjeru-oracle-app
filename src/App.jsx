import React, { useState, useCallback, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';
import { generateReading } from './engine/oracle';
import { CATEGORIES, PULL_TYPES, TOTAL_DEITIES, RARITY_CONFIG } from './data/deities';
import { initializeIAP } from './services/iap';
import Paywall from './components/Paywall';
import CardReveal from './components/CardReveal';
import Collection from './components/Collection';

const SCREENS = {
  HOME: 'home',
  SELECT: 'select',
  PULLING: 'pulling',
  REVEAL: 'reveal',
  PAYWALL: 'paywall',
  COLLECTION: 'collection'
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [category, setCategory] = useState(null);
  const [pullType, setPullType] = useState(null);
  const [cards, setCards] = useState([]);
  const [pullAnimation, setPullAnimation] = useState(false);

  const gameState = useGameState();
  const audio = useAudio();

  // Initialize IAP store on mount
  useEffect(() => {
    initializeIAP({
      onCredits: (amount) => gameState.addCredits(amount),
      onSubscribe: () => gameState.activateSubscription(),
      onError: (msg) => console.warn('IAP Error:', msg)
    });
  }, []);

  const discoveredCount = Object.keys(gameState.discovered).length;

  const handleStartPull = useCallback(() => {
    if (!gameState.canPull) {
      setScreen(SCREENS.PAYWALL);
      return;
    }
    setScreen(SCREENS.SELECT);
  }, [gameState.canPull]);

  const handleSelectCategory = useCallback((cat) => {
    setCategory(cat);
  }, []);

  const handleSelectPullType = useCallback((type) => {
    setPullType(type);
  }, []);

  const handlePull = useCallback(() => {
    if (!category || !pullType) return;

    if (!gameState.canPull) {
      setScreen(SCREENS.PAYWALL);
      return;
    }

    // Consume a pull
    gameState.consumePull();

    // Generate the reading (pass isPremium for Amun-Ra access)
    const reading = generateReading(category, pullType, gameState.isPremium);
    setCards(reading);
    gameState.addToHistory(reading);

    // Trigger pull animation
    setPullAnimation(true);
    setScreen(SCREENS.PULLING);

    // After animation, show reveal
    setTimeout(() => {
      setPullAnimation(false);
      setScreen(SCREENS.REVEAL);
      // Auto-play all voices in sequence
      audio.playSequence(reading);
    }, 2500);

  }, [category, pullType, gameState, audio]);

  const handleBackToHome = useCallback(() => {
    audio.stopAll();
    setScreen(SCREENS.HOME);
    setCategory(null);
    setPullType(null);
    setCards([]);
  }, [audio]);

  return (
    <div className="app">
      {/* Ambient background */}
      <div className="bg-ambient" />
      <div className="bg-stars" />

      {/* Midnight Reset Banner */}
      {gameState.showResetBanner && (
        <div className="reset-banner">
          <div className="reset-banner-content">
            <div className="reset-banner-icon">☥</div>
            <p className="reset-banner-text">
              The gods have returned to the Duat. Summon them again with your daily offerings, or unlock permanent access.
            </p>
            <div className="reset-banner-actions">
              <button className="reset-banner-btn-unlock" onClick={() => { gameState.dismissResetBanner(); setScreen(SCREENS.PAYWALL); }}>
                Unlock Permanent Access
              </button>
              <button className="reset-banner-btn-dismiss" onClick={gameState.dismissResetBanner}>
                Continue Free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          {screen !== SCREENS.HOME && (
            <button className="btn-back" onClick={handleBackToHome}>
              ← Back
            </button>
          )}
        </div>
        <div className="header-center">
          <span className="logo-ankh">☥</span>
          <span className="logo-text">NETJERU</span>
        </div>
        <div className="header-right">
          <button
            className="btn-collection"
            onClick={() => setScreen(screen === SCREENS.COLLECTION ? SCREENS.HOME : SCREENS.COLLECTION)}
          >
            📿 {discoveredCount}/{TOTAL_DEITIES}
          </button>
        </div>
      </header>

      {/* Status bar */}
      <div className="status-bar">
        {gameState.isSubscriber ? (
          <span className="status-sub">👑 UNLIMITED</span>
        ) : gameState.freeRoundsRemaining > 0 ? (
          <span className="status-free">
            ✦ {gameState.freeRoundsRemaining} FREE PULL{gameState.freeRoundsRemaining !== 1 ? 'S' : ''} TODAY
          </span>
        ) : gameState.credits > 0 ? (
          <span className="status-credits">
            💎 {gameState.credits} CREDIT{gameState.credits !== 1 ? 'S' : ''}
          </span>
        ) : (
          <span className="status-depleted">
            ✦ DAILY PULLS USED — RESETS AT MIDNIGHT
          </span>
        )}
      </div>

      {/* Main content */}
      <main className="app-main">

        {/* HOME SCREEN */}
        {screen === SCREENS.HOME && (
          <div className="screen screen-home">
            <div className="home-visual">
              <div className="oracle-eye">
                <div className="eye-outer">
                  <div className="eye-inner">
                    <div className="eye-pupil">☥</div>
                  </div>
                </div>
              </div>
              <h1 className="home-title">Netjeru Oracle</h1>
              <p className="home-subtitle">Hear the voice of the gods</p>
            </div>

            <button className="btn-pull-main" onClick={handleStartPull}>
              <span className="btn-glow" />
              <span className="btn-text">☥ PULL CARDS</span>
            </button>

            <div className="home-stats">
              <div className="stat">
                <span className="stat-value">{gameState.totalPulls}</span>
                <span className="stat-label">Total Pulls</span>
              </div>
              <div className="stat">
                <span className="stat-value">{discoveredCount}</span>
                <span className="stat-label">Deities Found</span>
              </div>
              <div className="stat">
                <span className="stat-value">{Math.round((discoveredCount / TOTAL_DEITIES) * 100)}%</span>
                <span className="stat-label">Collection</span>
              </div>
            </div>

            {/* Active cards reminder for free users */}
            {!gameState.isPremium && gameState.activeCards.length > 0 && (
              <div className="active-cards-reminder">
                You have {gameState.activeCards.length} active card{gameState.activeCards.length !== 1 ? 's' : ''} — replay voices before midnight reset
              </div>
            )}

            <div className="home-links">
              <a href="https://buy.stripe.com/5kQbJ16rxbCn3wWdADcjS04" className="link-shop" target="_blank" rel="noopener">
                📿 Full Oracle Deck — $27
              </a>
              <a href="https://rich-mgt.com/art" className="link-site" target="_blank" rel="noopener">
                🌐 rich-mgt.com/art
              </a>
            </div>
          </div>
        )}

        {/* SELECT SCREEN */}
        {screen === SCREENS.SELECT && (
          <div className="screen screen-select">
            <h2 className="select-heading">Choose Your Path</h2>

            {/* Category Selection */}
            <div className="select-section">
              <h3 className="select-label">Reading Category</h3>
              <div className="category-grid">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-btn ${category === cat.id ? 'active' : ''}`}
                    style={{ '--cat-color': cat.color }}
                    onClick={() => handleSelectCategory(cat.id)}
                  >
                    <span className="cat-emoji">{cat.emoji}</span>
                    <span className="cat-name">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pull Type Selection */}
            <div className="select-section">
              <h3 className="select-label">Spread Type</h3>
              <div className="pulltype-grid">
                {PULL_TYPES.map(type => (
                  <button
                    key={type.id}
                    className={`pulltype-btn ${pullType === type.id ? 'active' : ''}`}
                    onClick={() => handleSelectPullType(type.id)}
                  >
                    <span className="pt-icon">{type.icon}</span>
                    <span className="pt-name">{type.name} ({type.count})</span>
                    <span className="pt-desc">{type.description}</span>
                    <span className="pt-cost">1 Credit</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pull Button */}
            <button
              className={`btn-generate ${category && pullType ? 'ready' : 'disabled'}`}
              onClick={handlePull}
              disabled={!category || !pullType}
            >
              ☥ GENERATE READING
            </button>
          </div>
        )}

        {/* PULLING ANIMATION */}
        {screen === SCREENS.PULLING && (
          <div className="screen screen-pulling">
            <div className="pull-animation">
              <div className="pull-portal">
                <div className="portal-ring ring-1" />
                <div className="portal-ring ring-2" />
                <div className="portal-ring ring-3" />
                <div className="portal-ankh">☥</div>
              </div>
              <p className="pull-text">The gods are speaking...</p>
            </div>
          </div>
        )}

        {/* CARD REVEAL */}
        {screen === SCREENS.REVEAL && (
          <CardReveal
            cards={cards}
            category={category}
            pullType={pullType}
            audio={audio}
            onBack={handleBackToHome}
            onPullAgain={handleStartPull}
            canPull={gameState.canPull}
            isPremium={gameState.isPremium}
          />
        )}

        {/* PAYWALL */}
        {screen === SCREENS.PAYWALL && (
          <Paywall
            credits={gameState.credits}
            freeRoundsRemaining={gameState.freeRoundsRemaining}
            onBack={handleBackToHome}
            onAddCredits={gameState.addCredits}
            onSubscribe={gameState.activateSubscription}
          />
        )}

        {/* COLLECTION */}
        {screen === SCREENS.COLLECTION && (
          <Collection
            discovered={gameState.discovered}
            isPremium={gameState.isPremium}
            onBack={handleBackToHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Dwayne Richardson • Proprietary Algorithm</p>
        <p className="footer-links">
          <a href="https://rich-mgt.com" target="_blank" rel="noopener">Rich Management</a>
          {' • '}
          <a href="https://rich-mgt.com/art" target="_blank" rel="noopener">Full Oracle Experience</a>
        </p>
      </footer>
    </div>
  );
}
