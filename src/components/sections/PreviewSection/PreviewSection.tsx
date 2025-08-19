import React from 'react';
import Image from 'next/image';
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
                    { src: '/images/MaterialesqueAceptamos/fierro.webp', title: 'Fierro', description: 'Chatarra de acero ferroso', alt: 'Chatarra de fierro y acero ferroso - compra al mejor precio en Santiago' },
                    { src: '/images/MaterialesqueAceptamos/cobre.webp', title: 'Cobre', description: 'Cables y tuberías', alt: 'Cobre reciclado - cables, tuberías y chatarra de cobre con cotización diaria' },
                    { src: '/images/MaterialesqueAceptamos/aluminio.webp', title: 'Aluminio', description: 'Perfiles y latas', alt: 'Aluminio reciclado - perfiles, latas y chatarra de aluminio con pago inmediato' },
                    { src: '/images/MaterialesqueAceptamos/bronce.webp', title: 'Bronce', description: 'Grifería y válvulas', alt: 'Bronce y aleaciones - grifería, válvulas y piezas de bronce reciclado' },
                    { src: '/images/MaterialesqueAceptamos/acero.webp', title: 'Acero Inoxidable', description: 'Utensilios industriales', alt: 'Acero inoxidable - utensilios, equipos industriales y estructuras inoxidables' },
                    { src: '/images/MaterialesqueAceptamos/electrico.webp', title: 'Material Eléctrico', description: 'Cables y transformadores', alt: 'Cables eléctricos y transformadores - reciclaje de material eléctrico con cobre' },
                  ].map((item) => (
                    <div key={item.title} className={`${styles.imageCard} group`}>
                      <Image 
                        src={item.src} 
                        alt={item.alt}
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={styles.imageOverlay}></div>
                      <div className={styles.imageContent}>
                        <h4 className={styles.imageTitle}>{item.title}</h4>
                        <p className={styles.imageDescription}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {id === 'materiales-vendemos' && (
                <div className={styles.acceptImagesGrid}>
                  {[
                    { src: '/images/MaterialesUsadosenVenta/armatura_3.webp', title: 'Armaduras y Estructuras', description: 'Acero estructural reciclado', alt: 'Armaduras de acero estructural recicladas para construcción' },
                    { src: '/images/MaterialesUsadosenVenta/Barras_3.webp', title: 'Barras de Refuerzo', description: 'Para hormigón armado', alt: 'Barras de refuerzo de acero recicladas para hormigón armado' },
                    { src: '/images/MaterialesUsadosenVenta/perfiles-acero.webp', title: 'Perfiles Estructurales', description: 'Tipo H, I y U', alt: 'Perfiles de acero reciclados tipo H, I y U para construcción industrial' },
                    { src: '/images/MaterialesUsadosenVenta/planchas-metal.webp', title: 'Planchas Metálicas', description: 'Diversos grosores', alt: 'Planchas de acero recicladas de diversos grosores para proyectos industriales' },
                    { src: '/images/MaterialesUsadosenVenta/vigas-acero.webp', title: 'Vigas de Acero', description: 'Para construcción', alt: 'Vigas de acero estructural recicladas para construcción de galpones y estructuras' },
                    { src: '/images/MaterialesUsadosenVenta/tuberia-industrial.webp', title: 'Tubería Industrial', description: 'Instalaciones industriales', alt: 'Tubería de acero reciclada para instalaciones industriales y sistemas de transporte' },
                  ].map((item) => (
                    <div key={item.title} className={`${styles.imageCard} group`}>
                      <Image 
                        src={item.src} 
                        alt={item.alt}
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={styles.imageOverlay}></div>
                      <div className={styles.imageContent}>
                        <h4 className={styles.imageTitle}>{item.title}</h4>
                        <p className={styles.imageDescription}>{item.description}</p>
                      </div>
                    </div>
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
                    preload="metadata"
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
