import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ProductCard from './productCard';

describe('ProductCard', () => {
  const defaultProps = {
    title: 'Test Product',
    description: 'This is a test product description',
    price: 29.99,
    image: '/test-image.jpg',
    imageAlt: 'Test product image',
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders product title correctly', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders product description correctly', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    });

    it('renders product price correctly', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    });

    it('renders product image with correct src', () => {
      render(<ProductCard {...defaultProps} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src');
      expect(image).toHaveAttribute('alt', 'Test product image');
    });

    it('renders product image with alt text', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByAltText('Test product image')).toBeInTheDocument();
    });
  });

  describe('Price Formatting', () => {
    it('formats integer prices correctly', () => {
      render(<ProductCard {...defaultProps} price={50} />);
      expect(screen.getByText('$50.00')).toBeInTheDocument();
    });

    it('formats decimal prices correctly', () => {
      render(<ProductCard {...defaultProps} price={99.95} />);
      expect(screen.getByText('$99.95')).toBeInTheDocument();
    });

    it('formats prices with multiple decimal places', () => {
      render(<ProductCard {...defaultProps} price={19.999} />);
      expect(screen.getByText('$20.00')).toBeInTheDocument();
    });
  });

  describe('Optional Props', () => {
    it('renders without currency symbol when showCurrency is false', () => {
      render(<ProductCard {...defaultProps} showCurrency={false} />);
      expect(screen.getByText('29.99')).toBeInTheDocument();
      expect(screen.queryByText('$29.99')).not.toBeInTheDocument();
    });

    it('renders custom badge when provided', () => {
      render(<ProductCard {...defaultProps} badge="New" />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders custom badge variant', () => {
      render(<ProductCard {...defaultProps} badge="Sale" badgeVariant="danger" />);
      const badge = screen.getByText('Sale');
      expect(badge).toHaveClass('bg-red-600');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick when card is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ProductCard {...defaultProps} onClick={handleClick} />);
      
      const card = screen.getByRole('article');
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows hover cursor when onClick is provided', () => {
      render(<ProductCard {...defaultProps} onClick={vi.fn()} />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('does not show hover cursor when onClick is not provided', () => {
      render(<ProductCard {...defaultProps} />);
      const card = screen.getByRole('article');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Accessibility', () => {
    it('has article role', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 3, name: 'Test Product' })).toBeInTheDocument();
    });

    it('image has proper alt text', () => {
      render(<ProductCard {...defaultProps} />);
      expect(screen.getByAltText('Test product image')).toBeInTheDocument();
    });
  });

  describe('Styling Variants', () => {
    it('applies compact variant classes', () => {
      render(<ProductCard {...defaultProps} variant="compact" />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-3');
    });

    it('applies default variant classes', () => {
      render(<ProductCard {...defaultProps} variant="default" />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-4');
    });

    it('applies expanded variant classes', () => {
      render(<ProductCard {...defaultProps} variant="expanded" />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-6');
    });
  });

  describe('Custom Props', () => {
    it('passes through data attributes', () => {
      render(<ProductCard {...defaultProps} data-testid="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('passes through className', () => {
      render(<ProductCard {...defaultProps} className="custom-class" />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('custom-class');
    });
  });
});
