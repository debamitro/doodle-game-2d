'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlayGame() {
  const router = useRouter();
  const [imageData, setImageData] = useState<string | null>(null);

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
    <main className="flex min-h-screen flex-col justify-center p-24 w-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <div>
        <h1 className="text-4xl font-fredoka font-bold text-purple-600 mb-2 text-center">Doodle Game 2d</h1>
      </div>

      <div className="font-comic rounded bg-gray-100 my-3 p-2 text-center w-full">
          Play with Your Character! Use space to jump
        </div>
        
      <div id="game" className='mx-auto'>
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
            <button id="restart" className="font-fredoka px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Play Again</button>
          </div>
        </div>

        <script async src="/game.js"></script>

        <div className="mt-8 text-center">
          <button 
            onClick={handleNewCharacter}
            className="font-fredoka px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Create New Character
          </button>
        </div>
    </main>
  );
}
