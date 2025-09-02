import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ExternalLink, Instagram, Facebook, Home, DollarSign, Package, ShoppingCart, Users, Contact } from 'lucide-react';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = 2023;

  const navigationLinks = [
    { name: 'Inicio', href: '/', description: 'Página principal', icon: Home },
    { name: 'Precios', href: '/precios', description: 'Cotizaciones actualizadas', icon: DollarSign },
    { name: 'Compra', href: '/materiales-aceptamos', description: 'Materiales que aceptamos', icon: Package },
    { name: 'Venta', href: '/materiales-vendemos', description: 'Materiales en venta', icon: ShoppingCart },
    { name: 'Nosotros', href: '/nosotros', description: 'Acerca de KONSTANDER', icon: Users },
    { name: 'Contacto', href: '/contacto', description: 'Información de contacto', icon: Contact }
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
            </div>
            
            {/* Social Media */}
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/konstander.spa/" 
                className={styles.socialLink}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Seguir a KONSTANDER en Instagram"
              >
                <Instagram size={24} className={styles.socialIcon} aria-hidden="true" />
              </a>
              <a 
                href="https://www.facebook.com/compra.chatarra.konstander/" 
                className={styles.socialLink}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Seguir a KONSTANDER en Facebook"
              >
                <Facebook size={24} className={styles.socialIcon} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Navegación</h4>
                                    <nav aria-label="Enlaces del pie de página">
                          <ul className={styles.linksList}>
                            {navigationLinks.map((link) => {
                              const IconComponent = link.icon;
                              return (
                                <li key={link.href} className={styles.linkItem}>
                                  <Link href={link.href} className={styles.footerLink} title={link.description}>
                                    <IconComponent size={16} className={styles.navIcon} aria-hidden="true" />
                                    <span>{link.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            
            <div className={styles.contactBlock}>
              {/* Contact Methods */}
              <div className={styles.contactMethods}>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className={`${styles.contactLink} ${styles.primaryContact}`}
                  aria-label="Llamar a KONSTANDER"
                >
                  <Phone size={20} className={styles.contactIcon} aria-hidden="true" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className={styles.contactLink}
                  aria-label="Enviar email a KONSTANDER"
                >
                  <Mail size={20} className={styles.contactIcon} aria-hidden="true" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>

              {/* Address */}
              <div className={styles.addressBlock}>
                <MapPin size={20} className={styles.contactIcon} aria-hidden="true" />
                <div className={styles.addressInfo}>
                  <address className={styles.addressText}>{COMPANY_INFO.address}</address>
                </div>
              </div>

              {/* Business Hours */}
              <div className={styles.hoursBlock}>
                <Clock size={20} className={styles.clockIcon} aria-hidden="true" />
                <div className={styles.hoursInfo}>
                  <span className={styles.hoursLabel}>Lunes a Domingo</span>
                  <time className={styles.hoursTime}>8:00 - 21:00</time>
                </div>
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
              <Link href="/terminos" className={styles.legalLink}>Términos</Link>
              <Link href="/privacidad" className={styles.legalLink}>Privacidad</Link>
            </div>
            
            <p className={styles.creditText}>
              Desarrollado por{' '}
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
          
          <div className={styles.businessInfo}>
            <p className={styles.businessText}>
              Compra de metales y chatarra en Santiago • Precios competitivos • Servicio en Región Metropolitana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
