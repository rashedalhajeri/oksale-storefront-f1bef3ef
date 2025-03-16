
import React, { useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Import refactored components
import StatsCard from './stats/StatsCard';
import SalesChart from './charts/SalesChart';
import FeaturedPromotions from './promotions/FeaturedPromotions';
import RecentOrdersPreview from './orders/RecentOrdersPreview';
import TopProductsPreview from './products/TopProductsPreview';

// Main component interface
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
  // Use useMemo to filter pending orders
  const pendingOrders = useMemo(() => {
    return recentOrders.filter(order => order.status === 'pending');
  }, [recentOrders]);

  // Process store statistics
  const statsCards = useMemo(() => {
    if (statsLoading) {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          ))}
        </div>
      );
    }

    const icons = [
      { 
        bgColor: 'bg-blue-50 dark:bg-blue-900/20', 
        element: <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      },
      { 
        bgColor: 'bg-green-50 dark:bg-green-900/20', 
        element: <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
      },
      { 
        bgColor: 'bg-purple-50 dark:bg-purple-900/20', 
        element: <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      },
      { 
        bgColor: 'bg-amber-50 dark:bg-amber-900/20', 
        element: <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
      }
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.name}
            value={stat.value}
            icon={icons[index]}
            trend={true}
            percentage={Math.floor(Math.random() * 20)}
          />
        ))}
      </div>
    );
  }, [statistics, statsLoading]);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
            <LayoutDashboard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">نظرة عامة على أداء متجرك</p>
          </div>
        </div>
      </div>

      {/* Toggle tabs */}
      <Tabs defaultValue={timeframe} value={timeframe} onValueChange={setTimeframe} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
          <TabsTrigger value="day">اليوم</TabsTrigger>
          <TabsTrigger value="week">الأسبوع</TabsTrigger>
          <TabsTrigger value="month">الشهر</TabsTrigger>
          <TabsTrigger value="year">السنة</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats cards */}
      {statsCards}

      {/* Charts and promotions section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">تحليل المبيعات والإيرادات</CardTitle>
                <CardDescription>أداء المبيعات خلال الفترة المحددة</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SalesChart 
              salesData={salesData}
              timeframe={timeframe}
              currency={currency}
              isLoading={chartLoading}
            />
          </CardContent>
        </Card>

        <FeaturedPromotions />
      </div>

      {/* Recent orders and order status section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">الطلبات الحديثة</CardTitle>
            <CardDescription>آخر 5 طلبات تم استلامها</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrdersPreview 
              recentOrders={recentOrders}
              loading={recentOrdersLoading}
              currency={currency}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">المنتجات الأكثر مبيعاً</CardTitle>
            <CardDescription>أفضل المنتجات أداءً في متجرك</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProductsPreview 
              topProducts={topProducts}
              loading={topProductsLoading}
              currency={currency}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
