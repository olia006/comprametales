'use client';

import React from 'react';
import styles from './SecondaryButton.module.css';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  size = 'md',
  fullWidth = false,
  className = '',
  target,
  rel,
}) => {
  const buttonClasses = [
    styles.button,
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        role="button"
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};
