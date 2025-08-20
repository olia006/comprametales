import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { WebVitals } from '@/components/analytics/WebVitals/WebVitals';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary/ErrorBoundary';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Konstander SpA | Compra & Venta de Chatarra',
  description: 'Vende tu chatarra hoy y recibe pago inmediato. Cobre $7.000/kg; fierro $230/kg. Balanza certificada. Abierto 7 días. Lampa, RM.',
  keywords: 'chatarra, metales, hierro, cobre, aluminio, compra metales, Lampa, Chile, KONSTANDER',
  openGraph: {
    title: 'Konstander SpA | Compra & Venta de Chatarra | Lampa, RM',
    description: 'Vende tu chatarra hoy y recibe pago inmediato. Cobre $7.000/kg; fierro $230/kg. Balanza certificada. Abierto 7 días. Lampa, RM.',
    url: 'https://konstander.cl',
    siteName: 'Konstander SpA',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/images/twitter-card.png',
        width: 1200,
        height: 630,
        alt: 'KONSTANDER Chile - Compra de Chatarra y Metales al Mejor Precio en Lampa, Región Metropolitana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '💰 Konstander SpA | Compra & Venta de Chatarra 🇨🇱',
    description: '🔥 Vende tu chatarra hoy y recibe pago inmediato! Cobre $7.000/kg • Fierro $230/kg. Balanza certificada. Abierto 7 días. Lampa, RM. ¡Llamá ya! 📞+56937720208',
    images: ['/images/twitter-card.png'],
    creator: '@konstander_cl',
    site: '@konstander_cl',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=3' },
      { url: '/favicon/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
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
  initialScale: 1
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href="https://konstander.cl" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        

        
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
            
            /* Critical responsive */
            @media (max-width: 768px) {
              .container {
                padding: 0 1rem;
              }
              h1 {
                font-size: 2.25rem;
              }
            }
          `
        }} />
        
        {/* Google Fonts are handled by Next.js font optimization */}
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KRM573BR');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRM573BR"
            height="0"
            width="0"
            className="gtm-noscript"
          />
        </noscript>
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <WebVitals debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}
