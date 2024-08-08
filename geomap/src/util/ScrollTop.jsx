import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const location = useLocation();  // This hook provides access to the location object

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top whenever the location changes
  }, [location.pathname]);  // Depend on pathname to trigger scroll on route change
};
