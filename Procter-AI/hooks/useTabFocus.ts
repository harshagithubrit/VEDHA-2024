'use client';

import { useState, useEffect } from 'react';

export function useTabFocus() {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setTabSwitches(prev => prev + 1);
      } else {
        setIsTabActive(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    tabSwitches,
    isTabActive,
  };
}