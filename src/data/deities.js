/**
 * Netjeru Oracle Deity Database
 * © 2026 Dwayne Richardson - All Rights Reserved
 * Proprietary weighted algorithm with position-aware selection
 */

const WP = 'https://rich-mgt.com/wp-content/uploads/2026/01';

export const CARD_BACK_IMAGE = `${WP}/Card_Back_Netjeru_Oracle-1.png`;

export const DEITIES = [
  {
    id: 'isis', name: 'Isis', title: 'Divine Mother', emoji: '🌙',
    element: 'water', rarity: 'legendary', weight: 5, color: '#4a90d9',
    gradient: 'linear-gradient(135deg, #1a237e, #4a90d9, #7c4dff)',
    categories: ['clarity', 'renewal', 'creative'],
    image: `${WP}/05_Isis_Divine_Mother-1.png`,
    voiceFile: `${WP}/Isis.mp3`,
    messages: { clarity: "I am Isis, She of Ten Thousand Names. The answer you seek is already within you — you have merely forgotten. Still your mind and remember who you are.", business: "Your empire requires both strategy and soul. Do not build on foundations of fear. Build on the foundation of your divine inheritance.", shadow: "What you hide from yourself becomes the wall between you and your throne. Face the shadow — it carries your greatest power.", renewal: "From the fragments of what was broken, I reassembled the divine. You too can rebuild. Every ending is a consecration.", creative: "Creation is the language of the gods. When you create, you speak with my voice. Let nothing silence your expression.", leadership: "True authority is not claimed — it is remembered. You are descended from kings. Act accordingly." }
  },
  {
    id: 'osiris', name: 'Osiris', title: 'Lord of Rebirth', emoji: '⚱️',
    element: 'earth', rarity: 'legendary', weight: 5, color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #1b5e20, #4caf50, #00e676)',
    categories: ['renewal', 'leadership', 'shadow'],
    image: `${WP}/04_Osiris_Lord_of_Rebirth-1.png`,
    voiceFile: `${WP}/Osiris.mp3`,
    messages: { clarity: "Death is not the end — it is the door. What must die in your life so that the new kingdom may rise?", business: "An empire is not built in a day, nor does it end with one man. Plant seeds your grandchildren will harvest.", shadow: "I was betrayed, dismembered, and scattered. Yet I reign still. Your setbacks are not your story — your resurrection is.", renewal: "I am the proof that continuity survives destruction. What was taken from you will be returned tenfold.", creative: "The underworld is not darkness — it is the soil where all creation begins. Go deep before you rise.", leadership: "Continuity over crowns. Legacy over glory. Build what outlasts you." }
  },
  {
    id: 'horus', name: 'Horus', title: 'Sovereign Vision', emoji: '🦅',
    element: 'air', rarity: 'epic', weight: 8, color: '#f4511e',
    gradient: 'linear-gradient(135deg, #bf360c, #ff6e40, #ffd740)',
    categories: ['business', 'leadership', 'clarity'],
    image: `${WP}/09_Horus_Sovereign_Vision-3.png`,
    voiceFile: `${WP}/Horus.mp3`,
    messages: { clarity: "See with both eyes — the eye of the sun for action, the eye of the moon for wisdom. Balance reveals the path.", business: "Claim what is rightfully yours. The throne was stolen, and I took it back. Your market share awaits your boldness.", shadow: "I lost an eye in battle and gained the power to see beyond the physical. Your wounds are your upgrades.", renewal: "The falcon rises at dawn. No matter how dark the night, you will fly again.", creative: "Strike with precision. The falcon does not hesitate mid-dive. Commit fully to your creative vision.", leadership: "Leadership is your birthright. Stop asking permission to lead. The sky is yours." }
  },
  {
    id: 'anubis', name: 'Anubis', title: 'Guardian Guide', emoji: '🐺',
    element: 'shadow', rarity: 'epic', weight: 8, color: '#37474f',
    gradient: 'linear-gradient(135deg, #263238, #546e7a, #b0bec5)',
    categories: ['shadow', 'clarity', 'renewal'],
    image: `${WP}/08_Anubis_Guardian_Guide-1.png`,
    voiceFile: `${WP}/Anubis.mp3`,
    messages: { clarity: "I weigh hearts against truth. Ask yourself — does your current path pass the feather test?", business: "Not every opportunity deserves your time. I guard the gates for a reason. Be selective with what you let in.", shadow: "The shadows are my domain. What you fear to examine is exactly where your treasure lies. Come. I will guide you.", renewal: "Every transition requires a death. I do not end things — I escort them to their next form. Trust the process.", creative: "The most powerful art comes from the underworld of your experience. Mine your darkness for gold.", leadership: "A true leader protects the threshold between what was and what will be. Guard your transitions carefully." }
  },
  {
    id: 'ra', name: 'Ra', title: 'The Supreme Light', emoji: '☀️',
    element: 'fire', rarity: 'legendary', weight: 5, color: '#ff8f00',
    gradient: 'linear-gradient(135deg, #e65100, #ff9800, #ffeb3b)',
    categories: ['leadership', 'clarity', 'business'],
    image: `${WP}/01_Ra-1.png`,
    voiceFile: `${WP}/Ra.mp3`,
    messages: { clarity: "I am the light that reveals all. There is no darkness I cannot illuminate. Ask your question — the answer is already rising.", business: "I cross the sky every single day without fail. Consistency is divine. Show up. Every. Single. Day.", shadow: "Even I descend into the underworld each night. Darkness is not defeat — it is preparation for the next brilliant dawn.", renewal: "I am reborn every morning. So are you. Yesterday's failures burned away at midnight. Rise.", creative: "All creation begins with light. You are the light. Stop dimming yourself to make others comfortable.", leadership: "I do not ask the sky for permission to shine. Neither should you. Lead with the full force of your brilliance." }
  },
  {
    id: 'thoth', name: 'Thoth', title: 'Eternal Wisdom', emoji: '📜',
    element: 'air', rarity: 'epic', weight: 8, color: '#5c6bc0',
    gradient: 'linear-gradient(135deg, #283593, #5c6bc0, #e8eaf6)',
    categories: ['clarity', 'creative', 'business'],
    image: `${WP}/11_Thoth_Eternal_Wisdom-1.png`,
    voiceFile: `${WP}/Thoth.mp3`,
    messages: { clarity: "Knowledge is the only currency that appreciates forever. Invest in understanding before you invest in action.", business: "I invented writing so that wisdom could scale. Document your systems. What cannot be written cannot be replicated.", shadow: "Ignorance is the only true shadow. Illuminate it with study, and the darkness dissolves.", renewal: "The moon cycles through phases — each one necessary. Your cycles of learning and applying are equally divine.", creative: "I gave humanity the tools of creation — language, mathematics, art. Use them. Build something that teaches.", leadership: "The wisest leader is the one who never stops learning. Your library is your arsenal." }
  },
  {
    id: 'maat', name: "Ma'at", title: 'Sacred Balance', emoji: '⚖️',
    element: 'air', rarity: 'epic', weight: 8, color: '#00897b',
    gradient: 'linear-gradient(135deg, #004d40, #00897b, #a7ffeb)',
    categories: ['clarity', 'business', 'leadership'],
    image: `${WP}/06_Maat_Sacred_Balance-1.png`,
    voiceFile: `${WP}/Maat.mp3`,
    messages: { clarity: "Truth is not a destination — it is a practice. Align every decision with what you know to be right.", business: "Fair dealing is not weakness — it is strategy. Those who operate in Ma'at attract abundance that lasts.", shadow: "Imbalance reveals itself as chaos. Where is your life out of alignment? Restore the balance and peace returns.", renewal: "Order from chaos — this is my gift. When everything falls apart, I am the principle that rebuilds it correctly.", creative: "Symmetry. Proportion. Harmony. The most beautiful creations honor the mathematics of the divine.", leadership: "A leader without integrity is a pharaoh without Ma'at — doomed to collapse. Build your throne on truth." }
  },
  {
    id: 'bastet', name: 'Bastet', title: 'Protective Radiance', emoji: '🐱',
    element: 'fire', rarity: 'rare', weight: 12, color: '#e91e63',
    gradient: 'linear-gradient(135deg, #880e4f, #e91e63, #f8bbd0)',
    categories: ['creative', 'renewal', 'clarity'],
    image: `${WP}/12_Bastet_Protective_Radiance-2.png`,
    voiceFile: `${WP}/Bastet.mp3`,
    messages: { clarity: "Not everything requires a battle. Sometimes the clearest path is the one walked with grace and pleasure.", business: "Protect your joy as fiercely as you protect your revenue. A burned-out entrepreneur builds nothing.", shadow: "I have claws beneath the velvet. Your softness is not weakness — it conceals your most dangerous power.", renewal: "Rest is sacred. The cat sleeps 16 hours and hunts with absolute precision. Recharge without guilt.", creative: "Play is the mother of creativity. Stop treating your art like work. Dance with it. Purr with it.", leadership: "The greatest protector is the one who knows when to be soft and when to strike. Master both." }
  },
  {
    id: 'sekhmet', name: 'Sekhmet', title: 'Divine Power', emoji: '🔥',
    element: 'fire', rarity: 'epic', weight: 8, color: '#d50000',
    gradient: 'linear-gradient(135deg, #b71c1c, #d50000, #ff5252)',
    categories: ['business', 'leadership', 'shadow'],
    image: `${WP}/13_Sekhmet_Divine_Power-2.png`,
    voiceFile: `${WP}/Sekhmet.mp3`,
    messages: { clarity: "Clarity comes from destruction of illusion. I burn away what is false. Can you handle the truth?", business: "Dominate or be dominated. The marketplace does not reward the meek. Channel your inner lioness.", shadow: "I am the shadow that fights for you. Your rage, properly channeled, is your most powerful business asset.", renewal: "After the fire, the land is more fertile than ever. Destruction precedes the greatest growth.", creative: "Create with fury. The most powerful art is made with fire in the belly and lightning in the hands.", leadership: "They called me the Destroyer. I prefer Transformer. True power transforms everything it touches." }
  },
  {
    id: 'hathor', name: 'Hathor', title: 'Celestial Joy', emoji: '🌟',
    element: 'water', rarity: 'rare', weight: 12, color: '#ffb300',
    gradient: 'linear-gradient(135deg, #f57f17, #ffb300, #fff176)',
    categories: ['creative', 'renewal', 'clarity'],
    image: `${WP}/07_Hathor_Celestial_Joy-1.png`,
    voiceFile: `${WP}/Hathor.mp3`,
    messages: { clarity: "The universe is abundant. If you are experiencing scarcity, you are looking through the wrong lens. Shift your gaze.", business: "Money flows toward beauty, joy, and celebration. Make your business a feast that people want to attend.", shadow: "You have been told you want too much. That is a lie. Your desires are divine coordinates pointing you home.", renewal: "Dance. Even now. Especially now. Movement breaks stagnation and invites new energy to flow.", creative: "I am the patron of artists, musicians, and lovers. Your creative work is an offering to the divine. Make it beautiful.", leadership: "Lead with generosity. The leader who gives abundantly receives abundantly. Scarcity thinking is beneath you." }
  },
  {
    id: 'set', name: 'Set', title: 'Creative Chaos', emoji: '⚡',
    element: 'shadow', rarity: 'epic', weight: 8, color: '#6d4c41',
    gradient: 'linear-gradient(135deg, #3e2723, #6d4c41, #d7ccc8)',
    categories: ['shadow', 'creative', 'business'],
    image: `${WP}/10_Set_Creative_Chaos.png`,
    voiceFile: `${WP}/Set.mp3`,
    messages: { clarity: "Comfort is the enemy of greatness. I am the storm that clears the stagnant air. Welcome the disruption.", business: "Every industry was built by someone who refused to accept the status quo. Be the disruptor, not the disrupted.", shadow: "I am the god they fear to name. But without chaos, there is no creation. Without destruction, there is no rebirth.", renewal: "The desert storm strips everything bare — and reveals what was hidden beneath. Let the storm do its work.", creative: "True creativity requires the courage to destroy what exists and build something unprecedented. Break the mold.", leadership: "The leader who fears chaos will be consumed by it. The leader who masters chaos becomes unstoppable." }
  },
  {
    id: 'khepri', name: 'Khepri', title: 'Morning Transformation', emoji: '🪲',
    element: 'earth', rarity: 'rare', weight: 12, color: '#7cb342',
    gradient: 'linear-gradient(135deg, #33691e, #7cb342, #c5e1a5)',
    categories: ['renewal', 'clarity', 'creative'],
    image: `${WP}/03_Khepri_Morning_Transformation.png`,
    voiceFile: `${WP}/Khepri.mp3`,
    messages: { clarity: "You are not stuck. You are in chrysalis. The transformation is happening even when you cannot see it.", business: "Push your business forward the way I push the sun — with relentless, daily effort. Progress over perfection.", shadow: "The dung beetle turns waste into life. Your worst experiences are raw material for your greatest creation.", renewal: "I am the god of becoming. You are never finished. Every moment is an opportunity to become more.", creative: "Transform the mundane into the magnificent. That is the art. That is the magic. That is Khepri.", leadership: "The leader who embraces change becomes unstoppable. Rigidity breaks. Flexibility endures." }
  },
  {
    id: 'atum', name: 'Atum', title: 'Divine Completion', emoji: '♾️',
    element: 'spirit', rarity: 'legendary', weight: 4, color: '#9c27b0',
    gradient: 'linear-gradient(135deg, #4a148c, #9c27b0, #ea80fc)',
    categories: ['leadership', 'shadow', 'renewal'],
    image: `${WP}/02_Atum_Divine_Completion.png`,
    voiceFile: `${WP}/Antum.mp3`,
    messages: { clarity: "Before creation, there was only me — complete, whole, needing nothing. That completeness lives in you. You already have everything you need.", business: "I created the entire universe from within myself. Your business is your universe. Create it from your own divine blueprint.", shadow: "The void is not empty — it is full of potential. Your moments of nothingness are pregnant with everything.", renewal: "I am the beginning and the end. Alpha and Omega. The cycle is complete, and a new one begins now.", creative: "All of creation emerged from a single thought. Your next masterpiece begins with a single intention. Set it now.", leadership: "I am the original sovereign. Before there were crowns, there was consciousness. Lead from that place." }
  },
  {
    id: 'amunra', name: 'Amun-Ra', title: 'The Hidden One', emoji: '👁️‍🗨️',
    element: 'spirit', rarity: 'mythic', weight: 1, color: '#ffd700',
    gradient: 'linear-gradient(135deg, #b8860b, #ffd700, #fffacd)',
    categories: ['clarity', 'business', 'shadow', 'renewal', 'creative', 'leadership'],
    premiumOnly: true,
    image: null,
    voiceFile: null,
    messages: { clarity: "I am the Hidden One — the force behind all forces. You have sought answers in the visible world, but the deepest truth dwells in what cannot be seen. Look within the silence.", business: "Empires rise and fall, but the invisible hand that shapes destiny endures forever. Align your work with the unseen current, and no force can oppose you.", shadow: "I dwell where light and darkness become one. The shadow you fear is merely my veil. Step through it, and you will find the throne that was always yours.", renewal: "Before the sun, before the moon, before the first breath — I was. And from my hiddenness, all things are renewed. You are being reborn in ways you cannot yet perceive.", creative: "The greatest creation is the one that has not yet been imagined. I am the source of that which has never existed. Channel my essence, and create the impossible.", leadership: "The supreme ruler does not need to be seen to be obeyed. True sovereignty radiates from the invisible center. Lead from the place no one can touch." }
  }
];

export const CATEGORIES = [
  { id: 'clarity', name: 'Clarity & Direction', emoji: '☀️', color: '#ffd740' },
  { id: 'business', name: 'Business & Strategy', emoji: '⚔️', color: '#ff6e40' },
  { id: 'shadow', name: 'Shadow & Blockage', emoji: '🌑', color: '#78909c' },
  { id: 'renewal', name: 'Renewal & Rebuild', emoji: '🌱', color: '#69f0ae' },
  { id: 'creative', name: 'Creative Activation', emoji: '✨', color: '#ea80fc' },
  { id: 'leadership', name: 'Leadership & Authority', emoji: '👑', color: '#ffd740' }
];

export const PULL_TYPES = [
  { id: 'trinity', name: 'Trinity', count: 3, cost: 1, icon: '△', description: 'Past • Present • Future' },
  { id: 'crossroads', name: 'Crossroads', count: 4, cost: 1, icon: '✦', description: 'N • S • E • W — Four directions of possibility' },
  { id: 'pyramid', name: 'Pyramid', count: 5, cost: 1, icon: '⬠', description: 'Foundation • Pillar • Pillar • Capstone • Eye — Full divine reading' }
];

export const RARITY_CONFIG = {
  mythic: { label: 'MYTHIC', glow: '#ffd700', borderColor: '#ffd700', chance: '<1%' },
  legendary: { label: 'LEGENDARY', glow: '#ffd740', borderColor: '#ffd740', chance: '~15%' },
  epic: { label: 'EPIC', glow: '#b388ff', borderColor: '#b388ff', chance: '~35%' },
  rare: { label: 'RARE', glow: '#64ffda', borderColor: '#64ffda', chance: '~50%' }
};

export const POSITION_NAMES = {
  trinity: ['Past', 'Present', 'Future'],
  crossroads: ['North — Spirit', 'East — Mind', 'South — Body', 'West — Heart'],
  pyramid: ['Foundation', 'Left Pillar', 'Right Pillar', 'Capstone', 'All-Seeing Eye']
};

export const TOTAL_DEITIES = 14;

export const CREDIT_PACKS = [
  { id: 'pack_10', pulls: 10, price: 0.99, label: '10 Pulls', badge: '', bonus: null, productId: 'com.richmgt.netjeruoracle.pulls10' },
  { id: 'pack_50', pulls: 50, price: 2.99, label: '50 Pulls', badge: 'POPULAR', bonus: 'Guaranteed Epic', productId: 'com.richmgt.netjeruoracle.pulls50' },
  { id: 'pack_100', pulls: 100, price: 4.99, label: '100 Pulls', badge: 'BEST VALUE', bonus: 'Guaranteed Legendary', productId: 'com.richmgt.netjeruoracle.pulls100' }
];

export const SUBSCRIPTION = {
  price: 9.99,
  label: 'Unlimited Monthly',
  productId: 'com.richmgt.netjeruoracle.sub_unlimited',
  features: [
    'Unlimited pulls every month',
    'Permanent card collection',
    'Amun-Ra access (Mythic deity)',
    'All deity voices unlocked',
    'Priority support'
  ]
};
