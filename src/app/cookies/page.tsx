"use client";

import { motion } from "framer-motion";

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-32 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-serif">Cookie Policy</h1>
                    <p className="text-muted-foreground/60 uppercase tracking-[0.3em] text-[10px] font-bold">Last Updated: February 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-pink max-w-none space-y-8 text-muted-foreground/80 font-light leading-relaxed"
                >
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">What are Cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device that help us improve your experience. On FORU, we use them to remember your session and preferences as you navigate through our digital garden.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">How We Use Cookies</h2>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>
                                <strong>Essential Cookies:</strong> These are required for the platform to function, such as keeping you signed in during your session.
                            </li>
                            <li>
                                <strong>Preference Cookies:</strong> These remember your settings, such as your theme choice (Dark or Light mode) and language preferences.
                            </li>
                            <li>
                                <strong>Performance Cookies:</strong> These help us understand how you interact with the platform so we can optimize the performance of our 3D renderers.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">Managing Your Preferences</h2>
                        <p>
                            Most browsers allow you to control cookies through their settings. However, disabling essential cookies may prevent you from using some of our features, such as creating or saving bouquets.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-foreground/5">
                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                            For more details on your data, please review our <a href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
