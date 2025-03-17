
import { supabase } from '@/integrations/supabase/client';

/**
 * الحصول على حالة بوابات الدفع للمتجر
 * @param storeId معرف المتجر
 * @returns إعدادات بوابات الدفع
 */
export const getPaymentGatewayStatus = async (storeId: string) => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('payment_gateways')
      .eq('id', storeId)
      .single();
    
    if (error) throw error;
    
    // إذا لم تكن إعدادات بوابات الدفع موجودة أو كانت عبارة عن نص، نعيد القيمة الافتراضية
    if (!data.payment_gateways || typeof data.payment_gateways === 'string') {
      return {
        myfatoorah: { enabled: false, test_mode: true },
        tap: { enabled: false, test_mode: true }
      };
    }
    
    // التأكد من نوع البيانات
    const paymentGateways = data.payment_gateways as Record<string, any>;
    
    return {
      myfatoorah: paymentGateways.myfatoorah || { enabled: false, test_mode: true },
      tap: paymentGateways.tap || { enabled: false, test_mode: true }
    };
  } catch (error) {
    console.error('خطأ في الحصول على حالة بوابات الدفع:', error);
    return {
      myfatoorah: { enabled: false, test_mode: true },
      tap: { enabled: false, test_mode: true }
    };
  }
};

/**
 * معالجة الدفع باستخدام البوابة المناسبة
 * @param storeId معرف المتجر
 * @param orderId معرف الطلب
 * @param amount المبلغ
 * @param gateway بوابة الدفع (myfatoorah أو tap)
 * @param customerData بيانات العميل
 * @returns رابط الدفع ومعرف المعاملة
 */
export const processPayment = async (
  storeId: string,
  orderId: string,
  amount: number,
  gateway: 'myfatoorah' | 'tap',
  customerData: {
    name: string;
    email: string;
    phone?: string;
  }
) => {
  try {
    // التحقق من صلاحية المبلغ
    if (amount <= 0) {
      throw new Error('المبلغ يجب أن يكون أكبر من صفر');
    }
    
    // التحقق من صلاحية بيانات العميل
    if (!customerData.name || !customerData.email) {
      throw new Error('يجب توفير اسم وبريد إلكتروني للعميل');
    }

    if (gateway === 'myfatoorah') {
      // تنفيذ تجريبي لمعالجة الدفع
      console.log('معالجة الدفع عبر MyFatoorah', { storeId, orderId, amount, customerData });
      return {
        success: true,
        transactionId: `mf-${Date.now()}`,
        paymentUrl: `https://myfatoorah.com/pay?id=${orderId}`
      };
    } else if (gateway === 'tap') {
      // تنفيذ تجريبي لمعالجة الدفع
      console.log('معالجة الدفع عبر Tap', { storeId, orderId, amount, customerData });
      return {
        success: true,
        transactionId: `tap-${Date.now()}`,
        paymentUrl: `https://tap.company/pay?id=${orderId}`
      };
    } else {
      throw new Error('بوابة دفع غير مدعومة');
    }
  } catch (error) {
    console.error('خطأ في معالجة الدفع:', error);
    return null;
  }
};

/**
 * الحصول على بوابات الدفع المفعلة للمتجر
 * @param storeId معرف المتجر
 * @returns قائمة بوابات الدفع المفعلة
 */
export const getEnabledPaymentGateways = async (storeId: string) => {
  try {
    const gatewaysStatus = await getPaymentGatewayStatus(storeId);
    if (!gatewaysStatus) return [];
    
    const enabledGateways = [];
    
    if (gatewaysStatus.myfatoorah?.enabled) {
      enabledGateways.push({
        id: 'myfatoorah',
        name: 'ماي فاتورة (MyFatoorah)',
        icon: 'https://fatoorah.net/assets/images/fatoora_logo.png',
        testMode: gatewaysStatus.myfatoorah.test_mode
      });
    }
    
    if (gatewaysStatus.tap?.enabled) {
      enabledGateways.push({
        id: 'tap',
        name: 'تاب (Tap Payments)',
        icon: 'https://tap.company/dashboard/site_assets/img/tap-logo.svg',
        testMode: gatewaysStatus.tap.test_mode
      });
    }
    
    return enabledGateways;
  } catch (error) {
    console.error('خطأ في الحصول على بوابات الدفع المفعلة:', error);
    return [];
  }
};

/**
 * التحقق من حالة الدفع
 * @param transactionId معرف المعاملة
 * @param gateway بوابة الدفع
 * @returns حالة الدفع
 */
export const checkPaymentStatus = async (transactionId: string, gateway: 'myfatoorah' | 'tap') => {
  try {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('status, payment_data, store_id')
      .eq('transaction_id', transactionId)
      .eq('gateway', gateway)
      .single();
    
    if (error) throw error;
    
    // إذا كانت الحالة "completed" أو "failed"، نعيد الحالة المخزنة
    if (data.status === 'completed' || data.status === 'failed') {
      return {
        status: data.status,
        data: data.payment_data
      };
    }
    
    // إذا كانت الحالة "pending"، نتحقق من حالة الدفع من البوابة
    // يتطلب ذلك استدعاء واجهة برمجة التطبيقات الخاصة بكل بوابة
    // هذا يتطلب تنفيذ في المرحلة التالية
    
    return {
      status: data.status,
      data: data.payment_data
    };
  } catch (error) {
    console.error('خطأ في التحقق من حالة الدفع:', error);
    return null;
  }
};

/**
 * تحديث حالة المعاملة
 * @param transactionId معرف المعاملة
 * @param status الحالة الجديدة
 * @param paymentData بيانات الدفع الإضافية
 */
export const updateTransactionStatus = async (
  transactionId: string,
  status: 'pending' | 'completed' | 'failed',
  paymentData?: any
) => {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };
    
    if (paymentData) {
      updateData.payment_data = paymentData;
    }
    
    const { error } = await supabase
      .from('payment_transactions')
      .update(updateData)
      .eq('transaction_id', transactionId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('خطأ في تحديث حالة المعاملة:', error);
    return false;
  }
};
