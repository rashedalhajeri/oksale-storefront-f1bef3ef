
import React from 'react';
import { Link } from 'react-router-dom';

const FooterQuickLinks = () => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
      <ul className="space-y-3">
        <li>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link>
        </li>
        <li>
          <Link to="/features" className="text-gray-400 hover:text-white transition-colors">المميزات</Link>
        </li>
        <li>
          <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">الأسعار</Link>
        </li>
        <li>
          <Link to="/partners" className="text-gray-400 hover:text-white transition-colors">الشركاء</Link>
        </li>
        <li>
          <Link to="/examples" className="text-gray-400 hover:text-white transition-colors">أمثلة المتاجر</Link>
        </li>
        <li>
          <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">المدونة</Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
