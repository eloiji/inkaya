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

    it('applies custom className', () => {
      const { container } = render(<CloseIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
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
  });

  describe('MenuIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<MenuIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<MenuIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
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
  });
});
