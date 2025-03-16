
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation = ({ className }: MobileNavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { 
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: <Flame className="w-6 h-6" strokeWidth={1.5} />, 
      label: 'Feed', 
      href: '/feed' 
    },
    { 
      icon: <Mail className="w-6 h-6" strokeWidth={1.5} />, 
      label: 'Messages', 
      href: '/messages',
      hasNotification: true
    },
    { 
      icon: <User className="w-6 h-6" strokeWidth={1.5} />, 
      label: 'Profile', 
      href: '/dashboard' 
    }
  ];

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-in-out backdrop-blur-lg bg-white/80 shadow-lg",
        !isVisible ? "translate-y-full" : "translate-y-0",
        className
      )}
    >
      <nav className="flex items-center justify-around h-16 px-4 relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link 
              key={index} 
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 relative",
                isActive ? "text-black" : "text-neutral-500 hover:text-black"
              )}
            >
              <div className="relative">
                {item.icon}
                {item.hasNotification && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-1 bg-black rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;
