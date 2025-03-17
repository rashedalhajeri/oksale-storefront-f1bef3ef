
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Bell } from "lucide-react";

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
      action: (
        <ToastAction altText="عرض الطلب" onClick={() => window.location.href = `/dashboard/orders/${order.id}`}>
          عرض الطلب
        </ToastAction>
      )
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
  const sound = new Audio('/sounds/status-change.mp3');
  
  try {
    // تشغيل صوت الإشعار بصوت منخفض
    sound.volume = 0.5;
    sound.play().catch(err => console.error("Couldn't play notification sound:", err));
    
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
  } catch (error) {
    console.error("Error showing status change notification:", error);
  }
};

/**
 * طلب إذن للإشعارات إذا لم يتم الحصول عليه مسبقًا
 */
export const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      console.log(`[Notifications] Permission ${permission}`);
    });
  }
};
