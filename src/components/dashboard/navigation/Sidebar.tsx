
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  LineChart, 
  LogOut,
  Megaphone,
  Cog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  storeData: any;
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ storeData, collapsed = false }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "تم تسجيل خروجك من حسابك بنجاح",
      });
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
      });
    }
  };

  // Menu items array
  const menuItems = [
    { path: '/dashboard', name: 'الرئيسية', icon: Home },
    { path: '/dashboard/products', name: 'المنتجات', icon: ShoppingBag },
    { path: '/dashboard/orders', name: 'الطلبات', icon: ShoppingCart },
    { path: '/dashboard/customers', name: 'العملاء', icon: Users },
    { path: '/dashboard/categories', name: 'التقارير', icon: LineChart },
    { path: '/dashboard/marketing', name: 'التسويق', icon: Megaphone },
    { path: '/dashboard/settings/general', name: 'الإعدادات', icon: Cog }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-800">
      {/* Store logo and name */}
      <div className={cn(
        "flex items-center p-4",
        collapsed ? "justify-center" : "justify-start"
      )}>
        {storeData?.logo_url ? (
          <Avatar className="w-10 h-10 border border-white/10">
            <AvatarImage src={storeData.logo_url} alt={storeData?.name || 'Store'} />
            <AvatarFallback className="bg-indigo-600 text-white">
              {storeData?.name?.charAt(0) || 'S'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {storeData?.name?.charAt(0) || 'S'}
          </div>
        )}
        
        {!collapsed && (
          <div className="mr-3 overflow-hidden">
            <h3 className="text-sm font-medium text-white truncate">{storeData?.name || 'المتجر'}</h3>
            {storeData?.handle && (
              <p className="text-xs text-white/60 truncate">@{storeData?.handle}</p>
            )}
          </div>
        )}
      </div>
      
      <Separator className="bg-white/10 my-3" />
      
      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => cn(
                  "flex items-center rounded-lg transition-colors py-2.5",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                  collapsed ? "justify-center px-2" : "px-3"
                )}
              >
                <item.icon size={20} className={cn(collapsed ? "mx-0" : "ml-2")} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      <Separator className="bg-white/10 my-2" />
      
      {/* Logout button */}
      <div className="p-3">
        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center rounded-lg transition-colors py-2.5 w-full",
            "text-white/70 hover:bg-white/5 hover:text-white",
            collapsed ? "justify-center px-2" : "px-3"
          )}
        >
          <LogOut size={20} className={cn(collapsed ? "mx-0" : "ml-2")} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
