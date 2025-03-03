'use client';

import { useRef, useEffect, useState } from 'react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);  

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL('image/jpeg');
      onCapture(imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="rounded bg-gray-100 my-3 p-2 text-center w-full">
        Draw your character and show it to the camera, then hit 'Take photo'
      </div>
      <div className="flex justify-center w-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: '100%', width: '500px' }}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={capturePhoto}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Take Photo
        </button>
      </div>
    </div>
  );
}
