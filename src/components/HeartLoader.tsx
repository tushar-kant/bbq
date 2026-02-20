"use client";

import { motion } from "framer-motion";

export const HeartLoader = () => {
    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            {/* Deep Ambient Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: [0, 0.4, 0.2, 0.4],
                    scale: [0.5, 1.2, 0.9, 1.1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-pink-500/20 rounded-full blur-[40px]"
            />

            {/* Expanding Concentric Pulsing Rings (Only after drawn) */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-pink-400/40"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2.5, opacity: [0, 0.6, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 2 + i * 1, // Start after the heart draws
                        ease: "easeOut"
                    }}
                />
            ))}

            <motion.div
                className="relative z-10 flex items-center justify-center w-24 h-24"
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.1, 0.95, 1.05, 1],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 2.5, // Start beating after drawing
                    ease: "easeInOut"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 via-rose-500/20 to-pink-600/10 rounded-full blur-xl" />

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] relative z-20"
                >
                    {/* The drawing of the outline */}
                    <motion.path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        initial={{ pathLength: 0, fill: "rgba(236, 72, 153, 0)" }}
                        animate={{
                            pathLength: 1,
                            fill: ["rgba(236, 72, 153, 0)", "rgba(236, 72, 153, 0.1)", "rgba(236, 72, 153, 1)"],
                            stroke: ["rgba(236, 72, 153, 1)", "rgba(236, 72, 153, 1)", "rgba(236, 72, 153, 0)"]
                        }}
                        transition={{
                            pathLength: { duration: 2, ease: "easeInOut" },
                            fill: { delay: 1.8, duration: 1, ease: "circIn" },
                            stroke: { delay: 2, duration: 0.8 }
                        }}
                    />
                </svg>

                {/* Secondary inner glow after it fills */}
                <motion.div
                    className="absolute inset-0 bg-pink-400/30 blur-2xl rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
                    transition={{ delay: 2.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
};
