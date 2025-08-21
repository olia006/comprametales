'use client';
import React from 'react';
import Image from 'next/image';
import { ReadMoreButton } from '@/components/buttons/ReadMoreButton/ReadMoreButton';
import { formatPrice, MaterialPrice } from '@/config/pricing';
import { getPriceUpdateText } from '@/utils/priceUpdateDate';
import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';

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
              <span className={`${styles.subtitle} scroll-reveal`}>{subtitle}</span>
              <h2 className={`${styles.title} scroll-reveal delay-1`}>{title}</h2>
              <p className={`${styles.description} scroll-reveal delay-2`}>{description}</p>
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
                text="Más Detalles"
              />
            </div>
          </div>
          
          {topPrices && (
            <div className={styles.visualContent}>
              <div className={styles.pricesPreview}>
                <h3 className={`${styles.pricesTitle} scroll-reveal`}>Precios Destacados</h3>
                <div className={styles.pricesList}>
                  {topPrices.map((material, index) => (
                    <div key={material.name} className={`${styles.priceItem} scroll-reveal delay-${Math.min(index + 1, 3)}`}>
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
                <div className={`${styles.pricesNote} scroll-reveal delay-3`}>
                  <small>{getPriceUpdateText(topPrices)}</small>
                </div>
              </div>
            </div>
          )}
          
          {!topPrices && id !== 'contacto' && (
            <div className={styles.visualContent}>
              {id === 'materiales-aceptamos' && (
                <div className={styles.acceptImagesGrid}>
                  {[
                    { src: '/images/MaterialesqueAceptamos/fierro-reciclado-compra-konstander-lampa.webp', title: 'Fierro', description: 'Chatarra de acero ferroso', alt: 'Chatarra de fierro y acero ferroso - compra al mejor precio en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesqueAceptamos/cobre-reciclado-compra-konstander-lampa.webp', title: 'Cobre', description: 'Cables y tuberías', alt: 'Cobre reciclado - cables, tuberías y chatarra de cobre con cotización diaria en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesqueAceptamos/aluminio-reciclado-compra-konstander-lampa.webp', title: 'Aluminio', description: 'Perfiles y latas', alt: 'Aluminio reciclado - perfiles, latas y chatarra de aluminio con pago inmediato en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesqueAceptamos/bronce-reciclado-compra-konstander-lampa.webp', title: 'Bronce', description: 'Grifería y válvulas', alt: 'Bronce y aleaciones - grifería, válvulas y piezas de bronce reciclado en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesqueAceptamos/acero-reciclado-compra-konstander-lampa.webp', title: 'Acero Inoxidable', description: 'Utensilios industriales', alt: 'Acero inoxidable - utensilios, equipos industriales y estructuras inoxidables en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesqueAceptamos/placas-electronicas-chatarra-konstander-lampa.webp', title: 'Chatarra Electrónica', description: 'Placas electrónicas', alt: 'Chatarra electrónica - placas electrónicas, circuitos y componentes electrónicos en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                  ].map((item, index) => (
                    <div key={item.title} className={`${styles.imageCard} group scroll-reveal delay-${Math.min(index + 1, 3)}`}>
                      <Image 
                        src={item.src} 
                        alt={item.alt}
                        width={180}
                        height={320}
                        sizes="180px"
                        loading="lazy"
                        placeholder="blur"
                        quality={85}
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={styles.imageOverlay}></div>
                      <div className={styles.imageContent}>
                        <h3 className={styles.imageTitle}>{item.title}</h3>
                        <p className={styles.imageDescription}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {id === 'materiales-vendemos' && (
                <div className={styles.acceptImagesGrid}>
                  {[
                    { src: '/images/MaterialesUsadosenVenta/barras-refuerzo-acero-hormigon-lampa.webp', title: 'Barras de Refuerzo', description: 'Para hormigón armado', alt: 'Barras de refuerzo de acero recicladas para hormigón armado en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesUsadosenVenta/fierro-construccion-reciclado-santiago.webp', title: 'Fierro Construcción', description: 'Diferentes tamaños', alt: 'Fierro de construcción reciclado económico para obras en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesUsadosenVenta/fierro-estriado-construccion-lampa.webp', title: 'Fierro Estriado', description: 'Diferentes tamaños', alt: 'Fierro estriado reciclado resistente para construcción en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesUsadosenVenta/tuberia-acero-reciclada-lampa.webp', title: 'Tubería', description: 'Diferentes tamaños', alt: 'Tubería de acero reciclada de diferentes tamaños en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                    { src: '/images/MaterialesUsadosenVenta/tornillos-reciclados-construccion-santiago.webp', title: 'Tornillos', description: 'Diferentes tipos y tamaños', alt: 'Tornillos reciclados de diferentes tipos y tamaños para construcción' },
                    { src: '/images/MaterialesUsadosenVenta/pernos-anclaje-reciclados-lampa.webp', title: 'Perno Anclaje', description: 'Diferentes tamaños', alt: 'Pernos de anclaje reciclados resistentes de diferentes tamaños en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER' },
                  ].map((item, index) => (
                    <div key={item.title} className={`${styles.imageCard} group scroll-reveal delay-${Math.min(index + 1, 3)}`}>
                      <Image 
                        src={item.src} 
                        alt={item.alt}
                        width={180}
                        height={320}
                        sizes="180px"
                        loading="lazy"
                        placeholder="blur"
                        quality={85}
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={styles.imageOverlay}></div>
                      <div className={styles.imageContent}>
                        <h3 className={styles.imageTitle}>{item.title}</h3>
                        <p className={styles.imageDescription}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {id === 'nosotros' && (
                <div className={`${styles.videoBackground} scroll-reveal`}>
                  <LazyVideo
                    src="/images/aboutuspreview.mp4"
                    className={styles.backgroundVideo}
                    preload="metadata"
                    muted={true}
                    loop={true}
                    playsInline={true}
                  />
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
