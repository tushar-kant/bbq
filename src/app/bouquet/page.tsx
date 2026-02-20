"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FlowerSelector } from "@/components/FlowerSelector";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { LetterInput } from "@/components/LetterInput";
import { BouquetItem, FLOWERS } from "@/lib/flowers";
import { ChevronRight, ChevronLeft, Share2, Copy, Sparkles, Wand2, Mail, Shuffle, Leaf, Sprout, Plus, Loader2, Flower2, ArrowRight } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";

import { HeartLoader } from "@/components/HeartLoader";

function BouquetCreator() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [creationType, setCreationType] = useState<"bouquet" | "message" | null>("bouquet");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const [bouquetItems, setBouquetItems] = useState<BouquetItem[]>([]);
  const [letter, setLetter] = useState("");
  const [giftType, setGiftType] = useState("none");
  const [scratchMessage, setScratchMessage] = useState("");
  const [theme, setTheme] = useState("love");
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});
  const [canvasBackground, setCanvasBackground] = useState<string>("");

  // Delivery Details
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  useEffect(() => {
    if (editId) {
      const fetchBouquet = async () => {
        setIsLoadingEdit(true);
        try {
          const res = await fetch(`/api/bouquet?id=${editId}`);
          if (res.ok) {
            const data = await res.json();
            setBouquetItems(data.items || []);
            setCanvasBackground(data.canvasBackground || "");

            // Reconstruct flowerCounts
            const counts: Record<string, number> = {};
            (data.items || []).forEach((item: BouquetItem) => {
              counts[item.flowerId] = (counts[item.flowerId] || 0) + 1;
            });
            setFlowerCounts(counts);
            setCreationType("bouquet");
            setStep(1);
          }
        } catch (error) {
          console.error("Error loading bouquet for edit:", error);
        } finally {
          setIsLoadingEdit(false);
        }
      };
      fetchBouquet();
    }
  }, [editId]);

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
      if (step === 1 && totalItems < 3) return alert("Please select at least 3 flowers for a full bouquet! 🌸");
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
          scheduledAt,
          canvasBackground
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
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground pb-10 transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,157,0.1),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl relative z-10">
        {!shareUrl && (
          <div className="flex gap-3 mb-8 items-center justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? "w-12 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "w-2 bg-white/10"}`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
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
              <h2 className="text-4xl font-bold font-serif text-foreground">Gift Ready!</h2>
              <p className="text-muted-foreground max-w-md">
                Your creation has been saved. Share this link with your special someone.
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
                  onClick={() => window.open(`mailto:?subject=A Gift For You &body=I made this for you: ${shareUrl}`, '_blank')}
                  className="text-primary font-medium hover:underline flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Share via Email
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/?text=I made a digital gift for you!  ${shareUrl}`, '_blank')}
                  className="text-green-600 dark:text-green-400 font-medium hover:underline flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share via WhatsApp
                </button>
              </div>

              <button onClick={() => window.location.reload()} className="text-sm text-muted-foreground mt-8 hover:text-foreground transition-colors">
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

                  {generatedImage ? (
                    <div className="relative w-full h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-border bg-card/60 backdrop-blur-xl group">
                      <Image
                        src={generatedImage}
                        alt="AI Generated Bouquet"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 pointer-events-none">
                        <span className="text-white font-serif italic text-lg tracking-wide">AI Masterpiece</span>
                      </div>
                    </div>
                  ) : (
                    <BouquetCanvas
                      items={bouquetItems}
                      setItems={setBouquetItems}
                      isEditable={!isGenerating}
                      background={canvasBackground}
                    />
                  )}

                  <div className="flex flex-wrap gap-2 justify-center py-2 px-1">
                    {[
                      { name: "Default", value: "" },
                      { name: "Soft Pink", value: "linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)" },
                      { name: "Deep Rose", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" },
                      { name: "Velvet Night", value: "#1a1a1a" },
                      { name: "Midnight", value: "linear-gradient(to top, #30cfd0 0%, #330867 100%)" },
                      { name: "Sweet Morning", value: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)" },
                      { name: "Gold Dust", value: "linear-gradient(to right, #f83600 0%, #f9d423 100%)" },
                      { name: "Minty", value: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)" }
                    ].map((bg) => (
                      <button
                        key={bg.name}
                        onClick={() => setCanvasBackground(bg.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${canvasBackground === bg.value ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                        style={{ background: bg.value || 'rgba(255,255,255,0.1)', backdropFilter: bg.value ? 'none' : 'blur(12px)' }}
                        title={bg.name}
                      />
                    ))}

                    <div className="relative group">
                      <input
                        type="color"
                        onChange={(e) => setCanvasBackground(e.target.value)}
                        className="w-8 h-8 rounded-full border-2 border-border cursor-pointer opacity-0 absolute inset-0 z-20"
                      />
                      <div className={`w-8 h-8 rounded-full border-2 border-border flex items-center justify-center bg-card group-hover:scale-110 transition-all ${!['', '#1a1a1a'].includes(canvasBackground) && !canvasBackground.includes('gradient') ? 'ring-2 ring-primary/20 border-primary' : ''}`}>
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-xs text-muted-foreground mb-2">NB: Drag to move • Tap to rotate</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setBouquetItems(prev => prev.map(item => {
                          // Tighter cluster (35-65% width)
                          const x = 35 + Math.random() * 30;
                          const dist = Math.abs(x - 50);
                          // Lower down: 55-75% Y range to sit closer to the ribbon
                          const y = 55 + (dist * 0.5) + (Math.random() * 20);
                          const rotation = (x - 50) * 2 + (Math.random() * 10 - 5);
                          return {
                            ...item,
                            x,
                            y,
                            rotation,
                            scale: 0.85 + Math.random() * 0.3,
                            stemBend: (Math.random() * 40 - 20),
                            stemType: Math.floor(Math.random() * 3)
                          };
                        }));
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary hover:text-foreground text-muted-foreground transition-colors text-xs font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isGenerating || !!generatedImage}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      Rearrange
                    </button>

                    <button
                      onClick={() => {
                        setBouquetItems(prev => prev.map(item => ({
                          ...item,
                          stemBend: (Math.random() * 60 - 30),
                          stemType: Math.floor(Math.random() * 3)
                        })));
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 text-green-600 dark:text-green-400 transition-colors text-xs font-medium uppercase tracking-wider"
                      disabled={isGenerating || !!generatedImage}
                    >
                      <Sprout className="w-3.5 h-3.5" />
                      Greenery
                    </button>

                  </div>
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
                  <h2 className="text-2xl font-bold font-serif text-foreground">
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
          <div className="flex justify-between mt-4 pt-4 border-t border-border">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm rounded-full font-medium flex items-center gap-1.5 transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={creationType === 'bouquet' && totalItems < 3}
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
    </main >
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-12">
        <HeartLoader />
        <p className="text-muted-foreground animate-pulse font-serif italic text-lg">Preparing your floral canvas...</p>
      </div>
    }>
      <BouquetCreator />
    </Suspense>
  );
}

