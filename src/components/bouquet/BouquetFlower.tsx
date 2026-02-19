import { BouquetItem, FLOWERS } from "@/lib/flowers";
import { motion } from "framer-motion";
import { RotateCw, X } from "lucide-react";

interface BouquetFlowerProps {
    item: BouquetItem;
    isSelected: boolean;
    isEditable: boolean;
    onSelect: () => void;
    onUpdate: (id: string, updates: Partial<BouquetItem>) => void;
    onDelete: (id: string) => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export const BouquetFlower = ({
    item,
    isSelected,
    isEditable,
    onSelect,
    onUpdate,
    onDelete,
    containerRef
}: BouquetFlowerProps) => {
    const flower = FLOWERS.find((f) => f.id === item.flowerId);

    if (!flower) return null;

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
                x: 0,
                y: 0
            }}
            whileHover={{ scale: item.scale * 1.05, cursor: isEditable ? "grab" : "default" }}
            whileDrag={{ scale: item.scale * 1.1, cursor: "grabbing" }}
            onDragEnd={(_, info) => {
                if (isEditable && containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const deltaXPercent = (info.offset.x / rect.width) * 100;
                    const deltaYPercent = (info.offset.y / rect.height) * 100;

                    onUpdate(item.id, {
                        x: Math.max(0, Math.min(100, item.x + deltaXPercent)),
                        y: Math.max(0, Math.min(100, item.y + deltaYPercent))
                    });
                }
            }}
            className={`absolute top-0 left-0 touch-none z-10 ${isEditable ? 'pointer-events-auto' : ''}`}
            style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (isEditable) onSelect();
            }}
        >
            {/* Flower Content (Image or Emoji) */}
            {flower.image ? (
                <img
                    src={flower.image}
                    alt={flower.name}
                    className={`w-36 h-36 object-contain filter drop-shadow-2xl select-none transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? 'brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}
                    draggable={false}
                />
            ) : (
                <div className={`text-7xl md:text-8xl filter drop-shadow-2xl select-none transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? 'brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}>
                    {flower.emoji}
                </div>
            )}

            {/* Controls for Selected Item */}
            {isEditable && isSelected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-1 bg-popover/90 backdrop-blur-md rounded-full p-1 shadow-xl border border-border z-50 text-popover-foreground"
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdate(item.id, { rotation: item.rotation - 45 }); }}
                        className="p-2 hover:bg-muted rounded-full transition-colors group"
                        title="Rotate Left"
                    >
                        <RotateCw className="w-3.5 h-3.5 -scale-x-100 group-hover:-rotate-90 transition-transform" />
                    </button>
                    <div className="w-[1px] bg-border my-1" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                        className="p-2 hover:bg-destructive/10 text-destructive hover:text-destructive/80 rounded-full transition-colors"
                        title="Remove"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] bg-border my-1" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdate(item.id, { rotation: item.rotation + 45 }); }}
                        className="p-2 hover:bg-muted rounded-full transition-colors group"
                        title="Rotate Right"
                    >
                        <RotateCw className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};
