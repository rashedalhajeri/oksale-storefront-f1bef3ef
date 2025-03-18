
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const FooterContactInfo = () => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-matajer-500" />
          <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
        </li>
        <li className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-matajer-500" />
          <span className="text-gray-400">+966 123 456 789</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-matajer-500" />
          <span className="text-gray-400">info@matajer.com</span>
        </li>
      </ul>
    </div>
  );
};

export default FooterContactInfo;
