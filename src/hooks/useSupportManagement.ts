
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Support FAQs mutations
export const useCreateSupportFaq = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (faq: Omit<Tables<'support_faqs'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('support_faqs')
        .insert(faq)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportFaqs'] });
    }
  });
};

export const useUpdateSupportFaq = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, faq }: { id: number; faq: Partial<Tables<'support_faqs'>> }) => {
      const { data, error } = await supabase
        .from('support_faqs')
        .update(faq)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportFaqs'] });
    }
  });
};

export const useDeleteSupportFaq = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('support_faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportFaqs'] });
    }
  });
};

// Support Downloads mutations
export const useCreateSupportDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (download: Omit<Tables<'support_downloads'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('support_downloads')
        .insert(download)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportDownloads'] });
    }
  });
};

export const useUpdateSupportDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, download }: { id: number; download: Partial<Tables<'support_downloads'>> }) => {
      const { data, error } = await supabase
        .from('support_downloads')
        .update(download)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportDownloads'] });
    }
  });
};

export const useDeleteSupportDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('support_downloads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportDownloads'] });
    }
  });
};

// Support Options mutations with enhanced contact info
export const useCreateSupportOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (option: Omit<Tables<'support_options'>, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('support_options')
        .insert(option)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportOptions'] });
    }
  });
};

export const useUpdateSupportOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, option }: { id: number; option: Partial<Tables<'support_options'>> }) => {
      const { data, error } = await supabase
        .from('support_options')
        .update(option)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportOptions'] });
    }
  });
};

export const useDeleteSupportOption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('support_options')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportOptions'] });
    }
  });
};
