
import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from 'lucide-react';
import { simpleSignUpSchema, SimpleSignUpValues } from '@/types/auth';
import { useSimpleSignUp } from '@/hooks/useSimpleSignUp';
import AccountFormStep from '@/components/signup/AccountFormStep';

const SignUp = () => {
  const form = useForm<SimpleSignUpValues>({
    resolver: zodResolver(simpleSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    isLoading,
    onSubmit
  } = useSimpleSignUp(form);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-oksale-50">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-oksale-100 p-2">
            <ShoppingBag className="h-6 w-6 text-oksale-700" />
          </div>
          <h1 className="text-2xl font-bold text-oksale-800">إنشاء حساب جديد</h1>
          <p className="text-sm text-oksale-600">أنشئ حسابك الخاص بخطوات بسيطة</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AccountFormStep form={form} submitButtonText="إنشاء الحساب" isLoading={isLoading} />
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
