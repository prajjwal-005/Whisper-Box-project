
import { PatternId } from './patterns';

export type Theme = {
  id: string;
  name: string;
  description: string;
  category: "aesthetic" | "luxury" | "playful" | "minimal" | "bold";
  tier: "free" | "pro" | "premium";
  gradient: string;
  textColor: string;
  accentColor: string;
  pattern: PatternId;
  badge: string;
};

export const themes: Record<string, Theme> = {

  "sunset": {
    id: "sunset",
    name: "Sunset Vibes",
    description: "Warm evening glow with golden hour magic",
    category: "aesthetic",
    tier: "free",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)",
    textColor: "#ffffff",
    accentColor: "#FF6B6B",
    pattern: "soft-waves",
    badge: "🌅"
  },
  "ocean": {
    id: "ocean",
    name: "Ocean Depth",
    description: "Deep sea mystery with twilight blues",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    accentColor: "#764ba2",
    pattern: "basic-circles",
    badge: "🌊"
  },
  "forest": {
    id: "forest",
    name: "Forest Dreams",
    description: "Natural green energy from the woodland",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    textColor: "#ffffff",
    accentColor: "#11998e",
    pattern: "paper-grain",
    badge: "🌿"
  },
  "midnight": {
    id: "midnight",
    name: "Midnight Sky",
    description: "Dark starry night with cosmic hues",
    category: "bold",
    tier: "free",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 50%, #C471ED 100%)",
    textColor: "#ffffff",
    accentColor: "#C471ED",
    pattern: "grid-dots",
    badge: "🌙"
  },
  "fire": {
    id: "fire",
    name: "Fire Blaze",
    description: "Intense heat waves and burning passion",
    category: "bold",
    tier: "free",
    gradient: "linear-gradient(135deg, #FF512F 0%, #F09819 50%, #DD2476 100%)",
    textColor: "#ffffff",
    accentColor: "#FF512F",
    pattern: "simple-lines",
    badge: "🔥"
  },
  "cherry": {
    id: "cherry",
    name: "Cherry Blossom",
    description: "Soft spring petals in gentle bloom",
    category: "aesthetic",
    tier: "free",
    gradient: "linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #DDA0DD 100%)",
    textColor: "#ffffff",
    accentColor: "#FF69B4",
    pattern: "halftone",
    badge: "🌸"
  },
  "lemon": {
    id: "lemon",
    name: "Lemon Zest",
    description: "Bright citrus burst with sunny vibes",
    category: "playful",
    tier: "free",
    gradient: "linear-gradient(135deg, #FFF200 0%, #FFD700 50%, #FF8C00 100%)",
    textColor: "#713F12",
    accentColor: "#FF8C00",
    pattern: "minimal-cross",
    badge: "🍋"
  },
  "lavender": {
    id: "lavender",
    name: "Lavender Dream",
    description: "Calming purple haze for peaceful moments",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
    textColor: "#1e1e1e",
    accentColor: "#8EC5FC",
    pattern: "light-texture",
    badge: "💜"
  },
  "coral": {
    id: "coral",
    name: "Coral Reef",
    description: "Underwater warmth from tropical seas",
    category: "aesthetic",
    tier: "free",
    gradient: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)",
    textColor: "#ffffff",
    accentColor: "#FF9A9E",
    pattern: "paper-grain",
    badge: "🪸"
  },
  "mint": {
    id: "mint",
    name: "Mint Fresh",
    description: "Cool refreshing breeze on a summer day",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #A8E6CF 0%, #56CCF2 100%)",
    textColor: "#1e1e1e",
    accentColor: "#56CCF2",
    pattern: "soft-waves",
    badge: "🍃"
  },
  "peachy": {
    id: "peachy",
    name: "Peachy Keen",
    description: "Sweet fruit gradient with warm tones",
    category: "playful",
    tier: "free",
    gradient: "linear-gradient(135deg, #FFEAA7 0%, #FDCB6E 50%, #FD79A8 100%)",
    textColor: "#1e1e1e",
    accentColor: "#FD79A8",
    pattern: "halftone",
    badge: "🍑"
  },
  "electric": {
    id: "electric",
    name: "Electric Blue",
    description: "High voltage energy crackling bright",
    category: "bold",
    tier: "free",
    gradient: "linear-gradient(135deg, #00F5FF 0%, #0080FF 50%, #8000FF 100%)",
    textColor: "#ffffff",
    accentColor: "#00F5FF",
    pattern: "grid-dots",
    badge: "⚡"
  },
  "cloud-nine": {
    id: "cloud-nine",
    name: "Cloud Nine",
    description: "Soft sky serenity floating on air",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)",
    textColor: "#0C4A6E",
    accentColor: "#0369A1",
    pattern: "basic-circles",
    badge: "☁️"
  },
  "slate-stone": {
    id: "slate-stone",
    name: "Slate Stone",
    description: "Neutral professional with subtle elegance",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #CBD5E1 100%)",
    textColor: "#1E293B",
    accentColor: "#475569",
    pattern: "light-texture",
    badge: "⬜"
  },
  "blueprint-draft": {
    id: "blueprint-draft",
    name: "Blueprint",
    description: "Technical precision meets architectural design",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #172554 100%)",
    textColor: "#FFFFFF",
    accentColor: "#60A5FA",
    pattern: "minimal-cross",
    badge: "📐"
  },
  "simple-mono": {
    id: "simple-mono",
    name: "Simple Mono",
    description: "Classic black & white timeless design",
    category: "minimal",
    tier: "free",
    gradient: "linear-gradient(135deg, #000000 0%, #434343 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    pattern: "simple-lines",
    badge: "⚫"
  },
  "bubblegum": {
    id: "bubblegum",
    name: "Bubblegum Pop",
    description: "Sweet pink candy for playful spirits",
    category: "playful",
    tier: "free",
    gradient: "linear-gradient(135deg, #FFB3D9 0%, #FF69B4 100%)",
    textColor: "#831843",
    accentColor: "#BE185D",
    pattern: "basic-circles",
    badge: "🍬"
  },
  "sunshine": {
    id: "sunshine",
    name: "Sunshine Day",
    description: "Bright happy yellow radiating warmth",
    category: "playful",
    tier: "free",
    gradient: "linear-gradient(135deg, #FEF08A 0%, #FBBF24 100%)",
    textColor: "#713F12",
    accentColor: "#D97706",
    pattern: "halftone",
    badge: "☀️"
  },
  "cotton-candy": {
    id: "cotton-candy",
    name: "Cotton Candy",
    description: "Fairground sweetness spun with joy",
    category: "playful",
    tier: "free",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #F0ABFC 100%)",
    textColor: "#1e1e1e",
    accentColor: "#C026D3",
    pattern: "soft-waves",
    badge: "🍭"
  },


  "galaxy": {
    id: "galaxy",
    name: "Galaxy Burst",
    description: "Cosmic purple wonders across the universe",
    category: "bold",
    tier: "pro",
    gradient: "linear-gradient(135deg, #0F2027 0%, #203A43 30%, #2C5364 60%, #8E44AD 100%)",
    textColor: "#ffffff",
    accentColor: "#8E44AD",
    pattern: "dot-matrix",
    badge: "🌌"
  },
  "aurora": {
    id: "aurora",
    name: "Aurora Lights",
    description: "Northern lights dance in vibrant color",
    category: "aesthetic",
    tier: "pro",
    gradient: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 50%, #FF6BCB 100%)",
    textColor: "#ffffff",
    accentColor: "#FF6BCB",
    pattern: "wave-gradient",
    badge: "🌈"
  },
  "urban-concrete": {
    id: "urban-concrete",
    name: "Urban Concrete",
    description: "Industrial streetwear with raw texture",
    category: "bold",
    tier: "pro",
    gradient: "linear-gradient(135deg, #4B5563 0%, #374151 100%)",
    textColor: "#F3F4F6",
    accentColor: "#D1D5DB",
    pattern: "concrete-texture",
    badge: "🏢"
  },
  "carrara-luxe": {
    id: "carrara-luxe",
    name: "Carrara Marble",
    description: "Italian luxury stone with elegant veins",
    category: "luxury",
    tier: "pro",
    gradient: "linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)",
    textColor: "#171717",
    accentColor: "#525252",
    pattern: "marble-veins",
    badge: "🏛️"
  },
  "honeycomb-gold": {
    id: "honeycomb-gold",
    name: "Honeycomb",
    description: "Geometric gold cells in perfect harmony",
    category: "luxury",
    tier: "pro",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    textColor: "#FFFBEB",
    accentColor: "#FFF7ED",
    pattern: "hexagon-pattern",
    badge: "🐝"
  },
  "vapor-wave": {
    id: "vapor-wave",
    name: "Vapor Wave",
    description: "Retro-future aesthetic from the 80s",
    category: "aesthetic",
    tier: "pro",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)",
    textColor: "#FFFFFF",
    accentColor: "#22D3EE",
    pattern: "wave-gradient",
    badge: "📼"
  },
  "system-failure": {
    id: "system-failure",
    name: "System Error",
    description: "Glitchy matrix code in digital chaos",
    category: "bold",
    tier: "pro",
    gradient: "linear-gradient(135deg, #022C22 0%, #064E3B 100%)",
    textColor: "#34D399",
    accentColor: "#10B981",
    pattern: "dot-matrix",
    badge: "👾"
  },
  "hazard-warning": {
    id: "hazard-warning",
    name: "High Voltage",
    description: "Caution stripes with electric danger",
    category: "bold",
    tier: "pro",
    gradient: "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
    textColor: "#FACC15",
    accentColor: "#EAB308",
    pattern: "diagonal-lines",
    badge: "⚠️"
  },
  "ocean-ripple": {
    id: "ocean-ripple",
    name: "Ocean Ripple",
    description: "Concentric water waves spreading outward",
    category: "aesthetic",
    tier: "pro",
    gradient: "linear-gradient(135deg, #0891B2 0%, #0E7490 100%)",
    textColor: "#FFFFFF",
    accentColor: "#06B6D4",
    pattern: "water-ripples",
    badge: "💧"
  },
  "candy-shop": {
    id: "candy-shop",
    name: "Candy Shop",
    description: "Sweet treat paradise with sugary delights",
    category: "playful",
    tier: "pro",
    gradient: "linear-gradient(135deg, #F9A8D4 0%, #F472B6 100%)",
    textColor: "#831843",
    accentColor: "#BE185D",
    pattern: "candy-dots",
    badge: "🍬"
  },
  "bronze-age": {
    id: "bronze-age",
    name: "Bronze Age",
    description: "Ancient metallic warmth of civilizations",
    category: "luxury",
    tier: "pro",
    gradient: "linear-gradient(135deg, #78350F 0%, #92400E 100%)",
    textColor: "#FEF3C7",
    accentColor: "#F59E0B",
    pattern: "hexagon-pattern",
    badge: "🪙"
  },
  "retro-arcade": {
    id: "retro-arcade",
    name: "Retro Arcade",
    description: "8-bit gaming nostalgia with pixel charm",
    category: "playful",
    tier: "pro",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
    textColor: "#FFFFFF",
    accentColor: "#F472B6",
    pattern: "dot-matrix",
    badge: "🕹️"
  },
  "emerald-palace": {
    id: "emerald-palace",
    name: "Emerald Palace",
    description: "Royal green luxury fit for royalty",
    category: "luxury",
    tier: "pro",
    gradient: "linear-gradient(135deg, #047857 0%, #065F46 100%)",
    textColor: "#D1FAE5",
    accentColor: "#34D399",
    pattern: "marble-veins",
    badge: "💚"
  },

  "neon": {
    id: "neon",
    name: "Neon Nights",
    description: "Cyberpunk glow with electric intensity",
    category: "bold",
    tier: "premium",
    gradient: "linear-gradient(135deg, #FF006E 0%, #8338EC 50%, #3A86FF 100%)",
    textColor: "#ffffff",
    accentColor: "#FF006E",
    pattern: "thermal-scan",
    badge: "⚡"
  },
  "magma-core": {
    id: "magma-core",
    name: "Magma Core",
    description: "Volcanic lava cracks deep underground",
    category: "bold",
    tier: "premium",
    gradient: "linear-gradient(135deg, #450A0A 0%, #7F1D1D 100%)",
    textColor: "#FECACA",
    accentColor: "#EF4444",
    pattern: "volcanic-cracks",
    badge: "🌋"
  },
  "holographic": {
    id: "holographic",
    name: "Holographic",
    description: "Iridescent chrome shifting light spectrum",
    category: "aesthetic",
    tier: "premium",
    gradient: "linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 50%, #E5E7EB 100%)",
    textColor: "#111827",
    accentColor: "#6366F1",
    pattern: "chrome-reflection",
    badge: "💿"
  },
  "midnight-fog": {
    id: "midnight-fog",
    name: "Midnight Fog",
    description: "Ethereal dark mist in mysterious layers",
    category: "minimal",
    tier: "premium",
    gradient: "linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)",
    textColor: "#C7D2FE",
    accentColor: "#818CF8",
    pattern: "mist-layers",
    badge: "🌫️"
  },
  "liquid-gold": {
    id: "liquid-gold",
    name: "Liquid Gold",
    description: "Flowing molten luxury in motion",
    category: "luxury",
    tier: "premium",
    gradient: "linear-gradient(135deg, #713F12 0%, #A16207 100%)",
    textColor: "#FEF08A",
    accentColor: "#FACC15",
    pattern: "liquid-flow",
    badge: "🧈"
  },
  "neural-network": {
    id: "neural-network",
    name: "Neural Net",
    description: "AI brain synapses firing connections",
    category: "bold",
    tier: "premium",
    gradient: "linear-gradient(135deg, #4C1D95 0%, #2E1065 100%)",
    textColor: "#A78BFA",
    accentColor: "#C4B5FD",
    pattern: "neural-web",
    badge: "🧠"
  },
  "northern-lights": {
    id: "northern-lights",
    name: "Northern Lights",
    description: "Polar aurora dance in celestial beauty",
    category: "aesthetic",
    tier: "premium",
    gradient: "linear-gradient(135deg, #022C22 0%, #064E3B 50%, #065F46 100%)",
    textColor: "#6EE7B7",
    accentColor: "#34D399",
    pattern: "aurora-waves",
    badge: "✨"
  },

  "quantum-realm": {
    id: "quantum-realm",
    name: "Quantum Realm",
    description: "Subatomic particles in infinite possibility",
    category: "bold",
    tier: "premium",
    gradient: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)",
    textColor: "#DDD6FE",
    accentColor: "#A78BFA",
    pattern: "quantum-particles",
    badge: "⚛️"
  },
  "desert-mirage": {
    id: "desert-mirage",
    name: "Desert Mirage",
    description: "Shimmering heat waves across endless sand",
    category: "aesthetic",
    tier: "premium",
    gradient: "linear-gradient(135deg, #78350F 0%, #92400E 50%, #B45309 100%)",
    textColor: "#FEF3C7",
    accentColor: "#FBBF24",
    pattern: "heat-shimmer",
    badge: "🏜️"
  },
  "cosmic-dust": {
    id: "cosmic-dust",
    name: "Cosmic Dust",
    description: "Nebula clouds forming stars in deep space",
    category: "luxury",
    tier: "premium",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)",
    textColor: "#F1F5F9",
    accentColor: "#CBD5E1",
    pattern: "nebula-cloud",
    badge: "☄️"
  },
  "dragon-scale": {
    id: "dragon-scale",
    name: "Dragon Scale",
    description: "Mythical armor with iridescent shimmer",
    category: "luxury",
    tier: "premium",
    gradient: "linear-gradient(135deg, #166534 0%, #14532D 50%, #052E16 100%)",
    textColor: "#BBF7D0",
    accentColor: "#4ADE80",
    pattern: "scale-armor",
    badge: "🐉"
  },
  "frost-crystal": {
    id: "frost-crystal",
    name: "Frost Crystal",
    description: "Frozen fractals in geometric perfection",
    category: "aesthetic",
    tier: "premium",
    gradient: "linear-gradient(135deg, #0C4A6E 0%, #075985 50%, #0369A1 100%)",
    textColor: "#E0F2FE",
    accentColor: "#7DD3FC",
    pattern: "ice-fractal",
    badge: "❄️"
  },
  "prism-shard": {
    id: "prism-shard",
    name: "Prism Shard",
    description: "Refracting crystal splitting light beams",
    category: "luxury",
    tier: "premium",
    gradient: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    pattern: "crystal-prism",
    badge: "💎"
  }
};

export type ThemeKey = keyof typeof themes;