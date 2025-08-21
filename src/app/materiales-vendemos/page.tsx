import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';

import { CTASection } from '@/components/composition/CTASection/CTASection';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';

import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Materiales Usados en Venta - KONSTANDER',
  description: 'Vendemos materiales metálicos reciclados de calidad: barras de acero, planchas de fierro, tubos de cobre y perfiles de aluminio en Lampa.',
};

export default function MaterialesVendemosPage() {
  // Data for potential future MaterialGrid component
  /* const materialesVenta = [
    {
      name: 'Steel Bars',
      nameEs: 'Barras de Acero',
      pricePerKg: 180,
      currency: 'CLP',
      category: 'ferrosos' as const,
      description: 'Barras de acero reciclado para construcción',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Iron Sheets',
      nameEs: 'Planchas de Fierro',
      pricePerKg: 160,
      currency: 'CLP',
      category: 'ferrosos' as const,
      description: 'Planchas de fierro de diversos grosores',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Copper Pipes',
      nameEs: 'Tubos de Cobre',
      pricePerKg: 4200,
      currency: 'CLP',
      category: 'no-ferrosos' as const,
      description: 'Tubos de cobre reciclado para instalaciones',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Aluminum Profiles',
      nameEs: 'Perfiles de Aluminio',
      pricePerKg: 800,
      currency: 'CLP',
      category: 'no-ferrosos' as const,
      description: 'Perfiles de aluminio para construcción',
      lastUpdated: '2024-01-15'
    }
  ]; */

  return (
    <Layout>

      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Materiales en Venta', href: '/materiales-vendemos' }
        ]}
      />
      
      <PageHero
        title="Materiales Usados en Venta"
        subtitle="Metales Reciclados de Calidad"
        description="Disponemos de materiales metálicos reciclados para construcción, industria y reparaciones, hasta un 50% más económicos que nuevos y con la misma resistencia. Todos son cuidadosamente seleccionados y limpiados."
        backgroundImage="/images/venta-materiales-reciclados-konstander-lampa.webp"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.materialsGrid}>
          

          
          <div className={styles.galleryCard}>
            <h3 className={styles.galleryTitle}>Galería de Materiales Disponibles</h3>
            <p className={styles.galleryDescription}>
              Visualiza algunos de los materiales que tenemos disponibles en nuestro inventario. 
              Todos nuestros productos son seleccionados y verificados para garantizar la mejor calidad.
            </p>
            <div className={styles.imageGrid}>
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/barras-refuerzo-acero-hormigon-lampa.webp" 
                  alt="Barras de refuerzo de acero recicladas para hormigón armado en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Barras de Refuerzo</h4>
                  <p className={styles.imageDescription}>Para hormigón armado</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/fierro-construccion-reciclado-santiago.webp" 
                  alt="Fierro de construcción reciclado económico para obras en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXwGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Fierro Construcción</h4>
                  <p className={styles.imageDescription}>Diferentes tamaños</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/fierro-estriado-construccion-lampa.webp" 
                  alt="Fierro de construcción reciclado económico para obras en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Fierro Estriado</h4>
                  <p className={styles.imageDescription}>Diferentes tamaños</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/tuberia-acero-reciclada-lampa.webp" 
                  alt="Tubería de acero reciclada de diferentes tamaños en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXXGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Tubería</h4>
                  <p className={styles.imageDescription}>Diferentes tamaños</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/tornillos-reciclados-construccion-santiago.webp" 
                  alt="Tornillos reciclados de diferentes tipos y tamaños para construcción - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Tornillos</h4>
                  <p className={styles.imageDescription}>Diferentes tipos y tamaños</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/pernos-anclaje-reciclados-lampa.webp" 
                  alt="Pernos de anclaje reciclados resistentes de diferentes tamaños en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Perno Anclaje</h4>
                  <p className={styles.imageDescription}>Diferentes tamaños</p>
                </div>
              </div>
              
              <div className={`${styles.imageCard} group`}>
                <Image 
                  src="/images/MaterialesUsadosenVenta/pernos-tuercas-reciclados-construccion.webp" 
                  alt="Pernos con tuercas reciclados económicos para construcción en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER"
                  width={240}
                  height={180}
                  sizes="240px"
                  loading="lazy"
                  placeholder="blur"
                  quality={85}
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                  <h4 className={styles.imageTitle}>Pernos con Tuercas</h4>
                  <p className={styles.imageDescription}>Diferentes tipos y tamaños</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.advantagesGrid}>
            <div className={styles.advantageCard}>
              <h3 className={styles.cardTitle}>Ventajas de Nuestros Materiales</h3>
              <ul className={styles.cardList}>
                <li className={styles.listItem}>
                  <span className={styles.primaryBullet}>✓</span>
                  <span>Precios competitivos hasta 60% menos que material nuevo</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.primaryBullet}>✓</span>
                  <span>Materiales clasificados y verificados</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.primaryBullet}>✓</span>
                  <span>Contribuyes al reciclaje y cuidado del medio ambiente</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.primaryBullet}>✓</span>
                  <span>Stock permanente y renovación constante</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Servicios Adicionales</h3>
              <ul className={styles.cardList}>
                <li className={styles.listItem}>
                  <span className={styles.secondaryBullet}>•</span>
                  <span>Corte a medida según especificaciones</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.secondaryBullet}>•</span>
                  <span>Asesoría técnica para selección de materiales</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.secondaryBullet}>•</span>
                  <span>Despacho a domicilio en Región Metropolitana</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.secondaryBullet}>•</span>
                  <span>Certificados de calidad disponibles</span>
                </li>
              </ul>
            </div>
          </div>
          

        </div>
      </div>
      
      <CTASection
        title="¿Necesitas Materiales para tu Proyecto?"
        description="Tenemos materiales reciclados para construcción, reparaciones o remodelaciones, hasta 50% más baratos que nuevos y con la misma calidad."
        actions={[
          {
            type: 'primary',
            text: 'Visitar Planta',
            href: '/contacto'
          },
          {
            type: 'secondary',
            text: 'Consultar Stock',
            href: 'tel:+56937720208'
          }
        ]}
        backgroundType="gradient"
        alignment="center"
      />
      
      <BackToTop />
    </Layout>
  );
}
