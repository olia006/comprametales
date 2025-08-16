import React from 'react';
import Image from 'next/image';
import styles from './MaterialPreviewCard.module.css';

interface MaterialPreviewCardProps {
  src: string;
  alt: string;
  label?: string;
  showLabel?: boolean;
  priority?: boolean;
}

export const MaterialPreviewCard: React.FC<MaterialPreviewCardProps> = ({
  src,
  alt,
  label,
  showLabel = true,
  priority = false,
}) => {
  return (
    <div className={styles.card} role="group" aria-label={label || alt}>
      <div className={styles.imageWrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
          priority={priority}
          className={styles.image}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>
      {showLabel && label && (
        <div className={styles.label}>
          {label}
        </div>
      )}
    </div>
  );
};


