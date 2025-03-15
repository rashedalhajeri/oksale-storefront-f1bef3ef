
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { SimpleSignUpValues } from '@/types/auth';

interface AccountFormStepProps {
  form: UseFormReturn<SimpleSignUpValues>;
  submitButtonText: string;
  isLoading: boolean;
}

const AccountFormStep = ({ form, submitButtonText, isLoading }: AccountFormStepProps) => {
  return (
    <div className="space-y-4 pt-4">
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
            جاري إنشاء الحساب...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    </div>
  );
};

export default AccountFormStep;
