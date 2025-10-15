import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'col'],
      description: 'The direction of the navigation links',
    },
    links: {
      control: 'object',
      description: 'Array of navigation links with href and label',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
];

export const Row: Story = {
  args: {
    direction: 'row',
    links: defaultLinks,
  },
};

export const Column: Story = {
  args: {
    direction: 'col',
    links: defaultLinks,
  },
};

export const FewLinksRow: Story = {
  args: {
    direction: 'row',
    links: [
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'Sign Up' },
    ],
  },
};

export const FewLinksColumn: Story = {
  args: {
    direction: 'col',
    links: [
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'Sign Up' },
    ],
  },
};

export const SingleLink: Story = {
  args: {
    direction: 'row',
    links: [
      { href: '/', label: 'Home' },
    ],
  },
};
