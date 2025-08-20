import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { MaterialGrid } from '@/components/content/MaterialGrid/MaterialGrid';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { getPricesByCategory } from '@/config/pricing';
import styles from './page.module.css';

export const metadata = {
  title: 'Compramos Chatarra y Metales - Cobre, Hierro, Aluminio - KONSTANDER Lampa',
  description: '💰 Compramos chatarra y metales al mejor precio en Lampa: cobre $7,500/kg, hierro $450/kg, aluminio $2,800/kg. Pago inmediato, balanza certificada. ¡Llama +56937720208!',
  keywords: 'compra chatarra, venta metales, cobre precio, hierro chatarra, aluminio reciclaje, Lampa, Santiago, KONSTANDER, mejores precios metales',
};

export default function MaterialesAceptamosPage() {
  const ferrosoMaterials = getPricesByCategory('ferrosos');
  const noFerrosoMaterials = getPricesByCategory('no-ferrosos');
  const especialesMaterials = getPricesByCategory('especiales');

  return (
    <Layout>
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
            subtitle="Metales que contienen hierro"
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
                <h3>Materiales que Aceptamos:</h3>
                <div className={styles.requirementsList}>
                  <div>✓ Materiales limpios y separados</div>
                  <div>✓ Chatarra doméstica e industrial</div>
                  <div>✓ Estructuras metálicas desmontadas</div>
                  <div>✓ Cables pelados y sin pelar</div>
                  <div>✓ Radiadores sin plástico</div>
                  <div>✓ Mínimo 50kg por transacción</div>
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
