import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './page';

describe('About page', () => {
  it('renders the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      name: /about inkaya/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders content about digital products', () => {
    render(<About />);
    expect(screen.getByText(/personalized print-on-demand products/i)).toBeInTheDocument();
  });

  it('renders the mission section', () => {
    render(<About />);
    const missionHeading = screen.getByRole('heading', {
      name: /our mission/i,
    });
    expect(missionHeading).toBeInTheDocument();
  });

  it('renders the what we offer section', () => {
    render(<About />);
    const offerHeading = screen.getByRole('heading', {
      name: /what we offer/i,
    });
    expect(offerHeading).toBeInTheDocument();
  });

  it('renders the why choose section', () => {
    render(<About />);
    const whyChooseHeading = screen.getByRole('heading', {
      name: /why choose inkaya/i,
    });
    expect(whyChooseHeading).toBeInTheDocument();
  });

  it('displays key benefits as a list', () => {
    render(<About />);
    expect(screen.getByText(/instant digital delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/customizable designs/i)).toBeInTheDocument();
    expect(screen.getByText(/eco-friendly approach/i)).toBeInTheDocument();
  });
});
