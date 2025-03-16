import React, { ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './navigation/Sidebar';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import '@/styles/dashboard.css'; // تصحيح مسار استيراد تحسينات CSS

interface DashboardLayoutProps {
  children: ReactNode;
  storeData: any;
}

// مكون Sidebar ممويز مع تكوين مذكرة مناسب
const MemoizedSidebar = React.memo(
  ({ storeData }: { storeData: any }) => <Sidebar storeData={storeData} />,
  (prevProps, nextProps) => {
    // إعادة التصيير فقط عند تغيير معرف المتجر، وليس عند كل تغيير مرجع
    return prevProps.storeData?.id === nextProps.storeData?.id &&
           prevProps.storeData?.handle === nextProps.storeData?.handle;
  }
);

MemoizedSidebar.displayName = 'MemoizedSidebar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, storeData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // جعل storeData ممويزة لمنع عمليات إعادة التصيير غير الضرورية
  const memoizedStoreData = useMemo(() => storeData, [storeData?.id, storeData?.handle]);

  // إغلاق الشريط الجانبي عند التبديل إلى عرض سطح المكتب
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // وظيفة التبديل المحفوظة لمنع إعادة الإنشاء في كل عملية تصيير
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen flex will-change-transform">
      {/* زر التبديل للجوال */}
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
      
      {/* الشريط الجانبي - مرئي دائمًا على سطح المكتب، مرئي بشرط على الجوال */}
      <div className={cn(
        "transition-transform duration-300 transform z-40 will-change-transform", 
        isMobile ? "fixed inset-y-0 right-0 shadow-xl" : "sticky top-0 h-screen", 
        isMobile && !sidebarOpen ? "translate-x-full" : "translate-x-0"
      )}>
        {/* استخدام الشريط الجانبي الممويز مع بيانات المتجر الممويزة */}
        <div className="h-full overflow-hidden rounded-l-2xl">
          <MemoizedSidebar storeData={memoizedStoreData} />
        </div>
      </div>
      
      {/* التراكب للجوال عندما يكون الشريط الجانبي مفتوحًا */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm will-change-opacity animate-in fade-in duration-200" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-4 bg-bluesky-50/50 dark:bg-gray-900 transition-all will-change-transform">
        {/* عناصر الخلفية */}
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-purple-100/50 blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl p-4 md:p-6 dark:bg-gray-800/60 animate-in fade-in duration-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// تحسين المكون باستخدام React.memo ومنع عمليات إعادة التصيير غير الضرورية
export default React.memo(DashboardLayout, (prevProps, nextProps) => {
  // إعادة التصيير فقط إذا تغير معرف بيانات المتجر (وليس عند كل تغيير مرجع)
  return prevProps.storeData?.id === nextProps.storeData?.id &&
         prevProps.storeData?.handle === nextProps.storeData?.handle;
});
