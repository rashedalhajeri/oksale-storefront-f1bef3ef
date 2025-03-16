
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
