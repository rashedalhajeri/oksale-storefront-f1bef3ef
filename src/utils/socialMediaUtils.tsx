
import React from 'react';
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaSnapchatGhost, 
  FaTiktok, 
  FaWhatsapp, 
  FaGlobe 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Type for social media platforms
export type SocialMediaType = 'instagram' | 'twitter' | 'facebook' | 'website' | 'snapchat' | 'tiktok' | 'whatsapp';

// Platform configuration with proper colors and icons
export const socialMediaPlatforms = {
  instagram: {
    label: 'Instagram',
    color: '#E1306C',
    icon: <FaInstagram />,
    urlPrefix: 'https://instagram.com/',
    placeholder: 'yourusername',
    helperText: 'أدخل اسم المستخدم فقط بدون @'
  },
  twitter: {
    label: 'X (Twitter)',
    color: '#000000',
    icon: <FaXTwitter />,
    urlPrefix: 'https://twitter.com/',
    placeholder: 'yourusername',
    helperText: 'أدخل اسم المستخدم فقط بدون @'
  },
  facebook: {
    label: 'Facebook',
    color: '#1877F2',
    icon: <FaFacebookF />,
    urlPrefix: 'https://facebook.com/',
    placeholder: 'yourusername',
    helperText: 'أدخل اسم الصفحة أو المعرف'
  },
  snapchat: {
    label: 'Snapchat',
    color: '#FFFC00',
    icon: <FaSnapchatGhost />,
    urlPrefix: 'https://snapchat.com/add/',
    placeholder: 'yourusername',
    helperText: 'أدخل اسم المستخدم فقط بدون @'
  },
  tiktok: {
    label: 'TikTok',
    color: '#000000',
    icon: <FaTiktok />,
    urlPrefix: 'https://tiktok.com/@',
    placeholder: 'yourusername',
    helperText: 'أدخل اسم المستخدم فقط بدون @'
  },
  whatsapp: {
    label: 'WhatsApp',
    color: '#25D366',
    icon: <FaWhatsapp />,
    urlPrefix: 'https://wa.me/',
    placeholder: '966512345678',
    helperText: 'أدخل رقم الهاتف مع رمز الدولة (مثال: 966512345678)'
  },
  website: {
    label: 'Website',
    color: '#4B5563',
    icon: <FaGlobe />,
    urlPrefix: '',
    placeholder: 'https://www.yourwebsite.com',
    helperText: 'أدخل الرابط كاملاً بما في ذلك https://'
  }
};

// Get proper URL for each platform
export const getSocialUrl = (type: SocialMediaType, value: string): string => {
  if (!value) return '';
  
  // If already a URL, return as is
  if (value.startsWith('http')) return value;
  
  const platform = socialMediaPlatforms[type];
  if (type === 'website') {
    return value.startsWith('http') ? value : `https://${value}`;
  }
  
  return `${platform.urlPrefix}${value}`;
};

// Get icon for a platform with custom styling
export const getSocialIcon = (type: SocialMediaType, className: string = ''): JSX.Element => {
  const platform = socialMediaPlatforms[type] || socialMediaPlatforms.website;
  
  return React.cloneElement(platform.icon as React.ReactElement, {
    className: className,
    style: { color: platform.color }
  });
};

// Get display label for a platform
export const getSocialLabel = (type: SocialMediaType): string => {
  return socialMediaPlatforms[type]?.label || type;
};

// Get helper text for input fields
export const getHelperText = (type: SocialMediaType): string => {
  return socialMediaPlatforms[type]?.helperText || '';
};

// Get placeholder for input fields
export const getPlaceholder = (type: SocialMediaType): string => {
  return socialMediaPlatforms[type]?.placeholder || '';
};

// Get all available platforms as an array
export const getAvailablePlatforms = () => {
  return Object.entries(socialMediaPlatforms).map(([type, data]) => ({
    type: type as SocialMediaType,
    label: data.label,
    icon: data.icon,
    color: data.color
  }));
};

export default {
  getSocialUrl,
  getSocialIcon,
  getSocialLabel,
  getHelperText,
  getPlaceholder,
  getAvailablePlatforms,
  platforms: socialMediaPlatforms
};
