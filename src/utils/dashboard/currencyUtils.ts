
/**
 * تنسيق المبالغ المالية بناءً على العملة المحددة
 * @param amount المبلغ المالي
 * @param currency رمز العملة
 * @returns النص المنسق للمبلغ مع رمز العملة
 */
export const formatCurrency = (amount: number, currency: string = 'KWD'): string => {
  // قائمة رموز العملات وتنسيقها
  const currencyFormats: Record<string, { symbol: string, position: 'before' | 'after' }> = {
    'KWD': { symbol: 'د.ك', position: 'after' },
    'SAR': { symbol: 'ر.س', position: 'after' },
    'AED': { symbol: 'د.إ', position: 'after' },
    'USD': { symbol: '$', position: 'before' },
    'EUR': { symbol: '€', position: 'before' },
    'BHD': { symbol: 'د.ب', position: 'after' },
    'QAR': { symbol: 'ر.ق', position: 'after' },
    'OMR': { symbol: 'ر.ع', position: 'after' },
    'EGP': { symbol: 'ج.م', position: 'after' },
    'JOD': { symbol: 'د.أ', position: 'after' },
  };

  // الحصول على تنسيق العملة، استخدم الدينار الكويتي افتراضياً إذا لم تكن العملة معرفة
  const format = currencyFormats[currency] || currencyFormats['KWD'];
  
  // تنسيق المبلغ برقمين عشريين
  const formattedAmount = typeof amount === 'number' ? amount.toFixed(3) : '0.000';
  
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
export const getCurrencySymbol = (currency: string = 'KWD'): string => {
  const symbols: Record<string, string> = {
    'KWD': 'د.ك',
    'SAR': 'ر.س',
    'AED': 'د.إ',
    'USD': '$',
    'EUR': '€',
    'BHD': 'د.ب',
    'QAR': 'ر.ق',
    'OMR': 'ر.ع',
    'EGP': 'ج.م',
    'JOD': 'د.أ',
  };

  return symbols[currency] || 'د.ك';
};

/**
 * تنسيق المبلغ للعرض في واجهة المستخدم مع إضافة مسافات للآلاف
 * @param amount المبلغ المالي
 * @param currency رمز العملة
 * @returns النص المنسق للمبلغ مع رمز العملة ومسافات الآلاف
 */
export const formatCurrencyDisplay = (amount: number, currency: string = 'KWD'): string => {
  // تقريب المبلغ إلى ثلاثة أرقام عشرية (للدينار الكويتي)
  const decimalPlaces = currency === 'KWD' || currency === 'BHD' ? 3 : 2;
  const roundedAmount = Math.round(amount * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
  
  // تنسيق الرقم بإضافة فواصل للآلاف
  const formattedNumber = roundedAmount.toLocaleString('ar-KW', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
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
