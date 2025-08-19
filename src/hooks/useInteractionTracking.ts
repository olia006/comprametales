import { useCallback } from 'react';

interface InteractionTrackingOptions {
  pageName?: string;
  threshold?: number; // milliseconds
}

export const useInteractionTracking = (options: InteractionTrackingOptions = {}) => {
  const { pageName = 'unknown', threshold = 100 } = options;

  const trackInteraction = useCallback((action: string, element: string) => {
    const startTime = performance.now();
    
    // Use setTimeout with 0 delay instead of requestAnimationFrame for better performance
    setTimeout(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Interaction Tracking] ${action} on ${element}: ${Math.round(duration)}ms`);
      }
      
      if (duration > threshold) {
        // Track slow interactions
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'slow_interaction',
            interaction_type: action,
            element_type: element,
            duration: Math.round(duration),
            page_name: pageName,
            event_category: 'Performance',
            event_label: 'Slow Interaction'
          });
        }
      }
    }, 0);
  }, [pageName, threshold]);

  const trackClick = useCallback((element: string) => {
    trackInteraction('click', element);
  }, [trackInteraction]);

  const trackHover = useCallback((element: string) => {
    trackInteraction('hover', element);
  }, [trackInteraction]);

  const trackFocus = useCallback((element: string) => {
    trackInteraction('focus', element);
  }, [trackInteraction]);

  return {
    trackInteraction,
    trackClick,
    trackHover,
    trackFocus
  };
};
