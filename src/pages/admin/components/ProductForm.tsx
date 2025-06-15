
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tables } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const jsonString = z
  .string()
  .nullable()
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      try {
        JSON.parse(val);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: 'Invalid JSON format.' }
  );

export const productFormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  description: z.string().nullable(),
  price: z.string().nullable(),
  category_id: z.coerce.number().nullable(),
  manufacturer: z.string().nullable(),
  in_stock: z.boolean().default(true),
  popular: z.boolean().default(false),
  rating: z.coerce.number().min(0).max(5).nullable(),
  image_url: z.string().url({ message: 'Please enter a valid URL.' }).nullable().or(z.literal('')),
  warranty: z.string().nullable(),
  features: jsonString,
  gallery: jsonString,
  specifications: jsonString,
  documents: jsonString,
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Fuel Dispenser" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the product."
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value === 'no-category') {
                      field.onChange(null);
                    } else {
                      field.onChange(value ? Number(value) : null);
                    }
                  }}
                  value={field.value?.toString() ?? ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no-category">No Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Wayne" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 1500.00 or 'Contact for price'" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" max="5" 
                    step="0.1" 
                    placeholder="e.g. 4.8" 
                    {...field}
                    onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                    value={field.value ?? ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Warranty</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. 1 Year" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <div className="flex gap-4 pt-2">
            <FormField
                control={form.control}
                name="in_stock"
                render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                    <FormLabel>
                        In Stock
                    </FormLabel>
                    </div>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                    <FormLabel>
                        Popular
                    </FormLabel>
                    </div>
                </FormItem>
                )}
            />
        </div>
        
        <Tabs defaultValue="features" className="pt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-2">
            <FormField control={form.control} name="features" render={({ field }) => (
                <FormItem>
                    <FormLabel>Features (JSON Array)</FormLabel>
                    <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='[ "Feature 1", "Feature 2" ]' /></FormControl>
                    <FormDescription>A JSON array of strings.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
          </TabsContent>
          <TabsContent value="gallery" className="mt-2">
             <FormField control={form.control} name="gallery" render={({ field }) => (
                <FormItem>
                    <FormLabel>Gallery (JSON Array)</FormLabel>
                    <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='[ "url1.jpg", "url2.jpg" ]' /></FormControl>
                    <FormDescription>A JSON array of image URLs.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
          </TabsContent>
          <TabsContent value="specifications" className="mt-2">
            <FormField control={form.control} name="specifications" render={({ field }) => (
                <FormItem>
                    <FormLabel>Specifications (JSON Object)</FormLabel>
                    <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='{ "Key 1": "Value 1", "Key 2": "Value 2" }' /></FormControl>
                    <FormDescription>A JSON object of key-value pairs.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
          </TabsContent>
          <TabsContent value="documents" className="mt-2">
            <FormField control={form.control} name="documents" render={({ field }) => (
                <FormItem>
                    <FormLabel>Documents (JSON Array)</FormLabel>
                    <FormControl><Textarea {...field} value={field.value ?? ''} rows={8} placeholder={'[\n  {\n    "name": "Datasheet",\n    "type": "datasheet",\n    "url": "https://example.com/doc.pdf"\n  }\n]'} /></FormControl>
                    <FormDescription>A JSON array of document objects.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isSubmitting} className="!mt-8">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </form>
    </Form>
  );
}
