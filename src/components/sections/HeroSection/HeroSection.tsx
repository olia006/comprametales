'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FaWhatsapp } from 'react-icons/fa';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';

import { COMPANY_INFO } from '@/config/pricing';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const { trackClick } = useInteractionTracking({ pageName: 'Homepage' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    // Always return cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        {/* Background Hero Image with Parallax Effect */}
        <Image
          src="/images/planta-industrial-konstander-chatarra-lampa.webp"
          alt="Planta industrial KONSTANDER para compra de chatarra y metales reciclados en Panamericana Norte 17110, Lampa, Región Metropolitana - equipos de pesaje y clasificación profesional"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.heroImage}
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark Overlay for Background Image Only */}
        <div className={styles.heroImageOverlay}></div>
        
        {/* Foreground 3D Hero Image with Parallax Effect */}
        <Image
          src="/images/equipos-clasificacion-metales-konstander.webp"
          alt="Equipos industriales KONSTANDER para clasificación y procesamiento de metales reciclados en Panamericana Norte 17110, Lampa, Región Metropolitana"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.heroImage3d}
          style={{
            transform: `translateY(${scrollY * 0.7}px)`,
          }}
        />
        
        {/* Slight Overlay for 3D Image */}
        <div className={styles.heroImage3dOverlay}></div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTitle}>
              <p className={styles.flexibleHours}>
                <span className={styles.desktopText}>Atención con horarios ajustables</span>
                <span className={styles.mobileText}>Horarios ajustables</span>
              </p>
              <h1 className={styles.mainTitle}>
                Compra de Chatarra y Metales en Lampa
              </h1>
              <p className={styles.subtitle}>
                Mejores precios en fierro, cobre, aluminio y más. Cotización rápida y pago al tiro.
              </p>
            </div>
            
            {/* Features temporarily removed as requested */}

            <div className={styles.heroActions}>
              <PrimaryButton 
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/\s/g, '')}?text=Hola, me interesa vender mis metales. ¿Podrían darme una cotización?`}
                size="md"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('whatsapp_cta_hero')}
              >
                Cotizar por WhatsApp
                <FaWhatsapp className={styles.icon} />
              </PrimaryButton>
              
              {/* Scroll Down Arrow */}
              <div className={styles.scrollArrow}>
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={styles.scrollArrowIcon}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>


          </div>

          <div className={styles.heroVisual}>
            {/* Price highlights removed as requested */}

            {/* Trust badges removed as requested */}
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>
    </section>
  );
};
