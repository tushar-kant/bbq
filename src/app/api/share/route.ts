import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        const { email, bbqName } = await req.json();

        if (!email || !bbqName) {
            return NextResponse.json({ error: "Missing email or bbqName" }, { status: 400 });
        }

        const html = `
      <div style="font-family: sans-serif; color: #2d1b24; background: #fffafa; padding: 40px; border-radius: 20px;">
        <h1 style="color: #ff85a2;">Sizzling News! ✨</h1>
        <p>A new BBQ persona has been generated for you:</p>
        <div style="font-size: 32px; font-weight: bold; font-style: italic; color: #c2185b; margin: 20px 0;">
          ${bbqName}
        </div>
        <p>Stay Sparkly & Smokey!</p>
        <hr style="border: none; border-top: 1px solid #fce4ec; margin-top: 30px;" />
        <small style="color: #8a6d7a;">Sent via FORU</small>
      </div>
    `;

        const result = await sendEmail(email, "Your New BBQ Persona ✨", html);

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
