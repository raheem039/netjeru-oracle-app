import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';

// ============================================
// PRODUCT IDs — matched to App Store Connect
// ============================================
export const PRODUCT_IDS = {
  SUBSCRIPTION: 'com.richmanagement.netjeru.premium.monthly',
  CREDITS_10:   'com.richmanagement.netjeru.credits.10',
  CREDITS_50:   'com.richmanagement.netjeru.credits.50',
  CREDITS_100:  'com.richmanagement.netjeru.credits.100',
};

// Pulls per credit pack
const PRODUCT_PULLS = {
  [PRODUCT_IDS.CREDITS_10]:  10,
  [PRODUCT_IDS.CREDITS_50]:  50,
  [PRODUCT_IDS.CREDITS_100]: 100,
};

// Callbacks set by the app
let onSubscribeCallback = null;
let onCreditsCallback   = null;
let onErrorCallback     = null;

// ============================================
// INITIALIZE — call once on app startup
// ============================================
export async function initializeIAP({ onSubscribe, onCredits, onError } = {}) {
  onSubscribeCallback = onSubscribe;
  onCreditsCallback   = onCredits;
  onErrorCallback     = onError;

  if (!Capacitor.isNativePlatform()) {
    console.log('IAP: Running in browser — sandbox mode active');
    return;
  }

  try {
    // RevenueCat is configured natively in AppDelegate.swift
    console.log('IAP: RevenueCat configured natively ✅');

    // Check existing subscription on launch
    await checkSubscriptionStatus();
  } catch (err) {
    console.error('IAP: Init failed:', err);
    if (onErrorCallback) onErrorCallback('Failed to initialize purchases');
  }
}

// ============================================
// CHECK SUBSCRIPTION STATUS
// Call on every app launch to restore access
// ============================================
export async function checkSubscriptionStatus() {
  if (!Capacitor.isNativePlatform()) return false;

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const isActive = customerInfo.entitlements.active['Netjeru Oracle Pro'] !== undefined;

    if (isActive && onSubscribeCallback) {
      onSubscribeCallback();
    }

    return isActive;
  } catch (err) {
    console.warn('IAP: Could not check subscription status:', err);
    return false;
  }
}

// ============================================
// PURCHASE — handles both subscription + packs
// ============================================
export async function purchase(productId) {
  if (!Capacitor.isNativePlatform()) {
    console.log('IAP: Simulating purchase in browser:', productId);
    simulatePurchase(productId);
    return;
  }

  try {
    const { offerings } = await Purchases.getOfferings();

    if (productId === PRODUCT_IDS.SUBSCRIPTION) {
      // Subscription purchase via RevenueCat offering
      const offering = offerings.current;
      if (!offering) throw new Error('No offering available');

      const pkg = offering.monthly;
      if (!pkg) throw new Error('Monthly package not found');

      const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
      const isActive = customerInfo.entitlements.active['Netjeru Oracle Pro'] !== undefined;

      if (isActive && onSubscribeCallback) {
        onSubscribeCallback();
      }
    } else {
      // Credit pack — one-time purchase
      const { customerInfo } = await Purchases.purchaseStoreProduct({
        product: { productIdentifier: productId }
      });

      const pulls = PRODUCT_PULLS[productId];
      if (pulls && onCreditsCallback) {
        onCreditsCallback(pulls);
      }
    }
  } catch (err) {
    if (err.code === 'PURCHASE_CANCELLED') {
      console.log('IAP: User cancelled purchase');
      return;
    }
    console.error('IAP: Purchase failed:', err);
    if (onErrorCallback) onErrorCallback(err.message || 'Purchase failed');
  }
}

// ============================================
// RESTORE PURCHASES
// ============================================
export async function restorePurchases() {
  if (!Capacitor.isNativePlatform()) {
    console.log('IAP: Restore not available in browser');
    return;
  }

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const isActive = customerInfo.entitlements.active['Netjeru Oracle Pro'] !== undefined;

    if (isActive && onSubscribeCallback) {
      onSubscribeCallback();
      console.log('IAP: Subscription restored ✅');
    } else {
      if (onErrorCallback) onErrorCallback('No active subscription found to restore');
    }
  } catch (err) {
    console.warn('IAP: Restore failed:', err);
    if (onErrorCallback) onErrorCallback(err.message || 'Restore failed');
  }
}

// ============================================
// BROWSER SIMULATOR — dev/testing only
// ============================================
function simulatePurchase(productId) {
  console.log('🧪 Simulating purchase:', productId);
  setTimeout(() => {
    if (productId === PRODUCT_IDS.SUBSCRIPTION) {
      if (onSubscribeCallback) onSubscribeCallback();
    } else {
      const pulls = PRODUCT_PULLS[productId];
      if (pulls && onCreditsCallback) onCreditsCallback(pulls);
    }
  }, 1000);
}
