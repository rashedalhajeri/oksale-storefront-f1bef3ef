
import { format, formatDistance, isToday, isYesterday, subDays } from 'date-fns';
import { ar } from 'date-fns/locale';
import { formatRelativeTime } from './orderStatus';

/**
 * تنسيق الرقم بإضافة فواصل الآلاف
 * @param num الرقم المراد تنسيقه
 * @returns النص المنسق
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ar-SA');
};

/**
 * تنسيق العملة مع إعدادات محددة
 * @param amount المبلغ
 * @param currency رمز العملة
 * @param locale اللغة المحلية
 * @returns النص المنسق
 */
export const formatCurrencyWithSettings = (
  amount: number, 
  currency = 'SAR', 
  locale = 'ar-SA'
): string => {
  // معالجة القيم الخاصة
  if (amount === null || amount === undefined) {
    return '0 ' + currency;
  }

  try {
    // محاولة استخدام Intl.NumberFormat إذا كان متاحًا
    if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
  } catch (error) {
    console.error('Error formatting currency:', error);
  }

  // طريقة احتياطية بسيطة
  return amount.toFixed(2) + ' ' + currency;
};

/**
 * الحصول على لون زمني بناءً على تاريخ والحالة
 * @param dateString تاريخ كنص
 * @param status حالة الطلب (اختياري)
 * @returns فئة CSS للون
 */
export const getTimeColor = (dateString: string, status?: string): string => {
  if (!dateString) return 'text-gray-500';
  
  const date = new Date(dateString);
  const now = new Date();
  
  // إذا كان الطلب مكتملًا أو ملغى، عد اللون الافتراضي
  if (status === 'completed' || status === 'cancelled') {
    return 'text-gray-500';
  }
  
  // حساب الفرق بالساعات
  const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
  
  if (diffHours < 1) {
    return 'text-red-500 font-medium'; // أقل من ساعة
  } else if (diffHours < 3) {
    return 'text-orange-500'; // أقل من 3 ساعات
  } else if (diffHours < 24) {
    return 'text-yellow-600'; // أقل من يوم
  } else if (diffHours < 48) {
    return 'text-blue-500'; // أقل من يومين
  }
  
  return 'text-gray-500'; // أكثر من ذلك
};

/**
 * الحصول على لون حالة الطلب
 * @param status حالة الطلب
 * @returns مصفوفة تحتوي على فئات CSS للخلفية والنص
 */
export const getOrderStatusColor = (status: string): [string, string] => {
  switch (status) {
    case 'completed':
      return ['bg-green-100', 'text-green-800'];
    case 'processing':
      return ['bg-blue-100', 'text-blue-800'];
    case 'pending':
      return ['bg-yellow-100', 'text-yellow-800'];
    case 'cancelled':
      return ['bg-red-100', 'text-red-800'];
    default:
      return ['bg-gray-100', 'text-gray-800'];
  }
};

/**
 * تنسيق التاريخ بتنسيق محدد
 * @param date التاريخ المراد تنسيقه
 * @param formatStr تنسيق التاريخ (اختياري)
 * @param localeObj كائن اللغة (اختياري)
 * @returns نص التاريخ المنسق
 */
export const formatDate = (
  date: Date | string,
  formatStr = 'dd/MM/yyyy',
  localeObj = ar
): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    return format(dateObj, formatStr, {
      locale: localeObj
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

/**
 * معالجة دفع My Fatoorah
 * @param amount المبلغ
 * @param currency العملة
 * @returns وعد بنتيجة الدفع
 */
export const processMyFatoorahPayment = async (amount: number, currency: string) => {
  // وظيفة وهمية لمعالجة الدفع
  return { success: true, transactionId: `mf-${Date.now()}` };
};

/**
 * معالجة دفع Tap
 * @param amount المبلغ
 * @param currency العملة
 * @returns وعد بنتيجة الدفع
 */
export const processTapPayment = async (amount: number, currency: string) => {
  // وظيفة وهمية لمعالجة الدفع
  return { success: true, transactionId: `tap-${Date.now()}` };
};

// Re-export formatRelativeTime from orderStatus for backward compatibility
export { formatRelativeTime };

