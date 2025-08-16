'use client';

import React from 'react';
import { COMPANY_INFO } from '@/config/pricing';
import { Copy, MapPin, Map, Navigation, Phone, Mail } from 'lucide-react';
import styles from './CompanyAddress.module.css';

interface CompanyAddressProps {
  variant?: 'default' | 'compact' | 'detailed';
  showDirections?: boolean;
  showCoordinates?: boolean;
  className?: string;
}

export const CompanyAddress: React.FC<CompanyAddressProps> = ({
  variant = 'default',
  showDirections = true,
  showCoordinates = false,
  className = '',
}) => {
  const containerClasses = [
    styles.companyAddress,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.address)}`;
    window.open(directionsUrl, '_blank');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address).then(() => {
      // You could add a toast notification here
      console.log('Dirección copiada al portapapeles');
    });
  };

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <h3 className={styles.title}>Dirección</h3>
        <button
          onClick={copyAddress}
          className={styles.copyButton}
          title="Copiar dirección"
          type="button"
        >
          <Copy size={16} />
        </button>
      </div>

      <div className={styles.addressContent}>
        <div className={styles.mainAddress}>
          <MapPin className={styles.addressIcon} size={20} />
          <div className={styles.addressText}>
            <span className={styles.streetAddress}>Panamericana Norte 17110</span>
            <span className={styles.cityRegion}>Lampa, Región Metropolitana</span>
            <span className={styles.country}>Chile</span>
          </div>
        </div>

        {showCoordinates && (
          <div className={styles.coordinates}>
            <span className={styles.coordinatesLabel}>Coordenadas:</span>
            <span className={styles.coordinatesValue}>
              {COMPANY_INFO.coordinates.lat}, {COMPANY_INFO.coordinates.lng}
            </span>
          </div>
        )}

        {variant === 'detailed' && (
          <div className={styles.addressDetails}>
            <div className={styles.detailSection}>
              <h4 className={styles.detailTitle}>Referencias</h4>
              <ul className={styles.referenceList}>
                <li>A 500 metros del semáforo principal de Lampa</li>
                <li>Cerca del centro comercial local</li>
                <li>Frente a la estación de servicio Shell</li>
                <li>Edificio con letrero &ldquo;KONSTANDER&rdquo; visible</li>
              </ul>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailTitle}>Características del Local</h4>
              <ul className={styles.featureList}>
                <li>Amplio patio para descarga</li>
                <li>Báscula industrial de alta capacidad</li>
                <li>Estacionamiento gratuito</li>
                <li>Acceso para camiones grandes</li>
                <li>Oficina de atención al público</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {showDirections && (
        <div className={styles.actions}>
          <button
            onClick={openInGoogleMaps}
            className={styles.actionButton}
            type="button"
          >
            <Map className={styles.buttonIcon} size={16} />
            Ver en Mapa
          </button>
          
          <button
            onClick={openDirections}
            className={`${styles.actionButton} ${styles.directionsButton}`}
            type="button"
          >
            <Navigation className={styles.buttonIcon} size={16} />
            Cómo Llegar
          </button>
        </div>
      )}



      {variant === 'detailed' && (
        <div className={styles.contactInfo}>
          <h4 className={styles.contactTitle}>¿Necesitas Ayuda?</h4>
          <div className={styles.contactOptions}>
            <a href={`tel:${COMPANY_INFO.phone}`} className={styles.contactLink}>
              <Phone className={styles.contactIcon} size={16} />
              <div>
                <span className={styles.contactLabel}>Teléfono</span>
                <span className={styles.contactValue}>{COMPANY_INFO.phone}</span>
              </div>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className={styles.contactLink}>
              <Mail className={styles.contactIcon} size={16} />
              <div>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{COMPANY_INFO.email}</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
