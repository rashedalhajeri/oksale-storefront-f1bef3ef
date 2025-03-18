
import React from 'react';
import FooterLogoSection from './footer/FooterLogoSection';
import FooterQuickLinks from './footer/FooterQuickLinks';
import FooterLegalLinks from './footer/FooterLegalLinks';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterCopyright from './footer/FooterCopyright';

const MatajerFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FooterLogoSection />
          <FooterQuickLinks />
          <FooterLegalLinks />
          <FooterContactInfo />
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default MatajerFooter;
