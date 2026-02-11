# ☥ Netjeru Oracle — Sacred Egyptian Gacha Card Game

**By Dwayne Richardson | © 2026 Rich Management LLC**

A gacha-style oracle card pulling game featuring 13 Egyptian deities with voice narration, weighted randomization, and a freemium credit/subscription model.

## 🎮 How It Works

- **3 FREE rounds** — full voice experience on every card
- **After 3 rounds** — pay with credits or subscribe
- **Credits** — buy in packs (5, 15, or 30 pulls)
- **Subscription** — $9.99/mo unlimited
- **13 deities** with rarity tiers (Legendary, Epic, Rare)
- **Duplicates allowed** — true gacha mechanics
- **Collection tracking** — discover all 13 deities

## 🏗️ Tech Stack

- **React 18** + Vite (fast build tool)
- **Stripe** for payments (subscription + credit packs)
- **ElevenLabs** voice files (one per deity)
- **localStorage** for free-tier state tracking
- **PWA-ready** — installable on phones

## 📁 Project Structure

```
netjeru-oracle-app/
├── public/
│   └── manifest.json          # PWA config
├── src/
│   ├── assets/audio/          # Place 13 deity .mp3 files here
│   ├── components/
│   │   ├── CardReveal.jsx     # Card flip + voice UI
│   │   ├── Collection.jsx     # Deity collection screen
│   │   └── Paywall.jsx        # Credit/subscription purchase
│   ├── data/
│   │   └── deities.js         # All 13 deities + config
│   ├── engine/
│   │   └── oracle.js          # Weighted algorithm
│   ├── hooks/
│   │   ├── useAudio.js        # Voice playback manager
│   │   └── useGameState.js    # Credits, pulls, state
│   ├── App.jsx                # Main game flow
│   ├── main.jsx               # Entry point
│   └── styles.css             # Full Egyptian dark theme
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## 🎙️ Adding Voice Files

Place your 13 ElevenLabs .mp3 files in `public/audio/`:

```
public/audio/isis.mp3
public/audio/osiris.mp3
public/audio/horus.mp3
public/audio/anubis.mp3
public/audio/ra.mp3
public/audio/thoth.mp3
public/audio/maat.mp3
public/audio/bastet.mp3
public/audio/sekhmet.mp3
public/audio/hathor.mp3
public/audio/khepri.mp3
public/audio/ra-horakhty.mp3
public/audio/atum.mp3
```

Each file should be 15-60 seconds of the deity "speaking" their reading.

## 💳 Stripe Setup

Edit `src/data/deities.js` and replace the Stripe links:

```js
// CREDIT_PACKS — replace YOUR_STRIPE_LINK_5, _15, _30
// SUBSCRIPTION — already set to your existing $9.99/mo link
```

Create 3 Stripe Payment Links for credit packs:
1. **5 Pulls — $4.99** (one-time)
2. **15 Pulls — $9.99** (one-time)
3. **30 Pulls — $14.99** (one-time)

## 🚀 Deployment

### Deploy to Vercel (Recommended — Free):
1. Push to GitHub
2. Go to vercel.com → Import Project → Select your repo
3. Click Deploy — done!

### Deploy to your site (rich-mgt.com):
1. Run `npm run build`
2. Upload the `dist/` folder to your server
3. Point a subdomain like `oracle.rich-mgt.com` to it

---

**Proprietary Algorithm © 2026 Dwayne Richardson**
**Rich Management LLC | rich-mgt.com**
