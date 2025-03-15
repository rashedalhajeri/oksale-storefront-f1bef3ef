
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Wallet, BanknoteIcon, Shield, Info, Plus } from 'lucide-react';

interface DashboardSettingsPaymentProps {
  storeData: any;
}

const DashboardSettingsPayment: React.FC<DashboardSettingsPaymentProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث إعدادات وسائل الدفع بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">وسائل الدفع</h1>
        <p className="text-gray-600">إدارة طرق الدفع المتاحة في متجرك</p>
      </div>

      <div className="space-y-6">
        {/* Online Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-oksale-600" />
              وسائل الدفع الإلكترونية
            </CardTitle>
            <CardDescription>تكامل بوابات الدفع الإلكتروني مع متجرك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Payment Methods */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/40/40" alt="مدى" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">مدى - Mada</h3>
                      <p className="text-sm text-gray-500">قبول بطاقات مدى للدفع عبر الإنترنت</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mada-merchant-id">معرف التاجر</Label>
                      <Input id="mada-merchant-id" placeholder="أدخل معرف التاجر" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mada-api-key">مفتاح API</Label>
                      <Input id="mada-api-key" type="password" placeholder="أدخل مفتاح API" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/41/41" alt="فيزا/ماستركارد" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">فيزا/ماستركارد - Visa/Mastercard</h3>
                      <p className="text-sm text-gray-500">قبول بطاقات الائتمان العالمية للدفع</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visa-merchant-id">معرف التاجر</Label>
                      <Input id="visa-merchant-id" placeholder="أدخل معرف التاجر" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visa-api-key">مفتاح API</Label>
                      <Input id="visa-api-key" type="password" placeholder="أدخل مفتاح API" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/42/42" alt="آبل باي" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">آبل باي - Apple Pay</h3>
                      <p className="text-sm text-gray-500">تمكين الدفع عن طريق خدمة آبل باي</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/43/43" alt="تمارا" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">تمارا - Tamara</h3>
                      <p className="text-sm text-gray-500">الدفع لاحقًا وتقسيط المدفوعات</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tamara-merchant-key">مفتاح التاجر</Label>
                      <Input id="tamara-merchant-key" placeholder="أدخل مفتاح التاجر" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tamara-public-key">المفتاح العام</Label>
                      <Input id="tamara-public-key" placeholder="أدخل المفتاح العام" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Payment Method Button */}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 ml-2" />
                إضافة وسيلة دفع جديدة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cash Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BanknoteIcon className="h-5 w-5 mr-2 text-oksale-600" />
              الدفع عند الاستلام
            </CardTitle>
            <CardDescription>إعدادات الدفع النقدي عند الاستلام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">تمكين الدفع عند الاستلام</h3>
                <p className="text-sm text-gray-500">السماح للعملاء بالدفع نقدًا عند استلام الطلب</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 flex gap-3">
              <Info className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                عند تفعيل خيار الدفع عند الاستلام، سيتم إضافة رسوم إضافية قدرها 10 ريال على الطلبات التي تقل قيمتها عن 200 ريال.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-oksale-600" />
              أمان المدفوعات
            </CardTitle>
            <CardDescription>إعدادات تأمين المعاملات المالية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">تفعيل المصادقة الثنائية للمدفوعات</h3>
                <p className="text-sm text-gray-500">طلب مصادقة ثنائية للمعاملات ذات المخاطر العالية</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">تقييد المعاملات المشبوهة</h3>
                <p className="text-sm text-gray-500">رفض المعاملات التي تحمل مؤشرات احتيال</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">سجل تغييرات إعدادات الدفع</h3>
                <p className="text-sm text-gray-500">الاحتفاظ بسجل تفصيلي لتغييرات إعدادات الدفع</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading ? 'جارِ الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsPayment;
