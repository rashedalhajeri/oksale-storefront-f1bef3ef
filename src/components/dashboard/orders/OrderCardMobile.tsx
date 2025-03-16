
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock3, Phone } from 'lucide-react';
import { Order } from '@/utils/dashboard/orderTypes';

interface OrderCardMobileProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

const OrderCardMobile: React.FC<OrderCardMobileProps> = ({ order, onViewOrder, getStatusBadge }) => {
  return (
    <Card 
      className="border-none shadow-sm"
      onClick={() => onViewOrder(order)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              {getStatusBadge(order.status)}
              <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1 mr-2`}>
                <Clock3 className="h-3 w-3" />
                <span className="rtl">{order.relativeTime}</span>
              </div>
            </div>
            <p className="font-medium text-sm mb-0.5">{order.customer}</p>
            
            {order.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Phone className="h-3 w-3" />
                <span className="ltr">{order.phone}</span>
              </div>
            )}
            
            <h3 className="text-gray-400 text-xs mt-1 ltr font-medium">
              {order.id}
            </h3>
          </div>
          <span className="font-bold text-sm text-oksale-700 ltr">
            {order.amount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCardMobile;
