"use client";

import { FLOWERS } from "@/lib/flowers";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, Sparkles, Feather, Plus, Minus, Flower2, Leaf } from "lucide-react";

interface FlowerSelectorProps {
    flowerCounts: Record<string, number>;
    onUpdateCount: (id: string, newCount: number) => void;
    maxTotal: number;
}

export const FlowerSelector = ({ flowerCounts, onUpdateCount, maxTotal }: FlowerSelectorProps) => {
    const categories = {
        flowers: FLOWERS.filter((f) => f.category === "flower"),
        leaves: FLOWERS.filter((f) => f.category === "leaf"),
        accessories: FLOWERS.filter((f) => f.category === "accessory"),
    };

    const currentTotal = Object.values(flowerCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-8 py-4">
            {/* Elegant Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/50 pb-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <Sparkles className="w-3 h-3" /> Step 01
                    </div>
                    <h2 className="text-4xl font-serif font-medium text-foreground tracking-tight">
                        Curate your <span className="italic text-primary">Specimens</span>
                    </h2>
                </div>

                <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-full px-4 py-2 backdrop-blur-3xl shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Selection: <span className="text-foreground">{currentTotal}</span> / {maxTotal}
                    </span>
                </div>
            </div>

            {Object.entries(categories).map(([key, items]) => (
                <div key={key} className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground/40 uppercase text-[9px] font-black tracking-[0.3em] pl-1">
                        <div className="h-[1px] w-4 bg-border" />
                        <span className="flex items-center gap-2">
                            {key === "flowers" && <Flower2 className="w-3 h-3 text-primary" />}
                            {key === "leaves" && <Leaf className="w-3 h-3 text-green-500" />}
                            {key === "accessories" && <Sparkles className="w-3 h-3 text-amber-500" />}
                            {key}
                        </span>
                        <div className="h-[1px] flex-1 bg-border" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((flower) => {
                            const count = flowerCounts[flower.id] || 0;
                            const isSelected = count > 0;

                            return (
                                <motion.div
                                    key={flower.id}
                                    whileHover={{ y: -2 }}
                                    className={`
                                        relative rounded-2xl p-3 flex items-center gap-4
                                        border transition-all duration-500 group select-none backdrop-blur-md
                                        ${isSelected
                                            ? "border-primary/30 bg-primary/10 shadow-[0_8px_30px_rgba(236,72,153,0.05)]"
                                            : "border-border bg-card/40 hover:bg-secondary/50 hover:border-primary/20"
                                        }
                                    `}
                                >
                                    <div
                                        className="absolute inset-0 z-0 cursor-pointer rounded-2xl"
                                        onClick={() => {
                                            if (count === 0 && currentTotal < maxTotal) onUpdateCount(flower.id, 1);
                                        }}
                                    />

                                    {/* Left Aligned Icon */}
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0
                                        ${isSelected ? 'bg-primary shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-secondary/50 border border-border'}
                                    `}>
                                        {flower.image ? (
                                            <img src={flower.image} alt={flower.name} className={`w-8 h-8 object-contain transition-all pointer-events-none ${isSelected ? 'brightness-110' : ''}`} />
                                        ) : (
                                            <span className="text-2xl filter drop-shadow-sm pointer-events-none group-hover:scale-110 transition-transform">
                                                {flower.emoji}
                                            </span>
                                        )}
                                    </div>

                                    {/* Middle Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-medium transition-colors truncate ${isSelected ? "text-foreground font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                                            {flower.name}
                                        </h4>
                                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-tighter group-hover:text-muted-foreground/60 transition-colors">
                                            Rare Breed
                                        </p>
                                    </div>

                                    {/* Right Aligned Controls / Count */}
                                    <div className="flex items-center gap-2 relative z-10 shrink-0">
                                        <AnimatePresence mode="wait">
                                            {isSelected ? (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    className="flex items-center gap-2 bg-background/80 border border-border rounded-full px-1.5 py-1 backdrop-blur-xl shadow-sm"
                                                >
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onUpdateCount(flower.id, count - 1); }}
                                                        className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center hover:bg-muted text-foreground transition-colors"
                                                    >
                                                        <Minus className="w-2.5 h-2.5" />
                                                    </button>

                                                    <span className="font-bold text-xs text-foreground min-w-[12px] text-center">{count}</span>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (currentTotal < maxTotal) onUpdateCount(flower.id, count + 1);
                                                        }}
                                                        disabled={currentTotal >= maxTotal}
                                                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center hover:opacity-90 text-primary-foreground transition-all disabled:opacity-30"
                                                    >
                                                        <Plus className="w-2.5 h-2.5" />
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-secondary/50 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Selection Glow */}
                                    {isSelected && (
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(236,72,153,0.3)]" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
