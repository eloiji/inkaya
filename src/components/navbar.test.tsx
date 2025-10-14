import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from './navbar';

describe('Navbar', () => {
  const mockLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders with aria-label for navigation', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    });

    it('renders all provided links', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders links with correct href attributes', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const contactLink = screen.getByRole('link', { name: 'Contact' });

      expect(homeLink).toHaveAttribute('href', '/');
      expect(aboutLink).toHaveAttribute('href', '/about');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('renders empty list when no links provided', () => {
      render(<Navbar direction="row" links={[]} />);
      const nav = screen.getByRole('navigation');
      const list = nav.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    it('renders single link correctly', () => {
      const singleLink = [{ href: '/single', label: 'Single' }];
      render(<Navbar direction="row" links={singleLink} />);
      expect(screen.getByText('Single')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Single' })).toHaveAttribute('href', '/single');
    });
  });

  describe('Direction: Row', () => {
    it('applies row direction classes', () => {
      const { container } = render(<Navbar direction="row" links={mockLinks} />);
      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex', 'flex-row');
    });

    it('applies horizontal spacing classes to list items', () => {
      const { container } = render(<Navbar direction="row" links={mockLinks} />);
      const listItems = container.querySelectorAll('li');
      listItems.forEach(item => {
        expect(item).toHaveClass('ml-4', 'xs:ml-2', 'first:ml-0', 'last:mr-2');
      });
    });

    it('applies default link styling for row direction', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('font-bold', 'text-gray-900', 'hover:text-cyan-600', 'transition-colors');
        expect(link).not.toHaveClass('block', 'pt-2', 'text-right');
      });
    });
  });

  describe('Direction: Column', () => {
    it('applies column direction classes', () => {
      const { container } = render(<Navbar direction="col" links={mockLinks} />);
      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex', 'flex-col');
    });

    it('applies vertical spacing classes to list items', () => {
      const { container } = render(<Navbar direction="col" links={mockLinks} />);
      const listItems = container.querySelectorAll('li');
      listItems.forEach(item => {
        expect(item).toHaveClass('pr-4', 'pl-20');
      });
    });

    it('applies column-specific link styling', () => {
      render(<Navbar direction="col" links={mockLinks} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('block', 'pt-2', 'mb-2', 'text-right', 'font-bold', 'text-gray-900');
      });
    });
  });

  describe('Accessibility', () => {
    it('each link has aria-label attribute', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      mockLinks.forEach(({ label }) => {
        const link = screen.getByRole('link', { name: label });
        expect(link).toHaveAttribute('aria-label', label);
      });
    });

    it('each link has tabIndex of 0', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('tabIndex', '0');
      });
    });

    it('navigation element has proper role', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const nav = screen.getByRole('navigation');
      expect(nav.tagName).toBe('NAV');
    });
  });

  describe('Link Keys', () => {
    it('generates unique keys for each link', () => {
      const { container } = render(<Navbar direction="row" links={mockLinks} />);
      const listItems = container.querySelectorAll('li');
      
      // React doesn't expose keys in the DOM, but we can verify all items render
      expect(listItems).toHaveLength(mockLinks.length);
    });

    it('handles duplicate labels with different hrefs', () => {
      const duplicateLinks = [
        { href: '/home1', label: 'Home' },
        { href: '/home2', label: 'Home' },
      ];
      render(<Navbar direction="row" links={duplicateLinks} />);
      
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks).toHaveLength(2);
      expect(homeLinks[0]).toHaveAttribute('href', '/home1');
      expect(homeLinks[1]).toHaveAttribute('href', '/home2');
    });
  });

  describe('Link Styling', () => {
    it('applies consistent text and color classes to all links', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveClass('font-bold');
        expect(link).toHaveClass('text-gray-900');
        expect(link).toHaveClass('hover:text-cyan-600');
        expect(link).toHaveClass('focus:text-cyan-600');
        expect(link).toHaveClass('transition-colors');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles links with special characters in label', () => {
      const specialLinks = [
        { href: '/test', label: 'Test & Demo' },
        { href: '/about', label: "About's Page" },
      ];
      render(<Navbar direction="row" links={specialLinks} />);
      
      expect(screen.getByText('Test & Demo')).toBeInTheDocument();
      expect(screen.getByText("About's Page")).toBeInTheDocument();
    });

    it('handles links with query parameters', () => {
      const queryLinks = [
        { href: '/search?q=test', label: 'Search' },
        { href: '/page?id=123', label: 'Page' },
      ];
      render(<Navbar direction="row" links={queryLinks} />);
      
      const searchLink = screen.getByRole('link', { name: 'Search' });
      const pageLink = screen.getByRole('link', { name: 'Page' });
      
      expect(searchLink).toHaveAttribute('href', '/search?q=test');
      expect(pageLink).toHaveAttribute('href', '/page?id=123');
    });

    it('handles links with hash fragments', () => {
      const hashLinks = [
        { href: '#section1', label: 'Section 1' },
        { href: '/page#top', label: 'Top' },
      ];
      render(<Navbar direction="row" links={hashLinks} />);
      
      const section1Link = screen.getByRole('link', { name: 'Section 1' });
      const topLink = screen.getByRole('link', { name: 'Top' });
      
      expect(section1Link).toHaveAttribute('href', '#section1');
      expect(topLink).toHaveAttribute('href', '/page#top');
    });

    it('handles very long link labels', () => {
      const longLinks = [
        { href: '/long', label: 'This is a very long navigation link label that might wrap' },
      ];
      render(<Navbar direction="row" links={longLinks} />);
      
      expect(screen.getByText('This is a very long navigation link label that might wrap')).toBeInTheDocument();
    });

    it('handles many links', () => {
      const manyLinks = Array.from({ length: 20 }, (_, i) => ({
        href: `/page${i}`,
        label: `Page ${i}`,
      }));
      render(<Navbar direction="row" links={manyLinks} />);
      
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(20);
    });
  });

  describe('Integration with Next.js Link', () => {
    it('uses Next.js Link component', () => {
      render(<Navbar direction="row" links={mockLinks} />);
      const links = screen.getAllByRole('link');
      
      // Next.js Link renders as an <a> tag in the test environment
      links.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });
  });
});
