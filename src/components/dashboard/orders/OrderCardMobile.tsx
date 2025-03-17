
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
      className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden max-w-full"
      onClick={() => onViewOrder(order)}
    >
      <CardContent className="p-3 overflow-hidden">
        <div className="flex justify-between items-start overflow-hidden">
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              {getStatusBadge(order.status)}
              <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1 mr-2`}>
                <Clock3 className="h-3 w-3 flex-shrink-0" />
                <span>{order.relativeTime}</span>
              </div>
            </div>
            <p className="font-medium text-sm mb-0.5 truncate">{order.customer}</p>
            
            {order.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 overflow-hidden">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span dir="ltr" className="truncate block max-w-full">{order.phone}</span>
              </div>
            )}
            
            <h3 className="text-gray-400 text-xs mt-1 font-medium overflow-hidden">
              <span dir="ltr" className="inline-block">{order.id}</span>
            </h3>
          </div>
          <span className="font-bold text-sm text-oksale-700 whitespace-nowrap pr-1 flex-shrink-0 mr-1">
            <span dir="ltr">{order.amount}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCardMobile;
