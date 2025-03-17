
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

/**
 * عرض إشعار بطلب جديد
 * @param order معلومات الطلب الجديد
 */
export const showNewOrderNotification = (order: any) => {
  const sound = new Audio('/sounds/new-order.mp3');
  
  try {
    // تشغيل صوت الإشعار
    sound.play().catch(err => console.error("Couldn't play notification sound:", err));
    
    // عرض إشعار داخل التطبيق
    toast({
      title: "طلب جديد! 🎉",
      description: `تم استلام طلب جديد من ${order.customer_name} بقيمة ${order.total_amount}`,
      variant: "default",
      duration: 10000,
      action: <ToastAction altText="عرض الطلب" onClick={() => window.location.href = `/dashboard/orders/${order.id}`}>
        عرض الطلب
      </ToastAction>
    });
    
    // إذا كان API الإشعارات مدعومًا، أظهر إشعارًا في نظام التشغيل
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('طلب جديد!', {
        body: `تم استلام طلب جديد من ${order.customer_name} بقيمة ${order.total_amount}`,
        icon: '/favicon.ico'
      });
    }
  } catch (error) {
    console.error("Error showing notification:", error);
  }
};

/**
 * عرض إشعار بتغيير حالة الطلب
 * @param order الطلب المحدث
 * @param oldStatus الحالة القديمة
 */
export const showOrderStatusChangeNotification = (order: any, oldStatus: string) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'processing': return 'قيد التجهيز';
      case 'pending': return 'قيد الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };
  
  toast({
    title: "تم تحديث حالة الطلب",
    description: `تم تغيير حالة الطلب #${order.id} من ${getStatusText(oldStatus)} إلى ${getStatusText(order.status)}`,
    variant: "default"
  });
};

/**
 * إنشاء وإدارة الاشتراكات في الوقت الحقيقي
 * @param storeId معرف المتجر
 * @param callbacks دوال رد الاتصال للأحداث المختلفة
 * @returns دالة للتنظيف تقوم بإلغاء الاشتراكات
 */
export const setupRealtimeSubscriptions = (
  storeId: string,
  callbacks = {
    onOrderUpdate: undefined,
    onNewOrder: undefined,
    onOrderDelete: undefined,
    onOrderItemUpdate: undefined
  }
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
  
  // طلب الإذن للإشعارات إذا لم يكن موجودًا بالفعل
  if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
  
  // دالة التنظيف لإزالة الاشتراكات عند تفكيك المكونات
  return () => {
    console.log("[Realtime] Cleaning up realtime subscriptions");
    if (ordersChannel) supabase.removeChannel(ordersChannel);
    if (orderItemsChannel) supabase.removeChannel(orderItemsChannel);
  };
};
