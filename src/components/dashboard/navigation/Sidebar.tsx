
import React, { useMemo } from 'react';
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

const Sidebar: React.FC<SidebarProps> = React.memo(({ storeData }) => {
  const isMobile = useIsMobile();
  
  // Optimize store preview link rendering with useMemo
  const storePreviewLink = useMemo(() => {
    if (!storeData?.handle) return null;
    
    return (
      <NavLink 
        to={`/${storeData.handle}`}
        className="text-xs flex items-center gap-1.5 text-white/80 hover:text-white transition-colors py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>معاينة المتجر</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </NavLink>
    );
  }, [storeData?.handle]);
  
  return (
    <div className={cn(
      "flex flex-col h-screen transition-all duration-300",
      "bg-[#0E1632] text-white will-change-transform",
      isMobile ? "w-full" : "w-64"
    )}>
      <div className="flex-shrink-0 py-5 px-5">
        <StoreHeader storeData={storeData} />
        <div className="mt-2 mb-1">
          {storePreviewLink}
        </div>
        <Separator className="my-4 bg-white/10" />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar">
        <SidebarNavigation storeData={storeData} />
      </div>
      <div className="flex-shrink-0 mt-auto">
        <Separator className="my-2 bg-white/10" />
        <UserActions />
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Optimize re-rendering with improved comparison
  return prevProps.storeData?.id === nextProps.storeData?.id && 
         prevProps.storeData?.handle === nextProps.storeData?.handle &&
         prevProps.storeData?.name === nextProps.storeData?.name;
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
