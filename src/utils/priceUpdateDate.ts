/**
 * Single source of truth for price update date
 * This ensures consistency across all components that display price update information
 * Calculates the actual last update date from material data
 */

import { MaterialPrice } from '@/config/pricing';

export function getPriceUpdateDate(materials?: MaterialPrice[]): string {
  if (!materials || materials.length === 0) {
    // Fallback to current date if no materials provided
    return new Date().toLocaleDateString('es-CL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  // Calculate the latest update date from actual material data
  const dates = materials.map(m => new Date(m.lastUpdated || new Date()).getTime());
  const latestDate = new Date(Math.max(...dates));
  
  return latestDate.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getPriceUpdateText(materials?: MaterialPrice[]): string {
  return `Precios actualizados: ${getPriceUpdateDate(materials)}`;
}

export function getPriceUpdateDescription(materials?: MaterialPrice[]): string {
  return `Consulta nuestros precios competitivos para todos los tipos de metales. ${getPriceUpdateText(materials)} según el mercado internacional.`;
}
