
import { useState, useMemo } from 'react';
import { Product, ProductFilter } from '@/types/product';

export const useProductSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilter>({});
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'popular'>('popular');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesFeatures = product.features.some(feature => 
          feature.toLowerCase().includes(query)
        );
        const matchesCategory = product.category.name.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDescription && !matchesFeatures && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (filters.category && product.category.slug !== filters.category) {
        return false;
      }

      // Rating filter
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      // Manufacturer filter
      if (filters.manufacturer && product.manufacturer !== filters.manufacturer) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
  };
};
