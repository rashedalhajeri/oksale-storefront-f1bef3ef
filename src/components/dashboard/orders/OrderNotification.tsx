
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Bell, CheckCircle, ShoppingBag, X } from 'lucide-react';
import { formatCurrencyWithSettings } from '@/utils/dashboard/dashboardUtils';

interface OrderNotificationProps {
  order: any;
  isVisible: boolean;
  onClose: () => void;
  autoCloseTime?: number;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({
  order,
  isVisible,
  onClose,
  autoCloseTime = 15000
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, onClose, autoCloseTime]);

  const handleViewOrder = () => {
    navigate(`/dashboard/orders/${order.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden mx-4 border border-green-200 dark:border-green-900">
            <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="bg-white rounded-full p-1.5">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-white text-lg">طلب جديد!</h3>
              </div>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">العميل:</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">رقم الطلب:</span>
                  <span className="font-medium font-mono" dir="ltr">{order.id?.substring(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">المبلغ:</span>
                  <span className="font-bold text-green-600 dark:text-green-400" dir="ltr">
                    {formatCurrencyWithSettings(order.total_amount, 'SAR')}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleViewOrder}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  عرض الطلب
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors duration-200 text-sm"
                >
                  لاحقًا
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderNotification;
