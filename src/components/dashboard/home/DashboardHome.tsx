
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardContext } from '@/context/DashboardContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Import dashboard sections as separate components
import StatisticsSection from './sections/StatisticsSection';
import SalesChartSection from './sections/SalesChartSection';
import OrderStatusSection from './sections/OrderStatusSection';
import PendingOrdersSection from './sections/PendingOrdersSection';

const DashboardHome: React.FC = () => {
  const { 
    statistics, 
    salesData, 
    timeframe, 
    setTimeframe, 
    recentOrders,
    orderStatusData,
    statsLoading,
    chartLoading,
    recentOrdersLoading,
    orderStatusLoading,
    currency
  } = useDashboardContext();
  
  const isMobile = useIsMobile();

  // Filter pending orders
  const pendingOrders = React.useMemo(() => {
    return recentOrders.filter(order => order.status === 'pending');
  }, [recentOrders]);

  return (
    <div className="space-y-4 rtl-dashboard overflow-hidden" style={{ maxWidth: '100%' }}>
      {/* Dashboard Header */}
      <div className="section-header mb-3">
        <div className="section-icon-container bg-indigo-50">
          <LayoutDashboard className="text-indigo-600 w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs">نظرة عامة على أداء متجرك</p>
        </div>
      </div>

      {/* Time Frame Selector */}
      <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-4">
        <TabsList className="grid grid-cols-4 w-full mx-auto">
          <TabsTrigger value="day" className="text-xs py-1">اليوم</TabsTrigger>
          <TabsTrigger value="week" className="text-xs py-1">الأسبوع</TabsTrigger>
          <TabsTrigger value="month" className="text-xs py-1">الشهر</TabsTrigger>
          <TabsTrigger value="year" className="text-xs py-1">السنة</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Statistics Cards */}
      <StatisticsSection 
        statistics={statistics} 
        loading={statsLoading} 
        timeframe={timeframe} 
      />

      {/* Pending Orders */}
      <PendingOrdersSection 
        pendingOrders={pendingOrders} 
        loading={recentOrdersLoading} 
      />

      {/* Sales Chart and Order Status */}
      <div className={isMobile ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-3 gap-6"}>
        <SalesChartSection 
          salesData={salesData} 
          loading={chartLoading}
          timeframe={timeframe}
          currency={currency}
        />
        <OrderStatusSection 
          orderStatusData={orderStatusData} 
          loading={orderStatusLoading} 
        />
      </div>
    </div>
  );
};

export default DashboardHome;
