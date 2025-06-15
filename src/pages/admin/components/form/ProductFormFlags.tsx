
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductFormValues } from './productFormSchema';

type ProductFormFlagsProps = {
  control: Control<ProductFormValues>;
};

export const ProductFormFlags = ({ control }: ProductFormFlagsProps) => {
  return (
    <div className="flex gap-4 pt-2">
        <FormField
            control={control}
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
            control={control}
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
  )
}
