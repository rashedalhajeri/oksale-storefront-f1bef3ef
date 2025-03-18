
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MatajerPayments = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Payment Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="bg-gray-50 rounded-3xl p-8 relative">
              <img 
                src="/lovable-uploads/fa6cefa9-d901-4a76-ac7c-76755b480198.png" 
                alt="وسائل الدفع المتعددة" 
                className="w-full rounded-2xl shadow-md"
              />
              
              {/* Decorative payment logos */}
              <div className="absolute -top-5 right-8 bg-white p-2 rounded-full shadow-md">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <svg width="40" height="24" viewBox="0 0 40 24">
                    <path fill="#FFB600" d="M22.4 6.3h-4.5v11.5h4.5V6.3z" />
                    <path fill="#FF5F00" d="M18.8 12.1c0-2.2 1-4.2 2.7-5.5-2.9-2.3-7.1-1.8-9.4 1.1-2.3 2.9-1.8 7.1 1.1 9.4 2.4 1.9 5.7 1.9 8.2 0-1.7-1.3-2.7-3.3-2.6-5.5v.5z" />
                    <path fill="#EB001B" d="M33.4 12.1c0 4-3.2 7.2-7.2 7.2-1.9 0-3.8-.8-5.1-2.1 2.9-2.3 3.4-6.5 1.1-9.4-.3-.4-.7-.8-1.1-1.1 3.2-2.5 7.8-1.9 10.3 1.3.7 1 1.1 2.2 1 3.4v.7z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute -bottom-3 right-12 bg-white p-1 rounded-full shadow-md">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <svg width="32" height="20" viewBox="0 0 32 20">
                    <path fill="#1A1F71" d="M13.3 4.8l-3.8 9.2H6.7l-1.9-7.1c-.1-.4-.2-.6-.6-.7-.7-.3-1.4-.5-2.1-.7l.1-.7h3.6c.5 0 .9.3 1 .8l.9 4.8 2.3-5.6h2.3zm9.3 6.2c0-2.4-3.3-2.5-3.3-3.6 0-.3.3-.7 1-.8.8-.1 1.6 0 2.3.2l.4-1.8c-.7-.3-1.5-.4-2.3-.4-2.4 0-4.1 1.3-4.1 3.1 0 1.4 1.2 2.1 2.1 2.6.9.5 1.2.8 1.2 1.2 0 .7-.7 1-1.4 1-.8 0-1.7-.2-2.3-.5l-.4 1.9c.8.3 1.7.5 2.5.5 2.4 0 4.1-1.2 4.1-3.1l.2-.3zm6.2 3l.5-1.9c-.5.3-1.1.4-1.7.4-1.5 0-2.3-1.1-2.3-2.5 0-2.2 1.3-3.7 3-3.7.9 0 1.8.3 2.3.7l.5-1.9c-.8-.5-1.7-.7-2.6-.7-3 0-5.1 2.2-5.1 5.6 0 2.4 1.5 4 3.8 4 1 0 1.9-.2 2.8-.7l-.2.7z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-3 bg-white p-1 rounded-full shadow-md">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#000" d="M17.5 8.3c-.7-.9-1.7-1.4-2.8-1.4-2.2 0-4 1.8-4 4s1.8 4 4 4c1.1 0 2.1-.5 2.8-1.4H15v2.3h1.5v-2.3h.9v2.3h1.5v-5.6h-5v1.1h3.6z" />
                    <path fill="#000" d="M14.8 12.9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                    <path fill="#000" d="M12.4 9.4h-3v5.6h1.5v-2.1h1.5c1.1 0 2-.9 2-1.8s-.9-1.7-2-1.7zm0 2.1h-1.5v-1h1.5c.3 0 .5.2.5.5s-.2.5-.5.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Payment Text Content */}
          <div className="w-full md:w-1/2 text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">الدفع</h2>
              <div className="w-16 h-1 bg-matajer-600 mr-0 mb-6"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              وفّر لعملائك خيارات متعددة للشراء من متجرك و قبلها بكل سهولة
              ( مدى، Apple Pay، فيزا، ماستركارد )
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/payments" className="text-matajer-600 hover:text-matajer-700 inline-flex items-center">
                اكتشف المزيد عن الدفع الإلكتروني
                <ArrowLeft className="mr-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatajerPayments;
