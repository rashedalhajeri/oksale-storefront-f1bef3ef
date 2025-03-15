
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-oksale-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-oksale-500 text-sm">
            © {new Date().getFullYear()} OKsale. كل الحقوق محفوظة.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-oksale-600 hover:text-oksale-800 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-oksale-600 hover:text-oksale-800 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-oksale-600 hover:text-oksale-800 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
