
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLegalLinks = () => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">معلومات قانونية</h3>
      <ul className="space-y-3">
        <li>
          <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">شروط الاستخدام</Link>
        </li>
        <li>
          <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</Link>
        </li>
        <li>
          <Link to="/refund" className="text-gray-400 hover:text-white transition-colors">سياسة الاسترجاع</Link>
        </li>
        <li>
          <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterLegalLinks;
