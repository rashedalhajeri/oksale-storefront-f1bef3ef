
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/dashboard/orderStatus";

interface NotificationBellProps {
  storeId?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'system' | 'payment';
}

const NotificationBell: React.FC<NotificationBellProps> = ({ storeId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'طلب جديد',
      message: 'لديك طلب جديد بقيمة 120 ريال',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'اكتمال الدفع',
      message: 'تم اكتمال عملية الدفع للطلب #OR-1234',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: false,
      type: 'payment'
    },
    {
      id: '3',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام إلى الإصدار الجديد',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
      type: 'system'
    }
  ]);

  // We can use the storeId prop in the future to fetch notifications for this specific store
  // console.log('NotificationBell for store:', storeId);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative p-2" 
          size="icon"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="font-semibold">الإشعارات</h2>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={markAllAsRead}
            >
              تعيين الكل كمقروء
            </Button>
          )}
        </div>
        
        <div className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">ليس لديك إشعارات جديدة</p>
            </div>
          ) : (
            notifications.map(notification => (
              <DropdownMenuItem 
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-3 space-y-1 border-b last:border-0 cursor-pointer",
                  !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : "bg-white dark:bg-gray-800"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={cn(
                    "font-medium text-sm",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        <div className="p-2 border-t text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full"
          >
            عرض كل الإشعارات
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
