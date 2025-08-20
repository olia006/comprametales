import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { PriceTable } from '@/components/content/PriceTable/PriceTable';
import { InfoNotice } from '@/components/content/InfoNotice/InfoNotice';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { getPriceUpdateDescription } from '@/utils/priceUpdateDate';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { PRICING_CONFIG, getPricesByCategory } from '@/config/pricing';
import styles from './page.module.css';

export const metadata = {
  title: 'Precios Chatarra Hoy 2024 - Cobre $7,500/kg, Fierro $450/kg - KONSTANDER',
  description: '📊 Precios chatarra actualizados HOY: Cobre $7,500/kg, Fierro $450/kg, Aluminio $2,800/kg. Mejores precios garantizados en Lampa. ¡Cotiza gratis +56937720208!',
  keywords: 'precios chatarra hoy, precio cobre 2024, precio fierro kg, precio aluminio, cotización metales, Lampa, Santiago, KONSTANDER',
};

export default function PreciosPage() {
  const ferrosoMaterials = getPricesByCategory('ferrosos');
  const noFerrosoMaterials = getPricesByCategory('no-ferrosos');
  const especialesMaterials = getPricesByCategory('especiales');

  return (
    <Layout>
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Precios', href: '/precios' }
        ]}
      />
      
      <PageHero
        title="Precios de Metales y Chatarra"
        subtitle="Cotizaciones Actualizadas"
        description={getPriceUpdateDescription([...ferrosoMaterials, ...noFerrosoMaterials, ...especialesMaterials])}
        backgroundImage="/images/pricepage.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.priceTablesGrid}>
          <PriceTable
            title="Materiales Ferrosos"
            description="Fierro, acero y otros metales que contienen fierro"
            materials={ferrosoMaterials}
            categoryColor="primary"
          />
          
          <PriceTable
            title="Materiales No Ferrosos"
            description="Metales sin contenido de fierro, como cobre y aluminio"
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
