
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, MessageSquare, Briefcase, Users, MapPin, Wrench, LifeBuoy } from 'lucide-react';

const NewSidebar = () => {
  const location = useLocation();

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
    <aside className="w-64 flex-shrink-0 border-r bg-slate-50 dark:bg-slate-900">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          {navItems.map((item) => {
            const isActive =
              (item.href === '/admin' && location.pathname === '/admin') ||
              (item.href !== '/admin' && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center rounded-lg px-4 py-2 text-base font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default NewSidebar;
