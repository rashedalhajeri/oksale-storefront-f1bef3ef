import React from 'react';
import { User, Instagram, Twitter, Facebook } from 'lucide-react';
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
const StoreAbout = ({
  store
}: StoreAboutProps) => {
  return;
};
export default StoreAbout;