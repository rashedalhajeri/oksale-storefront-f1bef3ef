
import React from 'react';
import { 
  User,
  Instagram, 
  Twitter, 
  Facebook 
} from 'lucide-react';

interface StoreAboutProps {
  store: {
    description: string;
    socialLinks: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

const StoreAbout = ({ store }: StoreAboutProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800 flex items-center">
        <User className="w-5 h-5 mr-2 text-indigo-600" />
        About the Store
      </h2>
      <p className="text-neutral-600 leading-relaxed">{store.description}</p>
      
      <div className="mt-6 pt-6 border-t border-neutral-100">
        <h3 className="text-lg font-medium mb-3 text-neutral-800">Connect with us</h3>
        <div className="flex gap-3">
          {Object.entries(store.socialLinks).map(([platform, url]) => (
            <a 
              key={platform} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
            >
              <span className="sr-only">{platform}</span>
              {platform === 'instagram' && <Instagram className="w-5 h-5" />}
              {platform === 'twitter' && <Twitter className="w-5 h-5" />}
              {platform === 'facebook' && <Facebook className="w-5 h-5" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreAbout;
