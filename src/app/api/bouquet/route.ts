import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bouquet from "@/models/Bouquet"; // Fix: Use default import

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();
        const bouquet = await Bouquet.create(data);
        return NextResponse.json({ id: bouquet._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating bouquet:", error);
        return NextResponse.json({ error: "Failed to create bouquet" }, { status: 500 });
    }
}
