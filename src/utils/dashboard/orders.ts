
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';
import { translateOrderStatus, getOrderStatusColor, formatRelativeTime, generateUniqueOrderNumber, formatOrderNumber } from './dashboardUtils';

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
      id: formatOrderNumber(order.id),
      customer: order.customer_name,
      date: new Date(order.created_at).toLocaleDateString('ar-SA'),
      relativeTime: formatRelativeTime(order.created_at),
      amount: formatCurrency(order.total_amount, currency),
      rawAmount: order.total_amount,
      status: order.status,
      statusText: translateOrderStatus(order.status),
      statusColors: getOrderStatusColor(order.status),
      currency: currency
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};

// الحصول على تفاصيل أكثر للطلبات
export const getOrderDetails = async (orderId: string) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();
    
    if (error) throw error;
    
    // الحصول على معلومات المتجر للحصول على العملة
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('currency')
      .eq('id', order.store_id)
      .single();
      
    if (storeError) throw storeError;
    
    const currency = storeData?.currency || 'SAR';
    
    // إضافة معلومات العملة إلى البيانات المُرجعة
    return {
      ...order,
      currency,
      formattedAmount: formatCurrency(order.total_amount, currency),
      relativeTime: formatRelativeTime(order.created_at)
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};

