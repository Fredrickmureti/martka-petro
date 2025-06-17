
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductsGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onCompare: (product: Product) => void;
  isLoading: boolean;
}

const ProductsGrid = ({ products, viewMode, onCompare, isLoading }: ProductsGridProps) => {
  if (isLoading) {
    return (
      <div className={`grid gap-6 mb-8 ${
        viewMode === 'grid' 
          ? 'md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 mb-8 ${
      viewMode === 'grid' 
        ? 'md:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCompare={onCompare}
          showCompareButton={true}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
