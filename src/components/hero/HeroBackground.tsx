
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-40 left-20">
        <div className="w-8 h-8 text-teal-400">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-40 right-20">
        <div className="w-6 h-6 text-teal-400">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4">
        <div className="w-5 h-5 text-teal-300">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L20 12M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBackground;
