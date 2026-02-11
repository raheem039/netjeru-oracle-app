/**
 * In-App Purchase Service
 * Uses native StoreKit 2 via custom Capacitor plugin on iOS
 * Falls back to simulated purchases in browser/dev mode
 */

import { registerPlugin, Capacitor } from '@capacitor/core';

const InAppPurchase = registerPlugin('InAppPurchase');

const PRODUCT_IDS = [
  'com.richmgt.netjeruoracle.pulls10',
  'com.richmgt.netjeruoracle.pulls50',
  'com.richmgt.netjeruoracle.pulls100',
  'com.richmgt.netjeruoracle.sub_unlimited'
];

const PRODUCT_PULLS = {
  'com.richmgt.netjeruoracle.pulls10': 10,
  'com.richmgt.netjeruoracle.pulls50': 50,
  'com.richmgt.netjeruoracle.pulls100': 100
};

let onCreditsCallback = null;
let onSubscribeCallback = null;
let onErrorCallback = null;
let initialized = false;

/**
 * Initialize the IAP store and register products
 */
export async function initializeIAP({ onCredits, onSubscribe, onError }) {
  onCreditsCallback = onCredits;
  onSubscribeCallback = onSubscribe;
  onErrorCallback = onError || console.warn;

  if (!Capacitor.isNativePlatform()) {
    console.log('IAP: Running in browser — purchases will be simulated');
    initialized = true;
    return;
  }

  try {
    // Listen for subscription re-verification on app launch
    await InAppPurchase.addListener('subscriptionActive', (data) => {
      if (onSubscribeCallback) onSubscribeCallback();
    });

    // Listen for background transaction updates (renewals, family sharing, etc.)
    await InAppPurchase.addListener('transactionUpdate', (data) => {
      const pulls = PRODUCT_PULLS[data.productId];
      if (pulls && onCreditsCallback) {
        onCreditsCallback(pulls);
      }
    });

    // Listen for completed purchases triggered by purchase()
    await InAppPurchase.addListener('purchaseCompleted', (data) => {
      if (data.type === 'autoRenewable') {
        if (onSubscribeCallback) onSubscribeCallback();
      } else {
        const pulls = PRODUCT_PULLS[data.productId];
        if (pulls && onCreditsCallback) onCreditsCallback(pulls);
      }
    });

    // Initialize store with product IDs
    const result = await InAppPurchase.initialize({ productIds: PRODUCT_IDS });
    console.log('IAP: Initialized with products:', result.products?.length || 0);
    initialized = true;
  } catch (err) {
    console.warn('IAP: Initialization failed:', err);
    if (onErrorCallback) onErrorCallback('Store initialization failed');
  }
}

/**
 * Purchase a product by its product ID
 */
export async function purchase(productId) {
  if (!Capacitor.isNativePlatform()) {
    // Browser fallback — simulate purchase
    console.log('IAP: Simulating purchase for', productId);
    simulatePurchase(productId);
    return;
  }

  try {
    const result = await InAppPurchase.purchase({ productId });

    if (result.cancelled) {
      console.log('IAP: Purchase cancelled by user');
      return;
    }

    if (result.pending) {
      console.log('IAP: Purchase pending (e.g. Ask to Buy)');
      return;
    }

    // Success is handled by the purchaseCompleted listener,
    // but also handle it here for immediate UI feedback
    if (result.success) {
      if (result.type === 'autoRenewable') {
        if (onSubscribeCallback) onSubscribeCallback();
      } else {
        const pulls = PRODUCT_PULLS[productId];
        if (pulls && onCreditsCallback) onCreditsCallback(pulls);
      }
    }
  } catch (err) {
    console.warn('IAP: Purchase failed:', err);
    if (onErrorCallback) onErrorCallback(err.message || 'Purchase failed');
  }
}

/**
 * Restore previous purchases (subscriptions)
 */
export async function restorePurchases() {
  if (!Capacitor.isNativePlatform()) {
    console.log('IAP: Restore not available in browser');
    return;
  }

  try {
    await InAppPurchase.restorePurchases();
  } catch (err) {
    console.warn('IAP: Restore failed:', err);
    if (onErrorCallback) onErrorCallback(err.message || 'Restore failed');
  }
}

/**
 * Browser-only: simulate a purchase for dev/testing
 */
function simulatePurchase(productId) {
  if (productId === 'com.richmgt.netjeruoracle.sub_unlimited') {
    if (onSubscribeCallback) onSubscribeCallback();
  } else {
    const pulls = PRODUCT_PULLS[productId];
    if (pulls && onCreditsCallback) onCreditsCallback(pulls);
  }
}

export { PRODUCT_IDS };
