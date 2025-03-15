
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validateHandle } from '@/utils/storeHandleValidation';
import { SignUpValues } from '@/types/auth';

export const useSignUp = (form: UseFormReturn<SignUpValues>) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = async () => {
    // التحقق من صحة البيانات في الخطوة الحالية
    if (currentStep === 0) {
      const isValid = await form.trigger(['email', 'password']);
      if (isValid) setCurrentStep(1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(0);
  };

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    try {
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
      
      // إنشاء المستخدم في Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      
      if (authError) {
        throw authError;
      }
      
      // التأكد من أن لدينا معرف المستخدم
      if (!authData.user?.id) {
        throw new Error("فشل إنشاء الحساب، يرجى المحاولة مرة أخرى");
      }
      
      // إنشاء متجر للمستخدم الجديد
      const { error: storeError } = await supabase
        .from("stores")
        .insert({
          owner_id: authData.user.id,
          name: data.storeName,
          handle: data.storeHandle,
        });
      
      if (storeError) {
        throw storeError;
      }
      
      toast({
        title: "تم إنشاء الحساب بنجاح!",
        description: `تم إنشاء متجرك ${data.storeName} بنجاح!`,
      });
      
      // تسجيل الدخول تلقائياً بعد التسجيل
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      // توجيه المستخدم إلى متجره
      const handle = data.storeHandle.replace('@', '');
      navigate(`/store/${handle}`);
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      toast({
        variant: "destructive",
        title: "فشل إنشاء الحساب",
        description: "حدث خطأ أثناء إنشاء حسابك، يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentStep,
    handleNextStep,
    handlePrevStep,
    onSubmit
  };
};
