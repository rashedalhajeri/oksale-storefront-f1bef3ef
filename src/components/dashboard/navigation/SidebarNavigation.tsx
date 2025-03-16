
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Tag, 
  Percent, 
  Settings,
  ChevronDown,
  ChevronRight,
  PenSquare,
  ExternalLink,
  Bell
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
      name: 'لوحة التحكم', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'الطلبات', 
      path: '/dashboard/orders', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: 'المنتجات', 
      path: '/dashboard/products', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      name: 'العملاء', 
      path: '/dashboard/customers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'الفئات', 
      path: '/dashboard/categories', 
      icon: <Tag className="h-5 w-5" /> 
    },
    { 
      name: 'العروض', 
      path: '/dashboard/offers', 
      icon: <Percent className="h-5 w-5" /> 
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
      <div className="p-3 mb-3 bg-bluesky-50/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full font-medium">
            نشط
          </div>
          <div className="flex gap-1">
            <NavLink 
              to="/dashboard/settings/general"
              className="text-xs flex items-center gap-1 border border-bluesky-200 text-bluesky-700 hover:bg-bluesky-50 px-2 py-1 rounded transition-colors"
            >
              <PenSquare className="h-3 w-3" />
              تحرير
            </NavLink>
            <a 
              href={`/${storeData?.handle}`} 
              className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-bluesky-50 transition-colors text-bluesky-600"
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
      <ul className="space-y-1 mt-4">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all hover-lift",
                isActive
                  ? "bg-bluesky-100/70 text-bluesky-700 shadow-sm"
                  : "text-gray-700 hover:bg-bluesky-50"
              )}
              end={item.path === '/dashboard'}
            >
              {({isActive}) => (
                <>
                  <div className={cn(
                    "p-1.5 rounded-md transition-colors",
                    isActive ? "bg-bluesky-200/50 text-bluesky-700" : "text-gray-500 bg-gray-100/50"
                  )}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        
        {/* Settings with dropdown */}
        <li>
          <Collapsible
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            className="w-full"
          >
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors hover-lift",
              location.pathname.includes('/dashboard/settings')
                ? "bg-bluesky-100/70 text-bluesky-700 shadow-sm"
                : "text-gray-700 hover:bg-bluesky-50"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-1.5 rounded-md transition-colors",
                  location.pathname.includes('/dashboard/settings') ? "bg-bluesky-200/50 text-bluesky-700" : "text-gray-500 bg-gray-100/50"
                )}>
                  <Settings className="h-5 w-5" />
                </div>
                <span>إعدادات المتجر</span>
              </div>
              {isSettingsOpen ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 mr-4 border-r border-bluesky-100 pr-3">
              {settingsItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-bluesky-50 text-bluesky-700 font-medium"
                      : "text-gray-600 hover:bg-bluesky-50/50"
                  )}
                >
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
