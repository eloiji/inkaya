import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CloseIcon, MenuIcon, SocialIcon } from './icons';

describe('Icons', () => {
  describe('CloseIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      const { container } = render(<CloseIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
      // Should still have default classes because they don't conflict
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('applies default classes when no custom className provided', () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('passes through data-testid prop', () => {
      render(<CloseIcon data-testid="close-icon" />);
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('renders with correct path data', () => {
      const { container } = render(<CloseIcon />);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
    });

    it('merges custom color class with defaults', () => {
      const { container } = render(<CloseIcon className="text-red-600" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-red-600');
      // Default size classes should still be present
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('custom size classes override default size classes', () => {
      const { container } = render(<CloseIcon className="w-12 h-12" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-12');
      expect(svg).toHaveClass('h-12');
      // Default size classes are correctly overridden by tailwind-merge
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
    });
  });

  describe('MenuIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<MenuIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      const { container } = render(<MenuIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
      // Should still have default classes because they don't conflict
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('applies default classes when no custom className provided', () => {
      const { container } = render(<MenuIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('passes through data-testid prop', () => {
      render(<MenuIcon data-testid="menu-icon" />);
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('renders with correct path data', () => {
      const { container } = render(<MenuIcon />);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });

    it('merges custom color class with defaults', () => {
      const { container } = render(<MenuIcon className="text-cyan-600" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-cyan-600');
      // Default size classes should still be present
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('custom size classes override default size classes', () => {
      const { container } = render(<MenuIcon className="w-12 h-12" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-12');
      expect(svg).toHaveClass('h-12');
      // Default size classes are correctly overridden by tailwind-merge
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
    });
  });

  describe('SocialIcon', () => {
    const iconPath =
      'M10 20v-6h4v6m5 0h-14a2 2 0 01-2-2V7a2 2 0 012-2h3.17a2 2 0 011.41.59l1.83 1.83a2 2 0 001.41.59H19a2 2 0 012 2v9a2 2 0 01-2 2z';

    it('renders without crashing', () => {
      const { container } = render(<SocialIcon icon={iconPath} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<SocialIcon icon={iconPath} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-6');
      expect(svg).toHaveClass('h-6');
    });

    it('merges custom className with defaults', () => {
      const { container } = render(<SocialIcon icon={iconPath} className="text-blue-500" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-6', 'h-6', 'text-blue-500');
    });

    it('renders the correct path', () => {
      const { container } = render(<SocialIcon icon={iconPath} />);
      const svg = container.querySelector('svg');
      const path = svg.querySelector('path');
      expect(path).toHaveAttribute('d', iconPath);
    });

    it('does not render a path if icon prop is empty', () => {
      const { container } = render(<SocialIcon icon="" />);
      const svg = container.querySelector('svg');
      expect(svg.querySelector('path')).toBeNull();
    });

    it('passes through additional props', () => {
      render(<SocialIcon icon={iconPath} data-testid="social-icon" />);
      expect(screen.getByTestId('social-icon')).toBeInTheDocument();
    });
  });
});
