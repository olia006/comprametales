import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { MaterialGrid } from '@/components/content/MaterialGrid/MaterialGrid';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { getPricesByCategory } from '@/config/pricing';
import styles from './page.module.css';

export default function MaterialesAceptamosPage() {
  const ferrosoMaterials = getPricesByCategory('ferrosos');
  const noFerrosoMaterials = getPricesByCategory('no-ferrosos');
  const especialesMaterials = getPricesByCategory('especiales');

  return (
    <Layout>
      <SEOHead 
        title="Compramos Chatarra y Metales - Cobre, Hierro, Aluminio | KONSTANDER Lampa"
        description="💰 Compramos chatarra y metales al mejor precio en Lampa: cobre $7,500/kg, hierro $450/kg, aluminio $2,800/kg. Pago inmediato, balanza certificada. ¡Llama +56937720208!"
        canonical="https://konstander.cl/materiales-aceptamos"
        keywords="compra chatarra, venta metales, cobre precio, hierro chatarra, aluminio reciclaje, Lampa, Santiago, KONSTANDER, mejores precios metales"
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
        backgroundImage="/images/aceptamospage.jpg"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentSections}>
          <MaterialGrid
            title="Materiales Ferrosos"
            subtitle="Metales que contienen hierro"
            description="Aceptamos todo tipo de materiales ferrosos en cualquier estado. Desde chatarra doméstica hasta estructuras industriales."
            materials={ferrosoMaterials}
            examples={[
              'Vigas y estructuras metálicas',
              'Tubos y cañerías de hierro',
              'Chatarra de automóviles',
              'Electrodomésticos viejos',
              'Herramientas en desuso',
              'Rejas y portones'
            ]}
          />
          
          <MaterialGrid
            title="Materiales No Ferrosos"
            subtitle="Metales sin contenido de hierro"
            description="Los metales no ferrosos tienen mayor valor debido a sus propiedades especiales y su resistencia a la corrosión."
            materials={noFerrosoMaterials}
            examples={[
              'Cables eléctricos de cobre',
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
                <h3>Aceptamos:</h3>
                <ul className={styles.requirementsList}>
                  <li>✓ Materiales limpios y separados</li>
                  <li>✓ Chatarra doméstica e industrial</li>
                  <li>✓ Estructuras metálicas desmontadas</li>
                  <li>✓ Cables pelados y sin pelar</li>
                  <li>✓ Radiadores sin plástico</li>
                  <li>✓ Mínimo 50kg por transacción</li>
                </ul>
              </div>
              <div>
                <h3>No Aceptamos:</h3>
                <ul className={styles.requirementsList}>
                  <li>✗ Materiales contaminados con químicos</li>
                  <li>✗ Recipientes que contenían combustible</li>
                  <li>✗ Materiales radiactivos</li>
                  <li>✗ Cables con aislación de plomo</li>
                  <li>✗ Materiales explosivos o peligrosos</li>
                  <li>✗ Metales de procedencia dudosa</li>
                </ul>
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
