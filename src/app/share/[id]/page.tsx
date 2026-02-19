import { SharedBouquetView } from "@/components/SharedBouquetView";
import dbConnect from "@/lib/mongodb";
import Bouquet from "@/models/Bouquet"; // Fix: Use default import
import { notFound } from "next/navigation";
import { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    let recipient = "You";
    try {
        await dbConnect();
        const bouquet = await Bouquet.findById(id).select('recipientName').lean();
        if (bouquet?.recipientName) recipient = bouquet.recipientName;
    } catch (e) { }

    return {
        title: `A Gift for ${recipient} | FORU`,
        description: `${recipient}, someone made a special bouquet just for you. Open to see your surprise! 🌸`,
        openGraph: {
            title: `A Special Bouquet for ${recipient} 🌸`,
            description: "Tap to reveal your floral surprise & heartfelt message.",
            images: ["/og-bouquet.png"], // Placeholder
        }
    };
}

export default async function SharedPage({ params }: Props) {
    const { id } = await params;

    try {
        await dbConnect();
        const bouquet = await Bouquet.findById(id).lean();

        if (!bouquet) {
            notFound();
        }

        // Serialize MongoDB object to plain JSON
        const data = JSON.parse(JSON.stringify(bouquet));

        return <SharedBouquetView data={data} />;
    } catch (error) {
        console.error("Error fetching bouquet:", error);
        notFound();
    }
}
