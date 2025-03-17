
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
          style={{ 
            backgroundImage: "url('/lovable-uploads/46d958e9-880d-4522-8850-0a5dfa8e95bc.png')",
            opacity: 0.9
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pt-20 pb-32 lg:px-8 lg:pt-32 lg:pb-40 max-w-5xl mx-auto">
          <div className="mx-auto max-w-2xl">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                التجارة الإلكترونية بأبسط الطرق وأحدث التقنيات <Link to="/explore" className="font-semibold text-indigo-600 inline-flex items-center"><span className="absolute inset-0" aria-hidden="true" />اكتشف المزيد <ArrowRight className="h-3 w-3 ml-1" /></Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                أطلق متجرك الإلكتروني في دقائق
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                منصة OKsale تساعدك على إنشاء متجر إلكتروني احترافي بسهولة تامة، مع أدوات متكاملة لإدارة المنتجات والمبيعات والعملاء.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/signup">
                  <Button size="lg" className="rounded-full bg-black hover:bg-gray-800 text-white">
                    إنشاء حساب مجاني <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/signin" className="text-sm font-semibold leading-6 text-gray-900">
                  تسجيل الدخول <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">تجارة سهلة</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">كل ما تحتاجه لنجاح متجرك</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              توفر منصتنا جميع الأدوات والميزات التي تحتاجها لإنشاء وإدارة متجر إلكتروني ناجح.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  واجهة سهلة الاستخدام
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  تصميم بسيط وسهل الاستخدام يتيح لك إدارة متجرك دون الحاجة إلى مهارات تقنية متقدمة.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Star className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  تحليلات متقدمة
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  احصل على رؤى وتحليلات دقيقة حول أداء متجرك لاتخاذ قرارات أفضل وتحسين المبيعات.
                </dd>
              </div>

              {/* Add more features as needed */}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/about" className="text-gray-400 hover:text-gray-500">
              من نحن
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-gray-500">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-500">
              شروط الاستخدام
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2023 OKsale. كل الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
