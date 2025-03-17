
import React, { ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import '@/styles/dashboard.css';

// Memoized Sidebar component with proper dependency checks
const MemoizedSidebar = React.memo(
  ({ storeData }: { storeData: any }) => <Sidebar storeData={storeData} />,
  (prevProps, nextProps) => {
    // Only re-render if store ID changes, not on every reference change
    return prevProps.storeData?.id === nextProps.storeData?.id &&
           prevProps.storeData?.handle === nextProps.storeData?.handle;
  }
);

MemoizedSidebar.displayName = 'MemoizedSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Memoize storeData to prevent unnecessary re-renders
  const memoizedStoreData = useMemo(() => storeData, [storeData?.id, storeData?.handle]);

  // Add rtl-dashboard class to HTML element for RTL styling
  useEffect(() => {
    document.documentElement.classList.add('dashboard', 'rtl-dashboard');
    
    return () => {
      document.documentElement.classList.remove('dashboard', 'rtl-dashboard');
    };
  }, []);

  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Memoized toggle function to prevent recreation on every render
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen flex flex-row-reverse will-change-transform">
      {/* Sidebar - always visible on desktop, conditionally visible on mobile, placed on the right in RTL mode */}
      <div className={cn(
        "transition-transform duration-300 transform z-40 will-change-transform", 
        isMobile ? "fixed inset-y-0 right-0 shadow-xl" : "sticky top-0 h-screen", 
        isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
      )}>
        {/* Use memoized sidebar with memoized store data */}
        <div className="h-full overflow-hidden rounded-l-2xl">
          <MemoizedSidebar storeData={memoizedStoreData} />
        </div>
      </div>

      {/* Main content - in the RTL layout, this is on the left side */}
      <div className="flex-1 p-4 bg-bluesky-50/50 dark:bg-gray-900 transition-all will-change-transform">
        {/* Background elements */}
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-10 right-[5%] w-72 h-72 rounded-full bg-purple-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl p-4 md:p-6 dark:bg-gray-800/60 animate-in fade-in duration-300">
            {children}
          </div>
        </div>
      </div>
      
      {/* Mobile toggle button - positioned on right side for RTL */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleSidebar} 
            className="p-2.5 rounded-full bg-white shadow-md dark:bg-[#0E1632] focus:outline-none will-change-transform" 
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {sidebarOpen ? 
              <X className="h-5 w-5 text-indigo-700 dark:text-white" /> : 
              <Menu className="h-5 w-5 text-indigo-700 dark:text-white" />
            }
          </button>
        </div>
      )}
      
      {/* Mobile overlay when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm will-change-opacity animate-in fade-in duration-200" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
    </div>
  );
};

// Optimize component with React.memo to prevent unnecessary re-renders
export default React.memo(DashboardLayout, (prevProps, nextProps) => {
  // Only re-render if store data ID changes (not on every reference change)
  return prevProps.storeData?.id === nextProps.storeData?.id &&
         prevProps.storeData?.handle === nextProps.storeData?.handle;
});
