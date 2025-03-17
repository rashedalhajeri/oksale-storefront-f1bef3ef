
/**
 * تنسيق الرقم للعرض
 * @param value الرقم المراد تنسيقه
 * @returns الرقم المنسق كنص
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ar-SA').format(value);
};

/**
 * تنسيق العملة مع إعدادات محددة
 * @param amount المبلغ
 * @param currency رمز العملة
 * @returns المبلغ المنسق مع رمز العملة
 */
export const formatCurrencyWithSettings = (amount: number, currency: string = 'SAR'): string => {
  let formatter;
  
  // تحديد تنسيق العملة بناءً على رمز العملة
  switch (currency) {
    case 'USD':
      formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
      });
      break;
    case 'EUR':
      formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2
      });
      break;
    case 'KWD':
      formatter = new Intl.NumberFormat('ar-KW', {
        style: 'currency',
        currency: 'KWD',
        maximumFractionDigits: 3
      });
      break;
    case 'SAR':
    default:
      formatter = new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: currency || 'SAR',
        maximumFractionDigits: 2
      });
      break;
  }
  
  return formatter.format(amount);
};

/**
 * حساب الوقت النسبي منذ تاريخ معين
 * @param dateString تاريخ كنص
 * @returns النص النسبي بالعربية
 */
export const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'الآن';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `منذ ${minutes} دقيقة`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `منذ ${hours} ساعة`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `منذ ${days} يوم`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `منذ ${months} شهر`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `منذ ${years} سنة`;
  }
};

/**
 * الحصول على لون النص للوقت النسبي بناءً على الحالة
 * @param dateString تاريخ كنص
 * @param status حالة الطلب
 * @returns فئة CSS للون النص
 */
export const getTimeColor = (dateString: string, status: string): string => {
  if (!dateString) return 'text-gray-500';
  
  // إذا كانت الحالة مكتملة أو ملغاة، نستخدم لون رمادي دائمًا
  if (['completed', 'cancelled', 'delivered', 'refunded'].includes(status)) {
    return 'text-gray-500';
  }
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 2) {
    return 'text-green-600';
  } else if (diffInHours < 24) {
    return 'text-blue-600';
  } else if (diffInHours < 48) {
    return 'text-yellow-600';
  } else {
    return 'text-red-600';
  }
};

/**
 * إنشاء بيانات المبيعات للرسم البياني
 * @param orders قائمة الطلبات
 * @param timeframe إطار زمني (day, week, month, year)
 * @returns بيانات المبيعات المنسقة للرسم البياني
 */
export const generateSalesData = (orders: any[], timeframe: string) => {
  if (!orders || orders.length === 0) {
    return getEmptySalesData(timeframe);
  }
  
  // تصنيف الطلبات حسب التاريخ
  const salesByDate = new Map();
  const now = new Date();
  
  // تحديد تاريخ البداية بناءً على الإطار الزمني
  let startDate: Date;
  let dateFormat: Intl.DateTimeFormatOptions;
  let increment: (date: Date) => Date;
  
  switch (timeframe) {
    case 'day':
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = { hour: '2-digit' };
      increment = (date) => {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + 1);
        return newDate;
      };
      break;
    case 'week':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = { weekday: 'short' };
      increment = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      };
      break;
    case 'month':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = { day: '2-digit', month: 'short' };
      increment = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      };
      break;
    case 'year':
    default:
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 11);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = { month: 'short' };
      increment = (date) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
      };
      break;
  }
  
  // تهيئة الخريطة بجميع الفترات الزمنية
  let currentDate = new Date(startDate);
  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);
  
  while (currentDate <= endDate) {
    const dateKey = formatDateKey(currentDate, timeframe);
    salesByDate.set(dateKey, { name: dateKey, sales: 0, revenue: 0 });
    currentDate = increment(currentDate);
  }
  
  // حساب المبيعات والإيرادات لكل فترة زمنية
  orders.forEach(order => {
    const orderDate = new Date(order.created_at);
    if (orderDate >= startDate && orderDate <= endDate) {
      const dateKey = formatDateKey(orderDate, timeframe);
      if (salesByDate.has(dateKey)) {
        const data = salesByDate.get(dateKey);
        data.sales += 1;
        data.revenue += Number(order.total_amount) || 0;
        salesByDate.set(dateKey, data);
      }
    }
  });
  
  // تحويل الخريطة إلى مصفوفة للرسم البياني
  return Array.from(salesByDate.values());
};

/**
 * تنسيق مفتاح التاريخ بناءً على الإطار الزمني
 * @param date التاريخ
 * @param timeframe الإطار الزمني
 * @returns مفتاح التاريخ المنسق
 */
const formatDateKey = (date: Date, timeframe: string): string => {
  switch (timeframe) {
    case 'day':
      return `${date.getHours()}:00`;
    case 'week':
      return new Intl.DateTimeFormat('ar', { weekday: 'short' }).format(date);
    case 'month':
      return `${date.getDate()}`;
    case 'year':
      return new Intl.DateTimeFormat('ar', { month: 'short' }).format(date);
    default:
      return date.toISOString().split('T')[0];
  }
};

/**
 * إنشاء بيانات مبيعات فارغة للإطار الزمني المحدد
 * @param timeframe الإطار الزمني
 * @returns بيانات مبيعات فارغة
 */
const getEmptySalesData = (timeframe: string) => {
  switch (timeframe) {
    case 'day':
      return Array.from({ length: 24 }, (_, i) => ({
        name: `${i}:00`,
        sales: 0,
        revenue: 0
      }));
    case 'week':
      const weekdays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      return weekdays.map(day => ({
        name: day,
        sales: 0,
        revenue: 0
      }));
    case 'month':
      return Array.from({ length: 30 }, (_, i) => ({
        name: `${i + 1}`,
        sales: 0,
        revenue: 0
      }));
    case 'year':
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      return months.map(month => ({
        name: month,
        sales: 0,
        revenue: 0
      }));
    default:
      return [];
  }
};
