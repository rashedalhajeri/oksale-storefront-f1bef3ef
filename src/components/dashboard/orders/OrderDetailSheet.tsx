
import React from 'react';
import { 
  User,
  Package,
  MapPin,
  Calendar,
  Clock3
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Order } from '@/utils/dashboard/orderTypes';
import { formatCurrency } from '@/utils/dashboard/currencyUtils';

interface OrderDetailSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedOrder: Order | null;
  getStatusBadge: (status: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
  handleUpdateStatus: (status: string) => void;
  isMobile: boolean;
}

const OrderDetailSheet: React.FC<OrderDetailSheetProps> = ({
  isOpen,
  setIsOpen,
  selectedOrder,
  getStatusBadge,
  formatDate,
  handleUpdateStatus,
  isMobile
}) => {
  if (!selectedOrder) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className={`w-full ${isMobile ? 'max-w-full' : 'sm:max-w-md'} overflow-y-auto p-4`}>
        <SheetHeader className="text-right">
          <SheetTitle className="text-lg ltr font-bold">
            تفاصيل الطلب {selectedOrder.id}
          </SheetTitle>
          <SheetDescription>
            <div className="flex items-center gap-2 justify-end">
              <span>تاريخ الطلب:</span> 
              <span className="ltr">{formatDate(selectedOrder.created_at)}</span>
            </div>
            <div className={`flex items-center gap-1 justify-end mt-1 ${selectedOrder.timeColor || 'text-gray-500'}`}>
              <Clock3 className="h-3.5 w-3.5" />
              <span>{selectedOrder.relativeTime}</span>
            </div>
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-4">
          <div className="flex justify-start items-center mb-3">
            <div className="flex items-center gap-2">
              {getStatusBadge(selectedOrder.status)}
            </div>
          </div>

          <Separator className="my-3" />
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                <User className="h-3.5 w-3.5 text-gray-500" />
                معلومات العميل
              </h3>
              <div className="bg-gray-50 rounded-md p-2.5">
                <p className="text-xs mb-1.5"><strong>الاسم:</strong> {selectedOrder.customer}</p>
                <p className="text-xs mb-1.5"><strong>البريد:</strong> {selectedOrder.email}</p>
                {selectedOrder.phone && (
                  <p className="text-xs ltr"><strong>الهاتف:</strong> {selectedOrder.phone}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                <Package className="h-3.5 w-3.5 text-gray-500" />
                المنتجات
              </h3>
              <div className="space-y-1.5">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-md p-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-xs">{item.name}</p>
                      <p className="text-[10px] text-gray-500">الكمية: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-xs ltr">
                      {formatCurrency(item.price * item.quantity, selectedOrder.currency)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 font-bold text-sm">
                <span>الإجمالي</span>
                <span className="ltr">{formatCurrency(selectedOrder.total_amount || 0, selectedOrder.currency)}</span>
              </div>
            </div>
            
            {selectedOrder.shipping_address && (
              <div>
                <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  عنوان الشحن
                </h3>
                <div className="bg-gray-50 rounded-md p-2.5">
                  <p className="text-xs">{selectedOrder.shipping_address}</p>
                </div>
              </div>
            )}
            
            {selectedOrder.payment_method && (
              <div>
                <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  طريقة الدفع
                </h3>
                <div className="bg-gray-50 rounded-md p-2.5">
                  <p className="text-xs">{selectedOrder.payment_method}</p>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-3" />
          
          <div>
            <h3 className="font-medium mb-2 text-sm">تحديث حالة الطلب</h3>
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
              <Button 
                variant={selectedOrder.status === 'pending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleUpdateStatus('pending')}
                className="text-xs"
              >
                قيد الانتظار
              </Button>
              <Button 
                variant={selectedOrder.status === 'processing' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleUpdateStatus('processing')}
                className="text-xs"
              >
                قيد التجهيز
              </Button>
              <Button 
                variant={selectedOrder.status === 'completed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleUpdateStatus('completed')}
                className="text-xs"
              >
                مكتمل
              </Button>
              <Button 
                variant={selectedOrder.status === 'cancelled' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleUpdateStatus('cancelled')}
                className="text-xs text-red-500"
              >
                ملغي
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetailSheet;
