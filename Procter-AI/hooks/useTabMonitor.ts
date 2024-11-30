'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const MAX_TAB_SWITCHES = 5;

export function useTabMonitor() {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setTabSwitches(prev => {
          const newCount = prev + 1;
          if (newCount >= MAX_TAB_SWITCHES) {
            toast.error("Malpractice Detected", {
              description: "Maximum tab switches exceeded. Your exam has been terminated.",
            });
            router.push('/');
            return newCount;
          }
          toast.error("Tab Switch Detected", {
            description: `Warning: ${MAX_TAB_SWITCHES - newCount} switches remaining before termination.`,
          });
          return newCount;
        });
      } else {
        setIsTabActive(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  const startMonitoring = () => {
    setStartTime(Date.now());
    setTabSwitches(0);
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  };

  return {
    tabSwitches,
    isTabActive,
    startMonitoring,
    getElapsedTime,
    maxTabSwitches: MAX_TAB_SWITCHES,
  };
}