'use client';

import { useState } from 'react';
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
    <main className="flex min-h-screen flex-col justify-center p-24 w-screen">
      <div>
        <h1 className="text-4xl font-bold mb-8 text-center">Doodle Game 2d</h1>
      </div>

      {!photo && (
        <div className="mb-8">
          <Camera onCapture={handleCapture} />
        </div>
      )}

      {photo && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold">Your Photo</h2>
          <img src={photo} alt="Original" className="max-w-sm rounded-lg shadow-lg" />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating game...' : 'Play my game'}
          </button>
        </div>
      )}
    </main>
  );
}
