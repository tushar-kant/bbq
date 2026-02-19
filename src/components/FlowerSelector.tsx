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
                <h2 className="text-2xl font-serif font-medium text-pink-200">Pick Your Blooms</h2>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${currentTotal >= 2 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-white/50 border-white/10'}`}>
                    {currentTotal} / {maxTotal} Items
                </span>
            </div>

            {Object.entries(categories).map(([key, items]) => (
                <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-pink-200/60 uppercase text-[10px] font-bold tracking-widest pl-1">
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
                                            ? "border-pink-500/50 bg-pink-500/10 shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]"
                                            : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                        }
                                    `}
                                >
                                    <div
                                        className="absolute inset-0 z-0 cursor-pointer"
                                        onClick={() => {
                                            if (count === 0 && currentTotal < maxTotal) onUpdateCount(flower.id, 1);
                                        }}
                                    />

                                    <span className="text-3xl filter drop-shadow-lg group-hover:drop-shadow-xl transition-all pointer-events-none">
                                        {flower.emoji}
                                    </span>
                                    <span className={`text-[10px] font-medium pointer-events-none transition-colors ${isSelected ? "text-pink-200" : "text-white/40 group-hover:text-white/70"}`}>{flower.name}</span>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute -bottom-2 left-0 w-full flex items-center justify-center gap-2 z-10"
                                            >
                                                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[#1a0508] border border-pink-500/30 shadow-xl scale-90">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onUpdateCount(flower.id, count - 1); }}
                                                        className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        <Minus className="w-2.5 h-2.5" />
                                                    </button>

                                                    <span className="font-bold text-xs text-pink-200 min-w-[10px] text-center">{count}</span>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (currentTotal < maxTotal) onUpdateCount(flower.id, count + 1);
                                                        }}
                                                        disabled={currentTotal >= maxTotal}
                                                        className="w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors disabled:opacity-50"
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
