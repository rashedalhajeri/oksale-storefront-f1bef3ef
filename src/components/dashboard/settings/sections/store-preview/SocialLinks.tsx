
import React from 'react';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Globe, 
  Snapchat, 
  MessageCircle,
  TikTok
} from 'lucide-react';

export type SocialMediaType = 'instagram' | 'twitter' | 'facebook' | 'website' | 'snapchat' | 'tiktok' | 'whatsapp';

interface SocialLinksProps {
  links: Array<[SocialMediaType, string]>;
  useCustomColors?: boolean;
  customColor?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links,
  useCustomColors,
  customColor
}) => {
  if (links.length === 0) return null;
  
  const getIconForType = (type: SocialMediaType) => {
    switch (type) {
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'twitter':
        return <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'facebook':
        return <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'website':
        return <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'snapchat':
        return <Snapchat className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'tiktok':
        return <TikTok className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      {links.map(([type, url]) => (
        <a 
          key={type}
          href={type === 'whatsapp' ? `https://wa.me/${url}` : url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-shadow"
          style={useCustomColors && customColor ? { backgroundColor: `${customColor}40` } : {}}
        >
          {getIconForType(type)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
