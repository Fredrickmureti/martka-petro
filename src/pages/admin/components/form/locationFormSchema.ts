
import * as z from 'zod';

export const locationFormSchema = z.object({
    name: z.string().min(1, { message: "Location name is required." }),
    address: z.string().nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
    email: z.string().email({ message: "Please enter a valid email." }).nullable().or(z.literal('')),
    phone: z.string().nullable(),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;
