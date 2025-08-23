import React from 'react';
import Image from 'next/image';
import { MaterialPrice, formatPrice } from '@/config/pricing';
import styles from './MaterialGrid.module.css';

interface MaterialGridProps {
  title: string;
  subtitle?: string;
  description?: string;
  materials: MaterialPrice[];
  examples?: string[];
  showPrices?: boolean;
  isForSale?: boolean;
  categoryColor?: 'primary' | 'secondary';
  className?: string;
  images?: { [key: string]: string };
}

export const MaterialGrid: React.FC<MaterialGridProps> = ({
  title,
  subtitle,
  description,
  materials,
  examples = [],
  showPrices = true,
  isForSale = false,
  categoryColor = 'primary',
  className = '',
  images = {},
}) => {
  const containerClasses = [
    styles.materialGrid,
    styles[categoryColor],
    className
  ].filter(Boolean).join(' ');

  // Commented out for now, not currently used
  /* const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ferrosos':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            <path d="M4 14L5.09 18.26L10 19L5.09 19.74L4 24L2.91 19.74L-2 19L2.91 18.26L4 14Z" />
          </svg>
        );
      case 'no-ferrosos':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M9 11H7L9 13H15L17 11H15L13 9H11L9 11ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z" />
          </svg>
        );
      case 'especiales':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12S10.07 8.5 12 8.5 15.5 10.07 15.5 12 13.93 15.5 12 15.5ZM19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.72 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.72 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" />
          </svg>
        );
    }
  }; */

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'ferrosos':
        return 'Ferroso';
      case 'no-ferrosos':
        return 'No Ferroso';
      case 'especiales':
        return 'Especial';
      default:
        return 'Material';
    }
  };

  const getSEOAltText = (material: any) => {
    const baseAlt = `${material.nameEs} - chatarra de ${getCategoryName(material.category).toLowerCase()} reciclado`;
    const locationKeywords = 'compra en Panamericana Norte 17110, Lampa, Región Metropolitana - KONSTANDER';
    
    // Add specific descriptions for different materials
    switch (material.name) {
      case 'Iron Short':
        return `${baseAlt} de hasta 1 metro - ${locationKeywords}`;
      case 'Iron Long':
        return `${baseAlt} de hasta 2 metros - ${locationKeywords}`;
      case 'Iron Mixed':
        return `${baseAlt} clasificado y limpio - ${locationKeywords}`;
      case 'Tinplate Steel':
        return `${baseAlt} de latas y envases - ${locationKeywords}`;
      case 'Cast Iron':
        return `${baseAlt} fundido industrial - ${locationKeywords}`;
      case 'Iron Turnings':
        return `${baseAlt} viruta - ${locationKeywords}`;
      default:
        return `${baseAlt} - ${locationKeywords}`;
    }
  };

  return (
    <section className={containerClasses}>
      <div className={styles.header}>
        {subtitle && (
          <span className={styles.subtitle}>{subtitle}</span>
        )}
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {materials.length > 0 && (
        <div className={styles.materialsSection}>
          <div className={styles.materialsGrid}>
            {materials.map((material) => (
              <div key={material.name} className={styles.materialCard}>
                {images[material.name] && (
                  <div className={styles.materialImage}>
                    <Image
                      src={images[material.name]}
                      alt={getSEOAltText(material)}
                      width={180}
                      height={320}
                      className={styles.image}
                      sizes="180px"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R4DW"
                    />
                  </div>
                )}
                <div className={styles.materialHeader}>
                  <div className={styles.materialInfo}>
                    <h4 className={styles.materialName}>{material.nameEs}</h4>
                  </div>
                </div>
                
                {material.description && (
                  <p className={styles.materialDescription}>
                    {material.description}
                  </p>
                )}
                
                {showPrices && (
                  <div className={styles.materialPrice}>
                    <span className={styles.priceLabel}>
                      {isForSale ? 'Precio:' : 'Precio:'}
                    </span>
                    <span className={styles.priceValue}>
                      {formatPrice(material.pricePerKg)}<span className={styles.unit}>/kg</span>
                    </span>
                  </div>
                )}
                
                <div className={styles.materialMeta}>
                  <span className={styles.lastUpdated}>
                    Actualizado: {material.lastUpdated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {examples.length > 0 && (
        <div className={styles.examplesSection}>
          <h4 className={styles.sectionTitle}>
            {isForSale ? 'Productos Disponibles' : 'Ejemplos de Materiales'}
          </h4>
          <div className={styles.examplesGrid}>
            {examples.map((example, index) => (
              <div key={index} className={styles.exampleCard}>
                <span className={styles.exampleIcon}>✓</span>
                <span className={styles.exampleText}>{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}


    </section>
  );
};
