'use client';

import React, { useState } from 'react';
import { MaterialPrice, formatPrice } from '@/config/pricing';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle } from 'lucide-react';
import styles from './PriceTable.module.css';

interface PriceTableProps {
  title: string;
  description?: string;
  materials: MaterialPrice[];
  categoryColor?: 'primary' | 'secondary';
  showFilters?: boolean;
  showLastUpdated?: boolean;
  className?: string;
}

export const PriceTable: React.FC<PriceTableProps> = ({
  title,
  description,
  materials,
  categoryColor = 'primary',
  showFilters = true,
  showLastUpdated = true,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'price'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const containerClasses = [
    styles.priceTable,
    styles[categoryColor],
    className
  ].filter(Boolean).join(' ');

  // Filter and sort materials
  const filteredMaterials = materials
    .filter(material => 
      material.nameEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'price') {
        return (a.pricePerKg - b.pricePerKg) * multiplier;
      } else {
        return a.nameEs.localeCompare(b.nameEs) * multiplier;
      }
    });

  const handleSort = (field: 'name' | 'price') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: 'name' | 'price') => {
    if (sortBy !== field) {
      return <ChevronsUpDown size={16} />;
    }
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const getHighestPrice = () => {
    const prices = materials.map(m => m.pricePerKg).filter(price => price > 0);
    return prices.length > 0 ? Math.max(...prices) : 0;
  };

  const getLowestPrice = () => {
    const prices = materials.map(m => m.pricePerKg).filter(price => price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };



  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {showFilters && (
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          
          <div className={styles.sortButtons}>
            <button
              onClick={() => handleSort('name')}
              className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
            >
              Nombre {getSortIcon('name')}
            </button>
            <button
              onClick={() => handleSort('price')}
              className={`${styles.sortButton} ${sortBy === 'price' ? styles.active : ''}`}
            >
              Precio {getSortIcon('price')}
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.headerCell}>Material</th>
                <th className={styles.headerCell}>Categoría</th>
                <th className={styles.headerCell}>Precio por Kg</th>
                {showLastUpdated && (
                  <th className={styles.headerCell}>Actualizado</th>
                )}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredMaterials.map((material) => (
                <tr key={material.name} className={styles.tableRow}>
                  <td className={styles.materialCell}>
                    <div className={styles.materialInfo}>
                      <span className={styles.materialName}>{material.nameEs}</span>
                      {material.description && (
                        <span className={styles.materialDescription}>
                          {material.description}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={styles.categoryCell}>
                    <span className={styles.categoryBadge}>
                      {material.category === 'ferrosos' ? 'Ferroso' :
                       material.category === 'no-ferrosos' ? 'No Ferroso' : 'Especial'}
                    </span>
                  </td>
                  <td className={styles.priceCell}>
                    <span className={styles.price}>
                      {material.pricePerKg === 0 ? 'Consultar' : formatPrice(material.pricePerKg)}
                    </span>
                  </td>

                  {showLastUpdated && (
                    <td className={styles.dateCell}>
                      <span className={styles.updateDate}>
                        {material.lastUpdated}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMaterials.length === 0 && (
        <div className={styles.emptyState}>
          <AlertCircle className={styles.emptyIcon} size={48} />
          <h3 className={styles.emptyTitle}>No se encontraron materiales</h3>
          <p className={styles.emptyMessage}>
            Intenta con un término de búsqueda diferente
          </p>
        </div>
      )}

      <div className={styles.summary}>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Materiales</span>
            <span className={styles.summaryValue}>{materials.length}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Precio Más Alto</span>
            <span className={styles.summaryValue}>{formatPrice(getHighestPrice())}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Precio Más Bajo</span>
            <span className={styles.summaryValue}>{formatPrice(getLowestPrice())}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Moneda</span>
            <span className={styles.summaryValue}>Pesos Chilenos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
