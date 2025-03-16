import { supabase } from '@/integrations/supabase/client';
import { OrderOptions, PaginationState } from './orderTypes';
import { formatOrders } from './orderFormatters';

// Get orders with pagination and filtering
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

    const pagination: PaginationState = {
      total: totalItems,
      page,
      limit,
      totalPages
    };

    return {
      orders: orders || [],
      pagination
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get order details including items
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

// Get recent orders - Modified to directly return formatted orders array
export const getRecentOrders = async (storeId: string, limit = 5) => {
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
    
    // Format and return the orders directly as an array
    return formatOrders(orders || [], currency);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return []; // Return empty array on error
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
