
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Careers Content Hooks
export const useCareersContent = () => {
  return useQuery({
    queryKey: ['careersContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers_content')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      
      return data.reduce((acc, item) => {
        if (item.section_key) {
          acc[item.section_key] = item;
        }
        return acc;
      }, {} as Record<string, Tables<'careers_content'>>);
    },
    refetchInterval: 30000,
  });
};

export const useCareersCards = () => {
  return useQuery({
    queryKey: ['careersCards'],
    queryFn: async (): Promise<Tables<'careers_cards'>[]> => {
      const { data, error } = await supabase
        .from('careers_cards')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
    refetchInterval: 30000,
  });
};

export const useAllCareersContent = () => {
  return useQuery({
    queryKey: ['allCareersContent'],
    queryFn: async (): Promise<Tables<'careers_content'>[]> => {
      const { data, error } = await supabase
        .from('careers_content')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useAllCareersCards = () => {
  return useQuery({
    queryKey: ['allCareersCards'],
    queryFn: async (): Promise<Tables<'careers_cards'>[]> => {
      const { data, error } = await supabase
        .from('careers_cards')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Mutations for careers content
export const useUpdateCareersContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: Partial<Tables<'careers_content'>> }) => {
      const { error } = await supabase
        .from('careers_content')
        .update(content)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careersContent'] });
      queryClient.invalidateQueries({ queryKey: ['allCareersContent'] });
    }
  });
};

export const useCreateCareersCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (card: Omit<Tables<'careers_cards'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('careers_cards')
        .insert(card)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careersCards'] });
      queryClient.invalidateQueries({ queryKey: ['allCareersCards'] });
    }
  });
};

export const useUpdateCareersCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, card }: { id: number; card: Partial<Tables<'careers_cards'>> }) => {
      const { data, error } = await supabase
        .from('careers_cards')
        .update(card)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careersCards'] });
      queryClient.invalidateQueries({ queryKey: ['allCareersCards'] });
    }
  });
};

export const useDeleteCareersCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('careers_cards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careersCards'] });
      queryClient.invalidateQueries({ queryKey: ['allCareersCards'] });
    }
  });
};
