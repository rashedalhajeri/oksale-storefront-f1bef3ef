
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  ShoppingCart, 
  BarChart, 
  Settings,
  ChevronDown,
  ChevronRight,
  PenSquare,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarNavigationProps {
  storeData: any;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ storeData }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Automatically open settings submenu if on a settings page
  useEffect(() => {
    if (location.pathname.includes('/dashboard/settings')) {
      setIsSettingsOpen(true);
    }
  }, [location.pathname]);

  const navigationItems = [
    { 
      name: 'الرئيسية', 
      path: '/dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: 'المنتجات', 
      path: '/dashboard/products', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      name: 'الطلبات', 
      path: '/dashboard/orders', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: 'العملاء', 
      path: '/dashboard/customers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'التقارير', 
      path: '/dashboard/categories', 
      icon: <BarChart className="h-5 w-5" /> 
    }
  ];

  const settingsItems = [
    { name: 'المعلومات العامة', path: '/dashboard/settings/general' },
    { name: 'الظهور والتصميم', path: '/dashboard/settings/appearance' },
    { name: 'وسائل الدفع', path: '/dashboard/settings/payment' },
    { name: 'الشحن والتوصيل', path: '/dashboard/settings/shipping' },
    { name: 'التنبيهات والإشعارات', path: '/dashboard/settings/notifications' },
    { name: 'إعدادات الواتساب', path: '/dashboard/settings/whatsapp' },
    { name: 'المستخدمين والصلاحيات', path: '/dashboard/settings/users' }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="flex-1 overflow-y-auto py-2 px-3">
      {/* Store Header Section */}
      <div className="p-3 mb-4 bg-white/5 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full font-medium">
            نشط
          </div>
          <div className="flex gap-1">
            <NavLink 
              to="/dashboard/settings/general"
              className="text-xs flex items-center gap-1 border border-white/10 text-white hover:bg-white/10 px-2 py-1 rounded transition-colors"
            >
              <PenSquare className="h-3 w-3" />
              تحرير
            </NavLink>
            <a 
              href={`/${storeData?.handle}`} 
              className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3 w-3" />
              زيارة
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-1 mt-2">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
              end={item.path === '/dashboard'}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
        
        {/* Settings with dropdown */}
        <li>
          <Collapsible
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            className="w-full mt-1"
          >
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname.includes('/dashboard/settings')
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            )}>
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>الإعدادات</span>
              </div>
              {isSettingsOpen ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 mr-3 border-r border-white/10 pr-3">
              {settingsItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.path.includes('/payment') && (
                    <CreditCard className="h-4 w-4" />
                  )}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </li>
      </ul>
    </div>
  );
};

export default SidebarNavigation;
