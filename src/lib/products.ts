
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Product, Document } from '@/types/product';

export type SupabaseProduct = Tables<'products'> & {
  product_categories: Tables<'product_categories'> | null;
};

export const mapSupabaseProductToAppProduct = (p: SupabaseProduct): Product => ({
    id: p.id.toString(),
    name: p.name,
    category: {
        id: p.product_categories?.id.toString() || '',
        name: p.product_categories?.name || 'Uncategorized',
        slug: p.product_categories?.slug || 'uncategorized',
        description: p.product_categories?.description || '',
        icon: p.product_categories?.icon || '',
        productCount: 0,
    },
    price: p.price || 'Contact for price',
    rating: Number(p.rating) || 0,
    image: p.image_url || '/placeholder.svg',
    gallery: (p.gallery as string[]) || [],
    description: p.description || '',
    features: (p.features as string[]) || [],
    specifications: (p.specifications as Record<string, string>) || {},
    popular: p.popular || false,
    inStock: p.in_stock ?? true,
    manufacturer: p.manufacturer || 'Unknown',
    warranty: p.warranty || 'N/A',
    documents: (p.documents as unknown as Document[]) || [],
    videos: ((p as any).videos as any[]) || [],
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(*)');
  
  if (error) throw new Error(error.message);
  return (data as SupabaseProduct[] || []).map(mapSupabaseProductToAppProduct);
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*, product_categories(*)')
        .eq('popular', true)
        .limit(4);

    if (error) throw new Error(error.message);
    return (data as SupabaseProduct[] || []).map(mapSupabaseProductToAppProduct);
}

export const fetchProductById = async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
        .from('products')
        .select('*, product_categories(*)')
        .eq('id', Number(id))
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return mapSupabaseProductToAppProduct(data as SupabaseProduct);
}
