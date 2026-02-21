"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Github, Twitter, Instagram, Heart } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="relative z-20 pt-20 pb-10 px-6 border-t border-foreground/5 bg-background overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[300px] bg-pink-500/5 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="space-y-6 col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <img
                                src="/logo.png"
                                alt="FORU Logo"
                                className="w-full h-full object-contain filter drop-shadow-sm brightness-110"
                            />
                        </div>
                        <span className="font-bold font-serif text-3xl tracking-tighter text-foreground">FORU</span>
                    </Link>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed font-light">
                        Crafting digital eternity through the language of blooms. A sanctuary for preserved emotions and timeless artistry.
                    </p>
                    <div className="flex gap-4">
                        {[Github, Twitter, Instagram].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                whileHover={{ y: -3, textShadow: "0 0 8px rgba(236, 72, 153, 0.5)" }}
                                className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-pink-500 hover:border-pink-500/50 transition-all bg-foreground/[0.02]"
                            >
                                <Icon className="w-4 h-4" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/80">Navigation</h4>
                    <ul className="space-y-4">
                        {[
                            { label: "The Garden", href: "/garden" },
                            { label: "Create Bloom", href: "/create" },
                            { label: "Featured Art", href: "#" },
                            { label: "About Foru", href: "#" }
                        ].map((link, i) => (
                            <li key={i}>
                                <Link href={link.href} className="text-xs text-muted-foreground/60 hover:text-pink-500 transition-colors tracking-wide font-light">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/80">Support</h4>
                    <ul className="space-y-4">
                        {[
                            { label: "Help Center", href: "/help" },
                            { label: "Terms of Service", href: "/terms" },
                            { label: "Privacy Policy", href: "/privacy" },
                            { label: "Cookie Policy", href: "/cookies" }
                        ].map((link, i) => (
                            <li key={i}>
                                <Link href={link.href} className="text-xs text-muted-foreground/60 hover:text-pink-500 transition-colors tracking-wide font-light">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/80">Newsletter</h4>
                    <p className="text-xs text-muted-foreground/60 leading-relaxed font-light">
                        Join our collective of artists and receive updates on new rare blooms.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-foreground/[0.03] border border-foreground/10 rounded-full px-4 py-2 text-xs w-full focus:outline-none focus:border-pink-500/50 focus:bg-foreground/[0.05] transition-all"
                        />
                        <button className="bg-pink-500 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
                    &copy; 2024 FORU GLOBAL ARTISTRY. ALL RIGHTS RESERVED.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
                    Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 mx-1" /> for the Eternal
                </div>
            </div>
        </footer>
    );
};
