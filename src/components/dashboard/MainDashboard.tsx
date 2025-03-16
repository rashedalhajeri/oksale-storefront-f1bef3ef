
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import StatisticsSection from './StatisticsSection';
import ChartSection from './ChartSection';
import OrderStatusCard from './OrderStatusCard';
import RecentOrdersCard from './RecentOrdersCard';
import TopProductsCard from './TopProductsCard';

interface MainDashboardProps {
  statistics: any[];
  salesData: any[];
  timeframe: string;
  setTimeframe: (value: string) => void;
  recentOrders: any[];
  topProducts: any[];
  orderStatusData: any[];
  statsLoading: boolean;
  chartLoading: boolean;
  recentOrdersLoading: boolean;
  topProductsLoading: boolean;
  orderStatusLoading: boolean;
  currency: string;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  statistics,
  salesData,
  timeframe,
  setTimeframe,
  recentOrders,
  topProducts,
  orderStatusData,
  statsLoading,
  chartLoading,
  recentOrdersLoading,
  topProductsLoading,
  orderStatusLoading,
  currency
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">مرحباً بك في لوحة التحكم</h1>
        <p className="text-gray-600 dark:text-gray-400">هذه نظرة عامة على أداء متجرك</p>
      </div>

      {/* Time Frame Tabs */}
      <Tabs defaultValue="week" className="mb-6" value={timeframe} onValueChange={setTimeframe}>
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="day" className="text-sm">اليوم</TabsTrigger>
          <TabsTrigger value="week" className="text-sm">الأسبوع</TabsTrigger>
          <TabsTrigger value="month" className="text-sm">الشهر</TabsTrigger>
          <TabsTrigger value="year" className="text-sm">السنة</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Statistics Section */}
      <StatisticsSection statistics={statistics} loading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <ChartSection 
          salesData={salesData} 
          loading={chartLoading}
          timeframe={timeframe}
          currency={currency}
        />

        {/* Order Status */}
        <OrderStatusCard orderStatusData={orderStatusData} loading={orderStatusLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Latest Orders */}
        <RecentOrdersCard recentOrders={recentOrders} loading={recentOrdersLoading} />

        {/* Top Products */}
        <TopProductsCard topProducts={topProducts} loading={topProductsLoading} currency={currency} />
      </div>
    </div>
  );
};

export default MainDashboard;
