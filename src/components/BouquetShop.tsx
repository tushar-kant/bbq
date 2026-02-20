"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BouquetCanvas } from "./BouquetCanvas";
import { BouquetItem } from "@/lib/flowers";
import { ShoppingBag, Edit3, ArrowRight, Sparkles, Heart, Loader2, Plus } from "lucide-react";
import Link from "next/link";

interface BouquetData {
    _id: string;
    items: BouquetItem[];
    canvasBackground: string;
    recipientName?: string;
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
}

import { HeartLoader } from "./HeartLoader";

export const BouquetShop = () => {
    const [bouquets, setBouquets] = useState<BouquetData[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBouquets = async (page: number, append = false) => {
        try {
            if (append) setLoadingMore(true);
            else setLoading(true);

            const res = await fetch(`/api/bouquet?page=${page}&limit=15`);
            const data = await res.json();

            if (data.bouquets) {
                if (append) {
                    setBouquets(prev => [...prev, ...data.bouquets]);
                } else {
                    setBouquets(data.bouquets);
                }
                setPagination({
                    total: data.total,
                    page: data.page,
                    totalPages: data.totalPages,
                    hasMore: data.hasMore
                });
            }
        } catch (error) {
            console.error("Error fetching bouquets:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchBouquets(1);
    }, []);

    const handleLoadMore = () => {
        if (pagination?.hasMore && !loadingMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchBouquets(nextPage, true);
        }
    };

    if (loading && bouquets.length === 0) {
        return (
            <div className="w-full py-32 flex flex-col items-center justify-center gap-12">
                <HeartLoader />
                <p className="text-muted-foreground animate-pulse font-serif italic text-lg tracking-wide">Gathering the finest arrangements...</p>
            </div>
        );
    }

    if (bouquets.length === 0 && !loading) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-24 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-[10px] font-bold text-pink-500 tracking-[0.3em] uppercase"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Floral Archives
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-foreground">
                        The <span className="italic text-pink-500">Garden</span> Gallery
                    </h2>
                    <p className="text-muted-foreground font-light max-w-xl text-lg leading-relaxed">
                        A curated history of community creations. Select any arrangement to use as a <span className="text-foreground font-medium underline decoration-pink-500/30 underline-offset-4">blueprint</span> for your own gift.
                    </p>
                </div>

                {pagination && (
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/50 bg-muted/30 px-6 py-3 rounded-full border border-border/50">
                        <span className="text-foreground">{bouquets.length}</span> / {pagination.total} Creations
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {bouquets.map((bouquet, index) => (
                    <motion.div
                        key={bouquet._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="group relative"
                    >
                        <Link href={`/bouquet?edit=${bouquet._id}`} className="block group">
                            {/* Bouquet Preview Card */}
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 group-hover:shadow-pink-500/20 group-hover:-translate-y-3 cursor-pointer ring-1 ring-white/10">
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-full h-full transform transition-transform duration-1000 group-hover:scale-110">
                                    <BouquetCanvas
                                        items={bouquet.items}
                                        setItems={() => { }}
                                        isEditable={false}
                                        background={bouquet.canvasBackground}
                                    />
                                </div>

                                {/* Premium Float Labels */}
                                <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                                    <div className="bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                                        <Edit3 className="w-3.5 h-3.5 text-pink-500" /> Remix Design
                                    </div>
                                </div>

                                <div className="absolute bottom-10 inset-x-0 z-20 px-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0 text-center">
                                    <div className="w-12 h-0.5 bg-pink-500 mx-auto mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 leading-none">Perspective</p>
                                    <p className="text-white text-xl font-serif italic tracking-wide">Community Classic</p>
                                </div>
                            </div>

                            {/* Info Overlay */}
                            <div className="px-6 mt-8 flex justify-between items-center transition-all duration-500">
                                <div className="space-y-2">
                                    <h3 className="font-serif text-2xl text-foreground/90 font-medium group-hover:text-pink-500 transition-colors duration-300">
                                        Artistic Arrangement
                                    </h3>
                                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">
                                        <Sparkles className="w-3.5 h-3.5 text-pink-400/60" />
                                        {bouquet.items.length} Curated Elements
                                    </div>
                                </div>
                                <div className="w-14 h-14 flex items-center justify-center bg-muted/50 rounded-full text-foreground/30 group-hover:text-pink-500 group-hover:bg-pink-500/10 group-hover:scale-110 transition-all duration-500 border border-transparent group-hover:border-pink-500/20">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Load More & Pagination Controls */}
            <div className="mt-32 flex flex-col items-center gap-12">
                <AnimatePresence>
                    {pagination?.hasMore && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="group relative px-12 py-6 bg-card border border-border hover:border-pink-500/30 rounded-full text-sm font-bold uppercase tracking-[0.3em] transition-all shadow-xl hover:shadow-2xl hover:shadow-pink-500/5 disabled:opacity-50 flex items-center gap-4"
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-pink-500" />
                                    Cultivating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5 text-pink-500 group-hover:rotate-180 transition-transform duration-700" />
                                    Load More Wonders
                                </>
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>

                <div className="flex flex-col items-center gap-6">
                    <div className="h-24 w-px bg-gradient-to-b from-pink-500/50 to-transparent" />
                    <p className="text-muted-foreground font-light italic text-lg">Or create something entirely new</p>
                    <Link href="/bouquet">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-10 py-5 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 group shadow-2xl"
                        >
                            Start Fresh Canvas <Heart className="w-4 h-4 text-pink-500 group-hover:fill-pink-500 transition-all duration-300" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
