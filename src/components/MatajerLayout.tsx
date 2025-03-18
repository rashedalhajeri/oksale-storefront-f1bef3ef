
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from './TopBanner';
import NewNavbar from './NewNavbar';
import MatajerHero from './MatajerHero';
import MatajerFeatures from './MatajerFeatures';
import MatajerPayments from './MatajerPayments';
import MatajerPricing from './MatajerPricing';
import MerchantAppPromotion from './MerchantAppPromotion';
import StoreExamples from './StoreExamples';

const MatajerLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <NewNavbar />
      <main className="pt-16">
        <MatajerHero />
        <MatajerFeatures />
        <MatajerPayments />
        <MatajerPricing />
        <StoreExamples />
        <MerchantAppPromotion />
      </main>
    </div>
  );
};

export default MatajerLayout;
