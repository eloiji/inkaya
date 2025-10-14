import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './page';

describe('Contact page', () => {
  it('renders the main heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', {
      name: /contact page/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
