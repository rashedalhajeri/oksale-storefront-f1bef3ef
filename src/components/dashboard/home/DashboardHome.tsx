
import React from 'react';
import { LayoutDashboard, Plus, Settings, CreditCard, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardContext } from '@/context/DashboardContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Import dashboard sections as separate components
import StatisticsSection from './sections/StatisticsSection';
import SalesChartSection from './sections/SalesChartSection';
import OrderStatusSection from './sections/OrderStatusSection';
import PendingOrdersSection from './sections/PendingOrdersSection';

const ActionCard = ({ icon: Icon, title, description, buttonText, buttonLink }) => (
  <Card className="shadow-sm border-gray-100 overflow-hidden">
    <CardContent className="p-0">
      <div className="flex items-start md:items-center gap-4 p-4 flex-col md:flex-row">
        <div className="p-3 rounded-lg bg-indigo-50">
          <Icon className="text-indigo-600 w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium mb-1">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <Button asChild variant="secondary" className="shrink-0 mt-2 md:mt-0">
          <Link to={buttonLink} className="flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>{buttonText}</span>
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

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
    <div className="space-y-5 rtl-dashboard overflow-hidden" style={{ maxWidth: '100%' }}>
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

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ActionCard 
          icon={Plus}
          title="إضافة منتجات"
          description="أضف منتجات جديدة إلى متجرك"
          buttonText="إضافة منتج"
          buttonLink="/dashboard/products/new"
        />
        <ActionCard 
          icon={Settings}
          title="إعداد متجرك"
          description="قم بتخصيص ظهور وإعدادات متجرك"
          buttonText="الإعدادات"
          buttonLink="/dashboard/settings/general"
        />
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

      {/* More Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ActionCard 
          icon={CreditCard}
          title="طرق الدفع"
          description="قم بإعداد طرق الدفع في متجرك"
          buttonText="إعداد الدفع"
          buttonLink="/dashboard/settings/payment"
        />
        <ActionCard 
          icon={Truck}
          title="خيارات الشحن"
          description="قم بتفعيل خيارات الشحن والتوصيل"
          buttonText="إعداد الشحن"
          buttonLink="/dashboard/settings/shipping"
        />
      </div>

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
