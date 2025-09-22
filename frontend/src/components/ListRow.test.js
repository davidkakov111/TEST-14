import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RowComponent from './ListRow';

describe('RowComponent', () => {
    const mockItems = [
        { id: 1, name: 'Laptop Pro' },
        { id: 2, name: 'Headphones' },
    ];

    test('renders item name and link correctly', () => {
        render(
            <MemoryRouter>
                <RowComponent index={0} names={mockItems} style={{}} />
            </MemoryRouter>
        );

        // Check if item name is rendered
        expect(screen.getByText('Laptop Pro')).toBeInTheDocument();

        // Check if the link points to the correct route
        const link = screen.getByRole('link', { name: /Laptop Pro/i });
        expect(link).toHaveAttribute('href', '/items/1');
    });

    test('renders another item correctly', () => {
        render(
            <MemoryRouter>
                <RowComponent index={1} names={mockItems} style={{}} />
            </MemoryRouter>
        );

        expect(screen.getByText('Headphones')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Headphones/i })).toHaveAttribute('href', '/items/2');
    });
});
