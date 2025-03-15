
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Banknote,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  BarChart4
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("week");

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

  // Mock data for dashboard statistics
  const statisticsData = [
    {
      name: "المنتجات",
      value: storeData?.products_count ? storeData.products_count.toString() : "0",
      icon: <Package className="h-5 w-5 text-indigo-600" />,
      description: "إجمالي المنتجات",
      change: "+5% منذ آخر شهر",
      trendUp: true
    },
    {
      name: "الزيارات",
      value: "1,432",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "زائر هذا الشهر",
      change: "+12% منذ آخر شهر",
      trendUp: true
    },
    {
      name: "الطلبات",
      value: storeData?.orders_count ? storeData.orders_count.toString() : "0",
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
      description: "طلب هذا الشهر",
      change: "+8% منذ آخر شهر",
      trendUp: true
    },
    {
      name: "الإيرادات",
      value: storeData?.revenue ? `${storeData.revenue.toString()} ر.س` : "0 ر.س",
      icon: <Banknote className="h-5 w-5 text-emerald-600" />,
      description: "الإيرادات هذا الشهر",
      change: "+15% منذ آخر شهر",
      trendUp: true
    },
  ];

  // Mock data for order status
  const orderStatusData = [
    { status: 'completed', count: 24, label: 'مكتمل', icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
    { status: 'processing', count: 13, label: 'قيد التجهيز', icon: <Clock className="h-4 w-4 text-blue-500" /> },
    { status: 'pending', count: 7, label: 'قيد الانتظار', icon: <Clock className="h-4 w-4 text-yellow-500" /> },
    { status: 'cancelled', count: 2, label: 'ملغي', icon: <AlertCircle className="h-4 w-4 text-red-500" /> },
  ];

  // Latest orders mock data
  const latestOrders = [
    { id: 'ORD-1234', customer: 'أحمد محمد', date: '15 مايو 2024', amount: '320.00 ر.س', status: 'completed' },
    { id: 'ORD-1235', customer: 'سارة أحمد', date: '14 مايو 2024', amount: '145.50 ر.س', status: 'processing' },
    { id: 'ORD-1236', customer: 'محمد علي', date: '14 مايو 2024', amount: '89.99 ر.س', status: 'pending' },
    { id: 'ORD-1237', customer: 'فاطمة خالد', date: '13 مايو 2024', amount: '210.00 ر.س', status: 'completed' },
    { id: 'ORD-1238', customer: 'عبدالله محمد', date: '12 مايو 2024', amount: '56.75 ر.س', status: 'cancelled' },
  ];

  // Top selling products mock data
  const topProducts = [
    { id: 1, name: 'هاتف ذكي XYZ', sales: 28, amount: '14,000.00 ر.س' },
    { id: 2, name: 'سماعات لاسلكية', sales: 24, amount: '4,800.00 ر.س' },
    { id: 3, name: 'حقيبة ظهر للسفر', sales: 22, amount: '3,300.00 ر.س' },
    { id: 4, name: 'حذاء رياضي', sales: 19, amount: '3,800.00 ر.س' },
    { id: 5, name: 'ساعة ذكية', sales: 17, amount: '5,100.00 ر.س' },
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statisticsData.map((item, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-full bg-gray-50">{item.icon}</div>
                <div className={`flex items-center text-xs font-medium ${item.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                  <ArrowUpRight className={`h-3 w-3 ml-1 ${!item.trendUp && 'rotate-180'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="w-full">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>التقدم</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-1" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart4 className="h-5 w-5 mr-2 text-oksale-600" />
              تحليل المبيعات
            </CardTitle>
            <CardDescription>
              مقارنة المبيعات والإيرادات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-dashed border-gray-200">
              <p className="text-gray-500">مخطط المبيعات</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">حالة الطلبات</CardTitle>
            <CardDescription>
              توزيع الطلبات حسب الحالة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderStatusData.map((item) => (
                <div key={item.status} className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    {item.icon}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="pb-2 font-medium text-right">رقم الطلب</th>
                    <th className="pb-2 font-medium text-right">العميل</th>
                    <th className="pb-2 font-medium text-right">التاريخ</th>
                    <th className="pb-2 font-medium text-right">المبلغ</th>
                    <th className="pb-2 font-medium text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {latestOrders.map((order) => (
                    <tr key={order.id} className="text-sm border-b">
                      <td className="py-3 pr-2">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">{order.amount}</td>
                      <td className="py-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="pb-2 font-medium text-right">المنتج</th>
                    <th className="pb-2 font-medium text-right">عدد المبيعات</th>
                    <th className="pb-2 font-medium text-right">المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="text-sm border-b">
                      <td className="py-3 pr-2">{product.name}</td>
                      <td className="py-3">{product.sales}</td>
                      <td className="py-3">{product.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
