"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { GiftReveal } from "@/components/GiftReveal";
import { BouquetItem } from "@/lib/flowers";
import { Heart, Cake } from "lucide-react";
import confetti from "canvas-confetti";

interface SharedViewProps {
    data: {
        items: BouquetItem[];
        letter: string;
        theme: string;
        giftType: "envelope" | "scratch" | "code" | "none";
        scratchMessage?: string;
        secretCode?: string;
        type?: "bouquet" | "message";
    };
}

export const SharedBouquetView = ({ data }: SharedViewProps) => {
    const [stage, setStage] = useState<"gift" | "bouquet">("gift");
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        if (data.giftType === "none") {
            setStage("bouquet");
            setTimeout(() => setShowLetter(true), 1000);
        }
    }, [data.giftType]);

    const handleReveal = () => {
        setTimeout(() => {
            setStage("bouquet");
            setTimeout(() => setShowLetter(true), 1500);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: data.theme === 'love' ? ['#ff6b9d', '#ffccd5'] : ['#fcd34d', '#fbbf24']
            });
        }, 1000);
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative ${data.theme === 'love' ? 'bg-gradient-to-br from-rose-100 via-rose-50 to-white dark:from-[#2d121b] dark:via-[#1a0b12] dark:to-black' : 'bg-gradient-to-br from-yellow-100 via-amber-50 to-white dark:from-[#2d2512] dark:via-[#1a150b] dark:to-black'}`}>
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-float opacity-40" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-float decoration-clone opacity-40" />
                {/* Noise Texture Overlay for Grainy Look */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 dark:brightness-50" />
            </div>

            <AnimatePresence mode="wait">
                {stage === "gift" && data.giftType !== "none" && (
                    <motion.div
                        key="gift"
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                        className="z-50"
                    >
                        <GiftReveal
                            type={data.giftType}
                            message={data.scratchMessage}
                            code={data.secretCode}
                            onReveal={handleReveal}
                        />
                        <p className="text-center mt-8 text-black/60 dark:text-white/60 animate-pulse text-sm font-bold tracking-widest uppercase drop-shadow-sm">
                            {data.giftType === 'envelope' ? 'Open for a surprise' : data.giftType === 'code' ? 'Unlock to read' : 'Scratch to reveal'}
                        </p>
                    </motion.div>
                )}

                {stage === "bouquet" && (
                    <motion.div
                        key="bouquet"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full max-w-4xl flex flex-col items-center space-y-12 z-10 relative"
                    >
                        {data.type !== 'message' && (
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                className="w-full relative px-4"
                            >
                                <div className="relative z-10">
                                    <BouquetCanvas
                                        items={data.items}
                                        setItems={() => { }}
                                        isEditable={false}
                                    />
                                </div>

                                {/* Theme Icon Decor */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-white/90 dark:bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 dark:border-white/10 z-20">
                                    {data.theme === 'love' ? (
                                        <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20 animate-pulse filter drop-shadow-lg" />
                                    ) : (
                                        <Cake className="w-10 h-10 text-amber-500 fill-amber-500/20 animate-bounce filter drop-shadow-lg" />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {showLetter && (
                            <motion.div
                                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                                className="w-full max-w-xl mx-4 perspective-1000"
                            >
                                <div className="bg-[#fffbf0] dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-[#eaddcf] dark:border-white/10 relative overflow-hidden">
                                    {/* Paper Texture Effect */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />

                                    {/* Decorative Borders/Corners */}
                                    <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/20 dark:border-primary/40" />
                                    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/20 dark:border-primary/40" />
                                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/20 dark:border-primary/40" />
                                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/20 dark:border-primary/40" />

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="mb-6">
                                            <span className="text-4xl text-primary/80">❦</span>
                                        </div>

                                        <h3 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-8 italic text-center tracking-wide leading-tight drop-shadow-sm">
                                            {data.type === 'message' ? 'A Special Letter' : 'A Message For You'}
                                        </h3>

                                        <div className="font-serif text-lg md:text-xl leading-relaxed text-[#4a4a4a] dark:text-neutral-300 whitespace-pre-wrap text-center max-w-md mx-auto">
                                            {data.letter || "Thank You!"}
                                        </div>

                                        <div className="mt-10 flex justify-center opacity-60">
                                            <span className="text-2xl text-primary transform rotate-180">❦</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <motion.footer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-xs font-medium text-muted-foreground/60 tracking-widest uppercase pb-8"
                        >
                            Orchestrated by FORU
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
