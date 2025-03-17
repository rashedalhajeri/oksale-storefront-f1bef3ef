
// This file is the same as the original src/pages/Dashboard.tsx
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useDashboardData } from '@/hooks/useDashboardData';
import { DashboardContext } from '@/context/DashboardContext';

// Import the new dashboard layout
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';

// Fallback Loading Component
const DashboardLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 rtl-dashboard">
    <div className="flex flex-col items-center">
      <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-sm text-gray-500">جارِ تحميل البيانات...</p>
    </div>
  </div>
);

// Empty store state component
const EmptyStoreState = ({ navigate }: { navigate: (path: string) => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 rtl-dashboard">
    <Card className="shadow-lg border-none max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-xl">لا يوجد متجر</CardTitle>
        <CardDescription>
          لم يتم العثور على متجر مرتبط بحسابك. يرجى إنشاء متجر جديد.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <button 
          onClick={() => navigate('/signup')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors w-full"
        >
          إنشاء متجر
        </button>
      </CardContent>
    </Card>
  </div>
);

// Main Dashboard Container component
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  // Fetch dashboard data
  const {
    statistics,
    salesData,
    recentOrders,
    topProducts,
    orderStatusData,
    statsLoading,
    chartLoading,
    recentOrdersLoading,
    topProductsLoading,
    orderStatusLoading,
    currency,
    setTimeframe: setDashboardTimeframe
  } = useDashboardData(storeData?.id || '');

  // Sync timeframe state with the hook
  useEffect(() => {
    if (setDashboardTimeframe) {
      setDashboardTimeframe(timeframe);
    }
  }, [timeframe, setDashboardTimeframe]);

  // Fetch store data once
  useEffect(() => {
    const fetchStoreData = async () => {
      if (storeData) return;
      
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;

        if (!userId) {
          navigate('/signin');
          return;
        }

        const { data: store, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('owner_id', userId)
          .single();

        if (storeError) {
          throw storeError;
        }

        setStoreData(store);
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل بيانات المتجر",
          description: "حدث خطأ أثناء تحميل بيانات المتجر، يرجى المحاولة مرة أخرى.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [navigate, toast, storeData]);

  // Create context value
  const contextValue = {
    storeData,
    statistics: statistics || [],
    salesData: salesData || [],
    timeframe,
    setTimeframe,
    recentOrders: recentOrders || [],
    topProducts: topProducts || [],
    orderStatusData: orderStatusData || [],
    statsLoading,
    chartLoading,
    recentOrdersLoading,
    topProductsLoading,
    orderStatusLoading,
    currency: currency || 'SAR'
  };

  if (loading) {
    return <DashboardLoading />;
  }

  if (!storeData) {
    return <EmptyStoreState navigate={navigate} />;
  }

  return (
    <DashboardLayout storeData={storeData}>
      <DashboardContext.Provider value={contextValue}>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">جاري التحميل...</div>}>
          <Outlet />
        </Suspense>
      </DashboardContext.Provider>
    </DashboardLayout>
  );
};

export default Dashboard;
