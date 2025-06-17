
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FolderKanban, ShoppingBag, User, Clock, Calendar, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState<string>('Admin');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    // Fetch unread messages count
    const { data: unreadMessagesCount, isLoading: loadingUnreadMessages } = useQuery({
        queryKey: ['unreadMessagesCount'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .eq('is_read', false);
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
            {/* Enhanced Welcome Section with Live Time */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {getGreeting()}, {adminName}! 👋
                            </h1>
                            <p className="text-xl text-blue-100">
                                Welcome back to your command center. Here's what's happening today.
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-blue-100 mb-2">
                                <Clock className="h-5 w-5" />
                                <span className="text-2xl font-mono font-bold">
                                    {format(currentTime, 'HH:mm:ss')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-200">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    {format(currentTime, 'EEEE, MMMM d, yyyy')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Products</CardTitle>
                        <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingProducts ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{productsCount}</div>
                        )}
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Total products in catalog</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Projects</CardTitle>
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <FolderKanban className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{projectsCount}</div>
                        )}
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Total projects completed</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active</CardTitle>
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingActiveProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{activeProjectsCount}</div>
                        )}
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">Currently in progress</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Messages</CardTitle>
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingMessages ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{messagesCount}</div>
                        )}
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Total contact inquiries</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Unread</CardTitle>
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center relative">
                            <User className="h-5 w-5 text-red-600 dark:text-red-400" />
                            {(unreadMessagesCount || 0) > 0 && (
                                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingUnreadMessages ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-3xl font-bold text-red-900 dark:text-red-100">{unreadMessagesCount}</div>
                        )}
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">Unread messages</p>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-blue-600" />
                            </div>
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Manage your most important content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => navigate('/admin/products')}
                                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all text-left hover:bg-slate-50 dark:hover:bg-slate-700 group"
                            >
                                <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">Add Product</div>
                                <div className="text-xs text-muted-foreground">Create new product</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/projects/new')}
                                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all text-left hover:bg-slate-50 dark:hover:bg-slate-700 group"
                            >
                                <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">New Project</div>
                                <div className="text-xs text-muted-foreground">Add project showcase</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/messages')}
                                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all text-left hover:bg-slate-50 dark:hover:bg-slate-700 group"
                            >
                                <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">View Messages</div>
                                <div className="text-xs text-muted-foreground">Check inquiries</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/content')}
                                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all text-left hover:bg-slate-50 dark:hover:bg-slate-700 group"
                            >
                                <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">Edit Content</div>
                                <div className="text-xs text-muted-foreground">Update website content</div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Activity className="h-4 w-4 text-green-600" />
                            </div>
                            System Overview
                        </CardTitle>
                        <CardDescription>Your content management hub status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border">
                                <div className="text-sm">Website Status</div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-green-600">Online</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border">
                                <div className="text-sm">Last Updated</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(), 'MMM d, h:mm a')}</div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border">
                                <div className="text-sm">Total Content Items</div>
                                <div className="text-xs font-medium">{(productsCount || 0) + (projectsCount || 0)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
