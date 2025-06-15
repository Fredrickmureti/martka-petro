
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, FolderKanban, Wrench, Briefcase, MessageSquare, Ticket, LogOut, Map, Building } from 'lucide-react';
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
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/products', icon: ShoppingBag, label: 'Products' },
        { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
        { href: '/admin/services', icon: Wrench, label: 'Services' },
        { href: '/admin/careers', icon: Briefcase, label: 'Careers' },
        { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { href: '/admin/support', icon: Ticket, label: 'Support' },
        { href: '/admin/locations', icon: Building, label: 'Locations' },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-slate-800 text-white flex flex-col">
            <div className="h-24 flex items-center justify-center px-4 bg-slate-900 border-b border-slate-700">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <span className="text-lg font-bold">Martka Admin</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium",
                        location.pathname.startsWith(item.href) && "bg-slate-700 text-white"
                      )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:bg-slate-700 hover:text-white" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
