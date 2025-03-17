
/**
 * الحصول على نص حالة الطلب بالعربية
 * @param status حالة الطلب
 * @returns نص حالة الطلب بالعربية
 */
export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'مكتمل';
    case 'processing':
      return 'قيد التجهيز';
    case 'pending':
      return 'قيد الانتظار';
    case 'cancelled':
      return 'ملغي';
    case 'shipped':
      return 'تم الشحن';
    case 'delivered':
      return 'تم التسليم';
    case 'refunded':
      return 'مسترجع';
    default:
      return status;
  }
};

/**
 * الحصول على ألوان حالة الطلب
 * @param status حالة الطلب
 * @returns ألوان CSS للخلفية والنص والأيقونة
 */
export const getOrderStatusColors = (status: string) => {
  switch (status) {
    case 'completed':
      return { 
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: 'text-green-600'
      };
    case 'processing':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-600'
      };
    case 'pending':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      };
    case 'cancelled':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: 'text-red-600'
      };
    case 'shipped':
      return {
        bg: 'bg-indigo-100',
        text: 'text-indigo-800',
        icon: 'text-indigo-600'
      };
    case 'delivered':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        icon: 'text-emerald-600'
      };
    case 'refunded':
      return {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: 'text-orange-600'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: 'text-gray-600'
      };
  }
};

/**
 * التحقق مما إذا كانت حالة الطلب تعتبر "مكتملة"
 * @param status حالة الطلب
 * @returns true إذا كانت الحالة تعتبر مكتملة
 */
export const isOrderStatusComplete = (status: string): boolean => {
  return ['completed', 'delivered'].includes(status);
};

/**
 * التحقق مما إذا كانت حالة الطلب تعتبر "نشطة"
 * @param status حالة الطلب
 * @returns true إذا كانت الحالة تعتبر نشطة
 */
export const isOrderStatusActive = (status: string): boolean => {
  return ['processing', 'pending', 'shipped'].includes(status);
};

/**
 * التحقق مما إذا كانت حالة الطلب تعتبر "ملغاة"
 * @param status حالة الطلب
 * @returns true إذا كانت الحالة تعتبر ملغاة أو مرتجعة
 */
export const isOrderStatusCancelled = (status: string): boolean => {
  return ['cancelled', 'refunded'].includes(status);
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
