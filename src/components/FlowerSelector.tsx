"use client";

import { Flower, FLOWERS } from "@/lib/flowers";
import { motion } from "framer-motion";
import { Check, Leaf, Flower2 } from "lucide-react";

interface FlowerSelectorProps {
    selected: string[];
    onSelect: (id: string) => void;
    max: number;
}

export const FlowerSelector = ({ selected, onSelect, max }: FlowerSelectorProps) => {
    const categories = {
        flowers: FLOWERS.filter((f) => f.category === "flower"),
        leaves: FLOWERS.filter((f) => f.category === "leaf"),
    };

    return (
        <div className="space-y-8 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-serif text-primary">Pick Your Blooms</h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${selected.length >= 7 ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                    {selected.length} / {max} Selected (Min 7)
                </span>
            </div>

            {Object.entries(categories).map(([key, items]) => (
                <div key={key} className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-widest">
                        {key === "flowers" ? <Flower2 className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                        {key}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {items.map((flower) => {
                            const isSelected = selected.includes(flower.id);
                            return (
                                <motion.button
                                    key={flower.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onSelect(flower.id)}
                                    disabled={!isSelected && selected.length >= max}
                                    className={`
                    relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-2
                    border-2 transition-all duration-300 group
                    ${isSelected
                                            ? "border-primary bg-primary/5 shadow-inner"
                                            : "border-transparent bg-white/50 hover:bg-white hover:shadow-md hover:border-border"
                                        }
                    ${(!isSelected && selected.length >= max) ? "opacity-50 cursor-not-allowed grayscale" : ""}
                  `}
                                >
                                    <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                                        {flower.emoji}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground">{flower.name}</span>

                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
