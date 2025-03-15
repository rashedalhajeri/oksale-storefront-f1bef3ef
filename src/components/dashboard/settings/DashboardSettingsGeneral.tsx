
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin, Clock, Upload, Phone, Mail, Instagram, Twitter, Facebook, Link2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface DashboardSettingsGeneralProps {
  storeData: any;
}

const DashboardSettingsGeneral: React.FC<DashboardSettingsGeneralProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث معلومات المتجر بنجاح.",
      });
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">المعلومات العامة</h1>
        <p className="text-gray-600">إدارة المعلومات الأساسية لمتجرك</p>
      </div>

      <div className="space-y-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات المتجر</CardTitle>
            <CardDescription>المعلومات الأساسية التي ستظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">اسم المتجر</Label>
                <Input 
                  id="store-name" 
                  placeholder="أدخل اسم المتجر" 
                  defaultValue={storeData?.name || ''} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-handle">معرف المتجر (Store handle)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    @
                  </span>
                  <Input 
                    id="store-handle" 
                    placeholder="yourstore" 
                    defaultValue={storeData?.handle?.replace('@', '') || ''} 
                    dir="ltr"
                    className="rounded-r-none"
                  />
                </div>
                <p className="text-sm text-gray-500">سيظهر في رابط المتجر: /yourstore</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-description">وصف المتجر</Label>
              <Textarea 
                id="store-description" 
                placeholder="أدخل وصفاً لمتجرك" 
                rows={4}
                defaultValue={storeData?.description || ''} 
              />
              <p className="text-sm text-gray-500">يظهر في صفحة المتجر ويساعد في تحسين ظهور متجرك في محركات البحث</p>
            </div>

            <div className="space-y-2">
              <Label>شعار المتجر</Label>
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  {storeData?.logo_url ? (
                    <AvatarImage src={storeData.logo_url} alt={storeData?.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-oksale-600 to-oksale-800 text-white text-2xl">
                      {storeData?.name?.charAt(0) || 'S'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">
                    <Upload className="h-4 w-4 ml-2" />
                    رفع شعار جديد
                  </Button>
                  <p className="text-sm text-gray-500">
                    يفضل استخدام صورة مربعة بأبعاد 500×500 بيكسل بصيغة PNG أو JPG
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات الاتصال</CardTitle>
            <CardDescription>معلومات الاتصال التي ستظهر للعملاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-email">البريد الإلكتروني</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input 
                    id="store-email" 
                    type="email"
                    placeholder="contact@yourstore.com" 
                    defaultValue={storeData?.email || ''} 
                    dir="ltr"
                    className="rounded-r-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">رقم الهاتف</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <Input 
                    id="store-phone" 
                    placeholder="+966 55 123 4567" 
                    defaultValue={storeData?.phone || ''} 
                    dir="ltr"
                    className="rounded-r-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-address">عنوان المتجر</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <Input 
                  id="store-address" 
                  placeholder="أدخل عنوان المتجر" 
                  defaultValue={storeData?.address || ''} 
                  className="rounded-r-none"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-base font-medium">وسائل التواصل الاجتماعي</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social-instagram">انستجرام</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <Input 
                      id="social-instagram" 
                      placeholder="yourstorename" 
                      defaultValue={storeData?.instagram || ''} 
                      dir="ltr"
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-twitter">تويتر (X)</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                      <Twitter className="h-4 w-4" />
                    </span>
                    <Input 
                      id="social-twitter" 
                      placeholder="yourstorename" 
                      defaultValue={storeData?.twitter || ''} 
                      dir="ltr"
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-facebook">فيسبوك</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                      <Facebook className="h-4 w-4" />
                    </span>
                    <Input 
                      id="social-facebook" 
                      placeholder="yourstorename" 
                      defaultValue={storeData?.facebook || ''} 
                      dir="ltr"
                      className="rounded-r-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social-website">الموقع الإلكتروني</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input 
                      id="social-website" 
                      placeholder="https://www.yourwebsite.com" 
                      defaultValue={storeData?.website || ''} 
                      dir="ltr"
                      className="rounded-r-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإعدادات الإقليمية</CardTitle>
            <CardDescription>إعدادات اللغة والمنطقة الزمنية والعملة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-language">اللغة الأساسية</Label>
                <Select defaultValue="ar">
                  <SelectTrigger id="store-language" className="w-full">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                    <SelectItem value="fr">الفرنسية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-currency">العملة</Label>
                <Select defaultValue="sar">
                  <SelectTrigger id="store-currency" className="w-full">
                    <SelectValue placeholder="اختر العملة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sar">ريال سعودي (ر.س)</SelectItem>
                    <SelectItem value="aed">درهم إماراتي (د.إ)</SelectItem>
                    <SelectItem value="kwd">دينار كويتي (د.ك)</SelectItem>
                    <SelectItem value="usd">دولار أمريكي ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-timezone">المنطقة الزمنية</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                    <Clock className="h-4 w-4" />
                  </span>
                  <Select defaultValue="asia_riyadh">
                    <SelectTrigger id="store-timezone" className="w-full rounded-r-none border-r-0">
                      <SelectValue placeholder="المنطقة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia_riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="asia_dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="asia_kuwait">الكويت (GMT+3)</SelectItem>
                      <SelectItem value="europe_london">لندن (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

export default DashboardSettingsGeneral;
