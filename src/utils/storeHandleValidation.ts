
import { supabase } from "@/integrations/supabase/client";

export const isHandleAvailable = async (handle: string): Promise<boolean> => {
  // التحقق من صحة الصيغة أولاً
  if (!handle || !handle.startsWith('@') || !/^@[a-zA-Z0-9-]+$/.test(handle)) {
    return false;
  }
  
  // التحقق من توفر المعرّف عبر قاعدة البيانات
  try {
    const { data, error } = await supabase
      .from("stores")
      .select("handle")
      .eq("handle", handle.toLowerCase())
      .single();
    
    if (error && error.code !== "PGRST116") {
      console.error("خطأ في التحقق من توفر المعرّف:", error);
      return false;
    }
    
    // إذا لم يتم العثور على معرّف مطابق، فهو متاح
    return !data;
  } catch (error) {
    console.error("خطأ في التحقق من توفر المعرّف:", error);
    return false;
  }
};

export const validateHandle = async (handle: string): Promise<boolean> => {
  if (!handle.startsWith('@')) {
    return false;
  }
  
  // تحقق من صحة الصيغة أولاً
  if (!/^@[a-zA-Z0-9-]+$/.test(handle)) {
    return false;
  }
  
  // إذا كان المعرّف صحيحاً، تحقق من توفره
  return await isHandleAvailable(handle);
};
