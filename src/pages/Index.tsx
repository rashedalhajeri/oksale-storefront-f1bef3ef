
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, MessageSquare, BarChart3, Globe, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <header className="relative z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-fuchsia-500">OK</span>
                <span>sale</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                الرئيسية
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                خدماتنا
              </Link>
              <Link to="/projects" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                المشاريع
              </Link>
              <Link to="/testimonials" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                آراء العملاء
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                اتصل بنا
              </Link>
            </nav>

            {/* Mobile Navigation Button */}
            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with gradient spheres */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Gradient Spheres */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Purple sphere */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-700 rounded-full opacity-30 blur-3xl"></div>
          {/* Pink sphere */}
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-600 rounded-full opacity-20 blur-3xl"></div>
          {/* Blue sphere */}
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-700 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              <span className="block">إشعال</span>
              <span className="block text-fuchsia-500 mt-2">الأفكار الملهمة</span>
              <span className="block">للابتكار.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 mb-10">
              انطلق بمتجرك الإلكتروني الى آفاق جديدة مع منصة OKsale للتجارة الإلكترونية.
              حلول متكاملة وتصاميم مميزة لتعزيز تواجدك الرقمي وزيادة مبيعاتك.
            </p>
            
            {/* CTA Form */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full sm:w-64 bg-gray-900 border-gray-700 text-white"
              />
              <Button
                className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white px-6"
              >
                ابدأ الآن
                <Send className="ms-2 h-4 w-4" />
              </Button>
            </div>

            {/* Social Proof Icons */}
            <div className="mt-16 flex justify-center space-x-6 opacity-70">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>

            {/* Client Logos */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              <div className="text-gray-400 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                <span className="font-medium">شركة تك</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                <span className="font-medium">ديجيتال برو</span>
              </div>
              <div className="text-fuchsia-500 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                <span className="font-medium">سمارت شوب</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                <span className="font-medium">تيك سولوشن</span>
              </div>
              <div className="text-gray-400 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                <span className="font-medium">ويب ماستر</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">خدماتنا</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نقدم مجموعة متكاملة من الخدمات المصممة خصيصًا لمساعدتك على النجاح في عالم التجارة الإلكترونية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-fuchsia-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-fuchsia-900/50 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-fuchsia-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">لوحة تحكم المشروع</h3>
              <p className="text-gray-400 mb-4">
                إدارة متجرك بكفاءة عالية من خلال لوحة تحكم متكاملة تمنحك التحكم الكامل في كافة جوانب نشاطك التجاري.
              </p>
              <Link to="/services" className="text-fuchsia-400 inline-flex items-center group">
                المزيد من التفاصيل 
                <ChevronRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-fuchsia-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="text-pink-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">التواصل والتعاون</h3>
              <p className="text-gray-400 mb-4">
                أدوات تواصل متطورة تسهل التعاون بين فريقك وتمكنك من خدمة عملائك بكفاءة عالية وفي أي وقت وأي مكان.
              </p>
              <Link to="/services" className="text-pink-400 inline-flex items-center group">
                المزيد من التفاصيل 
                <ChevronRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-fuchsia-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">إدارة مالية متكاملة</h3>
              <p className="text-gray-400 mb-4">
                حلول مالية شاملة لمتابعة المبيعات والإيرادات وإدارة المدفوعات بطريقة آمنة وسهلة الاستخدام.
              </p>
              <Link to="/services" className="text-indigo-400 inline-flex items-center group">
                المزيد من التفاصيل 
                <ChevronRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <Link to="/" className="flex items-center">
                <div className="text-2xl font-bold">
                  <span className="text-fuchsia-500">OK</span>
                  <span>sale</span>
                </div>
              </Link>
              <p className="text-gray-400 mt-2 text-sm">© 2023 OKsale. جميع الحقوق محفوظة.</p>
            </div>
            
            <div className="flex space-x-8 text-gray-400">
              <Link to="/about" className="hover:text-white transition">من نحن</Link>
              <Link to="/contact" className="hover:text-white transition">تواصل معنا</Link>
              <Link to="/privacy" className="hover:text-white transition">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-white transition">شروط الاستخدام</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
