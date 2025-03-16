
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from '@/utils/dashboard/currencyUtils';

import { 
  fetchStoreStatistics, 
  generateSalesData, 
  getTopSellingProducts, 
  getRecentOrders,
  getOrderStatusStats,
  calculateProgress
} from '@/utils/dashboard';

export const useDashboardData = (storeId: string) => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState("week");
  const [dashboardStats, setDashboardStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    revenue: 0,
    visitsCount: 0,
    currency: 'SAR'
  });
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [recentOrdersLoading, setRecentOrdersLoading] = useState(true);
  const [orderStatusLoading, setOrderStatusLoading] = useState(true);

  const calculateTarget = (current: number) => Math.ceil(current * 1.2); // أعلى بنسبة 20% من الحالي

  const loadDashboardData = async () => {
    try {
      setStatsLoading(true);
      const stats = await fetchStoreStatistics(storeId);
      setDashboardStats({
        productsCount: stats.productsCount,
        ordersCount: stats.ordersCount,
        revenue: parseFloat(stats.revenue),
        visitsCount: stats.visitsCount,
        currency: stats.currency || 'SAR'
      });
      
      setChartLoading(true);
      const salesChartData = generateSalesData(stats.orders, timeframe);
      setSalesData(salesChartData);
      
      setTopProductsLoading(true);
      const topProductsData = await getTopSellingProducts(storeId);
      setTopProducts(topProductsData);
      
      setRecentOrdersLoading(true);
      const recentOrdersData = await getRecentOrders(storeId);
      setRecentOrders(recentOrdersData);
      
      setOrderStatusLoading(true);
      const orderStatusStats = await getOrderStatusStats(storeId);
      setOrderStatusData(orderStatusStats);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        variant: "destructive",
        title: "فشل تحميل البيانات",
        description: "حدث خطأ أثناء تحميل بيانات لوحة التحكم، يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setStatsLoading(false);
      setChartLoading(false);
      setTopProductsLoading(false);
      setRecentOrdersLoading(false);
      setOrderStatusLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      loadDashboardData();
    }
  }, [storeId]);
  
  useEffect(() => {
    if (storeId) {
      setChartLoading(true);
      
      fetchStoreStatistics(storeId).then(stats => {
        const salesChartData = generateSalesData(stats.orders, timeframe);
        setSalesData(salesChartData);
        setChartLoading(false);
      }).catch(error => {
        console.error("Error reloading sales data:", error);
        setChartLoading(false);
      });
    }
  }, [timeframe, storeId]);

  const statistics = [
    {
      name: "المنتجات",
      value: dashboardStats.productsCount.toString(),
      icon: "products",
      description: "إجمالي المنتجات",
      change: "+20% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.productsCount, calculateTarget(dashboardStats.productsCount))
    },
    {
      name: "الزيارات",
      value: dashboardStats.visitsCount.toString(),
      icon: "visitors",
      description: "زائر هذا الشهر",
      change: "+15% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.visitsCount, calculateTarget(dashboardStats.visitsCount))
    },
    {
      name: "الطلبات",
      value: dashboardStats.ordersCount.toString(),
      icon: "orders",
      description: "طلب هذا الشهر",
      change: "+10% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.ordersCount, calculateTarget(dashboardStats.ordersCount))
    },
    {
      name: "الإيرادات",
      value: formatCurrency(dashboardStats.revenue, dashboardStats.currency),
      icon: "revenue",
      description: "الإيرادات هذا الشهر",
      change: "+25% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.revenue, calculateTarget(dashboardStats.revenue))
    }
  ];

  return {
    timeframe,
    setTimeframe,
    statistics,
    salesData,
    topProducts,
    recentOrders,
    orderStatusData,
    statsLoading,
    chartLoading,
    topProductsLoading,
    recentOrdersLoading,
    orderStatusLoading,
    loadDashboardData
  };
};
