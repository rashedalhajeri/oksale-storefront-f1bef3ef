
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { SignUpValues } from '@/types/auth';

interface AccountFormStepProps {
  form: UseFormReturn<SignUpValues>;
  onNext: () => void;
}

const AccountFormStep = ({ form, onNext }: AccountFormStepProps) => {
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
        type="button"
        className="w-full bg-oksale-700 hover:bg-oksale-800"
        onClick={onNext}
      >
        التالي
        <ArrowRight className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default AccountFormStep;
