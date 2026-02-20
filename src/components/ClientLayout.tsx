"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import React, { useState, useEffect } from "react";
import { HeartLoader } from "@/components/HeartLoader";
import { motion, AnimatePresence } from "framer-motion";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isSharePage = pathname?.startsWith("/share");
    const isHomePage = pathname === "/";

    // We remove default top padding for Share page and Home page (for immersive hero)
    const shouldAddPadding = !isSharePage && !isHomePage;

    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        // App loading finishes after 2.5 seconds allowing HeartLoader drawing effect
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isAppLoading ? (
                    <motion.div
                        key="app-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
                    >
                        <HeartLoader />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-8 text-muted-foreground font-serif italic text-lg tracking-widest uppercase animate-pulse"
                        >
                            Orchestrating Beauty...
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="app-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col min-h-screen"
                    >
                        {!isSharePage && <Header />}
                        <div className={shouldAddPadding ? "pt-20" : ""}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
