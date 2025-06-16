
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Fetch all content sections for the support page
export const useSupportPageContent = () => {
    return useQuery({
        queryKey: ['supportPageContent'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('support_page_content')
                .select('*')
                .eq('is_active', true);

            if (error) throw new Error(error.message);
            
            // Transform the array into an object for easier access by section_key
            return data.reduce((acc, item) => {
                if (item.section_key) {
                    acc[item.section_key] = item;
                }
                return acc;
            }, {} as Record<string, Tables<'support_page_content'>>);
        },
        refetchInterval: 30000,
    });
};

// Fetch all FAQs (including inactive ones for admin interface)
export const useSupportFaqs = () => {
    return useQuery({
        queryKey: ['supportFaqs'],
        queryFn: async (): Promise<Tables<'support_faqs'>[]> => {
            const { data, error } = await supabase
                .from('support_faqs')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw new Error(error.message);
            return data;
        },
        refetchInterval: 30000,
    });
};

// Fetch all Downloads (including inactive ones for admin interface)
export const useSupportDownloads = () => {
    return useQuery({
        queryKey: ['supportDownloads'],
        queryFn: async (): Promise<Tables<'support_downloads'>[]> => {
            const { data, error } = await supabase
                .from('support_downloads')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw new Error(error.message);
            return data;
        },
        refetchInterval: 30000,
    });
};

// Fetch all Support Options (including inactive ones for admin interface)
export const useSupportOptions = () => {
    return useQuery({
        queryKey: ['supportOptions'],
        queryFn: async (): Promise<Tables<'support_options'>[]> => {
            const { data, error } = await supabase
                .from('support_options')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw new Error(error.message);
            return data;
        },
        refetchInterval: 30000,
    });
};
