import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from './page';

describe('Login page', () => {
  it('renders the main heading', () => {
    render(<Login />);
    const heading = screen.getByRole('heading', {
      name: /login page/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
