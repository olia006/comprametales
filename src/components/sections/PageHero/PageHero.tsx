import React from 'react';
import { DynamicBackground } from './DynamicBackground';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundType?: 'default' | 'gradient' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  backgroundImage?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundType = 'default',
  size = 'md',
  className = '',
  backgroundImage,
}) => {
  const heroClasses = [
    styles.pageHero,
    styles[backgroundType],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={heroClasses} data-hero="page">
      <div className="container">
        <div className={styles.heroContent}>
          {subtitle && (
            <span className={styles.subtitle}>{subtitle}</span>
          )}
          
          <h1 className={styles.title}>{title}</h1>
          
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        {backgroundImage && <DynamicBackground backgroundImage={backgroundImage} />}
        <div className={styles.gradientOverlay}></div>
      </div>
    </section>
  );
};
