
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from 'lucide-react';
import { storeSetupSchema, StoreSetupValues } from '@/types/auth';
import { useStoreSetup } from '@/hooks/useStoreSetup';
import { supabase } from '@/integrations/supabase/client';
import StoreFormStep from '@/components/signup/StoreFormStep';

const StoreSetup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<StoreSetupValues>({
    resolver: zodResolver(storeSetupSchema),
    defaultValues: {
      storeName: "",
      storeHandle: "@",
      currency: "SAR",
      country: "SA",
      description: "",
    },
    mode: "onChange",
  });

  const typedForm = form as UseFormReturn<StoreSetupValues>;

  const {
    isLoading: isSubmitting,
    onSubmit
  } = useStoreSetup(typedForm);
  
  const watchStoreHandle = form.watch("storeHandle");
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };
    
    checkAuth();
    
    if (watchStoreHandle && !watchStoreHandle.startsWith('@')) {
      form.setValue("storeHandle", `@${watchStoreHandle}`);
    }
  }, [watchStoreHandle, form]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-oksale-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (isAuthenticated === false) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-oksale-50">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-oksale-100 p-2">
            <ShoppingBag className="h-6 w-6 text-oksale-700" />
          </div>
          <h1 className="text-2xl font-bold text-oksale-800">إعداد المتجر</h1>
          <p className="text-sm text-oksale-600">قم بإعداد متجرك الخاص الآن</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <StoreFormStep form={typedForm} isLoading={isSubmitting} />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StoreSetup;
