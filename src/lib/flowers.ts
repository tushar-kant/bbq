export interface Flower {
    id: string;
    name: string;
    color: string;
    emoji: string;
    category: "flower" | "leaf" | "accessory";
}

export const FLOWERS: Flower[] = [
    // Flowers
    { id: "rose-pink", name: "Pink Rose", color: "#ff6b9d", emoji: "🌹", category: "flower" },
    { id: "rose-red", name: "Red Rose", color: "#ef4444", emoji: "🥀", category: "flower" },
    { id: "tulip", name: "Tulip", color: "#f9a8d4", emoji: "🌷", category: "flower" },
    { id: "sunflower", name: "Sunflower", color: "#fbbf24", emoji: "🌻", category: "flower" },
    { id: "lily", name: "Lily", color: "#ffffff", emoji: "💮", category: "flower" },
    { id: "cherry", name: "Cherry Blossom", color: "#fbcfe8", emoji: "🌸", category: "flower" },
    { id: "lavender", name: "Lavender", color: "#a78bfa", emoji: "🪻", category: "flower" },
    { id: "daisy", name: "Daisy", color: "#fef3c7", emoji: "🌼", category: "flower" },
    { id: "hibiscus", name: "Hibiscus", color: "#f43f5e", emoji: "🌺", category: "flower" },
    { id: "orchid", name: "Orchid", color: "#d946ef", emoji: "🪷", category: "flower" },
    { id: "lotus", name: "Lotus", color: "#fca5a5", emoji: "🪷", category: "flower" },
    { id: "bouquet", name: "Mini Bouquet", color: "#f472b6", emoji: "💐", category: "flower" },
    { id: "white-flower", name: "Jasmine", color: "#ffffff", emoji: "🏵️", category: "flower" },

    // Leaves & Foliage
    { id: "leaf-1", name: "Green Leaf", color: "#22c55e", emoji: "🌿", category: "leaf" },
    { id: "leaf-2", name: "Leafy Stem", color: "#15803d", emoji: "🍃", category: "leaf" },
    { id: "fern", name: "Fern", color: "#166534", emoji: "🌱", category: "leaf" },
    { id: "clover", name: "Clover", color: "#4ade80", emoji: "🍀", category: "leaf" },
    { id: "four-leaf", name: "Lucky Clover", color: "#22c55e", emoji: "🍀", category: "leaf" },
    { id: "palm", name: "Palm Leaf", color: "#0d9488", emoji: "🌴", category: "leaf" },
    { id: "maple", name: "Maple Leaf", color: "#ea580c", emoji: "🍁", category: "leaf" },
    { id: "bamboo", name: "Bamboo", color: "#84cc16", emoji: "🎍", category: "leaf" },
    { id: "evergreen", name: "Evergreen", color: "#065f46", emoji: "🌲", category: "leaf" },

    // Accessories
    { id: "ribbon-red", name: "Red Ribbon", color: "#ef4444", emoji: "🎀", category: "accessory" },
    { id: "heart-sparkle", name: "Love Sparkle", color: "#f43f5e", emoji: "💖", category: "accessory" },
    { id: "butterfly", name: "Butterfly", color: "#38bdf8", emoji: "🦋", category: "accessory" },
    { id: "sparkles", name: "Magic Dust", color: "#fbbf24", emoji: "✨", category: "accessory" },
    { id: "teddy", name: "Tiny Bear", color: "#d97706", emoji: "🧸", category: "accessory" },
    { id: "gift-box", name: "Small Gift", color: "#a855f7", emoji: "🎁", category: "accessory" },
    { id: "star", name: "Star", color: "#fbbf24", emoji: "⭐", category: "accessory" },
    { id: "balloon", name: "Balloon", color: "#f472b6", emoji: "🎈", category: "accessory" },
    { id: "envelope", name: "Mini Card", color: "#fca5a5", emoji: "💌", category: "accessory" },
    { id: "ring", name: "Ring", color: "#38bdf8", emoji: "💍", category: "accessory" },
];

export interface BouquetItem {
    id: string;
    flowerId: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    rotation: number;
    scale: number;
}
