import type { Meta, StoryObj } from '@storybook/react';
import { CloseIcon, MenuIcon } from './icons';

const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type CloseIconStory = StoryObj<Meta<typeof CloseIcon>>;

export const Close: CloseIconStory = {
  render: (args) => <CloseIcon {...args} />,
  args: {},
};

export const CloseCustomColor: CloseIconStory = {
  render: (args) => <CloseIcon {...args} />,
  args: {
    className: 'text-red-600',
  },
};

export const CloseLarge: CloseIconStory = {
  render: (args) => <CloseIcon {...args} />,
  args: {
    className: 'w-12 h-12',
  },
};

type MenuIconStory = StoryObj<Meta<typeof MenuIcon>>;

export const Menu: MenuIconStory = {
  render: (args) => <MenuIcon {...args} />,
  args: {},
};

export const MenuCustomColor: MenuIconStory = {
  render: (args) => <MenuIcon {...args} />,
  args: {
    className: 'text-cyan-600',
  },
};

export const MenuLarge: MenuIconStory = {
  render: (args) => <MenuIcon {...args} />,
  args: {
    className: 'w-12 h-12',
  },
};
