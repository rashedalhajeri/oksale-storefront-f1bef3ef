
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
  const formattedAmount = amount.toFixed(2);
  
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
