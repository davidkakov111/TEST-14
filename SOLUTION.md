# Backend Approach & Trade-offs

## 1. Refactor blocking I/O
Replaced fs.readFileSync and fs.writeFileSync with asynchronous fs.promises operations. This prevents blocking the event loop and allows the server to handle concurrent requests more efficiently. Trade-off: introduces async/await in all routes, slightly increasing code complexity but improving performance.

## 2. Performance
For GET /api/stats, implemented a caching strategy that stores results in memory and automatically updates the cache if the underlying data file changes. This avoids recalculating stats on every request while keeping the cache reasonably fresh. Trade-off: slight complexity added for file-watching logic, but significantly reduces server load without serving stale data.

## 3. Testing
Added Jest unit tests for items routes covering both happy paths and error cases. Mocked file system operations to isolate logic. Trade-off: doesn’t test actual disk I/O or network errors, but ensures route logic correctness in a controlled environment.
    

# Frontend Approach & Trade-offs

## 1. Memory Leak (Items.js)
Fixed the memory leak by introducing an active flag inside useEffect to check if the component is still mounted before updating state.
Trade-off: Minimal additional logic, keeps fetchItems intact; ensures state updates don’t happen after unmount, preventing warnings and potential memory issues.

## 2. Pagination & Search
Updated the GET /api/items route to handle pagination fully on the backend with a search (q) parameter.
Added more items to the JSON data so the pagination works across multiple pages.
On the client side, updated the DataContext to use the pagination and search parameters.
Updated Items.js to include traditional pagination buttons, a search bar with debounce, and fetch items according to page and query.
Trade-off: Introduces slightly more complexity on the client side with state management and debounced search, but improves UX and reduces data load per request.

## 3. Performance (Items List Virtualization)
Integrated react-window List component to virtualize the items list, ensuring smooth rendering even with a large number of items.
Trade-off: Added an extra dependency (react-window) to the project, which slightly increases bundle size and adds minor complexity, but significantly improves performance for large lists

## 4. UI/UX Polish & Skeleton Loading
Enhanced the frontend styling using Material UI components for a modern and consistent look with dark/light theming.
Added responsive navigation, modernized list items, pagination buttons, and a search bar.
Implemented skeleton loading states for the items list while data is being fetched to improve perceived performance and UX.
Trade-off: Introduces additional dependency (Material UI) and slightly more complex styling logic, but significantly improves usability, accessibility, and overall user experience.

Added minimal frontend tests for all components and pages, covering loading states, user interactions, and data rendering, with fetches and context mocked as needed.