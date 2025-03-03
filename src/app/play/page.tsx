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
      
      <div id="game">
        <div id="character">
          <img
            src={imageData}
            alt="Your character"
            width="50"
            height="50"
          />

        </div>
        <div className="ground"></div>
        <div id="score-container">Score: <span id="score">0</span></div>
        <div id="game-over">
          <h1>Game Over!</h1>
          <p>Your score: <span id="final-score">0</span></p>
          <button id="restart">Play Again</button>
        </div>
      </div>

      <script async src="/game.js"></script>

      <div className="mt-8 text-center">
        <p className="text-lg mb-4">Use space to jump</p>
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
