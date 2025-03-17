
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowRight, Mail, AlertCircle, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
});

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      
      toast({
        title: 'تم إرسال رابط إعادة تعيين كلمة المرور',
        description: 'يرجى التحقق من بريدك الإلكتروني',
      });
      
    } catch (error: any) {
      console.error('Error resetting password:', error.message);
      
      toast({
        variant: 'destructive',
        title: 'حدث خطأ',
        description: 'لم نتمكن من إرسال رابط إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-12">
        <div className="relative h-40 mb-6 overflow-hidden rounded-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/lovable-uploads/46d958e9-880d-4522-8850-0a5dfa8e95bc.png')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">استعادة كلمة المرور</h2>
            <p className="text-sm text-gray-200">سنرسل لك رابط لإعادة تعيين كلمة المرور</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">نسيت كلمة المرور</h1>

        {isSubmitted ? (
          <div className="space-y-6">
            <Alert className="bg-emerald-50 border-emerald-200">
              <Check className="h-5 w-5 text-emerald-600" />
              <AlertTitle className="text-emerald-800 mb-2">تم إرسال رابط إعادة تعيين كلمة المرور</AlertTitle>
              <AlertDescription className="text-emerald-700">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من البريد الوارد وقد تجد البريد في مجلد البريد الغير مرغوب.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center">
              <Link to="/signin">
                <Button variant="outline" className="mt-4">
                  العودة إلى تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>
        ) : (
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
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال رابط إعادة تعيين كلمة المرور
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          تذكرت كلمة المرور؟{' '}
          <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
