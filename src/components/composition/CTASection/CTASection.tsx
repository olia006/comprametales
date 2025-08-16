'use client';

import React from 'react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '@/components/buttons/SecondaryButton/SecondaryButton';
import styles from './CTASection.module.css';

interface CTAAction {
  type: 'primary' | 'secondary';
  text: string;
  href?: string;
  onClick?: () => void;
}

interface CTASectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions: CTAAction[];
  backgroundType?: 'solid' | 'gradient' | 'transparent';
  alignment?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  description,
  actions,
  backgroundType = 'gradient',
  alignment = 'center',
  size = 'md',
  className = '',
}) => {
  const sectionClasses = [
    styles.ctaSection,
    styles[backgroundType],
    styles[alignment],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className="container">
        <div className={styles.content}>
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
          
          <h2 className={styles.title}>{title}</h2>
          
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          
          <div className={styles.actions}>
            {actions.map((action, index) => {
              const key = `cta-action-${index}`;
              
              if (action.type === 'primary') {
                return (
                  <PrimaryButton
                    key={key}
                    href={action.href}
                    onClick={action.onClick}
                    size={size}
                  >
                    {action.text}
                  </PrimaryButton>
                );
              }
              
              return (
                <SecondaryButton
                  key={key}
                  href={action.href}
                  onClick={action.onClick}
                  size={size}
                >
                  {action.text}
                </SecondaryButton>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
