
import { Order } from './orderTypes';

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

/**
 * Export orders to CSV format
 * @param orders List of orders to export
 * @param currency Currency symbol
 * @returns CSV content as a string
 */
export const exportOrdersToCSV = (orders: Order[], currency: string) => {
  const headers = [
    'رقم الطلب',
    'العميل',
    'البريد الإلكتروني',
    'الهاتف',
    'المبلغ',
    'التاريخ',
    'الحالة'
  ];

  const rows = orders.map(order => [
    order.id,
    order.customer_name || order.customer,
    order.customer_email || order.email || '-',
    order.customer_phone || order.phone || '-',
    `${order.total_amount || order.rawAmount} ${currency}`,
    formatTableDate(order.created_at),
    order.statusText || order.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  return csvContent;
};
