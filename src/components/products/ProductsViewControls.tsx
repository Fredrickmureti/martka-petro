
import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductsViewControlsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filteredProductsCount: number;
  compareProductsCount: number;
  isLoading: boolean;
}

const ProductsViewControls = ({ 
  viewMode, 
  setViewMode, 
  filteredProductsCount, 
  compareProductsCount,
  isLoading 
}: ProductsViewControlsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <span className="text-muted-foreground">
            {filteredProductsCount} product{filteredProductsCount !== 1 ? 's' : ''} found
          </span>
        )}
        {compareProductsCount > 0 && (
          <span className="text-blue-600 font-medium">
            {compareProductsCount} product{compareProductsCount !== 1 ? 's' : ''} selected for comparison
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
  );
};

export default ProductsViewControls;
