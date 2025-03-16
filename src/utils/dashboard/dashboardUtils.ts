
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';

/**
 * تحويل تاريخ إلى نص يصف الوقت المنقضي بالعربية
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(parsedDate, new Date(), { addSuffix: true, locale: ar });
  } catch (error) {
    console.error('تعذر تنسيق التاريخ:', error);
    return '';
  }
};

/**
 * حساب نسبة التقدم مقارنةً بالهدف
 */
export const calculateProgress = (current: number, target: number): number => {
  if (target <= 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(Math.round(progress), 100);
};

/**
 * ترجمة حالة الطلب إلى نص عربي
 */
export const translateOrderStatus = (status: string): string => {
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

/**
 * الحصول على لون خلفية وحدود لحالة الطلب
 */
export const getOrderStatusColor = (status: string): { bg: string; text: string } => {
  switch (status) {
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-700' };
    case 'processing':
      return { bg: 'bg-blue-100', text: 'text-blue-700' };
    case 'pending':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    case 'cancelled':
      return { bg: 'bg-red-100', text: 'text-red-700' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700' };
  }
};
