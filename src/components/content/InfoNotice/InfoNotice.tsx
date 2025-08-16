'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './InfoNotice.module.css';

interface InfoNoticeProps {
  title: string;
  items: string[];
  className?: string;
}

export const InfoNotice: React.FC<InfoNoticeProps> = ({
  title,
  items,
  className = '',
}) => {
  const containerClasses = [
    styles.infoNotice,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <AlertTriangle className={styles.titleIcon} size={24} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.bullet}>•</span>
            <span className={styles.text}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
