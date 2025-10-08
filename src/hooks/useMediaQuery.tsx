import { useState, useEffect } from "react";

export const useMediaQuery = (query: number) => {
  const [matches, setMatches] = useState(true); // Default to true for mobile-first approach

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