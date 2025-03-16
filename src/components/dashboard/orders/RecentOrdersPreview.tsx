
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Order } from '@/utils/dashboard/orderTypes';
import OrderEmptyState from './OrderEmptyState';
import { useIsMobile } from '@/hooks/use-mobile';

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
        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">#{order.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-bold" dir="ltr">{order.amount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrdersPreview;
