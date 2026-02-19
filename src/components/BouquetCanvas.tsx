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
            className={`relative w-full h-[60vh] md:h-[70vh] glass rounded-3xl overflow-hidden shadow-2xl border border-white/20 floral-gradient/10 ${!isEditable ? 'pointer-events-none' : ''}`}
            onClick={() => setSelectedId(null)}
        >
            {/* Background patterns */}
            <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />

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
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: item.scale,
                            rotate: item.rotation,
                            opacity: 1,
                            x: item.x,
                            y: item.y
                        }}
                        whileHover={{ scale: item.scale * 1.05 }}
                        whileDrag={{ scale: item.scale * 1.1, cursor: "grabbing" }}
                        onDragEnd={(_, info) => {
                            if (isEditable) {
                                updateItem(item.id, {
                                    x: item.x + info.offset.x,
                                    y: item.y + info.offset.y
                                });
                            }
                        }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 touch-none ${isEditable ? 'cursor-grab pointer-events-auto' : ''}`}
                        style={{ x: item.x, y: item.y }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isEditable) setSelectedId(item.id);
                        }}
                    >
                        <div className="text-8xl md:text-9xl filter drop-shadow-lg select-none transform-gpu flower-shadow">
                            {flower.emoji}
                        </div>

                        {/* Controls for Selected Item */}
                        {isEditable && isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur rounded-full p-2 shadow-xl z-50 ring-1 ring-black/5"
                            >
                                <div onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation - 45 }); }} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors" title="Rotate Left">
                                    <RotateCw className="w-5 h-5 text-gray-600 -scale-x-100" />
                                </div>
                                <div onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-2 hover:bg-red-50 text-red-500 rounded-full cursor-pointer transition-colors" title="Remove">
                                    <X className="w-5 h-5" />
                                </div>
                                <div onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation + 45 }); }} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors" title="Rotate Right">
                                    <RotateCw className="w-5 h-5 text-gray-600" />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}

            {items.length === 0 && isEditable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-serif font-bold text-primary mb-4 italic drop-shadow-md">A Message For You</h3>
                        <p className="text-white/90 text-lg font-medium leading-relaxed drop-shadow-sm">
                            Start dragging flowers to create <br /> your bouquet!
                        </p>
                        <div className="mt-6 text-4xl animate-bounce">💌</div>
                    </div>
                </div>
            )}
        </div>
    );
};
