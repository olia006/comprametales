import React from 'react';

import { MaterialPreviewCard } from '@/components/content/MaterialPreviewCard/MaterialPreviewCard';
import { ReadMoreButton } from '@/components/buttons/ReadMoreButton/ReadMoreButton';
import { formatPrice, MaterialPrice } from '@/config/pricing';
import styles from './PreviewSection.module.css';

interface PreviewSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  backgroundType?: 'transparent' | 'gradient' | 'solid';
  topPrices?: MaterialPrice[];
  className?: string;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  href,
  backgroundType = 'transparent',
  topPrices,
  className = '',
}) => {
  const sectionClasses = [
    styles.previewSection,
    styles[backgroundType],
    className
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.header}>
              <span className={styles.subtitle}>{subtitle}</span>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
            
            {id === 'nosotros' && (
              <div className={styles.statsInText}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>3+</span>
                  <span className={styles.statLabel}>Años en Chile</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>7</span>
                  <span className={styles.statLabel}>Días a la Semana</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>18m</span>
                  <span className={styles.statLabel}>Balanza / 80 Ton</span>
                </div>
              </div>
            )}
            
            <div className={styles.action}>
              <ReadMoreButton 
                href={href} 
                text="Ver Más Detalles"
                size="lg"
              />
            </div>
          </div>
          
          {topPrices && (
            <div className={styles.visualContent}>
              <div className={styles.pricesPreview}>
                <h3 className={styles.pricesTitle}>Precios Destacados</h3>
                <div className={styles.pricesList}>
                  {topPrices.map((material) => (
                    <div key={material.name} className={styles.priceItem}>
                      <div className={styles.materialInfo}>
                        <span className={styles.materialName}>{material.nameEs}</span>
                        <span className={styles.materialCategory}>
                          {material.category === 'ferrosos' ? 'Ferroso' : 
                           material.category === 'no-ferrosos' ? 'No Ferroso' : 'Especial'}
                        </span>
                      </div>
                      <div className={styles.materialPrice}>
                        {formatPrice(material.pricePerKg)}<span className={styles.unit}>/kg</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.pricesNote}>
                  <small>Precios actualizados diariamente</small>
                </div>
              </div>
            </div>
          )}
          
          {!topPrices && id !== 'contacto' && (
            <div className={styles.visualContent}>
              {id === 'materiales-aceptamos' && (
                <div className={styles.acceptImagesGrid}>
                  {[
                    { src: '/images/MaterialesqueAceptamos/fierro.webp', label: 'Fierro', alt: 'Chatarra de fierro y acero ferroso - compra al mejor precio en Santiago' },
                    { src: '/images/MaterialesqueAceptamos/cobre.webp', label: 'Cobre', alt: 'Cobre reciclado - cables, tuberías y chatarra de cobre con cotización diaria' },
                    { src: '/images/MaterialesqueAceptamos/aluminio.webp', label: 'Aluminio', alt: 'Aluminio reciclado - perfiles, latas y chatarra de aluminio con pago inmediato' },
                    { src: '/images/MaterialesqueAceptamos/bronce.webp', label: 'Bronce', alt: 'Bronce y aleaciones - grifería, válvulas y piezas de bronce reciclado' },
                    { src: '/images/MaterialesqueAceptamos/acero.webp', label: 'Acero Inoxidable', alt: 'Acero inoxidable - utensilios, equipos industriales y estructuras inoxidables' },
                    { src: '/images/MaterialesqueAceptamos/electrico.webp', label: 'Material Eléctrico', alt: 'Cables eléctricos y transformadores - reciclaje de material eléctrico con cobre' },
                  ].map((item) => (
                    <MaterialPreviewCard
                      key={item.label}
                      src={item.src}
                      alt={item.alt}
                      label={item.label}
                      showLabel={true}
                    />
                  ))}
                </div>
              )}
              
              {id === 'materiales-vendemos' && (
                <div className={styles.acceptImagesGrid}>
                  {[
                    { src: '/images/MaterialesUsadosenVenta/armatura_3.webp', label: 'Armaduras y Estructuras', alt: 'Armaduras de acero estructural recicladas para construcción' },
                    { src: '/images/MaterialesUsadosenVenta/Barras_3.webp', label: 'Barras de Refuerzo', alt: 'Barras de refuerzo de acero recicladas para hormigón armado' },
                    { src: '/images/MaterialesUsadosenVenta/perfiles-acero.webp', label: 'Perfiles Estructurales', alt: 'Perfiles de acero reciclados tipo H, I y U para construcción industrial' },
                    { src: '/images/MaterialesUsadosenVenta/planchas-metal.webp', label: 'Planchas Metálicas', alt: 'Planchas de acero recicladas de diversos grosores para proyectos industriales' },
                    { src: '/images/MaterialesUsadosenVenta/vigas-acero.webp', label: 'Vigas de Acero', alt: 'Vigas de acero estructural recicladas para construcción de galpones y estructuras' },
                    { src: '/images/MaterialesUsadosenVenta/tuberia-industrial.webp', label: 'Tubería Industrial', alt: 'Tubería de acero reciclada para instalaciones industriales y sistemas de transporte' },
                  ].map((item) => (
                    <MaterialPreviewCard
                      key={item.label}
                      src={item.src}
                      alt={item.alt}
                      label={item.label}
                      showLabel={true}
                    />
                  ))}
                </div>
              )}
              
              {id === 'nosotros' && (
                <div className={styles.videoBackground}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.backgroundVideo}
                  >
                    <source src="/images/aboutuspreview.mp4" type="video/mp4" />
                  </video>
                  <div className={styles.videoOverlay} />
                </div>
              )}
            </div>
          )}

          {/* Bare iframe for contacto preview - no decoration, no containers */}
          {id === 'contacto' && (
            <iframe
              className={styles.bareMapIframe}
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d106696.13455388647!2d-70.81007231238918!3d-33.31216910486708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x9662bf731aa77e4f%3A0x1c4f941e1ff7c2a6!2sPanamericana%20Norte%2017110%2C%20Lampa%2C%20Regi%C3%B3n%20Metropolitana!3m2!1d-33.3122341!2d-70.7276479!5e0!3m2!1sen!2scl!4v1755104132817!5m2!1sen!2scl"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de KONSTANDER en Lampa"
            />
          )}
        </div>
      </div>
    </section>
  );
};
