import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('renders with JSX children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Button Types', () => {
    it('renders without explicit type when not specified', () => {
      render(<Button>Click me</Button>);
      // When type is not specified, the component passes through rest props
      // HTML buttons default to 'submit' if in a form, or no type attribute otherwise
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as submit type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('renders as reset type', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Variants', () => {
    it('applies primary variant classes by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-cyan-600', 'text-white', 'hover:bg-cyan-700');
    });

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
    });

    it('applies danger variant classes', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600', 'text-white', 'hover:bg-red-700');
    });

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-cyan-600', 'hover:bg-cyan-100', 'border');
    });

    it('applies icon variant classes', () => {
      render(<Button variant="icon">Icon</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-gray-900', 'py-1');
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('applies medium size classes', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('applies large size classes', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled attribute when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies disabled styling classes', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Base Styling', () => {
    it('applies base classes to all buttons', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'font-semibold',
        'rounded-lg',
        'transition',
        'duration-150',
        'ease-in-out',
        'cursor-pointer'
      );
    });

    it('applies focus classes to non-icon buttons', () => {
      render(<Button variant="primary">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
    });

    it('does not apply focus ring classes to icon buttons', () => {
      render(<Button variant="icon">Icon</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('focus:ring-2');
    });
  });

  describe('User Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times when clicked multiple times', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Custom Props', () => {
    it('custom className completely overrides default classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      // Custom className should completely replace default classes
      expect(button.className).toBe('custom-class');
      // Should not have default classes
      expect(button).not.toHaveClass('bg-cyan-600');
      expect(button).not.toHaveClass('font-semibold');
    });

    it('custom className with size utilities works without conflicts', () => {
      render(<Button className="w-12 h-12 bg-blue-500">Custom Size</Button>);
      const button = screen.getByRole('button');
      // Should only have custom classes
      expect(button.className).toBe('w-12 h-12 bg-blue-500');
      // Should not have conflicting default size classes
      expect(button).not.toHaveClass('px-4');
      expect(button).not.toHaveClass('py-2');
      expect(button).not.toHaveClass('bg-cyan-600');
    });

    it('passes through data attributes', () => {
      render(<Button data-testid="custom-button">Custom</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('passes through aria attributes', () => {
      render(<Button aria-label="Custom label">Custom</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('passes through id attribute', () => {
      render(<Button id="custom-id">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Combination of Props', () => {
    it('applies both size and variant correctly', () => {
      render(<Button size="lg" variant="danger">Large Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg'); // size
      expect(button).toHaveClass('bg-red-600', 'text-white'); // variant
    });

    it('works with all props combined', () => {
      const handleClick = vi.fn();
      render(
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          onClick={handleClick}
          data-testid="combined-button"
        >
          Combined Button
        </Button>
      );
      
      const button = screen.getByTestId('combined-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
      expect(button).toHaveClass('bg-gray-200', 'text-gray-800');
      expect(screen.getByText('Combined Button')).toBeInTheDocument();
    });
  });
});
