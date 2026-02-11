import React, { useState } from 'react';
import { CREDIT_PACKS, SUBSCRIPTION } from '../data/deities';
import { purchase, restorePurchases } from '../services/iap';

export default function Paywall({ credits, freeRoundsRemaining, onBack, onAddCredits, onSubscribe }) {
  const [purchasing, setPurchasing] = useState(null);

  const handlePurchase = (productId) => {
    setPurchasing(productId);
    purchase(productId);
    // Reset after a delay (the IAP callbacks handle crediting)
    setTimeout(() => setPurchasing(null), 3000);
  };

  const handleRestore = () => {
    restorePurchases();
  };

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
        <div
          className={`sub-card ${purchasing === SUBSCRIPTION.productId ? 'purchasing' : ''}`}
          onClick={() => handlePurchase(SUBSCRIPTION.productId)}
          role="button"
          tabIndex={0}
        >
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
          <div className="sub-cta">
            {purchasing === SUBSCRIPTION.productId ? 'PROCESSING...' : 'SUBSCRIBE NOW →'}
          </div>
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
              className={`credit-card ${purchasing === pack.productId ? 'purchasing' : ''}`}
              onClick={() => handlePurchase(pack.productId)}
              role="button"
              tabIndex={0}
            >
              {pack.badge && <div className="credit-badge">{pack.badge}</div>}
              <div className="credit-pulls">{pack.pulls}</div>
              <div className="credit-label">PULLS</div>
              {pack.bonus && (
                <div className="credit-bonus">+ {pack.bonus}</div>
              )}
              <div className="credit-price">
                {purchasing === pack.productId ? '...' : `$${pack.price}`}
              </div>
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

      {/* Restore Purchases */}
      <button className="btn-restore" onClick={handleRestore}>
        Restore Purchases
      </button>

      {/* Terms */}
      <div className="paywall-terms">
        <p>Payment will be charged to your Apple ID account at confirmation of purchase.</p>
        <p>Subscription automatically renews unless cancelled at least 24 hours before the end of the current period.</p>
        <p>Credits are non-transferable and non-redeemable for cash.</p>
      </div>

      <button className="btn-back-paywall" onClick={onBack}>
        ← Back to Oracle
      </button>
    </div>
  );
}
