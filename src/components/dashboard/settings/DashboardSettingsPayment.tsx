
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Wallet, BanknoteIcon, Shield, Info, Plus, AlertTriangle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardSettingsPaymentProps {
  storeData: any;
}

interface PaymentGateway {
  enabled: boolean;
  test_mode: boolean;
  api_key?: string;
  secret_key?: string;
  merchant_id?: string;
  [key: string]: any;
}

interface PaymentGateways {
  myfatoorah: PaymentGateway;
  tap: PaymentGateway;
  [key: string]: any;
}

const DashboardSettingsPayment: React.FC<DashboardSettingsPaymentProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateways>({
    myfatoorah: { enabled: false, test_mode: true },
    tap: { enabled: false, test_mode: true },
  });

  useEffect(() => {
    // تحميل إعدادات بوابات الدفع من قاعدة البيانات
    if (storeData && storeData.payment_gateways) {
      setPaymentGateways(storeData.payment_gateways);
    }
  }, [storeData]);

  const handleSaveChanges = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('stores')
        .update({
          payment_gateways: paymentGateways
        })
        .eq('id', storeData.id);

      if (error) {
        throw error;
      }

      toast({
        title: "تم حفظ التغييرات",
        description: "تم تحديث إعدادات وسائل الدفع بنجاح.",
      });
    } catch (error) {
      console.error('خطأ في حفظ إعدادات الدفع:', error);
      toast({
        variant: "destructive",
        title: "خطأ في حفظ التغييرات",
        description: "حدث خطأ أثناء محاولة حفظ إعدادات وسائل الدفع. الرجاء المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGatewayToggle = (gateway: string, enabled: boolean) => {
    setPaymentGateways(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        enabled
      }
    }));
  };

  const handleGatewayModeToggle = (gateway: string, testMode: boolean) => {
    setPaymentGateways(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        test_mode: testMode
      }
    }));
  };

  const handleGatewayInputChange = (gateway: string, field: string, value: string) => {
    setPaymentGateways(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value
      }
    }));
  };

  const renderTestModeWarning = () => (
    <div className="p-4 rounded-md bg-amber-50 border border-amber-200 flex gap-3 mb-4">
      <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-700">
        عندما يكون وضع الاختبار مفعلاً، سيتم استخدام بيئة الاختبار للمدفوعات ولن يتم خصم أي مبالغ حقيقية. استخدم هذا الوضع للتأكد من صحة الإعدادات قبل التبديل إلى الوضع الحقيقي.
      </p>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">وسائل الدفع</h1>
        <p className="text-gray-600">إدارة طرق الدفع المتاحة في متجرك</p>
      </div>

      <div className="space-y-6">
        {/* بوابات الدفع الإلكترونية الخليجية */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="h-5 w-5 ml-2 text-oksale-600" />
              بوابات الدفع الخليجية
            </CardTitle>
            <CardDescription>تكامل مع بوابات الدفع الأكثر استخداماً في الخليج العربي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderTestModeWarning()}

            <Tabs defaultValue="myfatoorah" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="myfatoorah" className="w-1/2">ماي فاتورة (MyFatoorah)</TabsTrigger>
                <TabsTrigger value="tap" className="w-1/2">تاب (Tap Payments)</TabsTrigger>
              </TabsList>

              {/* ماي فاتورة */}
              <TabsContent value="myfatoorah">
                <div className="rounded-md border border-gray-200">
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://fatoorah.net/assets/images/fatoora_logo.png" alt="ماي فاتورة" className="w-8 h-8 object-contain rounded" />
                      </div>
                      <div>
                        <h3 className="font-medium">ماي فاتورة - MyFatoorah</h3>
                        <p className="text-sm text-gray-500">بوابة الدفع الشاملة لدول الخليج العربي</p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentGateways.myfatoorah.enabled}
                      onCheckedChange={(checked) => handleGatewayToggle('myfatoorah', checked)}
                    />
                  </div>
                  
                  {paymentGateways.myfatoorah.enabled && (
                    <>
                      <Separator />
                      <div className="p-4 bg-gray-50 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="myfatoorah-test-mode">وضع الاختبار</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80 text-sm">في وضع الاختبار، لن يتم خصم أي مبالغ حقيقية. استخدم هذا الوضع للتأكد من صحة الإعدادات.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Switch 
                            id="myfatoorah-test-mode"
                            checked={paymentGateways.myfatoorah.test_mode}
                            onCheckedChange={(checked) => handleGatewayModeToggle('myfatoorah', checked)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="myfatoorah-api-key">مفتاح API</Label>
                            <Input 
                              id="myfatoorah-api-key" 
                              placeholder="أدخل مفتاح API"
                              dir="ltr"
                              value={paymentGateways.myfatoorah.api_key || ''}
                              onChange={(e) => handleGatewayInputChange('myfatoorah', 'api_key', e.target.value)}
                            />
                            <p className="text-xs text-gray-500">يمكنك الحصول على المفتاح من لوحة تحكم ماي فاتورة</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="myfatoorah-currency">العملة الافتراضية</Label>
                          <Select 
                            value={paymentGateways.myfatoorah.currency || 'KWD'}
                            onValueChange={(value) => handleGatewayInputChange('myfatoorah', 'currency', value)}
                          >
                            <SelectTrigger id="myfatoorah-currency">
                              <SelectValue placeholder="اختر العملة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                              <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                              <SelectItem value="BHD">دينار بحريني (BHD)</SelectItem>
                              <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                              <SelectItem value="QAR">ريال قطري (QAR)</SelectItem>
                              <SelectItem value="OMR">ريال عماني (OMR)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="p-4 rounded-md bg-blue-50 border border-blue-200 flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">
                              لتفعيل حساب ماي فاتورة:
                            </p>
                            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                              <li>قم بالتسجيل في <a href="https://portal.myfatoorah.com/ar/register" target="_blank" className="text-blue-600 underline">بوابة ماي فاتورة</a></li>
                              <li>أكمل عملية التسجيل والتحقق من حسابك</li>
                              <li>استخرج مفتاح API من لوحة التحكم</li>
                              <li>أدخل المفتاح هنا وقم بحفظ الإعدادات</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* تاب (Tap Payments) */}
              <TabsContent value="tap">
                <div className="rounded-md border border-gray-200">
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <img src="https://tap.company/dashboard/site_assets/img/tap-logo.svg" alt="تاب" className="w-8 h-8 object-contain rounded" />
                      </div>
                      <div>
                        <h3 className="font-medium">تاب - Tap Payments</h3>
                        <p className="text-sm text-gray-500">بوابة دفع متكاملة تدعم مدى وكي-نت والبطاقات العالمية</p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentGateways.tap.enabled}
                      onCheckedChange={(checked) => handleGatewayToggle('tap', checked)}
                    />
                  </div>
                  
                  {paymentGateways.tap.enabled && (
                    <>
                      <Separator />
                      <div className="p-4 bg-gray-50 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="tap-test-mode">وضع الاختبار</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80 text-sm">في وضع الاختبار، لن يتم خصم أي مبالغ حقيقية. استخدم هذا الوضع للتأكد من صحة الإعدادات.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Switch 
                            id="tap-test-mode"
                            checked={paymentGateways.tap.test_mode}
                            onCheckedChange={(checked) => handleGatewayModeToggle('tap', checked)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tap-public-key">المفتاح العام (Public Key)</Label>
                            <Input 
                              id="tap-public-key" 
                              placeholder="أدخل المفتاح العام"
                              dir="ltr"
                              value={paymentGateways.tap.public_key || ''}
                              onChange={(e) => handleGatewayInputChange('tap', 'public_key', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tap-secret-key">المفتاح السري (Secret Key)</Label>
                            <Input 
                              id="tap-secret-key" 
                              type="password"
                              placeholder="أدخل المفتاح السري"
                              dir="ltr"
                              value={paymentGateways.tap.secret_key || ''}
                              onChange={(e) => handleGatewayInputChange('tap', 'secret_key', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tap-currency">العملة الافتراضية</Label>
                          <Select 
                            value={paymentGateways.tap.currency || 'KWD'}
                            onValueChange={(value) => handleGatewayInputChange('tap', 'currency', value)}
                          >
                            <SelectTrigger id="tap-currency">
                              <SelectValue placeholder="اختر العملة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                              <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                              <SelectItem value="BHD">دينار بحريني (BHD)</SelectItem>
                              <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                              <SelectItem value="QAR">ريال قطري (QAR)</SelectItem>
                              <SelectItem value="OMR">ريال عماني (OMR)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="p-4 rounded-md bg-blue-50 border border-blue-200 flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">
                              لتفعيل حساب تاب (Tap Payments):
                            </p>
                            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                              <li>قم بالتسجيل في <a href="https://www.tap.company/kw/ar/developers" target="_blank" className="text-blue-600 underline">منصة تاب للمطورين</a></li>
                              <li>أنشئ تطبيقًا جديدًا في لوحة التحكم</li>
                              <li>استخرج المفتاح العام والمفتاح السري</li>
                              <li>أدخل المفاتيح هنا وقم بحفظ الإعدادات</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* وسائل الدفع الأخرى */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BanknoteIcon className="h-5 w-5 ml-2 text-oksale-600" />
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

        {/* أمان المدفوعات */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 ml-2 text-oksale-600" />
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
