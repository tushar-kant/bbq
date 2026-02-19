"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerSelector } from "@/components/FlowerSelector";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { LetterInput } from "@/components/LetterInput";
import { BouquetItem } from "@/lib/flowers";
import { ChevronRight, ChevronLeft, Share2, Copy, Sparkles, Wand2, Mail } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [creationType, setCreationType] = useState<"bouquet" | "message" | null>(null);
  const [step, setStep] = useState(1);
  const [bouquetItems, setBouquetItems] = useState<BouquetItem[]>([]);
  const [letter, setLetter] = useState("");
  const [giftType, setGiftType] = useState("none");
  const [scratchMessage, setScratchMessage] = useState("");
  const [theme, setTheme] = useState("love");
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});

  // Delivery Details
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const handleFlowerUpdate = (id: string, newCount: number) => {
    const currentCount = flowerCounts[id] || 0;
    setFlowerCounts(prev => ({ ...prev, [id]: newCount }));

    if (newCount > currentCount) {
      const toAdd = newCount - currentCount;
      const newItems: BouquetItem[] = [];
      for (let i = 0; i < toAdd; i++) {
        newItems.push({
          id: Math.random().toString(36).substr(2, 9),
          flowerId: id,
          x: 50 + (Math.random() * 20 - 10),
          y: 50 + (Math.random() * 20 - 10),
          rotation: Math.random() * 30 - 15,
          scale: 1 + (Math.random() * 0.2 - 0.1)
        });
      }
      setBouquetItems(prev => [...prev, ...newItems]);
    } else if (newCount < currentCount) {
      const toRemove = currentCount - newCount;
      setBouquetItems(prev => {
        const copy = [...prev];
        let removed = 0;
        return copy.filter(item => {
          if (item.flowerId === id && removed < toRemove) {
            removed++;
            return false;
          }
          return true;
        });
      });
    }
  };

  const totalItems = Object.values(flowerCounts).reduce((a, b) => a + b, 0);

  const handleStart = (type: "bouquet" | "message") => {
    setCreationType(type);
    if (type === "message") {
      setStep(3);
    } else {
      setStep(1);
    }
  };

  const handleNext = () => {
    if (creationType === "bouquet") {
      if (step === 1 && totalItems < 2) return alert("Please select at least 2 items for a full bouquet! 🌸");
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      setCreationType(null);
    } else if (step === 3 && creationType === 'message') {
      setCreationType(null);
    } else {
      setStep(step - 1);
    }
  };

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
    const finalLetter = letter.trim() || "It's a flower for my flower 🌸";

    try {
      const res = await fetch("/api/bouquet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: creationType,
          items: creationType === 'bouquet' ? bouquetItems : [],
          letter: finalLetter,
          theme,
          giftType,
          scratchMessage,
          secretCode,
          senderName,
          recipientName,
          recipientEmail,
          scheduledAt
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
        alert("Failed to save bouquet. Please try again.");
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
    <main className="min-h-screen bg-[#130306] relative overflow-hidden flex flex-col text-white pb-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,157,0.1),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl relative z-10">
        {!shareUrl && creationType && (
          <div className="flex gap-3 mb-8 items-center justify-center">
            {creationType === 'bouquet' ? [1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? "w-12 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "w-2 bg-white/10"}`}
              />
            )) : (
              <div className="h-1.5 rounded-full w-12 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-500" />
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!creationType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="flex flex-col items-center justify-center min-h-[70vh] w-full"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-16 space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-pink-200/70 tracking-widest uppercase">
                  <Sparkles className="w-3 h-3" /> Start Creating
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
                  Choose Your Gift
                </h1>
                <p className="text-lg text-white/40 font-light max-w-lg mx-auto">
                  Select how you want to express your affection today.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                {/* Virtual Bouquet Card */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => handleStart('bouquet')}
                  className="group relative h-[340px] w-full rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(255,107,157,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 group-hover:border-pink-300/30 transition-colors" />

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative h-full flex flex-col items-center justify-center p-10 z-10">
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-pink-400/20 blur-2xl rounded-full group-hover:bg-pink-400/40 transition-all duration-500" />
                      <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/20 flex items-center justify-center relative backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-10 h-10 text-pink-200 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-3xl font-serif font-medium text-white mb-3 group-hover:scale-105 transition-transform duration-300">Virtual Bouquet</h3>
                    <p className="text-white/50 font-light leading-relaxed max-w-xs group-hover:text-white/80 transition-colors">
                      Arrange stylized 3D flowers into a timeless composition.
                    </p>

                    <div className="mt-8 px-6 py-2 rounded-full border border-white/20 text-sm text-white/60 group-hover:bg-white group-hover:text-black transition-all">
                      Start Designing
                    </div>
                  </div>
                </motion.button>

                {/* Digital Letter Card */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleStart('message')}
                  className="group relative h-[340px] w-full rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(251,191,36,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/10 group-hover:border-amber-200/30 transition-colors" />

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative h-full flex flex-col items-center justify-center p-10 z-10">
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full group-hover:bg-amber-400/40 transition-all duration-500" />
                      <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/20 flex items-center justify-center relative backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                        <Mail className="w-10 h-10 text-amber-100 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-3xl font-serif font-medium text-white mb-3 group-hover:scale-105 transition-transform duration-300">Digital Letter</h3>
                    <p className="text-white/50 font-light leading-relaxed max-w-xs group-hover:text-white/80 transition-colors">
                      Write a heartfelt message sealed with a secret code.
                    </p>

                    <div className="mt-8 px-6 py-2 rounded-full border border-white/20 text-sm text-white/60 group-hover:bg-white group-hover:text-black transition-all">
                      Write Now
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : shareUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-8 glass p-12 rounded-3xl text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-bold font-serif text-foreground">Gift Ready!</h2>
              <p className="text-muted-foreground max-w-md">
                Your creation has been saved. Share this link with your special someone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-white/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
                <button
                  onClick={() => window.open(`mailto:?subject=A Gift For You &body=I made this for you: ${shareUrl}`, '_blank')}
                  className="text-primary font-medium hover:underline flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  Share via Email
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/?text=I made a digital gift for you!  ${shareUrl}`, '_blank')}
                  className="text-green-600 font-medium hover:underline flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg"
                >
                  <Share2 className="w-4 h-4" />
                  Share via WhatsApp
                </button>
              </div>

              <button onClick={() => window.location.reload()} className="text-sm text-muted-foreground mt-8 hover:text-foreground">
                Create Another
              </button>
            </motion.div>
          ) : (
            <>
              {step === 1 && creationType === 'bouquet' && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <FlowerSelector
                    flowerCounts={flowerCounts}
                    onUpdateCount={handleFlowerUpdate}
                    maxTotal={20}
                  />
                </motion.div>
              )}

              {step === 2 && creationType === 'bouquet' && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 flex flex-col h-full"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-medium font-serif text-pink-100">Arrange Your Bouquet</h2>
                    <p className="text-sm font-medium text-pink-200/50 uppercase tracking-widest">Drag to move • Tap to rotate</p>
                  </div>
                  <BouquetCanvas
                    items={bouquetItems}
                    setItems={setBouquetItems}
                    isEditable={true}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold font-serif">
                    {creationType === 'bouquet' ? 'Add a Personal Touch' : 'Write Your Letter'}
                  </h2>
                  <LetterInput
                    creationType={creationType || 'bouquet'}
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
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!shareUrl && creationType && (
          <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm rounded-full font-medium flex items-center gap-1.5 transition-colors hover:bg-white/10 text-white/50 hover:text-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={creationType === 'bouquet' && totalItems < 2}
                className="px-6 py-2 text-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSaveAndShare}
                disabled={isSaving}
                className="px-6 py-2 text-sm bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-105 flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:grayscale"
              >
                {isSaving ? <Wand2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Create Gift
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
