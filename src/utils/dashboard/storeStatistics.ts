
import { supabase } from '@/integrations/supabase/client';

// Fetch store statistics
export const fetchStoreStatistics = async (storeId: string) => {
  try {
    // Fetch products count
    const { count: productsCount, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId);
    
    if (productsError) throw productsError;
    
    // Fetch orders count and revenue
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total_amount, created_at')
      .eq('store_id', storeId);
    
    if (ordersError) throw ordersError;
    
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    
    // Calculate estimated visits (in a real app, this would come from analytics)
    // Here we're just making up a number based on orders and products
    const estimatedVisits = Math.max(orders.length * 10, productsCount * 5);
    
    return {
      productsCount: productsCount || 0,
      ordersCount: orders.length,
      revenue: totalRevenue.toFixed(2),
      visitsCount: estimatedVisits,
      orders
    };
  } catch (error) {
    console.error('Error fetching store statistics:', error);
    throw error;
  }
};
