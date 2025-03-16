
import { supabase } from '@/integrations/supabase/client';

// Get order status statistics
export const getOrderStatusStats = async (storeId: string) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('status')
      .eq('store_id', storeId);
    
    if (error) throw error;
    
    const statusCounts = {
      completed: 0,
      processing: 0,
      pending: 0,
      cancelled: 0
    };
    
    orders.forEach(order => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      }
    });
    
    return [
      { status: 'completed', count: statusCounts.completed, label: 'مكتمل' },
      { status: 'processing', count: statusCounts.processing, label: 'قيد التجهيز' },
      { status: 'pending', count: statusCounts.pending, label: 'قيد الانتظار' },
      { status: 'cancelled', count: statusCounts.cancelled, label: 'ملغي' }
    ];
  } catch (error) {
    console.error('Error fetching order status statistics:', error);
    return [];
  }
};
