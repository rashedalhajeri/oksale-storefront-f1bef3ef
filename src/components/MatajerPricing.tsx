
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MatajerPricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">باقات متاجر</h2>
            <div className="w-24 h-1 bg-matajer-600 mx-auto mb-6"></div>
          </motion.div>
        </div>
        
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-sm flex items-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${!isYearly ? 'bg-matajer-600 text-white' : 'text-gray-600'}`}
              onClick={() => setIsYearly(false)}
            >
              شهري
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium ${isYearly ? 'bg-matajer-600 text-white' : 'text-gray-600'}`}
              onClick={() => setIsYearly(true)}
            >
              سنوي
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-900">البداية</h3>
              <div className="text-3xl font-bold mb-2">مجاناً</div>
              <p className="text-gray-500 text-sm mb-6">جرّبها علينا</p>
              
              <div className="space-y-3 text-right mb-8">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">المتجر يعمل على الويب</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">متجر إلكتروني متكامل، برمجتك</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">عدد العملاء و الطلبات لا محدود</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">الدفع عند الاستلام أو الحوالة البنكية</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">عدد المنتجات 50</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
              
              <Link to="/signup">
                <Button variant="outline" className="w-full">ابدأ مجاناً</Button>
              </Link>
              
              <div className="mt-4">
                <Link to="/pricing/free" className="text-sm text-matajer-600 hover:text-matajer-700 inline-flex items-center justify-center">
                  المزيد من المميزات
                  <ArrowLeft className="mr-1 w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-matajer-600 rounded-2xl shadow-lg relative transform md:scale-105 z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-matajer-400 to-matajer-700"></div>
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-6 text-white">المتقدمة</h3>
              <div className="text-3xl font-bold mb-2 text-white">
                {isYearly ? '49 دولار' : '79 دولار'}
                <span className="text-sm font-normal text-white/80">/ شهرياً</span>
              </div>
              <p className="text-white/80 text-sm mb-6">جميع مميزات باقة البداية</p>
              
              <div className="space-y-3 text-right mb-8">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-white">الحصول على التحديثات المتجر بشكل مجاني</span>
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-white">الربط بالدفع الإلكتروني (مدى، فيزا، ماستر)</span>
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-white">خاصية ضريبة القيمة المضافة</span>
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-white">الربط مع شركات الشحن</span>
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <Link to="/signup-premium">
                <Button className="w-full bg-white text-matajer-600 hover:bg-white/90">ابدأ الآن</Button>
              </Link>
              
              <div className="mt-4">
                <Link to="/pricing/premium" className="text-sm text-white hover:text-white/80 inline-flex items-center justify-center">
                  المزيد من المميزات
                  <ArrowLeft className="mr-1 w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-6 text-gray-900">الإحترافية</h3>
              <div className="text-3xl font-bold mb-2">
                {isYearly ? '1199 دولار' : '1699 دولار'}
                <span className="text-sm font-normal text-gray-500">/ سنوياً</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">ما يقارب 99 دولار شهرياً</p>
              
              <div className="space-y-3 text-right mb-8">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">جميع مميزات الباقة المتقدمة</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">تطبيقات جوال Native (أندرويد و iOS) لمتجرك</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">تجهيز للمتجر الإلكتروني قبل الإطلاق</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">إنشاء حسابات لفريق العمل بعدد 10</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-600">عدد المنتجات لا محدود</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
              
              <Link to="/signup-pro">
                <Button variant="outline" className="w-full">ابدأ الآن</Button>
              </Link>
              
              <div className="mt-4">
                <Link to="/pricing/pro" className="text-sm text-matajer-600 hover:text-matajer-700 inline-flex items-center justify-center">
                  المزيد من المميزات
                  <ArrowLeft className="mr-1 w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MatajerPricing;
