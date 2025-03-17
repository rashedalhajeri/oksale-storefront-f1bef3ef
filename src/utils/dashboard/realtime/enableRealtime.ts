
import { supabase } from '@/integrations/supabase/client';

/**
 * تفعيل ميزة الوقت الحقيقي للطلبات في متجر محدد
 * يقوم هذا الإجراء بتمكين التتبع الكامل للصف وإضافة الجدول إلى منشور الوقت الحقيقي
 * @param storeId معرف المتجر
 * @returns Promise<void>
 */
export const enableOrdersRealtime = async (storeId: string): Promise<void> => {
  if (!storeId) return;
  
  try {
    console.log(`[Realtime] Enabling realtime for store ${storeId}`);
    
    // إنشاء تابع SQL لجعل الطلبات متوفرة في الوقت الحقيقي لمتجر محدد
    const { error } = await supabase.rpc('enable_realtime_for_store_orders', {
      store_id_param: storeId
    });
    
    if (error) {
      throw error;
    }
    
    console.log(`[Realtime] Successfully enabled realtime for store ${storeId}`);
  } catch (error) {
    console.error('[Realtime] Error enabling realtime:', error);
    // يمكن أن يفشل هذا إذا لم يكن لدى المستخدم صلاحيات كافية أو إذا كانت ميزة الوقت الحقيقي معطلة
    // في هذه الحالة، سنعتمد فقط على التحديث اليدوي وRefreshInterval
  }
};

/**
 * تهيئة اشتراك بالوقت الحقيقي للجداول المهمة المرتبطة بالمتجر
 * @param storeId معرف المتجر
 */
export const initializeRealtimeSubscriptions = async (storeId: string): Promise<void> => {
  if (!storeId) return;
  
  try {
    await enableOrdersRealtime(storeId);
    
    // يمكن إضافة جداول أخرى هنا في المستقبل
    
  } catch (error) {
    console.error('[Realtime] Failed to initialize realtime subscriptions:', error);
  }
};
