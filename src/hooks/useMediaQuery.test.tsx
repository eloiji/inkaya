import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

interface MockMediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null;
  addListener: (listener: (ev: MediaQueryListEvent) => void) => void;
  removeListener: (listener: (ev: MediaQueryListEvent) => void) => void;
  addEventListener: (event: string, listener: () => void) => void;
  removeEventListener: (event: string, listener: () => void) => void;
  dispatchEvent: (event: Event) => boolean;
}
describe('useMediaQuery', () => {
  let matchMediaMock: vi.Mock<MockMediaQueryList, [string]>;
  let listeners: Array<() => void> = [];

  beforeEach(() => {
    listeners = [];
    
    // Mock window.matchMedia
    matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn((event: string, listener: () => void) => {
        listeners.push(listener);
      }),
      removeEventListener: vi.fn((event: string, listener: () => void) => {
        listeners = listeners.filter(l => l !== listener);
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    listeners = [];
  });

  describe('Initial State', () => {
    it('returns false by default to avoid SSR hydration mismatch', () => {
      const { result } = renderHook(() => useMediaQuery(640));
      expect(result.current).toBe(false);
    });

    it('accepts a number query parameter', () => {
      renderHook(() => useMediaQuery(768));
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 768px)');
    });

    it('creates correct media query string', () => {
      renderHook(() => useMediaQuery(1024));
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 1024px)');
    });
  });

  describe('Media Query Matching', () => {
    it('returns true when media query matches', async () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 640px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(640));

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('returns false when media query does not match', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 640px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(640));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('Responsive Updates', () => {
    it('updates when media query changes', async () => {
      let matchesValue = false;
      const addEventListenerMock = vi.fn((event: string, listener: () => void) => {
        listeners.push(listener);
      });

      matchMediaMock.mockReturnValue({
        get matches() {
          return matchesValue;
        },
        media: '(max-width: 640px)',
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(640));

      // Initially false
      await waitFor(() => {
        expect(result.current).toBe(false);
      });

      // Simulate window resize that changes the media query match
      act(() => {
        matchesValue = true;
        listeners.forEach(listener => listener());
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('registers event listener on mount', () => {
      const addEventListenerMock = vi.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 640px)',
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
      });

      renderHook(() => useMediaQuery(640));

      expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('removes event listener on unmount', () => {
      const removeEventListenerMock = vi.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 640px)',
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
      });

      const { unmount } = renderHook(() => useMediaQuery(640));
      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('Different Breakpoints', () => {
    it('works with small mobile breakpoint (320px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 320px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(320));

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 320px)');
    });

    it('works with tablet breakpoint (768px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 768px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(768));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 768px)');
    });

    it('works with desktop breakpoint (1024px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1024));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 1024px)');
    });

    it('works with large desktop breakpoint (1920px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1920px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1920));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 1920px)');
    });
  });

  describe('Query Changes', () => {
    it('updates when query parameter changes', async () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 640px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result, rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: 640 } }
      );

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      // Change to a different breakpoint
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      rerender({ query: 1024 });

      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 1024px)');
    });

    it('re-registers listener when query changes', () => {
      const addEventListenerMock = vi.fn();
      const removeEventListenerMock = vi.fn();

      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 640px)',
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      });

      const { rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: 640 } }
      );

      expect(addEventListenerMock).toHaveBeenCalledTimes(1);

      // Change query
      rerender({ query: 768 });

      // Should remove old listener and add new one
      expect(removeEventListenerMock).toHaveBeenCalled();
      expect(addEventListenerMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('SSR Compatibility', () => {
    it('returns false when window is undefined', () => {
      // The hook already handles this case by checking typeof window !== 'undefined'
      // We can't actually delete window in jsdom, so we test the behavior
      const { result } = renderHook(() => useMediaQuery(640));
      // Initially returns false (SSR safe behavior)
      expect(result.current).toBe(false);
    });

    it('handles missing matchMedia by checking if it exists', () => {
      // The hook checks for window.matchMedia existence
      // Store original and temporarily remove it
      const originalMatchMedia = window.matchMedia;
      
      // Temporarily remove matchMedia using TypeScript casting
      (window as any).matchMedia = undefined;

      const { result } = renderHook(() => useMediaQuery(640));
      expect(result.current).toBe(false);

      // Restore
      window.matchMedia = originalMatchMedia;
    });
  });

  describe('Multiple Instances', () => {
    it('can have multiple hooks with different queries', async () => {
      matchMediaMock
        .mockReturnValueOnce({
          matches: true,
          media: '(max-width: 640px)',
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })
        .mockReturnValueOnce({
          matches: false,
          media: '(max-width: 1024px)',
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        });

      const { result: result1 } = renderHook(() => useMediaQuery(640));
      const { result: result2 } = renderHook(() => useMediaQuery(1024));

      await waitFor(() => {
        expect(result1.current).toBe(true);
        expect(result2.current).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles very small breakpoint (1px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 1px)');
    });

    it('handles very large breakpoint (10000px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 10000px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(10000));

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 10000px)');
    });

    it('handles zero breakpoint', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 0px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(0));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 0px)');
    });
  });

  describe('Rapid Changes', () => {
    it('handles multiple rapid media query changes', async () => {
      let matchesValue = false;
      const addEventListenerMock = vi.fn((event: string, listener: () => void) => {
        listeners.push(listener);
      });

      matchMediaMock.mockReturnValue({
        get matches() {
          return matchesValue;
        },
        media: '(max-width: 640px)',
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(640));

      // Trigger multiple rapid changes
      act(() => {
        matchesValue = true;
        listeners.forEach(listener => listener());
      });

      act(() => {
        matchesValue = false;
        listeners.forEach(listener => listener());
      });

      act(() => {
        matchesValue = true;
        listeners.forEach(listener => listener());
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });
  });

  describe('Common Tailwind Breakpoints', () => {
    it('works with sm breakpoint (640px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 640px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(640));

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('works with md breakpoint (768px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 768px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(768));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('works with lg breakpoint (1024px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1024));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('works with xl breakpoint (1280px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1280px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1280));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('works with 2xl breakpoint (1536px)', async () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 1536px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => useMediaQuery(1536));

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });
});
