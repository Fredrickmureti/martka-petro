import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FolderKanban, ShoppingBag, User, Clock, Calendar, TrendingUp, MessageSquare, Activity, Sparkles, Zap, Target } from 'lucide-react';
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

    // Fetch admin profile with enhanced name handling
    useEffect(() => {
        const getAdminProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, first_name, last_name')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile?.full_name) {
                    setAdminName(profile.full_name);
                } else if (profile?.first_name) {
                    setAdminName(profile.first_name);
                } else {
                    // Fallback to email username without domain
                    const emailUsername = session.user.email?.split('@')[0] || 'Admin';
                    setAdminName(emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1));
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

    const getMotivationalMessage = () => {
        const messages = [
            "Ready to make today extraordinary! ✨",
            "Your digital command center awaits! 🚀",
            "Let's build something amazing together! 💫",
            "The future of management is here! ⚡",
            "Your success story continues! 🌟"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
        <div className="space-y-8">
            {/* Futuristic Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 p-8 text-white shadow-2xl border border-purple-500/20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-purple-600/20 rounded-full translate-y-32 -translate-x-32 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-600/20 rounded-full -translate-x-20 -translate-y-20 animate-pulse delay-500"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                                        {getGreeting()}, {adminName}!
                                    </h1>
                                    <p className="text-xl text-purple-100 font-medium">
                                        {getMotivationalMessage()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-purple-100">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Zap className="h-4 w-4 text-yellow-300" />
                                    <span className="text-sm font-medium">Neural Command Center</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Target className="h-4 w-4 text-green-300" />
                                    <span className="text-sm font-medium">Operations Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-2 text-purple-100 mb-3">
                                <Clock className="h-5 w-5" />
                                <span className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                                    {format(currentTime, 'HH:mm:ss')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-200">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    {format(currentTime, 'EEEE, MMMM d, yyyy')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Futuristic Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 dark:from-orange-950 dark:to-red-900 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <CardTitle className="text-sm font-bold text-orange-700 dark:text-orange-300">Products</CardTitle>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative">
                        {loadingProducts ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {/* {productsCount} */}
                            </div>
                        )}
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">Total products in catalog</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-900 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <CardTitle className="text-sm font-bold text-blue-700 dark:text-blue-300">Projects</CardTitle>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FolderKanban className="h-6 w-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative">
                        {loadingProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {/* {projectsCount} */}
                            </div>
                        )}
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">Total projects completed</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-900 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <CardTitle className="text-sm font-bold text-green-700 dark:text-green-300">Active</CardTitle>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative">
                        {loadingActiveProjects ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {/* {activeProjectsCount} */}
                            </div>
                        )}
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">Currently in progress</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 dark:from-purple-950 dark:to-violet-900 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <CardTitle className="text-sm font-bold text-purple-700 dark:text-purple-300">Messages</CardTitle>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative">
                        {loadingMessages ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                {/* {messagesCount} */}
                            </div>
                        )}
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">Total contact inquiries</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 via-red-100 to-pink-100 dark:from-red-950 dark:to-pink-900 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <CardTitle className="text-sm font-bold text-red-700 dark:text-red-300">Unread</CardTitle>
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                            <User className="h-6 w-6 text-white" />
                            {(unreadMessagesCount || 0) > 0 && (
                                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="relative">
                        {loadingUnreadMessages ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                {/* {unreadMessagesCount} */}
                            </div>
                        )}
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">Unread messages</p>
                    </CardContent>
                </Card>
            </div>

            {/* Futuristic Quick Actions */}
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 shadow-xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
                    <CardHeader className="relative">
                        <CardTitle className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                                Quick Actions
                            </span>
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">Streamline your workflow with instant access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => navigate('/admin/products')}
                                className="group p-4 rounded-xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-950 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 text-left hover:scale-105"
                            >
                                <div className="font-bold text-sm text-blue-700 dark:text-blue-300 group-hover:text-blue-600 transition-colors">Add Product</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Create new product</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/projects/new')}
                                className="group p-4 rounded-xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-950 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all text-left hover:scale-105"
                            >
                                <div className="font-bold text-sm text-blue-700 dark:text-blue-300 group-hover:text-blue-600 transition-colors">New Project</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Add project showcase</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/messages')}
                                className="group p-4 rounded-xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-950 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all text-left hover:scale-105"
                            >
                                <div className="font-bold text-sm text-blue-700 dark:text-blue-300 group-hover:text-blue-600 transition-colors">View Messages</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Check inquiries</div>
                            </button>
                            <button 
                                onClick={() => navigate('/admin/content')}
                                className="group p-4 rounded-xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-950 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all text-left hover:scale-105"
                            >
                                <div className="font-bold text-sm text-blue-700 dark:text-blue-300 group-hover:text-blue-600 transition-colors">Edit Content</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Update website content</div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-950 dark:to-emerald-950 shadow-xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc=')] opacity-50"></div>
                    <CardHeader className="relative">
                        <CardTitle className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                                System Overview
                            </span>
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">Real-time system health monitoring</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-green-50 dark:from-slate-800 dark:to-green-950 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
                                <div className="text-sm font-medium text-green-700 dark:text-green-300">Website Status</div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                                    <span className="text-xs text-green-600 dark:text-green-400 font-bold">ONLINE</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-green-50 dark:from-slate-800 dark:to-green-950 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
                                <div className="text-sm font-medium text-green-700 dark:text-green-300">Last Updated</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(), 'MMM d, h:mm a')}</div>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-green-50 dark:from-slate-800 dark:to-green-950 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
                                <div className="text-sm font-medium text-green-700 dark:text-green-300">Total Content Items</div>
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
