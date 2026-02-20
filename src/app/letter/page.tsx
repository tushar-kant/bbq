"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { LetterInput } from "@/components/LetterInput";
import { Sparkles, Wand2, Copy, Mail, Share2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

import { HeartLoader } from "@/components/HeartLoader";

function LetterCreator() {
    const [creationType] = useState<"bouquet" | "message">("message");
    const [step] = useState(3);
    const [letter, setLetter] = useState("");
    const [giftType, setGiftType] = useState("none");
    const [scratchMessage, setScratchMessage] = useState("");
    const [theme, setTheme] = useState("love");
    const [isSaving, setIsSaving] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    // Delivery Details
    const [senderName, setSenderName] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [isScheduled, setIsScheduled] = useState(false);
    const [secretCode, setSecretCode] = useState("");

    const handleSaveAndShare = async () => {
        if (isScheduled && (!recipientEmail || !scheduledAt)) {
            return alert("Please provide both Recipient Email and Schedule Time for scheduled delivery! 📅");
        }

        if (giftType === 'code' && !secretCode) {
            return alert("Please set a Secret Code for the Digital Safe! 🔒");
        }

        if (!recipientName) {
            return alert("Please enter the Recipient's Name! 👤");
        }

        setIsSaving(true);
        const finalLetter = letter.trim() || "It's a digital message for you 💌";

        try {
            const res = await fetch("/api/bouquet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: creationType,
                    items: [],
                    letter: finalLetter,
                    theme,
                    giftType,
                    scratchMessage,
                    secretCode,
                    senderName,
                    recipientName,
                    recipientEmail,
                    scheduledAt,
                    canvasBackground: ""
                }),
            });

            const data = await res.json();
            if (res.ok) {
                const url = `${window.location.origin}/share/${data.id}`;
                setShareUrl(url);
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            } else {
                alert("Failed to save letter. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    const copyToClipboard = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard! 📋");
        }
    };

    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground pb-10 transition-colors duration-500">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),_transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl relative z-10">
                {!shareUrl && (
                    <div className="flex gap-3 mb-8 items-center justify-center">
                        <div className="h-1.5 rounded-full w-12 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-500" />
                    </div>
                )}

                {shareUrl ? (
                    <motion.div
                        key="share"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center space-y-8 glass p-12 rounded-3xl text-center border-border"
                    >
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 shadow-sm">
                            <Sparkles className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-bold font-serif text-foreground">Letter Ready!</h2>
                        <p className="text-muted-foreground max-w-md">
                            Your poetry has been sealed. Share this link with your special someone.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 bg-card/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors shadow-md"
                            >
                                <Copy className="w-4 h-4" />
                                Copy
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
                            <button
                                onClick={() => window.open(`mailto:?subject=A Letter For You &body=I wrote this for you: ${shareUrl}`, '_blank')}
                                className="text-primary font-medium hover:underline flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Share via Email
                            </button>

                            <button
                                onClick={() => window.open(`https://wa.me/?text=I wrote a digital letter for you!  ${shareUrl}`, '_blank')}
                                className="text-green-600 dark:text-green-400 font-medium hover:underline flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share via WhatsApp
                            </button>
                        </div>

                        <button onClick={() => window.location.reload()} className="text-sm text-muted-foreground mt-8 hover:text-foreground transition-colors">
                            Write Another
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-serif text-foreground">
                            Write Your Letter
                        </h2>
                        <LetterInput
                            creationType={creationType}
                            letter={letter}
                            setLetter={setLetter}
                            giftType={giftType}
                            setGiftType={setGiftType}
                            theme={theme}
                            setTheme={setTheme}
                            scratchMessage={scratchMessage}
                            setScratchMessage={setScratchMessage}
                            senderName={senderName}
                            setSenderName={setSenderName}
                            recipientName={recipientName}
                            setRecipientName={setRecipientName}
                            recipientEmail={recipientEmail}
                            setRecipientEmail={setRecipientEmail}
                            scheduledAt={scheduledAt}
                            setScheduledAt={setScheduledAt}
                            isScheduled={isScheduled}
                            setIsScheduled={setIsScheduled}
                            secretCode={secretCode}
                            setSecretCode={setSecretCode}
                        />

                        <div className="flex justify-between mt-4 pt-4 border-t border-border">
                            <button
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-sm rounded-full font-medium flex items-center gap-1.5 transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                Back
                            </button>

                            <button
                                onClick={handleSaveAndShare}
                                disabled={isSaving}
                                className="px-6 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                {isSaving ? <Wand2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                Create Gift
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-12">
                <HeartLoader />
                <p className="text-muted-foreground animate-pulse font-serif italic text-lg">Preparing your ink and parchment...</p>
            </div>
        }>
            <LetterCreator />
        </Suspense>
    );
}
