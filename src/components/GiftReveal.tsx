"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, ArrowDown, Lock, Unlock, Gift } from "lucide-react";

interface GiftRevealProps {
    type: "envelope" | "scratch" | "code" | "surprise" | "none";
    message?: string;
    code?: string;
    recipientName?: string;
    onReveal: () => void;
}

export const GiftReveal = ({ type, message, code, recipientName, onReveal }: GiftRevealProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);

    // Handle "none" type auto-reveal
    useEffect(() => {
        if (type === "none") {
            onReveal();
        }
    }, [type, onReveal]);

    // Handle Scratch Card Logic
    useEffect(() => {
        if (type !== "scratch" || isScratched) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const items = ["💖", "✨", "🎁", "🌹"];

        // Draw scratch layer
        ctx.fillStyle = "#d1d5db"; // gray-300
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add pattern
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#9ca3af";
        ctx.font = "24px sans-serif";
        for (let i = 0; i < 20; i++) {
            ctx.fillText(items[Math.floor(Math.random() * items.length)], Math.random() * canvas.width, Math.random() * canvas.height);
        }

        let scratchCount = 0;

        const handleScratch = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();

            // Check progress
            scratchCount++;
            if (scratchCount > 50 && !isScratched) {
                setIsScratched(true);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                onReveal();
            }
        };

        const onMove = (e: MouseEvent | TouchEvent) => handleScratch(e);

        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("touchmove", onMove);

        return () => {
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("touchmove", onMove);
        };
    }, [type, isScratched, onReveal]);

    const handleOpenEnvelope = () => {
        setIsOpen(true);
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 },
            colors: ['#ff6b9d', '#fbcfe8', '#ffffff']
        });
        setTimeout(onReveal, 800);
    };

    const handleOpenSurprise = () => {
        setIsOpen(true);
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#ec4899', '#3b82f6', '#ffffff'] // colorful explosion
        });
        setTimeout(onReveal, 1000);
    };

    const [inputCode, setInputCode] = useState("");
    const [shake, setShake] = useState(false);

    const handleUnlock = () => {
        const normalizedInput = inputCode.trim().toLowerCase();
        const normalizedCode = (code || "").trim().toLowerCase();

        // If code is somehow missing/empty (legacy data), unlock with strict warning or just unlock
        // Or if inputs match
        if (normalizedInput === normalizedCode || !normalizedCode) {
            setIsOpen(true);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.7 },
                colors: ['#34d399', '#10b981', '#ffffff'] // Green success
            });
            setTimeout(onReveal, 800);
        } else {
            console.log("Validation Failed:", { input: normalizedInput, expected: normalizedCode });
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setInputCode("");
        }
    };

    if (type === "none") return null;

    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
            <AnimatePresence mode="wait">
                {type === "envelope" && !isOpen && (
                    <motion.div
                        key="envelope"
                        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        onClick={handleOpenEnvelope}
                        className="cursor-pointer relative group perspective-1000"
                    >
                        <div className="w-72 h-48 bg-gradient-to-br from-primary to-accent shadow-2xl rounded-lg flex items-center justify-center relative overflow-hidden border-t-8 border-white/20">
                            <div className="absolute inset-0 pattern-grid opacity-10" />
                            <Mail className="w-20 h-20 text-white drop-shadow-md z-10" />
                            {recipientName && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                                    <p className="font-serif italic text-white/90 text-sm tracking-wide bg-black/10 px-3 py-0.5 rounded-full backdrop-blur-sm border border-white/10 uppercase font-bold text-[10px]">Dear {recipientName}</p>
                                </div>
                            )}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" />
                        </div>

                        <div className="absolute -top-4 -right-4 bg-white text-primary px-4 py-1 rounded-full text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform flex items-center gap-1 border border-primary/10">
                            Tap to Open <ArrowDown className="w-3 h-3" />
                        </div>
                    </motion.div>
                )}

                {type === "scratch" && !isScratched && (
                    <motion.div
                        key="scratch"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white w-[300px] h-[200px]"
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 p-4 text-center">
                            <p className="text-xl font-bold text-primary animate-pulse leading-tight">
                                {message || "Scratch specifically here! ✨"}
                            </p>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={200}
                            className="relative z-10 cursor-crosshair touch-none mix-blend-multiply"
                        />
                        <div className="absolute bottom-0 w-full text-center text-[10px] font-bold text-gray-400 pointer-events-none z-20 bg-white/80 py-1 uppercase tracking-widest">
                            Rub to Reveal Surprise
                        </div>
                    </motion.div>
                )}

                {type === "surprise" && !isOpen && (
                    <motion.div
                        key="surprise"
                        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)", y: -50 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleOpenSurprise}
                        className="cursor-pointer relative group perspective-1000"
                    >
                        <motion.div
                            animate={{ rotate: [0, -2, 2, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-56 h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] rounded-3xl flex items-center justify-center relative overflow-hidden border-4 border-white/20 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-shadow duration-500"
                        >
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="absolute top-0 bottom-0 left-1/2 -ml-3 w-6 bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            <div className="absolute left-0 right-0 top-1/2 -mt-3 h-6 bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            <Gift className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10" />
                            {recipientName && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full px-4">
                                    <p className="font-serif italic text-white text-xs tracking-wide bg-black/20 py-1 rounded-full backdrop-blur-md border border-white/20 uppercase font-bold drop-shadow-md text-center line-clamp-1">To {recipientName}</p>
                                </div>
                            )}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse" />
                        </motion.div>

                        <div className="absolute -top-6 -right-6 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-black shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform flex items-center gap-1 border border-purple-500/20">
                            Tap to Open ✨
                        </div>
                    </motion.div>
                )}

                {type === "code" && !isOpen && (
                    <motion.div
                        key="code"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            x: shake ? [0, -10, 10, -10, 10, 0] : 0,
                            rotate: shake ? [0, -2, 2, -2, 2, 0] : 0
                        }}
                        exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-full max-w-[340px] px-4"
                    >
                        <div className="relative overflow-hidden bg-black/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl flex flex-col items-center gap-6">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                            {/* Icon */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-500" />
                                <div className="relative w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                    <Lock className="w-8 h-8 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="text-center space-y-2 relative z-10">
                                <h3 className="text-2xl font-bold text-white font-serif tracking-wide drop-shadow-sm">Digital Safe</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">Enter the secret code to unlock<br />your message.</p>
                            </div>

                            {/* Input Area */}
                            <div className="w-full space-y-4 relative z-10">
                                <div className="relative group">
                                    <input
                                        type="password"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                                        placeholder="••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-center text-white placeholder:text-white/10 focus:outline-none focus:bg-white/10 focus:border-white/20 focus:ring-1 focus:ring-white/20 text-2xl font-bold tracking-[0.5em] transition-all"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    onClick={handleUnlock}
                                    className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg shadow-white/5"
                                >
                                    <span>Unlock to Read</span>
                                    <Unlock className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {shake && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-300 text-xs font-bold flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20"
                                >
                                    <span>⚠️</span> Incorrect Code
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
