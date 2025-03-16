
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Banknote,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import ChartSection from '@/components/dashboard/ChartSection';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import { 
  fetchStoreStatistics, 
  generateSalesData, 
  getTopSellingProducts, 
  getRecentOrders,
  getOrderStatusStats,
  calculateProgress
} from '@/utils/dashboardUtils';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("week");
  const [dashboardStats, setDashboardStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    revenue: 0,
    visitsCount: 0
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
        
        // Load initial dashboard data
        if (store?.id) {
          await loadDashboardData(store.id);
        }
        
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
  
  // Load dashboard data based on the store ID
  const loadDashboardData = async (storeId) => {
    try {
      // Load store statistics
      setStatsLoading(true);
      const stats = await fetchStoreStatistics(storeId);
      setDashboardStats({
        productsCount: stats.productsCount,
        ordersCount: stats.ordersCount,
        revenue: parseFloat(stats.revenue),
        visitsCount: stats.visitsCount
      });
      
      // Load sales chart data
      setChartLoading(true);
      const salesChartData = generateSalesData(stats.orders, timeframe);
      setSalesData(salesChartData);
      
      // Load top products
      setTopProductsLoading(true);
      const topProductsData = await getTopSellingProducts(storeId);
      setTopProducts(topProductsData);
      
      // Load recent orders
      setRecentOrdersLoading(true);
      const recentOrdersData = await getRecentOrders(storeId);
      setRecentOrders(recentOrdersData);
      
      // Load order status
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
  
  // Reload data when timeframe changes
  useEffect(() => {
    if (storeData?.id) {
      setChartLoading(true);
      
      // Fetch statistics again to get orders
      fetchStoreStatistics(storeData.id).then(stats => {
        // Generate new sales data based on the selected timeframe
        const salesChartData = generateSalesData(stats.orders, timeframe);
        setSalesData(salesChartData);
        setChartLoading(false);
      }).catch(error => {
        console.error("Error reloading sales data:", error);
        setChartLoading(false);
      });
    }
  }, [timeframe, storeData?.id]);

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

  // Calculate targets based on current values
  const calculateTarget = (current: number) => Math.ceil(current * 1.2); // 20% higher than current

  const statistics = [
    {
      name: "المنتجات",
      value: dashboardStats.productsCount.toString(),
      icon: <Package className="h-5 w-5 text-indigo-600" />,
      description: "إجمالي المنتجات",
      change: "+20% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.productsCount, calculateTarget(dashboardStats.productsCount))
    },
    {
      name: "الزيارات",
      value: dashboardStats.visitsCount.toString(),
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "زائر هذا الشهر",
      change: "+15% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.visitsCount, calculateTarget(dashboardStats.visitsCount))
    },
    {
      name: "الطلبات",
      value: dashboardStats.ordersCount.toString(),
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
      description: "طلب هذا الشهر",
      change: "+10% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.ordersCount, calculateTarget(dashboardStats.ordersCount))
    },
    {
      name: "الإيرادات",
      value: `${dashboardStats.revenue.toFixed(2)} ر.س`,
      icon: <Banknote className="h-5 w-5 text-emerald-600" />,
      description: "الإيرادات هذا الشهر",
      change: "+25% منذ آخر شهر",
      trendUp: true,
      progressValue: calculateProgress(dashboardStats.revenue, calculateTarget(dashboardStats.revenue))
    }
  ];

  const MainDashboardContent = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">مرحباً بك في لوحة التحكم</h1>
        <p className="text-gray-600">هذه نظرة عامة على أداء متجرك</p>
      </div>

      {/* Time Frame Tabs */}
      <Tabs defaultValue="week" className="mb-6" value={timeframe} onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="day">اليوم</TabsTrigger>
          <TabsTrigger value="week">هذا الأسبوع</TabsTrigger>
          <TabsTrigger value="month">هذا الشهر</TabsTrigger>
          <TabsTrigger value="year">هذا العام</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Statistics Section */}
      <StatisticsSection statistics={statistics} loading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <ChartSection 
          salesData={salesData} 
          loading={chartLoading}
          timeframe={timeframe}
        />

        {/* Order Status */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">حالة الطلبات</CardTitle>
            <CardDescription>
              توزيع الطلبات حسب الحالة
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orderStatusLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {orderStatusData.map((item) => (
                  <div key={item.status} className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : item.status === 'cancelled' ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                      <Progress 
                        value={(item.count / orderStatusData.reduce((acc, curr) => acc + curr.count, 0)) * 100} 
                        className={`h-1.5 ${
                          item.status === 'completed' ? 'bg-green-100' : 
                          item.status === 'processing' ? 'bg-blue-100' : 
                          item.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Latest Orders */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">أحدث الطلبات</CardTitle>
            <CardDescription>
              آخر 5 طلبات في متجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrdersLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {
                              order.status === 'completed' ? 'مكتمل' : 
                              order.status === 'processing' ? 'قيد التجهيز' : 
                              order.status === 'pending' ? 'قيد الانتظار' : 'ملغي'
                            }
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">أفضل المنتجات مبيعاً</CardTitle>
            <CardDescription>
              المنتجات الأكثر مبيعاً في متجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topProductsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>عدد المبيعات</TableHead>
                      <TableHead>المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{product.amount} ر.س</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <DashboardLayout storeData={storeData}>
      <Routes>
        <Route path="/" element={<MainDashboardContent />} />
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

export default Dashboard;
