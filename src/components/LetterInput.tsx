"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Cake, Calendar, Mail, User } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

interface LetterInputProps {
    letter: string;
    setLetter: (letter: string) => void;
    giftType: string;
    setGiftType: (gift: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    scratchMessage: string;
    setScratchMessage: (msg: string) => void;
    senderName: string;
    setSenderName: (name: string) => void;
    recipientName: string;
    setRecipientName: (name: string) => void;
    recipientEmail: string;
    setRecipientEmail: (email: string) => void;
    scheduledAt: string;
    setScheduledAt: (date: string) => void;
    isScheduled: boolean;
    setIsScheduled: (val: boolean) => void;
    secretCode: string;
    setSecretCode: (code: string) => void;
    creationType: "bouquet" | "message";
}

export const LetterInput = ({
    letter, setLetter,
    giftType, setGiftType,
    theme, setTheme,
    scratchMessage, setScratchMessage,
    senderName, setSenderName,
    recipientName, setRecipientName,
    recipientEmail, setRecipientEmail,
    scheduledAt, setScheduledAt,
    isScheduled, setIsScheduled,
    secretCode, setSecretCode,
    creationType
}: LetterInputProps) => {
    const { data: session } = useSession();

    return (
        <div className="space-y-5 p-6 rounded-[2rem] border border-white/10 bg-[#1a0508]/60 backdrop-blur-xl shadow-2xl">
            <div className="flex gap-3 mb-2">
                <button
                    onClick={() => setTheme("love")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all duration-300 ${theme === "love" ? "border-pink-500/50 bg-pink-500/10 text-pink-200 shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]" : "border-white/10 text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                    <Heart className={`w-4 h-4 ${theme === "love" ? "fill-current animate-pulse" : ""}`} />
                    <span className="font-medium tracking-wide text-sm">Love Theme</span>
                </button>
                <button
                    onClick={() => setTheme("birthday")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all duration-300 ${theme === "birthday" ? "border-amber-400/50 bg-amber-400/10 text-amber-200 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" : "border-white/10 text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                    <Cake className="w-4 h-4" />
                    <span className="font-medium tracking-wide text-sm">Birthday Theme</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest flex items-center gap-2 pl-1">
                            <User className="w-3 h-3" /> From
                        </label>
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="e.g. Secret Admirer"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all placeholder:text-white/20 text-white hover:bg-white/10 text-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest flex items-center gap-2 pl-1">
                            <User className="w-3 h-3" /> To *
                        </label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="e.g. My Valentine"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all placeholder:text-white/20 text-white hover:bg-white/10 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                        <button
                            onClick={() => setIsScheduled(false)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${!isScheduled ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                        >
                            Create Link Only
                        </button>
                        <button
                            onClick={() => session ? setIsScheduled(true) : signIn("google")}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${isScheduled ? 'bg-pink-500/20 text-pink-200 shadow-lg border border-pink-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                        >
                            {session ? "Schedule Delivery" : "Login to Schedule"}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isScheduled && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                            >
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest flex items-center gap-2 pl-1">
                                        <Mail className="w-3 h-3" /> Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={recipientEmail}
                                        onChange={(e) => setRecipientEmail(e.target.value)}
                                        placeholder="recipient@example.com"
                                        className="w-full bg-white/5 border border-pink-500/20 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all placeholder:text-white/20 text-white hover:bg-white/10 text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest flex items-center gap-2 pl-1">
                                        <Calendar className="w-3 h-3" /> Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={scheduledAt}
                                        onChange={(e) => setScheduledAt(e.target.value)}
                                        className="w-full bg-white/5 border border-pink-500/20 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all placeholder:text-white/20 text-white/80 hover:bg-white/10 scheme-dark text-sm"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest pl-1">
                        Write a Heartfelt Note
                    </label>
                    <textarea
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        placeholder="Dear my love..."
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all placeholder:text-white/20 resize-none font-serif text-base leading-relaxed show-scroll text-white/90 hover:bg-white/10"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="text-[10px] font-bold text-pink-200/60 uppercase tracking-widest flex items-center gap-2 pl-1">
                    <Gift className="w-3 h-3" />
                    Add a Secret Surprise
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div
                        onClick={() => setGiftType("envelope")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "envelope" ? "border-pink-500/50 bg-pink-500/10 shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]" : "border-white/10 hover:bg-white/5 hover:border-white/20"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm group-hover:text-white transition-colors ${giftType === "envelope" ? "text-pink-200" : "text-white/70"}`}>💌 Envelope</div>
                        <p className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors leading-tight">Digital envelope.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("scratch")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "scratch" ? "border-amber-400/50 bg-amber-400/10 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" : "border-white/10 hover:bg-white/5 hover:border-white/20"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm group-hover:text-white transition-colors ${giftType === "scratch" ? "text-amber-200" : "text-white/70"}`}>✨ Scratch</div>
                        <p className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors leading-tight">Scratch-off layer.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("code")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "code" ? "border-blue-400/50 bg-blue-400/10 shadow-[0_0_15px_-5px_rgba(96,165,250,0.3)]" : "border-white/10 hover:bg-white/5 hover:border-white/20"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm group-hover:text-white transition-colors ${giftType === "code" ? "text-blue-200" : "text-white/70"}`}>🔒 Safe</div>
                        <p className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors leading-tight">Secret code.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("none")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "none" ? "border-white/20 bg-white/5" : "border-white/10 hover:bg-white/5 hover:border-white/20"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm group-hover:text-white transition-colors ${giftType === "none" ? "text-white" : "text-white/70"}`}>None</div>
                        <p className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors leading-tight">Directly visible.</p>
                    </div>
                </div>

                <AnimatePresence>
                    {giftType === "scratch" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                        >
                            <input
                                type="text"
                                value={scratchMessage}
                                onChange={(e) => setScratchMessage(e.target.value)}
                                placeholder="e.g. Will you be my Valentine? 💖"
                                className="w-full bg-white/5 border border-amber-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400/50 outline-none text-center font-bold text-amber-100 placeholder:font-normal placeholder:text-white/20 transition-all hover:bg-white/10 text-sm"
                            />
                        </motion.div>
                    )}

                    {giftType === "code" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden"
                        >
                            <input
                                type="text"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                placeholder="Set Code"
                                className="bg-white/5 border border-blue-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 outline-none text-center font-bold text-blue-100 placeholder:font-normal placeholder:text-white/20 transition-all hover:bg-white/10 text-sm"
                            />
                            <input
                                type="text"
                                value={scratchMessage}
                                onChange={(e) => setScratchMessage(e.target.value)}
                                placeholder="Secret Message to Hide..."
                                className="md:col-span-2 bg-white/5 border border-blue-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 outline-none text-center font-bold text-blue-100 placeholder:font-normal placeholder:text-white/20 transition-all hover:bg-white/10 text-sm"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
