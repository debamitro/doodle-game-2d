'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PlayGame() {
  const router = useRouter();
  const [imageData, setImageData] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Get the character image from sessionStorage
    const storedCharacter = sessionStorage.getItem('gameCharacter');
    if (storedCharacter) {
      setImageData(storedCharacter);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const step = 10;
    switch (e.key) {
      case 'ArrowUp':
        setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
        break;
      case 'ArrowDown':
        setPosition(prev => ({ ...prev, y: Math.min(90, prev.y + step) }));
        break;
      case 'ArrowLeft':
        setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
        break;
      case 'ArrowRight':
        setPosition(prev => ({ ...prev, x: Math.min(90, prev.x + step) }));
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNewCharacter = () => {
    // Clear the character from sessionStorage when creating a new one
    sessionStorage.removeItem('gameCharacter');
    router.push('/');
  };

  if (!imageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl mb-4">No character found! Please create one first.</p>
        <button 
          onClick={handleNewCharacter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create Character
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Play with Your Character!</h1>
      
      <div className="relative w-[800px] h-[600px] bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
        <div
          className="absolute transition-all duration-200 ease-in-out"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`
          }}
        >
          <img 
            src={imageData} 
            alt="Your character" 
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg mb-4">Use arrow keys to move your character!</p>
        <button 
          onClick={handleNewCharacter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create New Character
        </button>
      </div>
    </div>
  );
}
