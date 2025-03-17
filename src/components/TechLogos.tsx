
import React from 'react';

const TechLogos = () => {
  const logos = [
    { id: 'next', label: 'Next.js', bg: 'bg-black', textColor: 'text-white' },
    { id: 'react', label: 'React', bg: 'bg-[#61DAFB]/10', textColor: 'text-[#61DAFB]' },
    { id: 'ts', label: 'TS', bg: 'bg-[#3178C6]/10', textColor: 'text-[#3178C6]' },
    { id: 'tailwind', label: 'TW', bg: 'bg-[#38BDF8]/10', textColor: 'text-[#38BDF8]' },
    { id: 'framer', label: 'FM', bg: 'bg-[#0055FF]/10', textColor: 'text-[#0055FF]' },
    { id: 'vercel', label: '▲', bg: 'bg-black', textColor: 'text-white' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {logos.map((logo) => (
        <div
          key={logo.id}
          className={`${logo.bg} ${logo.textColor} w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm`}
        >
          {logo.label.length <= 2 ? logo.label : logo.label.substring(0, 1)}
        </div>
      ))}
    </div>
  );
};

export default TechLogos;
