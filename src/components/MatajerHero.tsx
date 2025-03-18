
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, CreditCard, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const MatajerHero = () => {
  const { language, isRTL } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <section className="relative w-full overflow-hidden pt-28 pb-20 bg-gradient-to-r from-oksale-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-oksale-200 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`flex flex-col-reverse ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-12`}>
          {/* Hero Content */}
          <motion.div 
            className={`w-full md:w-1/2 ${isRTL ? 'text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3 border border-indigo-100 mb-6 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sparkles className={`w-4 h-4 text-oksale-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="text-sm font-medium text-oksale-800">
                {isEnglish ? "Your online store easily and quickly" : "متجرك الإلكتروني بسهولة وسرعة"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              <span className="block mb-2">{isEnglish ? "Platform" : "منصة"}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oksale-600 to-indigo-500">OKsale</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {isEnglish 
                ? "Transform to e-commerce easily and quickly and own your own online store with all the advantages of e-commerce while providing supporting services"
                : "تحوّل إلى التجارة الإلكترونية بسهولة و سرعة و امتلك متجر إلكتروني خاص بك بجميع مزايا التجارة الإلكترونية مع توفير الخدمات المساندة له"
              }
            </p>
            
            <div className={`flex flex-wrap ${isRTL ? 'justify-end' : 'justify-start'} gap-4`}>
              <Link to="/signup">
                <Button 
                  className="bg-oksale-600 hover:bg-oksale-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-oksale-400/20 transition-all duration-300 flex items-center"
                >
                  <span>{isEnglish ? "Start Now" : "ابدأ الآن"}</span>
                  <ShoppingBag className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline" 
                  className="border-oksale-200 hover:bg-oksale-50 text-oksale-800 rounded-full px-6 py-6 text-lg"
                >
                  {isEnglish ? "View Pricing" : "عرض الأسعار"}
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-5">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 bg-oksale-50 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <ShoppingBag className="w-5 h-5 text-oksale-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{isEnglish ? "Professional Store" : "متجر احترافي"}</h3>
                    <p className="text-sm text-gray-500">{isEnglish ? "Custom design for your store" : "تصميم مخصص لمتجرك"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 bg-oksale-50 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <CreditCard className="w-5 h-5 text-oksale-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{isEnglish ? "Easy Payments" : "مدفوعات سهلة"}</h3>
                    <p className="text-sm text-gray-500">{isEnglish ? "Multiple payment methods" : "طرق دفع متعددة"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-oksale-100 rounded-full blur-xl opacity-80"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full blur-xl opacity-80"></div>
              <img 
                src="/lovable-uploads/fa6cefa9-d901-4a76-ac7c-76755b480198.png" 
                alt="OKsale Platform" 
                className="w-full h-auto object-cover rounded-2xl shadow-xl relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MatajerHero;
