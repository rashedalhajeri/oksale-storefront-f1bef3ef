
import React, { useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard } from 'lucide-react';
import StatisticsSection from './StatisticsSection';
import ChartSection from './ChartSection';
import OrderStatusCard from './OrderStatusCard';
import RecentPendingOrdersCard from './RecentPendingOrdersCard';

// Improved type definitions with proper documentation
interface Order {
  id: string;
  status: string;
  customer_name?: string;
  total_amount?: number;
  created_at?: string;
}

interface Product {
  id: string;
  name: string;
  sales?: number;
  amount?: number;
}

interface Statistic {
  name: string;
  value: string | number;
  description: string;
  icon: string;
  trendUp?: boolean;
}

interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

interface OrderStatusItem {
  status: string;
  count: number;
  label: string;
}

interface MainDashboardProps {
  statistics: Statistic[];
  salesData: SalesData[];
  timeframe: string;
  setTimeframe: (value: string) => void;
  recentOrders: Order[];
  topProducts: Product[];
  orderStatusData: OrderStatusItem[];
  statsLoading: boolean;
  chartLoading: boolean;
  recentOrdersLoading: boolean;
  topProductsLoading: boolean;
  orderStatusLoading: boolean;
  currency: string;
}

/**
 * Main Dashboard component that displays the overview of store performance
 * including statistics, charts, and recent orders
 */
const MainDashboard: React.FC<MainDashboardProps> = ({
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
}) => {
  // Filter pending orders efficiently with useMemo
  const pendingOrders = useMemo(
    () => recentOrders.filter(order => order.status === 'pending'),
    [recentOrders]
  );

  return (
    <div className="space-y-6 rtl-dashboard">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Time Frame Selection */}
      <TimeFrameSelector 
        timeframe={timeframe} 
        setTimeframe={setTimeframe} 
      />

      {/* Statistics Section */}
      <StatisticsSection 
        statistics={statistics} 
        loading={statsLoading} 
        timeframe={timeframe} 
      />

      {/* Pending Orders Section */}
      <div className="mb-6">
        <RecentPendingOrdersCard 
          pendingOrders={pendingOrders} 
          loading={recentOrdersLoading} 
        />
      </div>

      {/* Charts and Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartSection 
          salesData={salesData} 
          loading={chartLoading}
          timeframe={timeframe}
          currency={currency}
        />
        <OrderStatusCard 
          orderStatusData={orderStatusData} 
          loading={orderStatusLoading} 
        />
      </div>
    </div>
  );
};

/**
 * Dashboard header component with title and subtitle
 */
const DashboardHeader: React.FC = () => (
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
);

/**
 * Time frame selector component with tabs
 */
interface TimeFrameSelectorProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({ timeframe, setTimeframe }) => (
  <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-6">
    <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
      <TabsTrigger value="day" className="text-sm">اليوم</TabsTrigger>
      <TabsTrigger value="week" className="text-sm">الأسبوع</TabsTrigger>
      <TabsTrigger value="month" className="text-sm">الشهر</TabsTrigger>
      <TabsTrigger value="year" className="text-sm">السنة</TabsTrigger>
    </TabsList>
  </Tabs>
);

export default MainDashboard;
