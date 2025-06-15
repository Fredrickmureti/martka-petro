
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationFormSchema, LocationFormValues } from './form/locationFormSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tables } from '@/integrations/supabase/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type LocationFormProps = {
    onSubmit: (values: LocationFormValues) => void;
    location: Tables<'locations'> | null;
    isSubmitting: boolean;
};

export const LocationForm = ({ onSubmit, location, isSubmitting }: LocationFormProps) => {
    const form = useForm<LocationFormValues>({
        resolver: zodResolver(locationFormSchema),
        defaultValues: {
            name: '',
            address: '',
            city: '',
            country: '',
            email: '',
            phone: '',
        },
    });

    useEffect(() => {
        if (location) {
            form.reset({
                name: location.name,
                address: location.address || '',
                city: location.city || '',
                country: location.country || '',
                email: location.email || '',
                phone: location.phone || '',
            });
        } else {
            form.reset({
                name: '',
                address: '',
                city: '',
                country: '',
                email: '',
                phone: '',
            });
        }
    }, [location, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Nairobi Headquarters" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 123 Industrial Area Rd" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Nairobi" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Kenya" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. nairobi@martka.com" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. +254 20 123 4567" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {location ? 'Update Location' : 'Add Location'}
                </Button>
            </form>
        </Form>
    );
};
