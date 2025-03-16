
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OrderEmptyStateProps {
  onReset: () => void;
  isMobile: boolean;
}

const OrderEmptyState: React.FC<OrderEmptyStateProps> = ({ onReset, isMobile }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-${isMobile ? '6' : '8'} px-4`}>
      <ShoppingCart className={`h-${isMobile ? '8' : '10'} w-${isMobile ? '8' : '10'} text-gray-400 mb-${isMobile ? '2' : '3'}`} />
      <h3 className={`text-${isMobile ? 'base' : 'lg'} font-medium text-gray-900 mb-1`}>لا توجد طلبات</h3>
      <p className="text-gray-500 text-center mb-3 text-xs">
        لم يتم العثور على أي طلبات مطابقة لمعايير البحث الخاصة بك.
      </p>
      <Button 
        onClick={onReset}
        size="sm"
        variant={isMobile ? "outline" : "default"}
      >
        عرض كل الطلبات
      </Button>
    </div>
  );
};

export default OrderEmptyState;
