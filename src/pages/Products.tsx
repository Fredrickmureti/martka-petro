
import React, { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductComparison from '@/components/products/ProductComparison';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product, ProductCategory } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';

type SupabaseProduct = Tables<'products'> & {
  product_categories: Tables<'product_categories'> | null;
};

const fetchProducts = async (): Promise<SupabaseProduct[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(*)');
  
  if (error) throw new Error(error.message);
  return (data as SupabaseProduct[]) || [];
};

const fetchCategories = async (): Promise<Tables<'product_categories'>[]> => {
    const { data, error } = await supabase.from('product_categories').select('*');
    if (error) throw new Error(error.message);
    return data || [];
};

// Mapper to convert DB types to application types
const mapSupabaseProductToAppProduct = (p: SupabaseProduct): Product => ({
    id: p.id.toString(),
    name: p.name,
    category: {
        id: p.product_categories?.id.toString() || '',
        name: p.product_categories?.name || 'Uncategorized',
        slug: p.product_categories?.slug || 'uncategorized',
        description: p.product_categories?.description || '',
        icon: p.product_categories?.icon || '',
        productCount: 0, // This would require another query to calculate, setting to 0 for now
    },
    price: p.price || 'Contact for price',
    rating: Number(p.rating) || 0,
    image: p.image_url || '/placeholder.svg',
    gallery: (p.gallery as string[]) || [],
    description: p.description || '',
    features: (p.features as string[]) || [],
    specifications: (p.specifications as Record<string, string>) || {},
    popular: p.popular || false,
    inStock: p.in_stock ?? true,
    manufacturer: p.manufacturer || 'Unknown',
    warranty: p.warranty || 'N/A',
    documents: (p.documents as any[]) || [],
});

const mapSupabaseCategoryToAppCategory = (c: Tables<'product_categories'>): ProductCategory => ({
    id: c.id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    icon: c.icon || '',
    productCount: 0, // This would require another query to calculate
});


const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const { data: rawProducts, isLoading: isLoadingProducts } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: rawCategories, isLoading: isLoadingCategories } = useQuery({ queryKey: ['productCategories'], queryFn: fetchCategories });

  const products = useMemo(() => (rawProducts || []).map(mapSupabaseProductToAppProduct), [rawProducts]);
  const categories = useMemo(() => (rawCategories || []).map(mapSupabaseCategoryToAppCategory), [rawCategories]);
  
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
  } = useProductSearch(products);

  const manufacturers = useMemo(() => Array.from(new Set(products.map(p => p.manufacturer).filter(Boolean))), [products]);

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
  
  const isLoading = isLoadingProducts || isLoadingCategories;

  return (
    <Layout>
      <div className="container mx-auto px-6 pb-12">
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
             {isLoading ? (
                <Skeleton className="h-6 w-32" />
            ) : (
            <span className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
            )}
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
        
        {isLoading && (
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
            </div>
        )}

        {/* Product Grid */}
        {!isLoading && <div className={`grid gap-6 mb-8 ${
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
        </div>}

        {/* No Results */}
        {!isLoading && filteredProducts.length === 0 && (
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
