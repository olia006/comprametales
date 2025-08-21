import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './BreadcrumbNav.module.css';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, className = '' }) => {
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://comprametales.cl${item.href}`
    }))
  };

  const breadcrumbClasses = [styles.breadcrumbNav, className].filter(Boolean).join(' ');

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData, null, 2)
          }}
        />
      </Head>
      
      <nav className={breadcrumbClasses} aria-label="Breadcrumb">
        <div className="container">
          <ol className={styles.breadcrumbList}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              
              return (
                <li key={item.href} className={styles.breadcrumbItem}>
                  {isLast ? (
                    <span 
                      className={styles.breadcrumbCurrent}
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link 
                        href={item.href} 
                        className={styles.breadcrumbLink}
                      >
                        {item.name}
                      </Link>
                      <span className={styles.breadcrumbSeparator} aria-hidden="true">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};
