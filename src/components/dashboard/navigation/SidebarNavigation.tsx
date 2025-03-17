
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  BarChart, 
  Settings,
  ChevronDown,
  ChevronRight,
  Megaphone,
  ArrowRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarNavigationProps {
  storeData: any;
}

// Enhanced memo to completely prevent re-renders
const SidebarNavigation: React.FC<SidebarNavigationProps> = React.memo(({ storeData }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  
  // Automatically open settings submenu if on a settings page
  useEffect(() => {
    if (location.pathname.includes('/dashboard/settings')) {
      setIsSettingsOpen(true);
    }
    
    // Update active item based on current location
    setActiveItem(location.pathname);
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
  
  return (
    <div className="flex-1 overflow-y-auto will-change-transform scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {/* Main Navigation */}
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = (
            item.path === '/dashboard' 
              ? location.pathname === '/dashboard' 
              : location.pathname.startsWith(item.path)
          );
          
          return (
            <li key={item.path} className="relative">
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'} // Only exact match for dashboard home
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all rtl-dashboard group",
                  isActive
                    ? "bg-[#1A2747] text-white"
                    : "text-white/80 hover:text-white hover:bg-[#1A2747]/50"
                )}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-1">
                  {item.name}
                </span>
                {isActive && (
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </NavLink>
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
              "flex items-center justify-between w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all group",
              location.pathname.includes('/dashboard/settings')
                ? "bg-[#1A2747] text-white"
                : "text-white/80 hover:text-white hover:bg-[#1A2747]/50"
            )}>
              <div className="flex items-center gap-3">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  <Settings className="h-5 w-5" />
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-1">الإعدادات</span>
              </div>
              <motion.div
                animate={{ rotate: isSettingsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-1 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {settingsItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center mr-7 gap-2 px-4 py-2 rounded-md text-sm transition-all group",
                        isActive
                          ? "bg-[#1A2747]/70 text-white"
                          : "text-white/70 hover:bg-[#1A2747]/30 hover:text-white"
                      )}
                    >
                      <span className="transition-all duration-300 group-hover:translate-x-1">{item.name}</span>
                      {isActive && (
                        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </NavLink>
                  );
                })}
              </motion.div>
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
