
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
    
    // حساب الزيارات التقديرية (في تطبيق حقيقي، ستأتي من التحليلات)
    // هنا نقوم فقط بتوليد رقم بناءً على الطلبات والمنتجات
    const estimatedVisits = Math.max(orders.length * 10, productsCount * 5);
    
    return {
      productsCount: productsCount || 0,
      ordersCount: orders.length,
      revenue: totalRevenue.toFixed(2),
      visitsCount: estimatedVisits,
      currency: currency,
      orders
    };
  } catch (error) {
    console.error('Error fetching store statistics:', error);
    throw error;
  }
};
