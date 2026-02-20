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
    cardStyle: string;
    setCardStyle: (style: string) => void;
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
    cardStyle, setCardStyle,
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
        <div className="space-y-5 p-6 rounded-[2rem] border border-border bg-card/60 backdrop-blur-xl shadow-2xl transition-colors">
            <div className="flex gap-3 mb-2">
                <button
                    onClick={() => setTheme("love")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all duration-300 ${theme === "love" ? "border-pink-500/50 bg-pink-500/10 text-pink-600 dark:text-pink-200 shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]" : "border-border text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}
                >
                    <Heart className={`w-4 h-4 ${theme === "love" ? "fill-current animate-pulse" : ""}`} />
                    <span className="font-medium tracking-wide text-sm">Love Theme</span>
                </button>
                <button
                    onClick={() => setTheme("birthday")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all duration-300 ${theme === "birthday" ? "border-amber-400/50 bg-amber-400/10 text-amber-600 dark:text-amber-200 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" : "border-border text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}
                >
                    <Cake className="w-4 h-4" />
                    <span className="font-medium tracking-wide text-sm">Birthday Theme</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                            <User className="w-3 h-3" /> From
                        </label>
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="e.g. Secret Admirer"
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground hover:bg-secondary/50 text-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                            <User className="w-3 h-3" /> To *
                        </label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="e.g. My Valentine"
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground hover:bg-secondary/50 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-2 p-1 bg-muted/30 rounded-xl border border-border">
                        <button
                            onClick={() => setIsScheduled(false)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${!isScheduled ? 'bg-background text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                        >
                            Create Link Only
                        </button>
                        <button
                            onClick={() => session ? setIsScheduled(true) : signIn("google")}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${isScheduled ? 'bg-primary/10 text-primary shadow-sm border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
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
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                                        <Mail className="w-3 h-3" /> Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={recipientEmail}
                                        onChange={(e) => setRecipientEmail(e.target.value)}
                                        placeholder="recipient@example.com"
                                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground hover:bg-secondary/50 text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                                        <Calendar className="w-3 h-3" /> Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={scheduledAt}
                                        onChange={(e) => setScheduledAt(e.target.value)}
                                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-foreground hover:bg-secondary/50 text-sm [color-scheme:light] dark:[color-scheme:dark]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        Write a Heartfelt Note
                    </label>
                    <textarea
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        placeholder="Dear my love..."
                        className="w-full h-32 bg-secondary/30 border border-border rounded-xl p-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 resize-none font-serif text-base leading-relaxed show-scroll text-foreground hover:bg-secondary/50"
                    />
                </div>

                <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        Card Style
                    </label>
                    <div className="flex gap-2 p-1 bg-muted/30 rounded-xl border border-border overflow-x-auto no-scrollbar">
                        {[
                            { id: "classic", label: "Classic" },
                            { id: "midnight", label: "Midnight" },
                            { id: "glass", label: "Frosted Glass" },
                            { id: "botanic", label: "Botanic" }
                        ].map((style) => (
                            <button
                                key={style.id}
                                onClick={() => setCardStyle(style.id)}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 min-w-[80px] ${cardStyle === style.id ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                            >
                                {style.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 mt-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-3 block text-center">
                        Live Preview
                    </label>
                    <div className="perspective-1000 max-w-sm mx-auto">
                        <div className={`
                            p-6 relative overflow-hidden transition-all duration-1000 outline-none
                            ${(!cardStyle || cardStyle === 'classic') ? "bg-[#fffbf0] dark:bg-[#1e1e1e] rounded-[2px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-[#eaddcf] dark:border-white/10" : ""}
                            ${cardStyle === 'midnight' ? "bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_30px_-10px_rgba(56,189,248,0.2)]" : ""}
                            ${cardStyle === 'glass' ? "bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/20 rounded-3xl shadow-sm" : ""}
                            ${cardStyle === 'botanic' ? "bg-[#f2fceb] dark:bg-[#1a2f1c] rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(22,101,52,0.15)] border border-[#c1e1c1] dark:border-green-900/50" : ""}
                        `}>
                            {/* Textures & Effects based on style */}
                            {(!cardStyle || cardStyle === 'classic') && (
                                <>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/20 dark:border-primary/40 transition-colors" />
                                </>
                            )}

                            {cardStyle === 'midnight' && (
                                <>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
                                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                                    <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                                    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-blue-400/30 rounded-tl-lg" />
                                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-blue-400/30 rounded-br-lg" />
                                </>
                            )}

                            {cardStyle === 'glass' && (
                                <>
                                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/40 to-transparent" />
                                    <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
                                </>
                            )}

                            {cardStyle === 'botanic' && (
                                <>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-60 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                                    <div className="absolute -top-6 -right-6 text-6xl text-green-500/5 dark:text-green-500/10 transform rotate-45 pointer-events-none">🌿</div>
                                    <div className="absolute -bottom-6 -left-6 text-6xl text-green-500/5 dark:text-green-500/10 transform -rotate-45 pointer-events-none">🌿</div>
                                </>
                            )}

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="mb-3">
                                    <span className={`text-2xl 
                                        ${(!cardStyle || cardStyle === 'classic') && "text-primary/80"}
                                        ${cardStyle === 'midnight' && "text-blue-400/80 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"}
                                        ${cardStyle === 'glass' && "text-foreground/80"}
                                        ${cardStyle === 'botanic' && "text-green-600/80 dark:text-green-400/80"}
                                    `}>
                                        {cardStyle === 'botanic' ? '❅' : cardStyle === 'midnight' ? '✧' : '❦'}
                                    </span>
                                </div>

                                <h3 className={`font-serif text-xl font-bold mb-4 italic text-center tracking-wide leading-tight drop-shadow-sm transition-colors
                                    ${(!cardStyle || cardStyle === 'classic') && "text-primary"}
                                    ${cardStyle === 'midnight' && "text-blue-100"}
                                    ${cardStyle === 'glass' && "text-foreground"}
                                    ${cardStyle === 'botanic' && "text-green-900 dark:text-green-100"}
                                `}>
                                    Dear {recipientName || 'You'}
                                </h3>

                                <div className={`font-serif text-xs leading-relaxed whitespace-pre-wrap text-center max-w-[200px] mx-auto transition-colors line-clamp-3
                                    ${(!cardStyle || cardStyle === 'classic') && "text-[#4a4a4a] dark:text-neutral-300"}
                                    ${cardStyle === 'midnight' && "text-blue-50/80"}
                                    ${cardStyle === 'glass' && "text-foreground/90"}
                                    ${cardStyle === 'botanic' && "text-green-800/80 dark:text-green-200/80"}
                                `}>
                                    {letter || "Start typing your note to see it here..."}
                                </div>

                                <div className="mt-4 flex justify-center opacity-60">
                                    <span className={`text-lg transform rotate-180
                                        ${(!cardStyle || cardStyle === 'classic') && "text-primary"}
                                        ${cardStyle === 'midnight' && "text-blue-400"}
                                        ${cardStyle === 'glass' && "text-foreground"}
                                        ${cardStyle === 'botanic' && "text-green-600 dark:text-green-400"}
                                    `}>
                                        {cardStyle === 'botanic' ? '❅' : cardStyle === 'midnight' ? '✧' : '❦'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                    <Gift className="w-3 h-3" />
                    Add a Secret Surprise
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div
                        onClick={() => setGiftType("envelope")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "envelope" ? "border-pink-500/50 bg-pink-500/10 shadow-[0_0_15px_-5px_rgba(236,72,153,0.3)]" : "border-border hover:bg-secondary/50 hover:border-primary/30"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm transition-colors ${giftType === "envelope" ? "text-pink-600 dark:text-pink-200" : "text-muted-foreground group-hover:text-foreground"}`}>💌 Envelope</div>
                        <p className="text-[10px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors leading-tight">Digital envelope.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("scratch")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "scratch" ? "border-amber-400/50 bg-amber-400/10 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" : "border-border hover:bg-secondary/50 hover:border-amber-400/30"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm transition-colors ${giftType === "scratch" ? "text-amber-600 dark:text-amber-200" : "text-muted-foreground group-hover:text-foreground"}`}>✨ Scratch</div>
                        <p className="text-[10px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors leading-tight">Scratch-off layer.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("code")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "code" ? "border-blue-400/50 bg-blue-400/10 shadow-[0_0_15px_-5px_rgba(96,165,250,0.3)]" : "border-border hover:bg-secondary/50 hover:border-blue-400/30"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm transition-colors ${giftType === "code" ? "text-blue-600 dark:text-blue-200" : "text-muted-foreground group-hover:text-foreground"}`}>🔒 Safe</div>
                        <p className="text-[10px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors leading-tight">Secret code.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("none")}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 group ${giftType === "none" ? "border-border bg-card shadow-sm" : "border-border hover:bg-secondary/50 hover:border-primary/30"}`}
                    >
                        <div className={`font-bold mb-0.5 text-sm transition-colors ${giftType === "none" ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>None</div>
                        <p className="text-[10px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors leading-tight">Directly visible.</p>
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
                                className="w-full bg-secondary/30 border border-amber-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400/50 outline-none text-center font-bold text-amber-600 dark:text-amber-100 placeholder:font-normal placeholder:text-muted-foreground/50 transition-all hover:bg-secondary/50 text-sm"
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
                                className="bg-secondary/30 border border-blue-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 outline-none text-center font-bold text-blue-600 dark:text-blue-100 placeholder:font-normal placeholder:text-muted-foreground/50 transition-all hover:bg-secondary/50 text-sm"
                            />
                            <input
                                type="text"
                                value={scratchMessage}
                                onChange={(e) => setScratchMessage(e.target.value)}
                                placeholder="Secret Message to Hide..."
                                className="md:col-span-2 bg-secondary/30 border border-blue-400/30 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 outline-none text-center font-bold text-blue-600 dark:text-blue-100 placeholder:font-normal placeholder:text-muted-foreground/50 transition-all hover:bg-secondary/50 text-sm"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
