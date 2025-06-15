
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onCompare?: (product: Product) => void;
  showCompareButton?: boolean;
}

const ProductCard = ({ product, onCompare, showCompareButton = false }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {product.popular && (
            <Badge className="bg-orange-500 text-white border-none">
              Popular
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.name}
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">{product.price}</p>
        
        <div className="space-y-1 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              • {feature}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
              <Eye className="mr-2" size={16} />
              View Details
            </Button>
          </Link>
          {showCompareButton && onCompare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCompare(product)}
              className="px-3"
            >
              <ShoppingCart size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
