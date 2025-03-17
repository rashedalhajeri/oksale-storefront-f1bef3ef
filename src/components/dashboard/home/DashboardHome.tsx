
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardContext } from '@/context/DashboardContext';

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

  // Filter pending orders
  const pendingOrders = React.useMemo(() => {
    return recentOrders.filter(order => order.status === 'pending');
  }, [recentOrders]);

  return (
    <div className="space-y-6 rtl-dashboard">
      {/* Dashboard Header */}
      <div className="section-header">
        <div className="section-icon-container bg-indigo-50">
          <LayoutDashboard className="text-indigo-600 w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">نظرة عامة على أداء متجرك</p>
        </div>
      </div>

      {/* Time Frame Selector */}
      <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="day" className="text-sm">اليوم</TabsTrigger>
          <TabsTrigger value="week" className="text-sm">الأسبوع</TabsTrigger>
          <TabsTrigger value="month" className="text-sm">الشهر</TabsTrigger>
          <TabsTrigger value="year" className="text-sm">السنة</TabsTrigger>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
