
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUp } from '@/hooks/useSignUp';
import { SignUpValues } from '@/types/auth';
import { CheckCircle, UserPlus, Store } from 'lucide-react';
import AccountFormStep from '@/components/signup/AccountFormStep';
import StoreFormStep from '@/components/signup/StoreFormStep';

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  password: z.string().min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
  storeName: z.string().min(3, { message: 'اسم المتجر يجب أن يكون 3 أحرف على الأقل' }),
  storeHandle: z.string().min(3, { message: 'معرّف المتجر يجب أن يكون 3 أحرف على الأقل' })
    .max(20, { message: 'معرّف المتجر يجب أن لا يتجاوز 20 حرف' })
    .regex(/^[a-z0-9_-]+$/, { message: 'معرّف المتجر يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط' }),
});

const SignUp = () => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      storeName: '',
      storeHandle: '',
    },
    mode: 'onChange',
  });

  const { isLoading, currentStep, handleNextStep, handlePrevStep, onSubmit } = useSignUp(form);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-3 text-white shadow-lg mb-4">
            {currentStep === 0 ? (
              <UserPlus className="h-full w-full" />
            ) : (
              <Store className="h-full w-full" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            {currentStep === 0 ? 'أدخل بياناتك لإنشاء حساب جديد' : 'أدخل بيانات متجرك'}
          </CardDescription>
        </CardHeader>
        
        {/* Stepper */}
        <div className="px-6 py-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 0 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className={`h-1 w-12 ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            </div>
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>الحساب</span>
            <span>المتجر</span>
          </div>
        </div>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 0 ? (
              <AccountFormStep 
                form={form} 
                submitButtonText="التالي" 
                isLoading={isLoading} 
              />
            ) : (
              <StoreFormStep 
                form={form} 
                isLoading={isLoading} 
              />
            )}
            
            <div className="flex justify-between pt-4">
              {currentStep === 1 && (
                <Button type="button" variant="outline" onClick={handlePrevStep} disabled={isLoading}>
                  السابق
                </Button>
              )}
              
              {currentStep === 0 ? (
                <Button 
                  type="button" 
                  onClick={handleNextStep} 
                  className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  التالي
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isLoading ? 'جارِ التسجيل...' : 'إنشاء الحساب'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <div className="text-center text-sm">
            لديك حساب بالفعل؟{' '}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
