import React from 'react';
import { COMPANY_INFO } from '@/config/pricing';

interface ImageSchemaProps {
  images: Array<{
    url: string;
    alt: string;
    width?: number;
    height?: number;
    caption?: string;
  }>;
}

export const ImageSchema: React.FC<ImageSchemaProps> = ({ images }) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: images.map((image, index) => ({
      '@type': 'ImageObject',
      position: index + 1,
      contentUrl: `https://comprametales.cl${image.url}`,
      url: `https://comprametales.cl${image.url}`,
      name: image.alt,
      alternateName: image.caption || image.alt,
      description: image.alt,
      width: image.width || 800,
      height: image.height || 600,
      encodingFormat: 'image/webp',
      contentLocation: {
        '@type': 'Place',
        name: 'KONSTANDER SpA',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Panamericana Norte 17110',
          addressLocality: 'Lampa',
          addressRegion: 'Región Metropolitana',
          addressCountry: 'CL',
          postalCode: '9380000'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMPANY_INFO.coordinates.lat,
          longitude: COMPANY_INFO.coordinates.lng
        }
      },
      locationCreated: {
        '@type': 'Place',
        name: 'KONSTANDER SpA - Planta Industrial',
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
        }
      },
      creator: {
        '@type': 'Organization',
        name: 'KONSTANDER SpA',
        url: 'https://comprametales.cl',
        logo: 'https://comprametales.cl/images/logo-konstander-compra-chatarra-lampa-santiago.webp'
      },
      copyrightHolder: {
        '@type': 'Organization',
        name: 'KONSTANDER SpA',
        url: 'https://comprametales.cl'
      },
      license: 'https://comprametales.cl/terminos',
      acquireLicensePage: 'https://comprametales.cl/contacto',
      creditText: 'KONSTANDER SpA - Compra de Chatarra y Metales',
      keywords: [
        'chatarra',
        'metales reciclados',
        'fierro',
        'cobre',
        'aluminio',
        'Lampa',
        'Santiago',
        'KONSTANDER',
        'reciclaje'
      ]
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
};

export default ImageSchema;
