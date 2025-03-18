
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StoreExample from './StoreExample';
import { storeExamplesData } from './StoreExamplesData';

const StoreExamplesSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(storeExamplesData.length / 4);
  
  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: currentPage * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);
  
  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto py-8 space-x-6 space-x-reverse hide-scrollbar"
      >
        {storeExamplesData.map((store, index) => (
          <StoreExample key={store.id} store={store} index={index} />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      
      <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div 
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentPage === index ? 'bg-matajer-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreExamplesSlider;
