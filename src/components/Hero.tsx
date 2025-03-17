
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeColors } from '@/hooks/useThemeColors';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { customColor } = useThemeColors();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
    };
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* فيديو الخلفية */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className={`object-cover w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          src="/lovable-uploads/7063f1cc-73a8-44f5-a501-42c58367d966.png" // سيتم استبداله بفيديو لاحقًا
          poster="/lovable-uploads/7063f1cc-73a8-44f5-a501-42c58367d966.png"
        >
          <source src="/video-background.mp4" type="video/mp4" />
        </video>
        
        {/* طبقة التغطية السوداء الشفافة */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* محتوى المقدمة */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-end px-6 md:px-12">
        <div className="text-right max-w-2xl ml-auto">
          {/* شارة صغيرة */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUpVariants} 
            className="mb-6 inline-block"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-4 text-white text-sm">
              ابدأ تجارتك بـ 9 د.ك
            </div>
          </motion.div>
          
          {/* العنوان الرئيسي */}
          <motion.h1 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUpVariants} 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            <span className="block">المنصة الموثوقة</span>
            <span className="block">والمتكاملة للتجارة</span>
            <span className="block">الإلكترونية</span>
          </motion.h1>
          
          {/* الوصف */}
          <motion.p 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUpVariants}
            className="text-lg text-white/90 mb-8 leading-relaxed"
          >
            نساعدك تبني وتوسع وتنمي متجرك الإلكتروني بكل سهولة مع حلول دفع آمنة، 
            شحن عالمي، تمويل مرن، وتسويق فعال، كل اللي تحتاجه عشان تصير العلامة 
            التجارية الرائدة في السوق.
          </motion.p>
          
          {/* الأزرار */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUpVariants}
            className="flex flex-wrap gap-4 justify-end"
          >
            <Link to="/signup">
              <Button 
                className="bg-white text-black hover:bg-white/90 rounded-full py-6 px-8 text-lg font-medium"
              >
                ابدأ تجربتك الآن
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
