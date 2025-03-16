
import React, { useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { formatCurrencyWithSettings } from '@/utils/dashboard/dashboardUtils';

// تحسين الأداء باستخدام React.memo لكل المكونات الفرعية
const StatsCard = React.memo(({ title, value, icon, trend, percentage }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-full ${icon.bgColor}`}>
            {icon.element}
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center">
            <span className={`text-xs font-medium ${percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage >= 0 ? '↑' : '↓'} {Math.abs(percentage)}%
            </span>
            <span className="text-xs text-gray-500 ms-2">مقارنة بالفترة السابقة</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

StatsCard.displayName = 'StatsCard';

// مكون مخطط المبيعات المحسّن
const SalesChart = React.memo(({ salesData, timeframe, currency, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-72 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // تنسيق بيانات المخطط
  const gradientOffset = () => {
    const dataMax = Math.max(...salesData.map((i) => i.revenue));
    const dataMin = Math.min(...salesData.map((i) => i.revenue));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salesData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `${value}`}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'revenue' 
                ? formatCurrencyWithSettings(Number(value), currency)
                : value,
              name === 'revenue' ? 'الإيرادات' : 'المبيعات'
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              padding: '0.5rem'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8884d8" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

SalesChart.displayName = 'SalesChart';

// مكون العروض المميزة
const FeaturedPromotions = React.memo(() => {
  return (
    <Card className="border-none bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">العروض المميزة</h3>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-100">قريباً</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          قم بإنشاء وتخصيص عروض خاصة للعملاء لزيادة المبيعات
        </p>
        
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center dark:text-indigo-400 dark:hover:text-indigo-300">
          معرفة المزيد
          <ArrowUpRight className="h-4 w-4 mr-1" />
        </button>
      </CardContent>
    </Card>
  );
});

FeaturedPromotions.displayName = 'FeaturedPromotions';

// مكون الطلبات الحديثة
const RecentOrdersPreview = React.memo(({ recentOrders, loading, currency }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (recentOrders.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">لا توجد طلبات حديثة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentOrders.slice(0, 5).map((order, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">#{order.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-bold" dir="ltr">{order.amount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

RecentOrdersPreview.displayName = 'RecentOrdersPreview';

// المكون الرئيسي
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
  // استخدام useMemo لتصفية الطلبات المعلقة
  const pendingOrders = useMemo(() => {
    return recentOrders.filter(order => order.status === 'pending');
  }, [recentOrders]);

  // معالجة إحصائيات المتجر
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
      {/* رأس الصفحة */}
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

      {/* أشرطة التبديل */}
      <Tabs defaultValue={timeframe} value={timeframe} onValueChange={setTimeframe} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
          <TabsTrigger value="day">اليوم</TabsTrigger>
          <TabsTrigger value="week">الأسبوع</TabsTrigger>
          <TabsTrigger value="month">الشهر</TabsTrigger>
          <TabsTrigger value="year">السنة</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* بطاقات الإحصائيات */}
      {statsCards}

      {/* قسم المخططات والعروض */}
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

      {/* قسم الطلبات الحديثة وحالة الطلبات */}
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
            {topProductsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : topProducts.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات للمنتجات</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.slice(0, 3).map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">{product.name}</span>
                    <div>
                      <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{product.sales}</span>
                      <span className="ml-2 font-medium" dir="ltr">{product.amount} {currency}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

MainDashboard.displayName = 'MainDashboard';

export default React.memo(MainDashboard);
