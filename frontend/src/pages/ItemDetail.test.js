import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ItemDetail from './ItemDetail';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
    useNavigate: () => jest.fn(),
}));

test('renders item details after fetch', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({ id: 1, name: 'Laptop', category: 'Electronics', price: 2499 }),
        })
    );

    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Laptop'));

    // Use function matcher to account for nested <strong>
    expect(
        screen.getByText((content, element) =>
            element.tagName.toLowerCase() === 'p' && content.includes('Electronics')
        )
    ).toBeInTheDocument();

    expect(
        screen.getByText((content, element) =>
            element.tagName.toLowerCase() === 'p' && content.includes('$2499')
        )
    ).toBeInTheDocument();
});
