
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, StarIcon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll for features
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const features = document.querySelectorAll('.feature-card');
    features.forEach((feature) => {
      observer.observe(feature);
    });

    return () => {
      features.forEach((feature) => {
        observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كل ما تحتاجه لإدارة متجرك الإلكتروني
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              منصة متكاملة تمنحك أدوات احترافية وسهلة الاستخدام لإدارة متجرك بكفاءة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">سرعة إعداد المتجر</h3>
              <p className="text-gray-600">
                إعداد متجرك الإلكتروني خلال دقائق معدودة، مع واجهة سهلة الاستخدام وخطوات بسيطة
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card opacity-0 translate-y-10 transition-all duration-700 delay-150 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">حماية البيانات</h3>
              <p className="text-gray-600">
                أمان عالي لحماية بياناتك وبيانات عملائك مع تشفير متطور وحماية ضد الاختراق
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card opacity-0 translate-y-10 transition-all duration-700 delay-300 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">إدارة المتجر بسهولة</h3>
              <p className="text-gray-600">
                لوحة تحكم متكاملة لإدارة المنتجات، الطلبات، العملاء، والمبيعات بكل سهولة ويسر
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلتك في عالم التجارة الإلكترونية اليوم</h2>
          <p className="text-lg text-gray-300 mb-10">
            أكثر من 10,000 متجر يثقون بنا لإدارة أعمالهم عبر الإنترنت. انضم إليهم الآن وابدأ النجاح!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-xl w-full sm:w-auto">
                إنشاء حساب مجاني
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" className="border-white text-white px-8 py-6 text-lg rounded-xl hover:bg-white/10 w-full sm:w-auto">
                استكشاف المتاجر
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
