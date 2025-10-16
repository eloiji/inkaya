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
      expect(footer).toHaveClass('bg-gray-900', 'text-white');
    });
  });

  describe('Footer Structure', () => {
    it('has a max-width container', () => {
      const { container } = render(<Footer />);
      const innerDiv = container.querySelector('.max-w-7xl');
      expect(innerDiv).toBeInTheDocument();
      expect(innerDiv).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    it('has proper padding', () => {
      const { container } = render(<Footer />);
      const innerDiv = container.querySelector('.py-8');
      expect(innerDiv).toBeInTheDocument();
    });
  });

  describe('Company Section', () => {
    it('renders company name', () => {
      render(<Footer />);
      expect(screen.getByText('Inkaya')).toBeInTheDocument();
    });

    it('renders company description', () => {
      render(<Footer />);
      expect(screen.getByText(/Durable, high-quality vinyl stickers/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders About link', () => {
      render(<Footer />);
      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('renders Contact link', () => {
      render(<Footer />);
      const contactLink = screen.getByRole('link', { name: 'Contact' });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('renders Privacy link', () => {
      render(<Footer />);
      const privacyLink = screen.getByRole('link', { name: 'Privacy' });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    it('renders Terms link', () => {
      render(<Footer />);
      const termsLink = screen.getByRole('link', { name: 'Terms' });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/terms');
    });
  });

  describe('Social Media Links', () => {
    it('renders GitHub link', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
    });

    it('renders Twitter link', () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText('Twitter');
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    });

    it('renders LinkedIn link', () => {
      render(<Footer />);
      const linkedinLink = screen.getByLabelText('LinkedIn');
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    });

    it('social links open in new tab', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('GitHub');
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
      expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has responsive grid layout', () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('md:grid-cols-3', 'gap-8');
    });

    it('has responsive text alignment', () => {
      const { container } = render(<Footer />);
      const copyright = container.querySelector('.text-center.md\\:text-left');
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
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Privacy' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Terms' })).toBeInTheDocument();
    });

    it('social media links have descriptive aria-labels', () => {
      render(<Footer />);
      expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    });

    it('external links have proper rel attribute', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Link Styling', () => {
    it('footer links have hover effects', () => {
      render(<Footer />);
      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toHaveClass('hover:text-cyan-400');
    });

    it('social media links have hover effects', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('GitHub');
      expect(githubLink).toHaveClass('hover:text-cyan-400');
    });
  });

  describe('Layout Sections', () => {
    it('has company section', () => {
      const { container } = render(<Footer />);
      const companySection = container.querySelector('.space-y-4');
      expect(companySection).toBeInTheDocument();
    });

    it('renders section headings', () => {
      render(<Footer />);
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
      expect(screen.getByText('Follow Us')).toBeInTheDocument();
    });
  });
});
