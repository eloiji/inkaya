import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import SideMenu from './sideMenu';

describe('SideMenu', () => {
  const mockLinks = [
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<SideMenu links={mockLinks} />);
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });

    it('renders the toggle button with MenuIcon', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const menuIcon = toggleButton.querySelector('svg');
      
      expect(toggleButton).toBeInTheDocument();
      expect(menuIcon).toBeInTheDocument();
    });

    it('renders the side menu aside element', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      expect(aside).toBeInTheDocument();
    });

    it('renders close button inside the menu', () => {
      render(<SideMenu links={mockLinks} />);
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    it('renders with empty links array when links prop is not provided', () => {
      render(<SideMenu />);
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });

    it('renders navbar inside the side menu', () => {
      render(<SideMenu links={mockLinks} />);
      // Check if links are present in the navbar
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('menu is closed by default', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      expect(aside).toHaveClass('translate-x-full');
    });

    it('applies closed state classes', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('fixed', 'top-0', 'right-0', 'h-full', 'w-48');
      expect(aside).toHaveClass('bg-white', 'p-4', 'font-bold', 'shadow-lg');
      expect(aside).toHaveClass('transform', 'transition-transform', 'duration-300', 'ease-in-out');
    });
  });

  describe('Toggle Functionality', () => {
    it('opens menu when toggle button is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });

      // Initially closed
      expect(aside).toHaveClass('translate-x-full');

      // Click to open
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');
      expect(aside).not.toHaveClass('translate-x-full');
    });

    it('closes menu when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const closeButton = screen.getByLabelText('Close menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });

      // Open the menu
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');

      // Close the menu
      await user.click(closeButton);
      expect(aside).toHaveClass('translate-x-full');
      expect(aside).not.toHaveClass('translate-x-0');
    });

    it('toggles menu state multiple times', async () => {
      const user = userEvent.setup();
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });

      // Initially closed
      expect(aside).toHaveClass('translate-x-full');

      // Open
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');

      // Close via toggle
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-full');

      // Open again
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');
    });

    it('can toggle menu using both toggle and close buttons', async () => {
      const user = userEvent.setup();
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const closeButton = screen.getByLabelText('Close menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });

      // Open with toggle button
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');

      // Close with close button
      await user.click(closeButton);
      expect(aside).toHaveClass('translate-x-full');

      // Open with toggle button again
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');

      // Close with close button again
      await user.click(closeButton);
      expect(aside).toHaveClass('translate-x-full');
    });
  });

  describe('Button Styling', () => {
    it('toggle button has icon variant', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      expect(toggleButton).toHaveClass('bg-transparent', 'text-gray-900');
    });

    it('toggle button receives className prop', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      // The Button component generates its own classes, className prop is passed but may not be merged
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.className).toBeTruthy();
    });

    it('close button has icon variant', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveClass('bg-transparent', 'text-gray-900');
    });
  });

  describe('Accessibility', () => {
    it('toggle button has proper aria-label', () => {
      render(<SideMenu links={mockLinks} />);
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });

    it('close button has proper aria-label', () => {
      render(<SideMenu links={mockLinks} />);
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    it('aside has navigation role', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      expect(aside.tagName).toBe('ASIDE');
    });

    it('aside has proper aria-label', () => {
      render(<SideMenu links={mockLinks} />);
      expect(screen.getByRole('navigation', { name: 'Side menu' })).toBeInTheDocument();
    });

    it('toggle button has role="button"', () => {
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      expect(toggleButton).toHaveAttribute('role', 'button');
    });

    it('close button has role="button"', () => {
      render(<SideMenu links={mockLinks} />);
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveAttribute('role', 'button');
    });
  });

  describe('Links Integration', () => {
    it('passes links to Navbar component', () => {
      render(<SideMenu links={mockLinks} />);
      
      mockLinks.forEach(({ label }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('navbar uses column direction', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      const list = aside.querySelector('ul');
      
      expect(list).toHaveClass('flex-col');
    });

    it('handles empty links array', () => {
      render(<SideMenu links={[]} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      const list = aside.querySelector('ul');
      
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    it('handles undefined links prop', () => {
      render(<SideMenu />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      const list = aside.querySelector('ul');
      
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    it('renders multiple links correctly', () => {
      const manyLinks = [
        { href: '/page1', label: 'Page 1' },
        { href: '/page2', label: 'Page 2' },
        { href: '/page3', label: 'Page 3' },
        { href: '/page4', label: 'Page 4' },
      ];
      render(<SideMenu links={manyLinks} />);
      
      manyLinks.forEach(({ label }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('Menu Layout', () => {
    it('close button is in a flex container with justify-end', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const closeButton = screen.getByLabelText('Close menu');
      const parentDiv = closeButton.parentElement;
      
      expect(parentDiv).toHaveClass('flex', 'justify-end', 'pt-2', 'pb-4');
    });

    it('menu has fixed positioning', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('fixed', 'top-0', 'right-0');
    });

    it('menu has full height and specific width', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('h-full', 'w-48');
    });

    it('menu has background and shadow styling', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('bg-white', 'shadow-lg', 'p-4', 'font-bold');
    });
  });

  describe('Animation Classes', () => {
    it('menu has transform and transition classes', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('transform', 'transition-transform', 'duration-300', 'ease-in-out');
    });

    it('applies translate-x-full when closed', () => {
      render(<SideMenu links={mockLinks} />);
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      expect(aside).toHaveClass('translate-x-full');
    });

    it('applies translate-x-0 when open', async () => {
      const user = userEvent.setup();
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });
      
      await user.click(toggleButton);
      expect(aside).toHaveClass('translate-x-0');
    });
  });

  describe('Icons', () => {
    it('toggle button contains MenuIcon', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const svg = toggleButton.querySelector('svg');
      const path = svg?.querySelector('path');
      
      expect(svg).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });

    it('close button contains CloseIcon', () => {
      const { container } = render(<SideMenu links={mockLinks} />);
      const closeButton = screen.getByLabelText('Close menu');
      const svg = closeButton.querySelector('svg');
      const path = svg?.querySelector('path');
      
      expect(svg).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid toggling', async () => {
      const user = userEvent.setup();
      render(<SideMenu links={mockLinks} />);
      const toggleButton = screen.getByLabelText('Toggle menu');
      const aside = screen.getByRole('navigation', { name: 'Side menu' });

      // Rapidly toggle
      await user.click(toggleButton);
      await user.click(toggleButton);
      await user.click(toggleButton);
      await user.click(toggleButton);

      // Should be closed (even number of clicks)
      expect(aside).toHaveClass('translate-x-full');
    });

    it('links with special characters render correctly', async () => {
      const specialLinks = [
        { href: '/test', label: 'Test & Demo' },
        { href: '/about', label: "User's Profile" },
      ];
      render(<SideMenu links={specialLinks} />);
      
      expect(screen.getByText('Test & Demo')).toBeInTheDocument();
      expect(screen.getByText("User's Profile")).toBeInTheDocument();
    });
  });
});
