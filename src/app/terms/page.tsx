"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-32 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-serif">Terms of Service</h1>
                    <p className="text-muted-foreground/60 uppercase tracking-[0.3em] text-[10px] font-bold">Last Updated: February 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-pink max-w-none space-y-8 text-muted-foreground/80 font-light leading-relaxed"
                >
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using FORU, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of such modifications.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">2. Digital Ownership</h2>
                        <p>
                            The digital bouquets created on FORU are artistic expressions. While you "own" the specific arrangement you create, the underlying assets (3D models, textures, code) remain the property of FORU and its licensors. You are granted a personal, non-commercial license to share your creations within the platform and as digital gifts.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">3. User Conduct</h2>
                        <p>
                            We believe in the beauty of expression. However, users are prohibited from:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Using the platform for any illegal or unauthorized purpose.</li>
                            <li>Uploading content that is harmful, offensive, or infringes on intellectual property.</li>
                            <li>Attempting to reverse engineer or disrupt the platform's infrastructure.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">4. Gifting and Privacy</h2>
                        <p>
                            When you send a digital bouquet as a gift, we collect only the necessary information to facilitate the delivery. You are responsible for ensuring you have the recipient's consent to send such gifts.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-foreground">5. Limitation of Liability</h2>
                        <p>
                            FORU is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-foreground/5">
                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
                            For any questions regarding these terms, please contact our legal team at legal@foru.art
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
