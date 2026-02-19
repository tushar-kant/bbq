"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Star, Flower2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col transition-colors duration-700 font-sans selection:bg-pink-500/30">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,107,157,0.15),_transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-500/5 rounded-full blur-[160px]" />

        {/* Animated Particles/Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute bg-white/40 dark:bg-pink-400/20 rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-40 pb-20 text-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-2xl text-[10px] md:text-xs font-bold text-pink-500 tracking-[0.3em] uppercase shadow-2xl shadow-pink-500/10 mb-2 cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-pink-400" />
            The Art of Digital Gifting
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-serif font-medium tracking-tight text-foreground drop-shadow-[0_10px_35px_rgba(0,0,0,0.1)] leading-[0.95] md:leading-[0.85]">
            Eternal <br />
            <span className="italic relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 animate-shimmer bg-[length:200%_auto] filter drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                Love
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute left-0 bottom-4 h-2 bg-pink-500/10 -z-0 blur-sm"
              />
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide pt-2">
            Design breathtaking bouquets that <span className="text-foreground font-medium">defy time</span>.
            A luxury experience crafted for those who speak the language of beauty.
          </p>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-10">
            <Link href="/bouquet">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-14 py-7 bg-foreground text-background rounded-full text-lg font-bold transition-all shadow-2xl shadow-foreground/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-rose-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="flex items-center gap-4 relative z-10">
                  Begin Your Creation
                  <Heart className="w-6 h-6 fill-pink-500 text-pink-500 group-hover:scale-125 transition-transform duration-500 animate-pulse" />
                </span>
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer transition-all duration-1000" />
              </motion.button>
            </Link>

            <Link href="/garden">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group px-12 py-7 border border-white/10 bg-white/5 backdrop-blur-3xl text-foreground rounded-full text-lg font-medium transition-all hover:bg-white/10 hover:border-pink-500/30 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              >
                Explore Garden <Flower2 className="w-6 h-6 text-pink-400 group-hover:rotate-[30deg] transition-transform duration-500" />
              </motion.button>
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Experience Sections */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-24 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Couture Design",
            desc: "Expertly curated blooms selected for visual harmony and emotional weight.",
            icon: "🌸",
            color: "from-pink-500/20"
          },
          {
            title: "Floral Gallery",
            desc: "Browse a collective garden of digital masterpieces shared by others.",
            icon: "🍃",
            color: "from-blue-500/20"
          },
          {
            title: "Timed Perfection",
            desc: "Deliver your surprise with precision scheduling for maximum impact.",
            icon: "🎁",
            color: "from-amber-500/20"
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 transition-all group shadow-2xl relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <div className="text-4xl mb-6 relative group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
            <h3 className="text-xl font-serif font-medium text-foreground mb-3 relative">{feature.title}</h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed font-light relative">{feature.desc}</p>
            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
              <ArrowRight className="w-4 h-4 text-pink-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 text-center py-10">
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-px bg-gradient-to-b from-pink-500 to-transparent mb-2" />
          <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.5em] font-bold">Orchestrated by FORU</span>
        </div>
      </div>
    </main>
  );
}
