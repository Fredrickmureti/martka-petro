
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PopularProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Advanced Fuel Dispenser System',
      category: 'Dispensers',
      price: 'Contact for Quote',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop',
      features: ['EMV Payment', 'Real-time Monitoring', 'Anti-theft Protection'],
      popular: true,
    },
    {
      id: 2,
      name: 'Smart POS System',
      category: 'POS Systems',
      price: '$2,999',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      features: ['Cloud Integration', 'Inventory Management', 'Multi-payment Support'],
      popular: false,
    },
    {
      id: 3,
      name: 'Environmental Monitoring Kit',
      category: 'Safety Equipment',
      price: '$1,499',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
      features: ['24/7 Monitoring', 'Leak Detection', 'Compliance Reporting'],
      popular: true,
    },
    {
      id: 4,
      name: 'Underground Storage Tank',
      category: 'Storage Solutions',
      price: 'Contact for Quote',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
      features: ['Corrosion Resistant', 'Double Wall Protection', 'Long-term Warranty'],
      popular: false,
    },
  ];

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
          {products.map((product) => (
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
                    {product.category}
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
                
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
            Browse All Products
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
