'use client';

import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/config/pricing';
import { MapPin, Navigation, Car, Truck, Scale, Users, Phone, Mail } from 'lucide-react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '@/components/buttons/SecondaryButton/SecondaryButton';
import styles from './Map.module.css';

interface MapProps {
  height?: '400px' | '500px' | '600px';
  showDirections?: boolean;
  showFullAddress?: boolean;
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  height = '400px',
  showDirections = true,
  showFullAddress = true,
  className = '',
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const containerClasses = [styles.mapContainer, className].filter(Boolean).join(' ');

  // Add timeout for slow loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapLoaded && !mapError) {
        setLoadingTimeout(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [mapLoaded, mapError]);

  // Working Google Maps embed URL for KONSTANDER location
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1234567890123!2d-70.7276479!3d-33.3122341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662bf731aa77e4f%3A0x1c4f941e1ff7c2a6!2sPanamericana%20Norte%2017110%2C%20Lampa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1sen!2scl!4v1234567890123";
  
  // Fallback to OpenStreetMap if Google Maps fails
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-70.7766,-33.3248,-70.6966,-33.2648&layer=mapnik&marker=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}`;

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMapError = () => {
    setMapError(true);
  };

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.address)}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className={containerClasses}>
      <div className={styles.mapHeader}>
        <h3 className={styles.mapTitle}>Nuestra Ubicación</h3>
        {showFullAddress && (
          <p className={styles.address}>{COMPANY_INFO.address}</p>
        )}
      </div>

      <div className={`${styles.mapWrapper} ${styles[height] || ''}`}>
        {!mapError ? (
          <iframe
            src={googleMapsEmbedUrl}
            className={styles.mapFrame}
            width="100%"
            height="100%"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de KONSTANDER"
            onLoad={handleMapLoad}
            onError={handleMapError}
            loading="lazy"
          />
        ) : (
          <div className={styles.mapFallback}>
            <div className={styles.fallbackContent}>
              <MapPin className={styles.fallbackIcon} size={32} />
              <h4 className={styles.fallbackTitle}>Mapa no disponible</h4>
              <p className={styles.fallbackText}>
                No se pudo cargar el mapa. Usa los botones de abajo para obtener direcciones.
              </p>
              <div className={styles.fallbackAddress}>
                <strong>{COMPANY_INFO.address}</strong>
              </div>
            </div>
          </div>
        )}

        {!mapLoaded && !mapError && (
          <div className={styles.mapLoading}>
            <div className={styles.loadingSpinner}></div>
            <span className={styles.loadingText}>
              {loadingTimeout ? 'Cargando mapa... (puede tomar unos segundos)' : 'Cargando mapa...'}
            </span>
            {loadingTimeout && (
              <p className={styles.loadingHint}>
                Si el mapa no carga, usa los botones de abajo para ver la ubicación
              </p>
            )}
          </div>
        )}
      </div>

      <div className={styles.mapActions}>
        <PrimaryButton
          onClick={openInGoogleMaps}
          size="md"
        >
          <MapPin size={16} />
          Ver en Google Maps
        </PrimaryButton>
        
        {showDirections && (
          <SecondaryButton
            onClick={openDirections}
            size="md"
          >
            <Navigation size={16} />
            Cómo Llegar
          </SecondaryButton>
        )}
      </div>

      <div className={styles.locationInfo}>
        <div className={styles.infoGrid}>

          
          <div className={styles.infoItem}>
            <Car className={styles.infoIcon} size={20} />
            <div className={styles.infoContent}>
              <h4 className={styles.infoTitle}>Estacionamiento</h4>
              <p className={styles.infoText}>
                Amplio estacionamiento gratuito disponible
              </p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <Truck className={styles.infoIcon} size={20} />
            <div className={styles.infoContent}>
              <h4 className={styles.infoTitle}>Acceso Camiones</h4>
              <p className={styles.infoText}>
                Acceso especial para vehículos de carga pesada
              </p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <Scale className={styles.infoIcon} size={20} />
            <div className={styles.infoContent}>
              <h4 className={styles.infoTitle}>Balanza de Alta Capacidad</h4>
              <p className={styles.infoText}>
                Balanza industrial certificada para grandes volúmenes
              </p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <Users className={styles.infoIcon} size={20} />
            <div className={styles.infoContent}>
              <h4 className={styles.infoTitle}>Personal Especializado</h4>
              <p className={styles.infoText}>
                Equipo experto en evaluación y clasificación de metales
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
