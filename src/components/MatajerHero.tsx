
import React from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroImage from './hero/HeroImage';
import HeroContent from './hero/HeroContent';

const MatajerHero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16">
      <HeroBackground />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <HeroImage />
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default MatajerHero;
