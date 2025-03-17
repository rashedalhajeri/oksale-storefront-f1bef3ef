
/**
 * تنسيق المبالغ المالية بناءً على العملة المحددة
 * @param amount المبلغ المالي
 * @param currency رمز العملة
 * @returns النص المنسق للمبلغ مع رمز العملة
 */
export const formatCurrency = (amount: number, currency: string = 'SAR'): string => {
  // قائمة رموز العملات وتنسيقها
  const currencyFormats: Record<string, { symbol: string, position: 'before' | 'after' }> = {
    'SAR': { symbol: 'ر.س', position: 'after' },
    'AED': { symbol: 'د.إ', position: 'after' },
    'USD': { symbol: '$', position: 'before' },
    'EUR': { symbol: '€', position: 'before' },
    'KWD': { symbol: 'د.ك', position: 'after' },
    'BHD': { symbol: 'د.ب', position: 'after' },
    'QAR': { symbol: 'ر.ق', position: 'after' },
    'OMR': { symbol: 'ر.ع', position: 'after' },
    'EGP': { symbol: 'ج.م', position: 'after' },
    'JOD': { symbol: 'د.أ', position: 'after' },
  };

  // الحصول على تنسيق العملة، استخدم الريال السعودي افتراضياً إذا لم تكن العملة معرفة
  const format = currencyFormats[currency] || currencyFormats['SAR'];
  
  // تنسيق المبلغ برقمين عشريين
  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : '0.00';
  
  // إضافة رمز العملة حسب موقعه (قبل أو بعد المبلغ)
  return format.position === 'before' 
    ? `${format.symbol}${formattedAmount}` 
    : `${formattedAmount} ${format.symbol}`;
};

/**
 * الحصول على رمز العملة
 * @param currency رمز العملة
 * @returns رمز العملة بالعربية
 */
export const getCurrencySymbol = (currency: string = 'SAR'): string => {
  const symbols: Record<string, string> = {
    'SAR': 'ر.س',
    'AED': 'د.إ',
    'USD': '$',
    'EUR': '€',
    'KWD': 'د.ك',
    'BHD': 'د.ب',
    'QAR': 'ر.ق',
    'OMR': 'ر.ع',
    'EGP': 'ج.م',
    'JOD': 'د.أ',
  };

  return symbols[currency] || 'ر.س';
};

/**
 * تنسيق المبلغ للعرض في واجهة المستخدم مع إضافة مسافات للآلاف
 * @param amount المبلغ المالي
 * @param currency رمز العملة
 * @returns النص المنسق للمبلغ مع رمز العملة ومسافات الآلاف
 */
export const formatCurrencyDisplay = (amount: number, currency: string = 'SAR'): string => {
  // تقريب المبلغ إلى رقمين عشريين
  const roundedAmount = Math.round(amount * 100) / 100;
  
  // تنسيق الرقم بإضافة فواصل للآلاف
  const formattedNumber = roundedAmount.toLocaleString('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  // إضافة رمز العملة
  const currencySymbol = getCurrencySymbol(currency);
  
  // تحديد موضع رمز العملة
  const currenciesWithSymbolBefore = ['USD', 'EUR', 'GBP'];
  
  if (currenciesWithSymbolBefore.includes(currency)) {
    return `${currencySymbol} ${formattedNumber}`;
  } else {
    return `${formattedNumber} ${currencySymbol}`;
  }
};
