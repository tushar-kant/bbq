"use client";

import { motion } from "framer-motion";
import { Sparkles, Boxes, Feather, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateSelectionPage() {
    return (
        <main className="min-h-[90vh] bg-background relative overflow-hidden flex flex-col items-center justify-center px-6 pt-20 pb-10">
            {/* Minimalist Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-4xl relative z-10 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-3"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/10 bg-pink-500/5 text-[9px] font-bold text-pink-500 tracking-[0.2em] uppercase mx-auto">
                        <Sparkles className="w-3 h-3" /> Select Medium
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        What will you <span className="italic text-pink-500">share?</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {/* Compact Horizontal Arrangement Card */}
                    <Link href="/bouquet" className="group">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-5 flex items-center gap-5 hover:bg-card/60 hover:border-pink-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-pink-500/5 border border-pink-500/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                                <Boxes className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-serif font-medium leading-tight">3D Arrangement</h3>
                                <p className="text-[10px] text-muted-foreground/60 leading-tight">
                                    Sculpt a living tribute into a digital bloom.
                                </p>
                            </div>
                            <div className="w-8 h-8 shrink-0 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Compact Horizontal Letter Card */}
                    <Link href="/letter" className="group">
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-5 flex items-center gap-5 hover:bg-card/60 hover:border-purple-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                <Feather className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-serif font-medium leading-tight">Poetry & Prose</h3>
                                <p className="text-[10px] text-muted-foreground/60 leading-tight">
                                    Seal a whispered message into the landscape.
                                </p>
                            </div>
                            <div className="w-8 h-8 shrink-0 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
