
// Export all dashboard utilities from here
export * from './storeStatistics';
// Use the specific export from salesData
export { fillDataGaps, generateEmptyData, generateSalesData } from './salesData';
export * from './products';
// Explicitly export from orders except for formatRelativeTime to avoid conflict
export {
  formatOrderId,
  formatOrders,
  getCachedFormattedOrders,
  // Do not export formatRelativeTime from here as it will conflict
} from './orderFormatters';
export * from './statusStats';
// We're removing the direct export from progress.ts since it's duplicated in dashboardUtils.ts
// export * from './progress';
export * from './currencyUtils';
export * from './dashboardUtils';
// Explicitly import and re-export from orderStatus to avoid conflict
export {
  getOrderStatusText,
  getOrderStatusColors,
  isOrderStatusComplete,
  isOrderStatusActive,
  isOrderStatusCancelled,
  // The formatRelativeTime is also in dashboardUtils, so we need to be explicit
  formatRelativeTime as orderStatusFormatRelativeTime
} from './orderStatus';
export * from './paymentUtils';
