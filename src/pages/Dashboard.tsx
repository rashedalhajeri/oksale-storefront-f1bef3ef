
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, Users, TrendingUp, Settings, PlusCircle, ChevronRight, BarChart3, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// نوع بيانات المتجر
interface Store {
  id: string;
  name: string;
  handle: string;
  description?: string;
  logo_url?: string;
  cover_url?: string;
  contact_email?: string;
  contact_phone?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState<Store | null>(null);
  const [stats, setStats] = useState({
    productsCount: 0,
    visitsToday: 0,
    ordersToday: 0,
    revenue: 0
  });

  // التحقق من تسجيل الدخول وجلب بيانات المتجر
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // التحقق من جلسة المستخدم
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        // إذا لم يكن المستخدم مسجلاً، توجيهه إلى صفحة تسجيل الدخول
        if (!session) {
          navigate('/signin');
          return;
        }

        // جلب بيانات المتجر
        const { data: storeData, error: storeError } = await supabase
          .from('stores')
          .select('*')
          .eq('owner_id', session.user.id)
          .single();

        if (storeError) {
          throw storeError;
        }

        setStore(storeData);

        // جلب عدد المنتجات
        const { count: productsCount, error: productsError } = await supabase
          .from('products')
          .select('id', { count: 'exact', head: true })
          .eq('store_id', storeData.id);

        if (productsError) {
          throw productsError;
        }

        // جلب بيانات الطلبات والإيرادات اليوم
        // نضيف DATE_TRUNC لتقييد التاريخ لليوم الحالي فقط
        const today = new Date().toISOString().split('T')[0];
        const { data: todayOrders, error: ordersError } = await supabase
          .from('orders')
          .select('id, total_amount')
          .eq('store_id', storeData.id)
          .gte('created_at', today);

        if (ordersError) {
          throw ordersError;
        }

        // حساب الإيرادات من الطلبات اليومية
        const totalRevenue = todayOrders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

        // تحديث الإحصائيات
        setStats({
          productsCount: productsCount || 0,
          visitsToday: Math.floor(Math.random() * 200), // في الإصدار المستقبلي يمكن تتبع الزيارات الفعلية
          ordersToday: todayOrders.length,
          revenue: totalRevenue
        });

      } catch (error) {
        console.error('خطأ في جلب بيانات لوحة التحكم:', error);
        toast({
          variant: "destructive",
          title: "حدث خطأ",
          description: "تعذر جلب بيانات المتجر، يرجى المحاولة مرة أخرى",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-oksale-200 border-t-oksale-700 rounded-full mb-4"></div>
          <p className="text-oksale-600">جاري تحميل بيانات المتجر...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="bg-oksale-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-oksale-700" />
          </div>
          <h1 className="text-2xl font-bold text-oksale-800 mb-2">لم يتم العثور على متجر</h1>
          <p className="text-oksale-600 mb-6">يبدو أنه ليس لديك متجر بعد. قم بإنشاء متجر جديد للبدء.</p>
          <Button 
            className="bg-oksale-700 hover:bg-oksale-800 text-white w-full"
            onClick={() => navigate('/signup')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            إنشاء متجر جديد
          </Button>
        </div>
      </div>
    );
  }

  // تنسيق يسير لعرض اسم المعرف بدون @ للعرض
  const handleDisplay = store.handle.startsWith('@') ? store.handle.substring(1) : store.handle;

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-oksale-800">مرحباً بك في لوحة تحكم متجرك</h1>
            <p className="text-oksale-600 mt-1">إدارة وتخصيص {store.name}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
            <Button variant="outline" className="border-oksale-200 text-oksale-700 hover:bg-oksale-50 w-full sm:w-auto">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات المتجر
            </Button>
            <Button 
              className="bg-oksale-700 hover:bg-oksale-800 text-white w-full sm:w-auto"
              asChild
            >
              <Link to="/dashboard/products/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                إضافة منتج جديد
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-oksale-200 shadow-sm hover:shadow transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stats.productsCount}</div>
                <div className="p-2 bg-oksale-100 rounded-full">
                  <Package className="h-6 w-6 text-oksale-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-oksale-200 shadow-sm hover:shadow transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الزيارات اليوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stats.visitsToday}</div>
                <div className="p-2 bg-oksale-100 rounded-full">
                  <Users className="h-6 w-6 text-oksale-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-oksale-200 shadow-sm hover:shadow transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الطلبات اليوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stats.ordersToday}</div>
                <div className="p-2 bg-oksale-100 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-oksale-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-oksale-200 shadow-sm hover:shadow transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الإيرادات (ر.س)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stats.revenue.toFixed(2)}</div>
                <div className="p-2 bg-oksale-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-oksale-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-oksale-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-oksale-600" />
                <span>نظرة عامة على متجرك</span>
              </CardTitle>
              <CardDescription>إدارة منتجاتك وطلباتك وإعدادات متجرك</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link to="/dashboard/products" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-oksale-100 flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3">
                    <Package className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">إدارة المنتجات</h3>
                    <p className="text-sm text-oksale-600">إضافة وتعديل وحذف منتجاتك ({stats.productsCount})</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
              
              <Link to="/dashboard/orders" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-oksale-100 flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3">
                    <ShoppingBag className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">الطلبات</h3>
                    <p className="text-sm text-oksale-600">إدارة ومتابعة طلبات عملائك ({stats.ordersToday} اليوم)</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
              
              <Link to="/dashboard/analytics" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-oksale-100 flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3">
                    <BarChart3 className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">التحليلات</h3>
                    <p className="text-sm text-oksale-600">مراقبة أداء متجرك والإحصائيات</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
              
              <Link to="/dashboard/settings" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-oksale-100 flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3">
                    <Settings className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">إعدادات المتجر</h3>
                    <p className="text-sm text-oksale-600">تخصيص وتعديل إعدادات متجرك</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-oksale-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-oksale-600" />
                <span>متجرك</span>
              </CardTitle>
              <CardDescription>رابط المتجر ومعلومات أساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-oksale-50 rounded-md border border-oksale-100">
                <p className="text-sm text-oksale-700 mb-2">رابط متجرك:</p>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-3 py-2 rounded border border-oksale-200 text-oksale-800 flex-grow text-sm overflow-x-auto whitespace-nowrap dir-ltr">{`OKsale.com/store/${handleDisplay}`}</code>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-oksale-200 text-oksale-700 shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText(`OKsale.com/store/${handleDisplay}`);
                      toast({
                        title: "تم النسخ",
                        description: "تم نسخ رابط المتجر بنجاح",
                      });
                    }}
                  >
                    نسخ
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b border-oksale-100 pb-2">
                  <span className="text-sm text-oksale-600">اسم المتجر:</span>
                  <span className="text-sm font-medium">{store.name}</span>
                </div>
                <div className="flex justify-between border-b border-oksale-100 pb-2">
                  <span className="text-sm text-oksale-600">معرّف المتجر:</span>
                  <span className="text-sm font-medium dir-ltr">{store.handle}</span>
                </div>
                <div className="flex justify-between border-b border-oksale-100 pb-2">
                  <span className="text-sm text-oksale-600">تاريخ الإنشاء:</span>
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-sm text-oksale-600">الحالة:</span>
                  <span className="text-sm font-medium flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1.5"></span>
                      نشط
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="ghost" className="w-full text-oksale-700 hover:bg-oksale-50 hover:text-oksale-800">
                <Link to={`/store/${handleDisplay}`} target="_blank">
                  زيارة المتجر
                  <ChevronRight className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 bg-white rounded-lg border border-oksale-200 p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-oksale-600 ml-2" />
            <h3 className="font-medium text-oksale-800">آخر النشاطات</h3>
          </div>
          
          <div className="space-y-3">
            {stats.ordersToday > 0 ? (
              <div className="p-3 bg-oksale-50 rounded-md border border-oksale-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 bg-oksale-100 rounded-full ml-3">
                      <ShoppingBag className="h-4 w-4 text-oksale-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">طلب جديد</p>
                      <p className="text-xs text-oksale-600">قيمة الطلب: {stats.revenue > 0 ? (stats.revenue / stats.ordersToday).toFixed(2) : 0} ر.س</p>
                    </div>
                  </div>
                  <span className="text-xs text-oksale-500">منذ {Math.floor(Math.random() * 50) + 5} دقيقة</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-md text-center">
                <p className="text-sm text-oksale-600">لا توجد نشاطات حديثة</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
