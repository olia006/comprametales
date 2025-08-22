import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ContactInfo } from '@/components/content/ContactInfo/ContactInfo';
import { BusinessHours } from '@/components/content/BusinessHours/BusinessHours';

import { Map } from '@/components/content/Map/Map';
import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import styles from './page.module.css';

export const metadata = {
  title: 'Contacto - KONSTANDER Lampa',
  description: 'Contáctanos para vender tus metales. Ubicados en Panamericana Norte 17110, Lampa. Teléfono: +56 9 3772 0208. Abierto lunes a domingo.',
};

export default function ContactoPage() {
  return (
    <Layout>
      <SEOHead 
        title="📍 Contacto KONSTANDER | Panamericana Norte 17110, Lampa, RM"
        description="📞 Contáctanos para vender tus metales: +56937720208. Ubicados en Panamericana Norte 17110, Lampa. Abierto lunes a domingo 8:00-18:00. Cotización gratuita y pago inmediato. ¡Visítanos!"
        canonical="https://comprametales.cl/contacto"
        keywords="contacto KONSTANDER, dirección Lampa metales, teléfono chatarra Santiago, ubicación compra metales, horarios KONSTANDER, Panamericana Norte 17110"
      />
      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Contacto', href: '/contacto' }
        ]}
      />
      
      <PageHero
        title="Contáctanos"
        subtitle="Estamos Aquí para Ayudarte"
        description="Visítanos en nuestra planta de Lampa o contáctanos para cotizaciones y consultas. Nuestro equipo está listo para atenderte y ofrecerte el mejor servicio."
        backgroundImage="/images/contacto-konstander-compra-chatarra-lampa.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <ContactInfo />
            <BusinessHours />
          </div>
          
          <div className={styles.rightColumn}>
            <div className={styles.whatToBringCard}>
              <h2 className={styles.whatToBringTitle}>Qué Traer</h2>
              <div className={styles.whatToBringSections}>
                <div className={styles.documentSection}>
                  <h3 className={styles.sectionTitle}>
                    <span className={`${styles.sectionDot} ${styles.primaryDot}`}></span>
                    Documentos Requeridos
                  </h3>
                  <ul className={styles.sectionList}>
                    <li className={styles.listItem}>
                      <span className={`${styles.listBullet} ${styles.primaryBullet}`}>•</span>
                      <span>Cédula de identidad</span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={`${styles.listBullet} ${styles.primaryBullet}`}>•</span>
                      <span>Comprobante de procedencia (si aplica)</span>
                    </li>
                  </ul>
                </div>
                
                <div className={styles.materialSection}>
                  <h3 className={styles.sectionTitle}>
                    <span className={`${styles.sectionDot} ${styles.secondaryDot}`}></span>
                    Materiales Aceptados
                  </h3>
                  <ul className={styles.sectionList}>
                    <li className={styles.listItem}>
                      <span className={`${styles.listBullet} ${styles.secondaryBullet}`}>•</span>
                      <span>Metales limpios y separados por tipo</span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={`${styles.listBullet} ${styles.secondaryBullet}`}>•</span>
                      <span>Comprobante de procedencia (cuando se solicite)</span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={`${styles.listBullet} ${styles.secondaryBullet}`}>•</span>
                      <span>Sin contaminantes o materiales peligrosos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Nuestra Ubicación</h2>
          <Map />
        </div>
        

      </div>
      
      <CTASection
        title="¿Listo para Vender tus Metales?"
        description="Ven a visitarnos o llámanos para una cotización. Nuestro equipo te está esperando para ofrecerte el mejor precio y servicio."
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
      />
      
      <BackToTop />
    </Layout>
  );
}
