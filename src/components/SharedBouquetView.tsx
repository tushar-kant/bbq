"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { GiftReveal } from "@/components/GiftReveal";
import { BouquetItem } from "@/lib/flowers";
import { Heart, Cake } from "lucide-react";
import confetti from "canvas-confetti";
import { HeartLoader } from "@/components/HeartLoader";
import Link from "next/link";

interface SharedViewProps {
    data: {
        items: BouquetItem[];
        letter: string;
        theme: string;
        giftType: "envelope" | "scratch" | "code" | "surprise" | "none";
        scratchMessage?: string;
        secretCode?: string;
        type?: "bouquet" | "message";
        canvasBackground?: string;
        recipientName?: string;
        cardStyle?: string;
    };
}

export const SharedBouquetView = ({ data }: SharedViewProps) => {
    const [stage, setStage] = useState<"gift" | "bouquet">(data.giftType === "none" ? "bouquet" : "gift");
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        if (data.giftType === "none") {
            const letterTimer = setTimeout(() => setShowLetter(true), 1000);
            return () => clearTimeout(letterTimer);
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
        <div
            className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative transition-colors duration-1000 ${!data.canvasBackground ? (data.theme === 'love' ? 'bg-gradient-to-br from-rose-100 via-rose-50 to-white dark:from-[#2d121b] dark:via-[#1a0b12] dark:to-black' : 'bg-gradient-to-br from-yellow-100 via-amber-50 to-white dark:from-[#2d2512] dark:via-[#1a150b] dark:to-black') : ''}`}
            style={data.canvasBackground ? { background: data.canvasBackground } : {}}
        >
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
                            recipientName={data.recipientName}
                            onReveal={handleReveal}
                        />
                        <p className="text-center mt-8 text-black/60 dark:text-white/60 animate-pulse text-sm font-bold tracking-widest uppercase drop-shadow-sm">
                            {data.giftType === 'envelope' ? 'Open for a surprise' : data.giftType === 'code' ? 'Unlock to read' : data.giftType === 'surprise' ? 'Open the gift box' : 'Scratch to reveal'}
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
                                        background={data.canvasBackground}
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
                                <div className={`
                                    p-8 md:p-12 relative overflow-hidden transition-all duration-1000
                                    ${(!data.cardStyle || data.cardStyle === 'classic') ? "bg-[#fffbf0] dark:bg-[#1e1e1e] rounded-[2px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-[#eaddcf] dark:border-white/10" : ""}
                                    ${data.cardStyle === 'midnight' ? "bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_50px_-12px_rgba(56,189,248,0.2)]" : ""}
                                    ${data.cardStyle === 'glass' ? "bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]" : ""}
                                    ${data.cardStyle === 'botanic' ? "bg-[#f2fceb] dark:bg-[#1a2f1c] rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(22,101,52,0.15)] border border-[#c1e1c1] dark:border-green-900/50" : ""}
                                    ${data.cardStyle === 'vintage' ? "bg-[#e3d5c8] dark:bg-[#3e2723] rounded-[2px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border-4 border-double border-[#8d6e63] dark:border-[#795548]" : ""}
                                    ${data.cardStyle === 'cyberpunk' ? "bg-black rounded-lg shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-pink-500/50" : ""}
                                    ${data.cardStyle === 'ocean' ? "bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-950 rounded-3xl shadow-[0_20px_50px_-12px_rgba(6,182,212,0.2)] border border-cyan-500/30" : ""}
                                `}>
                                    {/* Textures & Effects based on style */}
                                    {(!data.cardStyle || data.cardStyle === 'classic') && (
                                        <>
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                                            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                        </>
                                    )}

                                    {data.cardStyle === 'midnight' && (
                                        <>
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
                                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-blue-400/30 rounded-tl-xl" />
                                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-blue-400/30 rounded-br-xl" />
                                        </>
                                    )}

                                    {data.cardStyle === 'glass' && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-50 rounded-3xl pointer-events-none" />
                                            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </>
                                    )}

                                    {data.cardStyle === 'botanic' && (
                                        <>
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-60 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                                            <div className="absolute -top-10 -right-10 text-9xl text-green-500/5 dark:text-green-500/10 transform rotate-45 pointer-events-none">🌿</div>
                                            <div className="absolute -bottom-10 -left-10 text-9xl text-green-500/5 dark:text-green-500/10 transform -rotate-45 pointer-events-none">🌿</div>
                                        </>
                                    )}

                                    {data.cardStyle === 'vintage' && (
                                        <>
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-80 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8d6e63] to-transparent opacity-30" />
                                            <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8d6e63] to-transparent opacity-30" />
                                        </>
                                    )}

                                    {data.cardStyle === 'cyberpunk' && (
                                        <>
                                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pink-500" />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pink-500" />
                                        </>
                                    )}

                                    {data.cardStyle === 'ocean' && (
                                        <>
                                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />
                                            <div className="absolute -top-16 -left-16 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                                        </>
                                    )}

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="mb-6">
                                            <span className={`text-4xl 
                                                ${(!data.cardStyle || data.cardStyle === 'classic') && "text-primary/80"}
                                                ${data.cardStyle === 'midnight' && "text-blue-400/80 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"}
                                                ${data.cardStyle === 'glass' && "text-foreground/80"}
                                                ${data.cardStyle === 'botanic' && "text-green-600/80 dark:text-green-400/80"}
                                                ${data.cardStyle === 'vintage' && "text-[#5d4037] dark:text-[#d7ccc8]"}
                                                ${data.cardStyle === 'cyberpunk' && "text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"}
                                                ${data.cardStyle === 'ocean' && "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"}
                                            `}>
                                                {data.cardStyle === 'botanic' ? '❅' : data.cardStyle === 'midnight' ? '✧' : data.cardStyle === 'vintage' ? '✉' : data.cardStyle === 'cyberpunk' ? '⚡' : data.cardStyle === 'ocean' ? '≈' : '❦'}
                                            </span>
                                        </div>

                                        <h3 className={`font-serif text-3xl md:text-4xl font-bold mb-8 italic text-center tracking-wide leading-tight drop-shadow-sm transition-colors
                                            ${(!data.cardStyle || data.cardStyle === 'classic') && "text-primary"}
                                            ${data.cardStyle === 'midnight' && "text-blue-100"}
                                            ${data.cardStyle === 'glass' && "text-foreground"}
                                            ${data.cardStyle === 'botanic' && "text-green-900 dark:text-green-100"}
                                            ${data.cardStyle === 'vintage' && "text-[#4e342e] dark:text-[#efebe9]"}
                                            ${data.cardStyle === 'cyberpunk' && "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-sans tracking-widest not-italic"}
                                            ${data.cardStyle === 'ocean' && "text-cyan-50"}
                                        `}>
                                            {data.type === 'message' ? 'A Special Letter' : `Dear ${data.recipientName || 'You'}`}
                                        </h3>

                                        <div className={`font-serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap text-center max-w-md mx-auto transition-colors
                                            ${(!data.cardStyle || data.cardStyle === 'classic') && "text-[#4a4a4a] dark:text-neutral-300"}
                                            ${data.cardStyle === 'midnight' && "text-blue-50/80"}
                                            ${data.cardStyle === 'glass' && "text-foreground/90"}
                                            ${data.cardStyle === 'botanic' && "text-green-800/80 dark:text-green-200/80"}
                                            ${data.cardStyle === 'vintage' && "text-[#5d4037] dark:text-[#d7ccc8]"}
                                            ${data.cardStyle === 'cyberpunk' && "text-pink-100 font-mono tracking-tight"}
                                            ${data.cardStyle === 'ocean' && "text-cyan-100/90"}
                                        `}>
                                            {data.letter || "Thank You!"}
                                        </div>

                                        <div className="mt-10 flex justify-center opacity-60">
                                            <span className={`text-2xl transform rotate-180
                                                ${(!data.cardStyle || data.cardStyle === 'classic') && "text-primary"}
                                                ${data.cardStyle === 'midnight' && "text-blue-400"}
                                                ${data.cardStyle === 'glass' && "text-foreground"}
                                                ${data.cardStyle === 'botanic' && "text-green-600 dark:text-green-400"}
                                                ${data.cardStyle === 'vintage' && "text-[#5d4037] dark:text-[#d7ccc8]"}
                                                ${data.cardStyle === 'cyberpunk' && "text-cyan-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"}
                                                ${data.cardStyle === 'ocean' && "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"}
                                            `}>
                                                {data.cardStyle === 'botanic' ? '❅' : data.cardStyle === 'midnight' ? '✧' : data.cardStyle === 'vintage' ? '✉' : data.cardStyle === 'cyberpunk' ? '⚡' : data.cardStyle === 'ocean' ? '≈' : '❦'}
                                            </span>
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
                            <Link href="/" className="hover:text-pink-500 transition-colors duration-300">
                                Orchestrated by FORU
                            </Link>
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
