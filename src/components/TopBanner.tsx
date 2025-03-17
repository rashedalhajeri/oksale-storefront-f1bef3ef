
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBanner = () => {
  return (
    <div className="bg-black text-white py-2 text-center px-4">
      <Link to="/signup" className="inline-flex items-center justify-center hover:underline">
        <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
        <span>انضم إلى برنامج الشركاء واكسب ما يصل إلى 149$ على كل بيع!</span>
        <ArrowRight className="h-4 w-4 ml-2" />
      </Link>
    </div>
  );
};

export default TopBanner;
