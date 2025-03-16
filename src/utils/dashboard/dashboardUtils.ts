import { formatDistance, formatRelative, format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getCurrencySymbol } from './currencyUtils';
import { supabase } from '@/integrations/supabase/client';

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
        return `قبل ${diffInMinutes} دقيقة`;
      } else if (diffInHours < 24) {
        const remainingMinutes = diffInMinutes % 60;
        if (remainingMinutes > 0 && remainingMinutes > 5) {
          return `قبل ${diffInHours} ساعة و ${remainingMinutes} دقيقة`;
        }
        return `قبل ${diffInHours} ساعة`;
      } else {
        return `قبل ${diffInDays} يوم`;
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
 * عرض التاريخ النسبي لجميع الطلبات مع لون مختلف حسب الحداثة
 */
export const formatOrderTime = (date: string | Date, status: string): string => {
  try {
    // عرض الوقت النسبي لجميع الطلبات بغض النظر عن حالتها
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
    case 'shipped':
      return 'تم الشحن';
    case 'delivered':
      return 'تم التسليم';
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
 * يبدأ بـ OK- ثم رقم متسلسل
 * 
 * @param storeId معرف المتجر
 * @param date تاريخ الطلب
 * @returns رقم طلب فريد
 */
export const generateUniqueOrderNumber = (storeId: string, date: Date = new Date()): string => {
  // استخدام السنة والشهر
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  // إنشاء رقم عشوائي من 4 أرقام (1000-9999)
  const randomComponent = Math.floor(1000 + Math.random() * 9000);
  
  // دمج المكونات لإنشاء رقم طلب مختصر وفريد
  return `OK-${year}${month}${randomComponent}`;
};

/**
 * تنسيق رقم الطلب ليظهر بشكل أصغر ومناسب
 */
export const formatOrderNumber = (orderNumber: string): string => {
  // إذا كان الرقم يبدأ بـ OK- نعيده كما هو
  if (orderNumber.startsWith('OK-')) {
    return orderNumber;
  }
  
  // إذا كان الرقم لا يحتوي على OK- نضيفه
  if (orderNumber.length > 6) {
    return `OK-${orderNumber.substring(orderNumber.length - 6)}`;
  }
  
  return `OK-${orderNumber}`;
};

/**
 * الحصول على لون النص للوقت بناءً على حداثة الطلب
 */
export const getTimeColor = (dateString: string, status: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
  
  // للطلبات الجديدة خلال 24 ساعة
  if (diffHours < 24 && status === 'pending') {
    return "text-indigo-600 font-medium"; // لون بارز للطلبات الجديدة
  } else if (diffHours < 48) {
    return "text-blue-500"; // لون مميز للطلبات خلال 48 ساعة
  } else if (diffHours < 72) {
    return "text-gray-600"; // لون أقل بروزاً للطلبات خلال 3 أيام
  }
  
  // اللون الافتراضي للطلبات القديمة
  return "text-gray-500";
};

/**
 * إرسال إشعار واتساب للعميل
 * 
 * @param storeId معرف المتجر
 * @param customerPhone رقم هاتف العميل
 * @param templateType نوع القالب (orderConfirmation, orderUpdate, shipping, payment)
 * @param variables المتغيرات المستخدمة في الرسالة
 */
export const sendWhatsAppNotification = async (
  storeId: string,
  customerPhone: string,
  templateType: 'orderConfirmation' | 'orderUpdate' | 'shipping' | 'payment',
  variables: Record<string, string>
): Promise<boolean> => {
  try {
    // التحقق من صلاحية رقم الهاتف
    if (!customerPhone || !customerPhone.match(/^\+[0-9]{10,15}$/)) {
      console.error('رقم هاتف العميل غير صالح:', customerPhone);
      return false;
    }

    // الحصول على إعدادات واتساب للمتجر
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('whatsapp, whatsapp_notifications_enabled, whatsapp_settings, name')
      .eq('id', storeId)
      .single();

    if (storeError || !storeData) {
      console.error('خطأ في الحصول على إعدادات المتجر:', storeError);
      return false;
    }

    // التحقق من تفعيل إشعارات واتساب
    if (!storeData.whatsapp_notifications_enabled) {
      console.log('إشعارات واتساب غير مفعلة للمتجر:', storeId);
      return false;
    }

    // التحقق من وجود رقم واتساب للمتجر
    if (!storeData.whatsapp) {
      console.error('لا يوجد رقم واتساب معرف للمتجر:', storeId);
      return false;
    }

    // الحصول على القالب ومعلومات التفعيل
    const templateSettings = storeData.whatsapp_settings?.[templateType];
    if (!templateSettings || !templateSettings.enabled) {
      console.log(`قالب ${templateType} غير مفعل للمتجر:`, storeId);
      return false;
    }

    let messageContent = templateSettings.template || '';

    // استبدال المتغيرات في القالب
    for (const [key, value] of Object.entries(variables)) {
      messageContent = messageContent.replace(new RegExp(`{${key}}`, 'g'), value);
    }

    // إضافة متغير اسم المتجر إذا لم يكن موجوداً
    if (messageContent.includes('{store_name}')) {
      messageContent = messageContent.replace(/{store_name}/g, storeData.name || '');
    }

    console.log(`جاري إرسال إشعار واتساب (${templateType}) إلى:`, customerPhone);
    console.log('محتوى الرسالة:', messageContent);

    // في الإصدار الحالي، نكتفي بتسجيل الرسالة في سجل التطبيق
    // في الإصدار النهائي، سيتم استدعاء WhatsApp Business API هنا
    
    // تسجيل الإشعار في قاعدة البيانات للتتبع
    const { error: logError } = await supabase
      .from('whatsapp_notifications_log')
      .insert({
        store_id: storeId,
        customer_phone: customerPhone,
        template_type: templateType,
        message_content: messageContent,
        status: 'queued', // في الإصدار النهائي سيتم تحديثه إلى "sent" أو "failed" بعد محاولة الإرسال
      });

    if (logError) {
      console.error('خطأ في تسجيل إشعار واتساب:', logError);
    }

    return true;
  } catch (error) {
    console.error('خطأ في إرسال إشعار واتساب:', error);
    return false;
  }
};
