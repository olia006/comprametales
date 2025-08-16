import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ExternalLink, Award, Scale, Target, Truck, Instagram, Facebook } from 'lucide-react';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = 2023;

  const navigationLinks = [
    { name: 'Inicio', href: '/', description: 'Página principal' },
    { name: 'Precios', href: '/precios', description: 'Cotizaciones actualizadas' },
    { name: 'Compra', href: '/materiales-aceptamos', description: 'Materiales que aceptamos' },
    { name: 'Venta', href: '/materiales-vendemos', description: 'Materiales en venta' },
    { name: 'Nosotros', href: '/nosotros', description: 'Acerca de KONSTANDER' },
    { name: 'Contacto', href: '/contacto', description: 'Información de contacto' }
  ];



  return (
    <footer className={styles.footer} role="contentinfo">
      
      <div className="container">
        <div className={styles.footerContent}>
          {/* Company Info Section */}
          <div className={styles.companySection}>
            <div className={styles.logo}>
              <h3 className={styles.logoText}>KONSTANDER</h3>
              <p className={styles.logoSubtext}>Compra de Metales y Chatarra</p>
              <p className={styles.logoLocation}>Santiago, Chile</p>
            </div>
            <p className={styles.companyDescription}>
              Compra de chatarra y metales (cobre, fierro, aluminio, bronce) en Santiago. 
              Precios competitivos, balanza certificada y pago inmediato.
            </p>
            <div className={styles.contactQuick}>
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className={styles.contactLink}
                aria-label="Llamar a KONSTANDER"
              >
                <Phone size={18} className={styles.contactIcon} aria-hidden="true" />
                {COMPANY_INFO.phone}
              </a>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className={styles.contactLink}
                aria-label="Enviar email a KONSTANDER"
              >
                <Mail size={18} className={styles.contactIcon} aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
              <div className={styles.socialLinks}>
                <a 
                  href="https://www.instagram.com/konstander.spa/" 
                  className={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Seguir a KONSTANDER en Instagram"
                >
                  <Instagram size={18} className={styles.socialIcon} aria-hidden="true" />
                  Instagram
                </a>
                <a 
                  href="https://www.facebook.com/compra.chatarra.konstander/" 
                  className={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Seguir a KONSTANDER en Facebook"
                >
                  <Facebook size={18} className={styles.socialIcon} aria-hidden="true" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Navegación del Sitio</h4>
            <nav aria-label="Enlaces del pie de página">
              <ul className={styles.linksList}>
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink} title={link.description}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>



          {/* Enhanced Contact Information */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Visítanos</h4>
            
            {/* Address Block */}
            <div className={styles.addressBlock}>
              <div className={styles.addressInfo}>
                <address className={styles.addressText}>{COMPANY_INFO.address}</address>
                <span className={styles.locationSubtext}>Lampa, Región Metropolitana</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className={styles.hoursBlock}>
              <Clock size={18} className={styles.clockIcon} aria-hidden="true" />
              <div className={styles.hoursInfo}>
                <span className={styles.hoursLabel}>Lunes a Domingo</span>
                <time className={styles.hoursTime}>8:00 - 18:00</time>
              </div>
            </div>


          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} KONSTANDER. Todos los derechos reservados.
            </p>
            
            <div className={styles.legalLinks}>
              <Link href="/terminos" className={styles.legalLink}>Términos y Condiciones</Link>
              <Link href="/privacidad" className={styles.legalLink}>Política de Privacidad</Link>
            </div>
            
            <p className={styles.creditText}>
              Sitio web desarrollado por{' '}
              <a 
                href="https://www.inui.studio" 
                className={styles.creditLink}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar inui.studio - Desarrollo web profesional"
              >
                inui.studio
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </p>
          </div>
          
          <div className={styles.seoFooter}>
            <p className={styles.seoText}>
              <strong>Compra de chatarra en Santiago, Chile</strong> | Metales ferrosos y no ferrosos | 
              Mejor precio por cobre, aluminio, fierro, bronce | Reciclaje de metales Región Metropolitana | 
              Chatarra industrial y doméstica | Servicio de retiro en Lampa | Cotización rápida
            </p>
          </div>
          

        </div>
      </div>
    </footer>
  );
};
