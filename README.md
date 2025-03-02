# Camera App with Replicate API

This Next.js application allows you to take photos using your device's camera and process them using the Replicate API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your Replicate API token:
```
REPLICATE_API_TOKEN=your_api_token_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Camera access using the device's webcam
- Photo capture functionality
- Integration with Replicate API for image processing
- Real-time display of processing results

## Technologies Used

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Replicate API

## Note

Make sure to replace the Replicate model ID in `app/api/predict/route.ts` with your desired model. The current example uses a stable diffusion model.
