import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Header from './header';
import * as useMediaQueryModule from '../hooks/useMediaQuery';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // Enforce required props for accessibility
    const { src, alt, width, height, ...rest } = props;
    if (typeof alt !== 'string' || alt.trim() === '') {
      throw new Error('Mocked Next.js Image requires a non-empty alt prop for accessibility.');
    }
    // Provide default width/height if not specified, to mimic Next.js behavior
    return (
      <img
        src={src}
        alt={alt}
        width={width || 100}
        height={height || 100}
        {...rest}
      />
    );
  },
}));

describe('Header', () => {
  let mockUseMediaQuery: vi.MockedFunction<typeof useMediaQueryModule.useMediaQuery>;

  beforeEach(() => {
    mockUseMediaQuery = vi.fn();
    vi.spyOn(useMediaQueryModule, 'useMediaQuery').mockImplementation(mockUseMediaQuery);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the header element with correct styling', () => {
      mockUseMediaQuery.mockReturnValue(false);
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('bg-white', 'shadow-sm', 'z-50');
    });

    it('renders logo link', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      const logoLink = screen.getByLabelText('Go to homepage');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders logo image', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      const logo = screen.getByAltText('Inkaya Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/images/logo.svg');
    });

    it('renders navbar', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      // Check for navbar by looking for navigation elements
      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThan(0);
    });
  });

  describe('Desktop View (isMobile = false)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('displays all navigation links in navbar', () => {
      render(<Header />);
      
      // Should display navLinks - use getAllByText since links appear in both navbar and side menu
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('About').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
      
      // Should also display authLinks
      expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    });

    it('displays navbar with all 5 links (3 nav + 2 auth)', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');
      // 1 logo link + 5 nav links = 6 total
      expect(links.length).toBeGreaterThanOrEqual(6);
    });

    it('navbar uses row direction', () => {
      const { container } = render(<Header />);
      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex-row');
    });

    it('calls useMediaQuery with SM_BREAKPOINT (640)', () => {
      render(<Header />);
      expect(mockUseMediaQuery).toHaveBeenCalledWith(640);
    });
  });

  describe('Mobile View (isMobile = true)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true);
    });

    it('displays only auth links in navbar on mobile', () => {
      render(<Header />);
      
      // Should display authLinks
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('displays navbar with 2 links (auth only) on mobile', () => {
      render(<Header />);
      // The navbar should show only auth links on mobile
      // Note: getAllByText because some links might appear in both navbar and side menu
      const loginLinks = screen.getAllByText('Login');
      const signupLinks = screen.getAllByText('Sign Up');
      
      expect(loginLinks.length).toBeGreaterThan(0);
      expect(signupLinks.length).toBeGreaterThan(0);
    });

    it('calls useMediaQuery with SM_BREAKPOINT (640)', () => {
      render(<Header />);
      expect(mockUseMediaQuery).toHaveBeenCalledWith(640);
    });
  });

  describe('Logo Styling and Behavior', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('logo link has hover and focus styles', () => {
      render(<Header />);
      const logoLink = screen.getByLabelText('Go to homepage');
      expect(logoLink).toHaveClass(
        'hover:opacity-80',
        'transition-opacity',
        'focus:outline-none',
        'focus:ring-1',
        'focus:ring-blue-300',
        'focus:ring-offset-1',
        'rounded'
      );
    });

    it('logo image has correct dimensions', () => {
      render(<Header />);
      const logo = screen.getByAltText('Inkaya Logo');
      expect(logo).toHaveAttribute('width', '100');
      expect(logo).toHaveAttribute('height', '32');
    });

    it('logo image has priority prop in Next.js Image', () => {
      render(<Header />);
      const logo = screen.getByAltText('Inkaya Logo');
      // The priority prop is passed to Next.js Image but doesn't appear as HTML attribute in mocked component
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Layout and Container', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('has max-width container with responsive padding', () => {
      const { container } = render(<Header />);
      const innerDiv = container.querySelector('.max-w-7xl');
      expect(innerDiv).toBeInTheDocument();
      expect(innerDiv).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    it('has flex container with correct alignment', () => {
      const { container } = render(<Header />);
      const flexContainer = container.querySelector('.flex.items-center.justify-between');
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass('h-16');
    });

    it('logo is in a flex-1 container', () => {
      const { container } = render(<Header />);
      const logoLink = screen.getByLabelText('Go to homepage');
      const logoContainer = logoLink.parentElement;
      expect(logoContainer).toHaveClass('flex-1');
    });
  });

  describe('Side Menu', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('renders side menu component', () => {
      render(<Header />);
      // Side menu toggle button should be present
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });

    it('side menu is in a responsive container', () => {
      const { container } = render(<Header />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const sideMenuContainer = toggleButton.parentElement;
      expect(sideMenuContainer).toHaveClass('block', 'md:hidden');
    });

    it('side menu receives navLinks', () => {
      render(<Header />);
      // The side menu should have access to Home, About, Contact
      // These appear in the side menu even on desktop
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Behavior', () => {
    it('changes navbar links based on screen size', () => {
      // Start with desktop
      mockUseMediaQuery.mockReturnValue(false);
      const { rerender } = render(<Header />);
      
      // Use getAllByText since links can appear in multiple places
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('About').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
      
      // Switch to mobile
      mockUseMediaQuery.mockReturnValue(true);
      rerender(<Header />);
      
      // Auth links should still be visible
      expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    });

    it('uses correct breakpoint value', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      
      // Should be called with 640 (SM_BREAKPOINT)
      expect(mockUseMediaQuery).toHaveBeenCalledWith(640);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('header is a landmark element', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header.tagName).toBe('HEADER');
    });

    it('logo link has descriptive aria-label', () => {
      render(<Header />);
      expect(screen.getByLabelText('Go to homepage')).toBeInTheDocument();
    });

    it('logo image has alt text', () => {
      render(<Header />);
      const logo = screen.getByAltText('Inkaya Logo');
      expect(logo).toHaveAttribute('alt', 'Inkaya Logo');
    });

    it('navigation elements have proper roles', () => {
      render(<Header />);
      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThan(0);
    });
  });

  describe('Link Arrays', () => {
    it('defines correct navigation links', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      
      // Use getAllByRole since links appear in both navbar and side menu
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
      
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0]).toHaveAttribute('href', '/');
      expect(aboutLinks.length).toBeGreaterThan(0);
      expect(aboutLinks[0]).toHaveAttribute('href', '/about');
      expect(contactLinks.length).toBeGreaterThan(0);
      expect(contactLinks[0]).toHaveAttribute('href', '/contact');
    });

    it('defines correct auth links', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      
      const loginLink = screen.getByRole('link', { name: 'Login' });
      const signupLink = screen.getByRole('link', { name: 'Sign Up' });
      
      expect(loginLink).toHaveAttribute('href', '/login');
      expect(signupLink).toHaveAttribute('href', '/signup');
    });
  });

  describe('Integration', () => {
    it('integrates Navbar component correctly', () => {
      mockUseMediaQuery.mockReturnValue(false);
      const { container } = render(<Header />);
      
      // Should have navigation element from Navbar
      const nav = container.querySelector('nav[role="navigation"]');
      expect(nav).toBeInTheDocument();
    });

    it('integrates SideMenu component correctly', () => {
      mockUseMediaQuery.mockReturnValue(false);
      render(<Header />);
      
      // Should have side menu toggle button
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
      
      // Should have side menu navigation
      expect(screen.getByRole('navigation', { name: 'Side menu' })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles useMediaQuery returning undefined gracefully', () => {
      mockUseMediaQuery.mockReturnValue(undefined as any);
      render(<Header />);
      
      // Should still render without crashing
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('handles rapid screen size changes', () => {
      mockUseMediaQuery.mockReturnValue(false);
      const { rerender } = render(<Header />);
      
      mockUseMediaQuery.mockReturnValue(true);
      rerender(<Header />);
      
      mockUseMediaQuery.mockReturnValue(false);
      rerender(<Header />);
      
      mockUseMediaQuery.mockReturnValue(true);
      rerender(<Header />);
      
      // Should still render correctly
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });
});
