"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-32 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-serif">Privacy Policy</h1>
                    <p className="text-muted-foreground/60 uppercase tracking-[0.3em] text-[10px] font-bold">Last Updated: February 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-pink max-w-none space-y-8 text-muted-foreground/80 font-light leading-relaxed"
                >
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">1. Information We Collect</h2>
                        <p>
                            At FORU, we value your privacy above all. We collect minimal information to provide our floral experience:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Account Information:</strong> If you sign in with Google, we receive your name, email, and profile picture.</li>
                            <li><strong>Creations:</strong> We store the data associated with the bouquets you design and share.</li>
                            <li><strong>Analytics:</strong> Anonymous usage data is collected to improve the artistic experience.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">2. How We Use Your Data</h2>
                        <p>
                            Your data is used solely to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Enable the creation and sharing of digital bouquets.</li>
                            <li>Personalize your experience in the Garden.</li>
                            <li>Facilitate the gifting process to your chosen recipients.</li>
                            <li>Communicate important updates about the platform.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">3. Data Sharing</h2>
                        <p>
                            We do not sell your personal information. Your creations are public in the Garden only if you choose to share them. We may share anonymized data with service providers who help us operate our infrastructure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">4. Security</h2>
                        <p>
                            We implement industry-standard encryption and security measures to protect your data. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">5. Your Rights</h2>
                        <p>
                            You have the right to access, correct, or delete your personal data at any time. You can do this through your account settings or by contacting our privacy officer.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-foreground/5">
                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                            Questions about our privacy practices? Contact privacy@foru.art
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
