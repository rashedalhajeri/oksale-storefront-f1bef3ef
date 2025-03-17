
import { Order } from './orderTypes';
import { formatCurrencyWithSettings } from './dashboardUtils';
import { getOrderStatusText, getOrderStatusColors, formatRelativeTime } from './orderStatus';
import { getTimeColor } from './dashboardUtils';

// Format order ID to a shorter, more readable format with OK- prefix
export const formatOrderId = (orderId: string, storeId?: string): string => {
  // If it already starts with OK-, return as is
  if (orderId.startsWith('OK-')) {
    return orderId;
  }
  
  // Generate a unique hash based on storeId to ensure different stores have different order formats
  let storePrefix = '';
  if (storeId) {
    // Take first 2 characters of the storeId to make it unique per store
    storePrefix = storeId.substring(0, 2);
  }
  
  // Take the last 4 characters of the order ID for a more compact display
  const shortId = orderId.substring(Math.max(0, orderId.length - 4));
  
  // Return formatted ID with OK- prefix in lowercase to match the example
  return `ok-${storePrefix}${shortId}`;
};

// Format orders for display with better memoization support
export const formatOrders = (orders: any[], currency: string): Order[] => {
  if (!orders || orders.length === 0) return [];

  return orders.map(order => {
    const statusColors = getOrderStatusColors(order.status);
    const statusText = getOrderStatusText(order.status);
    const relativeTime = formatRelativeTime(order.created_at);
    const timeColor = getTimeColor(order.created_at, order.status);
    
    return {
      id: formatOrderId(order.id, order.store_id),
      rawId: order.id, // Store original ID for database operations
      customer: order.customer_name || 'عميل',
      amount: formatCurrencyWithSettings(Number(order.total_amount), currency),
      created_at: order.created_at,
      status: order.status,
      statusText,
      statusColors,
      relativeTime,
      timeColor,
      rawAmount: Number(order.total_amount),
      currency,
      email: order.customer_email,
      phone: order.customer_phone
    };
  });
};

// Add a cache to reduce redundant calculations
const orderFormatCache = new Map();

// Cached version of formatOrders for performance optimization
export const getCachedFormattedOrders = (orders: any[], currency: string): Order[] => {
  // Create a cache key based on order IDs and update timestamps
  const cacheKey = orders.map(o => `${o.id}-${o.updated_at || o.created_at}`).join('|') + currency;
  
  if (orderFormatCache.has(cacheKey)) {
    return orderFormatCache.get(cacheKey);
  }
  
  const formattedOrders = formatOrders(orders, currency);
  orderFormatCache.set(cacheKey, formattedOrders);
  
  // Keep cache size manageable
  if (orderFormatCache.size > 50) {
    const firstKey = orderFormatCache.keys().next().value;
    orderFormatCache.delete(firstKey);
  }
  
  return formattedOrders;
};
