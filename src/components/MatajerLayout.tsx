
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from './TopBanner';
import OKsaleHeader from './header/OKsaleHeader';
import MatajerHero from './MatajerHero';
import MatajerFeatures from './MatajerFeatures';
import MatajerPayments from './MatajerPayments';
import StoreExamples from './StoreExamples';
import MatajerPricing from './MatajerPricing';
import MerchantAppPromotion from './MerchantAppPromotion';
import MatajerFooter from './MatajerFooter';

const MatajerLayout = () => {
  return (
    <div className="min-h-screen bg-white">
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
