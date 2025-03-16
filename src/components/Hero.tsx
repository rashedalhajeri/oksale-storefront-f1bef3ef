
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-10 overflow-hidden animated-bg">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-60 animate-floating"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-purple-200/50 blur-3xl opacity-50 animate-floating"></div>
      
      {/* Floating circles */}
      <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-bluesky-300/70 animate-pulse-light"></div>
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-purple-400/70 animate-pulse-light"></div>
      
      {/* Animated ring */}
      <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full border-4 border-dashed border-bluesky-200 animate-spin-slow opacity-40"></div>
      
      <div ref={textRef} className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block p-2 px-4 mb-6 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-bluesky-700">
            <Sparkles size={18} className="text-purple-500" />
            <span>نظام متكامل لإدارة المتاجر الإلكترونية</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-reveal" style={{ transitionDelay: '0.2s' }}>
          <span className="text-bluesky-950">أنشئ متجرك الإلكتروني</span>
          <br />
          <span className="gradient-text">بتصميم احترافي في دقائق</span>
        </h1>
        
        <p className="text-bluesky-700 text-lg mb-8 max-w-xl mx-auto text-reveal" style={{ transitionDelay: '0.3s' }}>
          منصة متكاملة تمكنك من إدارة متجرك بسهولة واستقبال المدفوعات فوراً
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-reveal" style={{ transitionDelay: '0.4s' }}>
          <Button className="h-14 px-8 text-base rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-bluesky-600 to-bluesky-700 hover:from-bluesky-700 hover:to-bluesky-800 glow-button">
            <span className="mr-2">إنشاء متجرك الآن</span>
            <ArrowRight size={18} />
          </Button>
          <Button variant="outline" className="h-14 px-8 text-base rounded-xl border-bluesky-200 bg-white/80 backdrop-blur-sm hover:bg-bluesky-50 hover-lift">
            استكشاف المتاجر
          </Button>
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-4 space-x-reverse glass-morphism py-3 px-6 rounded-full mx-auto w-fit text-reveal" style={{ transitionDelay: '0.5s' }}>
          <div className="flex -space-x-3 -space-x-reverse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-bluesky-500 to-purple-500 border-2 border-white flex items-center justify-center text-xs text-white">
                {i}
              </div>
            ))}
          </div>
          <p className="text-bluesky-700 text-sm font-medium">
            يستخدمه أكثر من <span className="font-bold">2,000+</span> متجر
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
