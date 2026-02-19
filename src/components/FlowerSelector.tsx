"use client";

import { Flower, FLOWERS } from "@/lib/flowers";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Leaf, Flower2, Sparkles, Plus, Minus } from "lucide-react";

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
        <div className="space-y-8 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-serif text-primary">Pick Your Blooms</h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${currentTotal >= 7 ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                    {currentTotal} / {maxTotal} Items (Min 7)
                </span>
            </div>

            {Object.entries(categories).map(([key, items]) => (
                <div key={key} className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-widest">
                        {key === "flowers" && <Flower2 className="w-4 h-4" />}
                        {key === "leaves" && <Leaf className="w-4 h-4" />}
                        {key === "accessories" && <Sparkles className="w-4 h-4" />}
                        {key}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {items.map((flower) => {
                            const count = flowerCounts[flower.id] || 0;
                            const isSelected = count > 0;

                            return (
                                <motion.div
                                    key={flower.id}
                                    className={`
                                        relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-2
                                        border-2 transition-all duration-300 group select-none
                                        ${isSelected
                                            ? "border-primary bg-primary/10 shadow-inner ring-1 ring-primary/50"
                                            : "border-transparent bg-white/40 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-md hover:border-primary/30"
                                        }
                                    `}
                                >
                                    {/* Main Click Area (only strictly works if not forcing interaction on buttons) 
                                        Actually, let's make the whole card clickable to increment ONLY if count is 0.
                                        If count > 0, controls appear.
                                    */}
                                    <div
                                        className="absolute inset-0 z-0 cursor-pointer"
                                        onClick={() => {
                                            if (count === 0 && currentTotal < maxTotal) onUpdateCount(flower.id, 1);
                                        }}
                                    />

                                    <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform pointer-events-none">
                                        {flower.emoji}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground pointer-events-none">{flower.name}</span>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute bottom-2 flex items-center justify-between w-full px-2 z-10"
                                            >
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onUpdateCount(flower.id, count - 1); }}
                                                    className="w-6 h-6 rounded-full bg-white dark:bg-white/10 text-primary shadow flex items-center justify-center hover:bg-red-50"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>

                                                <span className="font-bold text-sm text-primary">{count}</span>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (currentTotal < maxTotal) onUpdateCount(flower.id, count + 1);
                                                    }}
                                                    disabled={currentTotal >= maxTotal}
                                                    className="w-6 h-6 rounded-full bg-primary text-white shadow flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Helper for 0 count hover */}
                                    {!isSelected && currentTotal < maxTotal && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 dark:bg-white/5 rounded-2xl pointer-events-none transition-opacity">
                                            <Plus className="w-6 h-6 text-primary/50" />
                                        </div>
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
