
import { formatDistance, formatRelative, format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getCurrencySymbol } from './currencyUtils';

/**
 * تحويل تاريخ إلى نص يصف الوقت المنقضي بالعربية
 * بدون كلمة "تقريبًا" وبطريقة أكثر دقة
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - parsedDate.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // إذا كان الوقت أقل من 3 أيام، نعرض منذ كم ساعة أو دقيقة
    if (diffInDays < 3) {
      if (diffInMinutes < 1) {
        return 'الآن';
      } else if (diffInMinutes < 60) {
        return `منذ ${diffInMinutes} دقيقة`;
      } else if (diffInHours < 24) {
        const remainingMinutes = diffInMinutes % 60;
        if (remainingMinutes > 0) {
          return `منذ ${diffInHours} ساعة و ${remainingMinutes} دقيقة`;
        }
        return `منذ ${diffInHours} ساعة`;
      } else {
        return `منذ ${diffInDays} يوم`;
      }
    } else {
      // إذا كان أكثر من 3 أيام، نعرض التاريخ
      return format(parsedDate, 'dd/MM/yyyy', { locale: ar });
    }
  } catch (error) {
    console.error('تعذر تنسيق التاريخ:', error);
    return '';
  }
};

/**
 * تحويل تاريخ إلى نص مناسب لعرضه على الواجهة
 * بناءً على حالة الطلب
 */
export const formatOrderTime = (date: string | Date, status: string): string => {
  try {
    // لا نعرض "منذ" للطلبات المكتملة أو قيد التجهيز
    if (status === 'completed' || status === 'processing') {
      const parsedDate = typeof date === 'string' ? new Date(date) : date;
      return format(parsedDate, 'dd/MM/yyyy', { locale: ar });
    }
    
    // للطلبات الجديدة والمعلقة، نعرض الوقت النسبي
    return formatRelativeTime(date);
  } catch (error) {
    console.error('تعذر تنسيق وقت الطلب:', error);
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
 * توليد رقم تسلسلي للطلب مختصر وفريد لكل متجر
 * يبدأ بمعرف المتجر ثم رقم متسلسل
 * 
 * @param storeId معرف المتجر
 * @param date تاريخ الطلب
 * @returns رقم طلب فريد
 */
export const generateUniqueOrderNumber = (storeId: string, date: Date = new Date()): string => {
  // استخدام الحرف الأول والأخير من معرف المتجر
  const storeIdFirst = storeId.substring(0, 1).toUpperCase();
  const storeIdLast = storeId.substring(storeId.length - 1).toUpperCase();
  
  // استخدام السنة والشهر
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  // إنشاء رقم عشوائي من 3 أرقام (1000-9999)
  const randomComponent = Math.floor(1000 + Math.random() * 9000);
  
  // دمج المكونات لإنشاء رقم طلب مختصر وفريد
  return `${storeIdFirst}${year}${month}${randomComponent}${storeIdLast}`;
};

/**
 * تنسيق رقم الطلب ليظهر بشكل أصغر ومناسب
 */
export const formatOrderNumber = (orderNumber: string): string => {
  // إذا كان الرقم يحتوي على معرف طويل
  if (orderNumber.length > 10) {
    // نأخذ فقط الجزء الأخير (8 أحرف) من الرقم الطويل
    return orderNumber.substring(orderNumber.length - 8);
  }
  
  return orderNumber;
};
