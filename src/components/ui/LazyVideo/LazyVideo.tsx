'use client';
import React, { useRef, useEffect, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  preload = 'metadata',
  muted = true,
  loop = true,
  playsInline = true,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === 'undefined') {
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Start playing when in view
          video.play().catch(() => {
            // Handle autoplay restrictions
            console.log('Video autoplay blocked by browser');
          });
        } else {
          setIsInView(false);
          // Pause when out of view
          video.pause();
        }
      },
      {
        threshold: 0.3, // Start when 30% of video is visible
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
