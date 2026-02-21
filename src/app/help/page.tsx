"use client";

import { motion } from "framer-motion";
import { Search, HelpCircle, Mail, MessageCircle } from "lucide-react";

export default function HelpPage() {
    const faqs = [
        {
            q: "How do I share a bouquet?",
            a: "Once you complete your creation, click the 'Share' button. You'll receive a unique link that you can send to anyone. They will see your bouquet bloom in their browser."
        },
        {
            q: "Is it free to use?",
            a: "The core experience of FORU is free. We offer a curated collection of blooms for everyone to use. Premium species and specialized arrangements may be part of our collector's editions."
        },
        {
            q: "Can I edit a bouquet after shared?",
            a: "Shared bouquets are preserved in their state at the time of creation. To make changes, you'll need to create a new masterpiece from the Garden."
        },
        {
            q: "What browsers are supported?",
            a: "FORU utilizes advanced 3D rendering. We recommend using the latest versions of Chrome, Safari, or Firefox for the most fluid experience."
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground py-32 px-6">
            <div className="max-w-4xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl md:text-8xl font-serif">How can we <br /><span className="italic text-pink-500">help you?</span></h1>
                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 group-focus-within:text-pink-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-pink-500/50 transition-all font-light"
                        />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-card border border-white/5 space-y-4 hover:border-pink-500/20 transition-all group"
                        >
                            <HelpCircle className="w-6 h-6 text-pink-500/40 group-hover:text-pink-500 transition-colors" />
                            <h3 className="text-lg font-serif font-medium">{faq.q}</h3>
                            <p className="text-sm text-muted-foreground/60 leading-relaxed font-light">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="p-10 rounded-[3rem] bg-gradient-to-br from-pink-500/5 to-transparent border border-pink-500/10 text-center space-y-8"
                >
                    <h2 className="text-3xl font-serif">Still have questions?</h2>
                    <p className="text-muted-foreground/60 font-light max-w-sm mx-auto">Our keepers of the garden are here to assist you with any inquiries.</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="flex items-center gap-3 px-8 py-3 bg-foreground text-background rounded-full text-xs font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
                            <Mail className="w-4 h-4" /> Email Us
                        </button>
                        <button className="flex items-center gap-3 px-8 py-3 border border-foreground/10 rounded-full text-xs font-bold uppercase tracking-widest hover:border-pink-500 transition-all">
                            <MessageCircle className="w-4 h-4 text-pink-500" /> Live Chat
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
