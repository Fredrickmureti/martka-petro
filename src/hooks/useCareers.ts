
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export const useCareers = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: async (): Promise<Tables<'careers'>[]> => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

export const useAllCareers = () => {
  return useQuery({
    queryKey: ['allCareers'],
    queryFn: async (): Promise<Tables<'careers'>[]> => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

export const useCreateCareer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (career: Omit<Tables<'careers'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('careers')
        .insert(career)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      queryClient.invalidateQueries({ queryKey: ['allCareers'] });
    }
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, career }: { id: number; career: Partial<Tables<'careers'>> }) => {
      const { data, error } = await supabase
        .from('careers')
        .update(career)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      queryClient.invalidateQueries({ queryKey: ['allCareers'] });
    }
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('careers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      queryClient.invalidateQueries({ queryKey: ['allCareers'] });
    }
  });
};
