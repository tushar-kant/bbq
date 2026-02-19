export interface Flower {
    id: string;
    name: string;
    color: string;
    emoji: string;
    image?: string;
    noStem?: boolean;
    category: "flower" | "leaf" | "accessory";
}

export const FLOWERS: Flower[] = [
    // Flowers
    { id: "custom-f1", name: "Artistic Flower 1", color: "#ff6b9d", emoji: "🌸", image: "/f1.svg", category: "flower" },
    { id: "custom-f2", name: "Artistic Flower 2", color: "#ef4444", emoji: "🌺", image: "/f2.svg", category: "flower" },
    { id: "rose-pink", name: "Pink Rose", color: "#ff6b9d", emoji: "🌹", category: "flower" },
    { id: "rose-red", name: "Red Rose", color: "#ef4444", emoji: "🥀", category: "flower" },
    { id: "tulip", name: "Tulip", color: "#f9a8d4", emoji: "🌷", category: "flower" },
    { id: "sunflower", name: "Sunflower", color: "#fbbf24", emoji: "🌻", category: "flower" },
    { id: "lily", name: "Lily", color: "#ffffff", emoji: "💮", category: "flower" },
    { id: "cherry", name: "Cherry Blossom", color: "#fbcfe8", emoji: "🌸", category: "flower" },
    { id: "lavender", name: "Lavender", color: "#a78bfa", emoji: "🪻", category: "flower" },
    { id: "daisy", name: "Daisy", color: "#fef3c7", emoji: "🌼", category: "flower" },
    { id: "hibiscus", name: "Hibiscus", color: "#f43f5e", emoji: "🌺", category: "flower" },

    // Leaves & Foliage
    { id: "leaf-1", name: "Green Leaf", color: "#22c55e", emoji: "🌿", category: "leaf" },
    { id: "eucalyptus", name: "Eucalyptus", color: "#94a3b8", emoji: "🌿", category: "leaf" },
    { id: "leaf-2", name: "Leafy Stem", color: "#15803d", emoji: "🍃", category: "leaf" },

    // Accessories (Design Elements)
    { id: "ribbon-red", name: "Red Ribbon", color: "#ef4444", emoji: "🎀", category: "accessory" },
    { id: "ribbon-silk", name: "Silk Bow", color: "#fbcfe8", emoji: "🎗️", category: "accessory" },
    { id: "butterfly", name: "Butterfly", color: "#38bdf8", emoji: "🦋", category: "accessory" },
    { id: "stars", name: "Star Dust", color: "#fef3c7", emoji: "⭐", category: "accessory" },
    { id: "heart", name: "Heart Pin", color: "#f43f5e", emoji: "💖", category: "accessory" },
    { id: "envelope", name: "Mini Card", color: "#fca5a5", emoji: "💌", category: "accessory" },
];

export interface BouquetItem {
    id: string;
    flowerId: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    rotation: number;
    scale: number;
    stemBend?: number;
    stemType?: number;
}
