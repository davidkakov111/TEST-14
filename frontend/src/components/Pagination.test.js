import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
    const onPageChange = jest.fn();

    beforeEach(() => {
        onPageChange.mockClear();
    });

    test('renders Prev and Next buttons disabled appropriately', () => {
        render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);

        // Prev should be disabled on first page
        expect(screen.getByText('Prev')).toBeDisabled();

        // Next should be enabled
        expect(screen.getByText('Next')).toBeEnabled();
    });

    test('renders correct page buttons', () => {
        render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);

        // Check all page numbers are rendered
        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }
    });

    test('calls onPageChange when page buttons are clicked', () => {
        render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);

        // Click a page number
        fireEvent.click(screen.getByText('3'));
        expect(onPageChange).toHaveBeenCalledWith(3);

        // Click Prev
        fireEvent.click(screen.getByText('Prev'));
        expect(onPageChange).toHaveBeenCalledWith(1);

        // Click Next
        fireEvent.click(screen.getByText('Next'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    test('renders ellipsis if totalPages > 7', () => {
        render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);
        expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1);
    });
});
