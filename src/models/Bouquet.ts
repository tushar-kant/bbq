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
    giftType: { type: String, default: "none" }, // envelope, scratch, code 
    scratchMessage: String,
    secretCode: String, // Password for locked message

    // Scheduling & Sharing
    recipientName: String,
    recipientEmail: String,
    senderName: String,
    scheduledAt: Date, // If null/undefined, send immediately or is considered "shared manually"
    isSent: { type: Boolean, default: false }, // For tracking scheduled emails

    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bouquet || mongoose.model("Bouquet", BouquetSchema);
