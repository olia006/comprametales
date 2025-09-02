'use client';
import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './BusinessHours.module.css';

interface BusinessHoursProps {
  variant?: 'default' | 'compact' | 'detailed';
  showStatus?: boolean;
  className?: string;
}

export const BusinessHours: React.FC<BusinessHoursProps> = ({
  variant = 'default',
  showStatus = true,
  className = '',
}) => {
  // Hydration-safe state for business status
  const [status, setStatus] = useState<{
    isOpen: boolean;
    message: string;
    nextChange: string;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  const containerClasses = [
    styles.businessHours,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  // Check if business is currently open (client-side only)
  const getCurrentStatus = () => {
    // Get current time in Chilean timezone (GMT-3)
    const now = new Date();
    const chileanTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Santiago"}));
    const currentHour = chileanTime.getHours();
    
    // Business is open Monday-Sunday 8:00-21:00 (Chilean time)
    const isOpen = currentHour >= 8 && currentHour < 21;
    
    return {
      isOpen,
      message: isOpen ? 'Abierto ahora' : 'Cerrado ahora',
      nextChange: isOpen ? 'Cierra a las 21:00' : 'Abre a las 8:00'
    };
  };

  // Hydration-safe client detection and status calculation
  useEffect(() => {
    setIsClient(true);
    setStatus(getCurrentStatus());
  }, []);

  const weekDays = [
    { day: 'Lunes', hours: '8:00 - 21:00' },
    { day: 'Martes', hours: '8:00 - 21:00' },
    { day: 'Miércoles', hours: '8:00 - 21:00' },
    { day: 'Jueves', hours: '8:00 - 21:00' },
    { day: 'Viernes', hours: '8:00 - 21:00' },
    { day: 'Sábado', hours: '8:00 - 21:00' },
    { day: 'Domingo', hours: '8:00 - 21:00' }
  ];

  const getCurrentDay = () => {
    if (!isClient) {
      return null; // Return null during SSR to prevent hydration mismatch
    }
    const today = new Date().getDay();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dayNames[today];
  };

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <h2 className={styles.title}>Horarios de Atención</h2>
        {showStatus && status && (
          <div className={`${styles.statusBadge} ${status.isOpen ? styles.open : styles.closed}`}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>{status.message}</span>
          </div>
        )}
      </div>

      {variant === 'compact' ? (
        <div className={styles.compactView}>
          <div className={styles.mainHours}>
            <span className={styles.hoursText}>{COMPANY_INFO.hours}</span>
          </div>
          <div className={styles.flexibilityInfo}>
            <span className={styles.flexibilityText}>Horarios flexibles - se pueden coordinar</span>
          </div>
          {showStatus && status && (
            <div className={styles.statusInfo}>
              <span className={styles.nextChange}>{status.nextChange}</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.detailedView}>
          <div className={styles.hoursGrid}>
            {weekDays.map((item) => {
              const currentDay = getCurrentDay();
              const isToday = currentDay && item.day === currentDay;
              return (
                <div 
                  key={item.day} 
                  className={`${styles.dayRow} ${isToday ? styles.today : ''}`}
                >
                  <span className={styles.dayName}>{item.day}</span>
                  <span className={styles.dayHours}>{item.hours}</span>
                </div>
              );
            })}
          </div>
          
          {showStatus && status && (
            <div className={styles.statusInfo}>
              <p className={styles.statusMessage}>
                {status.nextChange}
              </p>
              <p className={styles.timezone}>
                Horario de Chile (GMT-3)
              </p>
            </div>
          )}
        </div>
      )}

      {variant === 'detailed' && (
        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h4 className={styles.infoTitle}>Información Adicional</h4>
            <ul className={styles.infoList}>
              <li>Atención todos los días del año</li>
              <li>Evaluación inmediata de materiales</li>
              <li>Sin cita previa necesaria</li>
              <li>Recepción de grandes volúmenes</li>
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h4 className={styles.infoTitle}>Horarios Flexibles</h4>
            <ul className={styles.infoList}>
              <li>Se pueden coordinar horarios convenientes</li>
              <li>Atención especial para grandes volúmenes</li>
              <li>Horarios extendidos según disponibilidad</li>
              <li>Consultas por teléfono: 24/7</li>
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h4 className={styles.infoTitle}>Mejores Horarios</h4>
            <ul className={styles.infoList}>
              <li>Mañanas: Menor espera</li>
              <li>Tardes: Evaluación más detallada</li>
              <li>Fines de semana: Disponible</li>
              <li>Horarios flexibles para su conveniencia</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
