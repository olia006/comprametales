'use client';
import React from 'react';
import styles from './BackToTop.module.css';

export const BackToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.backToTopContainer}>
      <button
        onClick={scrollToTop}
        className={styles.backToTop}
        aria-label="Volver al inicio"
      >
        <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};
