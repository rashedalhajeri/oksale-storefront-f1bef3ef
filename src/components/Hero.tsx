
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechLogos from '@/components/TechLogos';

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
    <section className="py-24 px-6 md:px-10 relative overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-bluesky-100/50 blur-3xl opacity-60 animate-floating"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-purple-200/50 blur-3xl opacity-50 animate-floating"></div>
      
      {/* Main content */}
      <div ref={textRef} className="max-w-7xl mx-auto">
        <div className="text-center relative z-10 mb-16">
          {/* Announcement button */}
          <div className="mb-8 flex justify-center">
            <Link to="/explore" className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow transition">
              <Sparkles className="h-4 w-4 ml-2 text-bluesky-500" />
              <span>استكشف منتجاتنا الجديدة</span>
              <ArrowRight className="h-4 w-4 mr-2" />
            </Link>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            <span className="block text-reveal" style={{ transitionDelay: '0.1s' }}>أنشئ </span>
            <span className="block text-reveal" style={{ transitionDelay: '0.2s' }}>
              <span className="text-[#e91e63]">م</span>
              <span className="text-[#f44336]">ت</span>
              <span className="text-[#ff9800]">ج</span>
              <span className="text-[#4caf50]">ر</span>
              <span className="text-[#2196f3]">ك </span>
              <span className="text-[#3f51b5]">ا</span>
              <span className="text-[#9c27b0]">ل</span>
              <span className="text-[#e91e63]">ج</span>
              <span className="text-[#f44336]">م</span>
              <span className="text-[#ff9800]">ي</span>
              <span className="text-[#4caf50]">ل</span>
            </span>
            <span className="block mt-2 text-reveal" style={{ transitionDelay: '0.3s' }}>في <span className="italic font-black">دقيقة</span> واحدة</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto text-reveal" style={{ transitionDelay: '0.4s' }}>
            أكثر من 50 قالب وتصميم مبني على React و TypeScript و Tailwind CSS. 
            وفر ساعات من الوقت وأنشئ متجرك الإلكتروني بسهولة.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 text-reveal" style={{ transitionDelay: '0.5s' }}>
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-xl w-full sm:w-auto">
              البدء مجاناً <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-gray-300 px-8 py-6 text-lg rounded-xl hover:bg-gray-50 w-full sm:w-auto">
              استعراض القوالب
            </Button>
          </div>

          {/* Tech Logos */}
          <TechLogos />
        </div>
      </div>
    </section>
  );
};

export default Hero;
