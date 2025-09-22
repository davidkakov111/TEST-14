import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Items from './Items';
import { useData } from '../state/DataContext';

// Mock context
jest.mock('../state/DataContext');

// Mock ResizeObserver for react-window
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

test('renders search input and skeleton initially', async () => {
    useData.mockReturnValue({
        items: [],
        fetchItems: jest.fn().mockResolvedValue(0),
    });

    render(<Items />);

    // Search input exists
    expect(screen.getByLabelText(/search items/i)).toBeInTheDocument();

    // Skeleton exists (query by class)
    const skeleton = await screen.findByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
});
