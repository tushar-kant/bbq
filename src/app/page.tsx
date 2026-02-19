"use client";

import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center pt-32 p-4">
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

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Flower2 className="w-8 h-8 text-rose-500" />}
            title="Custom Arrangements"
            description="Pick from dozens of flowers to create a unique bouquet that speaks your heart."
            delay={0.2}
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-amber-500" />}
            title="Scheduled Surprise"
            description="Schedule your gift to arrive at the perfect moment via email."
            delay={0.4}
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-pink-500" />}
            title="Heartfelt Notes"
            description="Attach a personal letter and a secret scratch-card message."
            delay={0.6}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 w-full bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-3xl p-12 max-w-6xl mx-auto mb-24 border border-white/20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Step number="1" title="Pick Your Blooms" description="Select flowers, leaves, and charms to build your base." />
          <Step number="2" title="Stylize & Arrange" description="Drag, rotate, and scale items to perfect your composition." />
          <Step number="3" title="Send with Love" description="Add your message and share via Link, Email, or WhatsApp." />
        </div>
      </section>

      <footer className="text-sm text-muted-foreground/60 pb-8">
        Crafted with love by FORU
      </footer>
    </main>
  );
}

const FeatureCard = ({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-8 rounded-3xl border border-white/20 hover:border-primary/20 transition-all hover:-translate-y-2"
  >
    <div className="w-16 h-16 bg-white/50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold font-serif mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
      {number}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground max-w-xs mx-auto">{description}</p>
  </div>
);
