import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { PreviewSection } from '@/components/sections/PreviewSection/PreviewSection';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { Layout } from '@/components/layout/Layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { ReadMoreButton } from '@/components/buttons/ReadMoreButton/ReadMoreButton';
import { getPriceUpdateText } from '@/utils/priceUpdateDate';
import { PRICING_CONFIG, formatPrice } from '@/config/pricing';

import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor/PerformanceMonitor';
import styles from './page.module.css';

export const metadata = {
  title: 'KONSTANDER - Compra Chatarra y Metales | Mejores Precios Lampa 2024',
  description: '🥇 Compramos chatarra y metales al MEJOR PRECIO en Lampa: Cobre $7,500/kg, Fierro $450/kg, Aluminio $2,800/kg. Pago inmediato, balanza certificada. ¡Llama +56937720208!',
  keywords: 'compra chatarra, metales, cobre precio hoy, fierro chatarra, aluminio, Lampa, Santiago, KONSTANDER, mejores precios',
};

export default function HomePage() {
  // Get 3 specific materials from pricing config - connected to price architecture
  const featuredMaterials = [
    PRICING_CONFIG.find(m => m.nameEs === 'Cobre 3ra'),
    PRICING_CONFIG.find(m => m.nameEs === 'Fierro Corto'), 
    PRICING_CONFIG.find(m => m.nameEs === 'Aluminio Perfil')
  ].filter((material): material is NonNullable<typeof material> => Boolean(material)); // Remove any undefined materials

  return (
    <Layout>
      <SEOHead 
        title="💰 Konstander SpA | Compra & Venta de Chatarra 🇨🇱"
        description="🔥 Vende tu chatarra hoy y recibe pago inmediato! Cobre $7.500/kg • Fierro $450/kg • Aluminio $2.800/kg. Balanza certificada. Abierto 7 días. Lampa, RM. ¡Llamá ya! 📞+56937720208"
        canonical="https://comprametales.cl"
        keywords="compra chatarra, metales, cobre precio hoy, fierro chatarra, aluminio, Lampa, Santiago, KONSTANDER, mejores precios"
      />
      <PerformanceMonitor pageName="Homepage" pageType="landing" />
      
      <div className={styles.heroSection}>
        <HeroSection />
      </div>
      
      <div className={styles.previewSections}>
        {/* Simple Price Preview Section */}
        <section className={styles.pricePreviewSection}>
          <div className="container">
            <div className={styles.pricePreviewHeader}>
              <span className={styles.pricePreviewSubtitle}>Precios Actualizados</span>
              <h2 className={styles.pricePreviewTitle}>Nuestros Precios</h2>
              <p className={styles.pricePreviewDescription}>
                Precios competitivos y actualizados para los principales metales. {getPriceUpdateText(featuredMaterials)}.
              </p>
            </div>
            
            <div className={styles.pricePreviewTable}>
              {featuredMaterials.map((material) => (
                <div key={material.name} className={styles.pricePreviewItem}>
                  <div className={styles.materialInfo}>
                    <span className={styles.materialName}>{material.nameEs}</span>
                    <span className={styles.materialCategory}>
                      {material.category === 'ferrosos' ? 'Ferroso' : 'No Ferroso'}
                    </span>
                  </div>
                  <div className={styles.materialPrice}>
                    {formatPrice(material.pricePerKg)}<span className={styles.priceUnit}>/kg</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.pricePreviewAction}>
              <ReadMoreButton 
                href="/precios" 
                text="Ver Precios"
              />
            </div>
          </div>
        </section>
        
        <PreviewSection
          id="materiales-aceptamos"
          title="Materiales que Aceptamos"
          subtitle="Compramos Todo Tipo de Metales"
          description="Recibimos todo tipo de metales ferrosos y no ferrosos: cobre, fierro, aluminio, bronce, acero inoxidable, radiadores y más. Trae tu chatarra y obtén la mejor cotización."
          href="/materiales-aceptamos"
          backgroundType="gradient"
        />
        
        <PreviewSection
          id="materiales-aceptamos"
          title="Materiales que Aceptamos"
          subtitle="Compramos Todo Tipo de Metales"
          description="Recibimos todo tipo de metales ferrosos y no ferrosos: cobre, fierro, aluminio, bronce, acero inoxidable, radiadores y más. Trae tu chatarra y obtén la mejor cotización."
          href="/materiales-aceptamos"
          backgroundType="gradient"
        />
        
        <PreviewSection
          id="materiales-vendemos"
          title="Materiales Usados en Venta"
          subtitle="Metales Reciclados de Calidad"
          description="Venta de materiales reciclados de calidad — fierro, perfiles, planchas, mallas y más, hasta 50% más baratos que nuevos y con la misma resistencia para tus proyectos de construcción o industria."
          href="/materiales-vendemos"
          backgroundType="transparent"
        />
        
        <PreviewSection
          id="nosotros"
          title="Acerca de KONSTANDER"
          subtitle="Experiencia y Confianza"
          description="Con años de experiencia en el rubro, nos especializamos en la compra y venta de metales en la Región Metropolitana, ofreciendo precios competitivos, pesaje certificado y atención rápida y confiable."
          href="/nosotros"
          backgroundType="gradient"
        />
        
        <PreviewSection
          id="contacto"
          title="Contáctanos"
          subtitle="Estamos Aquí para Ayudarte"
          description="Estamos en Lampa y atendemos toda la Región Metropolitana. Escríbenos por WhatsApp o llámanos y recibe respuesta al tiro. Abierto de lunes a domingo, de 8:00 a 18:00 hrs"
          href="/contacto"
          backgroundType="transparent"
        />
      </div>
      
      <div className={styles.ctaSection}>
        <CTASection
          title="¿Listo para Vender tus Metales?"
          subtitle="Obtén la Mejor Cotización"
          description="Contáctanos ahora y recibe pago inmediato por tu chatarra al mejor precio en Santiago."
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
      </div>
      
      <BackToTop />
    </Layout>
  );
}
