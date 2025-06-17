
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export const useSupportContentSections = () => {
  return useQuery({
    queryKey: ['supportContentSections'],
    queryFn: async (): Promise<Tables<'support_content_sections'>[]> => {
      const { data, error } = await supabase
        .from('support_content_sections')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
    refetchInterval: 30000,
  });
};

export const useCreateSupportContentSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: Omit<Tables<'support_content_sections'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('support_content_sections')
        .insert(section)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportContentSections'] });
    }
  });
};

export const useUpdateSupportContentSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, section }: { id: number; section: Partial<Tables<'support_content_sections'>> }) => {
      const { data, error } = await supabase
        .from('support_content_sections')
        .update(section)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportContentSections'] });
    }
  });
};

export const useDeleteSupportContentSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('support_content_sections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportContentSections'] });
    }
  });
};
