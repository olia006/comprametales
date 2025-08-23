/**
 * Single source of truth for price update date
 * This ensures consistency across all components that display price update information
 * Calculates the actual last update date from material data
 */

import { MaterialPrice } from '@/config/pricing';

export function getPriceUpdateDate(materials?: MaterialPrice[]): string {
  // Use fixed string to prevent hydration mismatch
  // toLocaleDateString() can produce different results between server and client
  if (!materials || materials.length === 0) {
    return '15 de enero de 2024';
  }

  // Calculate the latest update date from actual material data
  const dates = materials.map(m => new Date(m.lastUpdated || '2024-01-15').getTime());
  const latestDate = new Date(Math.max(...dates));
  
  // Use fixed string format to ensure server/client consistency
  const day = latestDate.getDate();
  const month = latestDate.getMonth();
  const year = latestDate.getFullYear();
  
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  return `${day} de ${monthNames[month]} de ${year}`;
}

export function getPriceUpdateText(materials?: MaterialPrice[]): string {
  return `Precios actualizados: ${getPriceUpdateDate(materials)}`;
}

export function getPriceUpdateDescription(materials?: MaterialPrice[]): string {
  return `Consulta nuestros precios competitivos para todos los tipos de metales. ${getPriceUpdateText(materials)} según el mercado internacional.`;
}
