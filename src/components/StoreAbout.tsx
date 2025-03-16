
import React from 'react';
import { Instagram, Twitter, Facebook, Globe, SnapchatGhost, Video, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreAboutProps {
  store: {
    description: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      website?: string;
      snapchat?: string;
      tiktok?: string;
      whatsapp?: string;
    };
  };
}

const StoreAbout = ({ store }: StoreAboutProps) => {
  // Ensure we have valid socialLinks object
  const socialLinks = store.socialLinks || {};
  
  // Only show section if there's a description or social links
  if (!store.description && !Object.values(socialLinks).some(Boolean)) {
    return null;
  }

  // Get appropriate icon for each platform
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram': return <Instagram className="w-4 h-4 mr-2 text-pink-500" />;
      case 'twitter': return <Twitter className="w-4 h-4 mr-2 text-blue-400" />;
      case 'facebook': return <Facebook className="w-4 h-4 mr-2 text-blue-600" />;
      case 'website': return <Globe className="w-4 h-4 mr-2 text-gray-600" />;
      case 'snapchat': return <SnapchatGhost className="w-4 h-4 mr-2 text-yellow-400" />;
      case 'tiktok': return <Video className="w-4 h-4 mr-2 text-black" />;
      case 'whatsapp': return <Phone className="w-4 h-4 mr-2 text-green-500" />;
      default: return null;
    }
  };

  // Get proper URL for each platform
  const getSocialUrl = (type: string, value: string) => {
    if (value.startsWith('http')) return value;
    
    switch (type) {
      case 'instagram': return `https://instagram.com/${value}`;
      case 'twitter': return `https://twitter.com/${value}`;
      case 'facebook': return `https://facebook.com/${value}`;
      case 'snapchat': return `https://snapchat.com/add/${value}`;
      case 'tiktok': return `https://tiktok.com/@${value}`;
      case 'whatsapp': return `https://wa.me/${value}`;
      case 'website': return value.startsWith('http') ? value : `https://${value}`;
      default: return value;
    }
  };

  // Get display name for each platform
  const getSocialLabel = (type: string) => {
    switch (type) {
      case 'instagram': return 'Instagram';
      case 'twitter': return 'X (Twitter)';
      case 'facebook': return 'Facebook';
      case 'snapchat': return 'Snapchat';
      case 'tiktok': return 'TikTok';
      case 'whatsapp': return 'WhatsApp';
      case 'website': return 'Website';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-neutral-800">About</h2>
      
      {store.description && (
        <p className="text-neutral-600 mb-6 leading-relaxed">{store.description}</p>
      )}
      
      {Object.entries(socialLinks).some(([_, value]) => !!value) && (
        <div className="flex flex-wrap gap-3">
          {Object.entries(socialLinks).map(([type, value]) => {
            if (!value) return null;
            
            return (
              <Button
                key={type}
                variant="outline"
                size="sm"
                className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                onClick={() => window.open(getSocialUrl(type, value), '_blank')}
              >
                {getSocialIcon(type)}
                {getSocialLabel(type)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoreAbout;
