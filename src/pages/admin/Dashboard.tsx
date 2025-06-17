
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FolderKanban, ShoppingBag, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState<string>('Admin');

    // Fetch admin profile
    useEffect(() => {
        const getAdminProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile?.full_name) {
                    setAdminName(profile.full_name);
                } else {
                    // Fallback to email if no full name
                    setAdminName(session.user.email?.split('@')[0] || 'Admin');
                }
            }
        };
        getAdminProfile();
    }, []);

    // Fetch products count
    const { data: productsCount, isLoading: loadingProducts } = useQuery({
        queryKey: ['productsCount'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        }
    });

    // Fetch projects count
    const { data: projectsCount, isLoading: loadingProjects } = useQuery({
        queryKey: ['projectsCount'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        }
    });

    // Fetch active projects count
    const { data: activeProjectsCount, isLoading: loadingActiveProjects } = useQuery({
        queryKey: ['activeProjectsCount'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .in('status', ['In Progress', 'Planning']);
            if (error) throw error;
            return count || 0;
        }
    });

    // Fetch messages count
    const { data: messagesCount, isLoading: loadingMessages } = useQuery({
        queryKey: ['messagesCount'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        }
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2">
                        {getGreeting()}, {adminName}! 👋
                    </h1>
                    <p className="text-xl text-blue-100">
                        Welcome back to your command center. Here's what's happening today.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Products</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingProducts ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{productsCount}</div>
                        )}
                        <p className="text-xs text-orange-600 dark:text-orange-400">Total products in catalog</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Projects</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <FolderKanban className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{projectsCount}</div>
                        )}
                        <p className="text-xs text-blue-600 dark:text-blue-400">Total projects completed</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active Projects</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FolderKanban className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingActiveProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{activeProjectsCount}</div>
                        )}
                        <p className="text-xs text-green-600 dark:text-green-400">Currently in progress</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Messages</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingMessages ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{messagesCount}</div>
                        )}
                        <p className="text-xs text-purple-600 dark:text-purple-400">Total contact inquiries</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <ShoppingBag className="h-4 w-4 text-blue-600" />
                            </div>
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Manage your most important content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => navigate('/admin/products')}
                                className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow text-left hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <div className="font-medium text-sm">Add Product</div>
                                <div className="text-xs text-muted-foreground">Create new product</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/projects/new')}
                                className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow text-left hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <div className="font-medium text-sm">New Project</div>
                                <div className="text-xs text-muted-foreground">Add project showcase</div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <FolderKanban className="h-4 w-4 text-green-600" />
                            </div>
                            System Overview
                        </CardTitle>
                        <CardDescription>Your content management hub</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Use the sidebar to navigate between different sections and manage all aspects of your Martka Petroleum website. 
                            From here you can update products, showcase projects, manage team information, and handle customer inquiries.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
