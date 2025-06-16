
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Hook to get page backgrounds
export const usePageBackgrounds = () => {
  return useQuery({
    queryKey: ['pageBackgrounds'],
    queryFn: async (): Promise<Tables<'page_backgrounds'>[]> => {
      const { data, error } = await supabase
        .from('page_backgrounds')
        .select('*')
        .order('page_name', { ascending: true })
        .order('section_key', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Hook to get page sections
export const usePageSections = () => {
  return useQuery({
    queryKey: ['pageSections'],
    queryFn: async (): Promise<Tables<'page_sections'>[]> => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .order('page_name', { ascending: true })
        .order('section_key', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Hook to update page background
export const useUpdatePageBackground = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Tables<'page_backgrounds'>> }) => {
      const { error } = await supabase
        .from('page_backgrounds')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageBackgrounds'] });
    }
  });
};

// Hook to update page section
export const useUpdatePageSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Tables<'page_sections'>> }) => {
      const { error } = await supabase
        .from('page_sections')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageSections'] });
    }
  });
};

// Hook to create page background
export const useCreatePageBackground = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<Tables<'page_backgrounds'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('page_backgrounds')
        .upsert(data, { onConflict: 'page_name,section_key' });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageBackgrounds'] });
    }
  });
};

// Hook to create page section
export const useCreatePageSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<Tables<'page_sections'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('page_sections')
        .upsert(data, { onConflict: 'page_name,section_key' });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageSections'] });
    }
  });
};
