
import React, { useEffect, useState } from 'react';
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

const MatajerLayout = () => {
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    // Check stored language preference
    const storedLang = localStorage.getItem('app-language');
    if (storedLang === 'en') {
      setDirection('ltr');
    } else {
      setDirection('rtl');
    }

    // Add listener for language changes
    const handleStorageChange = () => {
      const currentLang = localStorage.getItem('app-language');
      setDirection(currentLang === 'en' ? 'ltr' : 'rtl');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Additional listener for same-window changes
    document.addEventListener('languageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('languageChange', handleStorageChange);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-white`} dir={direction}>
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
