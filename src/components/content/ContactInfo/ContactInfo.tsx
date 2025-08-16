import React from 'react';
import { COMPANY_INFO } from '@/config/pricing';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './ContactInfo.module.css';

interface ContactInfoProps {
  variant?: 'default' | 'compact' | 'detailed';
  showEmail?: boolean;
  showPhone?: boolean;
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  variant = 'default',
  showEmail = true,
  showPhone = true,
  className = '',
}) => {
  const containerClasses = [
    styles.contactInfo,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <h3 className={styles.title}>Información de Contacto</h3>
      
      <div className={styles.contactList}>
        {showPhone && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Phone className={styles.icon} size={24} />
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Teléfono</span>
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className={styles.contactValue}
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        )}

        {showEmail && (
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Mail className={styles.icon} size={24} />
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Email</span>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className={styles.contactValue}
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        )}

        <div className={styles.contactItem}>
                      <div className={styles.contactIcon}>
              <MapPin className={styles.icon} size={24} />
            </div>
          <div className={styles.contactDetails}>
            <span className={styles.contactLabel}>Dirección</span>
            <span className={styles.contactValue}>
              {COMPANY_INFO.address}
            </span>
          </div>
        </div>


      </div>

      {variant === 'detailed' && (
        <div className={styles.additionalInfo}>
          <div className={styles.infoSection}>
            <h4 className={styles.infoTitle}>Servicios Disponibles</h4>
            <ul className={styles.servicesList}>
              <li>Evaluación gratuita de materiales</li>
              <li>Pago inmediato en efectivo</li>
              <li>Recepción de grandes volúmenes</li>
              <li>Asesoría especializada</li>
            </ul>
          </div>
          
          <div className={styles.infoSection}>
            <h4 className={styles.infoTitle}>Formas de Contacto</h4>
            <ul className={styles.contactMethods}>
              <li>Teléfono directo</li>
              <li>WhatsApp</li>
              <li>Email</li>
              <li>Visita presencial</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
