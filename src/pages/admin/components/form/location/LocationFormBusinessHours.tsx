
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LocationFormValues } from '../locationFormSchema';

type LocationFormBusinessHoursProps = {
    control: Control<LocationFormValues>;
};

export const LocationFormBusinessHours = ({ control }: LocationFormBusinessHoursProps) => {
    return (
        <FormField
            control={control}
            name="business_hours"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Business Hours</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Mon - Fri, 9am - 5pm" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
