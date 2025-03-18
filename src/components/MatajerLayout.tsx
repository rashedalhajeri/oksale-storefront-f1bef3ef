
import React from 'react';
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

const MatajerLayout = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-white`} dir={isRTL ? 'rtl' : 'ltr'}>
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
