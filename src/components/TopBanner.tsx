
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBanner = () => {
  return (
    <div className="bg-black text-white py-2.5 text-center px-4">
      <Link to="/signup" className="inline-flex items-center justify-center hover:underline">
        <Sparkles className="h-4 w-4 ml-2 text-yellow-300" />
        <span>احصل على متجرك الإلكتروني الآن!</span>
        <ArrowRight className="h-4 w-4 mr-2" />
      </Link>
    </div>
  );
};

export default TopBanner;
