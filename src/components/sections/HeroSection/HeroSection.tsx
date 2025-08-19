'use client';
import React from 'react';
import Image from 'next/image';

import { FaWhatsapp } from 'react-icons/fa';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';

import { COMPANY_INFO } from '@/config/pricing';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const { trackClick } = useInteractionTracking({ pageName: 'Homepage' });

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <Image
          src="/images/herosection.webp?v=2"
          alt="Planta industrial de KONSTANDER para compra de chatarra y metales en Lampa, con equipos de pesaje y clasificación de materiales reciclados"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECA//EACUQAAIBAwMEAgMAAAAAAAAAAAECEQADIQQSMWFxgZETQRQi0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A2z0dOIeqJAAAAAElFTkSuQmCC"
        />
        <div className={styles.heroImageOverlay} />
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTitle}>
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

            <div className={styles.businessInfo}>
              <p className={styles.hoursFlexible}>
                {COMPANY_INFO.hoursFlexible}
              </p>
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
