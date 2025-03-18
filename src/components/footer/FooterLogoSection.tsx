
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterLogoSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-matajer-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">م</span>
        </div>
        <span className="font-bold text-2xl text-white">متاجر</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        منصة متاجر للتجارة الإلكترونية هي منصة سعودية متكاملة تساعدك على إنشاء متجرك الإلكتروني واحترافي بكل سهولة.
      </p>
      <div className="flex gap-4 pt-2">
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default FooterLogoSection;
