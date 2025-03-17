
import { useState, useEffect } from 'react';

/**
 * استخدام hook التأخير (debounce) للقيم
 * @param value القيمة التي نريد تأخيرها
 * @param delay وقت التأخير بالمللي ثانية (الافتراضي 500 مللي ثانية)
 * @returns القيمة المؤخرة
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * استخدام hook التأخير (debounce) للدوال
 * @param fn الدالة التي نريد تأخيرها
 * @param delay وقت التأخير بالمللي ثانية (الافتراضي 500 مللي ثانية)
 * @returns الدالة المؤخرة
 */
export function useDebounceFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay = 500
): [(...args: Parameters<T>) => void, boolean] {
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedFn = (...args: Parameters<T>) => {
    setIsDebouncing(true);
    setTimeout(() => {
      fn(...args);
      setIsDebouncing(false);
    }, delay);
  };

  return [debouncedFn, isDebouncing];
}
