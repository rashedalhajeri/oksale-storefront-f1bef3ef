
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home, Search, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation = ({ className }: MobileNavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { handle } = useParams<{ handle: string }>();
  const [cartCount, setCartCount] = useState(3); // Start with 3 items for demo

  // Query for store data to ensure navigation is store-specific
  const { data: storeData } = useQuery({
    queryKey: ['store-basic', handle],
    queryFn: async () => {
      if (!handle) return null;
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const { data, error } = await supabase
        .from('stores')
        .select('id, handle')
        .eq('handle', cleanHandle)
        .single();
      
      if (error) {
        console.error('Error fetching store data for navigation:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!handle
  });

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

  // Get the base path for store-specific links
  const getStoreBasePath = () => {
    if (!handle) return '';
    return `/${handle.startsWith('@') ? handle.slice(1) : handle}`;
  };

  const storeBasePath = getStoreBasePath();

  const navItems = [
    { 
      icon: <Home className="w-6 h-6" strokeWidth={1.5} />, 
      href: storeBasePath || '/' 
    },
    { 
      icon: <Search className="w-6 h-6" strokeWidth={1.5} />, 
      href: `${storeBasePath}/search` 
    },
    { 
      icon: <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />, 
      href: `${storeBasePath}/cart`,
      hasBadge: true,
      badgeCount: cartCount
    },
    { 
      icon: <ClipboardList className="w-6 h-6" strokeWidth={1.5} />, 
      href: `${storeBasePath}/orders` 
    },
    { 
      icon: <User className="w-6 h-6" strokeWidth={1.5} />, 
      href: `${storeBasePath}/account` 
    }
  ];

  // If there's an error with store data or we're on a non-store page, 
  // redirect to the error page or store homepage
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!storeData && handle) {
      e.preventDefault();
      window.location.href = storeBasePath || '/';
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-in-out backdrop-blur-md bg-white/60 shadow-lg",
        !isVisible ? "translate-y-full" : "translate-y-0",
        className
      )}
    >
      <nav className="flex items-center justify-around h-16 px-4 relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          const isCart = item.href.includes('/cart');
          
          return (
            <Link 
              key={index} 
              to={item.href}
              onClick={(e) => handleNavLinkClick(e, item.href)}
              className={cn(
                "relative p-2 flex items-center justify-center",
                isActive ? "text-black" : "text-neutral-500 hover:text-black",
                isCart ? "bg-neutral-100/80 rounded-full p-3 -mt-4 shadow-sm" : ""
              )}
            >
              <div className="relative">
                {item.icon}
                {item.hasBadge && item.badgeCount > 0 && (
                  <Badge 
                    className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white border-white border"
                  >
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </Badge>
                )}
              </div>
              {isActive && !isCart && (
                <div className="absolute bottom-0 w-6 h-1 bg-black rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;
