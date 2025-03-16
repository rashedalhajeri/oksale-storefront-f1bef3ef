
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';

// الحصول على إحصائيات المتجر
export const fetchStoreStatistics = async (storeId: string) => {
  try {
    // الحصول على معلومات المتجر للحصول على العملة
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
    
    // عدد المنتجات
    const { count: productsCount, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId);
    
    if (productsError) throw productsError;
    
    // عدد الطلبات والإيرادات
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total_amount, created_at')
      .eq('store_id', storeId);
    
    if (ordersError) throw ordersError;
    
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    
    // حساب عدد المنتجات المباعة
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select(`
        quantity,
        orders!inner(store_id)
      `)
      .eq('orders.store_id', storeId);
    
    if (orderItemsError) throw orderItemsError;
    
    // حساب إجمالي المنتجات المباعة
    const soldProductsCount = orderItems.reduce((sum, item) => sum + Number(item.quantity), 0);
    
    return {
      productsCount: productsCount || 0,
      ordersCount: orders.length,
      revenue: totalRevenue.toFixed(2),
      soldProductsCount: soldProductsCount,
      currency: currency,
      orders
    };
  } catch (error) {
    console.error('Error fetching store statistics:', error);
    throw error;
  }
};
