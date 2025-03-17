
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

/**
 * تحميل صورة المنتج إلى Supabase Storage
 * @param file ملف الصورة للتحميل
 * @param storeId معرف المتجر
 * @returns رابط الصورة المُحمّلة
 */
export const uploadProductImage = async (file: File, storeId: string): Promise<string> => {
  try {
    // التحقق من صحة الملف
    if (!file.type.startsWith('image/')) {
      throw new Error('الرجاء اختيار ملف صورة صالح');
    }
    
    // التحقق من حجم الملف (الحد الأقصى 5 ميجابايت)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new Error('حجم الصورة كبير جدًا. يجب أن يكون أقل من 5 ميجابايت');
    }
    
    // إنشاء مسار فريد للصورة
    const fileExt = file.name.split('.').pop();
    const fileName = `${storeId}/${uuidv4()}.${fileExt}`;
    
    // تحميل الصورة إلى مخزن Supabase
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });
    
    if (error) {
      console.error('خطأ في تحميل الصورة:', error);
      throw error;
    }
    
    // الحصول على رابط عام للصورة
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('فشل في تحميل الصورة:', error);
    throw error;
  }
};

/**
 * تحميل صور متعددة للمنتج
 * @param files قائمة ملفات الصور
 * @param storeId معرف المتجر
 * @returns قائمة بروابط الصور المُحمَّلة
 */
export const uploadMultipleProductImages = async (files: File[], storeId: string): Promise<string[]> => {
  try {
    const uploadPromises = Array.from(files).map(file => uploadProductImage(file, storeId));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('فشل في تحميل الصور المتعددة:', error);
    throw error;
  }
};

/**
 * حذف صورة منتج من التخزين
 * @param imageUrl رابط الصورة المراد حذفها
 */
export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    // استخراج اسم الملف من رابط URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const storeFolder = urlParts[urlParts.length - 2];
    const path = `${storeFolder}/${fileName}`;
    
    const { error } = await supabase.storage
      .from('product-images')
      .remove([path]);
    
    if (error) {
      console.error('خطأ في حذف الصورة:', error);
      throw error;
    }
  } catch (error) {
    console.error('فشل في حذف الصورة:', error);
    throw error;
  }
};

/**
 * تحسين واجهة المستخدم عند تحميل الصور
 * @param file ملف الصورة
 * @param storeId معرف المتجر
 * @param onSuccess دالة يتم استدعاؤها عند نجاح التحميل
 * @param onError دالة يتم استدعاؤها عند حدوث خطأ
 */
export const uploadProductImageWithFeedback = async (
  file: File,
  storeId: string,
  onSuccess: (url: string) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    toast({
      title: "جارِ تحميل الصورة",
      description: "يرجى الانتظار...",
    });
    
    const imageUrl = await uploadProductImage(file, storeId);
    
    toast({
      title: "تم التحميل بنجاح",
      description: "تم تحميل الصورة بنجاح",
      variant: "default",
    });
    
    onSuccess(imageUrl);
  } catch (error) {
    toast({
      title: "فشل التحميل",
      description: error instanceof Error ? error.message : "حدث خطأ أثناء تحميل الصورة",
      variant: "destructive",
    });
    
    onError(error);
  }
};
