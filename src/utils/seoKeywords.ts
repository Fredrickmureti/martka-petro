
export const primaryKeywords = [
  // Core business keywords
  'petroleum equipment suppliers',
  'fuel station construction company',
  'fuel dispensers Kenya',
  'digital fuel pump',
  'manual fuel dispensers',
  'diesel tank installation',
  'underground fuel storage tanks',
  'above ground storage tanks',
  'fuel pipeline contractors',
  'calibration of fuel dispensers',
  'fuel automation system providers',
  'petroleum infrastructure company',
  
  // Brand variations
  'martka petroleum',
  'marka petroleum',
  'martka petro',
  'marka petro',
  'martka fuel systems',
  'maka petro',
  'martka fuel pumps',
  'martka petrol machines',
  
  // Service-specific keywords
  'fuel management systems',
  'pump island installation',
  'canopy installations',
  'turnkey fuel stations',
  'petroleum site infrastructure',
  'fuel equipment maintenance',
  'fuel dispensing equipment',
  'petroleum engineering Kenya',
  'fuel station developers',
  'petrol pump suppliers',
  
  // Location-based keywords
  'petroleum equipment suppliers Kenya',
  'fuel station construction Nairobi',
  'diesel pump suppliers East Africa',
  'fuel tank installation Kenya',
  'petroleum infrastructure Nairobi'
];

export const longTailKeywords = [
  'best fuel dispensing equipment suppliers in Kenya',
  'professional fuel station construction services',
  'reliable petroleum equipment maintenance',
  'digital fuel pump installation and calibration',
  'underground storage tank systems Kenya',
  'turnkey fuel station construction company',
  'fuel pipeline installation contractors',
  'petroleum equipment suppliers in Nairobi',
  'fuel automation system installation',
  'diesel tank installation services Kenya'
];

export const getKeywordsForPage = (pageType: string, itemName?: string) => {
  const baseKeywords = [...primaryKeywords];
  
  switch (pageType) {
    case 'product':
      return [
        ...baseKeywords,
        `${itemName} Kenya`,
        `buy ${itemName}`,
        `${itemName} suppliers`,
        `${itemName} installation`,
        `${itemName} maintenance`,
        'petroleum equipment Kenya',
        'fuel station equipment'
      ];
      
    case 'project':
      return [
        ...baseKeywords,
        'fuel station construction projects',
        'petroleum infrastructure projects',
        'successful fuel station installations',
        'petroleum engineering projects Kenya',
        'fuel infrastructure development'
      ];
      
    case 'products':
      return [
        ...baseKeywords,
        ...longTailKeywords,
        'petroleum equipment catalog',
        'fuel station equipment suppliers',
        'comprehensive petroleum solutions'
      ];
      
    case 'projects':
      return [
        ...baseKeywords,
        'fuel station construction portfolio',
        'petroleum project gallery',
        'successful fuel infrastructure projects',
        'fuel station development Kenya'
      ];
      
    default:
      return baseKeywords;
  }
};
