
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} OKsale. كل الحقوق محفوظة.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-5">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
