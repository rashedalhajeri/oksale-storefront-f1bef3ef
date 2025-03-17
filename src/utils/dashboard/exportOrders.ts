
import { Order } from './orderTypes';
import { formatDate } from './dashboardUtils';

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
