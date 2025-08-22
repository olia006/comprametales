import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { MaterialGrid } from '@/components/content/MaterialGrid/MaterialGrid';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { ImageSchema } from '@/components/seo/ImageSchema/ImageSchema';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
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

  // Consolidated images object for Schema.org
  const allImages = {
    'Iron Mixed': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-mixto-chatarra-konstander-lampa.webp',
    'Cast Iron': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-fundido-chatarra-konstander-lampa.webp',
    'Iron Long': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-largo-chatarra-konstander-lampa.webp',
    'Iron Short': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-corto-chatarra-konstander-lampa.webp',
    'Iron Turnings': '/images/MaterialesqueAceptamos/MaterialesFerrosos/viruta-fierro-chatarra-konstander-lampa.webp',
    'Tinplate Steel': '/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-lata-chatarra-konstander-lampa.webp',
    'Copper Grade 3': '/images/MaterialesqueAceptamos/cobre-reciclado-compra-konstander-lampa.webp',
    'Copper Grade 2': '/images/MaterialesqueAceptamos/cobre-reciclado-compra-konstander-lampa.webp',
    'Copper Grade 1': '/images/MaterialesqueAceptamos/cobre-reciclado-compra-konstander-lampa.webp',
    'Aluminum Clean': '/images/MaterialesqueAceptamos/aluminio-reciclado-compra-konstander-lampa.webp',
    'Aluminum Profiles': '/images/MaterialesqueAceptamos/aluminio-reciclado-compra-konstander-lampa.webp',
    'Aluminum Cans': '/images/MaterialesqueAceptamos/aluminio-reciclado-compra-konstander-lampa.webp',
    'Stainless Steel': '/images/MaterialesqueAceptamos/acero-reciclado-compra-konstander-lampa.webp',
    'Bronze': '/images/MaterialesqueAceptamos/bronce-reciclado-compra-konstander-lampa.webp',
    'Electric Material': '/images/MaterialesqueAceptamos/placas-electronicas-chatarra-konstander-lampa.webp'
  };

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
      <SEOHead 
        title="🏭 Compramos Chatarra y Metales | KONSTANDER Lampa, RM"
        description="💰 Compramos chatarra y metales al MEJOR PRECIO: Cobre $7.500/kg • Fierro $450/kg • Aluminio $2.800/kg. Pago inmediato, balanza certificada. Panamericana Norte 17110, Lampa. ¡Llama ya! 📞+56937720208"
        canonical="https://comprametales.cl/materiales-aceptamos"
        keywords="compra chatarra, venta metales, cobre precio, fierro chatarra, aluminio reciclaje, Lampa, Santiago, KONSTANDER, mejores precios metales"
      />
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
        backgroundImage="/images/materiales-aceptamos-chatarra-metales-lampa.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentSections}>
          <MaterialGrid
            title="Materiales Ferrosos"
            subtitle="Metales que contienen fierro"
            description="Aceptamos todo tipo de materiales ferrosos en cualquier estado. Desde chatarra doméstica hasta estructuras industriales."
            materials={ferrosoMaterials}
            images={Object.fromEntries(
              Object.entries(allImages).filter(([key]) => 
                ['Iron Mixed', 'Cast Iron', 'Iron Long', 'Iron Short', 'Iron Turnings', 'Tinplate Steel'].includes(key)
              )
            )}
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
            images={Object.fromEntries(
              Object.entries(allImages).filter(([key]) => 
                ['Copper Grade 3', 'Copper Grade 2', 'Copper Grade 1', 'Aluminum Clean', 'Aluminum Profiles', 'Aluminum Cans'].includes(key)
              )
            )}
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
            images={Object.fromEntries(
              Object.entries(allImages).filter(([key]) => 
                ['Stainless Steel', 'Bronze', 'Electric Material'].includes(key)
              )
            )}
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
      
      <ImageSchema 
        images={[
          ...Object.keys(allImages).map(materialName => ({
            url: allImages[materialName as keyof typeof allImages],
            alt: `${PRICING_CONFIG.find(m => m.name === materialName)?.nameEs || materialName} - chatarra reciclada compra en Panamericana Norte 17110, Lampa`,
            width: 180,
            height: 320,
            caption: `Material reciclado disponible en KONSTANDER Lampa`
          }))
        ]}
      />
      
      <BackToTop />
    </Layout>
  );
}
