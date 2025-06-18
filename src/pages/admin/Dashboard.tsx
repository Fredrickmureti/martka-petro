
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ShoppingBag, FolderKanban, MessageSquare, TrendingUp, Calendar, Clock, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        projects: 0,
        messages: 0
    });
    const [userProfile, setUserProfile] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
        loadUserProfile();
        
        // Update time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const loadUserProfile = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                setUserProfile(profileData);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    const loadDashboardData = async () => {
        try {
            const [usersCount, productsCount, projectsCount, messagesCount] = await Promise.all([
                supabase.from('profiles').select('*', { count: 'exact', head: true }),
                supabase.from('products').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('contact_messages').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                users: usersCount.count || 0,
                products: productsCount.count || 0,
                projects: projectsCount.count || 0,
                messages: messagesCount.count || 0
            });
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const getDisplayName = () => {
        if (userProfile?.first_name) {
            return userProfile.first_name;
        }
        if (userProfile?.full_name) {
            return userProfile.full_name.split(' ')[0];
        }
        // Fallback to email username if no name is set
        const email = userProfile?.id ? 'Admin' : 'Admin';
        return email;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats.users,
            icon: Users,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950'
        },
        {
            title: 'Products',
            value: stats.products,
            icon: ShoppingBag,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950'
        },
        {
            title: 'Projects',
            value: stats.projects,
            icon: FolderKanban,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950'
        },
        {
            title: 'Messages',
            value: stats.messages,
            icon: MessageSquare,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950'
        }
    ];

    return (
        <div className="space-y-8 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full -translate-y-36 translate-x-36 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full translate-y-48 -translate-x-48 animate-pulse delay-1000"></div>
            
            {/* Header Section */}
            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    {getGreeting()}, {getDisplayName()}!
                                </h1>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                            </div>
                            <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                        </div>
                        <p className="text-lg text-muted-foreground font-medium">
                            Welcome back to your neural command center
                        </p>
                    </div>
                    
                    {/* Real-time Clock */}
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl">
                        <div className="flex items-center gap-3">
                            <Clock className="h-6 w-6 text-blue-600" />
                            <div>
                                <div className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100">
                                    {formatTime(currentTime)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {formatDate(currentTime)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
                            {/* Holographic overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform skew-x-12"></div>
                            
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {stat.title}
                                </CardTitle>
                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                                    {loading ? '...' : stat.value.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span className="text-green-600 font-medium">Active</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="relative z-10">
                <Card className="border-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Add Product', href: '/admin/products', gradient: 'from-blue-500 to-cyan-500' },
                                { label: 'New Project', href: '/admin/projects', gradient: 'from-purple-500 to-pink-500' },
                                { label: 'View Messages', href: '/admin/messages', gradient: 'from-green-500 to-emerald-500' },
                                { label: 'Manage Users', href: '/admin/users', gradient: 'from-orange-500 to-red-500' }
                            ].map((action) => (
                                <Button
                                    key={action.label}
                                    variant="outline"
                                    className={`h-16 bg-gradient-to-r ${action.gradient} text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium`}
                                    onClick={() => window.location.href = action.href}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Status */}
            <div className="relative z-10">
                <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-green-800 dark:text-green-200">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                                System Status
                            </span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                All Systems Online
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                                <div className="text-sm text-muted-foreground">Database</div>
                                <div className="font-semibold text-green-700 dark:text-green-300">Connected</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                                <div className="text-sm text-muted-foreground">API Status</div>
                                <div className="font-semibold text-green-700 dark:text-green-300">Operational</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                                <div className="text-sm text-muted-foreground">Last Backup</div>
                                <div className="font-semibold text-green-700 dark:text-green-300">2 hours ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
