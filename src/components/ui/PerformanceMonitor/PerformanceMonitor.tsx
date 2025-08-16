'use client';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/utils/tracking';

interface PerformanceMonitorProps {
  pageName: string;
  pageType?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  pageName,
  pageType = 'page'
}) => {
  useEffect(() => {
    // Track page view
    trackPageView(pageName, pageType);

    // Monitor page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      const measurePageLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0;
          
          // Track performance metrics
          if (process.env.NODE_ENV === 'development') {
            console.log('[Performance Monitor]', {
              page: pageName,
              pageLoadTime: Math.round(pageLoadTime),
              domContentLoaded: Math.round(domContentLoaded),
              firstPaint: Math.round(firstPaint),
              timestamp: new Date().toISOString()
            });
          }

          // Send to analytics if page load is slow (> 3 seconds)
          if (pageLoadTime > 3000) {
            if (typeof window !== 'undefined' && window.dataLayer) {
              window.dataLayer.push({
                event: 'slow_page_load',
                page_name: pageName,
                load_time: Math.round(pageLoadTime),
                event_category: 'Performance',
                event_label: 'Slow Load',
                value: Math.round(pageLoadTime)
              });
            }
          }
        }
      };

      // Wait for page to fully load
      if (document.readyState === 'complete') {
        measurePageLoad();
      } else {
        window.addEventListener('load', measurePageLoad);
        return () => window.removeEventListener('load', measurePageLoad);
      }
    }
  }, [pageName, pageType]);

  return null; // This component doesn't render anything
};
