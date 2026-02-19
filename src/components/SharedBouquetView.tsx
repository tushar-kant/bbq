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
        giftType: "envelope" | "scratch" | "none";
        scratchMessage?: string;
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
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative ${data.theme === 'love' ? 'bg-rose-50' : 'bg-yellow-50'}`}>
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-float decoration-clone" />
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
                            onReveal={handleReveal}
                        />
                        <p className="text-center mt-8 text-muted-foreground animate-pulse text-sm font-medium tracking-widest uppercase">
                            {data.giftType === 'envelope' ? 'Open for a surprise' : 'Scratch to reveal'}
                        </p>
                    </motion.div>
                )}

                {stage === "bouquet" && (
                    <motion.div
                        key="bouquet"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full max-w-4xl flex flex-col items-center space-y-12 z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            className="w-full relative"
                        >
                            <BouquetCanvas
                                items={data.items}
                                setItems={() => { }}
                                isEditable={false}
                            />

                            {/* Theme Icon Decor */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-white">
                                {data.theme === 'love' ? (
                                    <Heart className="w-8 h-8 text-primary fill-primary/20 animate-pulse" />
                                ) : (
                                    <Cake className="w-8 h-8 text-yellow-500 fill-yellow-200 animate-bounce" />
                                )}
                            </div>
                        </motion.div>

                        {showLetter && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/40 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                                <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-6 italic text-center">
                                    A Message For You
                                </h3>

                                <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-wrap text-center">
                                    {data.letter || "Start dragging flowers to create your bouquet!"}
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <Heart className="w-4 h-4 text-primary/50" />
                                </div>
                            </motion.div>
                        )}

                        <motion.footer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-xs text-muted-foreground/50 pb-8"
                        >
                            Created with FORU
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
