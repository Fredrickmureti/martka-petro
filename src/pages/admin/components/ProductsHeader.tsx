
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type ProductsHeaderProps = {
  onAddProduct: () => void;
};

export const ProductsHeader = ({ onAddProduct }: ProductsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage your product inventory.</p>
      </div>
      <Button onClick={onAddProduct}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>
  );
};
