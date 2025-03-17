
import { supabase } from '@/integrations/supabase/client';
import { createOrdersSubscription, createOrderItemsSubscription } from './subscriptions';
import { requestNotificationPermission } from './notifications';

/**
 * Interface for callbacks used in realtime subscriptions
 */
export interface RealtimeCallbacks {
  onOrderUpdate?: (payload: any) => void;
  onNewOrder?: (payload: any) => void;
  onOrderDelete?: (payload: any) => void;
  onOrderItemUpdate?: (payload: any) => void;
}

/**
 * إنشاء وإدارة الاشتراكات في الوقت الحقيقي
 * @param storeId معرف المتجر
 * @param callbacks دوال رد الاتصال للأحداث المختلفة
 * @returns دالة للتنظيف تقوم بإلغاء الاشتراكات
 */
export const setupRealtimeSubscriptions = (
  storeId: string,
  callbacks: RealtimeCallbacks = {}
) => {
  if (!storeId) return () => {};
  
  console.log("[Realtime] Setting up realtime subscriptions for store:", storeId);
  
  // إنشاء اشتراكات للطلبات وعناصر الطلبات
  const ordersChannel = createOrdersSubscription(
    storeId,
    callbacks.onOrderUpdate,
    callbacks.onNewOrder,
    callbacks.onOrderDelete
  );
  
  const orderItemsChannel = createOrderItemsSubscription(
    storeId,
    callbacks.onOrderItemUpdate
  );
  
  // طلب الإذن للإشعارات
  requestNotificationPermission();
  
  // دالة التنظيف لإزالة الاشتراكات عند تفكيك المكونات
  return () => {
    console.log("[Realtime] Cleaning up realtime subscriptions");
    if (ordersChannel) supabase.removeChannel(ordersChannel);
    if (orderItemsChannel) supabase.removeChannel(orderItemsChannel);
  };
};

// Re-export subscriptions and notifications for direct import
export * from './subscriptions';
export * from './notifications';
