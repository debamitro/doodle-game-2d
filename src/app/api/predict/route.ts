import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    const prediction = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: image,
          prompt: "a 2d cartoon character with bright colors on a white background",
          prompt_strength: 0.3,
          disable_safety_checker: true
        }
      }
    );

    // The prediction should be an array with the output image URL
    const stream = Array.isArray(prediction) ? prediction[0] : prediction;
    
    // Convert stream to blob
    const response = new Response(stream);
    const blob = await response.blob();

    // Convert blob to base64
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64String}`;

    return NextResponse.json({ 
      imageData: dataUrl
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process the image' },
      { status: 500 }
    );
  }
}
