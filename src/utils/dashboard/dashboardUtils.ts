
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getCurrencySymbol } from './currencyUtils';

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
export const getOrderStatusColor = (status: string): { bg: string; text: string; icon: string } => {
  switch (status) {
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-700', icon: 'text-green-500' };
    case 'processing':
      return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-500' };
    case 'pending':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'text-yellow-500' };
    case 'cancelled':
      return { bg: 'bg-red-100', text: 'text-red-700', icon: 'text-red-500' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'text-gray-500' };
  }
};

/**
 * تنسيق رقم بإضافة الفواصل للآلاف
 */
export const formatNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * تنسيق العملة من الإعدادات
 */
export const formatCurrencyWithSettings = (amount: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  const formattedAmount = formatNumber(Math.round(amount * 100) / 100);
  
  // تحديد موضع رمز العملة حسب العملة
  const currenciesWithSymbolBefore = ['USD', 'EUR', 'GBP'];
  
  if (currenciesWithSymbolBefore.includes(currency)) {
    return `${symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount} ${symbol}`;
  }
};
