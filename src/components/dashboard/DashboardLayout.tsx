
import React, { ReactNode, useState } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-white shadow-md"
            aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {sidebarOpen ? 
              <X className="h-5 w-5 text-gray-700" /> : 
              <Menu className="h-5 w-5 text-gray-700" />
            }
          </button>
        </div>
      )}
      
      {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
      <div 
        className={`
          ${isMobile ? 'fixed inset-y-0 right-0 z-40 transition-transform duration-300 transform shadow-xl' : 'sticky top-0 h-screen'}
          ${isMobile && !sidebarOpen ? 'translate-x-full' : 'translate-x-0'}
        `}
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
      <div className={`flex-1 transition-all duration-300 ${isMobile ? 'px-4 py-6' : 'md:mr-64 p-6'}`}>
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
