
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from '@/utils/dashboard/currencyUtils';
import { formatCurrencyWithSettings, formatNumber } from '@/utils/dashboard/dashboardUtils';
import { useQuery } from '@tanstack/react-query';

import { 
  fetchStoreStatistics, 
  generateSalesData, 
  getTopSellingProducts, 
  getRecentOrders,
  getOrderStatusStats
} from '@/utils/dashboard';

export const useDashboardData = (storeId: string) => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState("week");
  const [dashboardStats, setDashboardStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    revenue: 0,
    soldProductsCount: 0,
    currency: 'SAR'
  });
  
  // Fetch statistics using React Query with proper caching
  const { 
    data: statsData, 
    isLoading: statsLoading,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboard-stats', storeId],
    queryFn: () => fetchStoreStatistics(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    meta: {
      onSuccess: (data: any) => {
        setDashboardStats({
          productsCount: data.productsCount,
          ordersCount: data.ordersCount,
          revenue: parseFloat(data.revenue),
          soldProductsCount: data.soldProductsCount || 0,
          currency: data.currency || 'SAR'
        });
      },
      onError: (error: any) => {
        console.error("Error loading dashboard stats:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل الإحصائيات",
          description: "حدث خطأ أثناء تحميل إحصائيات لوحة التحكم، يرجى المحاولة مرة أخرى.",
        });
      }
    }
  });
  
  // Generate sales chart data with proper memoization
  const salesData = useMemo(() => {
    if (!statsData?.orders) return [];
    return generateSalesData(statsData.orders, timeframe);
  }, [statsData?.orders, timeframe]);
  
  // Fetch top products with proper caching
  const { 
    data: topProducts = [], 
    isLoading: topProductsLoading 
  } = useQuery({
    queryKey: ['top-products', storeId],
    queryFn: () => getTopSellingProducts(storeId),
    enabled: !!storeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  });
  
  // Fetch recent orders with proper caching
  const { 
    data: recentOrders = [], 
    isLoading: recentOrdersLoading 
  } = useQuery({
    queryKey: ['recent-orders', storeId],
    queryFn: () => getRecentOrders(storeId, 15),
    enabled: !!storeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Fetch order status stats with proper caching
  const { 
    data: orderStatusData = [], 
    isLoading: orderStatusLoading 
  } = useQuery({
    queryKey: ['order-status', storeId],
    queryFn: () => getOrderStatusStats(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Compute statistics with useMemo to avoid unnecessary recalculation
  const statistics = useMemo(() => [
    {
      name: "المنتجات",
      value: formatNumber(dashboardStats.productsCount),
      icon: "products",
      description: "إجمالي المنتجات",
      trendUp: true
    },
    {
      name: "المبيعات",
      value: formatNumber(dashboardStats.soldProductsCount),
      icon: "sold",
      description: "المنتجات المباعة",
      trendUp: true
    },
    {
      name: "الطلبات",
      value: formatNumber(dashboardStats.ordersCount),
      icon: "orders",
      description: "طلب",
      trendUp: true
    },
    {
      name: "الإيرادات",
      value: formatCurrencyWithSettings(dashboardStats.revenue, dashboardStats.currency),
      icon: "revenue",
      description: "الإيرادات",
      trendUp: true
    }
  ], [dashboardStats]);

  const loadDashboardData = useCallback(() => {
    refetchStats();
  }, [refetchStats]);

  return {
    timeframe,
    setTimeframe,
    statistics,
    salesData,
    topProducts,
    recentOrders,
    orderStatusData,
    statsLoading,
    chartLoading: statsLoading, // We derive chart loading from stats loading
    topProductsLoading,
    recentOrdersLoading,
    orderStatusLoading,
    loadDashboardData,
    currency: dashboardStats.currency
  };
};
