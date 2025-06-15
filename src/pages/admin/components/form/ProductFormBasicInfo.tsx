
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

type ProductFormBasicInfoProps = {
  control: Control<ProductFormValues>;
  categories: Pick<Tables<'product_categories'>, 'id' | 'name'>[];
};

export const ProductFormBasicInfo = ({ control, categories }: ProductFormBasicInfoProps) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
    </>
  );
};
