export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-blue-400 to-purple-500">
      <div>
        <h1 className="text-4xl font-fredoka font-bold text-purple-600 mb-8 text-center">About Doodle Game 2D</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="font-comic rounded bg-gray-100 p-6 space-y-4">
          <p>
            Welcome to Doodle Game 2D - a game which allows a kid to draw the character in a 2-d game
            and then play it
          </p>
          
          <h2 className="font-fredoka text-2xl text-purple-600 mt-6 mb-2">How It Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Draw your character on white paper</li>
            <li>Take a photo using your device&apos;s camera</li>
            <li>Watch as your drawing transforms into a playable game character</li>
            <li>Use the space bar to jump and avoid obstacles</li>
            <li>Try to achieve your highest score!</li>
          </ul>

          <h2 className="font-fredoka text-2xl text-purple-600 mt-6 mb-2">Privacy</h2>
          <p>
            We take privacy seriously and do not store anything on our server. We do not
            collect any information either. 
          </p>

          <h2 className="font-fredoka text-2xl text-purple-600 mt-6 mb-2">AI usage</h2>
          <p>
            We use AI for recognizing the drawing made by a kid, and turning it into a character.
            That&apos;s it. We do not generate any AI images or videos, so this is completely safe for all kids.
          </p>
        </div>
      </div>
    </main>
  )
}
