import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bouquet from "@/models/Bouquet";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        // Ensure scheduledAt is null if empty string
        if (data.scheduledAt === "") data.scheduledAt = null;

        const bouquet = await Bouquet.create(data);

        // Send Email Immediate if not scheduled
        if (data.recipientEmail && !data.scheduledAt) {
            const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/share/${bouquet._id}`;
            const html = `
                <div style="font-family: serif; color: #4a0418; padding: 20px; text-align: center; background-color: #fff0f5;">
                    <h1 style="color: #ff6b9d;">A Bouquet for ${data.recipientName || 'You'}</h1>
                    <p style="font-size: 18px;">${data.senderName || 'Someone'} has created a special digital bouquet just for you! 🌸</p>
                    <a href="${shareUrl}" style="display: inline-block; padding: 15px 30px; background-color: #ff6b9d; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 20px;">
                        View Your Gift 🎁
                    </a>
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">Sent with love via FORU</p>
                </div>
             `;

            await sendEmail(data.recipientEmail, `A Surprise from ${data.senderName || 'Someone'}! 🌸`, html);

            // Update isSent flag
            bouquet.isSent = true;
            await bouquet.save();
        }

        return NextResponse.json({ id: bouquet._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating bouquet:", error);
        return NextResponse.json({ error: "Failed to create bouquet" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const bouquet = await Bouquet.findById(id).lean();
            if (!bouquet) {
                return NextResponse.json({ error: "Bouquet not found" }, { status: 404 });
            }
            return NextResponse.json(bouquet);
        }

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "15");
        const skip = (page - 1) * limit;

        const [bouquets, total] = await Promise.all([
            Bouquet.find({ type: 'bouquet', "items.0": { $exists: true } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Bouquet.countDocuments({ type: 'bouquet', "items.0": { $exists: true } })
        ]);

        return NextResponse.json({
            bouquets,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasMore: skip + bouquets.length < total
        });
    } catch (error) {
        console.error("Error fetching bouquets:", error);
        return NextResponse.json({ error: "Failed to fetch bouquets" }, { status: 500 });
    }
}


