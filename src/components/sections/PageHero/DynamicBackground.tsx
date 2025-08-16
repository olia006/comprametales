'use client';
import React, { useEffect, useRef } from 'react';
import styles from './PageHero.module.css';

interface DynamicBackgroundProps {
  backgroundImage: string;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundImage }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current && backgroundImage) {
      bgRef.current.style.setProperty('--bg-image', `url(${backgroundImage})`);
    }
  }, [backgroundImage]);

  return <div ref={bgRef} className={styles.backgroundImage} />;
};
