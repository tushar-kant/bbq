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

    setIsSaving(true);
    try {
      const res = await fetch("/api/bouquet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: creationType,
          items: creationType === 'bouquet' ? bouquetItems : [],
          letter,
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
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl relative z-10">
        {!shareUrl && creationType && (
          <div className="flex gap-2 mb-8 items-center justify-center">
            {creationType === 'bouquet' ? [1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-500 ${s <= step ? "w-12 bg-primary" : "w-4 bg-muted"}`}
              />
            )) : (
              <div className="h-2 rounded-full w-12 bg-primary transition-all duration-500" />
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!creationType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-4">
                What would you like to create?
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button
                  onClick={() => handleStart('bouquet')}
                  className="group relative p-8 rounded-3xl border border-primary/20 bg-white/50 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center gap-4 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-10 h-10 text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">Virtual Bouquet</h3>
                  <p className="text-muted-foreground">Arrange beautiful 3D flowers and add a heartfelt note.</p>
                </button>

                <button
                  onClick={() => handleStart('message')}
                  className="group relative p-8 rounded-3xl border border-primary/20 bg-white/50 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center gap-4 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">Digital Letter</h3>
                  <p className="text-muted-foreground">Send a beautifully styled letter with a secret surprise.</p>
                </button>
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
                  onClick={() => window.open(`mailto:?subject=A Gift For You �&body=I made this for you: ${shareUrl}`, '_blank')}
                  className="text-primary font-medium hover:underline flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  Share via Email
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/?text=I made a digital gift for you! � ${shareUrl}`, '_blank')}
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
                    <h2 className="text-2xl font-bold font-serif">Arrange Your Bouquet</h2>
                    <p className="text-sm text-muted-foreground">Drag to arrange, tap to rotate</p>
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
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors hover:bg-muted text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={creationType === 'bouquet' && totalItems < 2}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/25"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSaveAndShare}
                disabled={isSaving}
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:opacity-90 flex items-center gap-2 transition-all shadow-lg hover:shadow-accent/25"
              >
                {isSaving ? <Wand2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Create Gift
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
