import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';

import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { DollarSign, Shield, Clock, MapPin, Recycle, Leaf, Globe } from 'lucide-react';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './page.module.css';

export const metadata = {
  title: 'Acerca de KONSTANDER - Empresa de Metales y Chatarra',
  description: 'Conoce la historia de KONSTANDER, empresa líder en compra y venta de metales en Lampa. Experiencia, confianza y los mejores precios del mercado.',
};

export default function NosotrosPage() {
  // Organization Schema for Company Information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://comprametales.cl/#organization",
    "name": COMPANY_INFO.name,
    "alternateName": "Konstander SpA",
    "legalName": "Konstander SpA",
    "description": "Empresa líder en compra y venta de metales y chatarra en Lampa, Región Metropolitana. Más de 10 años de experiencia internacional y 3+ años en Chile.",
    "url": "https://comprametales.cl",
    "logo": "https://comprametales.cl/images/logo.png",
    "foundingDate": "2021",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panamericana Norte 17110",
      "addressLocality": "Lampa",
      "addressRegion": "Región Metropolitana",
      "postalCode": "9380000",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY_INFO.coordinates.lat,
      "longitude": COMPANY_INFO.coordinates.lng
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": COMPANY_INFO.phone,
        "contactType": "customer service",
        "availableLanguage": ["Spanish"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      }
    ],
    "email": COMPANY_INFO.email,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Región Metropolitana, Chile"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": COMPANY_INFO.coordinates.lat,
        "longitude": COMPANY_INFO.coordinates.lng
      },
      "geoRadius": "50000" // 50km radius
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Compra de Metales",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Compra de Metales Ferrosos",
            "description": "Compramos fierro, acero y otros metales ferrosos"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Compra de Metales No Ferrosos",
            "description": "Compramos cobre, aluminio, bronce y otros metales no ferrosos"
          }
        }
      ]
    },
    "knowsAbout": ["Reciclaje de Metales", "Compra de Chatarra", "Metales Ferrosos", "Metales No Ferrosos", "Evaluación de Materiales"],
    "award": ["Mejores Precios del Mercado", "Servicio de Calidad"],
    "slogan": "Mejores precios, pago inmediato, servicio confiable"
  };

  return (
    <Layout>
      {/* Organization Schema for Company */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Nosotros', href: '/nosotros' }
        ]}
      />
      
      <div className={styles.heroSection}>
        <PageHero
          title="Acerca de KONSTANDER"
          subtitle="Experiencia y Confianza en Metales"
          description="Somos una empresa familiar con años de experiencia en el rubro de compra y venta de metales, comprometidos con brindar el mejor servicio y los mejores precios del mercado."
          backgroundImage="/images/aboutuspage.webp"
        />
      </div>
      
      <div className={styles.pageContainer}>
        <div className={styles.contentGrid}>
          <div className={styles.contentSection}>
            <h2>Nuestra Historia</h2>
            <div className="content-flow">
              <p>
                <strong>KONSTANDER</strong> es parte de una empresa internacional con más de <strong>10 años de experiencia</strong> en la compra y venta de metales. Hace más de <strong>3 años abrimos nuestra sucursal en Chile</strong>, donde trabajamos con un enfoque cercano, ágil y confiable.
              </p>
              <p>
                Nuestra estructura nos permite ofrecer un <strong>trato directo, rápido y flexible</strong>, adaptándonos a las necesidades de cada cliente. Destacamos por:
              </p>
              <ul className={styles.historyList}>
                <li><strong>Pagos inmediatos</strong> - Recibes tu dinero al instante</li>
                <li><strong>Horarios extendidos</strong> - Abiertos 7 días a la semana</li>
                <li><strong>Pago flexible</strong> - Varias opciones disponibles</li>
                <li><strong>Precios actualizados</strong> - Cotizaciones al día</li>
                <li><strong>Atención personalizada</strong> - Trato profesional y cercano</li>
              </ul>
            </div>
          </div>
          <div className={styles.whyChooseSection}>
            <h3 className={styles.whyChooseTitle}>¿Por qué Elegirnos?</h3>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <DollarSign className="text-primary" size={24} />
                <div>
                  <h4>Mejores Precios</h4>
                  <p>Ofrecemos cotizaciones competitivas y actualizadas todos los días para maximizar el valor de tus metales.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <Shield className="text-primary" size={24} />
                <div>
                  <h4>Trato Honesto</h4>
                  <p>Transparencia total y evaluación justa en cada transacción.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <Clock className="text-primary" size={24} />
                <div>
                  <h4>Experiencia</h4>
                  <p>Más de 10 años de trayectoria internacional y más de 3 años en Chile, con amplio conocimiento en el rubro.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <MapPin className="text-primary" size={24} />
                <div>
                  <h4>Ubicación Estratégica</h4>
                  <p>Fácil acceso en Lampa, conectados con toda la Región Metropolitana.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.missionVisionGrid}>
          <div className={styles.missionVisionCard}>
            <h3>Nuestra Misión</h3>
            <p>
              Brindar un servicio rápido y confiable en la compra y venta de metales en la Región Metropolitana, con precios competitivos, pago al instante y atención personalizada. Impulsamos el reciclaje responsable para cuidar el medio ambiente y apoyar el desarrollo sostenible de nuestra comunidad.
            </p>
          </div>
          <div className={styles.missionVisionCard}>
            <h3>Nuestra Visión</h3>
            <p>
              Ser reconocidos como un referente confiable en la compra y venta de metales y chatarra en Chile, ampliando de forma gradual nuestros servicios y alcance, siempre con un trato cercano y enfocado en el cliente.
            </p>
          </div>
        </div>
        <div className={styles.environmentalSection}>
          <h3 className={styles.environmentalTitle}>Nuestro Compromiso Ambiental</h3>
          <div className={styles.environmentalGrid}>
            <div className={styles.environmentalItem}>
              <div className={styles.environmentalIcon}>
                <Recycle className="text-primary" size={32} />
              </div>
              <h4>Reciclaje</h4>
              <p>
                Contribuimos al reciclaje de metales, evitando que terminen en vertederos
              </p>
            </div>
            <div className={styles.environmentalItem}>
              <div className={styles.environmentalIcon}>
                <Leaf className="text-secondary-dark" size={32} />
              </div>
              <h4>Sostenibilidad</h4>
              <p>
                Promovemos prácticas sostenibles en toda nuestra cadena de operaciones
              </p>
            </div>
            <div className={styles.environmentalItem}>
              <div className={styles.environmentalIcon}>
                <Globe className="text-primary" size={32} />
              </div>
              <h4>Medio Ambiente</h4>
              <p>
                Cada metal reciclado es un paso hacia un planeta más limpio
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <CTASection
        title="Vende tus Metales con Confianza"
        description="Recibe pago al instante, precios competitivos y atención personalizada en un solo lugar."
        actions={[
          {
            type: 'primary',
            text: 'Contáctanos',
            href: '/contacto'
          },
          {
            type: 'secondary',
            text: 'Ver Precios',
            href: '/precios'
          }
        ]}
        backgroundType="gradient"
        alignment="center"
      />
      
      <BackToTop />
    </Layout>
  );
}
