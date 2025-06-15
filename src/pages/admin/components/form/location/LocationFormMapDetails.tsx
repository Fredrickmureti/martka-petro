
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LocationFormValues } from '../locationFormSchema';

type LocationFormMapDetailsProps = {
    control: Control<LocationFormValues>;
};

export const LocationFormMapDetails = ({ control }: LocationFormMapDetailsProps) => {
    return (
        <>
            <FormField
                control={control}
                name="map_embed_url"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Map Embed URL</FormLabel>
                        <FormControl>
                            <Input placeholder="Google Maps embed URL" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input type="number" step="any" placeholder="e.g. -1.286389" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input type="number" step="any" placeholder="e.g. 36.817223" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name="map_image_url"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Map Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="URL of an image of the map" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
