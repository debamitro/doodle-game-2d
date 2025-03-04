'use client';

import { useRef, useEffect, useState } from 'react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [shouldCapture, setShouldCapture] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setShouldCapture(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [countdown]);

  useEffect(() => {
    if (shouldCapture && videoRef.current && stream) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg');
        setShouldCapture(false);
        onCapture(imageSrc);
      }
    }
  }, [shouldCapture, stream, onCapture]);

  const startCountdown = () => {
    setCountdown(10);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-comic rounded bg-gray-100 my-3 p-2 text-center w-full">
        Draw your character on white paper, hit &lsquo;Take photo&rsquo;, show it to the camera and wait till the photo is taken 
      </div>
      <div className="flex justify-center w-full relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: '100%', width: '500px', height: '500px' }}
        />
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-fredoka text-6xl text-white bg-purple-600/70 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
              {countdown}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={startCountdown}
          className="font-fredoka px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={countdown > 0}
        >
          {countdown > 0 ? 'Taking photo...' : 'Take Photo'}
        </button>
      </div>
    </div>
  );
}
