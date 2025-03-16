
import React from 'react';
import { getSocialIcon, getSocialUrl, type SocialMediaType } from '@/utils/socialMediaUtils';

interface SocialLinksProps {
  links: Array<[SocialMediaType, string]>;
  useCustomColors?: boolean;
  customColor?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  useCustomColors = false, 
  customColor = '' 
}) => {
  if (links.length === 0) return null;
  
  return (
    <div className="flex items-center gap-3 md:gap-4 mt-2">
      {links.map(([type, value]) => (
        <a 
          key={type}
          href={getSocialUrl(type, value)} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:opacity-80 transition-colors"
          title={type.charAt(0).toUpperCase() + type.slice(1)}
        >
          <span className="flex items-center justify-center bg-black/20 rounded-full p-1.5 backdrop-blur-sm">
            {getSocialIcon(type, "w-3.5 h-3.5 md:w-4 md:h-4", useCustomColors, customColor)}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
