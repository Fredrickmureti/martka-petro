
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async (): Promise<Tables<'documents'>[]> => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .eq('is_public', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
    refetchInterval: 30000,
  });
};

export const useAllDocuments = () => {
  return useQuery({
    queryKey: ['allDocuments'],
    queryFn: async (): Promise<Tables<'documents'>[]> => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (document: Omit<Tables<'documents'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('documents')
        .insert(document)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['allDocuments'] });
    }
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, document }: { id: number; document: Partial<Tables<'documents'>> }) => {
      const { data, error } = await supabase
        .from('documents')
        .update(document)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['allDocuments'] });
    }
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['allDocuments'] });
    }
  });
};
