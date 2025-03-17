
import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellDot,
  Package,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formatRelativeTime } from '@/utils/dashboard/dashboardUtils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'info' | 'success' | 'warning';
  read: boolean;
  created_at: string;
  link?: string;
}

interface NotificationBellProps {
  storeId: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ storeId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!storeId) return;

    // في التطبيق الحقيقي، هنا سيتم جلب الإشعارات من قاعدة البيانات
    // لأغراض العرض، سنضيف بعض الإشعارات الوهمية
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'طلب جديد',
        message: 'تم استلام طلب جديد بقيمة 150 ريال',
        type: 'order',
        read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // قبل 5 دقائق
        link: '/dashboard/orders'
      },
      {
        id: '2',
        title: 'اكتمال الطلب',
        message: 'تم اكتمال الطلب #12345 بنجاح',
        type: 'success',
        read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // قبل ساعة
        link: '/dashboard/orders'
      },
      {
        id: '3',
        title: 'تحديث النظام',
        message: 'تم تحديث النظام إلى الإصدار الجديد',
        type: 'info',
        read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // قبل يوم
      }
    ];

    setNotifications(mockNotifications);
    setHasUnread(mockNotifications.some(notif => !notif.read));

    // إعداد اشتراك الوقت الحقيقي للإشعارات الجديدة
    // في التطبيق الحقيقي، سيكون هناك جدول للإشعارات
    const channel = supabase
      .channel(`notifications-${storeId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'orders',
          filter: `store_id=eq.${storeId}`
        },
        (payload) => {
          // إضافة إشعار جديد للطلب
          const newOrder = payload.new;
          const newNotification: Notification = {
            id: `order-${newOrder.id}`,
            title: 'طلب جديد',
            message: `تم استلام طلب جديد من ${newOrder.customer_name} بقيمة ${newOrder.total_amount}`,
            type: 'order',
            read: false,
            created_at: new Date().toISOString(),
            link: `/dashboard/orders/${newOrder.id}`
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          setHasUnread(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storeId]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setHasUnread(false);
    
    // في التطبيق الحقيقي، هنا يمكن تحديث قاعدة البيانات
  };

  const handleNotificationClick = (notification: Notification) => {
    // تحديث حالة القراءة
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
    
    // التحقق مما إذا كانت هناك إشعارات غير مقروءة متبقية
    const stillHasUnread = notifications.some(n => n.id !== notification.id && !n.read);
    setHasUnread(stillHasUnread);
    
    // في التطبيق الحقيقي، هنا يمكن تحديث قاعدة البيانات
    
    // الانتقال إلى الرابط إذا كان موجودًا
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 text-indigo-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          {hasUnread ? (
            <>
              <BellDot className="h-5 w-5 text-indigo-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </>
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>الإشعارات</span>
          {hasUnread && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              تعيين الكل كمقروء
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start p-3 gap-3 cursor-pointer ${notification.read ? '' : 'bg-indigo-50/50'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">{notification.title}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap mr-1">
                      {formatRelativeTime(notification.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-gray-500">
              لا توجد إشعارات
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
