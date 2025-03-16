
import { supabase } from '@/integrations/supabase/client';

// Get recent orders
export const getRecentOrders = async (storeId: string, limit = 5) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, customer_name, customer_email, total_amount, created_at, status')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return orders.map(order => ({
      id: order.id.substring(0, 8).toUpperCase(),
      customer: order.customer_name,
      date: new Date(order.created_at).toLocaleDateString('ar-SA'),
      amount: `${order.total_amount} ر.س`,
      status: order.status
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};
