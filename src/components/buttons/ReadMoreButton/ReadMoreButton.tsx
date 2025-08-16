'use client';

import React from 'react';
import styles from './ReadMoreButton.module.css';

interface ReadMoreButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  text?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  children,
  onClick,
  href,
  text = 'Leer más',
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const buttonClasses = [
    styles.readMoreButton,
    styles[size],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  const content = children || (
    <>
      <span>{text}</span>
      <svg 
        className={styles.arrow} 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </>
  );

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        role="button"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {content}
    </button>
  );
};
