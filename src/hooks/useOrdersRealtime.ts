
import { useState, useEffect, useCallback } from 'react';
import { setupRealtimeSubscriptions } from '@/utils/dashboard/realtime';

interface OrdersRealtimeOptions {
  storeId: string;
  autoRefetch?: () => void;
  onOrderUpdate?: (payload: any) => void;
  onNewOrder?: (payload: any) => void;
  onOrderDelete?: (payload: any) => void;
}

export const useOrdersRealtime = ({
  storeId,
  autoRefetch,
  onOrderUpdate,
  onNewOrder,
  onOrderDelete
}: OrdersRealtimeOptions) => {
  const [newOrder, setNewOrder] = useState<any | null>(null);
  const [isNewOrderVisible, setIsNewOrderVisible] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  // تعريف متغير للتحقق من صحة معرف المتجر
  const validStoreId = storeId && typeof storeId === 'string' && storeId.length > 0;

  // إعداد اشتراكات في الوقت الحقيقي
  useEffect(() => {
    if (!validStoreId) return;

    console.log('[Realtime Hook] Setting up realtime subscriptions for store:', storeId);

    const handleNewOrder = (payload: any) => {
      console.log('[Realtime Hook] New order received:', payload);
      setNewOrder(payload.new);
      setIsNewOrderVisible(true);
      setLastUpdateTime(new Date());

      // استدعاء وظيفة إعادة التحميل التلقائية إذا تم توفيرها
      if (autoRefetch && typeof autoRefetch === 'function') {
        setTimeout(() => {
          autoRefetch();
        }, 1000); // تأخير قصير للسماح بإنشاء الطلب بالكامل
      }

      // استدعاء وظيفة معالجة الطلب الجديد المخصصة إذا تم توفيرها
      if (onNewOrder) {
        onNewOrder(payload);
      }
    };

    const handleOrderUpdate = (payload: any) => {
      console.log('[Realtime Hook] Order updated:', payload);
      setLastUpdateTime(new Date());

      // استدعاء وظيفة إعادة التحميل التلقائية إذا تم توفيرها
      if (autoRefetch && typeof autoRefetch === 'function') {
        setTimeout(() => {
          autoRefetch();
        }, 1000);
      }

      // استدعاء وظيفة معالجة تحديث الطلب المخصصة إذا تم توفيرها
      if (onOrderUpdate) {
        onOrderUpdate(payload);
      }
    };

    const handleOrderDelete = (payload: any) => {
      console.log('[Realtime Hook] Order deleted:', payload);
      setLastUpdateTime(new Date());

      // استدعاء وظيفة إعادة التحميل التلقائية إذا تم توفيرها
      if (autoRefetch && typeof autoRefetch === 'function') {
        setTimeout(() => {
          autoRefetch();
        }, 1000);
      }

      // استدعاء وظيفة معالجة حذف الطلب المخصصة إذا تم توفيرها
      if (onOrderDelete) {
        onOrderDelete(payload);
      }
    };

    // إعداد الاشتراكات في الوقت الحقيقي
    const cleanupSubscription = setupRealtimeSubscriptions(storeId, {
      onNewOrder: handleNewOrder,
      onOrderUpdate: handleOrderUpdate,
      onOrderDelete: handleOrderDelete
    });

    // تنظيف الاشتراكات عند تفكيك المكون
    return () => {
      console.log('[Realtime Hook] Cleaning up subscriptions');
      cleanupSubscription();
    };
  }, [storeId, validStoreId, autoRefetch, onNewOrder, onOrderUpdate, onOrderDelete]);

  // وظيفة لإخفاء إشعار الطلب الجديد
  const hideNewOrderNotification = useCallback(() => {
    setIsNewOrderVisible(false);
    setNewOrder(null);
  }, []);

  return {
    newOrder,
    isNewOrderVisible,
    hideNewOrderNotification,
    lastUpdateTime
  };
};
