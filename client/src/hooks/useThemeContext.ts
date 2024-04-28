import { useContext } from 'react';
import { ThemeProviderContext } from '@/contexts/ThemeContext';

const useThemeContext = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export default useThemeContext;
