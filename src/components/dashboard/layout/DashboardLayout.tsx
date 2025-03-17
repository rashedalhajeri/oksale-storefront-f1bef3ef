
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
    } else {
      setSidebarVisible(true);
      setSidebarCollapsed(false);
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
        style={{ 
          backgroundColor: '#0f1642',
          boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.1)',
          transform: isMobile && !sidebarVisible ? 'translateX(100%)' : 'translateX(0)',
          zIndex: 1000
        }}
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
        <div className="mx-auto fade-in overflow-hidden" style={{ 
          maxWidth: '100%',
          borderRadius: '16px',
          backgroundColor: '#f7f9fc',
          padding: '16px'
        }}>
          {children}
        </div>
      </main>
      
      {/* Mobile toggle button - make it more visible and fix positioning */}
      {isMobile && (
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={sidebarVisible ? "إغلاق القائمة" : "فتح القائمة"}
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#fff',
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 1100,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
          }}
        >
          {sidebarVisible ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className={`mobile-overlay ${sidebarVisible ? 'visible' : ''}`} 
          onClick={() => setSidebarVisible(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 900,
            opacity: sidebarVisible ? 1 : 0,
            pointerEvents: sidebarVisible ? 'auto' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
