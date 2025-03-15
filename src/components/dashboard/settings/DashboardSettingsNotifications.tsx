import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Mail, MessageSquare, Phone, Settings, AlertTriangle, CheckCircle2, ShoppingCart, Users, Truck, Package } from 'lucide-react';

interface DashboardSettingsNotificationsProps {
  storeData: any;
}

const DashboardSettingsNotifications: React.FC<DashboardSettingsNotificationsProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث إعدادات التنبيهات والإشعارات بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">التنبيهات والإشعارات</h1>
        <p className="text-gray-600">إدارة إشعارات المتجر للعملاء وفريق العمل</p>
      </div>

      <Tabs defaultValue="customer" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="customer" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>إشعارات العملاء</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>إشعارات الإدارة</span>
          </TabsTrigger>
        </TabsList>

        {/* Customer Notifications */}
        <TabsContent value="customer" className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Mail className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات البريد الإلكتروني
              </CardTitle>
              <CardDescription>التنبيهات التي يتم إرسالها للعملاء عبر البريد الإلكتروني</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تأكيد الطلب</h3>
                    <p className="text-sm text-gray-500">إرسال بريد إلكتروني لتأكيد استلام الطلب</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تأكيد الدفع</h3>
                    <p className="text-sm text-gray-500">إرسال بريد إلكتروني لتأكيد عملية الدفع</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تحديث حالة الطلب</h3>
                    <p className="text-sm text-gray-500">إرسال بريد إلكتروني عند تغيير حالة الطلب</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">إشعار الشحن</h3>
                    <p className="text-sm text-gray-500">إرسال بريد إلكتروني بتفاصيل الشحن ورقم التتبع</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">استعادة عربة التسوق</h3>
                    <p className="text-sm text-gray-500">تذكير بالمنتجات المتروكة في سلة التسوق</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">النشرة الإخبارية والعروض</h3>
                    <p className="text-sm text-gray-500">إرسال آخر الأخبار والعروض الترويجية</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">تخصيص قالب البريد الإلكتروني</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-sender-name">اسم المرسل</Label>
                    <Input id="email-sender-name" defaultValue={storeData?.name || 'متجري'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-sender-address">عنوان البريد الإلكتروني للإرسال</Label>
                    <Input id="email-sender-address" type="email" defaultValue="info@mystore.com" dir="ltr" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات الرسائل النصية
              </CardTitle>
              <CardDescription>التنبيهات التي يتم إرسالها للعملاء عبر الرسائل النصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تأكيد الطلب</h3>
                    <p className="text-sm text-gray-500">إرسال رسالة نصية لتأكيد استلام الطلب</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تأكيد الدفع</h3>
                    <p className="text-sm text-gray-500">إرسال رسالة نصية لتأكيد عملية الدفع</p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">إشعار الشحن</h3>
                    <p className="text-sm text-gray-500">إرسال رسالة نصية بتفاصيل الشحن ورقم التتبع</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">رمز التحقق للتسجيل</h3>
                    <p className="text-sm text-gray-500">إرسال رمز التحقق عند تسجيل حساب جديد</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  تتطلب إشعارات الرسائل النصية رصيد كافٍ في حساب المتجر. الرصيد الحالي: 45 رسالة.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات الدفع
              </CardTitle>
              <CardDescription>التنبيهات التي يتم عرضها في متصفح العميل أو تطبيق الجوال</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تمكين إشعارات الدفع</h3>
                    <p className="text-sm text-gray-500">عرض الإشعارات في المتصفح أو تطبيق الجوال</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">إشعارات المنتجات الجديدة</h3>
                    <p className="text-sm text-gray-500">إشعار العملاء عند إضافة منتجات جديدة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">إشعارات العروض الخاصة</h3>
                    <p className="text-sm text-gray-500">إشعار العملاء بالعروض والخصومات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Notifications */}
        <TabsContent value="admin" className="space-y-6">
          {/* Order Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات الطلبات
              </CardTitle>
              <CardDescription>التنبيهات التي يتم إرسالها للإدارة عند استلام طلبات جديدة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">طلب جديد</h3>
                    <p className="text-sm text-gray-500">إشعار عند استلام طلب جديد</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">طلب بقيمة عالية</h3>
                    <p className="text-sm text-gray-500">إشعار عند استلام طلب بقيمة أعلى من 500 ر.س</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">إلغاء طلب</h3>
                    <p className="text-sm text-gray-500">إشعار عند إلغاء طلب من قبل العميل</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">جهات الاتصال للإشعارات</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orders-email">البريد الإلكتروني لإشعارات الطلبات</Label>
                    <Input id="orders-email" type="email" defaultValue="orders@mystore.com" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orders-phone">رقم الهاتف لإشعارات الطلبات</Label>
                    <Input id="orders-phone" defaultValue="+966501234567" dir="ltr" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Package className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات المخزون
              </CardTitle>
              <CardDescription>التنبيهات التي يتم إرسالها للإدارة عند تغيير حالة المخزون</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">المخزون المنخفض</h3>
                    <p className="text-sm text-gray-500">إشعار عندما ينخفض مخزون منتج عن الحد الأدنى</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">نفاد المخزون</h3>
                    <p className="text-sm text-gray-500">إشعار عند نفاد مخزون منتج بالكامل</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-oksale-600" />
                إشعارات النظام
              </CardTitle>
              <CardDescription>التنبيهات المتعلقة بحالة النظام وأدائه</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">محاولات تسجيل دخول مشبوهة</h3>
                    <p className="text-sm text-gray-500">إشعار عند اكتشاف محاولات تسجيل دخول غير عادية</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تقارير أسبوعية</h3>
                    <p className="text-sm text-gray-500">إرسال تقرير أسبوعي عن أداء المتجر</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">تحديثات النظام</h3>
                    <p className="text-sm text-gray-500">إشعار عند توفر تحديثات جديدة للنظام</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveChanges} disabled={loading}>
          {loading ? 'جارِ الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSettingsNotifications;
