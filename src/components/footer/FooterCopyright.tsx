
import React from 'react';

const FooterCopyright = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} منصة OKsale. جميع الحقوق محفوظة.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <img src="/lovable-uploads/13cf5172-1411-4dd8-b777-66aa1a0ab477.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
        <img src="/lovable-uploads/bfc7faae-2155-4653-8f73-1291eac768f7.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
        <img src="/lovable-uploads/e598e7d8-c8e6-4c0c-ae96-1678fbd1573d.png" alt="Payment Method" className="h-8 w-auto grayscale hover:grayscale-0 transition-all" />
      </div>
    </div>
  );
};

export default FooterCopyright;
