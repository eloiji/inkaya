import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './page';

describe('About page', () => {
  it('renders the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      name: /about page/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
