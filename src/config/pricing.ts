// Universal Pricing Configuration - Change prices here to update across entire website
export interface MaterialPrice {
  name: string;
  nameEs: string;
  pricePerKg: number;
  currency: string;
  category: 'ferrosos' | 'no-ferrosos' | 'especiales';
  description?: string;
  lastUpdated: string;
}

export const PRICING_CONFIG: MaterialPrice[] = [
  // Materiales Ferrosos (FIERRO)
  {
    name: 'Iron Short',
    nameEs: 'Fierro Corto',
    pricePerKg: 230,
    currency: 'CLP',
    category: 'ferrosos',
    description: '1 metro de largo y más de 4mm de espesor',
    lastUpdated: '2025-08-23'
  },
  {
    name: 'Iron Long',
    nameEs: 'Fierro Largo',
    pricePerKg: 210,
    currency: 'CLP',
    category: 'ferrosos',
    description: 'Hasta 2 metros y más de 4mm de espesor',
    lastUpdated: '2025-08-23'
  },
  {
    name: 'Iron Mixed',
    nameEs: 'Fierro Mixto',
    pricePerKg: 200,
    currency: 'CLP',
    category: 'ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Tinplate Steel',
    nameEs: 'Lata Chatarra',
    pricePerKg: 195,
    currency: 'CLP',
    category: 'ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Cast Iron',
    nameEs: 'Fierro Fundido',
    pricePerKg: 130,
    currency: 'CLP',
    category: 'ferrosos',
    lastUpdated: '2025-08-23'
  },
  {
    name: 'Iron Turnings',
    nameEs: 'Viruta',
    pricePerKg: 60,
    currency: 'CLP',
    category: 'ferrosos',
    lastUpdated: '2025-08-23'
  },

  // Materiales No Ferrosos (COBRE)
  {
    name: 'Copper Grade 3',
    nameEs: 'Cobre 3ra',
    pricePerKg: 8000,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Copper Tube',
    nameEs: 'Cobre Tubo',
    pricePerKg: 7500,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Copper Heating',
    nameEs: 'Cobre Calef',
    pricePerKg: 6300,
    currency: 'CLP',
    category: 'no-ferrosos',
    description: 'Cobre de calefacción',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Copper Radiator',
    nameEs: 'Cobre Radiadora',
    pricePerKg: 4200,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },

  // Materiales No Ferrosos (BRONCE)
  {
    name: 'Bronze Yellow',
    nameEs: 'Bronce Amarillo',
    pricePerKg: 5000,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Bronze Red',
    nameEs: 'Bronce Colorado',
    pricePerKg: 6000,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Bronze Contaminated',
    nameEs: 'Bronce Contaminado',
    pricePerKg: 3500,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },

  // Materiales No Ferrosos (ALUMINIO)
  {
    name: 'Aluminum Hard',
    nameEs: 'Aluminio Duro',
    pricePerKg: 1350,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Aluminum Profile',
    nameEs: 'Aluminio Perfil',
    pricePerKg: 1500,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Aluminum Beverage Cans',
    nameEs: 'Aluminio Lata',
    pricePerKg: 1300,
    currency: 'CLP',
    category: 'no-ferrosos',
    description: 'Latas de bebida de aluminio',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Aluminum Offset',
    nameEs: 'Aluminio Offset',
    pricePerKg: 1800,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Aluminum Radiator',
    nameEs: 'Aluminio Radiadora',
    pricePerKg: 700,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-25'
  },
  {
    name: 'Al/Cu Radiator',
    nameEs: 'Al/Cu Radiadora',
    pricePerKg: 3000,
    currency: 'CLP',
    category: 'no-ferrosos',
    description: 'Rango referencial $3.000 – $3.500 / kg',
    lastUpdated: '2025-01-25'
  },

  // Materiales Especiales
  {
    name: 'Disused Equipment',
    nameEs: 'Equipos en Desuso',
    pricePerKg: 0,
    currency: 'CLP',
    category: 'especiales',
    description: 'Precio a consultar según tipo y estado del equipo',
    lastUpdated: '2025-08-23'
  },
  {
    name: 'Electrical Scrap',
    nameEs: 'Eléctrico',
    pricePerKg: 0,
    currency: 'CLP',
    category: 'especiales',
    description: 'Precio a consultar según componentes y materiales',
    lastUpdated: '2025-08-23'
  },
  {
    name: 'Machinery Scrap',
    nameEs: 'Chatarra de Maquinaria',
    pricePerKg: 0,
    currency: 'CLP',
    category: 'especiales',
    description: 'Precio a consultar según tipo de maquinaria y materiales',
    lastUpdated: '2025-08-23'
  }
];

// Helper functions for pricing
export const getPricesByCategory = (category: MaterialPrice['category']): MaterialPrice[] => {
  return PRICING_CONFIG.filter(material => material.category === category);
};

export const formatPrice = (price: number, currency: string = 'CLP'): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency
  }).format(price);
};

export const getFeaturedPrices = (): MaterialPrice[] => {
  const featuredMaterials = ['Fierro Corto', 'Cobre 3ra', 'Aluminio Perfil'];
  return PRICING_CONFIG.filter(material => 
    featuredMaterials.includes(material.nameEs)
  );
};

// Company information
export const COMPANY_INFO = {
  name: 'KONSTANDER',
  phone: '+56 9 5514 5437',
  email: 'konstanderspa@gmail.com',
  address: 'Panamericana Norte 17110, Lampa, Región Metropolitana',
  hours: 'Lunes a Domingo: de 8:00 a 21:00 hs',
  hoursFlexible: 'Horarios flexibles - se pueden coordinar horarios convenientes',
  coordinates: {
    lat: -33.2948,
    lng: -70.7366
  }
};
