
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, Search, User } from 'lucide-react';
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
      icon: <Home className="w-5 h-5" />, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      label: 'Orders', 
      href: '/dashboard/orders' 
    },
    { 
      icon: <ShoppingCart className="w-5 h-5" />, 
      label: 'Cart', 
      href: '/cart' 
    },
    { 
      icon: <Search className="w-5 h-5" />, 
      label: 'Search', 
      href: '/search' 
    },
    { 
      icon: <User className="w-5 h-5" />, 
      label: 'Account', 
      href: '/dashboard' 
    }
  ];

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-in-out border-t border-neutral-200 backdrop-blur-lg bg-black/90 shadow-lg",
        !isVisible ? "translate-y-full" : "translate-y-0",
        className
      )}
    >
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link 
              key={index} 
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
                isActive 
                  ? "text-white" 
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <div className={cn(
                "mb-1 relative",
                isActive && "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full"
              )}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;
