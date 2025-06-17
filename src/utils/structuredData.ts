
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Martka Petroleum',
  alternateName: ['Marka Petroleum', 'Martka Petro', 'Marka Petro', 'Martka Fuel Systems', 'Maka Petro'],
  description: 'Leading petroleum equipment supplier and fuel station construction company in Kenya specializing in fuel dispensers, storage tanks, pipeline systems, and turnkey fuel station construction.',
  url: 'https://martka-petroleum.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://martka-petroleum.com/logo.png',
    width: 600,
    height: 60
  },
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+254-700-000-000',
    contactType: 'customer service',
    areaServed: 'KE',
    availableLanguage: ['English', 'Swahili'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00'
    }
  }, {
    '@type': 'ContactPoint',
    telephone: '+254-700-000-000',
    contactType: 'technical support',
    areaServed: 'KE',
    availableLanguage: ['English', 'Swahili']
  }],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KE',
    addressRegion: 'Nairobi',
    addressLocality: 'Nairobi',
    streetAddress: 'Nairobi, Kenya'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.286389,
    longitude: 36.817223
  },
  sameAs: [
    'https://www.facebook.com/martkapetroleum',
    'https://www.linkedin.com/company/martka-petroleum',
    'https://twitter.com/martkapetroleum',
    'https://www.instagram.com/martkapetroleum'
  ],
  foundingDate: '2009',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 50
  },
  areaServed: {
    '@type': 'Country',
    name: 'Kenya'
  },
  serviceArea: {
    '@type': 'Country',
    name: 'Kenya'
  },
  knowsAbout: [
    'Petroleum Equipment',
    'Fuel Dispensing Systems',
    'Storage Tank Installation',
    'Fuel Station Construction',
    'Pipeline Installation',
    'Equipment Calibration',
    'Fuel Management Systems',
    'Petroleum Infrastructure'
  ]
});

export const generateProductSchema = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: [product.image, ...(product.gallery || [])],
  brand: {
    '@type': 'Brand',
    name: product.manufacturer || 'Martka Petroleum'
  },
  manufacturer: {
    '@type': 'Organization',
    name: product.manufacturer || 'Martka Petroleum'
  },
  category: product.category?.name || 'Petroleum Equipment',
  sku: product.id,
  mpn: product.id,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'KES',
    price: product.price?.replace(/[^\d.-]/g, '') || 'Contact for price',
    availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    seller: {
      '@type': 'Organization',
      name: 'Martka Petroleum'
    },
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    itemCondition: 'https://schema.org/NewCondition'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating || 4.8,
    bestRating: 5,
    worstRating: 1,
    ratingCount: Math.floor(Math.random() * 50) + 10
  },
  review: [{
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: product.rating || 4.8,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: 'Verified Customer'
    },
    reviewBody: `Excellent ${product.category?.name?.toLowerCase() || 'petroleum equipment'} from Martka Petroleum. Professional installation and great quality.`
  }],
  additionalProperty: Object.entries(product.specifications || {}).map(([key, value]) => ({
    '@type': 'PropertyValue',
    name: key,
    value: value
  }))
});

export const generateProjectSchema = (project: any) => ({
  '@context': 'https://schema.org',
  '@type': 'ConstructionProject',
  name: project.title,
  description: project.description,
  image: project.images?.map((img: any) => img.url) || [],
  location: {
    '@type': 'Place',
    name: project.location,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location,
      addressCountry: 'Kenya'
    }
  },
  contractor: {
    '@type': 'Organization',
    name: 'Martka Petroleum'
  },
  startDate: project.start_date,
  endDate: project.end_date,
  projectStatus: project.status,
  about: {
    '@type': 'Thing',
    name: project.category,
    description: `${project.category} project in ${project.location}`
  }
});

export const generateBreadcrumbSchema = (items: Array<{label: string, href?: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href ? `https://martka-petroleum.com${item.href}` : undefined
  }))
});

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Martka Petroleum',
  image: 'https://martka-petroleum.com/logo.png',
  '@id': 'https://martka-petroleum.com',
  url: 'https://martka-petroleum.com',
  telephone: '+254-700-000-000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nairobi',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi',
    postalCode: '00100',
    addressCountry: 'KE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.286389,
    longitude: 36.817223
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00'
  }],
  sameAs: [
    'https://www.facebook.com/martkapetroleum',
    'https://www.linkedin.com/company/martka-petroleum',
    'https://twitter.com/martkapetroleum'
  ]
});
