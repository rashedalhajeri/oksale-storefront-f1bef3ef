
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Palette, Layout, EyeIcon, Type } from 'lucide-react';

interface DashboardSettingsAppearanceProps {
  storeData: any;
}

const DashboardSettingsAppearance: React.FC<DashboardSettingsAppearanceProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث مظهر المتجر بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">الظهور والتصميم</h1>
        <p className="text-gray-600">تخصيص مظهر متجرك وواجهة العميل</p>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Palette className="h-5 w-5 mr-2 text-oksale-600" />
              الألوان والسمات
            </CardTitle>
            <CardDescription>اختيار سمة المتجر والألوان الرئيسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="theme-mode">وضع العرض</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme-mode">
                    <SelectValue placeholder="اختر وضع العرض" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">فاتح</SelectItem>
                    <SelectItem value="dark">داكن</SelectItem>
                    <SelectItem value="auto">تلقائي (حسب إعدادات الجهاز)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">نظام الألوان</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="اختر نظام الألوان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">أزرق</SelectItem>
                    <SelectItem value="green">أخضر</SelectItem>
                    <SelectItem value="purple">بنفسجي</SelectItem>
                    <SelectItem value="red">أحمر</SelectItem>
                    <SelectItem value="custom">مخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>معاينة السمة</Label>
              <div className="h-40 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">معاينة سمة المتجر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layout Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Layout className="h-5 w-5 mr-2 text-oksale-600" />
              تخطيط الصفحات
            </CardTitle>
            <CardDescription>تخصيص تخطيط صفحات المتجر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="home-layout">تخطيط الصفحة الرئيسية</Label>
                <Select defaultValue="featured">
                  <SelectTrigger id="home-layout">
                    <SelectValue placeholder="اختر تخطيط الصفحة الرئيسية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">المنتجات المميزة</SelectItem>
                    <SelectItem value="categories">الفئات الرئيسية</SelectItem>
                    <SelectItem value="hero">صورة كبيرة مع نص</SelectItem>
                    <SelectItem value="collection">تشكيلة منتجات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-layout">تخطيط صفحة المنتج</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="product-layout">
                    <SelectValue placeholder="اختر تخطيط صفحة المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">قياسي</SelectItem>
                    <SelectItem value="gallery">معرض صور كبير</SelectItem>
                    <SelectItem value="compact">مضغوط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-related">عرض المنتجات ذات الصلة</Label>
                  <p className="text-sm text-gray-500">عرض المنتجات المشابهة في صفحة المنتج</p>
                </div>
                <Switch id="show-related" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-recently-viewed">عرض المنتجات المشاهدة مؤخراً</Label>
                  <p className="text-sm text-gray-500">عرض قائمة بالمنتجات التي شاهدها العميل مؤخراً</p>
                </div>
                <Switch id="show-recently-viewed" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Type className="h-5 w-5 mr-2 text-oksale-600" />
              الخطوط والكتابة
            </CardTitle>
            <CardDescription>تخصيص الخطوط وأحجامها في المتجر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="heading-font">خط العناوين</Label>
                <Select defaultValue="tajawal">
                  <SelectTrigger id="heading-font">
                    <SelectValue placeholder="اختر خط العناوين" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tajawal">Tajawal</SelectItem>
                    <SelectItem value="cairo">Cairo</SelectItem>
                    <SelectItem value="readex">Readex Pro</SelectItem>
                    <SelectItem value="ibm">IBM Plex Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="body-font">خط النصوص</Label>
                <Select defaultValue="tajawal">
                  <SelectTrigger id="body-font">
                    <SelectValue placeholder="اختر خط النصوص" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tajawal">Tajawal</SelectItem>
                    <SelectItem value="cairo">Cairo</SelectItem>
                    <SelectItem value="readex">Readex Pro</SelectItem>
                    <SelectItem value="ibm">IBM Plex Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>معاينة الخطوط</Label>
              <div className="p-4 rounded-md border border-gray-200 bg-gray-50 space-y-4">
                <h3 className="text-2xl font-bold">عنوان المقال</h3>
                <p className="text-base">هذا نص تجريبي لمعاينة الخط. يُستخدم هذا النص لعرض شكل الخط وحجمه في المتجر.</p>
              </div>
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

export default DashboardSettingsAppearance;
