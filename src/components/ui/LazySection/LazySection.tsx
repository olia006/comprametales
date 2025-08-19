'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader/SkeletonLoader';
// import styles from './LazySection.module.css';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  skeletonVariant?: 'previewSection' | 'materialCard' | 'priceCard' | 'ctaSection';
  minLoadTime?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '100px', // More conservative margin
  className = '',
  skeletonVariant = 'previewSection',
  minLoadTime = 400, // Reduced minimum load time
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setIsIntersecting(true);
      setIsLoading(true);
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Show content after minimum load time
      timerRef.current = setTimeout(() => {
        setShowContent(true);
        setIsLoading(false);
      }, minLoadTime);
    }
  }, [minLoadTime]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    // Fallback timer to ensure content loads even if intersection fails
    fallbackTimerRef.current = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        console.warn('LazySection fallback triggered - forcing content load');
        hasTriggeredRef.current = true;
        setIsIntersecting(true);
        setShowContent(true);
      }
    }, 3000); // 3 second fallback

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  // Handle component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const shouldShowSkeleton = !showContent && (isIntersecting || isLoading);
  const shouldShowContent = showContent && isIntersecting;

  return (
    <div 
      ref={sectionRef} 
      className={className}
      style={{ minHeight: shouldShowSkeleton ? 'auto' : undefined }}
    >
      {shouldShowContent ? (
        children
      ) : shouldShowSkeleton ? (
        <SkeletonLoader 
          variant={skeletonVariant} 
          aria-label="Cargando contenido..."
        />
      ) : null}
    </div>
  );
};
