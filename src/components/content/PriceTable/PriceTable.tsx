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
  showLastUpdated = true, // eslint-disable-line no-unused-vars
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

  // Helper functions for future use
  // eslint-disable-next-line no-unused-vars
  const getHighestPrice = () => {
    const prices = materials.map(m => m.pricePerKg).filter(price => price > 0);
    return prices.length > 0 ? Math.max(...prices) : 0;
  };

  // eslint-disable-next-line no-unused-vars
  const getLowestPrice = () => {
    const prices = materials.map(m => m.pricePerKg).filter(price => price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const getLastUpdateDate = () => {
    const dates = materials.map(m => new Date(m.lastUpdated).getTime());
    const latestDate = new Date(Math.max(...dates));
    return latestDate.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              id="material-search"
              name="materialSearch"
              type="text"
              placeholder="Buscar material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Buscar materiales por nombre"
              autoComplete="off"
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
          <table 
            className={styles.table}
            role="table"
            aria-label={`Tabla de precios: ${title}`}
            aria-describedby="table-summary"
          >
            <caption className={styles.tableCaption}>
              {title} - Lista de precios de materiales y metales. 
              {filteredMaterials.length > 0 ? 
                `Mostrando ${filteredMaterials.length} de ${materials.length} materiales.` : 
                'No hay materiales que coincidan con la búsqueda.'
              }
            </caption>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.headerCell} scope="col">Material</th>
                <th className={styles.headerCell} scope="col">Precio por Kg</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredMaterials.map((material) => (
                <tr 
                  key={material.name} 
                  className={styles.tableRow}
                >
                  <th 
                    className={styles.materialCell}
                    scope="row"
                    aria-label={`Material: ${material.nameEs}`}
                  >
                    <div className={styles.materialInfo}>
                      <span className={styles.materialName}>{material.nameEs}</span>
                      {material.description && (
                        <span className={styles.materialDescription}>
                          {material.description}
                        </span>
                      )}
                    </div>
                  </th>
                  <td 
                    className={styles.priceCell}
                    aria-label={`Precio: ${material.pricePerKg === 0 ? 'Consultar precio' : formatPrice(material.pricePerKg) + ' por kilogramo'}`}
                  >
                    <span className={styles.price}>
                      {material.pricePerKg === 0 ? 'Consultar' : formatPrice(material.pricePerKg)}
                    </span>
                  </td>
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

      <div className={styles.summary} id="table-summary">
        <div className={styles.updateNotice}>
          <p className={styles.updateText}>
            Precios actualizados el {getLastUpdateDate()}
          </p>
        </div>
      </div>
    </div>
  );
};
