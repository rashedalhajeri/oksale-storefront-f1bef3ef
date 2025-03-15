
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

// Schema تحقق من البيانات
const signUpSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف" }),
  storeName: z.string().min(3, { message: "اسم المتجر يجب أن يكون على الأقل 3 أحرف" }),
  storeHandle: z
    .string()
    .min(3, { message: "معرّف المتجر يجب أن يكون على الأقل 3 أحرف" })
    .max(30, { message: "معرّف المتجر يجب ألا يتجاوز 30 حرف" })
    .regex(/^@[a-zA-Z0-9_]+$/, { 
      message: "معرّف المتجر يجب أن يبدأ بـ @ ويحتوي فقط على أحرف إنجليزية وأرقام وشرطات سفلية" 
    }),
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      storeName: "",
      storeHandle: "@",
    },
  });

  const isHandleAvailable = async (handle: string): Promise<boolean> => {
    // التحقق من توفر المعرّف عبر قاعدة البيانات
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("handle")
        .eq("handle", handle)
        .single();
      
      if (error && error.code !== "PGRST116") {
        console.error("خطأ في التحقق من توفر المعرّف:", error);
        return false;
      }
      
      // إذا لم يتم العثور على معرّف مطابق، فهو متاح
      return !data;
    } catch (error) {
      console.error("خطأ في التحقق من توفر المعرّف:", error);
      return false;
    }
  };

  const validateHandle = async (handle: string) => {
    if (!handle.startsWith('@')) {
      return false;
    }
    
    // تحقق من صحة الصيغة أولاً
    if (!/^@[a-zA-Z0-9_]+$/.test(handle)) {
      return false;
    }
    
    // إذا كان المعرّف صحيحاً، تحقق من توفره
    return await isHandleAvailable(handle);
  };

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

  const watchStoreHandle = form.watch("storeHandle");
  
  // تأكد من أن معرّف المتجر يبدأ دائماً بـ @
  React.useEffect(() => {
    if (watchStoreHandle && !watchStoreHandle.startsWith('@')) {
      form.setValue("storeHandle", `@${watchStoreHandle}`);
    }
  }, [watchStoreHandle, form]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-oksale-50">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-oksale-100 p-2">
            <ShoppingBag className="h-6 w-6 text-oksale-700" />
          </div>
          <h1 className="text-2xl font-bold text-oksale-800">إنشاء حساب جديد</h1>
          <p className="text-sm text-oksale-600">أنشئ حسابك ومتجرك الخاص بخطوات بسيطة</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={currentStep === 0 ? "account" : "store"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account" className="text-sm">
                  بيانات الحساب
                </TabsTrigger>
                <TabsTrigger value="store" className="text-sm">
                  بيانات المتجر
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-4 pt-4">
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
                  type="button"
                  className="w-full bg-oksale-700 hover:bg-oksale-800"
                  onClick={handleNextStep}
                >
                  التالي
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </TabsContent>

              <TabsContent value="store" className="space-y-4 pt-4">
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
                        <Input
                          placeholder="@my_store"
                          dir="ltr"
                          className="border-oksale-200"
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value;
                            // تأكد من أن المعرّف يبدأ بـ @
                            if (!value.startsWith('@')) {
                              value = `@${value}`;
                            }
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        معرّف فريد لمتجرك يجب أن يبدأ بـ @ ويتكون من أحرف إنجليزية وأرقام وشرطات سفلية فقط
                      </FormDescription>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-oksale-200"
                    onClick={handlePrevStep}
                  >
                    السابق
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-oksale-700 hover:bg-oksale-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري إنشاء المتجر...
                      </>
                    ) : (
                      "إنشاء الحساب والمتجر"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm text-oksale-600">
          لديك حساب بالفعل؟{" "}
          <Link to="/signin" className="font-medium text-oksale-700 hover:text-oksale-800">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
