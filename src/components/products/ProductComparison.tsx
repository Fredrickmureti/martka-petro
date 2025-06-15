
import React from 'react';
import { X, Star, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

const ProductComparison = ({ products, onRemoveProduct, onClearAll }: ProductComparisonProps) => {
  if (products.length === 0) return null;

  const allSpecKeys = Array.from(
    new Set(products.flatMap(product => Object.keys(product.specifications)))
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Product Comparison</CardTitle>
          <Button variant="outline" onClick={onClearAll} size="sm">
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b font-medium w-48">Product</th>
                {products.map(product => (
                  <th key={product.id} className="text-left p-4 border-b min-w-64">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      >
                        <X size={14} />
                      </Button>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {product.category.name}
                      </Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <tr>
                <td className="p-4 border-b font-medium">Price</td>
                {products.map(product => (
                  <td key={product.id} className="p-4 border-b">
                    <span className="text-lg font-semibold text-blue-600">
                      {product.price}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-4 border-b font-medium">Rating</td>
                {products.map(product => (
                  <td key={product.id} className="p-4 border-b">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Stock Status */}
              <tr>
                <td className="p-4 border-b font-medium">Availability</td>
                {products.map(product => (
                  <td key={product.id} className="p-4 border-b">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Manufacturer */}
              <tr>
                <td className="p-4 border-b font-medium">Manufacturer</td>
                {products.map(product => (
                  <td key={product.id} className="p-4 border-b">
                    {product.manufacturer}
                  </td>
                ))}
              </tr>

              {/* Warranty */}
              <tr>
                <td className="p-4 border-b font-medium">Warranty</td>
                {products.map(product => (
                  <td key={product.id} className="p-4 border-b">
                    {product.warranty}
                  </td>
                ))}
              </tr>

              {/* Specifications */}
              {allSpecKeys.map(specKey => (
                <tr key={specKey}>
                  <td className="p-4 border-b font-medium">{specKey}</td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 border-b">
                      {product.specifications[specKey] ? (
                        <div className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          {product.specifications[specKey]}
                        </div>
                      ) : (
                        <div className="flex items-center text-muted-foreground">
                          <Minus size={16} className="mr-2" />
                          N/A
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
