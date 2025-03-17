
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getOrderStatusText } from '@/utils/dashboard/orderStatus';

interface OrderStatusConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  status: string;
  orderId: string;
}

const OrderStatusConfirmDialog: React.FC<OrderStatusConfirmDialogProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  status,
  orderId
}) => {
  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد تغيير حالة الطلب</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من تغيير حالة الطلب <span className="font-bold">{orderId}</span> إلى{" "}
            <span className="font-bold">{getOrderStatusText(status)}</span>؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>تأكيد</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderStatusConfirmDialog;
