
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';

// Fetch all content for the contact page
const fetchContactPageContent = async () => {
    const { data, error } = await supabase
        .from('page_content')
        .select('element_id, content')
        .eq('page', 'contact');

    if (error) throw new Error(error.message);
    // Transform the array into an object for easier access
    return data.reduce((acc, item) => {
        if (item.element_id && item.content) {
            acc[item.element_id] = item.content;
        }
        return acc;
    }, {} as Record<string, any>);
};

export const useContactPageContent = () => {
    return useQuery({
        queryKey: ['contactPageContent'],
        queryFn: fetchContactPageContent,
    });
};

// Fetch contact items
const fetchContactItems = async () => {
    const { data, error } = await supabase
        .from('contact_items')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
};

export const useContactItems = () => {
    return useQuery({
        queryKey: ['contactItems'],
        queryFn: fetchContactItems,
    });
};

// Fetch all locations
const fetchLocations = async () => {
    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('is_headquarters', { ascending: false })
        .order('name', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
};

export const useLocations = () => {
    return useQuery<Tables<'locations'>[]>({
        queryKey: ['locations'],
        queryFn: fetchLocations,
    });
};

// Fetch headquarters locations
const fetchHeadquarters = async () => {
    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_headquarters', true);

    if (error) throw new Error(error.message);
    return data;
};

export const useHeadquarters = () => {
    return useQuery<Tables<'locations'>[]>({
        queryKey: ['headquarters'],
        queryFn: fetchHeadquarters,
    });
};

// Fetch services for the dropdown
const fetchServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('id, title')
        .order('title');
    
    if (error) throw new Error(error.message);
    return data.map(service => ({ id: service.id, name: service.title }));
};

export const useServicesList = () => {
    return useQuery({
        queryKey: ['servicesList'],
        queryFn: fetchServices,
    });
};


// Mutation for submitting the contact form
type ContactMessagePayload = {
    name: string;
    email: string;
    phone: string;
    company: string;
    service_id: number | null;
    message: string;
};

const submitContactMessage = async (newMessage: ContactMessagePayload) => {
    const { data, error } = await supabase.from('contact_messages').insert([
        {
            name: newMessage.name,
            email: newMessage.email,
            phone: newMessage.phone,
            company: newMessage.company,
            service_id: newMessage.service_id,
            message: newMessage.message,
        },
    ]).select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSubmitContactMessage = () => {
    return useMutation({
        mutationFn: submitContactMessage,
        onSuccess: () => {
            toast({
                title: "Message Sent!",
                description: "Thank you for contacting us. We will get back to you shortly.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `There was a problem sending your message: ${error.message}`,
                variant: 'destructive',
            });
        },
    });
};
