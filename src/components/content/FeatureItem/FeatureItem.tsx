'use client';

import React from 'react';
import styles from './FeatureItem.module.css';

export interface FeatureItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  description?: string;
  className?: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, label, description, className = '' }) => {
  return (
    <li className={[styles.item, className].filter(Boolean).join(' ')} role="listitem" aria-label={label}>
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon className={styles.icon} />
      </span>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </div>
    </li>
  );
};

export default FeatureItem;


