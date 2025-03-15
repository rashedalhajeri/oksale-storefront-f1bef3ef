
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validateHandle } from '@/utils/storeHandleValidation';
import { SignUpValues } from '@/types/auth';

export const useSignUp = (form: UseFormReturn<SignUpValues>) => {
  const navigate = useNavigate();
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
      
      console.log("بدء عملية تسجيل المستخدم...");
      
      // تنسيق قيم المدخلات
      const formattedHandle = data.storeHandle.toLowerCase();
      
      // إنشاء المستخدم في Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      
      if (authError) {
        console.error("خطأ في إنشاء الحساب:", authError);
        
        let errorMsg = "حدث خطأ أثناء إنشاء حسابك، يرجى المحاولة مرة أخرى.";
        
        if (authError.message.includes("User already registered")) {
          errorMsg = "البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر";
        } else if (authError.message.includes("rate limit")) {
          errorMsg = "لقد تجاوزت الحد المسموح من المحاولات، يرجى الانتظار قليلاً قبل المحاولة مرة أخرى";
        }
        
        toast({
          variant: "destructive",
          title: "فشل إنشاء الحساب",
          description: errorMsg,
        });
        
        setIsLoading(false);
        return;
      }
      
      // التأكد من أن لدينا معرف المستخدم
      if (!authData.user?.id) {
        console.error("لم يتم الحصول على معرف المستخدم");
        throw new Error("فشل إنشاء الحساب، يرجى المحاولة مرة أخرى");
      }
      
      console.log("تم إنشاء المستخدم بنجاح، معرف المستخدم:", authData.user.id);
      
      // تسجيل الدخول مباشرة بعد التسجيل لضمان وجود جلسة نشطة
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (signInError) {
        console.error("خطأ في تسجيل الدخول التلقائي:", signInError);
        throw signInError;
      }
      
      console.log("تم تسجيل الدخول تلقائياً بنجاح، جاري إنشاء المتجر...");
      
      // إنشاء متجر للمستخدم الجديد
      const { error: storeError } = await supabase
        .from("stores")
        .insert({
          owner_id: authData.user.id, // استخدام معرف المستخدم من البيانات التي تم إنشاؤها
          name: data.storeName,
          handle: formattedHandle,
          is_active: true, // تعيين المتجر كنشط افتراضياً
        });
      
      if (storeError) {
        console.error("خطأ في إنشاء المتجر:", storeError);
        
        // إذا فشل إنشاء المتجر، حاول مرة أخرى بعد التأكد من تسجيل الدخول
        const { data: session } = await supabase.auth.getSession();
        
        if (session?.session?.user?.id) {
          console.log("محاولة ثانية لإنشاء المتجر باستخدام الجلسة الحالية");
          
          const { error: retryError } = await supabase
            .from("stores")
            .insert({
              owner_id: session.session.user.id,
              name: data.storeName,
              handle: formattedHandle,
              is_active: true
            });
            
          if (retryError) {
            console.error("فشلت المحاولة الثانية لإنشاء المتجر:", retryError);
            throw retryError;
          }
        } else {
          throw storeError;
        }
      }
      
      console.log("تم إنشاء المتجر بنجاح!");
      
      toast({
        title: "تم إنشاء الحساب بنجاح!",
        description: `تم إنشاء متجرك ${data.storeName} بنجاح!`,
      });
      
      // توجيه المستخدم إلى لوحة التحكم
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("خطأ في التسجيل:", error);
      
      // معالجة رسائل الخطأ بشكل أفضل
      let errorMessage = "حدث خطأ أثناء إنشاء حسابك، يرجى المحاولة مرة أخرى.";
      
      if (error.message?.includes("User already registered")) {
        errorMessage = "البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر";
      } else if (error.message?.includes("row-level security policy")) {
        errorMessage = "خطأ في إنشاء المتجر، يرجى المحاولة مرة أخرى بعد قليل";
      } else if (error.message?.includes("rate limit")) {
        errorMessage = "لقد تجاوزت الحد المسموح من المحاولات، يرجى الانتظار قليلاً قبل المحاولة مرة أخرى";
      }
      
      toast({
        variant: "destructive",
        title: "فشل إنشاء الحساب",
        description: errorMessage,
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
