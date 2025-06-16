
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useStatsContent = () => {
  return useQuery({
    queryKey: ['pageContent', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', 'stats');
      
      if (error) throw error;
      return data.reduce((acc, item) => {
        acc[item.element_id] = item.content;
        return acc;
      }, {} as Record<string, any>);
    },
    refetchInterval: 30000,
  });
};

export const useUpdateStatsContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ elementId, content }: { elementId: string; content: any }) => {
      const { data: existing } = await supabase
        .from('page_content')
        .select('id')
        .eq('page', 'stats')
        .eq('element_id', elementId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('page_content')
          .update({ content })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('page_content')
          .insert({
            page: 'stats',
            element_id: elementId,
            content
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageContent', 'stats'] });
      queryClient.refetchQueries({ queryKey: ['pageContent', 'stats'] });
    }
  });
};
