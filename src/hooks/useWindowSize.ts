import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * Hook that tracks window size
 * @returns Object with current window width and height
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

/**
 * Hook for responsive breakpoints based on Tailwind CSS defaults
 * @returns Object with boolean flags for different screen sizes
 */
export function useBreakpoint() {
  const { width } = useWindowSize();
  
  return {
    isMobile: width ? width < 768 : false,
    isTablet: width ? width >= 768 && width < 1024 : false,
    isDesktop: width ? width >= 1024 : false,
    isLarge: width ? width >= 1280 : false,
    isXLarge: width ? width >= 1536 : false,
    width,
    // Specific breakpoint checks
    sm: width ? width >= 640 : false,
    md: width ? width >= 768 : false,
    lg: width ? width >= 1024 : false,
    xl: width ? width >= 1280 : false,
    '2xl': width ? width >= 1536 : false,
  };
}

/**
 * Hook that returns true if screen is mobile size
 * @param breakpoint - Custom breakpoint (default: 768px)
 * @returns Boolean indicating if screen is mobile size
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const { width } = useWindowSize();
  return width ? width < breakpoint : false;
}

/**
 * Hook for orientation detection
 * @returns Object with orientation information
 */
export function useOrientation() {
  const { width, height } = useWindowSize();
  
  return {
    isPortrait: width && height ? height > width : false,
    isLandscape: width && height ? width > height : false,
    orientation: width && height ? (height > width ? 'portrait' : 'landscape') : undefined
  };
}

/**
 * Hook that tracks if window has been resized recently
 * @param delay - Delay after resize stops (default: 100ms)
 * @returns Boolean indicating if window is currently being resized
 */
export function useIsResizing(delay: number = 100): boolean {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsResizing(false), delay);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isResizing;
}