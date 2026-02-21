"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FlowerSelector } from "@/components/FlowerSelector";
import { BouquetCanvas } from "@/components/BouquetCanvas";
import { LetterInput } from "@/components/LetterInput";
import { BouquetItem, FLOWERS } from "@/lib/flowers";
import { ChevronRight, ChevronLeft, Share2, Copy, Sparkles, Wand2, Mail, Shuffle, Leaf, Sprout, Plus, Loader2, Flower2, ArrowRight, Eye, X, Download, Heart } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import QRCode from "react-qr-code";

import { HeartLoader } from "@/components/HeartLoader";
import { SharedBouquetView } from "@/components/SharedBouquetView";

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
  const [cardStyle, setCardStyle] = useState("classic");
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
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
          canvasBackground,
          cardStyle
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

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.drawImage(img, 0, 0, 1000, 1000);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "gift-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard! 📋");
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground pb-10 transition-colors duration-500">
      <AnimatePresence>
        {isPreviewing && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 z-[99999] bg-background overflow-y-auto"
          >
            <button
              onClick={() => setIsPreviewing(false)}
              className="absolute top-20 right-6 sm:top-6 sm:right-6 z-[99999] bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md transition-all flex items-center gap-2 group shadow-xl border border-white/10"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold tracking-widest uppercase origin-right pr-2">Close</span>
            </button>

            <div className="pointer-events-none absolute inset-0 z-[250] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

            <SharedBouquetView
              data={{
                type: creationType || 'bouquet',
                items: creationType === 'bouquet' ? bouquetItems : [],
                letter: letter.trim() || "It's a flower for my flower 🌸",
                theme,
                giftType: giftType as "envelope" | "scratch" | "code" | "none",
                scratchMessage,
                secretCode,
                recipientName: recipientName || 'My Valentine',
                canvasBackground,
                cardStyle
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,157,0.1),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl relative z-10">

        {/* Step Indicator Removed */}

        <AnimatePresence mode="wait">
          {shareUrl ? (
            <motion.div
              key="share"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-3 md:space-y-4 glass p-4 md:p-8 rounded-3xl text-center border-border w-full max-w-lg mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">Gift Ready!</h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
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

              <div className="relative group">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-border w-fit mx-auto relative overflow-hidden">
                  <QRCode
                    id="qr-code-svg"
                    value={shareUrl}
                    size={120}
                    level="H"
                    className="rounded-md"
                    fgColor="#27272a"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                  className="absolute -right-2 -bottom-2 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10 border-2 border-background"
                  title="Download QR"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-row gap-2 items-center justify-center mt-2 w-full max-w-sm">
                <button
                  onClick={() => window.open(`mailto:?subject=A Gift For You &body=I made this for you: ${shareUrl}`, '_blank')}
                  className="flex-1 text-primary font-medium hover:underline flex items-center justify-center gap-1.5 bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/?text=I made a digital gift for you!  ${shareUrl}`, '_blank')}
                  className="flex-1 text-green-600 dark:text-green-400 font-medium hover:underline flex items-center justify-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  WhatsApp
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
                  className="space-y-8 flex flex-col h-full"
                >
                  {/* Step Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/50 pb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
                        <Sparkles className="w-3 h-3" /> Step 02
                      </div>
                      <h2 className="text-4xl font-serif font-medium text-foreground tracking-tight">
                        The <span className="italic text-primary">Arrangement</span>
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 bg-secondary/30 border border-border rounded-full px-4 py-2 backdrop-blur-3xl">
                      Drag to Position • Tap to Rotate
                    </div>
                  </div>

                  {/* Main Canvas Area */}
                  <div className="relative group/canvas">
                    <div className="absolute -inset-4 bg-gradient-to-b from-pink-500/5 to-purple-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-1000 -z-10" />

                    {generatedImage ? (
                      <div className="relative w-full h-[55vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-card/40 backdrop-blur-3xl group">
                        <Image
                          src={generatedImage}
                          alt="AI Generated Bouquet"
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-12">
                          <span className="text-white font-serif italic text-2xl tracking-wide">AI Masterpiece</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-1 bg-secondary/30 rounded-[2.5rem] border border-border backdrop-blur-3xl shadow-2xl">
                        <BouquetCanvas
                          items={bouquetItems}
                          setItems={setBouquetItems}
                          isEditable={!isGenerating}
                          background={canvasBackground}
                        />
                      </div>
                    )}
                  </div>

                  {/* Composer Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* Background Stage */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-muted-foreground/30 uppercase text-[9px] font-black tracking-[0.3em] pl-1">
                        <div className="h-[1px] w-4 bg-border" />
                        Stage Setting
                      </div>
                      <div className="bg-secondary/30 border border-border rounded-3xl p-5 space-y-6">
                        {/* Row 1: Simple Colors */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                            <div className="w-1.5 h-1.5 rounded-full bg-border" /> Solid Tones
                          </div>
                          <div className="grid grid-cols-6 gap-3">
                            {[
                              { name: "Glass", value: "" },
                              { name: "Night", value: "#1a1a1a" },
                              { name: "Mist", value: "#fdf8f8" },
                              { name: "Sage", value: "#f0f4f0" },
                              { name: "Ink", value: "#0a0a0c" }
                            ].map((bg) => (
                              <motion.button
                                key={bg.name}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCanvasBackground(bg.value)}
                                className={`aspect-square rounded-2xl border-2 transition-all shadow-xl flex items-center justify-center ${canvasBackground === bg.value ? 'border-primary ring-4 ring-primary/20 shadow-primary/20' : 'border-border'}`}
                                style={{ background: bg.value || 'rgba(255,255,255,0.03)', backdropFilter: bg.value ? 'none' : 'blur(20px)' }}
                                title={bg.name}
                              />
                            ))}

                            <div className="relative group aspect-square">
                              <input
                                type="color"
                                onChange={(e) => setCanvasBackground(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                              />
                              <div className={`w-full h-full rounded-2xl border-2 border-border flex items-center justify-center bg-card/40 group-hover:bg-card/60 transition-all ${!['', '#1a1a1a', '#fdf8f8', '#f0f4f0', '#0a0a0c'].includes(canvasBackground) && !canvasBackground.includes('gradient') ? 'ring-4 ring-primary/20 border-primary' : ''}`}>
                                <Plus className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Premium Gradients */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" /> Atmospheric
                          </div>
                          <div className="grid grid-cols-6 gap-3">
                            {[
                              { name: "Dawn", value: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)" },
                              { name: "Bora Bora", value: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)" },
                              { name: "Cosmic", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
                              { name: "Lush", value: "linear-gradient(135deg, #02aab0 0%, #00cdac 100%)" },
                              { name: "Golden", value: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)" }
                            ].map((bg) => (
                              <motion.button
                                key={bg.name}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCanvasBackground(bg.value)}
                                className={`aspect-square rounded-2xl border-2 transition-all shadow-xl flex items-center justify-center ${canvasBackground === bg.value ? 'border-primary ring-4 ring-primary/20 shadow-primary/20' : 'border-border'}`}
                                style={{ background: bg.value }}
                                title={bg.name}
                              />
                            ))}

                            <div className="relative group aspect-square">
                              <input
                                type="color"
                                onChange={(e) => setCanvasBackground(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                              />
                              <div className={`w-full h-full rounded-2xl border-2 border-border flex items-center justify-center bg-card/40 group-hover:bg-card/60 transition-all ${!['', '#1a1a1a', '#fdf8f8', '#f0f4f0', '#0a0a0c'].includes(canvasBackground) && canvasBackground.includes('gradient') ? 'ring-4 ring-primary/20 border-primary' : ''}`}>
                                <Plus className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrangement Toolkit */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-muted-foreground/30 uppercase text-[9px] font-black tracking-[0.3em] pl-1">
                        <div className="h-[1px] w-4 bg-border" />
                        Studio Controls
                      </div>
                      <div className="bg-secondary/30 border border-border rounded-3xl p-4 flex gap-4">
                        <button
                          onClick={() => {
                            setBouquetItems(prev => prev.map(item => {
                              const x = 35 + Math.random() * 30;
                              const dist = Math.abs(x - 50);
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
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-card/40 border border-border hover:bg-card/60 hover:border-primary/30 transition-all group overflow-hidden relative"
                          disabled={isGenerating || !!generatedImage}
                        >
                          <Shuffle className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">Rearrange</span>
                        </button>

                        <button
                          onClick={() => {
                            setBouquetItems(prev => prev.map(item => ({
                              ...item,
                              stemBend: (Math.random() * 60 - 30),
                              stemType: Math.floor(Math.random() * 3)
                            })));
                          }}
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-card/40 border border-border hover:bg-card/60 hover:border-green-500/30 transition-all group overflow-hidden relative"
                          disabled={isGenerating || !!generatedImage}
                        >
                          <Sprout className="w-4 h-4 text-green-500 group-hover:scale-125 transition-transform duration-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">Refine Stems</span>
                        </button>
                      </div>
                    </div>
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
                  <LetterInput
                    creationType={creationType || 'bouquet'}
                    letter={letter}
                    setLetter={setLetter}
                    giftType={giftType}
                    setGiftType={setGiftType}
                    theme={theme}
                    setTheme={setTheme}
                    cardStyle={cardStyle}
                    setCardStyle={setCardStyle}
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
                    onFinalize={handleSaveAndShare}
                    isSaving={isSaving}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!shareUrl && creationType && (
          <div className="flex justify-between mt-8 pt-8 border-t border-border/50">
            <button
              onClick={handleBack}
              className="group px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-border bg-card/40 backdrop-blur-md flex items-center gap-2 transition-all duration-500 hover:bg-secondary hover:border-primary/20 text-muted-foreground hover:text-foreground shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Retrace
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={creationType === 'bouquet' && totalItems < 3}
                className="group relative px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] bg-primary text-primary-foreground rounded-full hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] transform transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 animate-shimmer" />
                Proceed
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setIsPreviewing(true)}
                  className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] bg-secondary/80 text-foreground rounded-full hover:bg-secondary flex items-center gap-2 transition-all border border-border backdrop-blur-xl shadow-sm hover:border-primary/20"
                >
                  <Eye className="w-4 h-4" />
                  Glimpse
                </button>
                <button
                  onClick={handleSaveAndShare}
                  disabled={isSaving}
                  className="group relative px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-primary to-amber-500 text-white rounded-full hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] transform transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-30 disabled:grayscale overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isSaving ? <Wand2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
                  Finalize Gift
                </button>
              </div>
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

