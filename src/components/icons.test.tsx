import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CloseIcon, MenuIcon } from './icons';

describe('Icons', () => {
  describe('CloseIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('custom className completely overrides default classes', () => {
      const { container } = render(<CloseIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
      // Should not have default classes when custom className is provided
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
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

    it('custom color class overrides all defaults', () => {
      const { container } = render(<CloseIcon className="text-red-600" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-red-600');
      // When custom className is provided, defaults should not be present
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
    });

    it('custom size classes override defaults without conflicts', () => {
      const { container } = render(<CloseIcon className="w-12 h-12" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-12');
      expect(svg).toHaveClass('h-12');
      // Default classes should not be present when custom className is provided
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

    it('custom className completely overrides default classes', () => {
      const { container } = render(<MenuIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
      // Should not have default classes when custom className is provided
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
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

    it('custom color class overrides all defaults', () => {
      const { container } = render(<MenuIcon className="text-cyan-600" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-cyan-600');
      // When custom className is provided, defaults should not be present
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
    });

    it('custom size classes override defaults without conflicts', () => {
      const { container } = render(<MenuIcon className="w-12 h-12" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-12');
      expect(svg).toHaveClass('h-12');
      // Default classes should not be present when custom className is provided
      expect(svg).not.toHaveClass('w-6');
      expect(svg).not.toHaveClass('h-6');
    });
  });
});
