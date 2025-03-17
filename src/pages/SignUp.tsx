
// This is the same file that was previously at src/pages/public/SignUp.tsx
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            {currentStep === 0 ? 'أدخل بياناتك لإنشاء حساب جديد' : 'أدخل بيانات متجرك'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 0 ? (
              <AccountFormStep form={form} />
            ) : (
              <StoreFormStep form={form} />
            )}
            
            <div className="flex justify-between pt-4">
              {currentStep === 1 && (
                <Button type="button" variant="outline" onClick={handlePrevStep} disabled={isLoading}>
                  السابق
                </Button>
              )}
              
              {currentStep === 0 ? (
                <Button type="button" onClick={handleNextStep} className="ml-auto">
                  التالي
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading ? 'جارِ التسجيل...' : 'إنشاء الحساب'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            لديك حساب بالفعل؟{' '}
            <Link to="/signin" className="font-medium text-oksale-600 hover:text-oksale-500">
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
