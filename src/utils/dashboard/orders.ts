
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';

// الحصول على الطلبات الأخيرة
export const getRecentOrders = async (storeId: string, limit = 5) => {
  try {
    // أولاً، نحصل على معلومات المتجر للحصول على العملة
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('currency')
      .eq('id', storeId)
      .single();
    
    if (storeError) {
      console.error('Error fetching store data:', storeError);
      throw storeError;
    }
    
    const currency = storeData?.currency || 'SAR';
    
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
      amount: formatCurrency(order.total_amount, currency),
      status: order.status
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};
