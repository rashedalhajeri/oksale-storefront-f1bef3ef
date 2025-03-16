
import React from 'react';
import { Clock3, Phone, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from '@/utils/dashboard/orderTypes';
import { getOrderStatusText, getOrderStatusColors } from '@/utils/dashboard/orderStatus';

interface OrderCardProps {
  order: Order;
  onViewOrder: (order: Order) => void;
  getStatusIcon: (status: string) => React.ReactNode;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewOrder, getStatusIcon }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">قيد التجهيز</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card 
      className="border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onViewOrder(order)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <div className="bg-gray-100 p-1.5 rounded-full">
              {getStatusIcon(order.status)}
            </div>
            {getStatusBadge(order.status)}
          </div>
          <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1`}>
            <Clock3 className="h-3 w-3" />
            <span className="rtl">{order.relativeTime}</span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium truncate">{order.customer}</p>
          </div>
          <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-500">
            {order.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span className="ltr">{order.phone}</span>
              </div>
            )}
          </div>
          <h3 className="text-gray-400 text-xs ltr mt-1.5 font-medium">
            {order.id}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-oksale-700 text-sm ltr">
            {order.amount}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-xs"
          >
            عرض التفاصيل
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
