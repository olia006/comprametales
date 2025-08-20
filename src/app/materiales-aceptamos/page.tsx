import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { MaterialGrid } from '@/components/content/MaterialGrid/MaterialGrid';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { getPricesByCategory, PRICING_CONFIG, COMPANY_INFO } from '@/config/pricing';
import styles from './page.module.css';

export const metadata = {
  title: 'Compramos Chatarra y Metales - Cobre, Fierro, Aluminio - KONSTANDER Lampa',
  description: '💰 Compramos chatarra y metales al mejor precio en Lampa: cobre $7,500/kg, fierro $450/kg, aluminio $2,800/kg. Pago inmediato, balanza certificada. ¡Llama +56937720208!',
  keywords: 'compra chatarra, venta metales, cobre precio, fierro chatarra, aluminio reciclaje, Lampa, Santiago, KONSTANDER, mejores precios metales',
};

export default function MaterialesAceptamosPage() {
  const ferrosoMaterials = getPricesByCategory('ferrosos');
  const noFerrosoMaterials = getPricesByCategory('no-ferrosos');
  const especialesMaterials = getPricesByCategory('especiales');

  // Generate Product Schema for all materials we buy
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": PRICING_CONFIG.map(material => ({
      "@type": "Product",
      "@id": `https://comprametales.cl/materiales-aceptamos#${material.name.toLowerCase().replace(/\s+/g, '-')}`,
      "name": material.nameEs,
      "description": material.description || `Compramos ${material.nameEs.toLowerCase()} al mejor precio del mercado`,
      "category": material.category === 'ferrosos' ? 'Metales Ferrosos' : 
                 material.category === 'no-ferrosos' ? 'Metales No Ferrosos' : 'Metales Especiales',
      "offers": {
        "@type": "Offer",
        "price": material.pricePerKg.toString(),
        "priceCurrency": material.currency,
        "availability": material.pricePerKg > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        "priceValidUntil": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        "seller": {
          "@type": "Organization",
          "name": COMPANY_INFO.name,
          "telephone": COMPANY_INFO.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Panamericana Norte 17110",
            "addressLocality": "Lampa",
            "addressRegion": "Región Metropolitana",
            "addressCountry": "CL"
          }
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "KONSTANDER"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Reciclado"
      }
    }))
  };

  return (
    <Layout>
      {/* Product Schema for Materials We Buy */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Materiales que Aceptamos', href: '/materiales-aceptamos' }
        ]}
      />
      
      <PageHero
        title="Materiales que Aceptamos"
        subtitle="Compramos Todo Tipo de Metales"
        description="En KONSTANDER compramos todo tipo de metales: desde chatarra común hasta materiales especializados. Pagamos al tiro y siempre con los mejores precios del mercado para cobre, fierro, aluminio, bronce y más."
        backgroundImage="/images/aceptamospage.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentSections}>
          <MaterialGrid
            title="Materiales Ferrosos"
            subtitle="Metales que contienen fierro"
            description="Aceptamos todo tipo de materiales ferrosos en cualquier estado. Desde chatarra doméstica hasta estructuras industriales."
            materials={ferrosoMaterials}
            images={{
              'Iron Mixed': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-mixto.webp',
              'Cast Iron': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-fundido.webp',
              'Iron Long': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-largo.webp',
              'Iron Short': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-corto.webp',
              'Iron Turnings': '/images/MaterialesqueAceptamos/MaterialesFerrosos/viruta.webp',
              'Tinplate Steel': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-lata.webp'
            }}
            examples={[
              'Vigas y estructuras metálicas',
              'Tubos y cañerías de fierro',
              'Chatarra de automóviles',
              'Electrodomésticos viejos',
              'Herramientas en desuso',
              'Rejas y portones'
            ]}
          />
          
          <MaterialGrid
            title="Materiales No Ferrosos"
            subtitle="Metales sin contenido de fierro"
            description="Los metales no ferrosos tienen mayor valor debido a sus propiedades especiales y su resistencia a la corrosión."
            materials={noFerrosoMaterials}
            examples={[
              'Tuberías de cobre',
              'Radiadores de automóviles',
              'Perfiles de ventanas de aluminio',
              'Grifería de latón',
              'Estatuas y ornamentos de bronce',
              'Monedas antiguas'
            ]}
          />
          
          <MaterialGrid
            title="Materiales Especiales"
            subtitle="Aleaciones y metales especializados"
            description="Metales con características especiales que requieren procesamiento específico y tienen alto valor comercial."
            materials={especialesMaterials}
            examples={[
              'Ollas y utensilios de acero inoxidable',
              'Equipos médicos en desuso',
              'Baterías de automóviles',
              'Equipos electrónicos',
              'Soldaduras de plomo',
              'Contrapesos de ruedas'
            ]}
          />
          
          <div className={styles.requirementsSection}>
            <h2 className={styles.requirementsTitle}>Requisitos Generales</h2>
            <div className={styles.requirementsGrid}>
              <div>
                <h3>Materiales que Aceptamos:</h3>
                <div className={styles.requirementsList}>
                  <div>✓ Metales ferrosos y no ferrosos</div>
                  <div>✓ Chatarra doméstica e industrial</div>
                  <div>✓ Estructuras metálicas desmontadas</div>
                  <div>✓ Radiadores, motores y componentes metálicos</div>
                  <div>✓ Material limpio y clasificado</div>
                  <div>✓ No hay mínimo de entrega</div>
                </div>
              </div>
              <div>
                <h3>Materiales que No Aceptamos:</h3>
                <div className={styles.requirementsList}>
                  <div>✗ Materiales contaminados con químicos</div>
                  <div>✗ Recipientes que contenían combustible</div>
                  <div>✗ Materiales radiactivos</div>
                  <div>✗ Cables con aislación de plomo</div>
                  <div>✗ Materiales explosivos o peligrosos</div>
                  <div>✗ Metales de procedencia dudosa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CTASection
        title="¿Tienes Materiales para Vender?"
        description="Pesamos tu material en balanza certificada, recibimos cualquier cantidad, ofrecemos servicio de descarga, emitimos facturas y pagamos al instante, siempre con precios actualizados del mercado."
        actions={[
          {
            type: 'primary',
            text: 'Consultar Precios',
            href: '/precios'
          },
          {
            type: 'secondary',
            text: 'Cómo Llegar',
            href: '/contacto'
          }
        ]}
        backgroundType="gradient"
        alignment="center"
      />
      
      <BackToTop />
    </Layout>
  );
}
