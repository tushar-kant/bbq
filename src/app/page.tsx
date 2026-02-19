"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, LogIn, Mail, RefreshCw, Heart } from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { generateBBQName } from "@/lib/bbqNames";

export default function Home() {
  const { data: session } = useSession();
  const [bbqName, setBbqName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setBbqName(generateBBQName());
      setIsGenerating(false);
    }, 800);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-4xl w-full space-y-12 text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8 text-primary" />
            </motion.div>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-playfair)] tracking-tight">
            <span className="girly-text-gradient">FORU</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Where heat meets elegance. Generate your unique BBQ persona with a touch of sparkle.
          </p>
        </motion.div>

        {/* Generator Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden"
        >
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {bbqName ? (
                <motion.div
                  key={bbqName}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="py-12"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">Your BBQ Identity</p>
                  <h2 className="text-4xl md:text-6xl font-black italic girly-text-gradient drop-shadow-sm">
                    {bbqName}
                  </h2>
                </motion.div>
              ) : (
                <motion.div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <Heart className="w-8 h-8" />
                  </div>
                  <p className="text-muted-foreground italic">Ready to spark some flavor?</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="group relative w-full py-4 px-8 rounded-2xl girly-gradient text-white font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Flame className="w-5 h-5" />
                    <span>Generate BBQ Name</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

        {/* Email Sharing */}
        <AnimatePresence>
          {bbqName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-4"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="friend@example.com"
                  className="flex-1 bg-card border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                  id="target-email"
                />
                <button
                  onClick={async () => {
                    const email = (document.getElementById("target-email") as HTMLInputElement).value;
                    if (!email) return alert("Please enter an email");

                    const res = await fetch("/api/share", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, bbqName }),
                    });

                    if (res.ok) alert("Sparkle sent! ✨");
                    else alert("Failed to send smoke signal.");
                  }}
                  className="px-6 py-2 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Share via Mail
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-3 px-8 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium"
            >
              <LogIn className="w-5 h-5" />
              Sign in with Google
            </button>
          ) : (
            <div className="flex items-center gap-4 p-2 pl-4 rounded-full border border-border bg-card">
              <span className="text-sm font-medium">Hello, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-full bg-muted text-xs font-bold hover:bg-destructive hover:text-white transition-all underline decoration-primary/30"
              >
                Sign Out
              </button>
            </div>
          )}

          <button className="flex items-center gap-3 px-8 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium">
            <Mail className="w-5 h-5" />
            Contact Master
          </button>
        </div>
      </div>

      <footer className="absolute bottom-8 text-sm text-muted-foreground opacity-60">
        &copy; 2024 FORU | Sizzling with Style
      </footer>
    </main>
  );
}
