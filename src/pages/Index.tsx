
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import NewHero from '@/components/NewHero';
import NewNavbar from '@/components/NewNavbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  ArrowRight, 
  CreditCard, 
  ShoppingBag, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.1, 0.4, 0.2, 1]
    } 
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const NewIndex = () => {
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const featuresSectionInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const statsSectionInView = useInView(statsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      {/* New Navbar */}
      <NewNavbar />
      
      {/* New Hero Section */}
      <NewHero />
      
      {/* Trusted By Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-indigo-600 font-medium">يثق بنا آلاف العملاء في الكويت والخليج</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-60">
            <img src="https://dummyimage.com/120x40/acacac/ffffff" alt="Brand Logo" className="h-8" />
            <img src="https://dummyimage.com/120x40/acacac/ffffff" alt="Brand Logo" className="h-8" />
            <img src="https://dummyimage.com/120x40/acacac/ffffff" alt="Brand Logo" className="h-8" />
            <img src="https://dummyimage.com/120x40/acacac/ffffff" alt="Brand Logo" className="h-8" />
            <img src="https://dummyimage.com/120x40/acacac/ffffff" alt="Brand Logo" className="h-8" />
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate={statsSectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            <motion.div variants={fadeInUp} custom={0} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">+10,000</div>
              <p className="text-gray-600">متجر نشط</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={1} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">+2.5M</div>
              <p className="text-gray-600">طلب تم معالجته</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={2} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">99.9%</div>
              <p className="text-gray-600">وقت تشغيل المنصة</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} custom={3} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="text-gray-600">دعم فني</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-24 bg-gradient-to-b from-indigo-50 to-white overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-indigo-100 text-indigo-800 mb-4">مميزات المنصة</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كل ما تحتاجه لإدارة متجرك الإلكتروني</h2>
            <p className="text-gray-600 text-lg">
              تم تصميم منصتنا لتوفير تجربة متكاملة لأصحاب المتاجر، من إنشاء المتجر وحتى تحليل الأداء وزيادة المبيعات
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={featuresSectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} custom={0}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">إدارة المنتجات بسهولة</h3>
                  <p className="text-gray-600 mb-6">
                    إضافة وتعديل المنتجات بسرعة مع خيارات متعددة للتصنيف والخصائص، وإدارة المخزون بشكل فعال.
                  </p>
                  <Link to="/features/products" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeInUp} custom={1}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">حلول دفع متكاملة</h3>
                  <p className="text-gray-600 mb-6">
                    دعم لجميع وسائل الدفع الكويتية والخليجية والعالمية، مع معالجة آمنة ومضمونة للمدفوعات.
                  </p>
                  <Link to="/features/payments" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeInUp} custom={2}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تحليلات وتقارير متقدمة</h3>
                  <p className="text-gray-600 mb-6">
                    متابعة أداء متجرك مع تقارير مفصلة عن المبيعات والعملاء والمنتجات الأكثر مبيعًا.
                  </p>
                  <Link to="/features/analytics" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div variants={fadeInUp} custom={3}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">متجر متعدد اللغات</h3>
                  <p className="text-gray-600 mb-6">
                    دعم كامل للغة العربية والإنجليزية، مع إمكانية إضافة لغات أخرى لتوسيع نطاق عملك.
                  </p>
                  <Link to="/features/localization" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div variants={fadeInUp} custom={4}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">سرعة وأداء عالي</h3>
                  <p className="text-gray-600 mb-6">
                    متاجر سريعة التحميل مع بنية تحتية قوية تضمن تجربة تصفح سلسة لعملائك.
                  </p>
                  <Link to="/features/performance" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div variants={fadeInUp} custom={5}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-rose-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">حماية وأمان متكامل</h3>
                  <p className="text-gray-600 mb-6">
                    حماية متقدمة ضد الاختراق وتشفير البيانات لحماية معلومات متجرك وعملائك.
                  </p>
                  <Link to="/features/security" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors group-hover:translate-x-2 rtl:-translate-x-2 duration-300">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-indigo-100 text-indigo-800 mb-4">باقات مرنة</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">اختر الباقة المناسبة لمتجرك</h2>
            <p className="text-gray-600 text-lg">
              باقات متنوعة تناسب احتياجات متجرك مهما كان حجمه، مع إمكانية الترقية في أي وقت
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">الباقة الأساسية</h3>
                  <p className="text-gray-500">للمبتدئين وأصحاب المتاجر الصغيرة</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">9</span>
                    <span className="text-lg font-medium ml-1">د.ك</span>
                    <span className="text-gray-500 mr-2 text-sm">/شهريًا</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>حتى 50 منتج</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>تصميم أساسي للمتجر</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>دعم عبر البريد الإلكتروني</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>وسائل دفع أساسية</span>
                  </li>
                </ul>
                
                <Link to="/signup?plan=starter">
                  <Button className="w-full rounded-lg py-6 bg-gray-100 hover:bg-gray-200 text-gray-800">
                    ابدأ الآن
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-2 border-indigo-500 shadow-xl shadow-indigo-100/40 relative overflow-hidden scale-105 z-10">
              <div className="absolute -left-12 top-8 bg-indigo-600 text-white px-14 py-1 transform -rotate-45">الأكثر شعبية</div>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">الباقة الاحترافية</h3>
                  <p className="text-gray-500">للمتاجر المتوسطة والنامية</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">29</span>
                    <span className="text-lg font-medium ml-1">د.ك</span>
                    <span className="text-gray-500 mr-2 text-sm">/شهريًا</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>حتى 500 منتج</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>تصميم متقدم للمتجر</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>دعم فني على مدار الساعة</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>جميع وسائل الدفع</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>تحليلات وتقارير متقدمة</span>
                  </li>
                </ul>
                
                <Link to="/signup?plan=pro">
                  <Button className="w-full rounded-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                    اختر هذه الباقة
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Business Plan */}
            <Card className="border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">باقة الشركات</h3>
                  <p className="text-gray-500">للشركات الكبيرة والمتاجر المتطورة</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">99</span>
                    <span className="text-lg font-medium ml-1">د.ك</span>
                    <span className="text-gray-500 mr-2 text-sm">/شهريًا</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>عدد غير محدود من المنتجات</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>تصميم مخصص بالكامل</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>مدير حساب مخصص</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>جميع وسائل الدفع المحلية والعالمية</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>حلول API مخصصة وتكاملات</span>
                  </li>
                </ul>
                
                <Link to="/signup?plan=business">
                  <Button className="w-full rounded-lg py-6 bg-gray-100 hover:bg-gray-200 text-gray-800">
                    ابدأ الآن
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلة نجاح متجرك الإلكتروني اليوم</h2>
            <p className="text-xl text-white/90 mb-8">
              انضم إلى الآلاف من أصحاب المتاجر الناجحة واستفد من منصتنا المتكاملة للتجارة الإلكترونية
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-indigo-700 hover:bg-white/90 rounded-full py-6 px-8 text-lg font-medium shadow-lg hover:shadow-white/25 transition-all duration-300 w-full sm:w-auto">
                  أنشئ متجرك الآن
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 rounded-full py-6 px-8 text-lg font-medium w-full sm:w-auto">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewIndex;
