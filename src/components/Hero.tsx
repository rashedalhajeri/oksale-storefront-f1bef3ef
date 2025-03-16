
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.text-reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('.text-reveal');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-indigo-50/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-indigo-100/50 blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-purple-200/50 blur-3xl opacity-50"></div>
      
      <div ref={textRef} className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-reveal" style={{ transitionDelay: '0.2s' }}>
          <span className="text-black">منتجاتك.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">متجرك الإلكتروني</span>
          <br />
          <span className="text-black">بتصميم احترافي</span>
        </h1>
        
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto text-reveal" style={{ transitionDelay: '0.3s' }}>
          أنشئ متجرك الإلكتروني في دقائق واعرض منتجاتك بسهولة واستقبل المدفوعات بشكل مباشر.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse text-reveal" style={{ transitionDelay: '0.4s' }}>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
            إنشاء متجرك الآن
          </Button>
          <Button variant="outline" className="border-indigo-300 bg-white/80 hover:bg-indigo-50 px-8 py-6 text-lg rounded-xl">
            استكشاف المتاجر
          </Button>
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-4 space-x-reverse text-reveal" style={{ transitionDelay: '0.5s' }}>
          <div className="flex -space-x-3 -space-x-reverse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-2 border-white"></div>
            ))}
          </div>
          <p className="text-gray-700">
            يستخدمه أكثر من <span className="font-semibold">2,000+</span> متجر
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
