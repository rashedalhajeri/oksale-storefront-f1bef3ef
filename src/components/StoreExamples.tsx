
import React from 'react';
import { motion } from 'framer-motion';
import StoreExamplesSlider from './store-examples/StoreExamplesSlider';

const StoreExamples = () => {
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">أمثلة المتاجر</h2>
            <div className="w-24 h-1 bg-matajer-600 mx-auto mb-6"></div>
          </motion.div>
        </div>
        
        <StoreExamplesSlider />
      </div>
    </section>
  );
};

export default StoreExamples;
