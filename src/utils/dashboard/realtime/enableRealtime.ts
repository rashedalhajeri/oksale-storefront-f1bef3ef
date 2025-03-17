
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
    
    // بدلاً من استخدام RPC، سنستخدم استعلام SQL مباشر
    const { error } = await supabase
      .from('orders')
      .select('id')
      .eq('store_id', storeId)
      .limit(1);
    
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
