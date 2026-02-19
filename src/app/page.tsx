"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ThreeRose } from "@/components/ThreeRose";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#130306] relative overflow-hidden flex flex-col text-white">
      {/* 3D Heart Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <ThreeRose />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-pink-200/80 tracking-wide uppercase">
            <Sparkles className="w-3 h-3" /> Digital Affection
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,107,157,0.3)]">
            Eternal <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 animate-shimmer bg-[length:200%_auto]">
              Love
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/70 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            Craft a bouquet that never fades. <br className="hidden md:block" />
            Send a timeless message wrapped in digital wonder.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/bouquet">
              <button className="group relative px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-lg font-medium transition-all hover:bg-white/20 hover:scale-105 hover:border-pink-300/50 hover:shadow-[0_0_30px_rgba(255,107,157,0.4)]">
                <span className="flex items-center gap-3">
                  Create Your Gift <Heart className="w-5 h-5 fill-pink-500 text-pink-500 animate-pulse" />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer / Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 pt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left"
      >
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group">
          <h3 className="text-lg font-serif font-medium text-pink-200 mb-2 group-hover:text-pink-100 transition-colors">Custom Arrangements</h3>
          <p className="text-sm text-white/50 leading-relaxed">Design a unique bouquet with flowers that speak your heart.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group">
          <h3 className="text-lg font-serif font-medium text-pink-200 mb-2 group-hover:text-pink-100 transition-colors">Interactive 3D</h3>
          <p className="text-sm text-white/50 leading-relaxed">A premium immersive experience that brings your gift to life.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group">
          <h3 className="text-lg font-serif font-medium text-pink-200 mb-2 group-hover:text-pink-100 transition-colors">Digital Delivery</h3>
          <p className="text-sm text-white/50 leading-relaxed">Schedule your surprise to arrive at the perfect moment.</p>
        </div>
      </motion.div>

      <div className="relative z-10 text-center py-6 text-xs text-white/20 uppercase tracking-widest">
        Made with Love by FORU
      </div>
    </main>
  );
}
