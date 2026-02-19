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

    return {
        title: `A Blooms For You | FORU`,
        description: "Someone made a special bouquet just for you. Open to see your surprise! 🌸",
        openGraph: {
            title: "A Special Bouquet For You 🌸",
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
