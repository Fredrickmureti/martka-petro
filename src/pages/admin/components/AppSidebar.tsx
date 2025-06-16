
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, FolderKanban, Wrench, Briefcase, MessageSquare, Ticket, LogOut, Building, FileText, Settings, BarChart3, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();

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
    { href: '/admin/documents', icon: FileText, label: 'Documents' },
    { href: '/admin/manage-support', icon: HeadphonesIcon, label: 'Manage Support' },
    { href: '/admin/manage-content', icon: Settings, label: 'Manage Content' },
    { href: '/admin/manage-stats', icon: BarChart3, label: 'Manage Stats' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {state === 'expanded' && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate">Martka Admin</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.href)}
                    className="w-full"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {state === 'expanded' && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 h-10"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {state === 'expanded' && <span className="truncate">Logout</span>}
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
