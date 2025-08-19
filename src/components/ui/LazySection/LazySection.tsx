'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader/SkeletonLoader';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  skeletonVariant?: 'previewSection' | 'materialCard' | 'priceCard' | 'ctaSection';
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  skeletonVariant = 'previewSection',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only observe once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Fallback: ensure content loads after 2 seconds if intersection fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <SkeletonLoader 
          variant={skeletonVariant} 
          aria-label="Cargando contenido..."
        />
      )}
    </div>
  );
};
