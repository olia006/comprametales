'use client';
import React from 'react';
import { MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './FloatingButtons.module.css';

export const FloatingButtons: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.phone.replace(/\s/g, '')}?text=Hola, me interesa vender mis metales. ¿Podrían darme una cotización?`;
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`;

  return (
    <div className={styles.floatingButtons}>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        className={`${styles.floatingButton} ${styles.whatsappButton}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp size={24} />
        <span className={styles.buttonText}>WhatsApp</span>
      </a>

      {/* Directions Button */}
      <a
        href={directionsUrl}
        className={`${styles.floatingButton} ${styles.directionsButton}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver dirección en Google Maps"
      >
        <MapPin size={24} />
        <span className={styles.buttonText}>Dirección</span>
      </a>
    </div>
  );
};
