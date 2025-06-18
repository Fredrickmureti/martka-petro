
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: string;
  rating: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  popular: boolean;
  inStock: boolean;
  manufacturer: string;
  warranty: string;
  documents: Document[];
  videos: VideoItem[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface Document {
  name: string;
  type: 'datasheet' | 'manual' | 'warranty' | 'certification';
  url: string;
}

export interface VideoItem {
  url: string;
  alt: string;
  type?: 'video' | 'youtube' | 'vimeo';
}

export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  manufacturer?: string;
}
