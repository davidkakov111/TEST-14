import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock ResizeObserver (needed for react-window)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

test('renders main Items button in header', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    // Check that the Items button exists
    const itemsLink = screen.getByRole('link', { name: /^items$/i }); // exact match
    expect(itemsLink).toBeInTheDocument();
    // Optional: check that it links to the home route
    expect(itemsLink).toHaveAttribute('href', '/');
});