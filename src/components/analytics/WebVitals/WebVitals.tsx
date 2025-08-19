'use client';
import { useEffect } from 'react';

// Dynamic import for web-vitals to avoid SSR issues
const getWebVitals = async () => {
  const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
  return { onCLS, onINP, onFCP, onLCP, onTTFB };
};

interface WebVitalsProps {
  debug?: boolean;
}

export const WebVitals: React.FC<WebVitalsProps> = ({ debug = false }) => {
  useEffect(() => {
    // Function to send metrics to analytics service
    const sendToAnalytics = (metric: any) => {
      const { name, value, id, delta } = metric;
      
      if (debug) {
        console.log(`[Web Vitals] ${name}:`, {
          value: Math.round(value),
          delta: Math.round(delta),
          id,
          rating: getMetricRating(name, value),
        });
      }

      // Send to Google Analytics 4 (if available)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(value),
          non_interaction: true,
        });
      }

      // Send to custom analytics endpoint (optional)
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            value: Math.round(value),
            id,
            delta: Math.round(delta),
            rating: getMetricRating(name, value),
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch((error) => {
          if (debug) {
            console.error('Failed to send Web Vitals data:', error);
          }
        });
      }
    };

    // Helper function to get metric rating
    const getMetricRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const thresholds: Record<string, [number, number]> = {
        CLS: [0.1, 0.25],
        INP: [200, 500], // Replaced FID with INP
        FCP: [1800, 3000],
        LCP: [2500, 4000],
        TTFB: [800, 1800],
      };

      const [good, poor] = thresholds[name] || [0, 0];
      
      if (value <= good) {
        return 'good';
      }
      if (value <= poor) {
        return 'needs-improvement';
      }
      return 'poor';
    };

    // Initialize web vitals monitoring
    const initWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await getWebVitals();
        
        // Collect all Core Web Vitals
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics); // Replaced FID with INP
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);

        if (debug) {
          console.log('[Web Vitals] Monitoring initialized');
        }
      } catch (error) {
        if (debug) {
          console.error('[Web Vitals] Failed to initialize:', error);
        }
      }
    };

    initWebVitals();
  }, [debug]);

  return null; // This component doesn't render anything
};

// Hook for manual Web Vitals reporting
// eslint-disable-next-line no-unused-vars
export const useWebVitals = (callback?: (metric: any) => void) => {
  useEffect(() => {
    if (!callback) {
      return;
    }

    const initHook = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await getWebVitals();
        onCLS(callback);
        onINP(callback); // Replaced FID with INP
        onFCP(callback);
        onLCP(callback);
        onTTFB(callback);
      } catch (error) {
        console.error('[Web Vitals Hook] Failed to initialize:', error);
      }
    };

    initHook();
  }, [callback]);
};


