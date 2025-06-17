
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductsNoResultsProps {
  onClearFilters: () => void;
}

const ProductsNoResults = ({ onClearFilters }: ProductsNoResultsProps) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
      <Button onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
};

export default ProductsNoResults;
