
import { supabase } from "@/integrations/supabase/client";

/**
 * واجهة لنتائج البحث عن المنتجات
 */
export interface ProductSearchResult {
  id: string;
  name: string;
  description: string | null;
  price: number;
  in_stock: boolean;
  image_url: string | null;
  similarity: number;
}

/**
 * بحث متقدم في المنتجات باستخدام تقنية pg_trgm
 * @param searchTerm مصطلح البحث
 * @param storeId معرف المتجر
 * @param similarityThreshold عتبة التشابه (الافتراضي: 0.3)
 * @returns قائمة نتائج البحث مرتبة حسب درجة التشابه
 */
export const searchProducts = async (
  searchTerm: string,
  storeId: string,
  similarityThreshold: number = 0.3
): Promise<ProductSearchResult[]> => {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      // إذا كان مصطلح البحث فارغًا، استرجع كل المنتجات
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, in_stock, image_url')
        .eq('store_id', storeId);
      
      if (error) throw error;
      
      return data.map(product => ({
        ...product,
        similarity: 1.0  // أقصى تشابه للكل
      }));
    }
    
    // استخدام وظيفة البحث المتقدم
    const { data, error } = await supabase
      .rpc('search_products', {
        search_term: searchTerm,
        store_id_param: storeId,
        similarity_threshold: similarityThreshold
      });
    
    if (error) {
      console.error('خطأ في البحث المتقدم:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('فشل في البحث عن المنتجات:', error);
    throw error;
  }
};

/**
 * اقتراحات البحث للمنتجات
 * @param partialTerm جزء من مصطلح البحث
 * @param storeId معرف المتجر
 * @param limit عدد المقترحات الأقصى (الافتراضي: 5)
 * @returns قائمة باقتراحات البحث
 */
export const getProductSearchSuggestions = async (
  partialTerm: string,
  storeId: string,
  limit: number = 5
): Promise<string[]> => {
  try {
    if (!partialTerm || partialTerm.trim() === '') {
      return [];
    }
    
    // تحضير مصطلح البحث من خلال إضافة البادئة واللاحقة
    const preparedTerm = `%${partialTerm}%`;
    
    // البحث في أسماء المنتجات
    const { data, error } = await supabase
      .from('products')
      .select('name')
      .eq('store_id', storeId)
      .ilike('name', preparedTerm)
      .limit(limit);
    
    if (error) {
      console.error('خطأ في الحصول على اقتراحات البحث:', error);
      throw error;
    }
    
    // استخراج أسماء المنتجات وإرجاعها
    return data.map(item => item.name);
  } catch (error) {
    console.error('فشل في الحصول على اقتراحات البحث:', error);
    return [];
  }
};
