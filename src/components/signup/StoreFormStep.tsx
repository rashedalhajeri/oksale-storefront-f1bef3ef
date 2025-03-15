
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X, AlertCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { StoreSetupValues } from '@/types/auth';
import { isHandleAvailable } from '@/utils/storeHandleValidation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StoreFormStepProps {
  form: UseFormReturn<StoreSetupValues>;
  isLoading: boolean;
}

const currencies = [
  { value: "SAR", label: "ريال سعودي (SAR)" },
  { value: "AED", label: "درهم إماراتي (AED)" },
  { value: "USD", label: "دولار أمريكي (USD)" },
  { value: "EUR", label: "يورو (EUR)" },
  { value: "KWD", label: "دينار كويتي (KWD)" },
  { value: "BHD", label: "دينار بحريني (BHD)" },
  { value: "QAR", label: "ريال قطري (QAR)" },
  { value: "OMR", label: "ريال عماني (OMR)" },
  { value: "EGP", label: "جنيه مصري (EGP)" },
  { value: "JOD", label: "دينار أردني (JOD)" },
];

const countries = [
  { value: "SA", label: "المملكة العربية السعودية" },
  { value: "AE", label: "الإمارات العربية المتحدة" },
  { value: "KW", label: "الكويت" },
  { value: "BH", label: "البحرين" },
  { value: "QA", label: "قطر" },
  { value: "OM", label: "عمان" },
  { value: "EG", label: "مصر" },
  { value: "JO", label: "الأردن" },
  { value: "IQ", label: "العراق" },
  { value: "YE", label: "اليمن" },
  { value: "LB", label: "لبنان" },
  { value: "PS", label: "فلسطين" },
  { value: "SY", label: "سوريا" },
  { value: "SD", label: "السودان" },
  { value: "LY", label: "ليبيا" },
  { value: "TN", label: "تونس" },
  { value: "DZ", label: "الجزائر" },
  { value: "MA", label: "المغرب" },
];

const StoreFormStep = ({ form, isLoading }: StoreFormStepProps) => {
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [isHandleValid, setIsHandleValid] = useState<boolean | null>(null);
  const storeHandle = form.watch("storeHandle");
  
  useEffect(() => {
    // إعادة ضبط حالة التحقق عند تغيير المعرّف
    setIsHandleValid(null);
    
    const checkHandle = async () => {
      if (!storeHandle || storeHandle.length < 3) return;
      
      // التحقق من تنسيق المعرّف أولاً
      const isValidFormat = /^@[a-zA-Z0-9-]+$/.test(storeHandle);
      if (!isValidFormat) {
        setIsHandleValid(false);
        return;
      }
      
      setIsCheckingHandle(true);
      try {
        const available = await isHandleAvailable(storeHandle);
        setIsHandleValid(available);
        
        // إذا كان المعرف غير متاح، قم بإظهار رسالة خطأ
        if (!available) {
          form.setError("storeHandle", { 
            type: "manual", 
            message: "هذا المعرّف غير متاح، يرجى اختيار معرّف آخر" 
          });
        } else {
          form.clearErrors("storeHandle");
        }
      } catch (error) {
        console.error("خطأ في التحقق من المعرّف:", error);
        setIsHandleValid(false);
      } finally {
        setIsCheckingHandle(false);
      }
    };
    
    // استخدام مؤقت للتأخير في التحقق حتى يتوقف المستخدم عن الكتابة
    const timer = setTimeout(() => {
      if (storeHandle && storeHandle.length >= 3) {
        checkHandle();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [storeHandle, form]);

  return (
    <div className="space-y-4 pt-4">
      <Alert variant="default" className="bg-blue-50 border-blue-200 mb-4">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700 text-sm">
          بعد إعداد المتجر سيمكنك الوصول إلى متجرك عبر الرابط: oksale.me/{storeHandle.replace('@', '')}
        </AlertDescription>
      </Alert>

      <FormField
        control={form.control}
        name="storeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-oksale-700">اسم المتجر</FormLabel>
            <FormControl>
              <Input
                placeholder="مثال: متجر الأناقة"
                className="border-oksale-200"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">
              هذا هو الاسم الذي سيظهر للزوار عند زيارة متجرك
            </FormDescription>
            <FormMessage className="text-right" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="storeHandle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-oksale-700">معرّف المتجر</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="@my-store"
                  dir="ltr"
                  className="border-oksale-200 pr-10"
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value;
                    // تأكد من أن المعرّف يبدأ بـ @
                    if (!value.startsWith('@')) {
                      value = `@${value}`;
                    }
                    // تحويل أي حروف عربية أو خاصة إلى فراغات
                    value = value.replace(/[^@a-zA-Z0-9-]/g, '');
                    field.onChange(value);
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isCheckingHandle && (
                    <Loader2 className="h-4 w-4 animate-spin text-oksale-400" />
                  )}
                  {!isCheckingHandle && isHandleValid === true && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {!isCheckingHandle && isHandleValid === false && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </FormControl>
            <FormDescription className="text-xs">
              معرّف فريد لمتجرك سيكون الرابط: oksale.me/{storeHandle.replace('@', '')} (يجب أن يبدأ بـ @ ويتكون من أحرف إنجليزية وأرقام وشرطات - فقط)
            </FormDescription>
            {isHandleValid === false && !isCheckingHandle && storeHandle && storeHandle.length >= 3 && /^@[a-zA-Z0-9-]+$/.test(storeHandle) && (
              <div className="text-xs text-red-500 mt-1">
                هذا المعرّف غير متاح، يرجى اختيار معرّف آخر
              </div>
            )}
            {isHandleValid === true && !isCheckingHandle && (
              <div className="text-xs text-green-500 mt-1">
                هذا المعرّف متاح ويمكنك استخدامه
              </div>
            )}
            <FormMessage className="text-right" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-oksale-700">عملة المتجر</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="border-oksale-200">
                    <SelectValue placeholder="اختر العملة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-oksale-700">دولة المتجر</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="border-oksale-200">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-oksale-700">وصف المتجر (اختياري)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="وصف موجز لمتجرك وما يقدمه للعملاء"
                className="border-oksale-200 min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-xs">
              وصف مختصر يظهر للزوار ويعرفهم بمتجرك
            </FormDescription>
            <FormMessage className="text-right" />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="w-full bg-oksale-700 hover:bg-oksale-800"
        disabled={isLoading || isHandleValid === false || isCheckingHandle}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري إنشاء المتجر...
          </>
        ) : (
          "إنشاء المتجر"
        )}
      </Button>
    </div>
  );
};

export default StoreFormStep;
