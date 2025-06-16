
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tables } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { productFormSchema, ProductFormValues } from './form/productFormSchema';
import { ProductFormBasicInfo } from './form/ProductFormBasicInfo';
import { ProductFormFlags } from './form/ProductFormFlags';
import { ProductFormTabs } from './form/ProductFormTabs';
import { ProductImagePreview } from './form/ProductImagePreview';

type ProductFormProps = {
  onSubmit: (values: ProductFormValues) => void;
  product?: Tables<'products'> | null;
  categories: Pick<Tables<'product_categories'>, 'id' | 'name'>[];
  isSubmitting: boolean;
};

export function ProductForm({ onSubmit, product, categories, isSubmitting }: ProductFormProps) {
  const stringify = (val: any) => (val && typeof val === 'object' && Object.keys(val).length > 0 ? JSON.stringify(val, null, 2) : '');

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description ?? null,
      price: product?.price ?? null,
      category_id: product?.category_id ?? null,
      manufacturer: product?.manufacturer ?? null,
      in_stock: product?.in_stock ?? true,
      popular: product?.popular ?? false,
      rating: product?.rating ?? null,
      image_url: product?.image_url ?? '',
      warranty: product?.warranty ?? null,
      features: stringify(product?.features),
      gallery: stringify(product?.gallery),
      specifications: stringify(product?.specifications),
      documents: stringify(product?.documents),
    },
  });

  const watchedImageUrl = form.watch('image_url');
  const watchedGallery = form.watch('gallery');

  React.useEffect(() => {
    form.reset({
      name: product?.name || '',
      description: product?.description ?? null,
      price: product?.price ?? null,
      category_id: product?.category_id ?? null,
      manufacturer: product?.manufacturer ?? null,
      in_stock: product?.in_stock ?? true,
      popular: product?.popular ?? false,
      rating: product?.rating ?? null,
      image_url: product?.image_url ?? '',
      warranty: product?.warranty ?? null,
      features: stringify(product?.features),
      gallery: stringify(product?.gallery),
      specifications: stringify(product?.specifications),
      documents: stringify(product?.documents),
    });
  }, [product, form]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProductFormBasicInfo control={form.control} categories={categories} />
            <ProductFormFlags control={form.control} />
            <ProductFormTabs control={form.control} />
            <Button type="submit" disabled={isSubmitting} className="!mt-8 w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="lg:sticky lg:top-4 lg:h-fit">
        <ProductImagePreview
          imageUrl={watchedImageUrl || ''}
          galleryJson={watchedGallery || ''}
        />
      </div>
    </div>
  );
}
