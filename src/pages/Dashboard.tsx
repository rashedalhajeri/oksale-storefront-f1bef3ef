
import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { 
  useNavigate, 
  Routes, 
  Route, 
  Navigate, 
  useLocation
} from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import useDashboardData from '@/hooks/useDashboardData';

// Dashboard Layout
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Loader2 } from 'lucide-react';

// Lazy load components for better performance
const MainDashboard = lazy(() => import('@/components/dashboard/MainDashboard'));
const DashboardProducts = lazy(() => import('@/components/dashboard/DashboardProducts'));
const DashboardOrders = lazy(() => import('@/components/dashboard/DashboardOrders'));
const DashboardCustomers = lazy(() => import('@/components/dashboard/DashboardCustomers'));
const DashboardCategories = lazy(() => import('@/components/dashboard/DashboardCategories'));
const DashboardOffers = lazy(() => import('@/components/dashboard/DashboardOffers'));
const DashboardSettingsGeneral = lazy(() => import('@/components/dashboard/settings/DashboardSettingsGeneral'));
const DashboardSettingsAppearance = lazy(() => import('@/components/dashboard/settings/DashboardSettingsAppearance'));
const DashboardSettingsPayment = lazy(() => import('@/components/dashboard/settings/DashboardSettingsPayment'));
const DashboardSettingsShipping = lazy(() => import('@/components/dashboard/settings/DashboardSettingsShipping'));
const DashboardSettingsNotifications = lazy(() => import('@/components/dashboard/settings/DashboardSettingsNotifications'));
const DashboardSettingsWhatsApp = lazy(() => import('@/components/dashboard/settings/DashboardSettingsWhatsApp'));
const DashboardSettingsUsers = lazy(() => import('@/components/dashboard/settings/DashboardSettingsUsers'));

// Loading component with better visual feedback
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center">
      <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-500">جارِ تحميل الصفحة...</p>
    </div>
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
    currency
  } = useDashboardData(storeData?.id, timeframe);

  // Fetch store data only once on component mount
  useEffect(() => {
    const fetchStoreData = async () => {
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
  }, [navigate, toast]);

  // Memoize the store data to prevent unnecessary re-renders
  const memoizedStoreData = useMemo(() => storeData, [storeData?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-sm text-gray-500">جارِ تحميل البيانات...</p>
        </div>
      </div>
    );
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

  // More efficient rendering with proper route structure
  return (
    <DashboardLayout storeData={memoizedStoreData}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route index element={
            <MainDashboard 
              statistics={statistics}
              salesData={salesData}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              recentOrders={recentOrders || []}
              topProducts={topProducts || []}
              orderStatusData={orderStatusData || []}
              statsLoading={statsLoading}
              chartLoading={chartLoading}
              recentOrdersLoading={recentOrdersLoading}
              topProductsLoading={topProductsLoading}
              orderStatusLoading={orderStatusLoading}
              currency={currency || 'SAR'}
            />
          } />
          <Route path="products" element={<DashboardProducts storeData={memoizedStoreData} />} />
          <Route path="orders" element={<DashboardOrders storeData={memoizedStoreData} />} />
          <Route path="customers" element={<DashboardCustomers storeData={memoizedStoreData} />} />
          <Route path="categories" element={<DashboardCategories storeData={memoizedStoreData} />} />
          <Route path="marketing" element={<DashboardOffers storeData={memoizedStoreData} />} />
          <Route path="settings/general" element={<DashboardSettingsGeneral storeData={memoizedStoreData} />} />
          <Route path="settings/appearance" element={<DashboardSettingsAppearance storeData={memoizedStoreData} />} />
          <Route path="settings/payment" element={<DashboardSettingsPayment storeData={memoizedStoreData} />} />
          <Route path="settings/shipping" element={<DashboardSettingsShipping storeData={memoizedStoreData} />} />
          <Route path="settings/notifications" element={<DashboardSettingsNotifications storeData={memoizedStoreData} />} />
          <Route path="settings/whatsapp" element={<DashboardSettingsWhatsApp storeData={memoizedStoreData} />} />
          <Route path="settings/users" element={<DashboardSettingsUsers storeData={memoizedStoreData} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

export default Dashboard;
