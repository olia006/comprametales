import React from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { FloatingButtons } from '@/components/ui/FloatingButtons/FloatingButtons';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      <Header />
      <main className={styles.main} role="main">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};
