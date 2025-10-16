import type { Meta, StoryObj } from '@storybook/react';
import SideMenu from './sideMenu';

const meta = {
  title: 'Components/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    links: {
      control: 'object',
      description: 'Array of navigation links with href and label',
    },
  },
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
};

export const WithAuthLinks: Story = {
  args: {
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'Sign Up' },
    ],
  },
};

export const MinimalLinks: Story = {
  args: {
    links: [
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'Sign Up' },
    ],
  },
};

export const NoLinks: Story = {
  args: {
    links: [],
  },
};
