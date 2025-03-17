
// Update the utils/dashboard/index.ts file to export getRecentOrders
// This is needed to fix the error
import { getSalesData } from './salesData';
import { getStoreStatistics } from './storeStatistics';
import { getStatusStats } from './statusStats';
import { getRecentOrders } from './orders';
import { formatCurrencyWithSettings } from './currencyUtils';
import * as dashboardUtils from './dashboardUtils';
import * as orderFormatters from './orderFormatters';
import * as paymentUtils from './paymentUtils';
import * as statusColors from './orderStatus';

export {
  getSalesData,
  getStoreStatistics,
  getStatusStats,
  getRecentOrders,
  formatCurrencyWithSettings,
  dashboardUtils,
  orderFormatters,
  paymentUtils,
  statusColors
};

// Re-export everything from these modules
export * from './dashboardUtils';
export * from './orderFormatters';
export * from './paymentUtils';
export * from './orderStatus';
