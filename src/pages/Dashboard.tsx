
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useDashboardData } from '@/hooks/useDashboardData';

// Dashboard Layout
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Main Dashboard Container component
const Dashboard = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  // Fetch dashboard data - passing only storeId
  const { 
    setTimeframe: setDashboardTimeframe
  } = useDashboardData(storeData?.id);

  // Effect to sync the timeframe state with the hook
  useEffect(() => {
    if (setDashboardTimeframe) {
      setDashboardTimeframe(timeframe);
    }
  }, [timeframe, setDashboardTimeframe]);

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

  // More efficient rendering with proper layout
  return (
    <DashboardLayout storeData={memoizedStoreData}>
      {children || <Outlet />}
    </DashboardLayout>
  );
};

export default Dashboard;
