import { BouquetItem, FLOWERS } from "@/lib/flowers";

interface BouquetStemsProps {
    items: BouquetItem[];
}

export const BouquetStems = ({ items }: BouquetStemsProps) => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="stem-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" /> {/* green-300 */}
                    <stop offset="100%" stopColor="#166534" /> {/* green-800 */}
                </linearGradient>
            </defs>
            {items.map((item) => {
                const flower = FLOWERS.find((f) => f.id === item.flowerId);
                // Only draw stems for flowers (not leaves or custom no-stem flowers)
                if (!flower || flower.category !== 'flower' || flower.noStem) return null;

                return (
                    <path
                        key={`stem-${item.id}`}
                        d={`M ${item.x} ${item.y} Q ${item.x} 90, 50 100`}
                        fill="none"
                        stroke="url(#stem-gradient)"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        opacity="0.8"
                        vectorEffect="non-scaling-stroke"
                    />
                );
            })}
        </svg>
    );
};
