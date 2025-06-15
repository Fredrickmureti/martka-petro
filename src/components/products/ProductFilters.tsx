
import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCategory, ProductFilter } from '@/types/product';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
  sortBy: 'name' | 'price' | 'rating' | 'popular';
  onSortChange: (sort: 'name' | 'price' | 'rating' | 'popular') => void;
  categories: ProductCategory[];
  manufacturers: string[];
}

const ProductFilters = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  categories,
  manufacturers,
}: ProductFiltersProps) => {
  const clearFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = searchQuery || Object.keys(filters).length > 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search products, features, or categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Category Filter */}
            <Select
              value={filters.category || 'all'}
              onValueChange={(value) => onFiltersChange({ ...filters, category: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Manufacturer Filter */}
            <Select
              value={filters.manufacturer || 'all'}
              onValueChange={(value) => onFiltersChange({ ...filters, manufacturer: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Manufacturers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                {manufacturers.map((manufacturer) => (
                  <SelectItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* In Stock Filter */}
            <Select
              value={filters.inStock === undefined ? 'all' : filters.inStock.toString()}
              onValueChange={(value) => onFiltersChange({ 
                ...filters, 
                inStock: value === 'all' ? undefined : value === 'true' 
              })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="true">In Stock</SelectItem>
                <SelectItem value="false">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} size="sm">
                <Filter className="mr-2" size={16} />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary">
                  Category: {categories.find(c => c.slug === filters.category)?.name}
                </Badge>
              )}
              {filters.manufacturer && (
                <Badge variant="secondary">
                  Manufacturer: {filters.manufacturer}
                </Badge>
              )}
              {filters.inStock !== undefined && (
                <Badge variant="secondary">
                  {filters.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
