import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { PriceTable } from '@/components/content/PriceTable/PriceTable';
import { InfoNotice } from '@/components/content/InfoNotice/InfoNotice';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { PRICING_CONFIG, getPricesByCategory } from '@/config/pricing';
import styles from './page.module.css';

// Import non-critical CSS at component level to avoid render-blocking
import '../globals.css';

export default function PreciosPage() {
  const ferrosoMaterials = getPricesByCategory('ferrosos');
  const noFerrosoMaterials = getPricesByCategory('no-ferrosos');
  const especialesMaterials = getPricesByCategory('especiales');

  return (
    <Layout>
      <SEOHead 
        title="Precios Chatarra Hoy 2024 - Cobre $7,500/kg, Hierro $450/kg | KONSTANDER"
        description="📊 Precios chatarra actualizados HOY: Cobre $7,500/kg, Hierro $450/kg, Aluminio $2,800/kg. Mejores precios garantizados en Lampa. ¡Cotiza gratis +56937720208!"
        canonical="https://konstander.cl/precios"
        keywords="precios chatarra hoy, precio cobre 2024, precio hierro kg, precio aluminio, cotización metales, Lampa, Santiago, KONSTANDER"
      />
      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Precios', href: '/precios' }
        ]}
      />
      
      <PageHero
        title="Precios de Metales y Chatarra"
        subtitle="Cotizaciones Actualizadas"
        description="Consulta nuestros precios competitivos para todos los tipos de metales. Precios actualizados diariamente según el mercado internacional."
        backgroundImage="/images/pricepage.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.priceTablesGrid}>
          <PriceTable
            title="Materiales Ferrosos"
            description="Hierro, acero y otros metales que contienen hierro"
            materials={ferrosoMaterials}
            categoryColor="primary"
          />
          
          <PriceTable
            title="Materiales No Ferrosos"
            description="Metales sin contenido de hierro, como cobre y aluminio"
            materials={noFerrosoMaterials}
            categoryColor="secondary"
          />
          
          <PriceTable
            title="Materiales Especiales"
            description="Metales especializados y aleaciones específicas"
            materials={especialesMaterials}
            categoryColor="primary"
          />
        </div>
        
        <InfoNotice
          title="Información Importante"
          items={[
            'Los precios están sujetos a variaciones según el mercado internacional',
            'Precios por kilogramo en pesos chilenos (CLP)',
            'Precios pueden variar según la calidad y limpieza del material',
            'Algunos materiales requieren documentación legal (acta de procedencia, facturas, etc.)',
            `Última actualización: ${PRICING_CONFIG[0]?.lastUpdated}`
          ]}
        />
      </div>
      
      <CTASection
        title="¿Quieres Vender tus Metales?"
        description="Envíanos fotos o detalles por WhatsApp y recibe tu cotización al tiro. Evaluamos cobre, fierro, aluminio, bronce y más, con pago inmediato y balanza certificada."
        actions={[
          {
            type: 'primary',
            text: 'Solicitar Cotización',
            href: '/contacto'
          },
          {
            type: 'secondary',
            text: 'Ver Materiales que Aceptamos',
            href: '/materiales-aceptamos'
          }
        ]}
        backgroundType="gradient"
        alignment="center"
      />
      
      <BackToTop />
    </Layout>
  );
}
