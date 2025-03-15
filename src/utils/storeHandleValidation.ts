
import { supabase } from "@/integrations/supabase/client";

export const isHandleAvailable = async (handle: string): Promise<boolean> => {
  // التحقق من صحة الصيغة أولاً
  if (!handle || !handle.startsWith('@') || !/^@[a-zA-Z0-9-]+$/.test(handle)) {
    console.log("صيغة المعرّف غير صالحة:", handle);
    return false;
  }
  
  // تحويل المعرّف إلى أحرف صغيرة
  const formattedHandle = handle.toLowerCase();
  
  // التحقق من توفر المعرّف عبر قاعدة البيانات
  try {
    console.log("التحقق من توفر المعرّف:", formattedHandle);
    const { data, error } = await supabase
      .from("stores")
      .select("handle")
      .eq("handle", formattedHandle)
      .maybeSingle();
    
    if (error) {
      console.error("خطأ في التحقق من توفر المعرّف:", error);
      return false;
    }
    
    // إذا لم يتم العثور على معرّف مطابق، فهو متاح
    const isAvailable = !data;
    console.log("نتيجة التحقق من توفر المعرّف:", isAvailable ? "متاح" : "غير متاح");
    return isAvailable;
  } catch (error) {
    console.error("خطأ في التحقق من توفر المعرّف:", error);
    return false;
  }
};

export const validateHandle = async (handle: string): Promise<boolean> => {
  console.log("التحقق من صحة المعرّف:", handle);
  
  if (!handle || handle.length < 3) {
    console.log("المعرّف يجب أن يكون 3 أحرف على الأقل");
    return false;
  }
  
  if (!handle.startsWith('@')) {
    console.log("المعرّف يجب أن يبدأ بـ @");
    return false;
  }
  
  // تحقق من صحة الصيغة أولاً
  if (!/^@[a-zA-Z0-9-]+$/.test(handle)) {
    console.log("صيغة المعرّف غير صالحة");
    return false;
  }
  
  // إذا كان المعرّف صحيحاً، تحقق من توفره
  return await isHandleAvailable(handle);
};
