"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Flame, Sparkles, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const Header = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => setMounted(true), []);

    // On Home Page, we want a transparent header with white text/icons
    // standard glass vs premium transparent
    const headerClass = isHomePage
        ? "fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 bg-transparent text-white"
        : "fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b border-border/50 transition-all duration-300";

    const iconClass = isHomePage ? "text-white" : "text-foreground";
    const logoClass = isHomePage ? "text-white" : "text-primary"; // Flame color

    if (!mounted) return (
        <header className={headerClass}>
            <div className="flex items-center gap-2">
                <span className={`font-bold font-[var(--font-playfair)] text-xl ${isHomePage ? "text-white" : ""}`}>FORU</span>
            </div>
            <div className="w-32 h-8 rounded-full bg-muted animate-pulse" />
        </header>
    );

    return (
        <header className={headerClass}>
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className="relative">
                        <Flame className={`w-6 h-6 ${isHomePage ? "text-pink-300" : "text-primary"}`} />
                        <Sparkles className={`w-4 h-4 absolute -top-1 -right-2 animate-pulse ${isHomePage ? "text-white" : "text-accent"}`} />
                    </div>
                    <span className={`font-bold font-[var(--font-playfair)] text-xl hidden md:block ${isHomePage ? "text-white" : "text-foreground"}`}>
                        FORU
                    </span>
                </motion.div>
            </Link>

            <div className={`flex items-center gap-4 ${isHomePage ? "text-white header-home-items" : "text-foreground"}`}>
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className={`p-2 rounded-full transition-colors relative overflow-hidden group ${isHomePage ? "hover:bg-white/10 text-white" : "hover:bg-secondary text-foreground"}`}
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
                <div className={`h-8 w-[1px] mx-2 ${isHomePage ? "bg-white/30" : "bg-border/50"}`} />

                {session ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-xs font-bold leading-none">{session.user?.name}</span>
                            <span className={`text-[10px] ${isHomePage ? "text-white/70" : "text-muted-foreground"}`}>Grill Master</span>
                        </div>
                        {session.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="User"
                                className={`w-8 h-8 rounded-full shadow-sm ${isHomePage ? "border-white/30" : "border-primary/20"}`}
                            />
                        ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isHomePage ? "bg-white/20" : "bg-primary/10"}`}>
                                <User className={`w-4 h-4 ${isHomePage ? "text-white" : "text-primary"}`} />
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
