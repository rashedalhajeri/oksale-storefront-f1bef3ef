
import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Store,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "نراك قريباً!",
      });
      
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "فشل تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md flex flex-col h-screen sticky top-0">
        {/* Store Info */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              {storeData?.logo_url ? (
                <AvatarImage src={storeData.logo_url} alt={storeData?.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white">
                  {storeData?.name?.charAt(0) || 'S'}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="overflow-hidden">
              <h2 className="text-lg font-semibold truncate">{storeData?.name}</h2>
              <Link 
                to={`/store/${storeData?.handle?.replace('@', '')}`} 
                className="text-sm text-gray-500 hover:text-oksale-600 truncate block"
                target="_blank"
              >
                {storeData?.handle}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
              نشط
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              asChild
            >
              <Link to={`/store/${storeData?.handle?.replace('@', '')}`} target="_blank">
                <Store className="h-3 w-3" />
                زيارة المتجر
              </Link>
            </Button>
          </div>
        </div>
        
        <Separator />
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
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
        </nav>
        
        {/* User Actions */}
        <div className="p-3 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
