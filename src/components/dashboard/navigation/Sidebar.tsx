
import React from 'react';
import { Separator } from "@/components/ui/separator";
import StoreHeader from './StoreHeader';
import SidebarNavigation from './SidebarNavigation';
import UserActions from './UserActions';

interface SidebarProps {
  storeData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  return (
    <div className="w-full md:w-64 bg-white shadow-md flex flex-col h-screen sticky top-0">
      <StoreHeader storeData={storeData} />
      <Separator />
      <SidebarNavigation storeData={storeData} />
      <UserActions />
    </div>
  );
};

export default Sidebar;
