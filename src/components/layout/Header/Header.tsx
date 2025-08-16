'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';
import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/config/pricing';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Precios', href: '/precios' },
    { name: 'Compra', href: '/materiales-aceptamos' },
    { name: 'Venta', href: '/materiales-vendemos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' }
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={closeMenu}>
              <Image 
                src="/images/logo_konstander_black.png" 
                alt="KONSTANDER Logo" 
                width={240} 
                height={80} 
                className={styles.logoImage}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNavigation}>
            <ul className={styles.desktopNavigationList}>
              {navigationItems.map((item) => (
                <li key={item.href} className={styles.desktopNavigationItem}>
                  <Link 
                    href={item.href} 
                    className={styles.desktopNavigationLink}
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
        <nav className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}>
          <ul className={styles.navigationList}>
            {navigationItems.map((item) => (
              <li key={item.href} className={styles.navigationItem}>
                <Link 
                  href={item.href} 
                  className={styles.navigationLink}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
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
