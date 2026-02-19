import { BouquetItem, FLOWERS } from "@/lib/flowers";

interface BouquetStemsProps {
    items: BouquetItem[];
}

// Deterministic random number generator based on seed
const getSeededRandom = (seedString: string) => {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    return () => {
        const x = Math.sin(hash++) * 10000;
        return x - Math.floor(x);
    };
};

export const BouquetStems = ({ items }: BouquetStemsProps) => {
    if (items.length === 0) return null;

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="stem-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" /> {/* green-500 */}
                    <stop offset="100%" stopColor="#14532d" /> {/* green-900 */}
                </linearGradient>
            </defs>
            {items.map((item) => {
                const flower = FLOWERS.find((f) => f.id === item.flowerId);
                // Only draw stems for flowers
                if (!flower || flower.category !== 'flower' || flower.noStem) return null;

                const rng = getSeededRandom(item.id + (item.stemBend || 0));
                const stems = [];
                const type = item.stemType || 0;

                // 1. MAIN THICK STEM
                const mainControlX = type === 2 ? item.x : item.x + (item.stemBend || 0) * 0.5;
                stems.push(
                    <path
                        key={`main-${item.id}`}
                        d={`M ${item.x} ${item.y} Q ${mainControlX} 90, 50 105`}
                        fill="none"
                        stroke="url(#stem-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="1"
                        vectorEffect="non-scaling-stroke"
                    />
                );

                // 2. LONG GRASSY STEMS (Varies by type)
                const numLongStems = type === 2 ? 12 : (20 + Math.floor(rng() * 10));
                for (let i = 0; i < numLongStems; i++) {
                    const isMegaLong = rng() > 0.6;
                    const heightOffset = isMegaLong ? -(10 + rng() * 30) : (rng() * 30 - 15);

                    const endX = item.x + (rng() * 60 - 30);
                    const endY = item.y + heightOffset;

                    const curveDir = rng() > 0.5 ? 1 : -1;
                    const baseIntensity = type === 1 ? 40 : (type === 2 ? 5 : 20);
                    const curveIntensity = baseIntensity + rng() * (type === 1 ? 60 : 30);

                    const startX = 50 + (rng() * 20 - 10);
                    const midX = (startX + endX) / 2;
                    const controlX = midX + (curveIntensity * curveDir);
                    const controlY = type === 2 ? 90 : 70;

                    stems.push(
                        <path
                            key={`long-${item.id}-${i}`}
                            d={`M ${endX} ${endY} Q ${controlX} ${controlY}, ${startX} 105`}
                            fill="none"
                            stroke={rng() > 0.6 ? "#14532d" : "#166534"}
                            strokeWidth={rng() > 0.8 ? (3 + rng()) : (0.5 + rng() * 0.5)}
                            strokeLinecap="round"
                            opacity={isMegaLong ? 0.9 : 0.6}
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                }

                // 3. SHORT CURVED LEAVES (Varies by type)
                const numLeaves = type === 2 ? 12 : (20 + Math.floor(rng() * 10));
                for (let i = 0; i < numLeaves; i++) {
                    const t = 0.1 + rng() * 0.8;
                    const stemX = item.x + (50 - item.x) * t;
                    const stemY = item.y + (100 - item.y) * t;

                    const side = rng() > 0.5 ? 1 : -1;
                    const lenBase = type === 1 ? 10 : (type === 2 ? 4 : 5);
                    const len = lenBase + rng() * (type === 1 ? 20 : 10);

                    const leafEndX = stemX + (len * side);
                    const leafEndY = stemY - (rng() * (type === 1 ? 15 : 10));

                    const cpX = stemX + (len * 0.3 * side);
                    const cpY = stemY + (rng() * 5);

                    stems.push(
                        <path
                            key={`leaf-${item.id}-${i}`}
                            d={`M ${stemX} ${stemY} Q ${cpX} ${cpY}, ${leafEndX} ${leafEndY}`}
                            fill="none"
                            stroke={rng() > 0.5 ? "#22c55e" : "#4ade80"}
                            strokeWidth={rng() > 0.8 ? (2 + rng()) : (0.5 + rng())}
                            strokeLinecap="round"
                            opacity="0.75"
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                }

                return <g key={`group-${item.id}`}>{stems}</g>;
            })}
        </svg>
    );
};
