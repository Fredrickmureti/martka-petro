
import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductComparison from '@/components/products/ProductComparison';
import { products, categories } from '@/data/products';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
  } = useProductSearch(products);

  const manufacturers = Array.from(new Set(products.map(p => p.manufacturer)));

  const handleCompareProduct = (product: Product) => {
    if (compareProducts.find(p => p.id === product.id)) {
      setCompareProducts(compareProducts.filter(p => p.id !== product.id));
    } else if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const handleRemoveFromComparison = (productId: string) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  const handleClearComparison = () => {
    setCompareProducts([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Products & Equipment</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore our comprehensive range of petroleum infrastructure products, from fuel dispensers to monitoring systems.
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
          manufacturers={manufacturers}
        />

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
            {compareProducts.length > 0 && (
              <span className="text-blue-600 font-medium">
                {compareProducts.length} product{compareProducts.length !== 1 ? 's' : ''} selected for comparison
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} className="mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} className="mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCompare={handleCompareProduct}
              showCompareButton={true}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setFilters({});
            }}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Product Comparison */}
        <ProductComparison
          products={compareProducts}
          onRemoveProduct={handleRemoveFromComparison}
          onClearAll={handleClearComparison}
        />
      </div>
    </Layout>
  );
};

export default Products;
