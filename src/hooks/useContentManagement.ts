
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Header content hook
export const useHeaderContent = () => {
  return useQuery({
    queryKey: ['headerContent'],
    queryFn: async (): Promise<Tables<'header_content'>> => {
      const { data, error } = await supabase
        .from('header_content')
        .select('*')
        .single();

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

// Footer content hook
export const useFooterContent = () => {
  return useQuery({
    queryKey: ['footerContent'],
    queryFn: async (): Promise<Tables<'footer_content'>[]> => {
      const { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

// About content hook
export const useAboutContent = () => {
  return useQuery({
    queryKey: ['aboutContent'],
    queryFn: async (): Promise<Tables<'about_content'>[]> => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    }
  });
};

// Update header content mutation
export const useUpdateHeaderContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: Partial<Tables<'header_content'>>) => {
      const { error } = await supabase
        .from('header_content')
        .update(content)
        .eq('id', 1);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerContent'] });
    }
  });
};

// Update footer content mutation
export const useUpdateFooterContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: Partial<Tables<'footer_content'>> }) => {
      const { error } = await supabase
        .from('footer_content')
        .update(content)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerContent'] });
    }
  });
};

// Update about content mutation
export const useUpdateAboutContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: Partial<Tables<'about_content'>> }) => {
      const { error } = await supabase
        .from('about_content')
        .update(content)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
    }
  });
};
