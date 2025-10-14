"use client";

import { useState, useEffect } from "react";

export const useMediaQuery = (query: number) => {
  const [matches, setMatches] = useState(false); // Default to false to avoid SSR hydration mismatch

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const media = window.matchMedia(`(max-width: ${query}px)`);
      const listener = () => setMatches(media.matches);

      listener();
      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;