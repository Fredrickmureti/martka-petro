
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';
import { LocationFormValues } from '@/pages/admin/components/form/locationFormSchema';

export const useAdminLocations = () => {
    const queryClient = useQueryClient();

    // Fetch locations
    const useGetLocations = () => useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('locations')
                .select('*')
                .order('name', { ascending: true });
            if (error) throw new Error(error.message);
            return data;
        },
    });

    // Add location
    const useAddLocation = () => useMutation({
        mutationFn: async (location: LocationFormValues) => {
            const { error } = await supabase.from('locations').insert(location as TablesInsert<'locations'>);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            toast({ title: 'Success', description: 'Location added successfully.' });
        },
        onError: (error) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
    });

    // Update location
    const useUpdateLocation = () => useMutation({
        mutationFn: async ({ id, ...location }: { id: number } & LocationFormValues) => {
            const { error } = await supabase.from('locations').update(location).eq('id', id);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            toast({ title: 'Success', description: 'Location updated successfully.' });
        },
        onError: (error) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
    });

    // Delete location
    const useDeleteLocation = () => useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from('locations').delete().eq('id', id);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            toast({ title: 'Success', description: 'Location deleted successfully.' });
        },
        onError: (error) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
    });

    return { useGetLocations, useAddLocation, useUpdateLocation, useDeleteLocation };
};
