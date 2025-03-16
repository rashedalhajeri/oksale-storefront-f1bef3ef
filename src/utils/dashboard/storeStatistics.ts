
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';

// الحصول على إحصائيات المتجر بشكل أسرع
export const fetchStoreStatistics = async (storeId: string) => {
  try {
    // تنفيذ استعلامات متوازية لتسريع عملية الجلب
    const [storeResponse, productsCountResponse, ordersResponse, orderItemsResponse] = await Promise.all([
      // معلومات المتجر للحصول على العملة
      supabase.from('stores')
        .select('currency')
        .eq('id', storeId)
        .single(),
      
      // عدد المنتجات
      supabase.from('products')
        .select('*', { count: 'exact', head: true })
        .eq('store_id', storeId),
      
      // الطلبات والإيرادات
      supabase.from('orders')
        .select('id, total_amount, created_at')
        .eq('store_id', storeId),
      
      // العناصر المطلوبة لحساب المنتجات المباعة
      supabase.from('order_items')
        .select(`
          quantity,
          orders!inner(store_id)
        `)
        .eq('orders.store_id', storeId)
    ]);
    
    // التحقق من وجود أخطاء
    if (storeResponse.error) throw storeResponse.error;
    if (productsCountResponse.error) throw productsCountResponse.error;
    if (ordersResponse.error) throw ordersResponse.error;
    if (orderItemsResponse.error) throw orderItemsResponse.error;
    
    // استخراج البيانات
    const currency = storeResponse.data?.currency || 'SAR';
    const productsCount = productsCountResponse.count || 0;
    const orders = ordersResponse.data || [];
    const orderItems = orderItemsResponse.data || [];
    
    // حساب الإحصائيات
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    const soldProductsCount = orderItems.reduce((sum, item) => sum + Number(item.quantity), 0);
    
    return {
      productsCount,
      ordersCount: orders.length,
      revenue: totalRevenue.toFixed(2),
      soldProductsCount,
      currency,
      orders
    };
  } catch (error) {
    console.error('Error fetching store statistics:', error);
    throw error;
  }
};
