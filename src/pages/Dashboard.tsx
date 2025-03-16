
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

// Dashboard Components
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardProducts from '@/components/dashboard/DashboardProducts';
import DashboardOrders from '@/components/dashboard/DashboardOrders';
import DashboardCustomers from '@/components/dashboard/DashboardCustomers';
import DashboardCategories from '@/components/dashboard/DashboardCategories';
import DashboardOffers from '@/components/dashboard/DashboardOffers';
import DashboardSettingsGeneral from '@/components/dashboard/settings/DashboardSettingsGeneral';
import DashboardSettingsAppearance from '@/components/dashboard/settings/DashboardSettingsAppearance';
import DashboardSettingsPayment from '@/components/dashboard/settings/DashboardSettingsPayment';
import DashboardSettingsShipping from '@/components/dashboard/settings/DashboardSettingsShipping';
import DashboardSettingsNotifications from '@/components/dashboard/settings/DashboardSettingsNotifications';
import DashboardSettingsUsers from '@/components/dashboard/settings/DashboardSettingsUsers';
import MainDashboard from '@/components/dashboard/MainDashboard';
import OrderStatusCard from '@/components/dashboard/OrderStatusCard';
import RecentOrdersCard from '@/components/dashboard/RecentOrdersCard';
import TopProductsCard from '@/components/dashboard/TopProductsCard';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-oksale-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>لا يوجد متجر</CardTitle>
            <CardDescription>
              لم يتم العثور على متجر مرتبط بحسابك. يرجى إنشاء متجر جديد.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-oksale-600 text-white px-4 py-2 rounded"
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
      </Routes>
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
    orderStatusLoading
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
    />
  );
};

export default Dashboard;
