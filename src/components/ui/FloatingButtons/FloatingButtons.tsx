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
    // Cache hero section reference and height to avoid repeated DOM queries
    let heroSection: Element | null = null;
    let heroHeight: number = 0;
    let threshold: number = 600; // fallback threshold
    let lastScrollY: number = 0;
    
    const initializeHeroSection = () => {
      // Check for both main hero section and page hero sections
      const mainHeroSection = document.querySelector('.heroSection');
      const pageHeroSection = document.querySelector('.pageHero');
      
      // Use whichever hero section is present
      heroSection = mainHeroSection || pageHeroSection;
      
      if (heroSection) {
        // Cache the height to avoid repeated offsetHeight calls
        heroHeight = (heroSection as HTMLElement).offsetHeight;
        threshold = heroHeight * 0.8;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if scroll position changed significantly (avoid micro-updates)
      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }
      
      lastScrollY = currentScrollY;
      
      if (heroSection) {
        // Use cached height and only call getBoundingClientRect once
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < threshold);
      } else {
        // Fallback: show after scrolling 600px if no hero section found
        setIsVisible(currentScrollY > 600);
      }
    };

    // Initialize hero section on mount
    initializeHeroSection();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        setTimeout(() => {
          handleScroll();
          ticking = false;
        }, 16); // ~60fps throttling
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
