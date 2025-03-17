
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopBanner from '@/components/TopBanner';
import TechLogos from '@/components/TechLogos';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <TopBanner />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70 blur-sm"></div>
              <span className="relative z-10 text-white font-bold text-xl">OK</span>
            </div>
            <span className="ml-2 font-bold text-2xl">OKsale</span>
            <span className="ml-2 px-2 py-1 bg-gray-100 text-xs rounded-full font-semibold">Pro</span>
          </Link>

          {/* Search */}
          <div className="relative hidden sm:block flex-grow max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في المتاجر..."
                className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              <div className="absolute left-3 top-2 text-xs text-gray-400 border border-gray-200 px-1 rounded">⌘K</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" className="text-gray-700 hidden sm:flex">
              تسجيل الدخول
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800 hidden sm:flex">
              الوصول المطلق <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 sm:hidden">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          </div>

          {/* Tool Banner */}
          <div className="mb-12 flex justify-center">
            <Link to="/explore" className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow transition">
              <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
              <span>استكشف جميع المتاجر</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Heading */}
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="block">أنشئ </span>
              <span className="block">
                <span className="text-red-500">م</span>
                <span className="text-orange-500">ت</span>
                <span className="text-yellow-500">ج</span>
                <span className="text-green-500">ر</span>
                <span className="text-blue-500">ك </span>
                <span className="text-indigo-500">ا</span>
                <span className="text-purple-500">ل</span>
                <span className="text-pink-500">ج</span>
                <span className="text-red-500">م</span>
                <span className="text-orange-500">ي</span>
                <span className="text-yellow-500">ل</span>
              </span>
              <span className="block mt-2">في <span className="italic font-black">نصف</span> الوقت</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              أكثر من 50 قالب وتصميم مبني على React و TypeScript و Tailwind CSS. 
              وفر ساعات من الوقت وأنشئ متجرك الإلكتروني بسهولة.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                البدء مجاناً <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-300 px-8 py-6 text-lg rounded-xl hover:bg-gray-50 w-full sm:w-auto">
                استعراض القوالب
              </Button>
            </div>

            {/* Tech Logos */}
            <TechLogos />
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70 blur-sm"></div>
                  <span className="relative z-10 text-white font-bold text-lg">OK</span>
                </div>
                <span className="ml-2 font-bold text-xl">OKsale</span>
              </Link>
              <p className="text-gray-500 mt-2 text-sm">© 2023 OKsale. جميع الحقوق محفوظة.</p>
            </div>
            
            <div className="flex space-x-8 space-x-reverse">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">من نحن</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">تواصل معنا</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900">سياسة الخصوصية</Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">شروط الاستخدام</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
