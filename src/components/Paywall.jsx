import React from 'react';
import { CREDIT_PACKS, SUBSCRIPTION } from '../data/deities';

export default function Paywall({ credits, freeRoundsRemaining, onBack, onAddCredits, onSubscribe }) {
  return (
    <div className="screen screen-paywall">
      <div className="paywall-header">
        <div className="paywall-icon">🔒</div>
        <h2 className="paywall-title">The Gods Await</h2>
        <p className="paywall-subtitle">
          {freeRoundsRemaining > 0
            ? `You have ${freeRoundsRemaining} free pull${freeRoundsRemaining !== 1 ? 's' : ''} remaining today. Want more power?`
            : 'Your daily offerings are spent. Unlock more divine guidance.'
          }
        </p>
      </div>

      {/* Free Tier Info */}
      <div className="paywall-free-tier">
        <div className="free-tier-label">DAILY FREE</div>
        <div className="free-tier-desc">3 pulls/day — resets at midnight</div>
      </div>

      {/* Subscription Option */}
      <div className="paywall-section">
        <h3 className="paywall-section-title">👑 UNLIMITED ACCESS</h3>
        <div className="sub-card" onClick={onSubscribe} role="button" tabIndex={0}>
          <div className="sub-badge">BEST FOR SEEKERS</div>
          <div className="sub-price">
            <span className="sub-amount">${SUBSCRIPTION.price}</span>
            <span className="sub-period">/month</span>
          </div>
          <ul className="sub-features">
            {SUBSCRIPTION.features.map((f, i) => (
              <li key={i}>✦ {f}</li>
            ))}
          </ul>
          <div className="sub-cta">SUBSCRIBE NOW →</div>
        </div>
      </div>

      {/* Divider */}
      <div className="paywall-divider">
        <span>or buy pull packs</span>
      </div>

      {/* Credit Packs */}
      <div className="paywall-section">
        <h3 className="paywall-section-title">💎 PULL PACKS</h3>
        <div className="credit-grid">
          {CREDIT_PACKS.map(pack => (
            <div
              key={pack.id}
              className="credit-card"
              onClick={() => onAddCredits(pack.pulls)}
              role="button"
              tabIndex={0}
            >
              {pack.badge && <div className="credit-badge">{pack.badge}</div>}
              <div className="credit-pulls">{pack.pulls}</div>
              <div className="credit-label">PULLS</div>
              {pack.bonus && (
                <div className="credit-bonus">+ {pack.bonus}</div>
              )}
              <div className="credit-price">${pack.price}</div>
              <div className="credit-per">
                ${(pack.price / pack.pulls).toFixed(2)}/pull
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Credits */}
      {credits > 0 && (
        <div className="paywall-current">
          You have <strong>{credits}</strong> credits remaining
        </div>
      )}

      {/* Terms */}
      <div className="paywall-terms">
        <p>Credits are in-app purchases only. Non-transferable. Non-redeemable for cash.</p>
        <p>Can only be used for oracle card pulls within this application.</p>
      </div>

      <button className="btn-back-paywall" onClick={onBack}>
        ← Back to Oracle
      </button>
    </div>
  );
}
