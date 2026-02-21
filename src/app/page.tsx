"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Star, Flower2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

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

          <p className="text-base md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed tracking-wide pt-4">
            Design breathtaking bouquets that <span className="text-foreground font-medium">defy time</span>.
            A luxury experience crafted for those who speak the language of beauty.
          </p>

          <div className="pt-2 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full text-sm md:text-base font-bold tracking-widest transition-all shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] overflow-hidden border border-pink-400/50"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="flex items-center gap-3 relative z-10 uppercase">
                  Begin Your Creation
                  <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform duration-500" />
                </span>
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
              </motion.button>
            </Link>

            <Link href="/garden">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 border border-foreground/20 bg-background/50 backdrop-blur-xl text-foreground rounded-full text-sm md:text-base font-medium tracking-widest uppercase transition-all hover:bg-foreground/5 hover:border-pink-500/50 flex items-center gap-3 shadow-sm"
              >
                Explore Garden <Flower2 className="w-4 h-4 text-pink-500 group-hover:rotate-[30deg] transition-transform duration-500" />
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

      {/* Step by Step Process */}
      <section className="relative z-20 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-foreground">The Art of Giving</h2>
            <p className="text-muted-foreground/60 max-w-2xl mx-auto font-light tracking-wide uppercase text-xs">A three-step journey to eternity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent -translate-y-1/2 -z-10" />

            {[
              { num: "01", title: "Select Your Bloom", desc: "Choose from an exquisite collection of 3D flowers, each modeled with poetic precision.", icon: <Flower2 className="w-6 h-6" /> },
              { num: "02", title: "Sculpt Your Vision", desc: "Arrange, customize, and infuse your unique essence into a digital masterpiece.", icon: <Heart className="w-6 h-6" /> },
              { num: "03", title: "Share the Eternal", desc: "Send a gift that never withers, preserved in the digital garden for all time.", icon: <Sparkles className="w-6 h-6" /> }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-background border border-pink-500/30 flex items-center justify-center text-pink-500 shadow-xl shadow-pink-500/5 backdrop-blur-3xl group transition-all duration-500 hover:scale-110 hover:border-pink-500">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-pink-500 text-white px-2 py-0.5 rounded-full">{step.num}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials / Emotional Section */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block p-3 rounded-full bg-pink-500/10 border border-pink-500/20"
          >
            <Star className="w-6 h-6 text-pink-500 fill-pink-500" />
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif italic text-foreground leading-tight"
          >
            "A gift that transcends the physical realm. Seeing my creation bloom in the digital garden brought a sense of peace I haven't felt in years."
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-1"
          >
            <p className="text-foreground font-bold uppercase tracking-widest text-[10px]">Elena Thorne</p>
            <p className="text-muted-foreground/50 text-[10px] uppercase tracking-widest leading-none">Digital Art Curator</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
