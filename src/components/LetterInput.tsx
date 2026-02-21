"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Cake, Calendar, Mail, User, Sparkles, PenTool, Wand2, Plus, Info, Palette } from "lucide-react";
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
    onFinalize?: () => void;
    isSaving?: boolean;
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
    creationType,
    onFinalize,
    isSaving
}: LetterInputProps) => {
    const { data: session } = useSession();

    return (
        <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <PenTool className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-semibold text-foreground">Draft your message</h2>
                        <p className="text-[10px] text-foreground font-black uppercase tracking-widest">Personalization</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-8">

                    {/* Identity Grid */}
                    <div className="bg-card/40 border border-border rounded-3xl p-6 space-y-6 shadow-sm">
                        <div className="flex bg-secondary/30 p-1 rounded-xl border border-border/50">
                            <button
                                onClick={() => setTheme("love")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${theme === "love" ? "bg-background text-primary shadow-sm border border-border" : "text-foreground/40 hover:text-foreground"}`}
                            >
                                <Heart className={`w-3.5 h-3.5 ${theme === "love" ? "fill-current" : ""}`} />
                                Lover's Muse
                            </button>
                            <button
                                onClick={() => setTheme("birthday")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${theme === "birthday" ? "bg-background text-amber-600 shadow-sm border border-border" : "text-foreground/40 hover:text-foreground"}`}
                            >
                                <Cake className="w-3.5 h-3.5" />
                                Celebration
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 focus-within:text-primary transition-colors">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground ml-1">Sender Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        placeholder="Secret Admirer"
                                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-primary/50 transition-all text-foreground"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5 focus-within:text-primary transition-colors">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground ml-1">Recipient Name *</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                        placeholder="My Dearest"
                                        className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-primary/50 transition-all text-foreground"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Letter Body */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground px-1">The Unspoken Words</label>
                        <div className="relative group">
                            <textarea
                                value={letter}
                                onChange={(e) => setLetter(e.target.value)}
                                placeholder="Transcription of the soul..."
                                className="relative w-full h-48 bg-card/60 border border-border rounded-3xl p-6 outline-none text-foreground font-serif text-lg leading-relaxed resize-none focus:border-primary/40 focus:ring-2 focus:ring-primary/5 transition-all shadow-inner placeholder:text-foreground/10"
                            />
                        </div>
                    </div>

                    {/* Mechanism Selection */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground px-1">Unlock Mechanism</label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {[
                                { id: "none", label: "Pure", icon: Plus },
                                { id: "envelope", label: "Envelope", icon: Mail },
                                { id: "scratch", label: "Scratch", icon: Sparkles },
                                { id: "code", label: "Safe", icon: Gift },
                                { id: "surprise", label: "Gift Box", icon: Wand2 },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setGiftType(item.id)}
                                    className={`flex flex-col items-center gap-2 p-2 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-all ${giftType === item.id ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-card/20 border-border text-foreground/20 hover:border-foreground/40'}`}
                                >
                                    <item.icon className="w-3.5 h-3.5" />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SEPARATED STYLES: Unique Backgrounds & Logic */}
                    <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-2 px-1">
                            <Palette className="w-3 h-3 text-primary" />
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground">Visual Aesthetic</label>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {[
                                { id: "classic", label: "Classic" },
                                { id: "midnight", label: "Midnite" },
                                { id: "botanic", label: "Verdant" },
                                { id: "vintage", label: "Papyrus" },
                                { id: "ocean", label: "Abyss" }
                            ].map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setCardStyle(style.id)}
                                    className={`relative py-2.5 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-all ${cardStyle === style.id ? 'bg-foreground text-background border-foreground shadow-md scale-105' : 'bg-card/20 border-border text-foreground/40 hover:border-foreground/60'}`}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LIVE GLIMPSE INTEGRATED (More Compact) */}
                    <div className="pt-4 space-y-2 lg:hidden">
                        <div className="text-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">Live Glimpse</p>
                        </div>
                        <div className="w-[80%] mx-auto scale-90">
                            <div className="h-40 overflow-hidden rounded-3xl">
                                <PreviewCard
                                    cardStyle={cardStyle}
                                    recipientName={recipientName}
                                    letter={letter}
                                    senderName={senderName}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Logic */}
                    <div className="space-y-4 pt-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground px-1">Delivery Channel</label>
                        <div className="bg-secondary/30 border border-border rounded-2xl p-2 flex gap-2">
                            <button
                                onClick={() => setIsScheduled(false)}
                                className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isScheduled ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/30 hover:text-foreground'}`}
                            >
                                Immortal Link
                            </button>
                            <div className="flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/10 bg-background/20 border border-border/10 cursor-not-allowed flex flex-col items-center justify-center leading-none">
                                <span className="opacity-40">Scheduling</span>
                                <span className="text-[6px] text-primary/60 mt-1 uppercase tracking-tighter">Coming Soon</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Sticky Preview */}
                <div className="lg:col-span-1 hidden lg:block h-full w-px bg-border/50 mx-auto" />
                <div className="lg:col-span-4 hidden lg:block sticky top-24">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 text-center">Live Glimpse</p>
                        <PreviewCard
                            cardStyle={cardStyle}
                            recipientName={recipientName}
                            letter={letter}
                            senderName={senderName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PreviewCard = ({ cardStyle, recipientName, letter, senderName }: any) => {
    // Dynamic styles for the preview
    const themes: any = {
        classic: {
            bg: "bg-[#fffef7] dark:bg-[#1a1a1a]",
            border: "border-[#eaddcf] dark:border-white/10",
            text: "text-stone-900 dark:text-stone-100",
            muted: "text-stone-600 dark:text-stone-400",
            icon: "❦"
        },
        midnight: {
            bg: "bg-[#020617] text-white",
            border: "border-white/10",
            text: "text-slate-100",
            muted: "text-slate-400",
            overlay: "bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20",
            icon: "✧"
        },
        botanic: {
            bg: "bg-[#f2fcf0] dark:bg-[#0f1f0f]",
            border: "border-[#cce1cc] dark:border-white/10",
            text: "text-emerald-950 dark:text-emerald-50",
            muted: "text-emerald-800/60 dark:text-emerald-300/40",
            icon: "🌿"
        },
        vintage: {
            bg: "bg-[#f4e4d4] dark:bg-[#2d1e1a]",
            border: "border-[#a68a73] dark:border-white/10 shadow-inner",
            text: "text-stone-950 dark:text-stone-100",
            muted: "text-stone-800/50 dark:text-stone-400/30",
            overlay: "bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-60 mix-blend-multiply",
            icon: "✉"
        },
        ocean: {
            bg: "bg-gradient-to-br from-[#0c1a26] to-[#000000]",
            border: "border-cyan-500/20",
            text: "text-cyan-50",
            muted: "text-cyan-400/40",
            icon: "≈"
        }
    };

    const s = themes[cardStyle] || themes.classic;

    return (
        <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] border-2 shadow-2xl overflow-hidden transition-all duration-700 ${s.bg} ${s.border}`}>
            {s.overlay && <div className={`absolute inset-0 pointer-events-none ${s.overlay}`} />}

            <div className="relative z-10 h-full p-8 flex flex-col items-center justify-center text-center space-y-6">
                <span className={`text-2xl transition-all duration-700 ${s.text} opacity-30`}>{s.icon}</span>

                <div className="space-y-1">
                    <p className={`text-[8px] font-black uppercase tracking-[0.4em] ${s.muted}`}>Destined for</p>
                    <h3 className={`text-2xl font-serif italic ${s.text} truncate max-w-[220px]`}>
                        {recipientName || "Someone"}
                    </h3>
                </div>

                <div className={`text-sm leading-relaxed ${s.text} opacity-80 font-serif line-clamp-6 px-4`}>
                    {letter || "Start writing to see your soul's transcription manifested in this artifact."}
                </div>

                <div className="pt-6 border-t border-current opacity-10 w-16 mx-auto" />
                <p className={`text-[10px] italic ${s.muted}`}>— {senderName || "Identity"}</p>
            </div>

            {/* Design Detail */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
        </div>
    );
};
