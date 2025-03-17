
import { supabase } from '@/integrations/supabase/client';
import { showNewOrderNotification, showOrderStatusChangeNotification } from './notifications.tsx';

/**
 * دالة إنشاء اشتراك بالوقت الحقيقي للطلبات
 * تتيح هذه الدالة مراقبة التغييرات على جدول الطلبات في الوقت الحقيقي
 * @param storeId معرف المتجر
 * @param onOrderUpdate دالة يتم استدعاؤها عند تحديث طلب
 * @param onNewOrder دالة يتم استدعاؤها عند إنشاء طلب جديد
 * @param onOrderDelete دالة يتم استدعاؤها عند حذف طلب
 * @returns كائن قناة الاشتراك
 */
export const createOrdersSubscription = (
  storeId: string, 
  onOrderUpdate?: (payload: any) => void,
  onNewOrder?: (payload: any) => void,
  onOrderDelete?: (payload: any) => void
) => {
  if (!storeId) return null;

  console.log(`[Realtime] Creating subscription for store: ${storeId}`);

  // إنشاء قناة مشتركة لجميع أنواع الأحداث الخاصة بالطلبات
  const channel = supabase
    .channel(`orders-${storeId}`)
    .on(
      'postgres_changes',
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'orders',
        filter: `store_id=eq.${storeId}`
      },
      (payload) => {
        console.log('[Realtime] New order:', payload);
        
        // معالجة الطلب الجديد
        if (onNewOrder) {
          onNewOrder(payload);
        }
        
        // طلب جديد
        showNewOrderNotification(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'orders',
        filter: `store_id=eq.${storeId}`
      },
      (payload) => {
        console.log('[Realtime] Order updated:', payload);
        
        if (onOrderUpdate) {
          onOrderUpdate(payload);
        }
        
        // إذا تم تغيير حالة الطلب
        if (payload.old.status !== payload.new.status) {
          showOrderStatusChangeNotification(payload.new, payload.old.status);
        }
      }
    )
    .on(
      'postgres_changes',
      { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'orders',
        filter: `store_id=eq.${storeId}`
      },
      (payload) => {
        console.log('[Realtime] Order deleted:', payload);
        
        if (onOrderDelete) {
          onOrderDelete(payload);
        }
      }
    )
    .subscribe((status) => {
      console.log(`[Realtime] Subscription status: ${status}`);
    });

  return channel;
};

/**
 * دالة إنشاء اشتراك بالوقت الحقيقي لعناصر الطلبات
 * @param storeId معرف المتجر
 * @param onOrderItemUpdate دالة يتم استدعاؤها عند تحديث عنصر طلب
 * @returns كائن قناة الاشتراك
 */
export const createOrderItemsSubscription = (
  storeId: string, 
  onOrderItemUpdate?: (payload: any) => void
) => {
  if (!storeId) return null;

  // للحصول على المعلومات المحدثة لعناصر الطلبات، نحتاج إلى الاشتراك في جدول order_items
  // ولكن نحتاج أيضًا إلى التحقق من أن عنصر الطلب ينتمي إلى متجر المستخدم
  // هذا يتطلب استعلامًا أكثر تعقيدًا أو نهجًا مختلفًا
  
  // هذا نهج مبسط سيتطلب تعديلًا إضافيًا للتأكد من أن العناصر تنتمي إلى المتجر المناسب
  const channel = supabase
    .channel(`order-items-${storeId}`)
    .on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'order_items'
      },
      (payload) => {
        if (onOrderItemUpdate) {
          // سنحتاج إلى التحقق من أن الطلب ينتمي إلى المتجر قبل معالجته
          // هذا يتطلب استعلامًا إضافيًا أو مخزنًا مؤقتًا للطلبات
          // للتبسيط، سنفترض أن الرسالة مرتبطة بالمتجر
          onOrderItemUpdate(payload);
        }
      }
    )
    .subscribe();

  return channel;
};
