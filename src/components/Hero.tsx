
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
    <div className="relative min-h-screen flex items-center pt-20 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-oksale-50"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-oksale-100 blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-oksale-200 blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        <div ref={textRef} className="flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 bg-oksale-100 rounded-full px-4 py-2 mb-8 text-oksale-700 text-sm font-medium text-reveal" style={{ transitionDelay: '0.1s' }}>
            <ShoppingBag className="h-4 w-4" />
            <span>Launch your e-commerce store in minutes</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-reveal" style={{ transitionDelay: '0.2s' }}>
            Your <span className="text-oksale-700">Products</span>.
            <br />
            Your <span className="text-oksale-700">Store</span>.
            <br />
            Your <span className="text-oksale-700">Way</span>.
          </h1>
          
          <p className="text-oksale-600 text-lg md:text-xl mb-8 max-w-md text-reveal" style={{ transitionDelay: '0.3s' }}>
            Create a stunning online store without coding. Showcase products and accept payments directly to your account.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-reveal" style={{ transitionDelay: '0.4s' }}>
            <Button className="bg-oksale-800 hover:bg-oksale-900 text-white px-6 py-6 text-lg btn-animation">
              Create Your Store
            </Button>
            <Button variant="outline" className="border-oksale-300 bg-transparent hover:bg-oksale-50 px-6 py-6 text-lg">
              Explore Stores
            </Button>
          </div>
          
          <div className="mt-10 flex items-center space-x-4 text-reveal" style={{ transitionDelay: '0.5s' }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-oksale-300 border-2 border-white"></div>
              ))}
            </div>
            <p className="text-oksale-600">
              <span className="font-semibold">2,000+</span> merchants trust OKsale
            </p>
          </div>
        </div>
        
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md scale-in">
            {/* Phone mockup with a store preview */}
            <div className="relative mx-auto w-full max-w-xs aspect-[9/16] rounded-[2.5rem] border-[8px] border-oksale-800 overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-6 bg-oksale-800"></div>
              <div className="h-full w-full bg-white">
                {/* Store preview content */}
                <div className="h-1/4 bg-oksale-700 p-4 flex items-end">
                  <h3 className="text-white font-semibold">Fashion Store</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="w-full h-32 bg-oksale-100 rounded-lg"></div>
                  <div className="w-full h-32 bg-oksale-100 rounded-lg"></div>
                  <div className="w-full h-32 bg-oksale-100 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 -right-16 w-24 h-24 rounded-xl bg-white p-3 shadow-lg rotate-6 animate-float">
              <div className="w-full h-1/2 bg-oksale-100 rounded-md mb-2"></div>
              <div className="w-2/3 h-3 bg-oksale-200 rounded-md"></div>
              <div className="w-1/2 h-3 bg-oksale-200 rounded-md mt-2"></div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-28 h-24 rounded-xl bg-white p-3 shadow-lg -rotate-12 animate-float-slow">
              <div className="w-12 h-12 rounded-full bg-oksale-100 mx-auto mb-2"></div>
              <div className="w-full h-3 bg-oksale-200 rounded-md"></div>
              <div className="w-5/6 h-3 bg-oksale-200 rounded-md mt-2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
