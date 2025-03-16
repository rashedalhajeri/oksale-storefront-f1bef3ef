
import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

// Memoized Sidebar component to prevent re-rendering
const MemoizedSidebar = React.memo(
  ({ storeData }: { storeData: any }) => <Sidebar storeData={storeData} />,
  () => true // Always return true to prevent re-renders completely
);

MemoizedSidebar.displayName = 'MemoizedSidebar';

const DashboardLayout: React.FC<DashboardLayoutProps> = React.memo(({
  children,
  storeData
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // إغلاق الشريط الجانبي عند تغيير العرض
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen flex will-change-transform">
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleSidebar} 
            className="p-2.5 rounded-full bg-white shadow-md dark:bg-[#0E1632] focus:outline-none will-change-transform" 
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {sidebarOpen ? 
              <X className="h-5 w-5 text-bluesky-700 dark:text-white" /> : 
              <Menu className="h-5 w-5 text-bluesky-700 dark:text-white" />
            }
          </button>
        </div>
      )}
      
      {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
      <div className={cn(
        "transition-transform duration-300 transform z-40 will-change-transform", 
        isMobile ? "fixed inset-y-0 right-0 shadow-xl" : "sticky top-0 h-screen", 
        isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
      )}>
        {/* Using MemoizedSidebar instead of Sidebar to prevent re-renders */}
        <MemoizedSidebar storeData={storeData} />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm will-change-opacity" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Main Content - Using React memo to reduce unnecessary renders */}
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
  );
});

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
