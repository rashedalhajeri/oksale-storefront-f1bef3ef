
import React from 'react';

const FooterCopyright = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} منصة متاجر. جميع الحقوق محفوظة.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <img src="/placeholder.svg" alt="Payment Method" className="h-8 w-auto" />
        <img src="/placeholder.svg" alt="Payment Method" className="h-8 w-auto" />
        <img src="/placeholder.svg" alt="Payment Method" className="h-8 w-auto" />
      </div>
    </div>
  );
};

export default FooterCopyright;
