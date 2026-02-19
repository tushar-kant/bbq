export const generateBBQName = (prefix?: string) => {
    const girlyWords = ["Sparkle", "Glitter", "Rosé", "Chic", "Flora", "Luna", "Pearl", "Daisy", "Velvet", "Bliss"];
    const bbqWords = ["Grill", "Smoke", "Flame", "Sizzle", "Pit", "Roast", "Char", "Baste", "Rub", "Slab"];

    const randomGirly = girlyWords[Math.floor(Math.random() * girlyWords.length)];
    const randomBBQ = bbqWords[Math.floor(Math.random() * bbqWords.length)];

    const formats = [
        `${randomGirly}'s ${randomBBQ}`,
        `The ${randomGirly} ${randomBBQ}`,
        `${randomBBQ} & ${randomGirly}`,
        `${randomGirly} ${randomBBQ} Co.`,
        `${randomGirly} & ${randomBBQ} BBQ`,
    ];

    return formats[Math.floor(Math.random() * formats.length)];
};
