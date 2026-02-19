"use client";

import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-float decoration-clone" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Flower2 className="w-12 h-12 text-primary" />
            </motion.div>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground">
            A Bouquet <br />
            <span className="text-gradient font-bold italic">Just For You</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Create a timeless digital arrangement, write a heartfelt letter, and wrap it in a surprise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/bouquet">
            <button className="group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Creating <Heart className="w-5 h-5 fill-current" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>

          <button className="px-8 py-4 bg-white/50 border border-border text-foreground font-medium rounded-full hover:bg-white transition-colors">
            View Gallery
          </button>
        </motion.div>
      </div>

      <footer className="absolute bottom-8 text-sm text-muted-foreground/60">
        Crafted with love by FORU
      </footer>
    </main>
  );
}
