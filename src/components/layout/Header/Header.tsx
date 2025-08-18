'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';
import { Phone, Home, DollarSign, Package, ShoppingCart, Users, Contact } from 'lucide-react';
import { COMPANY_INFO } from '@/config/pricing';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackClick } = useInteractionTracking({ pageName: 'Header' });

  const toggleMenu = () => {
    trackClick('hamburger_menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  const navigationItems = [
    { name: 'Inicio', href: '/', icon: Home, description: 'Página principal' },
    { name: 'Precios', href: '/precios', icon: DollarSign, description: 'Cotizaciones actualizadas' },
    { name: 'Compra', href: '/materiales-aceptamos', icon: Package, description: 'Materiales que aceptamos' },
    { name: 'Venta', href: '/materiales-vendemos', icon: ShoppingCart, description: 'Materiales en venta' },
    { name: 'Nosotros', href: '/nosotros', icon: Users, description: 'Acerca de KONSTANDER' },
    { name: 'Contacto', href: '/contacto', icon: Contact, description: 'Información de contacto' }
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={closeMenu}>
              <Image 
                src="/images/logo_konstander_black.webp" 
                alt="KONSTANDER Logo" 
                width={240} 
                height={80} 
                className={styles.logoImage}
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNavigation} aria-label="Navegación principal">
            <ul className={styles.desktopNavigationList} role="list">
              {navigationItems.map((item) => (
                <li key={item.href} className={styles.desktopNavigationItem} role="listitem">
                  <Link 
                    href={item.href} 
                    className={styles.desktopNavigationLink}
                    aria-label={`${item.name}: ${item.description}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info - Desktop Only */}
          <div className={styles.contactInfo}>
            <a href={`tel:${COMPANY_INFO.phone}`} className={styles.phoneLink}>
              <Phone className={styles.phoneIcon} aria-hidden="true" />
              <span className={styles.phoneNumber}>{COMPANY_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            {...(isMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
          >
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav 
          className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
          aria-label="Navegación principal"
          role="navigation"
        >
          <ul className={styles.navigationList} role="list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href} className={styles.navigationItem} role="listitem">
                  <Link 
                    href={item.href} 
                    className={styles.navigationLink}
                    onClick={closeMenu}
                    aria-label={`${item.name}: ${item.description}`}
                  >
                    <IconComponent 
                      size={20} 
                      className={styles.navIcon} 
                      aria-hidden="true" 
                      focusable="false"
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* CTA Button in Mobile Menu */}
          <div className={styles.mobileCta}>
            <PrimaryButton 
              href="/contacto" 
              size="md" 
              fullWidth={true}
              onClick={closeMenu}
            >
              Cotizar Ahora
            </PrimaryButton>
          </div>
        </nav>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className={styles.overlay} 
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  );
};
