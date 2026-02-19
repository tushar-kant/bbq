import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Use Pollinations.ai (Free, No API Key required)
        // We construct a URL with the prompt embedded.
        // Enhanced prompt for better results
        const enhancedPrompt = `A professional, high-quality, photorealistic bouquet arrangement containing: ${prompt}. The bouquet is beautifully wrapped in white paper with a ribbon, set against a soft, elegant background. Cinematic lighting, 8k resolution, highly detailed, floral design masterpiece.`;

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(enhancedPrompt);

        // Pollinations URL
        // Random seed added to ensure new image on each request if prompt is same
        const randomSeed = Math.floor(Math.random() * 10000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

        // We can just return this URL. Pollinations generates it on the fly when accessed.
        // However, to ensure it's "ready", we might want to fetch it or just return the URL to the frontend.
        // Returning the URL is fastest. The frontend <img> tag will load it.

        return NextResponse.json({ imageUrl });
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
