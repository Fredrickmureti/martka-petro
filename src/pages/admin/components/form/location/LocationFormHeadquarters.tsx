
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { LocationFormValues } from '../locationFormSchema';

type LocationFormHeadquartersProps = {
    control: Control<LocationFormValues>;
};

export const LocationFormHeadquarters = ({ control }: LocationFormHeadquartersProps) => {
    return (
        <FormField
            control={control}
            name="is_headquarters"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel>Set as Headquarters</FormLabel>
                        <FormDescription>
                            This will become the main location shown on the contact page.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
