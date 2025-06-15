
import * as z from 'zod';

export const locationFormSchema = z.object({
    name: z.string().min(1, { message: "Location name is required." }),
    address: z.string().nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
    email: z.string().email({ message: "Please enter a valid email." }).nullable().or(z.literal('')),
    phone: z.string().nullable(),
    map_embed_url: z.string().url({ message: "Please enter a valid URL." }).nullable().or(z.literal('')),
    latitude: z.preprocess((val) => (val === '' || val === null ? null : val), z.coerce.number().nullable()),
    longitude: z.preprocess((val) => (val === '' || val === null ? null : val), z.coerce.number().nullable()),
    map_image_url: z.string().url({ message: "Please enter a valid URL." }).nullable().or(z.literal('')),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;
