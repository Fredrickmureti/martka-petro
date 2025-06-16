
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tables } from '@/integrations/supabase/types';
import { ProductFormValues } from './productFormSchema';
import { ImageUploadField } from './ImageUploadField';

type ProductFormBasicInfoProps = {
  control: Control<ProductFormValues>;
  categories: Pick<Tables<'product_categories'>, 'id' | 'name'>[];
};

export const ProductFormBasicInfo = ({ control, categories }: ProductFormBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField control={control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name *</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder="Enter product name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={control} name="manufacturer" render={({ field }) => (
          <FormItem>
            <FormLabel>Manufacturer</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder="Enter manufacturer" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="description" render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ''} rows={3} placeholder="Enter product description" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <div className="grid md:grid-cols-3 gap-4">
        <FormField control={control} name="category_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="price" render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder="e.g., $299.99" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="warranty" render={({ field }) => (
          <FormItem>
            <FormLabel>Warranty</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ''} placeholder="e.g., 2 years" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="image_url" render={({ field }) => (
        <ImageUploadField
          label="Main Product Image"
          value={field.value || ''}
          onChange={field.onChange}
          description="Upload or provide URL for the main product image"
          folder="products"
        />
      )} />

      <FormField control={control} name="rating" render={({ field }) => (
        <FormItem>
          <FormLabel>Rating (1-5)</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              min="1" 
              max="5" 
              step="0.1"
              {...field} 
              value={field.value ?? ''} 
              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
              placeholder="4.5" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
