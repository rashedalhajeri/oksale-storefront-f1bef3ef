
import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

// Helper function to convert hex to RGBA
const hexToRgba = (hex: string, alpha = 1) => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return the rgba value
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const useThemeColors = (storeId?: string) => {
  const [customColor, setCustomColor] = useState<string>('#6366f1'); // Default indigo color
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colors, setColors] = useState({
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#a5b4fc',
    primaryRgba: 'rgba(99, 102, 241, 0.2)',
    secondaryRgba: 'rgba(168, 85, 247, 0.2)',
  });

  useEffect(() => {
    // This could be used to load the custom color from settings or localStorage
    // For now we'll just use the default
    
    // Update all color variants when customColor changes
    setColors({
      primary: customColor,
      primaryDark: adjustColor(customColor, -20),
      primaryLight: adjustColor(customColor, 20),
      primaryRgba: hexToRgba(customColor, 0.2),
      secondaryRgba: hexToRgba(adjustColor(customColor, 40), 0.2),
    });
    
    // Apply CSS custom properties for global usage
    document.documentElement.style.setProperty('--color-primary', customColor);
    document.documentElement.style.setProperty('--color-primary-dark', colors.primaryDark);
    document.documentElement.style.setProperty('--color-primary-light', colors.primaryLight);
    document.documentElement.style.setProperty('--color-primary-rgba', colors.primaryRgba);
  }, [customColor]);

  // Function to adjust color brightness
  function adjustColor(color: string, amount: number): string {
    return '#' + color.replace(/^#/, '').replace(/../g, (color) => 
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
  }

  // Function to update theme colors in the database
  const updateThemeColors = async (useCustom: boolean, color: string) => {
    if (!storeId) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stores')
        .update({
          use_custom_colors: useCustom,
          custom_color: color
        })
        .eq('id', storeId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating theme colors:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    customColor, 
    setCustomColor,
    useCustomColors,
    setUseCustomColors,
    isLoading,
    colors,
    updateThemeColors,
    // Utility function to create gradients
    createGradient: (startColor = customColor, endColor = adjustColor(customColor, 40)) => 
      `linear-gradient(to right, ${startColor}, ${endColor})`
  };
};

