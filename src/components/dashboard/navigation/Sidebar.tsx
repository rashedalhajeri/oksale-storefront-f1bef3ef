
import React from 'react';
import { Separator } from "@/components/ui/separator";
import StoreHeader from './StoreHeader';
import SidebarNavigation from './SidebarNavigation';
import UserActions from './UserActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SidebarProps {
  storeData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex flex-col h-screen transition-all duration-300",
      "bg-[#1A1F2C] text-white",
      isMobile ? "w-full" : "w-64"
    )}>
      <div className="flex-shrink-0 pt-4 px-4">
        <StoreHeader storeData={storeData} />
        <Separator className="my-3 bg-white/10" />
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
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
