"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Flame, Sparkles, LogOut, User } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass">
            <div className="flex items-center gap-2">
                <span className="font-bold font-[var(--font-playfair)] text-xl">FORU</span>
            </div>
            <div className="w-32 h-8 rounded-full bg-muted animate-pulse" />
        </header>
    );

    return (
        <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b border-border/50">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <div className="relative">
                    <Flame className="text-primary w-6 h-6" />
                    <Sparkles className="text-accent w-4 h-4 absolute -top-1 -right-2 animate-pulse" />
                </div>
                <span className="font-bold font-[var(--font-playfair)] text-xl hidden md:block">
                    FORU
                </span>
            </motion.div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground relative overflow-hidden group"
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {resolvedTheme === "dark" ? (
                            <motion.div
                                key="moon"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Moon className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>


                {/* User Menu */}
                <div className="h-8 w-[1px] bg-border/50 mx-2" />

                {session ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-xs font-bold leading-none">{session.user?.name}</span>
                            <span className="text-[10px] text-muted-foreground">Grill Master</span>
                        </div>
                        {session.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="User"
                                className="w-8 h-8 rounded-full border border-primary/20 shadow-sm"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                        )}
                        <button
                            onClick={() => signOut()}
                            className="p-2 hover:text-destructive transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};
