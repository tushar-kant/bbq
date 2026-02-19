import mongoose from "mongoose";

const BouquetSchema = new mongoose.Schema({
    items: [
        {
            id: String,
            flowerId: String,
            x: Number,
            y: Number,
            rotation: Number,
            scale: Number,
        },
    ],
    letter: String,
    theme: { type: String, default: "love" }, // love, birthday
    giftType: { type: String, default: "none" }, // envelope, scratch
    scratchMessage: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bouquet || mongoose.model("Bouquet", BouquetSchema);
