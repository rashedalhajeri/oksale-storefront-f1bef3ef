
import { supabase } from '@/integrations/supabase/client';

// Fetch store statistics
export const fetchStoreStatistics = async (storeId: string) => {
  try {
    // Fetch products count
    const { count: productsCount, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId);
    
    if (productsError) throw productsError;
    
    // Fetch orders count and revenue
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total_amount, created_at')
      .eq('store_id', storeId);
    
    if (ordersError) throw ordersError;
    
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    
    // Calculate estimated visits (in a real app, this would come from analytics)
    // Here we're just making up a number based on orders and products
    const estimatedVisits = Math.max(orders.length * 10, productsCount * 5);
    
    return {
      productsCount: productsCount || 0,
      ordersCount: orders.length,
      revenue: totalRevenue.toFixed(2),
      visitsCount: estimatedVisits,
      orders
    };
  } catch (error) {
    console.error('Error fetching store statistics:', error);
    throw error;
  }
};

// Generate sales data based on timeframe
export const generateSalesData = (orders: any[], timeframe: string) => {
  if (!orders || orders.length === 0) {
    return [];
  }
  
  const now = new Date();
  let startDate;
  let format;
  let groupBy;
  
  switch (timeframe) {
    case 'day':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      format = (date: Date) => `${date.getHours()}:00`;
      groupBy = (date: Date) => date.getHours();
      break;
    case 'week':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      format = (date: Date) => {
        const day = date.toLocaleString('ar-SA', { weekday: 'short' });
        return day;
      };
      groupBy = (date: Date) => date.getDay();
      break;
    case 'month':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
      format = (date: Date) => `أسبوع ${Math.ceil((date.getDate()) / 7)}`;
      groupBy = (date: Date) => Math.ceil((date.getDate()) / 7);
      break;
    case 'year':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 12);
      format = (date: Date) => date.toLocaleString('ar-SA', { month: 'short' });
      groupBy = (date: Date) => date.getMonth();
      break;
    default:
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      format = (date: Date) => {
        const day = date.toLocaleString('ar-SA', { weekday: 'short' });
        return day;
      };
      groupBy = (date: Date) => date.getDay();
  }

  // Filter orders by timeframe
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.created_at);
    return orderDate >= startDate;
  });

  // Group orders by time period
  const groupedOrders = filteredOrders.reduce((acc, order) => {
    const orderDate = new Date(order.created_at);
    const groupKey = groupBy(orderDate);
    
    if (!acc[groupKey]) {
      acc[groupKey] = {
        count: 0,
        revenue: 0,
        date: orderDate
      };
    }
    
    acc[groupKey].count += 1;
    acc[groupKey].revenue += Number(order.total_amount);
    
    return acc;
  }, {});

  // Fill in gaps in the data
  const result = [];
  
  if (timeframe === 'day') {
    for (let i = 0; i < 24; i++) {
      const date = new Date(now);
      date.setHours(i, 0, 0, 0);
      
      result.push({
        name: format(date),
        sales: groupedOrders[i]?.count || 0,
        revenue: groupedOrders[i]?.revenue || 0
      });
    }
  } else if (timeframe === 'week') {
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      const dayIndex = date.getDay();
      
      result.push({
        name: format(date),
        sales: groupedOrders[dayIndex]?.count || 0,
        revenue: groupedOrders[dayIndex]?.revenue || 0
      });
    }
  } else if (timeframe === 'month') {
    for (let i = 1; i <= 4; i++) {
      result.push({
        name: `أسبوع ${i}`,
        sales: groupedOrders[i]?.count || 0,
        revenue: groupedOrders[i]?.revenue || 0
      });
    }
  } else if (timeframe === 'year') {
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), i, 1);
      
      result.push({
        name: format(date),
        sales: groupedOrders[i]?.count || 0,
        revenue: groupedOrders[i]?.revenue || 0
      });
    }
  }
  
  return result;
};

// Get top selling products
export const getTopSellingProducts = async (storeId: string, limit = 5) => {
  try {
    // First get all orders for this store
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select(`
        product_id,
        quantity,
        price,
        orders!inner(store_id)
      `)
      .eq('orders.store_id', storeId);
    
    if (orderItemsError) throw orderItemsError;
    
    // Group by product and calculate sales
    const productSales = {};
    
    orderItems.forEach(item => {
      if (!productSales[item.product_id]) {
        productSales[item.product_id] = {
          productId: item.product_id,
          sales: 0,
          amount: 0
        };
      }
      
      productSales[item.product_id].sales += item.quantity;
      productSales[item.product_id].amount += (item.price * item.quantity);
    });
    
    // Convert to array and sort
    const sortedProducts = Object.values(productSales)
      .sort((a: any, b: any) => b.sales - a.sales)
      .slice(0, limit);
    
    // Fetch product details
    if (sortedProducts.length > 0) {
      const productIds = sortedProducts.map((p: any) => p.productId);
      
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name')
        .in('id', productIds);
      
      if (productsError) throw productsError;
      
      // Merge product details with sales data
      return sortedProducts.map((product: any) => {
        const productInfo = products.find(p => p.id === product.productId);
        return {
          id: product.productId,
          name: productInfo?.name || 'منتج غير معروف',
          sales: product.sales,
          amount: product.amount.toFixed(2)
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    return [];
  }
};

// Get recent orders
export const getRecentOrders = async (storeId: string, limit = 5) => {
  try {
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
      amount: `${order.total_amount} ر.س`,
      status: order.status
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};

// Get order status statistics
export const getOrderStatusStats = async (storeId: string) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('status')
      .eq('store_id', storeId);
    
    if (error) throw error;
    
    const statusCounts = {
      completed: 0,
      processing: 0,
      pending: 0,
      cancelled: 0
    };
    
    orders.forEach(order => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
      }
    });
    
    return [
      { status: 'completed', count: statusCounts.completed, label: 'مكتمل' },
      { status: 'processing', count: statusCounts.processing, label: 'قيد التجهيز' },
      { status: 'pending', count: statusCounts.pending, label: 'قيد الانتظار' },
      { status: 'cancelled', count: statusCounts.cancelled, label: 'ملغي' }
    ];
  } catch (error) {
    console.error('Error fetching order status statistics:', error);
    return [];
  }
};

// Calculate progress values for statistics
export const calculateProgress = (current: number, target: number) => {
  if (target <= 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(Math.round(progress), 100);
};
