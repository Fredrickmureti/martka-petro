
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, FolderKanban, Wrench, Briefcase, MessageSquare, Ticket, LogOut, Building, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', gradient: 'from-blue-500 to-cyan-500' },
        { href: '/admin/users', icon: Users, label: 'Users', gradient: 'from-purple-500 to-pink-500' },
        { href: '/admin/products', icon: ShoppingBag, label: 'Products', gradient: 'from-orange-500 to-red-500' },
        { href: '/admin/projects', icon: FolderKanban, label: 'Projects', gradient: 'from-green-500 to-emerald-500' },
        { href: '/admin/services', icon: Wrench, label: 'Services', gradient: 'from-indigo-500 to-purple-500' },
        { href: '/admin/careers', icon: Briefcase, label: 'Careers', gradient: 'from-yellow-500 to-orange-500' },
        { href: '/admin/messages', icon: MessageSquare, label: 'Messages', gradient: 'from-pink-500 to-rose-500' },
        { href: '/admin/support', icon: Ticket, label: 'Support', gradient: 'from-teal-500 to-cyan-500' },
        { href: '/admin/locations', icon: Building, label: 'Locations', gradient: 'from-violet-500 to-purple-500' },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 rounded-full translate-y-20 -translate-x-20"></div>
            
            {/* Header */}
            <div className="h-24 flex items-center justify-center px-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 relative z-10">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Sparkles className="h-2 w-2 text-white" />
                        </div>
                    </div>
                    <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                            Martka
                        </span>
                        <div className="text-xs text-slate-400 font-medium">Neural Admin</div>
                    </div>
                </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 relative z-10">
                {navItems.map(item => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                        <Link 
                            key={item.label} 
                            to={item.href} 
                            className={cn(
                                "group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium relative overflow-hidden",
                                isActive && "text-white shadow-lg"
                            )}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-r opacity-20 rounded-xl",
                                    item.gradient
                                )}></div>
                            )}
                            
                            {/* Hover effect */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300",
                                item.gradient
                            )}></div>
                            
                            {/* Icon container */}
                            <div className={cn(
                                "relative h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
                                isActive 
                                    ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                                    : "bg-slate-700/50 group-hover:bg-slate-600/70"
                            )}>
                                <item.icon className={cn(
                                    "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-white" : "text-slate-300"
                                )} />
                            </div>
                            
                            <span className="relative font-medium">{item.label}</span>
                            
                            {/* Active border */}
                            {isActive && (
                                <div className={cn(
                                    "absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b rounded-full",
                                    item.gradient
                                )}></div>
                            )}
                        </Link>
                    );
                })}
                
                {/* Account Management */}
                <div className="pt-4 mt-4 border-t border-slate-700/50">
                    <Link 
                        to="/admin/account" 
                        className={cn(
                            "group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium relative overflow-hidden",
                            location.pathname === '/admin/account' && "text-white shadow-lg"
                        )}
                    >
                        {/* Active indicator */}
                        {location.pathname === '/admin/account' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 rounded-xl"></div>
                        )}
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                        
                        {/* Icon container */}
                        <div className={cn(
                            "relative h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
                            location.pathname === '/admin/account'
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg" 
                                : "bg-slate-700/50 group-hover:bg-slate-600/70"
                        )}>
                            <Settings className={cn(
                                "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                                location.pathname === '/admin/account' ? "text-white" : "text-slate-300"
                            )} />
                        </div>
                        
                        <span className="relative font-medium">Account</span>
                        
                        {/* Active border */}
                        {location.pathname === '/admin/account' && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                        )}
                    </Link>
                </div>
            </nav>
            
            {/* Logout */}
            <div className="p-4 border-t border-slate-700/50 relative z-10">
                <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-slate-300 hover:bg-red-500/10 hover:text-red-400 group transition-all duration-300 rounded-xl" 
                    onClick={handleLogout}
                >
                    <div className="h-8 w-8 rounded-lg bg-slate-700/50 group-hover:bg-red-500/20 flex items-center justify-center transition-all duration-300">
                        <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
