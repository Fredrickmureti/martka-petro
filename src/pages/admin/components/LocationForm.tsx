
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationFormSchema, LocationFormValues } from './form/locationFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tables } from '@/integrations/supabase/types';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { LocationFormGeneral } from './form/location/LocationFormGeneral';
import { LocationFormContact } from './form/location/LocationFormContact';
import { LocationFormMapDetails } from './form/location/LocationFormMapDetails';
import { LocationFormHeadquarters } from './form/location/LocationFormHeadquarters';
import { LocationFormBusinessHours } from './form/location/LocationFormBusinessHours';


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
            business_hours: '',
            map_embed_url: '',
            latitude: null,
            longitude: null,
            map_image_url: '',
            is_headquarters: false,
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
                business_hours: location.business_hours || '',
                map_embed_url: location.map_embed_url || '',
                latitude: location.latitude as number | null,
                longitude: location.longitude as number | null,
                map_image_url: location.map_image_url || '',
                is_headquarters: location.is_headquarters,
            });
        } else {
            form.reset({
                name: '',
                address: '',
                city: '',
                country: '',
                email: '',
                phone: '',
                business_hours: '',
                map_embed_url: '',
                latitude: null,
                longitude: null,
                map_image_url: '',
                is_headquarters: false,
            });
        }
    }, [location, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <LocationFormGeneral control={form.control} />
                <LocationFormContact control={form.control} />
                <LocationFormBusinessHours control={form.control} />
                <LocationFormMapDetails control={form.control} />
                <LocationFormHeadquarters control={form.control} />
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {location ? 'Update Location' : 'Add Location'}
                </Button>
            </form>
        </Form>
    );
};
