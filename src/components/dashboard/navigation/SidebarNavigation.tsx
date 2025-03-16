
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  BarChart, 
  Settings,
  ChevronDown,
  ChevronRight,
  Megaphone
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  storeData: any;
}

// Enhanced memo to completely prevent re-renders
const SidebarNavigation: React.FC<SidebarNavigationProps> = React.memo(({ storeData }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Automatically open settings submenu if on a settings page
  useEffect(() => {
    if (location.pathname.includes('/dashboard/settings')) {
      setIsSettingsOpen(true);
    }
  }, [location.pathname]);

  // Memoize navigation items to prevent recreation on each render
  const navigationItems = useMemo(() => [
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
    },
    { 
      name: 'التسويق', 
      path: '/dashboard/marketing', 
      icon: <Megaphone className="h-5 w-5" /> 
    }
  ], []);

  // Memoize settings items to prevent recreation on each render
  const settingsItems = useMemo(() => [
    { name: 'المعلومات العامة', path: '/dashboard/settings/general' },
    { name: 'الظهور والتصميم', path: '/dashboard/settings/appearance' },
    { name: 'وسائل الدفع', path: '/dashboard/settings/payment' },
    { name: 'الشحن والتوصيل', path: '/dashboard/settings/shipping' },
    { name: 'التنبيهات والإشعارات', path: '/dashboard/settings/notifications' },
    { name: 'إعدادات الواتساب', path: '/dashboard/settings/whatsapp' },
    { name: 'المستخدمين والصلاحيات', path: '/dashboard/settings/users' }
  ], []);

  // Memoized active route check function
  const isActive = useCallback((path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);
  
  // Memoized click handler to prevent navigation on active routes
  const handleLinkClick = useCallback((e: React.MouseEvent, isCurrentlyActive: boolean) => {
    if (isCurrentlyActive) {
      e.preventDefault();
    }
  }, []);
  
  return (
    <div className="flex-1 overflow-y-auto will-change-transform">
      {/* Main Navigation */}
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const isCurrentlyActive = isActive(item.path);
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                  isCurrentlyActive
                    ? "bg-[#1A2747] text-white"
                    : "text-white/80 hover:text-white hover:bg-[#1A2747]/50"
                )}
                onClick={(e) => handleLinkClick(e, isCurrentlyActive)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
        
        {/* Settings with dropdown */}
        <li>
          <Collapsible
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            className="w-full mt-1"
          >
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname.includes('/dashboard/settings')
                ? "bg-[#1A2747] text-white"
                : "text-white/80 hover:text-white hover:bg-[#1A2747]/50"
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
            <CollapsibleContent className="mt-1 space-y-1">
              {settingsItems.map((item) => {
                const isCurrentlyActive = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center mr-7 gap-2 px-4 py-2 rounded-md text-sm transition-colors",
                      isCurrentlyActive
                        ? "bg-[#1A2747]/70 text-white"
                        : "text-white/70 hover:bg-[#1A2747]/30 hover:text-white"
                    )}
                    onClick={(e) => handleLinkClick(e, isCurrentlyActive)}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </li>
      </ul>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if storeData ID changes (which should be rare)
  return prevProps.storeData?.id === nextProps.storeData?.id;
});

SidebarNavigation.displayName = 'SidebarNavigation';

export default SidebarNavigation;
