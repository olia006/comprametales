'use client';
import { useEffect } from 'react';
import { ClientOnly } from '@/components/ui/ClientOnly/ClientOnly';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Simple web vitals implementation that doesn't rely on dynamic imports
const createWebVitalsFallback = () => {
  if (!isBrowser) {
    return null;
  }

  // Basic performance monitoring without external dependencies
  const getPerformanceMetrics = () => {
    if (!window.performance) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) {
      return null;
    }

    return {
      TTFB: navigation.responseStart - navigation.requestStart,
      FCP: 0, // Would need to be measured separately
      LCP: 0, // Would need to be measured separately
      CLS: 0, // Would need to be measured separately
      INP: 0, // Would need to be measured separately
    };
  };

  return {
    // eslint-disable-next-line no-unused-vars
    onTTFB: (callback: (metric: any) => void) => {
      if (!isBrowser) {
        return;
      }
      
      const sendTTFB = () => {
        const metrics = getPerformanceMetrics();
        if (metrics && metrics.TTFB > 0) {
          callback({
            name: 'TTFB',
            value: metrics.TTFB,
            id: 'ttfb-' + Date.now(),
            delta: metrics.TTFB,
          });
        }
      };

      // Send TTFB after page load
      if (document.readyState === 'complete') {
        sendTTFB();
      } else {
        window.addEventListener('load', sendTTFB);
      }
    },
    // eslint-disable-next-line no-unused-vars
    onFCP: (callback: (metric: any) => void) => {
      if (!isBrowser) {
        return;
      }
      
      // Simple FCP detection
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            callback({
              name: 'FCP',
              value: entry.startTime,
              id: 'fcp-' + Date.now(),
              delta: entry.startTime,
            });
            observer.disconnect();
            break;
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('[Web Vitals] PerformanceObserver not supported');
      }
    },
    // eslint-disable-next-line no-unused-vars
    onLCP: (callback: (metric: any) => void) => {
      if (!isBrowser) {
        return;
      }
      
      // Simple LCP detection
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            callback({
              name: 'LCP',
              value: entry.startTime,
              id: 'lcp-' + Date.now(),
              delta: entry.startTime,
            });
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('[Web Vitals] PerformanceObserver not supported for LCP');
      }
    },
    // eslint-disable-next-line no-unused-vars
    onCLS: (callback: (metric: any) => void) => {
      if (!isBrowser) {
        return;
      }
      
      let clsValue = 0;
      const clsEntries: any[] = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Report CLS on page unload
        window.addEventListener('beforeunload', () => {
          if (clsValue > 0) {
            callback({
              name: 'CLS',
              value: clsValue,
              id: 'cls-' + Date.now(),
              delta: clsValue,
            });
          }
        });
      } catch (error) {
        console.warn('[Web Vitals] PerformanceObserver not supported for CLS');
      }
    },
    // eslint-disable-next-line no-unused-vars
    onINP: (callback: (metric: any) => void) => {
      if (!isBrowser) {
        return;
      }
      
      // Simple INP detection (basic implementation)
      let interactionCount = 0;
      let totalInteractionTime = 0;
      
      const handleInteraction = () => {
        const startTime = performance.now();
        
        const handleEnd = () => {
          const duration = performance.now() - startTime;
          totalInteractionTime += duration;
          interactionCount++;
          
          if (interactionCount >= 10) { // Report after 10 interactions
            const avgInteractionTime = totalInteractionTime / interactionCount;
            callback({
              name: 'INP',
              value: avgInteractionTime,
              id: 'inp-' + Date.now(),
              delta: avgInteractionTime,
            });
            
            // Reset for next batch
            interactionCount = 0;
            totalInteractionTime = 0;
          }
        };
        
        // Listen for the end of the interaction
        setTimeout(handleEnd, 0);
      };
      
      // Listen for user interactions
      ['click', 'keydown', 'mousedown', 'pointerdown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, handleInteraction, { passive: true });
      });
    },
  };
};

// Dynamic import for web-vitals with fallback and retry logic
const getWebVitals = async (retryCount = 0) => {
  if (!isBrowser) {
    return null;
  }

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  try {
    // Try to import web-vitals with retry logic
    const webVitalsModule = await import('web-vitals');
    
    // Validate module structure more thoroughly
    if (webVitalsModule && typeof webVitalsModule === 'object') {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = webVitalsModule;
      
      // Check if all functions are available and are actually functions
      const functions = { onCLS, onINP, onFCP, onLCP, onTTFB };
      const allFunctionsValid = Object.values(functions).every(fn => typeof fn === 'function');
      
      if (allFunctionsValid) {
        return functions;
      } else {
        console.warn('[Web Vitals] Some functions are not available:', 
          Object.entries(functions).filter(([, fn]) => typeof fn !== 'function').map(([name]) => name)
        );
      }
    } else {
      console.warn('[Web Vitals] Invalid module structure:', typeof webVitalsModule);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Check if this is a chunk loading error
    const isChunkError = /Loading chunk|ChunkLoadError|Failed to import/i.test(errorMessage);
    
    if (isChunkError && retryCount < MAX_RETRIES) {
      console.warn(`[Web Vitals] Chunk loading failed, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
      
      // Retry the import
      return getWebVitals(retryCount + 1);
    }
    
    console.warn('[Web Vitals] Failed to import web-vitals, using fallback:', error);
  }

  // Use fallback implementation
  return createWebVitalsFallback();
};

interface WebVitalsProps {
  debug?: boolean;
}

// Helper function to get metric rating
const getMetricRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    INP: [200, 500],
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

const WebVitalsInner: React.FC<WebVitalsProps> = ({ debug = false }) => {
  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    // Function to send metrics to analytics service
    const sendToAnalytics = (metric: any) => {
      if (!metric || typeof metric !== 'object') {
        return;
      }

      const { name, value, id, delta } = metric;
      
      if (debug) {
        console.log(`[Web Vitals] ${name}:`, {
          value: Math.round(value),
          delta: Math.round(delta),
          id,
          rating: getMetricRating(name, value),
        });
      }

      // Send to Google Analytics via GTM dataLayer
      if (typeof window !== 'undefined' && window.dataLayer) {
        try {
          window.dataLayer.push({
            event: 'web_vital',
            web_vital_name: name,
            web_vital_value: Math.round(value),
            web_vital_id: id,
            web_vital_rating: getMetricRating(name, value),
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(value),
            non_interaction: true,
          });
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to send to GTM dataLayer:', error);
          }
        }
      }

      // Note: Web Vitals data is sent to Google Analytics via GTM dataLayer above
      // No backend API needed for static sites
    };



    // Initialize web vitals monitoring
    const initWebVitals = async () => {
      try {
        const webVitals = await getWebVitals();
        
        if (!webVitals) {
          if (debug) {
            console.warn('[Web Vitals] Web Vitals library not available');
          }
          return;
        }
        
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = webVitals;
        
        // Initialize each metric with error handling
        try {
          onCLS(sendToAnalytics);
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to initialize CLS:', error);
          }
        }

        try {
          onINP(sendToAnalytics);
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to initialize INP:', error);
          }
        }

        try {
          onFCP(sendToAnalytics);
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to initialize FCP:', error);
          }
        }

        try {
          onLCP(sendToAnalytics);
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to initialize LCP:', error);
          }
        }

        try {
          onTTFB(sendToAnalytics);
        } catch (error) {
          if (debug) {
            console.error('[Web Vitals] Failed to initialize TTFB:', error);
          }
        }

        if (debug) {
          console.log('[Web Vitals] Monitoring initialized successfully');
        }
      } catch (error) {
        if (debug) {
          console.error('[Web Vitals] Failed to initialize:', error);
        }
      }
    };

    // Initialize with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initWebVitals();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [debug]);

  return null; // This component doesn't render anything
};

export const WebVitals: React.FC<WebVitalsProps> = (props) => {
  return (
    <ClientOnly>
      <WebVitalsInner {...props} />
    </ClientOnly>
  );
};

// Hook for manual Web Vitals reporting
// eslint-disable-next-line no-unused-vars
export const useWebVitals = (callback?: (metric: any) => void) => {
  useEffect(() => {
    if (!callback || !isBrowser) {
      return;
    }

    const initHook = async () => {
      try {
        const webVitals = await getWebVitals();
        
        if (!webVitals) {
          console.warn('[Web Vitals Hook] Web Vitals library not available');
          return;
        }
        
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = webVitals;
        
        // Initialize each metric with error handling
        try {
          onCLS(callback);
        } catch (error) {
          console.error('[Web Vitals Hook] Failed to initialize CLS:', error);
        }

        try {
          onINP(callback);
        } catch (error) {
          console.error('[Web Vitals Hook] Failed to initialize INP:', error);
        }

        try {
          onFCP(callback);
        } catch (error) {
          console.error('[Web Vitals Hook] Failed to initialize FCP:', error);
        }

        try {
          onLCP(callback);
        } catch (error) {
          console.error('[Web Vitals Hook] Failed to initialize LCP:', error);
        }

        try {
          onTTFB(callback);
        } catch (error) {
          console.error('[Web Vitals Hook] Failed to initialize TTFB:', error);
        }
      } catch (error) {
        console.error('[Web Vitals Hook] Failed to initialize:', error);
      }
    };

    const timer = setTimeout(() => {
      initHook();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- callback dependency would cause infinite re-renders
};


