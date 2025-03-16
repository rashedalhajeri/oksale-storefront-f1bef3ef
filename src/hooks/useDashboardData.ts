
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
  
  // Fetch statistics using React Query - fixed onSuccess usage
  const { 
    data: statsData, 
    isLoading: statsLoading,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboard-stats', storeId],
    queryFn: () => fetchStoreStatistics(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: {
      // Using callbacks object inside meta for newer React Query version
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
  
  // Effect to update stats when data comes in - fallback for meta callbacks
  useEffect(() => {
    if (statsData) {
      setDashboardStats({
        productsCount: statsData.productsCount,
        ordersCount: statsData.ordersCount,
        revenue: parseFloat(statsData.revenue),
        soldProductsCount: statsData.soldProductsCount || 0,
        currency: statsData.currency || 'SAR'
      });
    }
  }, [statsData]);
  
  // Generate sales chart data
  const salesData = useMemo(() => {
    if (!statsData?.orders) return [];
    return generateSalesData(statsData.orders, timeframe);
  }, [statsData?.orders, timeframe]);
  
  // Fetch top products using React Query
  const { 
    data: topProducts = [], 
    isLoading: topProductsLoading 
  } = useQuery({
    queryKey: ['top-products', storeId],
    queryFn: () => getTopSellingProducts(storeId),
    enabled: !!storeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  
  // Fetch recent orders using React Query
  const { 
    data: recentOrders = [], 
    isLoading: recentOrdersLoading 
  } = useQuery({
    queryKey: ['recent-orders', storeId],
    queryFn: () => getRecentOrders(storeId, 15),
    enabled: !!storeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  // Fetch order status stats using React Query
  const { 
    data: orderStatusData = [], 
    isLoading: orderStatusLoading 
  } = useQuery({
    queryKey: ['order-status', storeId],
    queryFn: () => getOrderStatusStats(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  // Effect for timeframe changes
  useEffect(() => {
    if (statsData?.orders) {
      // We don't need to do anything here as salesData is computed with useMemo
    }
  }, [timeframe, statsData]);

  // Using useEffect to update the dashboard stats when the data changes
  useEffect(() => {
    if (statsData) {
      setDashboardStats(prev => ({
        ...prev,
        productsCount: statsData.productsCount,
        ordersCount: statsData.ordersCount,
        revenue: parseFloat(statsData.revenue),
        soldProductsCount: statsData.soldProductsCount || 0,
        currency: statsData.currency || 'SAR'
      }));
    }
  }, [statsData]);

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
