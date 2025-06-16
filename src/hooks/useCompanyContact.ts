
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCompanyContact = () => {
  return useQuery({
    queryKey: ['companyContact'],
    queryFn: async () => {
      // Try to get phone from headquarters location first
      const { data: headquarters } = await supabase
        .from('locations')
        .select('phone, email')
        .eq('is_headquarters', true)
        .single();

      if (headquarters?.phone) {
        return {
          phone: headquarters.phone,
          email: headquarters.email
        };
      }

      // Fallback to any location with phone
      const { data: anyLocation } = await supabase
        .from('locations')
        .select('phone, email')
        .not('phone', 'is', null)
        .limit(1)
        .single();

      return {
        phone: anyLocation?.phone || '+1-555-123-4567',
        email: anyLocation?.email || 'info@martkapet.com'
      };
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
