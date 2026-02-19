"use client";

import { motion } from "framer-motion";
import { Gift, Heart, Cake, Calendar, Mail, User } from "lucide-react";

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
    return (
        <div className="space-y-8 glass p-8 rounded-3xl">
            {/* Same as before... */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setTheme("love")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all ${theme === "love" ? "border-primary bg-primary/10 text-primary font-bold" : "border-border hover:bg-white"}`}
                >
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Love Theme</span>
                </button>
                <button
                    onClick={() => setTheme("birthday")}
                    className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-xl border transition-all ${theme === "birthday" ? "border-primary bg-primary/10 text-primary font-bold" : "border-border hover:bg-white"}`}
                >
                    <Cake className="w-5 h-5" />
                    <span>Birthday Theme</span>
                </button>
            </div>

            <div className="space-y-2">
                {/* ... inputs ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <User className="w-4 h-4" /> From (Your Name)
                        </label>
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="e.g. Secret Admirer"
                            className="w-full bg-white/50 dark:bg-white/5 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <User className="w-4 h-4" /> To (Recipient Name)
                        </label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="e.g. My Valentine"
                            className="w-full bg-white/50 dark:bg-white/5 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                </div>

                <div className="mb-6 space-y-4">
                    <div className="flex gap-4 p-1 bg-muted/20 rounded-xl">
                        <button
                            onClick={() => setIsScheduled(false)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isScheduled ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
                        >
                            Create Link Only
                        </button>
                        <button
                            onClick={() => setIsScheduled(true)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${isScheduled ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
                        >
                            Schedule Delivery
                        </button>
                    </div>

                    {isScheduled && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" /> Recipient Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    placeholder="recipient@example.com"
                                    className="w-full bg-white/50 dark:bg-white/5 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 border-primary/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" /> Schedule Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={scheduledAt}
                                    onChange={(e) => setScheduledAt(e.target.value)}
                                    className="w-full bg-white/50 dark:bg-white/5 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-muted-foreground border-primary/30"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>

                <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Write a Heartfelt Note
                </label>
                <textarea
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                    placeholder="Dear my love..."
                    className="w-full h-40 bg-white/50 dark:bg-white/5 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 resize-none font-serif text-lg leading-relaxed show-scroll text-foreground"
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
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "envelope" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-white dark:hover:bg-white/5"}`}
                    >
                        <div className="font-bold text-foreground mb-1">💌 Sealed Envelope</div>
                        <p className="text-xs text-muted-foreground">Wrap your letter in a digital envelope they have to open.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("scratch")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "scratch" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-white dark:hover:bg-white/5"}`}
                    >
                        <div className="font-bold text-foreground mb-1">✨ Scratch Card</div>
                        <p className="text-xs text-muted-foreground">Hide a special message under a scratch-off layer.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("code")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "code" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-white dark:hover:bg-white/5"}`}
                    >
                        <div className="font-bold text-foreground mb-1">🔒 Digital Safe</div>
                        <p className="text-xs text-muted-foreground">Protect your message with a secret code/pin.</p>
                    </div>

                    <div
                        onClick={() => setGiftType("none")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${giftType === "none" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-white dark:hover:bg-white/5"}`}
                    >
                        <div className="font-bold text-muted-foreground mb-1">None</div>
                        <p className="text-xs text-muted-foreground">{creationType === 'message' ? 'Just the written letter.' : 'Just the bouquet and letter.'}</p>
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
                            className="w-full bg-white dark:bg-white/10 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-center font-bold text-foreground placeholder:font-normal placeholder:text-muted-foreground/50 transition-colors"
                        />
                    </motion.div>
                )}

                {giftType === "code" && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <input
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            placeholder="Set Code (e.g. 1234)"
                            className="bg-white dark:bg-white/10 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-center font-bold text-foreground placeholder:font-normal placeholder:text-muted-foreground/50 transition-colors"
                        />
                        <input
                            type="text"
                            value={scratchMessage}
                            onChange={(e) => setScratchMessage(e.target.value)}
                            placeholder="Secret Message to Hide..."
                            className="md:col-span-2 bg-white dark:bg-white/10 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-center font-bold text-foreground placeholder:font-normal placeholder:text-muted-foreground/50 transition-colors"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};
