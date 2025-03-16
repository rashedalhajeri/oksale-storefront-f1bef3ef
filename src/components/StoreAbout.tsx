
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreAboutProps {
  store: {
    description: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-neutral-800">About</h2>
      
      {store.description && (
        <p className="text-neutral-600 mb-6 leading-relaxed">{store.description}</p>
      )}
      
      {Object.values(socialLinks).some(Boolean) && (
        <div className="flex flex-wrap gap-3">
          {socialLinks.instagram && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              onClick={() => window.open(`https://instagram.com/${socialLinks.instagram}`, '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2 text-pink-500" />
              Instagram
            </Button>
          )}
          
          {socialLinks.twitter && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              onClick={() => window.open(`https://twitter.com/${socialLinks.twitter}`, '_blank')}
            >
              <Twitter className="w-4 h-4 mr-2 text-blue-400" />
              Twitter
            </Button>
          )}
          
          {socialLinks.facebook && (
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              onClick={() => window.open(`https://facebook.com/${socialLinks.facebook}`, '_blank')}
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Facebook
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreAbout;
