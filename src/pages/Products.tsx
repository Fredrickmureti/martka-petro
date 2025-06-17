
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import ProductFilters from '@/components/products/ProductFilters';
import ProductComparison from '@/components/products/ProductComparison';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsViewControls from '@/components/products/ProductsViewControls';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsNoResults from '@/components/products/ProductsNoResults';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product, ProductCategory } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { fetchProducts } from '@/lib/products';
import { SEOMeta } from '@/components/seo/SEOMeta';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { getKeywordsForPage } from '@/utils/seoKeywords';
import { generateOrganizationSchema } from '@/utils/structuredData';

const fetchCategories = async (): Promise<Tables<'product_categories'>[]> => {
    const { data, error } = await supabase.from('product_categories').select('*');
    if (error) throw new Error(error.message);
    return data || [];
};

const mapSupabaseCategoryToAppCategory = (c: Tables<'product_categories'>): ProductCategory => ({
    id: c.id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    icon: c.icon || '',
    productCount: 0,
});

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const { data: products, isLoading: isLoadingProducts } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: rawCategories, isLoading: isLoadingCategories } = useQuery({ queryKey: ['productCategories'], queryFn: fetchCategories });

  // SEO optimization for products page - moved after products data fetch
  const structuredData = useMemo(() => ({
    ...generateOrganizationSchema(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Petroleum Equipment & Products',
      itemListElement: (products || []).slice(0, 10).map(product => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category.name
        }
      }))
    }
  }), [products]);

  const categories = useMemo(() => (rawCategories || []).map(mapSupabaseCategoryToAppCategory), [rawCategories]);
  
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
  } = useProductSearch(products || []);

  const manufacturers = useMemo(() => Array.from(new Set((products || []).map(p => p.manufacturer).filter(Boolean))), [products]);

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({});
  };
  
  const isLoading = isLoadingProducts || isLoadingCategories;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products' }
  ];

  return (
    <Layout>
      <SEOMeta
        title="Petroleum Equipment & Products - Fuel Dispensers, Storage Tanks | Martka Petroleum"
        description="Browse our comprehensive range of petroleum equipment including fuel dispensers (manual & digital), underground storage tanks, fuel pipeline systems, automation systems, and more. Quality petroleum products from Martka Petroleum Kenya."
        keywords={getKeywordsForPage('products')}
        canonicalUrl="https://martka-petroleum.com/products"
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-6 pb-12">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <ProductsHeader />

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

        <ProductsViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredProductsCount={filteredProducts.length}
          compareProductsCount={compareProducts.length}
          isLoading={isLoading}
        />
        
        {!isLoading && filteredProducts.length > 0 && (
          <ProductsGrid
            products={filteredProducts}
            viewMode={viewMode}
            onCompare={handleCompareProduct}
            isLoading={false}
          />
        )}

        {isLoading && (
          <ProductsGrid
            products={[]}
            viewMode={viewMode}
            onCompare={handleCompareProduct}
            isLoading={true}
          />
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <ProductsNoResults onClearFilters={handleClearFilters} />
        )}

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
