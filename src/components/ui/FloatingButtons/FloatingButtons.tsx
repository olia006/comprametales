'use client';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './FloatingButtons.module.css';

export const FloatingButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.phone.replace(/\s/g, '')}?text=Hola, me interesa vender mis metales. ¿Podrían darme una cotización?`;
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`;

  useEffect(() => {
    const handleScroll = () => {
      // Check for both main hero section and page hero sections
      const mainHeroSection = document.querySelector('.heroSection');
      const pageHeroSection = document.querySelector('.pageHero');
      
      // Use whichever hero section is present
      const heroSection = mainHeroSection || pageHeroSection;
      
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show buttons when we've scrolled past 80% of the hero section
        const heroHeight = (heroSection as HTMLElement).offsetHeight;
        const threshold = heroHeight * 0.8;
        setIsVisible(heroBottom < threshold);
      } else {
        // Fallback: show after scrolling 600px if no hero section found
        setIsVisible(window.scrollY > 600);
      }
    };

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Check initial position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  return (
    <div className={`${styles.floatingButtons} ${isVisible ? styles.visible : styles.hidden}`}>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        className={`${styles.floatingButton} ${styles.whatsappButton}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp para cotización"
        title="Contactar por WhatsApp"
      >
        <FaWhatsapp size={24} aria-hidden="true" />
        <span className={styles.buttonText}>WhatsApp</span>
      </a>

      {/* Directions Button */}
      <a
        href={directionsUrl}
        className={`${styles.floatingButton} ${styles.directionsButton}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver ubicación de KONSTANDER en Google Maps"
        title="Ver dirección en Google Maps"
      >
        <MapPin size={24} aria-hidden="true" />
        <span className={styles.buttonText}>Dirección</span>
      </a>
    </div>
  );
};
