
import React, { ReactNode } from 'react';
import Sidebar from './navigation/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar storeData={storeData} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
