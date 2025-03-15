
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Schema تحقق من البيانات
const signInSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف" }),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasTried, setHasTried] = useState(false);

  // التحقق ما إذا كان المستخدم مسجلاً بالفعل
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("خطأ أثناء التحقق من جلسة المستخدم:", error);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    try {
      // تسجيل الدخول باستخدام Supabase
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        // إذا كان الخطأ متعلق بعدم تأكيد البريد الإلكتروني وهذه هي المحاولة الأولى
        if (error.message.includes("Email not confirmed") && !hasTried) {
          setHasTried(true);  // تعيين العلم لمنع المحاولات المتكررة
          
          console.log("محاولة تسجيل الدخول مع حساب غير مؤكد، محاولة تسهيل عملية التسجيل...");
          
          // محاولة التسجيل مرة أخرى للحسابات غير المؤكدة
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              emailRedirectTo: window.location.origin
            }
          });
          
          if (signUpError) {
            console.error("خطأ في إعادة التسجيل:", signUpError);
            throw error;  // استخدام الخطأ الأصلي
          }
          
          // محاولة تسجيل الدخول مرة أخرى
          const { data: retryAuthData, error: retryError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });
          
          if (retryError) {
            console.error("خطأ في إعادة محاولة تسجيل الدخول:", retryError);
            throw retryError;
          }
          
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "مرحباً بك مجدداً!",
          });
          
          navigate("/dashboard");
          return;
        }
        
        throw error;
      }
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مجدداً!",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("خطأ في تسجيل الدخول:", error);
      
      let errorMessage = "حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى.";
      
      // عرض رسائل خطأ أكثر تفصيلاً
      if (error.message.includes("Invalid login")) {
        errorMessage = "بريد إلكتروني أو كلمة مرور غير صحيحة";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول أو قم بالتسجيل مرة أخرى";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "لقد تجاوزت الحد المسموح من المحاولات، يرجى الانتظار قليلاً قبل المحاولة مرة أخرى";
      }
      
      toast({
        variant: "destructive",
        title: "فشل تسجيل الدخول",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-oksale-50">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-oksale-100 p-2">
            <ShoppingBag className="h-6 w-6 text-oksale-700" />
          </div>
          <h1 className="text-2xl font-bold text-oksale-800">تسجيل الدخول</h1>
          <p className="text-sm text-oksale-600">أدخل بياناتك للوصول إلى متجرك</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-oksale-700">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل بريدك الإلكتروني"
                      type="email"
                      dir="ltr"
                      className="border-oksale-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-oksale-700">كلمة المرور</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل كلمة المرور"
                      type="password"
                      dir="ltr"
                      className="border-oksale-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-oksale-700 hover:bg-oksale-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm text-oksale-600">
          ليس لديك حساب؟{" "}
          <Link to="/signup" className="font-medium text-oksale-700 hover:text-oksale-800">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
