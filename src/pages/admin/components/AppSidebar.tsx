
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, MessageSquare, Briefcase, Users, MapPin, Wrench, LifeBuoy, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/projects', label: 'Projects', icon: Wrench },
    { href: '/admin/services', label: 'Services', icon: LifeBuoy },
    { href: '/admin/careers', label: 'Careers', icon: Briefcase },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { href: '/admin/locations', label: 'Locations', icon: MapPin },
    { href: '/admin/support', label: 'Support Tickets', icon: LifeBuoy },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <h2 className="text-2xl font-bold">
            <Link to="/admin">
                <span className="group-data-[collapsible=icon]:hidden">Admin Panel</span>
                <span className="hidden group-data-[collapsible=icon]:block">AP</span>
            </Link>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive =
              (item.href === '/admin' && location.pathname === '/admin') ||
              (item.href !== '/admin' && location.pathname.startsWith(item.href));
            
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
