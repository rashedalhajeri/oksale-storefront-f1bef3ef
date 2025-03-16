
import React from 'react';
import { Separator } from "@/components/ui/separator";
import StoreHeader from './StoreHeader';
import SidebarNavigation from './SidebarNavigation';
import UserActions from './UserActions';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  storeData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white shadow-md flex flex-col w-64 h-screen overflow-hidden">
      <StoreHeader storeData={storeData} />
      <Separator />
      <SidebarNavigation storeData={storeData} />
      <UserActions />
    </div>
  );
};

export default Sidebar;
