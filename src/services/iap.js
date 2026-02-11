/**
 * In-App Purchase Service
 * Uses cordova-plugin-purchase (StoreKit 2) for iOS IAP
 * Falls back gracefully in browser/dev mode
 */

const PRODUCTS = {
  PULLS_10: {
    id: 'com.richmgt.netjeruoracle.pulls10',
    type: 'consumable',
    pulls: 10
  },
  PULLS_50: {
    id: 'com.richmgt.netjeruoracle.pulls50',
    type: 'consumable',
    pulls: 50
  },
  PULLS_100: {
    id: 'com.richmgt.netjeruoracle.pulls100',
    type: 'consumable',
    pulls: 100
  },
  SUB_UNLIMITED: {
    id: 'com.richmgt.netjeruoracle.sub_unlimited',
    type: 'paid subscription',
    pulls: Infinity
  }
};

let store = null;
let initialized = false;
let onCreditsCallback = null;
let onSubscribeCallback = null;
let onErrorCallback = null;

function getStore() {
  if (store) return store;
  if (window.CdvPurchase) {
    store = window.CdvPurchase.store;
    return store;
  }
  return null;
}

/**
 * Initialize the IAP store and register products
 */
export function initializeIAP({ onCredits, onSubscribe, onError }) {
  onCreditsCallback = onCredits;
  onSubscribeCallback = onSubscribe;
  onErrorCallback = onError || console.warn;

  const s = getStore();
  if (!s) {
    console.log('IAP: Store not available (running in browser)');
    return false;
  }

  if (initialized) return true;

  const Platform = window.CdvPurchase.Platform;
  const ProductType = window.CdvPurchase.ProductType;

  // Register consumable products
  s.register([
    {
      id: PRODUCTS.PULLS_10.id,
      type: ProductType.CONSUMABLE,
      platform: Platform.APPLE_APPSTORE
    },
    {
      id: PRODUCTS.PULLS_50.id,
      type: ProductType.CONSUMABLE,
      platform: Platform.APPLE_APPSTORE
    },
    {
      id: PRODUCTS.PULLS_100.id,
      type: ProductType.CONSUMABLE,
      platform: Platform.APPLE_APPSTORE
    },
    {
      id: PRODUCTS.SUB_UNLIMITED.id,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.APPLE_APPSTORE
    }
  ]);

  // Handle approved transactions
  s.when()
    .approved(transaction => {
      // Verify the transaction
      transaction.verify();
    })
    .verified(receipt => {
      const productId = receipt.productId;
      const product = Object.values(PRODUCTS).find(p => p.id === productId);

      if (product) {
        if (product.type === 'paid subscription') {
          // Activate subscription
          if (onSubscribeCallback) {
            onSubscribeCallback();
          }
        } else {
          // Credit pulls for consumable
          if (onCreditsCallback) {
            onCreditsCallback(product.pulls);
          }
        }
      }

      // Finish the transaction
      receipt.finish();
    })
    .unverified(receipt => {
      console.warn('IAP: Unverified receipt', receipt);
      if (onErrorCallback) {
        onErrorCallback('Purchase could not be verified. Please try again.');
      }
    });

  // Handle errors
  s.error(err => {
    console.warn('IAP Store error:', err);
    if (onErrorCallback) {
      onErrorCallback(err.message || 'Purchase failed. Please try again.');
    }
  });

  // Initialize the store
  s.initialize([Platform.APPLE_APPSTORE]);

  initialized = true;
  return true;
}

/**
 * Purchase a product by its product ID
 */
export function purchase(productId) {
  const s = getStore();
  if (!s) {
    // Fallback for browser/dev mode — simulate purchase
    console.log('IAP: Simulating purchase for', productId);
    const product = Object.values(PRODUCTS).find(p => p.id === productId);
    if (product) {
      if (product.type === 'paid subscription') {
        if (onSubscribeCallback) onSubscribeCallback();
      } else {
        if (onCreditsCallback) onCreditsCallback(product.pulls);
      }
    }
    return;
  }

  const offer = s.get(productId)?.getOffer();
  if (offer) {
    s.order(offer);
  } else {
    console.warn('IAP: Product not found:', productId);
    if (onErrorCallback) {
      onErrorCallback('Product not available. Please try again later.');
    }
  }
}

/**
 * Restore previous purchases (subscriptions)
 */
export function restorePurchases() {
  const s = getStore();
  if (!s) {
    console.log('IAP: Restore not available in browser');
    return;
  }
  s.restorePurchases();
}

/**
 * Check if the subscription is currently active
 */
export function isSubscriptionActive() {
  const s = getStore();
  if (!s) return false;

  const product = s.get(PRODUCTS.SUB_UNLIMITED.id);
  return product?.owned === true;
}

export { PRODUCTS };
