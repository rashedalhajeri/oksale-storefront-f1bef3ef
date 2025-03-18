
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast";
import React from "react";

/**
 * يطلب إذن الإشعارات من المستخدم
 * @returns {Promise<boolean>} وعد يحل إلى قيمة منطقية تشير إلى ما إذا كان الإذن ممنوحًا
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  // التحقق مما إذا كانت واجهة برمجة التطبيقات للإشعارات متوفرة في المتصفح
  if (!("Notification" in window)) {
    console.log("[Notifications] This browser does not support notifications");
    return false;
  }

  // إذا كان الإذن ممنوحًا بالفعل، فأعد true
  if (Notification.permission === "granted") {
    return true;
  }

  // طلب الإذن
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("[Notifications] Error requesting permission:", error);
    return false;
  }
};

/**
 * عرض إشعار للطلب الجديد
 * @param {any} order - بيانات الطلب الجديد
 */
export const showNewOrderNotification = (order: any) => {
  // إظهار إشعار باستخدام مكتبة toast
  toast.success("طلب جديد", {
    description: `تم استلام طلب جديد من ${order.customer_name} بقيمة ${order.total_amount}`,
    duration: 10000,
    position: "bottom-right",
    action: (
      <ToastAction 
        altText="عرض الطلب" 
        onClick={() => window.location.href = `/dashboard/orders/${order.id}`}
      >
        عرض الطلب
      </ToastAction>
    ),
    style: {
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }
  });
    
  // إذا كان API الإشعارات مدعومًا، أظهر إشعارًا في نظام التشغيل
  if (Notification.permission === "granted") {
    try {
      const notification = new Notification("طلب جديد!", {
        body: `تم استلام طلب جديد من ${order.customer_name} بقيمة ${order.total_amount}`,
        icon: "/favicon.ico"
      });

      // تشغيل صوت تنبيه
      playNotificationSound("new-order");
      
      // عند النقر على الإشعار
      notification.onclick = () => {
        window.focus();
        window.location.href = `/dashboard/orders/${order.id}`;
      };
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  }
};

/**
 * عرض إشعار لتغيير حالة الطلب
 * @param {any} order - بيانات الطلب المحدث
 * @param {string} oldStatus - الحالة القديمة للطلب
 */
export const showOrderStatusChangeNotification = (order: any, oldStatus: string) => {
  // إظهار إشعار باستخدام مكتبة toast
  toast.info("تحديث الطلب", {
    description: `تم تغيير حالة الطلب #${order.id} من "${oldStatus}" إلى "${order.status}"`,
    duration: 8000,
    position: "bottom-right",
    action: (
      <ToastAction 
        altText="عرض الطلب" 
        onClick={() => window.location.href = `/dashboard/orders/${order.id}`}
      >
        عرض الطلب
      </ToastAction>
    ),
    style: {
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }
  });
  
  // إذا كان API الإشعارات مدعومًا، أظهر إشعارًا في نظام التشغيل
  if (Notification.permission === "granted") {
    try {
      const notification = new Notification("تحديث الطلب", {
        body: `تم تغيير حالة الطلب #${order.id} من "${oldStatus}" إلى "${order.status}"`,
        icon: "/favicon.ico"
      });
      
      // تشغيل صوت تنبيه
      playNotificationSound("status-change");
      
      // عند النقر على الإشعار
      notification.onclick = () => {
        window.focus();
        window.location.href = `/dashboard/orders/${order.id}`;
      };
    } catch (error) {
      console.error("[Notifications] Error showing notification:", error);
    }
  }
};

/**
 * تشغيل صوت الإشعار
 * @param {string} type - نوع الصوت (new-order أو status-change)
 */
const playNotificationSound = (type: "new-order" | "status-change") => {
  try {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(err => {
      console.error("[Notifications] Error playing sound:", err);
    });
  } catch (error) {
    console.error("[Notifications] Error creating audio element:", error);
  }
};
