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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        {/* Background Hero Image with Parallax Effect */}
        <Image
          src="/images/herosectionbackground3d.webp"
          alt="Planta industrial de KONSTANDER para compra de chatarra y metales en Lampa, con equipos de pesaje y clasificación de materiales reciclados"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.heroImage}
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Foreground 3D Hero Image with Parallax Effect */}
        <Image
          src="/images/herosection3d.webp"
          alt="3D Hero Overlay for Testing"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.heroImage3d}
          style={{
            transform: `translateY(${scrollY * 0.7}px)`,
          }}
        />
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
                Compra de <span className={styles.highlight}>Chatarra</span> y{' '}
                <span className={styles.highlight}>Metales</span> en Lampa
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
