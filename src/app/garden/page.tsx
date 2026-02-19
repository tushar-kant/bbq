"use client";

import { BouquetShop } from "@/components/BouquetShop";
import { motion } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";

export default function GardenPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-32 md:pt-40 selection:bg-pink-500/30">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-[50vh] bg-pink-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-1/2 h-[50vh] bg-rose-500/5 blur-[120px]" />
                <div className="absolute inset-0 pattern-grid opacity-[0.03] text-foreground" />
            </div>

            <div className="relative z-10 w-full">
                <div className="container mx-auto px-6 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 text-xs font-bold text-pink-500 tracking-[0.2em] uppercase mb-6"
                    >
                        <Leaf className="w-3 h-3" /> The Collective Garden
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-foreground mb-6"
                    >
                        Bouquets of <span className="italic text-pink-500">Inspiration</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground font-light max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                    >
                        Explore a curated collection of digital wonders created by our community.
                        Each piece carries a unique story of <span className="text-foreground font-medium">affection and beauty</span>.
                    </motion.p>
                </div>

                {/* The Shop/Gallery Component */}
                <BouquetShop />
            </div>

            <footer className="relative z-10 py-20 text-center">
                <div className="flex flex-col items-center gap-4 opacity-30">
                    <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
                    <div className="h-20 w-px bg-gradient-to-b from-pink-500 to-transparent" />
                </div>
            </footer>
        </main>
    );
}
