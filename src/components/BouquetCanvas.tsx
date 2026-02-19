"use client";

import { motion, useDragControls } from "framer-motion";
import { BouquetItem, FLOWERS } from "@/lib/flowers";
import { useState, useRef, useEffect } from "react";
import { X, RotateCw } from "lucide-react";

interface BouquetCanvasProps {
    items: BouquetItem[];
    setItems: (items: BouquetItem[]) => void;
    isEditable?: boolean;
}

export const BouquetCanvas = ({ items, setItems, isEditable = true }: BouquetCanvasProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const updateItem = (id: string, updates: Partial<BouquetItem>) => {
        setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    const deleteItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
        setSelectedId(null);
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a0508]/60 backdrop-blur-xl ${!isEditable ? 'pointer-events-none' : ''}`}
            onClick={() => setSelectedId(null)}
        >
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-pink-900/20 pointer-events-none" />

            {items.map((item) => {
                const flower = FLOWERS.find((f) => f.id === item.flowerId);
                if (!flower) return null;

                const isSelected = selectedId === item.id;

                return (
                    <motion.div
                        key={item.id}
                        drag={isEditable}
                        dragMomentum={false}
                        dragConstraints={containerRef}
                        initial={{ scale: 0, opacity: 0, x: item.x, y: item.y }}
                        animate={{
                            scale: item.scale,
                            rotate: item.rotation,
                            opacity: 1,
                            x: item.x,
                            y: item.y
                        }}
                        whileHover={{ scale: item.scale * 1.05, cursor: isEditable ? "grab" : "default" }}
                        whileDrag={{ scale: item.scale * 1.1, cursor: "grabbing" }}
                        onDragEnd={(_, info) => {
                            if (isEditable) {
                                // Update position based on drag offset
                                updateItem(item.id, {
                                    x: item.x + info.offset.x,
                                    y: item.y + info.offset.y
                                });
                            }
                        }}
                        className={`absolute top-0 left-0 touch-none ${isEditable ? 'pointer-events-auto' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isEditable) setSelectedId(item.id);
                        }}
                    >
                        <div className={`text-7xl md:text-8xl filter drop-shadow-2xl select-none transform-gpu transition-all duration-300 ${isSelected ? 'brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}>
                            {flower.emoji}
                        </div>

                        {/* Controls for Selected Item */}
                        {isEditable && isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-1 bg-black/80 backdrop-blur-md rounded-full p-1 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-white/20 z-50"
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation - 45 }); }}
                                    className="p-2 hover:bg-white/20 rounded-full text-white/90 transition-colors group"
                                    title="Rotate Left"
                                >
                                    <RotateCw className="w-3.5 h-3.5 -scale-x-100 group-hover:-rotate-90 transition-transform" />
                                </button>
                                <div className="w-[1px] bg-white/20 my-1" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                                    className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-full transition-colors"
                                    title="Remove"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                                <div className="w-[1px] bg-white/20 my-1" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation + 45 }); }}
                                    className="p-2 hover:bg-white/20 rounded-full text-white/90 transition-colors group"
                                    title="Rotate Right"
                                >
                                    <RotateCw className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}

            {items.length === 0 && isEditable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl max-w-xs">
                        <div className="text-4xl mb-3 animate-bounce">💐</div>
                        <h3 className="text-xl font-serif font-medium text-pink-100 mb-1">Canvas is Empty</h3>
                        <p className="text-white/50 font-light text-sm leading-relaxed">
                            Start dragging your chosen flowers here!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
