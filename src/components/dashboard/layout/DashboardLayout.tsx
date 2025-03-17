
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import '@/styles/dashboard.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Apply RTL class to document when component mounts
  useEffect(() => {
    document.documentElement.classList.add('rtl-layout');
    document.body.classList.add('rtl-dashboard');
    // Prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.documentElement.style.maxWidth = '100vw';
    
    return () => {
      document.documentElement.classList.remove('rtl-layout');
      document.body.classList.remove('rtl-dashboard');
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.width = '';
      document.documentElement.style.maxWidth = '';
    };
  }, []);

  // Automatically hide sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(false);
      setSidebarCollapsed(false);
    } else {
      setSidebarVisible(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <div className="dashboard-container rtl-dashboard overflow-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      {/* Sidebar */}
      <aside 
        className={`dashboard-sidebar ${!sidebarVisible ? 'mobile-hidden' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{ backgroundColor: '#0f1642' }}
      >
        <Sidebar storeData={storeData} collapsed={sidebarCollapsed} />
        
        {/* Desktop collapse button */}
        {!isMobile && (
          <button 
            className="sidebar-collapse-btn" 
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            <ChevronLeft size={16} className={sidebarCollapsed ? 'rotate-180' : ''} />
          </button>
        )}
      </aside>

      {/* Main content */}
      <main className={`dashboard-main ${!sidebarVisible ? 'sidebar-hidden' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="mx-auto fade-in overflow-hidden" style={{ maxWidth: '100%' }}>
          {children}
        </div>
      </main>
      
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={sidebarVisible ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {sidebarVisible ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className={`mobile-overlay ${sidebarVisible ? 'visible' : ''}`} 
          onClick={() => setSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
