import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders the footer element with correct styling', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      // Update class names if changed
      expect(footer).toHaveClass('bg-pink-700');
      expect(footer).toHaveClass('text-white');
    });
  });

  describe('Footer Structure', () => {
    it('has a max-width container', () => {
      const { container } = render(<Footer />);
      // Update selector if class changed
      const innerDiv = container.querySelector('.max-w-7xl');
      expect(innerDiv).toBeInTheDocument();
      expect(innerDiv).toHaveClass('mx-auto');
    });

    it('has proper padding', () => {
      const { container } = render(<Footer />);
      // Update selector if class changed
      const innerDiv = container.querySelector('.py-8');
      expect(innerDiv).toBeInTheDocument();
    });
  });

  describe('Company Section', () => {
    it('renders company name', () => {
      const { container } = render(<Footer />);
      const companyName = container.querySelector('#footer-heading');
      expect(companyName).toBeInTheDocument();
      expect(companyName).toHaveTextContent(/Inkaya/i);
    });

    it('renders company description', () => {
      render(<Footer />);
      expect(screen.getByText(/vinyl stickers/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders About link', () => {
      render(<Footer />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('renders Contact link', () => {
      render(<Footer />);
      const contactLink = screen.getByRole('link', { name: /contact/i });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('renders Privacy link', () => {
      render(<Footer />);
      const privacyLink = screen.getByRole('link', { name: /privacy/i });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    it('renders Terms link', () => {
      render(<Footer />);
      const termsLink = screen.getByRole('link', { name: /terms/i });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/terms');
    });
  });

  describe('Social Media Links', () => {
    it('renders GitHub link', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText(/github/i);
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
    });

    it('renders Twitter link', () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText(/twitter/i);
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    });

    it('renders LinkedIn link', () => {
      render(<Footer />);
      const linkedinLink = screen.getByLabelText(/linkedin/i);
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    });

    it('social links open in new tab', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText(/github/i);
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Copyright Section', () => {
    it('renders current year in copyright', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
    });

    it('renders copyright text', () => {
      render(<Footer />);
      expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive grid layout', () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('md:grid-cols-4');
      expect(grid).toHaveClass('gap-8');
    });

    it('has responsive text alignment', () => {
      const { container } = render(<Footer />);
      // Update selector if class changed
      const copyright = container.querySelector('.text-center');
      expect(copyright).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('footer is a contentinfo landmark', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('all navigation links have accessible names', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument();
    });

    it('social media links have descriptive aria-labels', () => {
      render(<Footer />);
      expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
    });

    it('external links have proper rel attribute', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText(/github/i);
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Link Styling', () => {
    it('footer links have hover effects', () => {
      render(<Footer />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink.className).toMatch(/hover:text-yellow-300/);
    });

    it('social media links have hover effects', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText(/github/i);
      expect(githubLink.className).toMatch(/hover:text-yellow-300/);
    });
  });

  describe('Layout Sections', () => {
    it('has company section', () => {
      const { container } = render(<Footer />);
      // Update selector if class changed
      const companySection = container.querySelector('.space-y-4');
      expect(companySection).toBeInTheDocument();
    });

    it('renders section headings', () => {
      render(<Footer />);
      expect(screen.getByText(/quick links/i)).toBeInTheDocument();
      expect(screen.getByText(/follow us/i)).toBeInTheDocument();
    });
  });
});
