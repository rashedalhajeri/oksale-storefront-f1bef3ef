
import { OrderStatusColors, OrderStatusMapping } from './orderTypes';

// Get text representation of order status
export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار';
    case 'processing':
      return 'قيد المعالجة';
    case 'completed':
      return 'مكتمل';
    case 'cancelled':
      return 'ملغي';
    default:
      return 'قيد الانتظار';
  }
};

// Get color scheme for order status
export const getOrderStatusColors = (status: string): OrderStatusColors => {
  switch (status) {
    case 'pending':
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      };
    case 'processing':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      };
    case 'completed':
      return {
        bg: 'bg-green-50',
        text: 'text-green-800',
        icon: 'text-green-600'
      };
    case 'cancelled':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-800',
        icon: 'text-gray-600'
      };
  }
};

// Get order status mapping for all statuses
export const getOrderStatusMapping = (): OrderStatusMapping => {
  return {
    pending: {
      text: getOrderStatusText('pending'),
      colors: getOrderStatusColors('pending')
    },
    processing: {
      text: getOrderStatusText('processing'),
      colors: getOrderStatusColors('processing')
    },
    completed: {
      text: getOrderStatusText('completed'),
      colors: getOrderStatusColors('completed')
    },
    cancelled: {
      text: getOrderStatusText('cancelled'),
      colors: getOrderStatusColors('cancelled')
    }
  };
};
