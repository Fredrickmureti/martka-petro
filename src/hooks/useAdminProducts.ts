
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { ProductFormValues } from '@/pages/admin/components/ProductForm';
import { useToast } from '@/components/ui/use-toast';

export type ProductWithCategory = Tables<'products'> & {
  product_categories: Pick<Tables<'product_categories'>, 'name'> | null;
};

const fetchProducts = async (): Promise<ProductWithCategory[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(name)')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as ProductWithCategory[];
};

const fetchCategories = async () => {
  const { data, error } = await supabase.from('product_categories').select('id, name');
  if (error) throw new Error(error.message);
  return data || [];
};

const parseJson = (jsonString: string | null | undefined) => {
    if (!jsonString || jsonString.trim() === '') return null;
    try {
        return JSON.parse(jsonString);
    } catch {
        return null;
    }
};

export const useAdminProducts = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery({
        queryKey: ['adminProducts'],
        queryFn: fetchProducts,
    });

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['adminProductCategories'],
        queryFn: fetchCategories,
    });

    const createProductMutation = useMutation({
        mutationFn: async (productData: ProductFormValues) => {
          const { features, gallery, specifications, documents, ...rest } = productData;
          
          const payload = { 
            ...rest,
            name: rest.name || '',
            features: parseJson(features),
            gallery: parseJson(gallery),
            specifications: parseJson(specifications),
            documents: parseJson(documents),
          };
    
          const { error } = await supabase.from('products').insert(payload as any);
          if (error) throw error;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
          toast({ title: 'Success', description: 'Product created successfully.' });
        },
        onError: (error) => {
          toast({ variant: 'destructive', title: 'Error', description: error.message });
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: ProductFormValues }) => {
            const { features, gallery, specifications, documents, ...rest } = data;
            const payload = {
                ...rest,
                features: parseJson(features),
                gallery: parseJson(gallery),
                specifications: parseJson(specifications),
                documents: parseJson(documents),
            };
          const { error } = await supabase.from('products').update(payload as any).eq('id', id);
          if (error) throw error;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
          toast({ title: 'Success', description: 'Product updated successfully.' });
        },
        onError: (error) => {
          toast({ variant: 'destructive', title: 'Error', description: error.message });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: number) => {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (error) throw error;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
          toast({ title: 'Success', description: 'Product deleted successfully.' });
        },
        onError: (error) => {
          toast({ variant: 'destructive', title: 'Error', description: error.message });
        },
    });

    return {
        products,
        isLoadingProducts,
        productsError,
        categories,
        isLoadingCategories,
        createProduct: createProductMutation.mutate,
        isCreating: createProductMutation.isPending,
        updateProduct: updateProductMutation.mutate,
        isUpdating: updateProductMutation.isPending,
        deleteProduct: deleteProductMutation.mutate,
        isDeleting: deleteProductMutation.isPending,
    };
}
