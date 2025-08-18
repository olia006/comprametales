import React from 'react';
import Head from 'next/head';
import { COMPANY_INFO } from '@/config/pricing';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  structuredData?: object;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  keywords = 'chatarra, metales, compra chatarra, hierro, cobre, aluminio, Lampa, Chile, KONSTANDER, reciclaje metales',
  ogImage = '/images/herosection.webp',
  ogType = 'website',
  structuredData,
  noIndex = false,
}) => {
  // Default structured data for the business
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://konstander.cl/#business',
    name: 'KONSTANDER',
    description: 'Compra y venta de chatarra y metales en Lampa, Región Metropolitana. Mejores precios del mercado.',
    url: 'https://konstander.cl',
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Panamericana Norte 17110',
      addressLocality: 'Lampa',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.coordinates.lat,
      longitude: COMPANY_INFO.coordinates.lng
    },
    openingHours: 'Mo-Su 08:00-18:00',
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: 'Región Metropolitana, Chile'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Compra de Metales',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compra de Hierro y Acero',
            description: 'Compra de materiales ferrosos a los mejores precios'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compra de Cobre',
            description: 'Compra de cobre limpio y cables de cobre'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compra de Aluminio',
            description: 'Compra de aluminio limpio y perfiles de aluminio'
          }
        }
      ]
    },
    areaServed: [
      'Lampa',
      'Santiago',
      'Región Metropolitana',
      'Chile'
    ],
    sameAs: [
      'https://www.facebook.com/compra.chatarra.konstander/',
      'https://www.instagram.com/konstander.spa/'
    ],
    keywords: 'compra chatarra, metales, hierro, cobre, aluminio, reciclaje',
    priceRange: '$$$',
    currenciesAccepted: 'CLP',
    paymentAccepted: 'Cash, Bank Transfer'
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="KONSTANDER" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="es_CL" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Business Specific */}
      <meta name="geo.region" content="CL-RM" />
      <meta name="geo.placename" content="Lampa" />
      <meta name="geo.position" content={`${COMPANY_INFO.coordinates.lat};${COMPANY_INFO.coordinates.lng}`} />
      <meta name="ICBM" content={`${COMPANY_INFO.coordinates.lat}, ${COMPANY_INFO.coordinates.lng}`} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData, null, 2)
        }}
      />
      
      {/* Additional Meta for Chilean Market */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-title" content="KONSTANDER" />
      <meta name="application-name" content="KONSTANDER" />
      <meta name="msapplication-TileColor" content="#1e88e5" />
      
      {/* Hreflang for Chilean Spanish */}
      <link rel="alternate" hrefLang="es-cl" href={canonical} />
      <link rel="alternate" hrefLang="es" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Head>
  );
};
