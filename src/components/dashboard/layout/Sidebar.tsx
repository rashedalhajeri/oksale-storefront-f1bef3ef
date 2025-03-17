
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Users, Tag, 
  Megaphone, Settings, ExternalLink, LogOut 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  storeData: any;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, end }) => (
  <NavLink 
    to={to} 
    end={end}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-lg
      transition-colors duration-200
      ${isActive 
        ? 'bg-white/10 text-white font-medium' 
        : 'text-white/70 hover:bg-white/5 hover:text-white'}
    `}
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  return (
    <div className="h-full flex flex-col p-4">
      {/* Store logo and info */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3 mb-2">
          {storeData?.logo_url ? (
            <img 
              src={storeData.logo_url} 
              alt={storeData.name} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              {storeData?.name?.charAt(0) || 'S'}
            </div>
          )}
          <div>
            <h2 className="font-medium text-white">{storeData?.name || 'متجري'}</h2>
            <p className="text-xs text-white/70">@{storeData?.handle || 'mystore'}</p>
          </div>
        </div>
        
        {/* Store preview link */}
        {storeData?.handle && (
          <a 
            href={`/${storeData.handle}`}
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>معاينة المتجر</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
      
      <Separator className="bg-white/10 my-2" />
      
      {/* Navigation section */}
      <nav className="flex-1 py-4 space-y-1">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="لوحة التحكم" end />
        <NavItem to="/dashboard/products" icon={ShoppingBag} label="المنتجات" />
        <NavItem to="/dashboard/orders" icon={Tag} label="الطلبات" />
        <NavItem to="/dashboard/customers" icon={Users} label="العملاء" />
        <NavItem to="/dashboard/marketing" icon={Megaphone} label="التسويق" />
      </nav>
      
      <Separator className="bg-white/10 my-2" />
      
      {/* Settings section */}
      <div className="py-2 space-y-1">
        <NavItem to="/dashboard/settings/general" icon={Settings} label="الإعدادات" />
      </div>
      
      <Separator className="bg-white/10 my-2" />
      
      {/* User actions */}
      <div className="mt-auto py-4">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
