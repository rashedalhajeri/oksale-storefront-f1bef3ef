
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { 
  WhatsappLogo, 
  Bell, 
  Package, 
  Check, 
  Info, 
  CircleWavyCheck,
  Prohibit,
  ShoppingCart,
  Truck,
  CurrencyCircleDollar
} from '@phosphor-icons/react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';

interface DashboardSettingsWhatsAppProps {
  storeData: any;
}

const formSchema = z.object({
  whatsappEnabled: z.boolean().default(false),
  whatsappNumber: z.string().min(8, "رقم الهاتف قصير جداً").optional().or(z.literal('')),
  orderConfirmationEnabled: z.boolean().default(true),
  orderUpdateEnabled: z.boolean().default(true),
  shippingNotificationEnabled: z.boolean().default(true),
  paymentConfirmationEnabled: z.boolean().default(true),
  orderConfirmationTemplate: z.string().optional(),
  orderUpdateTemplate: z.string().optional(),
  shippingTemplate: z.string().optional(),
  paymentTemplate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DashboardSettingsWhatsApp: React.FC<DashboardSettingsWhatsAppProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsappEnabled: storeData?.whatsapp_notifications_enabled || false,
      whatsappNumber: storeData?.whatsapp || '',
      orderConfirmationEnabled: true,
      orderUpdateEnabled: true,
      shippingNotificationEnabled: true,
      paymentConfirmationEnabled: true,
      orderConfirmationTemplate: "عزيزي {customer_name}،\nتم استلام طلبك رقم {order_id} بنجاح.\nإجمالي المبلغ: {total_amount} {currency}\nسنقوم بإشعارك عند تجهيز طلبك.\nشكراً لثقتك بنا.",
      orderUpdateTemplate: "عزيزي {customer_name}،\nتم تحديث حالة طلبك رقم {order_id}.\nالحالة الجديدة: {order_status}\nيمكنك متابعة طلبك من خلال الرابط: {tracking_link}",
      shippingTemplate: "عزيزي {customer_name}،\nتم شحن طلبك رقم {order_id}.\nيمكنك تتبع الشحنة برقم: {tracking_number}\nالشركة: {shipping_company}\nموعد التسليم المتوقع: {expected_delivery}",
      paymentTemplate: "عزيزي {customer_name}،\nتم تأكيد دفع مبلغ {total_amount} {currency} للطلب رقم {order_id}.\nشكراً لك."
    }
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      // Update store settings in Supabase
      const { error } = await supabase
        .from('stores')
        .update({ 
          whatsapp: data.whatsappNumber,
          whatsapp_notifications_enabled: data.whatsappEnabled,
          whatsapp_settings: {
            orderConfirmation: {
              enabled: data.orderConfirmationEnabled,
              template: data.orderConfirmationTemplate
            },
            orderUpdate: {
              enabled: data.orderUpdateEnabled,
              template: data.orderUpdateTemplate
            },
            shipping: {
              enabled: data.shippingNotificationEnabled,
              template: data.shippingTemplate
            },
            payment: {
              enabled: data.paymentConfirmationEnabled,
              template: data.paymentTemplate
            }
          }
        })
        .eq('id', storeData.id);
        
      if (error) throw error;
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات واتساب بنجاح",
      });
    } catch (error) {
      console.error('Error updating WhatsApp settings:', error);
      toast({
        variant: "destructive",
        title: "خطأ في حفظ الإعدادات",
        description: "حدث خطأ أثناء تحديث إعدادات واتساب. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">إعدادات الواتساب</h1>
        <p className="text-gray-600">إدارة إشعارات المتجر التلقائية عبر واتساب للعملاء</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <WhatsappLogo weight="fill" className="h-5 w-5 text-green-600" />
                إعدادات الواتساب
              </CardTitle>
              <CardDescription>تفعيل وتخصيص إشعارات واتساب التلقائية للمتجر</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">تفعيل إشعارات واتساب</h3>
                  <p className="text-sm text-gray-500">إرسال إشعارات تلقائية للعملاء عبر واتساب</p>
                </div>
                <FormField
                  control={form.control}
                  name="whatsappEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم واتساب المتجر (بصيغة دولية)</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          placeholder="+96566778899"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        يجب أن يكون الرقم بالصيغة الدولية، مثال: +96566778899
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="p-4 rounded-md bg-amber-50 border border-amber-200 flex gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium mb-1">ملاحظة مهمة حول إشعارات واتساب</p>
                  <p>يتطلب إرسال إشعارات واتساب التلقائية تفعيل واتساب بيزنس API. لمزيد من المعلومات حول كيفية الاشتراك والتفعيل، يرجى التواصل مع فريق الدعم.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-oksale-600" />
                قوالب الإشعارات
              </CardTitle>
              <CardDescription>تخصيص محتوى رسائل واتساب التلقائية للعملاء</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Confirmation Template */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">تأكيد استلام الطلب</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="orderConfirmationEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="orderConfirmationTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={6}
                          dir="rtl"
                          placeholder="أدخل نص رسالة تأكيد الطلب..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        متغيرات متاحة: {'{customer_name}'} {'{order_id}'} {'{total_amount}'} {'{currency}'} {'{store_name}'}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Order Status Update Template */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleWavyCheck className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium">تحديث حالة الطلب</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="orderUpdateEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="orderUpdateTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={6}
                          dir="rtl"
                          placeholder="أدخل نص رسالة تحديث حالة الطلب..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        متغيرات متاحة: {'{customer_name}'} {'{order_id}'} {'{order_status}'} {'{tracking_link}'} {'{store_name}'}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Shipping Notification Template */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">إشعار الشحن</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="shippingNotificationEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="shippingTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={6}
                          dir="rtl"
                          placeholder="أدخل نص رسالة إشعار الشحن..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        متغيرات متاحة: {'{customer_name}'} {'{order_id}'} {'{tracking_number}'} {'{shipping_company}'} {'{expected_delivery}'} {'{store_name}'}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Confirmation Template */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CurrencyCircleDollar className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-medium">تأكيد الدفع</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="paymentConfirmationEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="paymentTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={6}
                          dir="rtl"
                          placeholder="أدخل نص رسالة تأكيد الدفع..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        متغيرات متاحة: {'{customer_name}'} {'{order_id}'} {'{total_amount}'} {'{currency}'} {'{payment_method}'} {'{store_name}'}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'جارِ الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardSettingsWhatsApp;
