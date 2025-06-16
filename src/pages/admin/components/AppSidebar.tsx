
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FolderKanban, Wrench, Briefcase, MessageSquare, Ticket, Building, FileText, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const AppSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const menuItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/products', icon: ShoppingBag, label: 'Products' },
        { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
        { href: '/admin/services', icon: Wrench, label: 'Services' },
        { href: '/admin/careers', icon: Briefcase, label: 'Careers' },
        { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { href: '/admin/support', icon: Ticket, label: 'Support' },
        { href: '/admin/locations', icon: Building, label: 'Locations' },
        { href: '/admin/documents', icon: FileText, label: 'Documents' },
    ];

    const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

    return (
        <Sidebar className="border-r border-border/40 bg-sidebar">
            <SidebarHeader className="border-b border-border/40 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
                        <span className="text-lg font-bold text-white">M</span>
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <h2 className="text-lg font-semibold text-sidebar-foreground">Martka Admin</h2>
                        <p className="text-xs text-sidebar-foreground/60">Content Management</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={isActive(item.href)}
                                        className="w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                                    >
                                        <Link to={item.href}>
                                            <item.icon className="h-5 w-5 shrink-0" />
                                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/40 p-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="group-data-[collapsible=icon]:hidden">
                            <p className="text-xs text-sidebar-foreground/60">Theme</p>
                        </div>
                        <ThemeToggle />
                    </div>
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
