
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, Users, TrendingUp, Settings, PlusCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Dashboard = () => {
  // بيانات وهمية للمتجر - في التطبيق الحقيقي ستأتي من الخادم
  const store = {
    id: 1,
    name: 'متجر الأناقة',
    handle: '@elegance',
    productsCount: 12,
    visitsToday: 156,
    ordersToday: 3,
    revenue: 750
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-oksale-800">مرحباً بك في لوحة تحكم متجرك</h1>
            <p className="text-oksale-600 mt-1">إدارة وتخصيص {store.name}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button variant="outline" className="border-oksale-200 text-oksale-700 hover:bg-oksale-50">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات المتجر
            </Button>
            <Button className="bg-oksale-700 hover:bg-oksale-800 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة منتج جديد
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{store.productsCount}</div>
                <Package className="h-8 w-8 text-oksale-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الزيارات اليوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{store.visitsToday}</div>
                <Users className="h-8 w-8 text-oksale-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الطلبات اليوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{store.ordersToday}</div>
                <ShoppingBag className="h-8 w-8 text-oksale-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-oksale-600">الإيرادات ($)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{store.revenue}</div>
                <TrendingUp className="h-8 w-8 text-oksale-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>نظرة عامة على متجرك</CardTitle>
              <CardDescription>إدارة منتجاتك وطلباتك وإعدادات متجرك</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link to="/dashboard/products" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-oksale-100 flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">إدارة المنتجات</h3>
                    <p className="text-sm text-oksale-600">إضافة وتعديل وحذف منتجاتك</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
              
              <Link to="/dashboard/orders" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-oksale-100 flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-oksale-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">الطلبات</h3>
                    <p className="text-sm text-oksale-600">إدارة ومتابعة طلبات عملائك</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-oksale-400" />
              </Link>
              
              <Link to="/dashboard/settings" className="flex items-center justify-between p-3 bg-white hover:bg-neutral-50 rounded-md border border-neutral-200 transition-colors">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-oksale-100 flex items-center justify-center mr-3">
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
          
          <Card>
            <CardHeader>
              <CardTitle>متجرك</CardTitle>
              <CardDescription>رابط المتجر ومعلومات أساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-oksale-50 rounded-md border border-oksale-100">
                <p className="text-sm text-oksale-700 mb-2">رابط متجرك:</p>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-3 py-1 rounded border border-oksale-200 text-oksale-800 flex-grow text-sm overflow-x-auto whitespace-nowrap">{`OKsale.com/store/${store.handle.replace('@', '')}`}</code>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-oksale-200 text-oksale-700 shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText(`OKsale.com/store/${store.handle.replace('@', '')}`);
                    }}
                  >
                    نسخ
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-oksale-600">اسم المتجر:</span>
                  <span className="text-sm font-medium">{store.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-oksale-600">معرّف المتجر:</span>
                  <span className="text-sm font-medium">{store.handle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-oksale-600">عدد المنتجات:</span>
                  <span className="text-sm font-medium">{store.productsCount}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full text-oksale-700 hover:bg-oksale-50 hover:text-oksale-800">
                <Link to={`/store/${store.handle.replace('@', '')}`}>
                  زيارة المتجر
                  <ChevronRight className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
