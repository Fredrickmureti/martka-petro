
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Download, Share, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ProductVideoGallery from '@/components/products/ProductVideoGallery';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProducts } from '@/lib/products';
import { Skeleton } from '@/components/ui/skeleton';
import { useSEO } from '@/hooks/useSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: !!product,
  });

  // SEO optimization for product page
  useSEO({
    title: product ? `${product.name} - ${product.category.name} | Martka Petroleum` : 'Loading Product...',
    description: product ? `${product.description} - High-quality ${product.category.name.toLowerCase()} from Martka Petroleum. Price: ${product.price}. Contact us for expert installation and support.` : 'Loading product details...',
    keywords: product ? [
      product.name.toLowerCase(),
      product.category.name.toLowerCase(),
      'martka petroleum',
      'petroleum equipment Kenya',
      'fuel equipment',
      product.manufacturer?.toLowerCase() || '',
      ...product.features.map(f => f.toLowerCase()),
      'buy ' + product.name.toLowerCase(),
      product.name.toLowerCase() + ' price',
      product.name.toLowerCase() + ' Kenya'
    ] : [],
    type: 'product',
    image: product?.image,
    url: `/products/${id}`,
    structuredData: product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.gallery.length > 0 ? product.gallery : [product.image],
      brand: {
        '@type': 'Brand',
        name: product.manufacturer || 'Martka Petroleum'
      },
      manufacturer: {
        '@type': 'Organization',
        name: product.manufacturer || 'Martka Petroleum'
      },
      category: product.category.name,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KES',
        price: product.price.replace(/[^\d.-]/g, '') || 'Contact for price',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Martka Petroleum'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1
      },
      additionalProperty: Object.entries(product.specifications).map(([key, value]) => ({
        '@type': 'PropertyValue',
        name: key,
        value: value
      }))
    } : undefined
  });

  const handleRequestQuote = () => {
    const message = `Hello! I'm interested in the ${product?.name}. Could you provide me with a quote and more information about this product?`;
    
    // Get phone number from contact info (you might need to adjust this based on your contact data structure)
    const phone = '+254700000000'; // Replace with actual phone number from your contact data
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace(/[\s\-\(\)]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoadingProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="flex space-x-2">
                <Skeleton className="w-20 h-20 rounded-lg" />
                <Skeleton className="w-20 h-20 rounded-lg" />
                <Skeleton className="w-20 h-20 rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-10 w-1/2 mb-6" />
              <div className="flex space-x-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-12" />
              </div>
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const relatedProducts = (allProducts || [])
    .filter(p => p.id !== product.id && p.category.id === product.category.id)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.category.name, href: `/products?category=${product.category.slug}` },
    { label: product.name }
  ];

  // Parse videos from product data
  const productVideos = (() => {
    try {
      const videosData = (product as any).videos;
      if (typeof videosData === 'string') {
        return JSON.parse(videosData);
      }
      return videosData || [];
    } catch {
      return [];
    }
  })();

  return (
    <Layout>
      <WhatsAppButton 
        message={`Hello! I'm interested in the ${product.name}. Could you provide more information?`}
      />
      
      <div className="container mx-auto px-6 py-12">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <Link to="/products">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2" size={16} />
            Back to Products
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
              <img 
                src={product.gallery[selectedImage] || product.image} 
                alt={`${product.name} - ${product.category.name} from Martka Petroleum`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.gallery.length > 1 && (
              <div className="flex space-x-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star size={20} className="text-yellow-500 fill-current mr-1" />
                  <span className="text-lg font-medium">{product.rating}</span>
                </div>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
                {product.popular && (
                  <Badge className="bg-orange-500 text-white">Popular</Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground mb-4">{product.description}</p>
              <div className="text-3xl font-bold text-blue-600 mb-6">{product.price}</div>
            </div>

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleRequestQuote}>
                <ShoppingCart className="mr-2" size={20} />
                Request Quote
              </Button>
              <Button variant="outline" size="lg">
                <Heart size={20} />
              </Button>
              <Button variant="outline" size="lg">
                <Share size={20} />
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <div className="font-medium">{product.manufacturer}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Warranty:</span>
                    <div className="font-medium">{product.warranty}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Videos</CardTitle>
              </CardHeader>
              <CardContent>
                {productVideos.length > 0 ? (
                  <ProductVideoGallery videos={productVideos} />
                ) : (
                  <p className="text-muted-foreground text-center py-8">No videos available for this product.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation & Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{doc.type}</div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2" size={16} />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Support & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Need help with this product? Our technical support team is here to assist you.
                  </p>
                  <div className="flex space-x-4">
                    <Button>Contact Support</Button>
                    <Button variant="outline">Schedule Consultation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={relatedProduct.image} 
                    alt={`${relatedProduct.name} - ${relatedProduct.category.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-600">{relatedProduct.price}</span>
                      <Link to={`/products/${relatedProduct.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
