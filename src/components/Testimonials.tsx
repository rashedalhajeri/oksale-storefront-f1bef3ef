
import React from 'react';
import { CheckCircle } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold">أحمد م. من الرياض</p>
                <p className="text-sm text-gray-500">منذ 3 ساعات</p>
              </div>
              <div className="flex items-center text-teal-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">تم التحقق</span>
              </div>
            </div>
            <p className="text-gray-700">
              "بدأت متجري الإلكتروني باستخدام OKsale، وخلال أسبوع واحد فقط، كنت قادرًا على إنشاء متجر جميل واستقبال طلبات من العملاء. التجربة كانت أسهل بكثير مما توقعت!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
