
// Update the utils/dashboard/index.ts file to correctly export functions
import { generateSalesData } from './salesData';
import { fetchStoreStatistics } from './storeStatistics';
import { getOrderStatusStats } from './statusStats';
import { getRecentOrders } from './orders';
import { formatCurrency, formatCurrencyDisplay } from './currencyUtils';
import * as dashboardUtils from './dashboardUtils';
import * as orderFormatters from './orderFormatters';
import * as paymentUtils from './paymentUtils';
import * as statusColors from './orderStatus';

// Function to get top selling products (placeholder until properly implemented)
export const getTopSellingProducts = async (storeId: string) => {
  console.log("Getting top selling products for store:", storeId);
  // In a real implementation, this would fetch data from the database
  return [];
};

export {
  generateSalesData as getSalesData,
  fetchStoreStatistics as getStoreStatistics,
  getOrderStatusStats as getStatusStats,
  getRecentOrders,
  dashboardUtils,
  orderFormatters,
  paymentUtils,
  statusColors,
  formatCurrencyDisplay as formatCurrencyWithSettings
};

// Re-export specific utilities while avoiding naming conflicts
export * from './orderFormatters';
export * from './paymentUtils';
export * from './orderStatus';

// For dashboardUtils, selectively re-export to avoid the naming conflict
export { 
  formatNumber,
  getTimeColor,
  getOrderStatusColor,
  processMyFatoorahPayment,
  processTapPayment
} from './dashboardUtils';
