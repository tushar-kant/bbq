"use client";

import { FLOWERS } from "@/lib/flowers";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Flower2, Sparkles, Plus, Minus } from "lucide-react";

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
        <div className="space-y-5 py-2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-serif font-medium text-foreground">Pick Your Blooms</h2>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${currentTotal >= 2 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'bg-muted text-muted-foreground border-border'}`}>
                    {currentTotal} / {maxTotal} Items
                </span>
            </div>

            {Object.entries(categories).map(([key, items]) => (
                <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest pl-1">
                        {key === "flowers" && <Flower2 className="w-3 h-3" />}
                        {key === "leaves" && <Leaf className="w-3 h-3" />}
                        {key === "accessories" && <Sparkles className="w-3 h-3" />}
                        {key}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                        {items.map((flower) => {
                            const count = flowerCounts[flower.id] || 0;
                            const isSelected = count > 0;

                            return (
                                <motion.div
                                    key={flower.id}
                                    whileHover={{ scale: 1.05 }}
                                    className={`
                                        relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1.5
                                        border transition-all duration-300 group select-none backdrop-blur-sm
                                        ${isSelected
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border bg-card/40 hover:bg-card/60 hover:border-primary/20"
                                        }
                                    `}
                                >
                                    <div
                                        className="absolute inset-0 z-0 cursor-pointer"
                                        onClick={() => {
                                            if (count === 0 && currentTotal < maxTotal) onUpdateCount(flower.id, 1);
                                        }}
                                    />

                                    <span className="text-3xl filter drop-shadow-sm group-hover:drop-shadow-md transition-all pointer-events-none">
                                        {flower.emoji}
                                    </span>
                                    <span className={`text-[10px] font-medium pointer-events-none transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>{flower.name}</span>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute -bottom-2 left-0 w-full flex items-center justify-center gap-2 z-10"
                                            >
                                                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-background border border-border shadow-lg scale-90">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onUpdateCount(flower.id, count - 1); }}
                                                        className="w-4 h-4 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors"
                                                    >
                                                        <Minus className="w-2.5 h-2.5" />
                                                    </button>

                                                    <span className="font-bold text-xs text-foreground min-w-[10px] text-center">{count}</span>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (currentTotal < maxTotal) onUpdateCount(flower.id, count + 1);
                                                        }}
                                                        disabled={currentTotal >= maxTotal}
                                                        className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                                                    >
                                                        <Plus className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
