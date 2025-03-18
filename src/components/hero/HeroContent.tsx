
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroContent = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5, 
        ease: "easeOut" 
      } 
    })
  };

  return (
    <div className="w-full md:w-1/2 text-right">
      <motion.h1 
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
      >
        منصة متاجر
      </motion.h1>
      
      <motion.p 
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-lg text-gray-600 mb-8 leading-relaxed"
      >
        تحوّل إلى التجارة الإلكترونية بسهولة و سرعة و امتلك متجر إلكتروني خاص بك بجميع مزايا 
        التجارة الإلكترونية مع توفير الخدمات المساندة له
      </motion.p>
      
      <motion.div 
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Link to="/signup">
          <Button 
            className="bg-matajer-600 hover:bg-matajer-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-matajer-400/20 transition-all duration-300"
          >
            ابدأ الآن
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroContent;
