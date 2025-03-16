
import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File, folder: string, storeId: string) => {
  try {
    if (!file.type.startsWith('image/')) {
      throw new Error('يرجى اختيار ملف صورة صالح');
    }
    
    const maxSize = folder === 'logos' ? 2 * 1024 * 1024 : 4 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`حجم الملف كبير جدًا. يجب أن يكون أقل من ${folder === 'logos' ? '2' : '4'} ميجابايت`);
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${storeId}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    console.log(`Uploading file to store-assets/${filePath}`);
    
    const { error: uploadError } = await supabase.storage
      .from('store-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`فشل رفع الملف: ${uploadError.message}`);
    }
    
    const { data } = supabase.storage
      .from('store-assets')
      .getPublicUrl(filePath);
    
    console.log('File uploaded successfully. Public URL:', data.publicUrl);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile function:', error);
    throw error;
  }
};
