
import React from 'react';

const TechLogos = () => {
  const logos = [
    { id: 'next', label: 'Next.js', bg: 'bg-black text-white' },
    { id: 'react', label: 'React', bg: 'bg-blue-50' },
    { id: 'ts', label: 'TS', bg: 'bg-blue-50 text-blue-600' },
    { id: 'framer', label: 'Framer', bg: 'bg-blue-50' },
    { id: 'figma', label: 'Figma', bg: 'bg-blue-50' },
    { id: 'vercel', label: '▲', bg: 'bg-blue-50' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {logos.map((logo) => (
        <div
          key={logo.id}
          className={`${logo.bg} w-10 h-10 rounded-full flex items-center justify-center font-bold`}
        >
          {logo.label.length <= 2 ? logo.label : logo.label.substring(0, 1)}
        </div>
      ))}
    </div>
  );
};

export default TechLogos;
