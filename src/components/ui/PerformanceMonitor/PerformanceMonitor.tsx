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
      // Track Cumulative Layout Shift (CLS)
      const trackCLS = () => {
        if ('PerformanceObserver' in window) {
          try {
            const clsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) { // Ignore user-initiated shifts
                  const clsValue = (entry as any).value;
                  
                  if (process.env.NODE_ENV === 'development') {
                    console.log('[Performance Monitor] CLS detected:', clsValue);
                  }
                  
                  if (clsValue > 0.1) { // CLS threshold
                    window.dataLayer?.push({
                      event: 'poor_cls',
                      cls_value: clsValue,
                      page_name: pageName,
                      event_category: 'Performance',
                      event_label: 'Poor CLS'
                    });
                  }
                }
              }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
            return () => clsObserver.disconnect();
          } catch (error) {
            console.warn('[Performance Monitor] CLS tracking failed:', error);
          }
        }
      };

      // Track Largest Contentful Paint (LCP)
      const trackLCP = () => {
        if ('PerformanceObserver' in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              
              if (process.env.NODE_ENV === 'development') {
                console.log('[Performance Monitor] LCP:', lastEntry.startTime);
              }
              
              if (lastEntry.startTime > 2500) { // LCP threshold
                window.dataLayer?.push({
                  event: 'poor_lcp',
                  lcp_value: Math.round(lastEntry.startTime),
                  page_name: pageName,
                  event_category: 'Performance',
                  event_label: 'Poor LCP'
                });
              }
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
        cleanupCLS?.();
        cleanupLCP?.();
        cleanupFID?.();
        window.removeEventListener('load', measurePageLoad);
      };
    }
  }, [pageName, pageType]);

  return null; // This component doesn't render anything
};
