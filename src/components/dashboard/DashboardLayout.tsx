
import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import StoreHeader from './navigation/StoreHeader';
import SidebarNavigation from './navigation/SidebarNavigation';
import UserActions from './navigation/UserActions';
import { Separator } from "@/components/ui/separator";

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  storeData
}) => {
  // We don't need the openSidebar state anymore as it's handled by the Sidebar component
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* The dashboard sidebar that remains static */}
        <Sidebar side="right" className="text-white" style={{ "--sidebar-width": "16rem" } as React.CSSProperties}>
          <SidebarHeader className="flex-shrink-0 py-5 px-5">
            <StoreHeader storeData={storeData} />
            <Separator className="my-4 bg-white/10" />
          </SidebarHeader>

          <SidebarContent className="flex-1 px-3 py-2 overflow-auto bg-[#0E1632]">
            <SidebarNavigation storeData={storeData} />
          </SidebarContent>

          <SidebarFooter className="flex-shrink-0 mt-auto bg-[#0E1632]">
            <Separator className="my-2 bg-white/10" />
            <UserActions />
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-bluesky-50/50 dark:bg-gray-900 transition-all will-change-transform">
          {/* Background elements */}
          <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-purple-100/50 blur-3xl opacity-30 pointer-events-none"></div>
          
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl p-4 md:p-6 dark:bg-gray-800/60">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
