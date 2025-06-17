
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
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
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
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
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
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });
};

// Support page content hook
export const useSupportPageContent = () => {
  return useQuery({
    queryKey: ['supportPageContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_page_content')
        .select('*');

      if (error) throw new Error(error.message);
      
      // Transform array to object for easier access
      const contentObj: any = {};
      data.forEach(item => {
        contentObj[item.section_key] = item;
      });
      
      return contentObj;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
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
      queryClient.refetchQueries({ queryKey: ['headerContent'] });
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
      queryClient.refetchQueries({ queryKey: ['footerContent'] });
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
      queryClient.refetchQueries({ queryKey: ['aboutContent'] });
    }
  });
};

// Update support page content mutation
export const useUpdateSupportPageContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sectionKey, data }: { sectionKey: string; data: any }) => {
      const { error } = await supabase
        .from('support_page_content')
        .upsert({
          section_key: sectionKey,
          title: data.title,
          description: data.description,
          content: data.content,
          is_active: data.is_active
        }, {
          onConflict: 'section_key'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportPageContent'] });
      queryClient.refetchQueries({ queryKey: ['supportPageContent'] });
    }
  });
};

// Add new footer section mutation
export const useAddFooterSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: Omit<Tables<'footer_content'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('footer_content')
        .insert(section);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerContent'] });
      queryClient.refetchQueries({ queryKey: ['footerContent'] });
    }
  });
};

// Add new about section mutation
export const useAddAboutSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: Omit<Tables<'about_content'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('about_content')
        .insert(section);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
      queryClient.refetchQueries({ queryKey: ['aboutContent'] });
    }
  });
};

// Delete footer section mutation
export const useDeleteFooterSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('footer_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerContent'] });
      queryClient.refetchQueries({ queryKey: ['footerContent'] });
    }
  });
};

// Delete about section mutation
export const useDeleteAboutSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
      queryClient.refetchQueries({ queryKey: ['aboutContent'] });
    }
  });
};
