
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MatajerHero = () => {
  // Animation variants
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
    <section className="relative w-full overflow-hidden pt-24 pb-16">
      {/* Background pattern with small decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-20">
          <div className="w-8 h-8 text-teal-400">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-40 right-20">
          <div className="w-6 h-6 text-teal-400">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4">
          <div className="w-5 h-5 text-teal-300">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L20 12M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Hero Image */}
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

          {/* Hero Content */}
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
        </div>
      </div>
    </section>
  );
};

export default MatajerHero;
