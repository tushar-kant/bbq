"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, ArrowDown } from "lucide-react";

interface GiftRevealProps {
    type: "envelope" | "scratch" | "code" | "none";
    message?: string;
    code?: string;
    onReveal: () => void;
}

export const GiftReveal = ({ type, message, code, onReveal }: GiftRevealProps) => {
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

                {type === "code" && !isOpen && (
                    <motion.div
                        key="code"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                        exit={{ scale: 1.5, opacity: 0, rotate: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl w-[320px] flex flex-col items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 animate-bounce">
                            <div className="text-4xl">🔒</div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2 font-serif">Digital Safe</h3>
                            <p className="text-white/70 text-sm">Enter the secret code to unlock.</p>
                        </div>

                        <div className="flex gap-2 w-full">
                            <input
                                type="password"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                                placeholder="Enter Code"
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-center text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 font-bold tracking-widest"
                            />
                            <button
                                onClick={handleUnlock}
                                className="bg-white text-primary font-bold px-4 py-3 rounded-xl hover:bg-white/90 transition-colors"
                            >
                                🔓
                            </button>
                        </div>
                        {shake && <p className="text-red-300 text-xs font-bold animate-pulse">Incorrect Code!</p>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
