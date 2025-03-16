import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from './currencyUtils';
import { 
  translateOrderStatus, 
  getOrderStatusColor, 
  formatOrderTime, 
  generateUniqueOrderNumber, 
  formatOrderNumber, 
  getTimeColor,
  sendWhatsAppNotification 
} from './dashboardUtils';

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
      currency: currency,
      created_at: order.created_at,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};

// Type definition for options parameter
export interface OrderOptions {
  page?: number;
  limit?: number;
  status?: string | null;
  search?: string | null;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// الحصول على الطلبات مع دعم الصفحات والبحث والفلترة
export const getOrders = async (storeId: string, options: OrderOptions = {}) => {
  const { 
    page = 1, 
    limit = 20, 
    status = null, 
    search = null, 
    sortBy = 'created_at', 
    sortDirection = 'desc' 
  } = options;
  
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
      .select('id, customer_name, customer_email, customer_phone, total_amount, created_at, status, count()', { count: 'exact' })
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
      created_at: order.created_at,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      total_amount: order.total_amount,
      updated_at: order.created_at,
      store_id: storeId
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

/**
 * تحديث حالة الطلب مع إرسال إشعار واتساب
 * 
 * @param orderId معرف الطلب
 * @param newStatus الحالة الجديدة للطلب
 */
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    // تحديث حالة الطلب
    const { data: order, error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select('*, store_id')
      .single();
    
    if (error) throw error;
    
    // إرسال إشعار واتساب للعميل إذا كان لديه رقم هاتف
    if (order.customer_phone) {
      // الحصول على معلومات المتجر
      const { data: storeData } = await supabase
        .from('stores')
        .select('currency, name')
        .eq('id', order.store_id)
        .single();
      
      // إرسال إشعار تحديث حالة الطلب عبر واتساب
      await sendWhatsAppNotification(
        order.store_id,
        order.customer_phone,
        'orderUpdate',
        {
          customer_name: order.customer_name,
          order_id: formatOrderNumber(order.id),
          order_status: translateOrderStatus(newStatus),
          tracking_link: `${window.location.origin}/${storeData?.name}/orders/${order.id}`,
          store_name: storeData?.name || ''
        }
      );
    }
    
    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

/**
 * إنشاء طلب جديد مع إرسال إشعار واتساب
 */
export const createOrder = async (orderData: any) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select('*')
      .single();
    
    if (error) throw error;
    
    // إرسال إشعار واتساب للعميل إذا كان لديه رقم هاتف
    if (order.customer_phone) {
      // الحصول على معلومات المتجر
      const { data: storeData } = await supabase
        .from('stores')
        .select('currency, name')
        .eq('id', order.store_id)
        .single();
      
      // إرسال إشعار تأكيد الطلب عبر واتساب
      await sendWhatsAppNotification(
        order.store_id,
        order.customer_phone,
        'orderConfirmation',
        {
          customer_name: order.customer_name,
          order_id: formatOrderNumber(order.id),
          total_amount: formatCurrency(order.total_amount, storeData?.currency || 'KWD'),
          currency: storeData?.currency || 'KWD'
        }
      );
    }
    
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
