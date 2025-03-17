import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard } from 'lucide-react';
import StatisticsSection from './StatisticsSection';
import ChartSection from './ChartSection';
import OrderStatusCard from './OrderStatusCard';
import RecentPendingOrdersCard from './RecentPendingOrdersCard';

interface Order {
  id: string;
  status: string;
  // يمكن إضافة خصائص إضافية حسب الحاجة
}

interface Product {
  id: string;
  name: string;
  // يمكن إضافة خصائص إضافية حسب الحاجة
}

interface Statistics {
  // تحديد البيانات الخاصة بالإحصائيات
}

interface SalesData {
  // تحديد بيانات المبيعات
}

interface OrderStatus {
  // تحديد بيانات حالة الطلب
}

interface MainDashboardProps {
  statistics: Statistics[];
  salesData: SalesData[];
  timeframe: string;
  setTimeframe: (value: string) => void;
  recentOrders: Order[];
  topProducts: Product[];
  orderStatusData: OrderStatus[];
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
  // Filter pending orders
  const pendingOrders = React.useMemo(
    () => recentOrders.filter(order => order.status === 'pending'),
    [recentOrders]
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-indigo-50 rounded-full">
            <LayoutDashboard className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">نظرة عامة على أداء متجرك</p>
          </div>
        </div>
      </div>

      {/* Time Frame Tabs */}
      <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="day" className="text-sm">اليوم</TabsTrigger>
          <TabsTrigger value="week" className="text-sm">الأسبوع</TabsTrigger>
          <TabsTrigger value="month" className="text-sm">الشهر</TabsTrigger>
          <TabsTrigger value="year" className="text-sm">السنة</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Statistics Section */}
      <StatisticsSection statistics={statistics} loading={statsLoading} timeframe={timeframe} />

      {/* Pending Orders Section */}
      <div className="mb-6">
        <RecentPendingOrdersCard 
          pendingOrders={pendingOrders} 
          loading={recentOrdersLoading} 
        />
      </div>

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
    </div>
  );
};

export default MainDashboard;
