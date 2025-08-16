'use client';

import React from 'react';
import { trackCTAClick, trackPhoneClick, trackEmailClick } from '@/lib/utils/tracking';
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  theme?: 'default' | 'whatsapp';
  target?: string;
  rel?: string;
  // Tracking props
  trackingSource?: string;
  trackingLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  size = 'md',
  fullWidth = false,
  className = '',
  theme = 'default',
  target,
  rel,
  trackingSource = 'unknown',
  trackingLabel,
}) => {
  const buttonClasses = [
    styles.button,
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    theme === 'whatsapp' ? styles.whatsapp : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (href) {
      const buttonText = trackingLabel || (typeof children === 'string' ? children : 'Button Click');
      
      if (href.startsWith('tel:')) {
        const phoneNumber = href.replace('tel:', '');
        trackPhoneClick(phoneNumber, trackingSource);
      } else if (href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '');
        trackEmailClick(email, trackingSource);
      } else {
        trackCTAClick(buttonText, href, trackingSource);
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        role="button"
        target={target}
        rel={rel}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};
