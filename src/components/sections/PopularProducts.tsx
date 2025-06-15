
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularProducts } from '@/lib/products';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';

const PopularProducts = () => {
  const { data: featuredProducts, isLoading } = useQuery<Product[]>({
    queryKey: ['popularProducts'],
    queryFn: fetchPopularProducts,
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most trusted petroleum equipment and systems chosen by industry professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Products</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most trusted petroleum equipment and systems chosen by industry professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.popular && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-white border-none">
                      Popular
                    </Badge>
                  </div>
                )}
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
                <p className="text-lg font-semibold text-blue-600 mb-3">{product.price}</p>
                
                <div className="space-y-1 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {feature}
                    </div>
                  ))}
                </div>
                
                <Link to={`/products/${product.id}`}>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
              Browse All Products
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
