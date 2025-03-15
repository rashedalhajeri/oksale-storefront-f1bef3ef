
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Map, Package, Clock, AlertCircle, Plus, Calculator } from 'lucide-react';

interface DashboardSettingsShippingProps {
  storeData: any;
}

const DashboardSettingsShipping: React.FC<DashboardSettingsShippingProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث إعدادات الشحن والتوصيل بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">الشحن والتوصيل</h1>
        <p className="text-gray-600">إدارة خيارات الشحن والتوصيل في متجرك</p>
      </div>

      <div className="space-y-6">
        {/* Shipping Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Truck className="h-5 w-5 mr-2 text-oksale-600" />
              طرق الشحن
            </CardTitle>
            <CardDescription>تحديد طرق الشحن المتاحة للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Standard Shipping */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <Truck className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">الشحن القياسي</h3>
                      <p className="text-sm text-gray-500">خدمة الشحن العادية (3-5 أيام عمل)</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="standard-cost">تكلفة الشحن (ر.س)</Label>
                      <Input id="standard-cost" type="number" defaultValue="25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="standard-free-threshold">حد الشحن المجاني (ر.س)</Label>
                      <Input id="standard-free-threshold" type="number" defaultValue="200" />
                      <p className="text-xs text-gray-500">الطلبات التي تتجاوز هذا المبلغ ستحصل على شحن مجاني</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Express Shipping */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <Clock className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">الشحن السريع</h3>
                      <p className="text-sm text-gray-500">خدمة الشحن السريع (1-2 يوم عمل)</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="express-cost">تكلفة الشحن (ر.س)</Label>
                      <Input id="express-cost" type="number" defaultValue="45" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="express-free-threshold">حد الشحن المجاني (ر.س)</Label>
                      <Input id="express-free-threshold" type="number" defaultValue="350" />
                      <p className="text-xs text-gray-500">الطلبات التي تتجاوز هذا المبلغ ستحصل على شحن مجاني</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* In-store Pickup */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <Package className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">استلام من المتجر</h3>
                      <p className="text-sm text-gray-500">السماح للعملاء باستلام طلباتهم من المتجر</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Add Shipping Method Button */}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 ml-2" />
                إضافة طريقة شحن جديدة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Map className="h-5 w-5 mr-2 text-oksale-600" />
              مناطق الشحن
            </CardTitle>
            <CardDescription>تحديد المناطق الجغرافية وتكاليف الشحن لكل منطقة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Saudi Arabia Zone */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">المملكة العربية السعودية</h3>
                    <p className="text-sm text-gray-500">جميع مدن ومناطق المملكة</p>
                  </div>
                  <Button variant="ghost" size="sm">تعديل</Button>
                </div>
              </div>

              {/* GCC Zone */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">دول مجلس التعاون الخليجي</h3>
                    <p className="text-sm text-gray-500">الإمارات، الكويت، البحرين، قطر، عمان</p>
                  </div>
                  <Button variant="ghost" size="sm">تعديل</Button>
                </div>
              </div>

              {/* International Zone */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">الدول العربية</h3>
                    <p className="text-sm text-gray-500">مصر، الأردن، لبنان، العراق، وغيرها</p>
                  </div>
                  <Button variant="ghost" size="sm">تعديل</Button>
                </div>
              </div>

              {/* Add Zone Button */}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منطقة شحن جديدة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-oksale-600" />
              تكامل شركات الشحن
            </CardTitle>
            <CardDescription>ربط حسابات شركات الشحن بمتجرك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Aramex Integration */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/50/50" alt="أرامكس" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">أرامكس - Aramex</h3>
                      <p className="text-sm text-gray-500">ربط حساب أرامكس لحساب تكاليف الشحن تلقائياً</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aramex-account">رقم الحساب</Label>
                      <Input id="aramex-account" placeholder="أدخل رقم الحساب" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aramex-api-key">مفتاح API</Label>
                      <Input id="aramex-api-key" type="password" placeholder="أدخل مفتاح API" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SMSA Integration */}
              <div className="rounded-md border border-gray-200">
                <div className="p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <img src="https://placekitten.com/51/51" alt="سمسا" className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">البريد السعودي - SMSA</h3>
                      <p className="text-sm text-gray-500">ربط حساب البريد السعودي لحساب تكاليف الشحن تلقائياً</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Add Integration Button */}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 ml-2" />
                إضافة شركة شحن جديدة
              </Button>
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

export default DashboardSettingsShipping;
