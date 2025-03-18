
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, ShoppingBag, PackageCheck, 
  Smartphone, Globe, BarChart3
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="mb-4 text-matajer-600">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

const MatajerFeatures = () => {
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">ما يميز متاجر</h2>
            <div className="w-24 h-1 bg-matajer-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">منصة متكاملة تجمع كل ما تحتاجه لبناء متجر إلكتروني ناجح</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rtl">
          <FeatureCard 
            icon={<CreditCard className="w-10 h-10" />}
            title="الدفع"
            description="وفر لعملائك خيارات متعددة للشراء من متجرك و قبلها بكل سهولة (مدى، Apple Pay، فيزا، ماستركارد)"
            delay={0}
          />
          
          <FeatureCard 
            icon={<ShoppingBag className="w-10 h-10" />}
            title="إدارة المتجر"
            description="واجهة سهلة الاستخدام لإدارة منتجاتك، طلباتك، وعملائك بكفاءة عالية"
            delay={1}
          />
          
          <FeatureCard 
            icon={<PackageCheck className="w-10 h-10" />}
            title="الشحن والتوصيل"
            description="خيارات متعددة للشحن والتوصيل مع إمكانية التكامل مع شركات الشحن المعروفة"
            delay={2}
          />
          
          <FeatureCard 
            icon={<Smartphone className="w-10 h-10" />}
            title="تطبيق الجوال"
            description="امتلك تطبيق خاص لمتجرك على أنظمة iOS و Android بتصميم احترافي وتجربة مميزة"
            delay={3}
          />
          
          <FeatureCard 
            icon={<Globe className="w-10 h-10" />}
            title="تصميم احترافي"
            description="تصميم المتجر و الهوية البصرية و الألوان و كل ما يتعلق بتصميم إعلاناتك"
            delay={4}
          />
          
          <FeatureCard 
            icon={<BarChart3 className="w-10 h-10" />}
            title="التسويق"
            description="حملات تسويقية ناجحة للوصول و جذب المزيد من العملاء وزيادة المبيعات"
            delay={5}
          />
        </div>
      </div>
    </section>
  );
};

export default MatajerFeatures;
