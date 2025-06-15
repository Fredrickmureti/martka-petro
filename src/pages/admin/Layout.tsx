
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from './components/AppSidebar';
import { Loader2 } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                const { data: roleData, error } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', session.user.id)
                    .eq('role', 'admin')
                    .single();

                if (error || !roleData) {
                    navigate('/admin/login');
                } else {
                    setLoading(false);
                }
            } else {
                navigate('/admin/login');
            }
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/admin/login');
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-lg">Verifying Access...</span>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background text-foreground">
                <AppSidebar />
                <main className="flex-1">
                    <div className="p-8">
                       <header className="mb-4">
                            <SidebarTrigger />
                        </header>
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;
