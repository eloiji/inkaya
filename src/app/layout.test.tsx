import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from './layout';

vi.mock('@/components/header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('next/font/google', () => ({
  Geist: () => ({
    variable: 'font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: 'font-geist-mono',
  }),
}));

describe('RootLayout', () => {
  it('renders the Header and children', () => {
    render(
      <RootLayout>
        <main>Test Child</main>
      </RootLayout>,
      { container: document.body }
    );

    expect(screen.getByRole('banner')).toHaveTextContent('Header');
    expect(screen.getByRole('main')).toHaveTextContent('Test Child');
  });
});
