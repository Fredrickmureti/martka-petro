
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useAdminMessages = () => {
    return useQuery({
        queryKey: ['contactMessages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('contact_messages')
                .select(`
                    *,
                    services (name)
                `)
                .order('created_at', { ascending: false });
            if (error) throw new Error(error.message);
            return data;
        },
    });
};

export const useUpdateMessageStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, is_read }: { id: number, is_read: boolean }) => {
            const { error } = await supabase
                .from('contact_messages')
                .update({ is_read })
                .eq('id', id);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
        },
        onError: (error) => {
             toast({
                title: "Error",
                description: `Could not update message status: ${error.message}`,
                variant: 'destructive',
            });
        }
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            toast({
                title: "Message Deleted",
                description: "The contact message has been successfully deleted.",
            });
            queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
        },
        onError: (error) => {
             toast({
                title: "Error",
                description: `Could not delete message: ${error.message}`,
                variant: 'destructive',
            });
        }
    });
};
