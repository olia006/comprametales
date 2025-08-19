import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary/ErrorBoundary';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'KONSTANDER - Compra de Chatarra y Metales en Lampa, Chile',
  description: 'Compra y venta de chatarra, hierro, cobre, aluminio y metales en Lampa, Región Metropolitana. Mejores precios, atención de lunes a domingo.',
  keywords: 'chatarra, metales, hierro, cobre, aluminio, compra metales, Lampa, Chile, KONSTANDER',
  openGraph: {
    title: 'KONSTANDER - Compra de Chatarra y Metales',
    description: 'Compra y venta de chatarra y metales en Lampa. Mejores precios del mercado.',
    url: 'https://konstander.cl',
    siteName: 'KONSTANDER',
    locale: 'es_CL',
    type: 'website',
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
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#1e88e5',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e88e5',
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

      </body>
    </html>
  );
}
