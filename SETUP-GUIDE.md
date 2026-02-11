# ☥ NETJERU ORACLE APP — GitHub Setup Guide
## Step-by-Step Instructions for Dwayne

---

## STEP 1: Check If You Have a GitHub Account

Go to: **https://github.com**

- If you already have an account → Sign in and skip to Step 3
- If not → Continue to Step 2

---

## STEP 2: Create a GitHub Account (skip if you have one)

1. Go to **https://github.com/signup**
2. Enter your email (dwayne@rich-mgt.com)
3. Create a password
4. Pick a username (suggestion: `RichMgtDwayne` or `DwayneRichardson`)
5. Complete verification
6. Select the FREE plan

---

## STEP 3: Create a New Repository

1. Click the **"+"** icon (top right corner) → **"New repository"**
2. Fill in:
   - **Repository name:** `netjeru-oracle-app`
   - **Description:** `Netjeru Gacha Oracle - Sacred Egyptian Deity Card Game`
   - **Visibility:** Select **Private** (you own this IP)
   - **DO NOT** check "Add a README" (we already have one)
3. Click **"Create repository"**
4. You'll see a page with setup instructions — KEEP THIS PAGE OPEN

---

## STEP 4: Install Git on Your Computer (if not already installed)

### On Mac:
Open Terminal and type:
```
git --version
```
If not installed, it will prompt you to install Xcode command line tools. Click Install.

### On Windows:
Download from: **https://git-scm.com/download/win**
Install with all default settings.

---

## STEP 5: Download the Project Files

You have two options:

### Option A: Download the ZIP from Claude (easiest)
1. Download the `netjeru-oracle-app.zip` file I'm providing
2. Unzip it to a folder on your computer (e.g., Desktop)
3. Open Terminal (Mac) or Command Prompt (Windows)
4. Navigate to the folder:
```
cd ~/Desktop/netjeru-oracle-app
```

### Option B: If using Claude Code
Claude Code can push directly to GitHub for you.

---

## STEP 6: Connect and Push to GitHub

In your Terminal, inside the project folder, run these commands ONE AT A TIME:

```bash
# Initialize git in this folder
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit - Netjeru Oracle Gacha App"

# Set the main branch
git branch -M main

# Connect to your GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/netjeru-oracle-app.git

# Push everything up
git push -u origin main
```

It will ask for your GitHub username and password.
(For password, you may need a Personal Access Token — see Step 7 if regular password doesn't work)

---

## STEP 7: If GitHub Asks for a Token Instead of Password

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. Name it: `netjeru-push`
4. Check the box for **"repo"** (full control)
5. Click **"Generate token"**
6. COPY the token immediately (you won't see it again)
7. Use this token as your password when pushing

---

## STEP 8: Verify Upload

1. Go to **https://github.com/YOUR_USERNAME/netjeru-oracle-app**
2. You should see all your files listed
3. The README should display at the bottom of the page

---

## STEP 9: Deploy to Vercel (Free Hosting)

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Click **"Add New Project"**
5. Select **"netjeru-oracle-app"** from your repos
6. Click **"Deploy"**
7. Wait ~60 seconds
8. Vercel gives you a URL like: `netjeru-oracle-app.vercel.app`
9. That's your LIVE app!

### Custom Domain (optional):
In Vercel → Project Settings → Domains → Add `oracle.rich-mgt.com`
Then add the DNS record Vercel gives you to your domain provider.

---

## STEP 10: Add Your Voice Files

1. Create a folder: `public/audio/` in your project
2. Add your 13 ElevenLabs MP3 files:
   - isis.mp3, osiris.mp3, horus.mp3, anubis.mp3, ra.mp3
   - thoth.mp3, maat.mp3, bastet.mp3, sekhmet.mp3, hathor.mp3
   - khepri.mp3, ra-horakhty.mp3, atum.mp3
3. Push the update:
```bash
git add .
git commit -m "Add deity voice files"
git push
```
4. Vercel auto-deploys the update

---

## STEP 11: Set Up Stripe Credit Packs

1. Go to **https://dashboard.stripe.com/payment-links**
2. Create 3 payment links:
   - **5 Pulls** — $4.99 (one-time)
   - **15 Pulls** — $9.99 (one-time)
   - **30 Pulls** — $14.99 (one-time)
3. Copy each link
4. Edit `src/data/deities.js` — replace `YOUR_STRIPE_LINK_5`, `_15`, `_30`
5. Push update:
```bash
git add .
git commit -m "Add Stripe credit pack links"
git push
```

---

## QUICK REFERENCE COMMANDS

```bash
# Check status of your files
git status

# Add all changes
git add .

# Commit changes with a message
git commit -m "your message here"

# Push to GitHub (auto-deploys on Vercel)
git push

# Pull latest changes
git pull
```

---

## WHAT'S NEXT (Future Phases)

- **Phase 2:** Wrap as mobile app (React Native / Capacitor) → App Store + Google Play
- **Phase 3:** Add Supabase for user accounts + server-side credit tracking
- **Phase 4:** Achievement system, rare combos, deity lore unlocks
- **Phase 5:** Multiplayer readings, shared pulls, community features

---

**Questions?** Ask Claude to help troubleshoot any step.

**© 2026 Dwayne Richardson — Proprietary Algorithm — All Rights Reserved**
