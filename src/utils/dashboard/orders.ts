
import { supabase } from '@/integrations/supabase/client';
import { formatCurrencyWithSettings } from './dashboardUtils';

// Interface for order filter options
export interface OrderOptions {
  page?: number;
  limit?: number;
  status?: string | null;
  search?: string | null;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Modified to handle options parameter and proper pagination
export const getOrders = async (storeId: string, options: OrderOptions = {}) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = null,
      search = null,
      sortBy = 'created_at',
      sortDirection = 'desc'
    } = options;

    // Start with the base query
    let query = supabase
      .from('orders')
      .select('id, customer_name, customer_email, customer_phone, total_amount, created_at, status')
      .eq('store_id', storeId);

    // Add filters if provided
    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,id.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });

    // Apply pagination
    query = query.range((page - 1) * limit, page * limit - 1);

    // Execute the query
    const { data: orders, error } = await query;

    if (error) throw error;

    // Get total count with a separate request
    let countQuery = supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('store_id', storeId);

    // Apply the same filters to the count query
    if (status) {
      countQuery = countQuery.eq('status', status);
    }

    if (search) {
      countQuery = countQuery.or(`customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,id.ilike.%${search}%`);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error("Error fetching order count:", countError);
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      orders: orders || [],
      pagination: {
        total: totalItems,
        page,
        limit,
        totalPages
      }
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Add the getOrderDetails function
export const getOrderDetails = async (orderId: string) => {
  try {
    // Get order details
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('id', orderId)
      .single();

    if (error) throw error;

    return order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// Format orders for display
export const formatOrders = (orders, currency) => {
  if (!orders) return [];

  return orders.map(order => {
    const statusColors = getOrderStatusColors(order.status);
    const statusText = getOrderStatusText(order.status);
    
    return {
      id: order.id,
      customer: order.customer_name || 'عميل',
      amount: formatCurrencyWithSettings(Number(order.total_amount), currency),
      created_at: order.created_at,
      status: order.status,
      statusText,
      statusColors
    };
  });
};

// Get text representation of order status
const getOrderStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار';
    case 'processing':
      return 'قيد المعالجة';
    case 'completed':
      return 'مكتمل';
    case 'cancelled':
      return 'ملغي';
    default:
      return 'قيد الانتظار';
  }
};

// Get color scheme for order status
const getOrderStatusColors = (status) => {
  switch (status) {
    case 'pending':
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      };
    case 'processing':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      };
    case 'completed':
      return {
        bg: 'bg-green-50',
        text: 'text-green-800',
        icon: 'text-green-600'
      };
    case 'cancelled':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-800',
        icon: 'text-gray-600'
      };
  }
};

// Get recent orders
export const getRecentOrders = async (storeId, limit = 5) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, customer_name, total_amount, created_at, status')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Get store currency
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('currency')
      .eq('id', storeId)
      .single();

    if (storeError) {
      console.error("Error fetching store currency:", storeError);
    }

    const currency = store?.currency || 'SAR';
    
    return formatOrders(orders, currency);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};

// Add mock orders generation for the front-end 
export const generateMockOrders = (storeId: string) => {
  const statuses = ['pending', 'processing', 'completed', 'cancelled'];
  const mockOrders = [];
  
  for (let i = 1; i <= 5; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
    
    const order = {
      id: `order-${storeId.slice(0, 4)}-${i}`,
      rawId: `order-${storeId.slice(0, 4)}-${i}`,
      customer: `عميل ${i}`,
      email: `customer${i}@example.com`,
      phone: `+9665${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: createdAt.toISOString(),
      relativeTime: '1 day ago',
      timeColor: 'text-gray-500',
      amount: `${(Math.random() * 1000).toFixed(2)} ر.س`,
      rawAmount: Number((Math.random() * 1000).toFixed(2)),
      status,
      statusText: getOrderStatusText(status),
      statusColors: getOrderStatusColors(status),
      currency: 'SAR',
      created_at: createdAt.toISOString(),
      store_id: storeId,
      total_amount: Number((Math.random() * 1000).toFixed(2)),
      customer_name: `عميل ${i}`,
      customer_email: `customer${i}@example.com`,
      customer_phone: `+9665${Math.floor(10000000 + Math.random() * 90000000)}`,
      items: [
        {
          id: `item-${i}-1`,
          name: `منتج ${i}-1`,
          quantity: Math.floor(1 + Math.random() * 3),
          price: Number((Math.random() * 100).toFixed(2))
        },
        {
          id: `item-${i}-2`,
          name: `منتج ${i}-2`,
          quantity: Math.floor(1 + Math.random() * 2),
          price: Number((Math.random() * 200).toFixed(2))
        }
      ],
      payment_method: Math.random() > 0.5 ? 'الدفع عند الاستلام' : 'بطاقة ائتمان',
      shipping_address: `عنوان ${i}، المدينة، المنطقة`
    };
    
    mockOrders.push(order);
  }
  
  return mockOrders;
};
