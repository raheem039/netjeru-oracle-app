import React from 'react';
import { CREDIT_PACKS, SUBSCRIPTION } from '../data/deities';

export default function Paywall({ credits, onBack, onAddCredits, onSubscribe }) {
  return (
    <div className="screen screen-paywall">
      <div className="paywall-header">
        <div className="paywall-icon">🔒</div>
        <h2 className="paywall-title">The Gods Await</h2>
        <p className="paywall-subtitle">
          Your 3 free readings are complete. Unlock unlimited divine guidance.
        </p>
      </div>

      {/* Subscription Option */}
      <div className="paywall-section">
        <h3 className="paywall-section-title">👑 UNLIMITED ACCESS</h3>
        <a 
          href={SUBSCRIPTION.stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="sub-card"
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
          <div className="sub-cta">SUBSCRIBE NOW →</div>
        </a>
      </div>

      {/* Divider */}
      <div className="paywall-divider">
        <span>or buy credits</span>
      </div>

      {/* Credit Packs */}
      <div className="paywall-section">
        <h3 className="paywall-section-title">💎 CREDIT PACKS</h3>
        <p className="paywall-note">1 credit = 1 pull (any spread size). Non-refundable, oracle use only.</p>
        <div className="credit-grid">
          {CREDIT_PACKS.map(pack => (
            <a
              key={pack.id}
              href={pack.stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-card"
            >
              {pack.badge && <div className="credit-badge">{pack.badge}</div>}
              <div className="credit-pulls">{pack.pulls}</div>
              <div className="credit-label">PULLS</div>
              <div className="credit-price">${pack.price}</div>
              <div className="credit-per">
                ${(pack.price / pack.pulls).toFixed(2)}/pull
              </div>
            </a>
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
