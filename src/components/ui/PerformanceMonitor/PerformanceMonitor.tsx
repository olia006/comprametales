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
    // Track page view only once per page load
    const timeoutId = setTimeout(() => {
      trackPageView(pageName, pageType);
    }, 100); // Small delay to avoid blocking initial render

    // Monitor page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track Cumulative Layout Shift (CLS) - Simplified
      const trackCLS = () => {
        if ('PerformanceObserver' in window) {
          try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  clsValue += (entry as any).value;
                }
              }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
            // Only log once after page load
            setTimeout(() => {
              if (clsValue > 0.1 && process.env.NODE_ENV === 'development') {
                console.log('[Performance Monitor] CLS:', clsValue);
              }
            }, 2000);
            
            return () => clsObserver.disconnect();
          } catch (error) {
            console.warn('[Performance Monitor] CLS tracking failed:', error);
          }
        }
      };

      // Track Largest Contentful Paint (LCP) - Simplified
      const trackLCP = () => {
        if ('PerformanceObserver' in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              
              // Only log once after page load
              setTimeout(() => {
                if (process.env.NODE_ENV === 'development') {
                  console.log('[Performance Monitor] LCP:', Math.round(lastEntry.startTime));
                }
              }, 1000);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            return () => lcpObserver.disconnect();
          } catch (error) {
            console.warn('[Performance Monitor] LCP tracking failed:', error);
          }
        }
      };

      // Track First Input Delay (FID) / Interaction to Next Paint (INP)
      const trackInteractionDelay = () => {
        if ('PerformanceObserver' in window) {
          try {
            const fidObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const fidValue = (entry as any).processingStart - entry.startTime;
                
                if (process.env.NODE_ENV === 'development') {
                  console.log('[Performance Monitor] FID:', fidValue);
                }
                
                if (fidValue > 100) { // FID threshold
                  window.dataLayer?.push({
                    event: 'poor_fid',
                    fid_value: Math.round(fidValue),
                    page_name: pageName,
                    event_category: 'Performance',
                    event_label: 'Poor FID'
                  });
                }
              }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            
            return () => fidObserver.disconnect();
          } catch (error) {
            console.warn('[Performance Monitor] FID tracking failed:', error);
          }
        }
      };

      const measurePageLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0;
          const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
          
          // Track performance metrics
          if (process.env.NODE_ENV === 'development') {
            console.log('[Performance Monitor]', {
              page: pageName,
              pageLoadTime: Math.round(pageLoadTime),
              domContentLoaded: Math.round(domContentLoaded),
              firstPaint: Math.round(firstPaint),
              firstContentfulPaint: Math.round(firstContentfulPaint),
              timestamp: new Date().toISOString()
            });
          }

          // Send to analytics if page load is slow (> 2 seconds)
          if (pageLoadTime > 2000) {
            window.dataLayer?.push({
              event: 'slow_page_load',
              page_name: pageName,
              load_time: Math.round(pageLoadTime),
              event_category: 'Performance',
              event_label: 'Slow Load',
              value: Math.round(pageLoadTime)
            });
          }

          // Track First Contentful Paint
          if (firstContentfulPaint > 1000) {
            window.dataLayer?.push({
              event: 'poor_fcp',
              fcp_value: Math.round(firstContentfulPaint),
              page_name: pageName,
              event_category: 'Performance',
              event_label: 'Poor FCP'
            });
          }
        }
      };

      // Initialize tracking
      const cleanupCLS = trackCLS();
      const cleanupLCP = trackLCP();
      const cleanupFID = trackInteractionDelay();

      // Wait for page to fully load
      if (document.readyState === 'complete') {
        measurePageLoad();
      } else {
        window.addEventListener('load', measurePageLoad);
      }

      return () => {
        clearTimeout(timeoutId);
        cleanupCLS?.();
        cleanupLCP?.();
        cleanupFID?.();
        window.removeEventListener('load', measurePageLoad);
      };
    }

    // Return cleanup for timeout even when performance monitoring is not available
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pageName, pageType]);

  return null; // This component doesn't render anything
};
