
import React from 'react';
import { getSocialIcon, getSocialUrl, type SocialMediaType } from '@/utils/socialMediaUtils';

interface SocialLinksProps {
  links: Array<[SocialMediaType, string]>;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (links.length === 0) return null;
  
  return (
    <div className="flex items-center gap-3 md:gap-4 mt-2">
      {links.map(([type, value]) => (
        <a 
          key={type}
          href={getSocialUrl(type, value)} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-blue-200 transition-colors"
        >
          <span className="flex">
            {getSocialIcon(type, "w-4 h-4 md:w-5 md:h-5")}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
