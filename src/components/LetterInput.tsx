"use client";

import { motion } from "framer-motion";
import { Gift, Heart, Cake } from "lucide-react";

interface LetterInputProps {
    letter: string;
    setLetter: (letter: string) => void;
    giftType: string;
    setGiftType: (gift: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    scratchMessage: string;
    setScratchMessage: (msg: string) => void;
}

export const LetterInput = ({ letter, setLetter, giftType, setGiftType, theme, setTheme, scratchMessage, setScratchMessage }: LetterInputProps) => {
    return (
        <div className="space-y-8 glass p-8 rounded-3xl">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setTheme("love")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all ${theme === "love" ? "border-primary bg-primary/10 text-primary font-bold" : "border-border hover:bg-white"}`}
                >
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Love</span>
                </button>
                <button
                    onClick={() => setTheme("birthday")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all ${theme === "birthday" ? "border-primary bg-primary/10 text-primary font-bold" : "border-border hover:bg-white"}`}
                >
                    <Cake className="w-5 h-5" />
                    <span>Birthday</span>
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Write a Heartfelt Note
                </label>
                <textarea
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                    placeholder="Dear my love..."
                    className="w-full h-40 bg-white/50 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 resize-none font-serif text-lg leading-relaxed show-scroll"
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Add a Secret Surprise
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        onClick={() => setGiftType("envelope")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "envelope" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-white"}`}
                    >
                        <div className="font-bold text-foreground mb-1">💌 Sealed Envelope</div>
                        <p className="text-xs text-muted-foreground">Wrap your letter in a digital envelope they have to open.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("scratch")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "scratch" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-white"}`}
                    >
                        <div className="font-bold text-foreground mb-1">✨ Scratch Card</div>
                        <p className="text-xs text-muted-foreground">Hide a special message under a scratch-off layer.</p>
                    </div>
                    <div
                        onClick={() => setGiftType("none")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "none" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-white"}`}
                    >
                        <div className="font-bold text-muted-foreground mb-1">None</div>
                        <p className="text-xs text-muted-foreground">Just the bouquet and letter.</p>
                    </div>
                </div>

                {giftType === "scratch" && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pt-2"
                    >
                        <input
                            type="text"
                            value={scratchMessage}
                            onChange={(e) => setScratchMessage(e.target.value)}
                            placeholder="e.g. Will you be my Valentine? 💖"
                            className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-center font-bold text-foreground placeholder:font-normal"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};
