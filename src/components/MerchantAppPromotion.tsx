
import React from 'react';
import { motion } from 'framer-motion';

const MerchantAppPromotion = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-right order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">تطبيق التاجر</h2>
              <div className="w-16 h-1 bg-matajer-600 mr-0 mb-6"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                من خلال تطبيق التاجر تقدر تدير متجرك بكل سهولة من جوالك
              </p>
              
              <div className="flex flex-wrap gap-4 justify-end">
                <a href="#" className="inline-block">
                  <img 
                    src="/lovable-uploads/13cf5172-1411-4dd8-b777-66aa1a0ab477.png" 
                    alt="Google Play" 
                    className="h-12 w-auto"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img 
                    src="/lovable-uploads/e598e7d8-c8e6-4c0c-ae96-1678fbd1573d.png" 
                    alt="App Store" 
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* App Image */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-matajer-600 rounded-full w-[400px] h-[400px] mx-auto flex items-center justify-center">
                <img 
                  src="/lovable-uploads/9c3f46e9-04db-4477-91f2-35fd71ce243d.png" 
                  alt="تطبيق التاجر" 
                  className="w-[220px] relative z-10"
                />
                
                {/* Decorative elements */}
                <div className="absolute top-10 left-10">
                  <div className="w-6 h-6 text-teal-400">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-12 right-12">
                  <div className="w-4 h-4 text-teal-300">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchantAppPromotion;
