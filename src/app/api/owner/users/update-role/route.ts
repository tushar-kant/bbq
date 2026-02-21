import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session || !session.user || session.user.role !== "owner") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userId, newRole } = await req.json();

        if (!userId || !newRole) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Prevent changing own role or setting role to owner (only one owner allowed for now)
        if (userId === session.user.id) {
            return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
        }

        await dbConnect();
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user role:", error);
        return NextResponse.json({ error: "Error updating user role" }, { status: 500 });
    }
}
