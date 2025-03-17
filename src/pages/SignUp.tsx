
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'تم إنشاء الحساب بنجاح!',
        description: 'تم إرسال رابط التأكيد إلى بريدك الإلكتروني',
      });
      
      navigate('/signin');
      
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      
      let errorMessage = 'حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى';
      
      if (error.message.includes('User already registered')) {
        errorMessage = 'البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول';
      }
      
      toast({
        variant: 'destructive',
        title: 'فشل إنشاء الحساب',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-12">
        <div className="relative h-48 mb-8 overflow-hidden rounded-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/lovable-uploads/46d958e9-880d-4522-8850-0a5dfa8e95bc.png')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">مرحباً بك</h2>
            <p className="text-lg text-gray-200">ابدأ رحلتك مع أفضل منصة للتجارة الإلكترونية</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="your@email.com" 
                        className="pl-10 bg-gray-50 border-gray-200" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">كلمة المرور</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 bg-gray-50 border-gray-200" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري إنشاء الحساب...
                </>
              ) : (
                <>
                  إنشاء الحساب
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-center mb-6">
            <span className="text-sm text-gray-500">أو إنشاء حساب باستخدام</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center py-2.5">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              Google
            </Button>
            
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center py-2.5">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M16 4c2.209 0 4 1.791 4 4v8c0 2.209-1.791 4-4 4H8c-2.209 0-4-1.791-4-4V8c0-2.209 1.791-4 4-4h8zm0 2H8c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2h8c1.105 0 2-.895 2-2V8c0-1.105-.895-2-2-2z" fill="#000"/>
                <path d="M12 10c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0-4c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z" fill="#000"/>
              </svg>
              Apple
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
