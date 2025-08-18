'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader/SkeletonLoader';
import styles from './LazySection.module.css';

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
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after first load to prevent re-triggering
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div 
      ref={sectionRef} 
      className={className}
    >
      {isVisible ? children : (
        <SkeletonLoader 
          variant={skeletonVariant} 
          aria-label="Cargando contenido..."
        />
      )}
    </div>
  );
};
