'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Camera from './components/Camera';

export default function Home() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = (imageSrc: string) => {
    setPhoto(imageSrc);
  };

  const handleSubmit = async () => {
    if (!photo) return;

    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: photo }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Store the generated image in sessionStorage
      sessionStorage.setItem('gameCharacter', result.imageData);
      
      // Redirect to the play page without query parameters
      router.push('/play');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process the image. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Create Your Game Character</h1>
        
        <div className="mb-8">
          <Camera onCapture={handleCapture} />
        </div>

        <div className="flex flex-col items-center gap-8">
          {photo && (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold">Your Photo</h2>
              <img src={photo} alt="Original" className="max-w-sm rounded-lg shadow-lg" />
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating Character...' : 'Create Game Character'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
