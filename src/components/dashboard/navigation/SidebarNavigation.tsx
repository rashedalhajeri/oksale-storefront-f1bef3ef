
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Store
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  storeData: any;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ storeData }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    },
    { 
      name: 'إعدادات المتجر', 
      path: '/dashboard/settings/general', 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];

  const settingsItems = [
    { name: 'المعلومات العامة', path: '/dashboard/settings/general' },
    { name: 'الظهور والتصميم', path: '/dashboard/settings/appearance' },
    { name: 'وسائل الدفع', path: '/dashboard/settings/payment' },
    { name: 'الشحن والتوصيل', path: '/dashboard/settings/shipping' },
    { name: 'التنبيهات والإشعارات', path: '/dashboard/settings/notifications' },
    { name: 'المستخدمين والصلاحيات', path: '/dashboard/settings/users' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  const isSettingsPath = () => {
    return location.pathname.includes('/dashboard/settings');
  };
  
  return (
    <div className="flex-1 overflow-y-auto py-4 px-3">
      {/* Store Header Section */}
      <div className="p-4 mb-4">
        <div className="flex items-center justify-between mt-2">
          <div className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
            نشط
          </div>
          <div className="flex gap-1">
            <Link 
              to="/dashboard/settings/general"
              className="text-xs flex items-center gap-1 border border-oksale-500 text-oksale-700 hover:bg-oksale-50 px-2 py-1 rounded"
            >
              <PenSquare className="h-3 w-3" />
              تحرير المتجر
            </Link>
            <Link 
              to={`/${storeData?.handle}`} 
              className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
              target="_blank"
            >
              <Store className="h-3 w-3" />
              زيارة
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      {/* Main Navigation */}
      <ul className="space-y-1 mt-4">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-oksale-50 text-oksale-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Settings Sub-navigation - Only visible when on settings pages */}
      {isSettingsPath() && (
        <div className="mt-4 mr-4 border-r border-gray-200 pr-3">
          <p className="text-xs text-gray-500 mb-2 pr-3">إعدادات المتجر</p>
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive(item.path)
                      ? "bg-oksale-50 text-oksale-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarNavigation;
