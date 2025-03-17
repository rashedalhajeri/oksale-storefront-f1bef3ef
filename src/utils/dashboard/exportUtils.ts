
/**
 * Utility functions for exporting data
 */

/**
 * Export data to CSV
 * @param data Array of objects to export
 * @param filename Filename to use for the downloaded file
 */
export const exportToCSV = (data: Record<string, any>[], filename: string) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return false;
  }

  try {
    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content with header row
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
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
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Failed to export data:', error);
    return false;
  }
};

/**
 * Formats data for exporting orders to CSV
 * @param orders Array of orders to export
 * @param formatDate Function to format dates
 * @param getStatusText Function to get status text
 */
export const formatOrdersForExport = (
  orders: any[], 
  formatDate: (date: string) => string,
  getStatusText: (status: string) => string
) => {
  return orders.map(order => ({
    'رقم الطلب': order.id,
    'العميل': order.customer,
    'البريد الإلكتروني': order.email || '-',
    'الهاتف': order.phone || '-',
    'المبلغ': order.amount,
    'التاريخ': formatDate(order.created_at),
    'الحالة': getStatusText(order.status)
  }));
};
