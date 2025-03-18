
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, PhoneCall, MapPin } from 'lucide-react';

const MatajerFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <div className="flex items-center justify-start mb-4">
              <span className="text-2xl font-bold text-oksale-600">OK<span className="text-indigo-800">sale</span></span>
            </div>
            <p className="text-gray-600 mb-6">
              منصة متكاملة للتجارة الإلكترونية تساعدك على بناء متجرك الخاص بسهولة وسرعة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all text-oksale-600 hover:text-oksale-700">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all text-oksale-600 hover:text-oksale-700">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all text-oksale-600 hover:text-oksale-700">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-oksale-600 transition-colors">الرئيسية</Link></li>
              <li><Link to="/features" className="text-gray-600 hover:text-oksale-600 transition-colors">المميزات</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-oksale-600 transition-colors">الأسعار</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-oksale-600 transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-oksale-600 transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">الشروط والأحكام</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-gray-600 hover:text-oksale-600 transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-oksale-600 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/refund" className="text-gray-600 hover:text-oksale-600 transition-colors">سياسة الاسترجاع</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-oksale-600 transition-colors">سياسة ملفات الارتباط</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="ml-2 w-5 h-5 text-oksale-600" />
                <a href="mailto:info@oksale.com" className="text-gray-600 hover:text-oksale-600 transition-colors">info@oksale.com</a>
              </li>
              <li className="flex items-center">
                <PhoneCall className="ml-2 w-5 h-5 text-oksale-600" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-oksale-600 transition-colors">+123 456 7890</a>
              </li>
              <li className="flex items-center">
                <MapPin className="ml-2 w-5 h-5 text-oksale-600" />
                <span className="text-gray-600">الكويت، الشرق، شارع أحمد الجابر</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-200 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} منصة OKsale. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <img src="/lovable-uploads/13cf5172-1411-4dd8-b777-66aa1a0ab477.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/lovable-uploads/bfc7faae-2155-4653-8f73-1291eac768f7.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="/lovable-uploads/e598e7d8-c8e6-4c0c-ae96-1678fbd1573d.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MatajerFooter;
