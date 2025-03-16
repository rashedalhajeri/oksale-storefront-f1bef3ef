
import { useEffect } from 'react';

// Set the title of the document based on the current page
export const usePageTitle = (title: string) => {
  useEffect(() => {
    // Set the title with the store name if available
    document.title = `${title} | لوحة التحكم`;
    
    // Cleanup when component unmounts
    return () => {
      document.title = 'لوحة التحكم';
    };
  }, [title]);
};

// Format date in Arabic locale
export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Format number with locale
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

// Get status label in Arabic
export const getOrderStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'مكتمل';
    case 'processing':
      return 'قيد التجهيز';
    case 'pending':
      return 'قيد الانتظار';
    case 'cancelled':
      return 'ملغي';
    default:
      return status;
  }
};

// Get status color based on status
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'processing':
      return 'bg-blue-100 text-blue-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
