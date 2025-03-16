
import { supabase } from '@/integrations/supabase/client';

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
