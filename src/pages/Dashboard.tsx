
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

// Dashboard Components
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Loader2 } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

// Lazy load components for better performance
const MainDashboard = React.lazy(() => import('@/components/dashboard/MainDashboard'));
const DashboardProducts = React.lazy(() => import('@/components/dashboard/DashboardProducts'));
const DashboardOrders = React.lazy(() => import('@/components/dashboard/DashboardOrders'));
const DashboardCustomers = React.lazy(() => import('@/components/dashboard/DashboardCustomers'));
const DashboardCategories = React.lazy(() => import('@/components/dashboard/DashboardCategories'));
const DashboardOffers = React.lazy(() => import('@/components/dashboard/DashboardOffers'));
const DashboardSettingsGeneral = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsGeneral'));
const DashboardSettingsAppearance = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsAppearance'));
const DashboardSettingsPayment = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsPayment'));
const DashboardSettingsShipping = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsShipping'));
const DashboardSettingsNotifications = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsNotifications'));
const DashboardSettingsUsers = React.lazy(() => import('@/components/dashboard/settings/DashboardSettingsUsers'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"></div>
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

  return (
    <DashboardLayout storeData={storeData}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<DashboardMain storeData={storeData} />} />
          <Route path="/products" element={<DashboardProducts storeData={storeData} />} />
          <Route path="/orders" element={<DashboardOrders storeData={storeData} />} />
          <Route path="/customers" element={<DashboardCustomers storeData={storeData} />} />
          <Route path="/categories" element={<DashboardCategories storeData={storeData} />} />
          <Route path="/offers" element={<DashboardOffers storeData={storeData} />} />
          <Route path="/settings/general" element={<DashboardSettingsGeneral storeData={storeData} />} />
          <Route path="/settings/appearance" element={<DashboardSettingsAppearance storeData={storeData} />} />
          <Route path="/settings/payment" element={<DashboardSettingsPayment storeData={storeData} />} />
          <Route path="/settings/shipping" element={<DashboardSettingsShipping storeData={storeData} />} />
          <Route path="/settings/notifications" element={<DashboardSettingsNotifications storeData={storeData} />} />
          <Route path="/settings/users" element={<DashboardSettingsUsers storeData={storeData} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

// Inner component for the main dashboard content
const DashboardMain = ({ storeData }) => {
  const {
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
    currency
  } = useDashboardData(storeData.id);

  return (
    <MainDashboard
      statistics={statistics}
      salesData={salesData}
      timeframe={timeframe}
      setTimeframe={setTimeframe}
      recentOrders={recentOrders}
      topProducts={topProducts}
      orderStatusData={orderStatusData}
      statsLoading={statsLoading}
      chartLoading={chartLoading}
      recentOrdersLoading={recentOrdersLoading}
      topProductsLoading={topProductsLoading}
      orderStatusLoading={orderStatusLoading}
      currency={currency}
    />
  );
};

export default Dashboard;
