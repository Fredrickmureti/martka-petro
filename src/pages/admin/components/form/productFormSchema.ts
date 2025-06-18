
import * as z from 'zod';

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
  videos: jsonString,
  specifications: jsonString,
  documents: jsonString,
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
