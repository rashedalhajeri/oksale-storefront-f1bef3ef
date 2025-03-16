
import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
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

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex bg-bluesky-50/50 dark:bg-gray-900">
      {/* Toggle Button for Mobile */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleSidebar} 
            className="p-2.5 rounded-full bg-white shadow-md dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-bluesky-500 hover:bg-bluesky-50 transition-colors" 
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {sidebarOpen ? 
              <X className="h-5 w-5 text-bluesky-700 dark:text-gray-300" /> : 
              <Menu className="h-5 w-5 text-bluesky-700 dark:text-gray-300" />
            }
          </button>
        </div>
      )}
      
      {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
      <div className={cn(
        "transition-transform duration-300 transform z-40", 
        isMobile ? "fixed inset-y-0 right-0 shadow-xl" : "sticky top-0 h-screen", 
        isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
      )}>
        <Sidebar storeData={storeData} />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Background elements */}
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-purple-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl p-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
