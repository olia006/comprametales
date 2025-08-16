'use client';
import React from 'react';
import styles from './SkeletonLoader.module.css';

interface SkeletonLoaderProps {
  variant: 'previewSection' | 'materialCard' | 'priceCard' | 'ctaSection';
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant,
  count = 1,
  className = '',
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'previewSection':
        return (
          <div className={`${styles.previewSectionSkeleton} ${className}`}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.textContent}>
                  <div className={styles.skeletonSubtitle}></div>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonDescription}></div>
                  <div className={styles.skeletonDescription}></div>
                  <div className={styles.skeletonButton}></div>
                </div>
                <div className={styles.visualContent}>
                  <div className={styles.skeletonImageGrid}>
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className={styles.skeletonCard}>
                        <div className={styles.skeletonImage}></div>
                        <div className={styles.skeletonLabel}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'materialCard':
        return (
          <div className={`${styles.materialCardSkeleton} ${className}`}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonLabel}></div>
          </div>
        );

      case 'priceCard':
        return (
          <div className={`${styles.priceCardSkeleton} ${className}`}>
            <div className={styles.skeletonTitle}></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.skeletonPriceItem}>
                <div className={styles.skeletonMaterialInfo}>
                  <div className={styles.skeletonMaterialName}></div>
                  <div className={styles.skeletonMaterialCategory}></div>
                </div>
                <div className={styles.skeletonPrice}></div>
              </div>
            ))}
            <div className={styles.skeletonNote}></div>
          </div>
        );

      case 'ctaSection':
        return (
          <div className={`${styles.ctaSectionSkeleton} ${className}`}>
            <div className={styles.container}>
              <div className={styles.skeletonSubtitle}></div>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonActions}>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className={styles.defaultSkeleton}></div>;
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonWrapper}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};
