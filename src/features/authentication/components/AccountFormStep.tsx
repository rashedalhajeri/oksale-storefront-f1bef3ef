
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SimpleSignUpValues } from '@/types/auth';

interface AccountFormStepProps {
  form: UseFormReturn<SimpleSignUpValues>;
  submitButtonText: string;
  isLoading: boolean;
}

const AccountFormStep: React.FC<AccountFormStepProps> = ({ 
  form, 
  submitButtonText, 
  isLoading 
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>البريد الإلكتروني</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                dir="ltr" 
                {...field} 
              />
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
            <FormLabel>كلمة المرور</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder="••••••••" 
                dir="ltr" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              يجب أن تكون كلمة المرور 6 أحرف على الأقل
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "جاري التحميل..." : submitButtonText}
      </Button>
    </>
  );
};

export default AccountFormStep;
