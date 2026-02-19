import { BouquetItem, FLOWERS } from "@/lib/flowers";

interface BouquetWrapperProps {
    items: BouquetItem[];
}

export const BouquetWrapper = ({ items }: BouquetWrapperProps) => {
    // Only show wrapper if there are any flowers or leaves
    const hasFlowers = items.some(i => {
        const f = FLOWERS.find(fl => fl.id === i.flowerId);
        return f && (f.category === 'flower' || f.category === 'leaf');
    });

    if (!hasFlowers) return null;

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 z-20 pointer-events-none select-none">
            <span className="text-6xl filter drop-shadow-xl">🎀</span>
        </div>
    );
};
