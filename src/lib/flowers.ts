export interface Flower {
    id: string;
    name: string;
    color: string;
    emoji: string;
    category: "flower" | "leaf";
}

export const FLOWERS: Flower[] = [
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
    { id: "leaf-1", name: "Green Leaf", color: "#22c55e", emoji: "🌿", category: "leaf" },
    { id: "leaf-2", name: "Leafy Stem", color: "#15803d", emoji: "🍃", category: "leaf" },
    { id: "fern", name: "Fern", color: "#166534", emoji: "🌱", category: "leaf" },
];

export interface BouquetItem {
    id: string;
    flowerId: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    rotation: number;
    scale: number;
}
