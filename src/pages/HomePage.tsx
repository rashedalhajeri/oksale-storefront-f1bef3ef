
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  ShoppingBag,
  CreditCard,
  Users,
  Star,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { colors, createGradient } = useThemeColors();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-80 blur-[6px]"></div>
              <span className="relative z-10 text-white font-bold text-xl">OK</span>
            </div>
            <span className="mr-2 font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">OKsale</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <a href="#pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">الأسعار</a>
            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">المميزات</a>
            <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">آراء العملاء</a>
            <a href="#faq" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">الأسئلة الشائعة</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/signin">
              <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                إنشاء متجر
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 text-right">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                أطلق <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">متجرك الإلكتروني</span> بطريقة سهلة ومبتكرة
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                منصة متكاملة تجمع بين سهولة الاستخدام وقوة الأداء. ابدأ رحلتك في عالم التجارة الإلكترونية اليوم وانضم إلى آلاف المتاجر الناجحة.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
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
                  className="bg-white/10 text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full py-6 px-8 text-lg transition-all duration-300"
                >
                  عرض توضيحي
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 flex items-center gap-2 text-gray-500"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>إعداد سريع خلال دقائق</span>
                <span className="mx-2">•</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>دعم فني 24/7</span>
                <span className="mx-2">•</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>بدون عمولة على المبيعات</span>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <img 
                  src="/lovable-uploads/7063f1cc-73a8-44f5-a501-42c58367d966.png" 
                  alt="لقطة شاشة لمتجر إلكتروني" 
                  className="w-full h-auto rounded-b-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-yellow-300 rounded-full blur-xl opacity-70"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-300 rounded-full blur-xl opacity-70"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">15+</p>
              <p className="text-gray-500">ألف متجر نشط</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">98%</p>
              <p className="text-gray-500">نسبة رضا العملاء</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</p>
              <p className="text-gray-500">دعم فني مستمر</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">5+</p>
              <p className="text-gray-500">مليون طلب منفذ</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">مميزات تساعدك على النمو</h2>
            <p className="text-lg text-gray-600">كل ما تحتاجه لإدارة متجرك الإلكتروني بكفاءة وتحقيق أقصى استفادة</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">متجر احترافي</h3>
              <p className="text-gray-600 mb-4">تصميم متجر احترافي يعكس هوية علامتك التجارية ويجذب العملاء</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">تصميم متجاوب مع جميع الأجهزة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">تخصيص كامل للألوان والتصميم</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">دعم اللغة العربية بشكل كامل</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">حلول دفع متكاملة</h3>
              <p className="text-gray-600 mb-4">تكامل سلس مع جميع بوابات الدفع الشائعة في المنطقة</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">دعم KNET وبطاقات الائتمان</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">الدفع عند الاستلام</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">حماية كاملة للمعاملات</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">أدوات تسويقية</h3>
              <p className="text-gray-600 mb-4">أدوات تساعدك على زيادة المبيعات وجذب المزيد من العملاء</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">كوبونات خصم وعروض خاصة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">تكامل مع وسائل التواصل الاجتماعي</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">رسائل تذكير للسلة المتروكة</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">أمان وموثوقية</h3>
              <p className="text-gray-600 mb-4">حماية كاملة لبيانات متجرك وعملائك</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">شهادة SSL مجانية</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">نسخ احتياطي تلقائي للبيانات</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">حماية متقدمة من الاختراقات</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">إدارة العملاء</h3>
              <p className="text-gray-600 mb-4">أدوات متكاملة لإدارة علاقات العملاء وتعزيز ولائهم</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">قاعدة بيانات عملاء متكاملة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">برامج ولاء وهدايا</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">متابعة سلوك الشراء والتفضيلات</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">تقارير وتحليلات</h3>
              <p className="text-gray-600 mb-4">رؤى تحليلية تساعدك على اتخاذ قرارات أفضل لنمو متجرك</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">إحصائيات المبيعات والزيارات</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">تقارير المخزون والمنتجات الأكثر مبيعًا</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">تحليل سلوك العملاء</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">باقات بسيطة وشفافة</h2>
            <p className="text-lg text-gray-600">اختر الباقة المناسبة لاحتياجاتك مع إمكانية الترقية في أي وقت</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">الباقة الأساسية</h3>
                <p className="text-gray-600">مثالية للمتاجر الصغيرة والمبتدئين</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold text-gray-900">9</span>
                  <span className="text-xl text-gray-700 mr-1">د.ك</span>
                  <span className="text-gray-500">/شهريًا</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">متجر إلكتروني كامل</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">50 منتج كحد أقصى</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">2% عمولة على المبيعات</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">دعم فني بالبريد الإلكتروني</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full py-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg">
                  ابدأ الآن
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-indigo-50 to-white p-8 rounded-2xl shadow-lg border border-indigo-100 relative transform md:-translate-y-4"
            >
              <div className="absolute -top-5 right-0 left-0 mx-auto w-max">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm py-1 px-3 rounded-full font-medium">الأكثر شيوعًا</span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">الباقة الاحترافية</h3>
                <p className="text-gray-600">للمتاجر المتوسطة والنامية</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold text-gray-900">19</span>
                  <span className="text-xl text-gray-700 mr-1">د.ك</span>
                  <span className="text-gray-500">/شهريًا</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">متجر إلكتروني متقدم</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">500 منتج كحد أقصى</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">1% عمولة على المبيعات</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">دعم فني على مدار الساعة</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">أدوات تسويقية متقدمة</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md">
                  ابدأ الآن
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">الباقة المتقدمة</h3>
                <p className="text-gray-600">للمتاجر الكبيرة ذات الاحتياجات المتقدمة</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-bold text-gray-900">39</span>
                  <span className="text-xl text-gray-700 mr-1">د.ك</span>
                  <span className="text-gray-500">/شهريًا</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">متجر إلكتروني متقدم+</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">منتجات غير محدودة</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">0% عمولة على المبيعات</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">دعم فني على مدار الساعة ومدير حساب</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">كافة المميزات المتقدمة</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full py-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg">
                  ابدأ الآن
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-lg text-gray-600">آراء أصحاب المتاجر الناجحة الذين وثقوا بنا</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/100?img=1" 
                        alt="صورة العميل" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">أحمد الصالح</h4>
                      <p className="text-gray-500 text-sm">متجر العطور الفاخرة</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "انطلقت مع OKsale قبل عام واحد، والآن متجري يحقق مبيعات تتجاوز توقعاتي. النظام سهل الاستخدام والدعم الفني ممتاز. أنصح به بشدة."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/100?img=5" 
                        alt="صورة العميل" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">نورة الفهد</h4>
                      <p className="text-gray-500 text-sm">متجر أزياء السيدات</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "كنت أخشى من صعوبة إنشاء متجر إلكتروني، لكن مع OKsale كان الأمر سهلاً للغاية. خلال أسبوع كان متجري جاهزاً وبدأت في استقبال الطلبات. شكراً لكم!"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/100?img=12" 
                        alt="صورة العميل" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">محمد العبدالله</h4>
                      <p className="text-gray-500 text-sm">متجر إلكترونيات</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "الأدوات التسويقية والتقارير التحليلية ساعدتني على فهم سلوك العملاء وتحسين استراتيجية مبيعاتي. النتائج كانت مذهلة وزادت مبيعاتي بنسبة 120%."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-600">إجابات على الأسئلة الأكثر شيوعًا من عملائنا</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "كيف يمكنني البدء بإنشاء متجري الإلكتروني؟", a: "البدء سهل جدًا، قم بالتسجيل واختيار الباقة المناسبة، ثم اتبع الخطوات البسيطة لإعداد متجرك. يمكنك إضافة المنتجات وتخصيص المتجر حسب هويتك التجارية، وستكون جاهزًا لاستقبال الطلبات خلال دقائق." },
              { q: "ما هي طرق الدفع المدعومة؟", a: "نحن ندعم مجموعة واسعة من طرق الدفع، بما في ذلك KNET، وبطاقات الائتمان، والدفع عند الاستلام، بالإضافة إلى بوابات الدفع الإلكترونية الشائعة في المنطقة." },
              { q: "هل أحتاج لمعرفة برمجية لإدارة المتجر؟", a: "لا، لقد صممنا النظام ليكون سهل الاستخدام ولا يتطلب أي معرفة برمجية. لوحة التحكم بديهية وتتيح لك إدارة كل جوانب متجرك بسهولة تامة." },
              { q: "كيف يتم توصيل الطلبات للعملاء؟", a: "نوفر تكاملًا مع شركات الشحن المحلية والعالمية، مما يتيح لك خيارات متعددة لتوصيل منتجاتك للعملاء. يمكنك تحديد مناطق التوصيل وأسعار الشحن بمرونة تامة." },
              { q: "هل يمكنني الترقية أو تخفيض باقتي في أي وقت؟", a: "نعم، يمكنك الترقية إلى باقة أعلى أو التخفيض إلى باقة أقل في أي وقت، مع تناسب الأسعار بشكل تلقائي مع الفترة المتبقية من اشتراكك." },
              { q: "هل توفرون الدعم الفني؟", a: "بالتأكيد، نحن نقدم دعمًا فنيًا على مدار الساعة طوال أيام الأسبوع عبر الدردشة الحية والبريد الإلكتروني والهاتف، ونضمن لك الحصول على المساعدة التي تحتاجها في أي وقت." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "rounded-lg border border-gray-200 overflow-hidden bg-white",
                  expandedFaq === i ? "shadow-md" : ""
                )}
              >
                <button
                  className="w-full px-6 py-4 text-right flex justify-between items-center"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <h3 className="font-medium text-gray-900">{item.q}</h3>
                  {expandedFaq === i ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </button>
                <div 
                  className={cn(
                    "px-6 overflow-hidden transition-all", 
                    expandedFaq === i ? "max-h-40 py-4" : "max-h-0"
                  )}
                >
                  <p className="text-gray-600">{item.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ متجرك الإلكتروني اليوم</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف التجار الناجحين واستفد من منصة OKsale لبناء متجرك الإلكتروني
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-white text-indigo-700 hover:bg-gray-100 rounded-full py-6 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                ابدأ مجانًا الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white/10 rounded-full py-6 px-8 text-lg transition-all duration-300"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-80 blur-[6px]"></div>
                  <span className="relative z-10 text-white font-bold text-xl">OK</span>
                </div>
                <span className="mr-2 font-bold text-2xl text-white">OKsale</span>
              </div>
              <p className="text-gray-400 mb-6">
                منصة متكاملة لإنشاء وإدارة المتاجر الإلكترونية بطريقة مبسطة وفعالة.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <span className="sr-only">فيسبوك</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <span className="sr-only">تويتر</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" /></svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <span className="sr-only">انستغرام</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">روابط مفيدة</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مميزات المنصة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">آراء العملاء</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">المدونة</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">الدعم</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">دليل الاستخدام</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">التحديثات والتطويرات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">القانونية</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">شروط الاستخدام</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سياسة الاسترجاع</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">حقوق الملكية</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400 text-center">
            <p>© {new Date().getFullYear()} OKsale. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
