
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useDashboardData } from '@/hooks/useDashboardData';
import { DashboardContext } from '@/context/DashboardContext';

// Dashboard Layout
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Fallback Loading Component
const DashboardLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-sm text-gray-500">جارِ تحميل البيانات...</p>
    </div>
  </div>
);

// Main Dashboard Container component
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  // استخدام useMemo لتخزين store ID
  const storeId = useMemo(() => storeData?.id || '', [storeData?.id]);

  // جلب بيانات لوحة التحكم - تمرير فقط storeId
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
  } = useDashboardData(storeId);

  // مزامنة حالة timeframe مع الـ hook
  useEffect(() => {
    if (setDashboardTimeframe) {
      setDashboardTimeframe(timeframe);
    }
  }, [timeframe, setDashboardTimeframe]);

  // جلب بيانات المتجر مرة واحدة فقط عند تحميل المكون
  useEffect(() => {
    const fetchStoreData = async () => {
      // لا نقوم بالاستعلام مرة أخرى إذا كنا بالفعل لدينا بيانات المتجر
      if (storeData) return;
      
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;

        if (!userId) {
          console.error("User ID not found in session");
          navigate('/signin');
          return;
        }

        const { data: store, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('owner_id', userId)
          .single();

        if (storeError) {
          console.error("Error fetching store data:", storeError);
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

  // إنشاء قيمة السياق مع جميع البيانات التي تحتاجها المكونات الفرعية
  const contextValue = useMemo(() => ({
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
  }), [
    storeData, 
    statistics, 
    salesData, 
    timeframe,
    recentOrders,
    topProducts,
    orderStatusData,
    statsLoading,
    chartLoading,
    recentOrdersLoading,
    topProductsLoading,
    orderStatusLoading,
    currency
  ]);

  if (loading) {
    return <DashboardLoading />;
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
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
  }

  // عرض أكثر كفاءة مع تخطيط مناسب وسياق
  return (
    <DashboardLayout storeData={storeData}>
      {/* إنشاء موفر يمرر الخصائص إلى جميع الأطفال */}
      <DashboardContext.Provider value={contextValue}>
        <Suspense fallback={<div className="p-8 text-center animate-pulse">جاري التحميل...</div>}>
          <Outlet />
        </Suspense>
      </DashboardContext.Provider>
    </DashboardLayout>
  );
};

export default Dashboard;
