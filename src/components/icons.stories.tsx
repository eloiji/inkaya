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

// CloseIcon Stories
const CloseIconMeta = {
  title: 'Components/Icons/CloseIcon',
  component: CloseIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon',
    },
  },
} satisfies Meta<typeof CloseIcon>;

type CloseIconStory = StoryObj<typeof CloseIconMeta>;

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

// MenuIcon Stories
const MenuIconMeta = {
  title: 'Components/Icons/MenuIcon',
  component: MenuIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon',
    },
  },
} satisfies Meta<typeof MenuIcon>;

type MenuIconStory = StoryObj<typeof MenuIconMeta>;

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
