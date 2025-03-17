
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const revealAnimation = {
    initial: { y: 30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1 + i * 0.1,
      },
    }),
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
          className={cn(
            "object-cover w-full h-full transition-opacity duration-1000",
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          )}
          src="/lovable-uploads/7063f1cc-73a8-44f5-a501-42c58367d966.png" // سيتم استبداله بفيديو لاحقًا
          poster="/lovable-uploads/7063f1cc-73a8-44f5-a501-42c58367d966.png"
        >
          <source src="/video-background.mp4" type="video/mp4" />
        </video>
        
        {/* طبقة التظليل المتدرجة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* زر تشغيل/إيقاف الفيديو */}
      <button 
        onClick={handlePlayToggle}
        className="absolute bottom-8 right-8 z-10 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white border border-white/20 hover:bg-white/20 transition-all"
        style={{ transform: `translateY(${Math.min(scrollPosition * 0.5, 100)}px)` }}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* محتوى المقدمة */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-end px-6 md:px-12">
        <div className="text-right max-w-2xl ml-auto">
          {/* شارة */}
          <motion.div 
            custom={0}
            variants={revealAnimation}
            initial="initial"
            animate="animate"
            className="mb-6 inline-block"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-4 text-white text-sm">
              ابدأ متجرك بـ 9 د.ك شهريًا فقط
            </div>
          </motion.div>
          
          {/* العنوان الرئيسي */}
          <div className="overflow-hidden">
            <motion.h1 
              custom={1}
              variants={revealAnimation}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2"
            >
              أطلق متجرك الإلكتروني
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              custom={2}
              variants={revealAnimation}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2"
            >
              مع منصة متكاملة
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              custom={3}
              variants={revealAnimation}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 font-bold leading-tight mb-6"
            >
              للتجارة الإلكترونية
            </motion.h1>
          </div>
          
          {/* الوصف */}
          <motion.p 
            custom={4}
            variants={revealAnimation}
            initial="initial"
            animate="animate"
            className="text-lg text-white/90 mb-8 leading-relaxed"
          >
            منصة كويتية متكاملة تساعدك على بناء وإدارة متجرك الإلكتروني بكل سهولة.
            حلول دفع آمنة، شحن سريع، وأدوات تسويقية فعالة لتنمية عملك التجاري.
          </motion.p>
          
          {/* مميزات سريعة */}
          <motion.div 
            custom={5}
            variants={revealAnimation}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 gap-3 mb-8"
          >
            <div className="flex items-center text-white gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">إعداد سريع خلال دقائق</span>
            </div>
            <div className="flex items-center text-white gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">دعم فني على مدار الساعة</span>
            </div>
            <div className="flex items-center text-white gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">حلول دفع متعددة</span>
            </div>
            <div className="flex items-center text-white gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">تقارير وتحليلات متقدمة</span>
            </div>
          </motion.div>
          
          {/* الأزرار */}
          <motion.div 
            custom={6}
            variants={revealAnimation}
            initial="initial"
            animate="animate"
            className="flex flex-wrap gap-4"
          >
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full py-6 px-8 text-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                ابدأ الآن مجانًا
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white rounded-full py-6 px-8 text-lg transition-all duration-300"
            >
              عرض توضيحي
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
