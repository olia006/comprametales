import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { PreviewSection } from '@/components/sections/PreviewSection/PreviewSection';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { LazySection } from '@/components/ui/LazySection/LazySection';
import { Layout } from '@/components/layout/Layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor/PerformanceMonitor';
import { getHighestPrices } from '@/config/pricing';
import styles from './page.module.css';

export default function HomePage() {
  const topPrices = getHighestPrices(3);

  return (
    <Layout>
      <SEOHead 
        title="KONSTANDER - Compra Chatarra y Metales | Mejores Precios Lampa 2024"
        description="🥇 Compramos chatarra y metales al MEJOR PRECIO en Lampa: Cobre $7,500/kg, Hierro $450/kg, Aluminio $2,800/kg. Pago inmediato, balanza certificada. ¡Llama +56937720208!"
        canonical="https://konstander.cl"
        keywords="compra chatarra, metales, cobre precio hoy, hierro chatarra, aluminio, Lampa, Santiago, KONSTANDER, mejores precios"
      />
      
      <PerformanceMonitor pageName="Homepage" pageType="landing" />
      
      <div className={styles.heroSection}>
        <HeroSection />
      </div>
      
      <div className={styles.previewSections}>
        <PreviewSection
          id="precios"
          title="Nuestros Precios"
          subtitle="Precios Actualizados"
          description="Precios actualizados y competitivos para cobre, fierro, aluminio, bronce y más. Cotiza hoy y recibe pago inmediato al mejor valor del mercado."
          href="/precios"
          backgroundType="transparent"
          topPrices={topPrices}
        />
        
        <LazySection skeletonVariant="previewSection">
          <PreviewSection
            id="materiales-aceptamos"
            title="Materiales que Aceptamos"
            subtitle="Compramos Todo Tipo de Metales"
            description="Recibimos todo tipo de metales ferrosos y no ferrosos: cobre, fierro, aluminio, bronce, acero inoxidable, radiadores y más. Trae tu chatarra y obtén la mejor cotización."
            href="/materiales-aceptamos"
            backgroundType="gradient"
          />
        </LazySection>
        
        <LazySection skeletonVariant="previewSection">
          <PreviewSection
            id="materiales-vendemos"
            title="Materiales Usados en Venta"
            subtitle="Metales Reciclados de Calidad"
            description="Venta de materiales reciclados de calidad — fierro, perfiles, planchas, mallas y más, hasta 50% más baratos que nuevos y con la misma resistencia para tus proyectos de construcción o industria."
            href="/materiales-vendemos"
            backgroundType="transparent"
          />
        </LazySection>
        
        <LazySection skeletonVariant="previewSection">
          <PreviewSection
            id="nosotros"
            title="Acerca de KONSTANDER"
            subtitle="Experiencia y Confianza"
            description="Con años de experiencia en el rubro, nos especializamos en la compra y venta de metales en la Región Metropolitana, ofreciendo precios competitivos, pesaje certificado y atención rápida y confiable."
            href="/nosotros"
            backgroundType="gradient"
          />
        </LazySection>
        
        <LazySection skeletonVariant="previewSection">
          <PreviewSection
            id="contacto"
            title="Contáctanos"
            subtitle="Estamos Aquí para Ayudarte"
            description="Estamos en Lampa y atendemos toda la Región Metropolitana. Escríbenos por WhatsApp o llámanos y recibe respuesta al tiro. Abierto de lunes a domingo, de 8:00 a 18:00 hrs"
            href="/contacto"
            backgroundType="transparent"
          />
        </LazySection>
      </div>
      
      <div className={styles.ctaSection}>
        <LazySection skeletonVariant="ctaSection">
          <CTASection
            title="¿Listo para Vender tus Metales?"
            subtitle="Obtén la Mejor Cotización"
            description="Contáctanos ahora y obtén el mejor precio por tus materiales. Evaluación gratuita y pago inmediato."
            actions={[
              {
                type: 'primary',
                text: 'Llamar Ahora',
                href: 'tel:+56937720208'
              },
              {
                type: 'secondary',
                text: 'Ver Precios',
                href: '/precios'
              }
            ]}
            backgroundType="gradient"
            alignment="center"
            size="lg"
          />
        </LazySection>
      </div>
      
      <BackToTop />
    </Layout>
  );
}
