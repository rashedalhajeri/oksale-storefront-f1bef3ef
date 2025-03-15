
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SimpleSignUpValues } from '@/types/auth';

export const useSimpleSignUp = (form: UseFormReturn<SimpleSignUpValues>) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SimpleSignUpValues) => {
    setIsLoading(true);
    
    try {
      console.log("بدء عملية تسجيل المستخدم البسيطة...");
      
      // إنشاء المستخدم في Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin,
        }
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
      
      // تسجيل الدخول بعد إنشاء الحساب بنجاح
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (signInError) {
        console.error("خطأ في تسجيل الدخول بعد التسجيل:", signInError);
        throw signInError;
      }
      
      toast({
        title: "تم إنشاء الحساب بنجاح!",
        description: "يرجى إكمال إعداد متجرك الآن",
      });
      
      // توجيه المستخدم إلى صفحة إعداد المتجر
      navigate('/store-setup');
      
    } catch (error: any) {
      console.error("خطأ في التسجيل:", error);
      
      // معالجة رسائل الخطأ بشكل أفضل
      let errorMessage = "حدث خطأ أثناء إنشاء حسابك، يرجى المحاولة مرة أخرى.";
      
      if (error.message?.includes("User already registered")) {
        errorMessage = "البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر";
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
    onSubmit
  };
};
