
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

/**
 * إنشاء رقم طلب فريد للمتجر
 * @param storeId معرف المتجر
 * @param date تاريخ الطلب
 * @returns رقم طلب فريد
 */
export const generateUniqueOrderNumber = (storeId: string, date: Date = new Date()): string => {
  // استخدام الأحرف الأولى من معرف المتجر
  const storePrefix = storeId.substring(0, 3).toUpperCase();
  
  // استخدام التاريخ (السنة/الشهر/اليوم)
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateComponent = `${year}${month}${day}`;
  
  // إنشاء رقم عشوائي من 4 أرقام
  const randomComponent = Math.floor(1000 + Math.random() * 9000);
  
  // دمج المكونات
  return `${storePrefix}-${dateComponent}-${randomComponent}`;
};

/**
 * تنسيق رقم الطلب ليظهر بشكل مناسب
 * @param orderNumber رقم الطلب الكامل
 * @returns رقم الطلب المنسق
 */
export const formatOrderNumber = (orderNumber: string): string => {
  // إذا كان الرقم بالتنسيق الجديد
  if (orderNumber.includes('-')) {
    return orderNumber;
  }
  
  // للأرقام القديمة، نعرض الجزء المختصر فقط
  return orderNumber.substring(0, 8).toUpperCase();
};

