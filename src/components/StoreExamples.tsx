
import React from 'react';
import { motion } from 'framer-motion';
import StoreExamplesSlider from './store-examples/StoreExamplesSlider';
import { Store } from 'lucide-react';

const StoreExamples = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center bg-oksale-50 text-oksale-800 rounded-full py-2 px-4 mb-4"
            variants={itemVariants}
          >
            <Store className="w-4 h-4 ml-2" />
            <span className="text-sm font-medium">نماذج من متاجرنا</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            variants={itemVariants}
          >
            أمثلة المتاجر
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-oksale-600 mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            variants={itemVariants}
          >
            تصفح مجموعة مختارة من أفضل المتاجر التي تم إنشاؤها باستخدام منصة OKsale.
            كل متجر يعكس تخصيصًا فريدًا وتصميمًا استثنائيًا.
          </motion.p>
        </motion.div>
        
        <StoreExamplesSlider />
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-oksale-600 hover:text-oksale-700 font-medium"
          >
            <span>عرض المزيد من المتاجر</span>
            <svg className="w-5 h-5 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StoreExamples;
