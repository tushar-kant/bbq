"use client";

import { BouquetItem } from "@/lib/flowers";
import { useState, useRef } from "react";

import { BouquetStems } from "./bouquet/BouquetStems";
import { BouquetWrapper } from "./bouquet/BouquetWrapper";
import { BouquetFlower } from "./bouquet/BouquetFlower";

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
            <BouquetStems items={items} />

            {/* Wrapper/Ribbon */}
            <BouquetWrapper items={items} />

            {/* Flowers Layer */}
            {items.map((item) => (
                <BouquetFlower
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    isEditable={isEditable}
                    onSelect={() => setSelectedId(item.id)}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                    containerRef={containerRef}
                />
            ))}

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

