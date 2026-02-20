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

    // On Home Page, we want a transparent header but text needs to differ based on theme
    // Since home page now has theme support (light/dark bg), text should just be text-foreground
    const headerClass = isHomePage
        ? "fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 bg-transparent text-foreground"
        : "fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b border-border/50 transition-all duration-300";

    if (!mounted) return (
        <header className={headerClass}>
            <div className="flex items-center gap-2">
                <span className="font-bold font-[var(--font-playfair)] text-xl text-foreground">FORU</span>
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
                        <Flame className="w-6 h-6 text-primary" />
                        <Sparkles className="w-4 h-4 absolute -top-1 -right-2 animate-pulse text-accent" />
                    </div>
                    <span className="font-bold font-[var(--font-playfair)] text-xl hidden md:block text-foreground">
                        FORU
                    </span>
                </motion.div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 ml-8">
                <Link href="/garden" className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${pathname === '/garden' ? 'text-primary' : 'text-foreground/60'}`}>
                    Garden
                </Link>
                <Link href="/create" className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${pathname === '/create' ? 'text-primary' : 'text-foreground/60'}`}>
                    Create
                </Link>
            </nav>

            <div className="flex-grow" />

            <div className="flex items-center gap-4 text-foreground">
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full transition-colors relative overflow-hidden group hover:bg-muted text-foreground"
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
                <div className="h-8 w-[1px] mx-2 bg-border" />

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
                                className="w-8 h-8 rounded-full shadow-sm border-primary/20"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
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
