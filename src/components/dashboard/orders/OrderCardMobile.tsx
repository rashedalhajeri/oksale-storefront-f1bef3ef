
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock3, Phone, Package } from 'lucide-react';
import { Order } from '@/utils/dashboard/orderTypes';

interface OrderCardMobileProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

const OrderCardMobile: React.FC<OrderCardMobileProps> = ({ order, onViewOrder, getStatusBadge }) => {
  return (
    <Card 
      className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      onClick={() => onViewOrder(order)}
      style={{ 
        borderRadius: '12px',
        backgroundColor: '#ffffff'
      }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {getStatusBadge(order.status)}
              <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1`}>
                <Clock3 className="h-3 w-3 flex-shrink-0" />
                <span className="truncate max-w-[120px]">{order.relativeTime}</span>
              </div>
            </div>
            <p className="font-medium text-sm mb-1 truncate">{order.customer}</p>
            
            {order.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1.5">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span dir="ltr" className="truncate max-w-[120px] inline-block">{order.phone}</span>
              </div>
            )}
            
            <h3 className="text-gray-400 text-xs mt-2 font-medium flex items-center gap-1">
              <Package className="h-3 w-3 flex-shrink-0 text-gray-400" />
              <span dir="ltr" className="inline-block truncate max-w-[150px]">{order.id}</span>
            </h3>
          </div>
          <span className="font-bold text-sm text-oksale-700 whitespace-nowrap pr-1 rtl:ml-0 rtl:mr-2" dir="ltr">
            {order.amount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCardMobile;
