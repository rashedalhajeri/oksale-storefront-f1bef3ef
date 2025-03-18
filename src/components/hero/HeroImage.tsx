
import React from 'react';
import { motion } from 'framer-motion';

const HeroImage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full md:w-1/2"
    >
      <div className="relative">
        <img 
          src="/lovable-uploads/bfc7faae-2155-4653-8f73-1291eac768f7.png" 
          alt="منصة متاجر للتجارة الإلكترونية" 
          className="w-full h-auto rounded-2xl shadow-lg"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -top-5 -left-5 bg-white p-3 rounded-2xl shadow-md"
        >
          <img 
            src="/lovable-uploads/e598e7d8-c8e6-4c0c-ae96-1678fbd1573d.png" 
            alt="شعار التاجر" 
            className="w-16 h-16 object-contain"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute -bottom-5 -right-5 bg-white p-3 rounded-2xl shadow-md"
        >
          <img 
            src="/lovable-uploads/13cf5172-1411-4dd8-b777-66aa1a0ab477.png" 
            alt="شعار التاجر" 
            className="w-16 h-16 object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroImage;
