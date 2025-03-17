
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Users, 
  ShoppingBag, 
  CreditCard,
  Star
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('entrepreneurs');

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* القسم الرئيسي Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </motion.div>
      
      {/* Stores Count Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-5 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-lg md:text-xl font-medium mb-3 md:mb-0">أكثر من 10,000 متجر يثقون بمنصتنا</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
              استكشف المتاجر
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mb-4">مميزات المنصة</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كل ما تحتاجه لإدارة متجرك الإلكتروني
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              منصة متكاملة تمنحك أدوات احترافية وسهلة الاستخدام لإدارة متجرك بكفاءة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">سرعة إعداد المتجر</h3>
              <p className="text-gray-600">
                إعداد متجرك الإلكتروني خلال دقائق معدودة، مع واجهة سهلة الاستخدام وخطوات بسيطة
              </p>
            </div>

            {/* Feature 2 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-150 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">حماية البيانات</h3>
              <p className="text-gray-600">
                أمان عالي لحماية بياناتك وبيانات عملائك مع تشفير متطور وحماية ضد الاختراق
              </p>
            </div>

            {/* Feature 3 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">إدارة المتجر بسهولة</h3>
              <p className="text-gray-600">
                لوحة تحكم متكاملة لإدارة المنتجات، الطلبات، العملاء، والمبيعات بكل سهولة ويسر
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-150 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">إدارة المنتجات</h3>
              <p className="text-gray-600">
                أضف منتجاتك بسهولة مع خيارات متعددة للتصنيف والخصائص والصور عالية الجودة
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">إدارة العملاء</h3>
              <p className="text-gray-600">
                سجل كامل لعملائك مع إمكانية التواصل معهم ومتابعة طلباتهم وتحليل سلوكهم الشرائي
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-450 ease-out bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">وسائل دفع متعددة</h3>
              <p className="text-gray-600">
                دعم لجميع وسائل الدفع الإلكترونية المحلية والعالمية لتوفير تجربة شراء سلسة للعملاء
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who Is It For Section */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Badge className="bg-indigo-800 text-indigo-100 hover:bg-indigo-700 mb-4">منصة للجميع</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              منصة مثالية لكل من
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              تناسب منصتنا مختلف الاحتياجات، من رواد الأعمال المبتدئين وحتى الشركات الكبيرة
            </p>
          </div>
          
          <Tabs defaultValue="entrepreneurs" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto bg-gray-800 p-1 rounded-xl">
              <TabsTrigger value="entrepreneurs" className="rounded-lg data-[state=active]:bg-indigo-600">رواد الأعمال</TabsTrigger>
              <TabsTrigger value="small-business" className="rounded-lg data-[state=active]:bg-indigo-600">الشركات الصغيرة</TabsTrigger>
              <TabsTrigger value="large-business" className="rounded-lg data-[state=active]:bg-indigo-600">الشركات الكبيرة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="entrepreneurs" className="mt-8 animate-in fade-in-50 duration-300">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">ابدأ مشروعك التجاري بثقة</h3>
                    <p className="text-gray-300 mb-6">
                      نوفر لرواد الأعمال كل ما يحتاجونه لبدء متجر إلكتروني ناجح دون الحاجة لمعرفة تقنية متقدمة أو استثمار كبير.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>بدء المشروع بتكلفة منخفضة وبدون رسوم إعداد</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>واجهة سهلة الاستخدام لا تتطلب خبرة تقنية</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>دعم كامل للمساعدة في بناء وتنمية المتجر</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="https://dummyimage.com/400x300/indigo/white" alt="رواد الأعمال" className="rounded-xl shadow-lg" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="small-business" className="mt-8 animate-in fade-in-50 duration-300">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">وسّع نطاق أعمالك</h3>
                    <p className="text-gray-300 mb-6">
                      نساعد الشركات الصغيرة على توسيع نطاق أعمالها عبر الإنترنت مع أدوات متقدمة لإدارة المخزون والمبيعات والتسويق.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>أدوات متكاملة لإدارة العمليات التجارية</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>تكامل مع قنوات البيع المتعددة</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>تحليلات متقدمة لتحسين الأداء وزيادة المبيعات</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="https://dummyimage.com/400x300/blue/white" alt="الشركات الصغيرة" className="rounded-xl shadow-lg" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="large-business" className="mt-8 animate-in fade-in-50 duration-300">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">حلول مؤسسية متكاملة</h3>
                    <p className="text-gray-300 mb-6">
                      نقدم للشركات الكبيرة منصة قوية ومرنة تلبي متطلباتها المعقدة مع قابلية للتخصيص وتكامل مع أنظمتها الحالية.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>API مفتوح للتكامل مع الأنظمة المؤسسية الحالية</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>دعم لنماذج الأعمال B2B وB2C</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-400 mt-0.5 ml-2" />
                        <span>إدارة متعددة للمستخدمين مع صلاحيات مختلفة</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="https://dummyimage.com/400x300/purple/white" alt="الشركات الكبيرة" className="rounded-xl shadow-lg" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">قصص نجاح</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              آراء أصحاب المتاجر الناجحة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              تعرف على تجارب حقيقية من أصحاب المتاجر الذين نجحوا باستخدام منصتنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 border-2 border-primary mb-4">
                    <AvatarImage src="https://dummyimage.com/150x150/6366f1/ffffff" />
                    <AvatarFallback>أحمد</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "بدأت متجري الإلكتروني قبل عام واحد فقط، والآن لدي مئات الطلبات شهرياً. المنصة سهلت علي إدارة كل شيء من إضافة المنتجات وحتى التوصيل."
                  </p>
                  <h3 className="font-semibold text-lg">أحمد السعيد</h3>
                  <p className="text-gray-500 text-sm">متجر للإكسسوارات الرجالية</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-150 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 border-2 border-primary mb-4">
                    <AvatarImage src="https://dummyimage.com/150x150/EC4899/ffffff" />
                    <AvatarFallback>سارة</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "كمصممة أزياء، كنت أحتاج لمنصة تظهر تصاميمي بشكل جميل وتسهل عملية الشراء. وجدت كل ما أحتاجه هنا مع دعم فني ممتاز."
                  </p>
                  <h3 className="font-semibold text-lg">سارة الأحمد</h3>
                  <p className="text-gray-500 text-sm">متجر أزياء نسائية</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 3 */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 border-2 border-primary mb-4">
                    <AvatarImage src="https://dummyimage.com/150x150/10B981/ffffff" />
                    <AvatarFallback>محمد</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "بعد تجربة العديد من المنصات، هذه هي الأفضل لأصحاب المتاجر الناشئة. التحليلات ساعدتني على فهم سلوك العملاء وزيادة المبيعات بنسبة 70%."
                  </p>
                  <h3 className="font-semibold text-lg">محمد العلي</h3>
                  <p className="text-gray-500 text-sm">متجر إلكترونيات</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">باقات الاشتراك</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              اختر الباقة المناسبة لمتجرك
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              باقات مرنة تناسب احتياجاتك مهما كان حجم متجرك، مع إمكانية الترقية في أي وقت
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative overflow-hidden border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">الباقة الأساسية</h3>
                <p className="text-gray-600 mb-6">مثالية للمبتدئين وأصحاب المتاجر الصغيرة</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">9</span>
                  <span className="text-xl ml-1">د.ك</span>
                  <span className="text-gray-500 mr-2">/شهرياً</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>حتى 50 منتج</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>تصميم أساسي للمتجر</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>دعم بالبريد الإلكتروني</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>وسائل دفع أساسية</span>
                  </li>
                </ul>
                
                <Button className="w-full">ابدأ الآن</Button>
              </div>
            </Card>
            
            {/* Pro Plan */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-150 relative overflow-hidden border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -right-12 top-6 bg-indigo-600 text-white px-10 py-1 transform rotate-45">الأكثر شعبية</div>
              <div className="p-6 pt-8">
                <h3 className="text-xl font-bold mb-2">الباقة الاحترافية</h3>
                <p className="text-gray-600 mb-6">مثالية للمتاجر المتوسطة والنامية</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">29</span>
                  <span className="text-xl ml-1">د.ك</span>
                  <span className="text-gray-500 mr-2">/شهرياً</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>حتى 500 منتج</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>تصميم متقدم للمتجر</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>دعم فني على مدار الساعة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>تقارير وتحليلات متقدمة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>جميع وسائل الدفع المحلية والعالمية</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">اختر هذه الباقة</Button>
              </div>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300 relative overflow-hidden border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">باقة الشركات</h3>
                <p className="text-gray-600 mb-6">مثالية للشركات الكبيرة والمتاجر المتطورة</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">99</span>
                  <span className="text-xl ml-1">د.ك</span>
                  <span className="text-gray-500 mr-2">/شهرياً</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>عدد غير محدود من المنتجات</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>تصميم مخصص بالكامل</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>مدير حساب مخصص</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>API مفتوح للتكامل مع الأنظمة الأخرى</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                    <span>تكامل مع أنظمة ERP وCRM</span>
                  </li>
                </ul>
                
                <Button className="w-full">تواصل معنا</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">متوفر الآن</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                أدر متجرك من هاتفك المحمول
              </h2>
              <p className="text-lg text-white/80 mb-8">
                تطبيق الجوال المتكامل يتيح لك إدارة متجرك بكفاءة من أي مكان. راقب المبيعات، وأضف المنتجات، وتفاعل مع العملاء، كل ذلك من هاتفك.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-indigo-900 hover:bg-white/90">
                  <img src="https://dummyimage.com/20x20/000/fff" alt="Apple App Store" className="mr-2 h-5 w-5" />
                  تحميل للايفون
                </Button>
                <Button className="bg-white text-indigo-900 hover:bg-white/90">
                  <img src="https://dummyimage.com/20x20/000/fff" alt="Google Play Store" className="mr-2 h-5 w-5" />
                  تحميل للاندرويد
                </Button>
              </div>
            </div>
            <div className="flex justify-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-150">
              <img 
                src="https://dummyimage.com/300x600/6366f1/ffffff" 
                alt="تطبيق الجوال" 
                className="max-w-xs rounded-3xl shadow-2xl border-8 border-white/10" 
              />
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
