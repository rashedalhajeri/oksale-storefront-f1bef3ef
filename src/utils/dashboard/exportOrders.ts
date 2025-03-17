
import { Order } from './orderTypes';
import { formatOrdersForExport } from './exportUtils';
import { formatDate } from './dashboardUtils';
import { getOrderStatusText } from './orderStatus';

/**
 * Export orders to CSV file
 * @param orders Array of orders to export
 */
export const exportOrdersToCSV = (orders: Order[]): void => {
  try {
    if (!orders || orders.length === 0) {
      console.error('[Export] No orders to export');
      return;
    }

    // Format the orders data for export
    const formattedOrders = formatOrdersForExport(
      orders,
      (date) => formatDate(date, 'YYYY-MM-DD HH:mm'),
      getOrderStatusText
    );

    // Create CSV content with header row
    const headers = Object.keys(formattedOrders[0]);
    
    const csvContent = [
      headers.join(','),
      ...formattedOrders.map(row => headers.map(header => {
        // Make sure values with commas are wrapped in quotes
        const value = row[header] === null || row[header] === undefined ? '' : row[header];
        return `"${value.toString().replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('[Export] Orders exported successfully');
  } catch (error) {
    console.error('[Export] Failed to export orders:', error);
  }
};

/**
 * Format date for display
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export const formatTableDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
};
