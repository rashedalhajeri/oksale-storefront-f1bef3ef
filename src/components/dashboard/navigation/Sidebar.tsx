
import React from 'react';
import { Separator } from "@/components/ui/separator";
import StoreHeader from './StoreHeader';
import SidebarNavigation from './SidebarNavigation';
import UserActions from './UserActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  storeData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex flex-col h-screen transition-all duration-300",
      "bg-[#0E1632] text-white",
      isMobile ? "w-full" : "w-64"
    )}>
      <div className="flex-shrink-0 py-5 px-5">
        <StoreHeader storeData={storeData} />
        <div className="mt-2 mb-1">
          <NavLink 
            to={`/${storeData?.handle}`}
            className="text-xs flex items-center gap-1.5 text-white/80 hover:text-white transition-colors py-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>معاينة المتجر</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </NavLink>
        </div>
        <Separator className="my-4 bg-white/10" />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <SidebarNavigation storeData={storeData} />
      </div>
      <div className="flex-shrink-0 mt-auto">
        <Separator className="my-2 bg-white/10" />
        <UserActions />
      </div>
    </div>
  );
};

export default Sidebar;
