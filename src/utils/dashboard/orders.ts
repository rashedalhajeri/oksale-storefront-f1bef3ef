
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';
import { translateOrderStatus, getOrderStatusColor, formatOrderTime, generateUniqueOrderNumber, formatOrderNumber, getTimeColor } from './dashboardUtils';

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
      .select('id, customer_name, customer_email, customer_phone, total_amount, created_at, status')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return orders.map(order => ({
      id: formatOrderNumber(order.id),
      rawId: order.id,
      customer: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone || 'غير متوفر',
      date: new Date(order.created_at).toLocaleDateString('ar-SA'),
      relativeTime: formatOrderTime(order.created_at, order.status),
      timeColor: getTimeColor(order.created_at, order.status),
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

// الحصول على الطلبات مع دعم الصفحات والبحث والفلترة
export const getOrders = async (storeId: string, options = {}) => {
  const { page = 1, limit = 20, status = null, search = null, sortBy = 'created_at', sortDirection = 'desc' } = options;
  
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
    
    // بداية بناء الاستعلام
    let query = supabase
      .from('orders')
      .select('id, customer_name, customer_email, customer_phone, total_amount, created_at, status, count(*)::int', { count: 'exact' })
      .eq('store_id', storeId);
    
    // إضافة فلتر الحالة إذا تم تحديده
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    // إضافة البحث إذا تم تحديده
    if (search) {
      query = query.or(`customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,customer_phone.ilike.%${search}%,id.ilike.%${search}%`);
    }
    
    // حساب التخطي للصفحات
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // إضافة الترتيب والحدود
    const { data, error, count } = await query
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(from, to);
    
    if (error) throw error;
    
    // تحويل البيانات إلى التنسيق المطلوب
    const formattedOrders = data.map(order => ({
      id: formatOrderNumber(order.id),
      rawId: order.id,
      customer: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone || 'غير متوفر',
      date: new Date(order.created_at).toLocaleDateString('ar-SA'),
      relativeTime: formatOrderTime(order.created_at, order.status),
      timeColor: getTimeColor(order.created_at, order.status),
      amount: formatCurrency(order.total_amount, currency),
      rawAmount: order.total_amount,
      status: order.status,
      statusText: translateOrderStatus(order.status),
      statusColors: getOrderStatusColor(order.status),
      currency: currency,
      created_at: order.created_at
    }));
    
    // إرجاع البيانات مع معلومات الصفحات
    return {
      orders: formattedOrders,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      orders: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0
      }
    };
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
      relativeTime: formatOrderTime(order.created_at, order.status),
      timeColor: getTimeColor(order.created_at, order.status)
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};
