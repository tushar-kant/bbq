import { ThreeRose } from "@/components/ThreeRose";

export default function RosePage() {
    return (
        <div className="w-full h-screen bg-[#120508] relative flex items-center justify-center">
            <h1 className="absolute top-10 text-white font-serif z-10 opacity-50">3D Rose Preview</h1>
            <ThreeRose />
        </div>
    );
}
