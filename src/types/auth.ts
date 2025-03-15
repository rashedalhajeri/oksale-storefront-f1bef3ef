
import { z } from "zod";

// سكيما تسجيل الدخول البسيط
export const simpleSignUpSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف" }),
});

export type SimpleSignUpValues = z.infer<typeof simpleSignUpSchema>;

// سكيما إعداد المتجر
export const storeSetupSchema = z.object({
  storeName: z.string().min(3, { message: "اسم المتجر يجب أن يكون على الأقل 3 أحرف" }),
  storeHandle: z
    .string()
    .min(3, { message: "معرّف المتجر يجب أن يكون على الأقل 3 أحرف" })
    .max(30, { message: "معرّف المتجر يجب ألا يتجاوز 30 حرف" })
    .regex(/^@[a-zA-Z0-9-]+$/, { 
      message: "معرّف المتجر يجب أن يبدأ بـ @ ويحتوي فقط على أحرف إنجليزية وأرقام وشرطات (-)" 
    }),
  currency: z.string({ required_error: "يرجى اختيار عملة المتجر" }),
  country: z.string({ required_error: "يرجى اختيار دولة المتجر" }),
  description: z.string().optional(),
});

export type StoreSetupValues = z.infer<typeof storeSetupSchema>;

// للتوافق مع الكود القديم، نحتفظ بالسكيما القديمة
export const signUpSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف" }),
  storeName: z.string().min(3, { message: "اسم المتجر يجب أن يكون على الأقل 3 أحرف" }),
  storeHandle: z
    .string()
    .min(3, { message: "معرّف المتجر يجب أن يكون على الأقل 3 أحرف" })
    .max(30, { message: "معرّف المتجر يجب ألا يتجاوز 30 حرف" })
    .regex(/^@[a-zA-Z0-9-]+$/, { 
      message: "معرّف المتجر يجب أن يبدأ بـ @ ويحتوي فقط على أحرف إنجليزية وأرقام وشرطات (-)" 
    }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
