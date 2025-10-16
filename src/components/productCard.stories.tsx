import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import ProductCard from './productCard';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'default', 'expanded'],
      description: 'Size variant of the product card',
    },
    badgeVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Color variant of the badge',
    },
    showCurrency: {
      control: 'boolean',
      description: 'Whether to show currency symbol',
    },
    badge: {
      control: 'text',
      description: 'Optional badge text',
    },
    price: {
      control: 'number',
      description: 'Product price',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with standard product
export const Default: Story = {
  args: {
    title: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring noise cancellation technology.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    imageAlt: 'Premium wireless headphones',
    variant: 'default',
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    title: 'Smart Watch',
    description: 'Track your fitness goals with this sleek smartwatch.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    imageAlt: 'Smart watch',
    variant: 'compact',
  },
};

// Expanded variant
export const Expanded: Story = {
  args: {
    title: 'Professional Camera',
    description: 'Capture stunning photos with this professional-grade camera featuring advanced image processing and 4K video recording.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    imageAlt: 'Professional camera',
    variant: 'expanded',
  },
};

// With New badge
export const WithNewBadge: Story = {
  args: {
    title: 'Wireless Earbuds',
    description: 'Compact and lightweight wireless earbuds with premium sound quality.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    imageAlt: 'Wireless earbuds',
    badge: 'New',
    badgeVariant: 'primary',
  },
};

// With Sale badge (danger variant)
export const WithSaleBadge: Story = {
  args: {
    title: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB backlighting and programmable keys.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    imageAlt: 'Gaming keyboard',
    badge: 'Sale',
    badgeVariant: 'danger',
  },
};

// With Limited badge (secondary variant)
export const WithLimitedBadge: Story = {
  args: {
    title: 'Portable Speaker',
    description: 'Waterproof portable speaker with 360-degree sound.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    imageAlt: 'Portable speaker',
    badge: 'Limited',
    badgeVariant: 'secondary',
  },
};

// Without currency symbol
export const WithoutCurrency: Story = {
  args: {
    title: 'USB-C Cable',
    description: 'High-speed USB-C charging cable with durable braided design.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
    imageAlt: 'USB-C cable',
    showCurrency: false,
  },
};

// High-priced item
export const HighPrice: Story = {
  args: {
    title: 'Premium Laptop',
    description: 'Powerful laptop with the latest processor, 32GB RAM, and 1TB SSD for professional work.',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    imageAlt: 'Premium laptop',
    variant: 'expanded',
    badge: 'Pro',
    badgeVariant: 'primary',
  },
};

// Low-priced item
export const LowPrice: Story = {
  args: {
    title: 'Phone Case',
    description: 'Protective phone case with shock-absorbing corners.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
    imageAlt: 'Phone case',
    variant: 'compact',
  },
};

// Interactive example (with hover effect)
export const Interactive: Story = {
  args: {
    title: 'Tablet Stand',
    description: 'Adjustable aluminum tablet stand for optimal viewing angles.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop',
    imageAlt: 'Tablet stand',
  },
  parameters: {
    docs: {
      description: {
        story: 'This card is clickable and shows hover effects.',
      },
    },
  },
};
