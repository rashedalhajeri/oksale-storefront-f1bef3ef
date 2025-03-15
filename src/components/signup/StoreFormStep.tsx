
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { SignUpValues } from '@/types/auth';

interface StoreFormStepProps {
  form: UseFormReturn<SignUpValues>;
  onPrevious: () => void;
  isLoading: boolean;
}

const StoreFormStep = ({ form, onPrevious, isLoading }: StoreFormStepProps) => {
  return (
    <div className="space-y-4 pt-4">
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
                placeholder="@my-store"
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
              معرّف فريد لمتجرك سيكون الرابط: oksale.me/store-name (يجب أن يبدأ بـ @ ويتكون من أحرف إنجليزية وأرقام وشرطات - فقط)
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
          onClick={onPrevious}
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
    </div>
  );
};

export default StoreFormStep;
