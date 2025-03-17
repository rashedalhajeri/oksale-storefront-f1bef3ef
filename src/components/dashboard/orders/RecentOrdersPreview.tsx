
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Order } from '@/utils/dashboard/orderTypes';
import OrderEmptyState from './OrderEmptyState';
import { useIsMobile } from '@/hooks/use-mobile';
import { Clock3, Phone } from 'lucide-react';

// Interface for RecentOrdersPreview props
interface RecentOrdersPreviewProps {
  recentOrders: Order[];
  loading: boolean;
  currency: string;
}

// Recent orders preview component
const RecentOrdersPreview: React.FC<RecentOrdersPreviewProps> = ({ recentOrders, loading, currency }) => {
  const isMobile = useIsMobile();
  
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!recentOrders || recentOrders.length === 0) {
    return <OrderEmptyState onReset={() => {}} isMobile={isMobile} />;
  }

  return (
    <div className="space-y-4">
      {recentOrders.slice(0, 5).map((order, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${order.statusColors.bg} ${order.statusColors.text}`}>
                  {order.statusText}
                </span>
                <span className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1`}>
                  <Clock3 className="h-3 w-3" />
                  {order.relativeTime}
                </span>
              </div>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{order.customer}</p>
              
              {order.phone && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <Phone className="h-3 w-3" />
                  <span dir="ltr" className="font-mono">{order.phone}</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold font-mono text-oksale-700 dark:text-oksale-500" dir="ltr">{order.amount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(order.created_at).toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrdersPreview;
