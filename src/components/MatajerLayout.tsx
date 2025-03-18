
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import OKsaleHeader from './header/OKsaleHeader';
import MatajerHero from './MatajerHero';
import MatajerFeatures from './MatajerFeatures';
import MatajerPayments from './MatajerPayments';
import StoreExamples from './StoreExamples';
import MatajerPricing from './MatajerPricing';
import MerchantAppPromotion from './MerchantAppPromotion';
import MatajerFooter from './MatajerFooter';
import TopBanner from './TopBanner';
import { useLanguage } from '@/context/LanguageContext';

const MatajerLayout: React.FC = () => {
  const { language, isRTL } = useLanguage();

  // Set the document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <div className={`min-h-screen bg-white`} dir={isRTL ? 'rtl' : 'ltr'}>
      <TopBanner />
      <OKsaleHeader />
      <main className="pt-16">
        <MatajerHero />
        <MatajerFeatures />
        <MatajerPayments />
        <StoreExamples />
        <MatajerPricing />
        <MerchantAppPromotion />
        <Outlet />
      </main>
      <MatajerFooter />
    </div>
  );
};

export default MatajerLayout;
