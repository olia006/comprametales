/**
 * Single source of truth for price update date
 * This ensures consistency across all components that display price update information
 * MANUAL DATE SYSTEM - Change MANUAL_UPDATE_DATE to update across entire website
 */



// ⚠️ MANUAL DATE CONTROL - Change this date to update across entire website
export const MANUAL_UPDATE_DATE = '29 de octubre de 2025';

export function getPriceUpdateDate(): string {
  // Return the manually set date - consistent across all components
  return MANUAL_UPDATE_DATE;
}

export function getPriceUpdateText(): string {
  return `Precios actualizados el ${getPriceUpdateDate()}`;
}

export function getPriceUpdateDescription(): string {
  return `Consulta nuestros precios competitivos para todos los tipos de metales. ${getPriceUpdateText()} según el mercado internacional.`;
}
