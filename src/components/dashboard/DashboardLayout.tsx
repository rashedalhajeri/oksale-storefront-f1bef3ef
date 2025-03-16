
import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-white shadow-md dark:bg-gray-800"
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {sidebarOpen ? 
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : 
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            }
          </button>
        </div>
      )}
      
      {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
      <div 
        className={cn(
          "transition-transform duration-300 transform z-40",
          isMobile ? "fixed inset-y-0 right-0 shadow-xl" : "sticky top-0 h-screen",
          isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
        )}
      >
        <Sidebar storeData={storeData} />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isMobile ? "p-4" : "p-6 md:mr-64"
        )}
      >
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
