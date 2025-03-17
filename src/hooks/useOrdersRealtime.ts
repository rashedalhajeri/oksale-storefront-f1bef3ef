
import { useState, useEffect, useCallback } from 'react';
import { setupRealtimeSubscriptions } from '@/utils/dashboard/realtimeUtils';
import { showNewOrderNotification } from '@/utils/dashboard/realtimeUtils';
import { useToast } from '@/hooks/use-toast';

interface UseOrdersRealtimeProps {
  storeId: string;
  onNewOrder?: (order: any) => void;
  onOrderUpdate?: (order: any) => void;
  autoRefetch?: () => void;
}

/**
 * خطاف لإدارة الاشتراكات بالوقت الحقيقي للطلبات
 */
export const useOrdersRealtime = ({
  storeId,
  onNewOrder,
  onOrderUpdate,
  autoRefetch
}: UseOrdersRealtimeProps) => {
  const [newOrder, setNewOrder] = useState<any>(null);
  const [isNewOrderVisible, setIsNewOrderVisible] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const { toast } = useToast();

  // إعادة التحميل التلقائي عند وصول طلب جديد
  const handleNewOrder = useCallback((payload: any) => {
    console.log('[Realtime Hook] New order received:', payload.new);
    
    // تعيين الطلب الجديد وعرض الإشعار
    setNewOrder(payload.new);
    setIsNewOrderVisible(true);
    setLastUpdateTime(new Date());
    
    // تشغيل التحديث التلقائي إذا كان متوفرًا
    if (autoRefetch) {
      autoRefetch();
    }
    
    // استدعاء الدالة الخارجية إذا تم توفيرها
    if (onNewOrder) {
      onNewOrder(payload.new);
    }
  }, [autoRefetch, onNewOrder]);

  // معالجة تحديثات الطلبات
  const handleOrderUpdate = useCallback((payload: any) => {
    console.log('[Realtime Hook] Order updated:', payload.new);
    setLastUpdateTime(new Date());
    
    // تشغيل التحديث التلقائي إذا كان متوفرًا
    if (autoRefetch) {
      autoRefetch();
    }
    
    // استدعاء الدالة الخارجية إذا تم توفيرها
    if (onOrderUpdate) {
      onOrderUpdate(payload);
    }
  }, [autoRefetch, onOrderUpdate]);

  // إعداد الاشتراكات عند تحميل المكون
  useEffect(() => {
    if (!storeId) return;
    
    console.log(`[useOrdersRealtime] Setting up subscriptions for store: ${storeId}`);
    
    // إنشاء الاشتراكات بالوقت الحقيقي
    const cleanup = setupRealtimeSubscriptions(storeId, {
      onNewOrder: handleNewOrder,
      onOrderUpdate: handleOrderUpdate
    });
    
    // طلب إذن الإشعارات إذا لم يكن موجودًا بالفعل
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      // تأخير قليل قبل طلب الإذن للسماح بتحميل الصفحة أولاً
      setTimeout(() => {
        Notification.requestPermission().then(permission => {
          console.log(`[Notifications] Permission ${permission}`);
        });
      }, 2000);
    }
    
    // تنظيف الاشتراكات عند تفكيك المكون
    return cleanup;
  }, [storeId, handleNewOrder, handleOrderUpdate]);

  // إخفاء إشعار الطلب الجديد
  const hideNewOrderNotification = useCallback(() => {
    setIsNewOrderVisible(false);
  }, []);

  return {
    newOrder,
    isNewOrderVisible,
    lastUpdateTime,
    hideNewOrderNotification,
  };
};
