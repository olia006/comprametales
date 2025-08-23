import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { WebVitals } from '@/components/analytics/WebVitals/WebVitals';
import { GTM } from '@/components/analytics/GTM/GTM';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary/ErrorBoundary';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true, // Preload to fix critical path
  fallback: ['system-ui', 'arial'],
  weight: ['400', '600', '700'], // Only load essential weights
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://comprametales.cl'),
  title: 'Konstander SpA | Compra & Venta de Chatarra',
  description: 'Vende tu chatarra hoy y recibe pago inmediato. Cobre $7.000/kg; fierro $230/kg. Balanza certificada. Abierto 7 días. Lampa, RM.',
  keywords: 'chatarra, metales, fierro, cobre, aluminio, compra metales, Lampa, Chile, KONSTANDER',
  openGraph: {
    title: 'Konstander SpA | Compra & Venta de Chatarra | Lampa, RM',
    description: 'Vende tu chatarra hoy y recibe pago inmediato. Cobre $7.000/kg; fierro $230/kg. Balanza certificada. Abierto 7 días. Lampa, RM.',
    url: 'https://comprametales.cl',
    siteName: 'Konstander SpA',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/images/konstander-chatarra-metales-twittercard.webp?v=5',
        width: 1200,
        height: 474,
        alt: 'KONSTANDER Chile - Compra de Chatarra y Metales al Mejor Precio en Lampa, Región Metropolitana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@konstander_cl',
    creator: '@konstander_cl',
    images: ['/images/konstander-chatarra-metales-twittercard.webp?v=5'],
  },

  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  icons: {
    icon: [
      { url: '/favicon.ico?v=4' },
      { url: '/favicon/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png?v=3', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#4E7A51',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  themeColor: '#4E7A51',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <head>
        <meta charSet="utf-8" />

        <link rel="canonical" href="https://comprametales.cl" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=4" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="https://comprametales.vercel.app" />
        
        {/* Resource hints for critical CSS - simple approach */}
        <link rel="preconnect" href="https://comprametales.vercel.app" crossOrigin="" />
        

        

        
        {/* Critical CSS - Inline to reduce render-blocking and improve LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical base styles */
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            html {
              scroll-behavior: smooth;
              font-size: 16px;
              height: 100%;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #212121;
              background-color: #ffffff;
              min-height: 100vh;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -webkit-tap-highlight-color: transparent;
            }
            
            /* Critical typography */
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-weight: 700;
              line-height: 1.25;
              margin-bottom: 1.5rem;
              color: #212121;
            }
            
            h1 {
              font-size: 3rem;
              font-weight: 800;
              margin-bottom: 2rem;
            }
            
            /* Critical layout */
            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 1rem;
            }
            
            /* Critical button styles */
            button, a {
              font-family: inherit;
            }
            
            /* Critical image styles */
            img {
              max-width: 100%;
              height: auto;
            }
            
            /* Critical focus styles */
            :focus {
              outline: 2px solid #4E7A51;
              outline-offset: 2px;
            }
            
            /* GTM noscript iframe */
            .gtm-noscript {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Critical responsive */
            @media (max-width: 768px) {
              .container {
                padding: 0 1rem;
              }
              h1 {
                font-size: 2.25rem;
              }
            }
            
            /* Scroll reveal animation - inline for immediate loading */
            .scroll-reveal {
              opacity: 0;
              transform: translateY(50px);
              transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                          transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              will-change: opacity, transform;
            }
            
            .scroll-reveal.visible {
              opacity: 1;
              transform: translateY(0);
            }
            
            .scroll-reveal.delay-1 {
              transition-delay: 0.1s;
            }
            
            .scroll-reveal.delay-2 {
              transition-delay: 0.2s;
            }
            
            .scroll-reveal.delay-3 {
              transition-delay: 0.3s;
            }
            
            html:not(.js-enabled) .scroll-reveal {
              opacity: 1;
              transform: translateY(0);
              transition: none;
            }
          `
        }} />
        
        {/* Google Fonts are handled by Next.js font optimization */}
        
        {/* Google Tag Manager - Properly placed in head */}
        <GTM gtmId={process.env.GTM_ID || 'GTM-KRM573BR'} />
      </head>
      <body className={inter.className}>
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <WebVitals debug={false} />
        
        {/* Initialize chunk error handler */}
        <Script id="chunk-error-handler" strategy="afterInteractive">
          {`
            // Chunk Error Handler - Initialize before other scripts
            (function() {
              if (typeof window === 'undefined') return;
              
              let retryCount = new Map();
              const MAX_RETRIES = 2;
              const RETRY_DELAY = 1500;
              
              function isChunkError(error) {
                if (!error) return false;
                const errorMessage = error.message || error.toString();
                const patterns = [
                  /Loading chunk \\d+ failed/i,
                  /ChunkLoadError/i,
                  /Loading CSS chunk \\d+ failed/i,
                  /Failed to import/i,
                  /Unexpected token '<'/i,
                  // React-specific errors that may be chunk-related
                  /Minified React error #425/i,
                  /Minified React error #418/i,
                  /Minified React error #423/i
                ];
                return patterns.some(pattern => pattern.test(errorMessage));
              }
              
              function handleChunkError(error) {
                const errorKey = error.message || 'unknown-chunk-error';
                const currentRetries = retryCount.get(errorKey) || 0;
                
                if (currentRetries >= MAX_RETRIES) {
                  console.warn('[ChunkError] Max retries exceeded, refreshing page');
                  window.location.reload();
                  return;
                }
                
                retryCount.set(errorKey, currentRetries + 1);
                
                setTimeout(() => {
                  console.warn('[ChunkError] Refreshing due to chunk loading failure');
                  window.location.reload();
                }, RETRY_DELAY * (currentRetries + 1));
              }
              
              // Handle unhandled promise rejections
              window.addEventListener('unhandledrejection', function(event) {
                if (isChunkError(event.reason)) {
                  event.preventDefault();
                  handleChunkError(event.reason);
                }
              });
              
              // Handle JavaScript errors
              window.addEventListener('error', function(event) {
                if (isChunkError(event.error)) {
                  event.preventDefault();
                  handleChunkError(event.error);
                }
              });
            })();
          `}
        </Script>
        
        {/* Initialize scroll reveal animations */}
        <Script id="scroll-reveal-init" strategy="afterInteractive">
          {`
            (function() {
              if (typeof document !== 'undefined') {
                document.documentElement.classList.add('js-enabled');
              }
              
              if (!('IntersectionObserver' in window)) {
                const elements = document.querySelectorAll('.scroll-reveal');
                elements.forEach(el => el.classList.add('visible'));
                return;
              }
              
              let observer = null;
              
              function initScrollReveal() {
                // Clean up existing observer
                if (observer) {
                  observer.disconnect();
                }
                
                observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                  }
                );
                
                // Observe all scroll-reveal elements
                const elements = document.querySelectorAll('.scroll-reveal');
                elements.forEach(el => {
                  // Check if element is already in viewport and should be visible immediately
                  const rect = el.getBoundingClientRect();
                  const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                  
                  if (isInViewport) {
                    // If already in viewport, show immediately
                    el.classList.add('visible');
                  } else {
                    // Otherwise, remove visible class and observe
                    el.classList.remove('visible');
                    observer.observe(el);
                  }
                });
              }
              
              // Initial setup
              initScrollReveal();
              
              // Use MutationObserver to detect when new elements are added to DOM
              const mutationObserver = new MutationObserver((mutations) => {
                let shouldReinit = false;
                mutations.forEach((mutation) => {
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                      if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('scroll-reveal')) {
                          shouldReinit = true;
                        } else if (node.querySelectorAll) {
                          const scrollRevealElements = node.querySelectorAll('.scroll-reveal');
                          if (scrollRevealElements.length > 0) {
                            shouldReinit = true;
                          }
                        }
                      }
                    });
                  }
                });
                
                if (shouldReinit) {
                  setTimeout(() => {
                    initScrollReveal();
                  }, 50);
                }
              });
              
              // Start observing DOM changes
              mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
              });
              
              // Also listen for popstate (back/forward navigation)
              window.addEventListener('popstate', () => {
                setTimeout(() => {
                  initScrollReveal();
                }, 100);
              });
              
              // Listen for focus events (when user returns to tab or page)
              window.addEventListener('focus', () => {
                setTimeout(() => {
                  initScrollReveal();
                }, 100);
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
