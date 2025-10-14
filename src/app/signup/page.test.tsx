import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SignUp from './page';

describe('SignUp page', () => {
  it('renders the main heading', () => {
    render(<SignUp />);
    const heading = screen.getByRole('heading', {
      name: /sign up page/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
