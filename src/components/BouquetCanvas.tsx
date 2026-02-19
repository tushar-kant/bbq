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
            className={`relative w-full h-[50vh] rounded-3xl overflow-hidden shadow-2xl border border-border bg-card/60 backdrop-blur-xl ${!isEditable ? 'pointer-events-none' : ''}`}
            onClick={() => setSelectedId(null)}
        >
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[length:24px_24px] opacity-10 text-muted-foreground pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-pink-500/10 pointer-events-none" />

            {/* Stems Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="stem-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#86efac" /> {/* green-300 */}
                        <stop offset="100%" stopColor="#166534" /> {/* green-800 */}
                    </linearGradient>
                </defs>
                {items.map((item) => {
                    const flower = FLOWERS.find((f) => f.id === item.flowerId);
                    if (!flower || (flower.category !== 'flower' && flower.category !== 'leaf')) return null;

                    // Simple quadratic curve from item position to bottom center
                    // We need to convert % to approximate relative coordinates for path if we want simple strings, 
                    // but since we are in a responsive container, using % in d attribute is tricky without knowing width/height.
                    // HOWEVER, SVG supports percentage coordinates in some contexts, but 'd' path usually needs user units.
                    // A better trick: Use vector-effect="non-scaling-stroke" and use 0-100 coordinate space? 
                    // Or just standard vector math in percentage if viewBox is 0 0 100 100.

                    return (
                        <path
                            key={`stem-${item.id}`}
                            d={`M ${item.x} ${item.y} Q ${item.x} 90, 50 100`}
                            fill="none"
                            stroke="url(#stem-gradient)" // "#4ade80"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            opacity="0.8"
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                })}
            </svg>

            {/* Ribbon at the bunch point */}
            {items.some(i => {
                const f = FLOWERS.find(fl => fl.id === i.flowerId);
                return f && (f.category === 'flower' || f.category === 'leaf');
            }) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 z-20 pointer-events-none select-none">
                        <span className="text-6xl filter drop-shadow-xl">🎀</span>
                    </div>
                )}

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
                            opacity: 1
                        }}
                        whileHover={{ scale: item.scale * 1.05, cursor: isEditable ? "grab" : "default" }}
                        whileDrag={{ scale: item.scale * 1.1, cursor: "grabbing" }}
                        onDragEnd={(_, info) => {
                            if (isEditable && containerRef.current) {
                                // We need to convert pixel delta to percentage delta
                                const rect = containerRef.current.getBoundingClientRect();
                                // info.offset is the drag total distance from start.
                                // BUT, since framer motion modifies the transform during drag, 
                                // and we map state to left/top, 
                                // we need to be careful.
                                // Re-calculating based on drag end is safer if we reset transform?
                                // Actually, 'drag' modifies x/y transform.
                                // When drag ends, we update state (top/left).
                                // We need to reset the transform? 
                                // Usually framer motion handles this if we update the layout props.

                                const deltaXPercent = (info.offset.x / rect.width) * 100;
                                const deltaYPercent = (info.offset.y / rect.height) * 100;

                                updateItem(item.id, {
                                    x: Math.max(0, Math.min(100, item.x + deltaXPercent)),
                                    y: Math.max(0, Math.min(100, item.y + deltaYPercent))
                                });
                            }
                        }}
                        className={`absolute top-0 left-0 touch-none z-10 ${isEditable ? 'pointer-events-auto' : ''}`} // Added z-10
                        style={{
                            // We need to position it using % to match the stem system
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            // Remove generic x/y from transform if we use left/top, 
                            // OR use x/y in px. 
                            // But wait, the previous code used `x: item.x, y: item.y` in animate prop.
                            // If item.x is 50 (percent), animate x=50 means 50px displacement.
                            // This implies the previous code treated x/y as PIXELS or framer motion handled it?
                            // Interface said "percentage".
                            // If it's percentage, we should use `left: ${item.x}%` and `x: '-50%'` to center?
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isEditable) setSelectedId(item.id);
                        }}
                    >
                        {/* Center the emoji on the anchor point */}
                        <div className={`text-7xl md:text-8xl filter drop-shadow-2xl select-none transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? 'brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}>
                            {flower.emoji}
                        </div>

                        {/* Controls for Selected Item */}
                        {isEditable && isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-1 bg-popover/90 backdrop-blur-md rounded-full p-1 shadow-xl border border-border z-50 text-popover-foreground"
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation - 45 }); }}
                                    className="p-2 hover:bg-muted rounded-full transition-colors group"
                                    title="Rotate Left"
                                >
                                    <RotateCw className="w-3.5 h-3.5 -scale-x-100 group-hover:-rotate-90 transition-transform" />
                                </button>
                                <div className="w-[1px] bg-border my-1" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                                    className="p-2 hover:bg-destructive/10 text-destructive hover:text-destructive/80 rounded-full transition-colors"
                                    title="Remove"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                                <div className="w-[1px] bg-border my-1" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); updateItem(item.id, { rotation: item.rotation + 45 }); }}
                                    className="p-2 hover:bg-muted rounded-full transition-colors group"
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
                    <div className="bg-card/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-2xl max-w-xs transition-colors">
                        <div className="text-4xl mb-3 animate-bounce">💐</div>
                        <h3 className="text-xl font-serif font-medium text-foreground mb-1">Canvas is Empty</h3>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
                            Start dragging your chosen flowers here!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
