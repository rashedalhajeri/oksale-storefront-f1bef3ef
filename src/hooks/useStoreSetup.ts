import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validateHandle } from '@/utils/storeHandleValidation';
import { StoreSetupValues } from '@/types/auth';

export const useStoreSetup = (form: UseFormReturn<StoreSetupValues>) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: StoreSetupValues) => {
    setIsLoading(true);
    
    try {
      // الحصول على معلومات المستخدم الحالي
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        console.error("خطأ في الحصول على جلسة المستخدم:", sessionError);
        throw new Error("يجب تسجيل الدخول لإكمال إعداد المتجر");
      }
      
      const userId = sessionData.session.user.id;
      
      // التحقق من توفر معرّف المتجر
      const isAvailable = await validateHandle(data.storeHandle);
      
      if (!isAvailable) {
        form.setError("storeHandle", { 
          type: "manual", 
          message: "هذا المعرّف غير متاح، يرجى اختيار معرّف آخر" 
        });
        setIsLoading(false);
        return;
      }
      
      console.log("بدء عملية إنشاء المتجر...");
      
      // تنسيق قيم المدخلات
      const formattedHandle = data.storeHandle.toLowerCase();
      
      // إنشاء متجر للمستخدم
      const { error: storeError } = await supabase
        .from("stores")
        .insert({
          owner_id: userId,
          name: data.storeName,
          handle: formattedHandle,
          description: data.description || null,
          currency: data.currency,
          country: data.country,
          setup_completed: true,
          is_active: true,
        });
      
      if (storeError) {
        console.error("خطأ في إنشاء المتجر:", storeError);
        throw storeError;
      }
      
      console.log("تم إنشاء المتجر بنجاح!");
      
      toast({
        title: "تم إنشاء المتجر بنجاح!",
        description: `تم إنشاء متجرك ${data.storeName} بنجاح!`,
      });
      
      // توجيه المستخدم إلى لوحة التحكم
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("خطأ في إعداد المتجر:", error);
      
      // معالجة رسائل الخطأ
      let errorMessage = "حدث خطأ أثناء إنشاء متجرك، يرجى المحاولة مرة أخرى.";
      
      if (error.message?.includes("duplicate key")) {
        errorMessage = "هذا المعرّف مستخدم بالفعل، يرجى اختيار معرّف آخر";
      } else if (error.message?.includes("row-level security policy")) {
        errorMessage = "خطأ في إنشاء المتجر، يرجى المحاولة مرة أخرى بعد قليل";
      }
      
      toast({
        variant: "destructive",
        title: "فشل إنشاء المتجر",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit
  };
};
