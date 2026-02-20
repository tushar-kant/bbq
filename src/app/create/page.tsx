"use client";

import { motion } from "framer-motion";
import { Sparkles, Flower2, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateSelectionPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground pb-10 transition-colors duration-500">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,157,0.1),_transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center min-h-[60vh] w-full"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-12 space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-xl text-[10px] font-bold text-pink-500 tracking-[0.2em] uppercase shadow-sm mx-auto">
                            <Sparkles className="w-3 h-3 animate-pulse" /> Create Something Eternal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground tracking-tight">
                            Choose Your <span className="italic text-pink-500">Expression</span>
                        </h1>
                        <p className="text-muted-foreground/80 font-light max-w-md mx-auto text-sm md:text-base leading-relaxed">
                            Every gift carries a whisper of the heart. Select your medium and begin your journey.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-6">
                        {/* Virtual Bouquet Card */}
                        <Link href="/bouquet" className="block group relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative h-[280px] w-full rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.15)] border border-white/10 bg-card/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 z-10"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/5 to-transparent opacity-50" />

                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative backdrop-blur-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl ring-1 ring-white/20">
                                        <Flower2 className="w-9 h-9 text-pink-400 group-hover:text-pink-500 transition-colors duration-500" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-serif font-medium text-foreground mb-2 text-center">3D Arrangement</h3>
                                <p className="text-muted-foreground/70 text-sm font-light leading-snug max-w-[200px] group-hover:text-foreground/90 transition-colors text-center">
                                    Sculpt beautiful blooms into a timeless digital bouquet.
                                </p>

                                <div className="mt-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-pink-500">
                                        Select Ritual <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Digital Letter Card */}
                        <Link href="/letter" className="block group relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative h-[280px] w-full rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.15)] border border-white/10 bg-card/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 z-10"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent opacity-50" />

                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative backdrop-blur-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl ring-1 ring-white/20">
                                        <Mail className="w-9 h-9 text-purple-400 group-hover:text-purple-500 transition-colors duration-500" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-serif font-medium text-foreground mb-2 text-center">Poetry & Prose</h3>
                                <p className="text-muted-foreground/70 text-sm font-light leading-snug max-w-[200px] group-hover:text-foreground/90 transition-colors text-center">
                                    A sealed digital message for their eyes only.
                                </p>

                                <div className="mt-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-500">
                                        Begin Writing <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
