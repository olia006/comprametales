'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ReadMoreButton.module.css';

interface ReadMoreButtonProps {
  href: string;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  href,
  text = 'Más Detalles',
  className = '',
  onClick,
}) => {
  const buttonClasses = [styles.learnMore, className].filter(Boolean).join(' ');

  return (
    <Link href={href} className={buttonClasses} onClick={onClick}>
      <span className={styles.circle} aria-hidden="true">
        <span className={`${styles.icon} ${styles.arrow}`}></span>
      </span>
      <span className={styles.buttonText}>{text}</span>
    </Link>
  );
};
