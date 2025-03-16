
import { Order } from './orderTypes';
import { formatCurrencyWithSettings } from './dashboardUtils';
import { getOrderStatusText, getOrderStatusColors } from './orderStatus';

// Format orders for display
export const formatOrders = (orders: any[], currency: string): Order[] => {
  if (!orders) return [];

  return orders.map(order => {
    const statusColors = getOrderStatusColors(order.status);
    const statusText = getOrderStatusText(order.status);
    
    return {
      id: order.id,
      customer: order.customer_name || 'عميل',
      amount: formatCurrencyWithSettings(Number(order.total_amount), currency),
      created_at: order.created_at,
      status: order.status,
      statusText,
      statusColors,
      relativeTime: '',  // Will be filled by the component
      timeColor: '',     // Will be filled by the component
      rawAmount: Number(order.total_amount),
      currency
    };
  });
};
