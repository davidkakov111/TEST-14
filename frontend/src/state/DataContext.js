import { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async ({ limit, page, q } = {}) => {
    // Build query params dynamically
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (page) params.append('page', page);
    if (q) params.append('q', q);

    const res = await fetch(`http://localhost:3001/api/items?${params.toString()}`);
    const json = await res.json();
    return json;
  }, []);

  const fetchItemsSafe = useCallback(async (activeRef, pageNum, limit, q) => {
    const json = await fetchItems({limit, page: pageNum, q});

    // Prevent memory leak by checking if the component is still mounted before updating state
    if (activeRef.current) {
      setItems(json.items);
    }
    return json.total;
  }, [fetchItems]);

  return (
    <DataContext.Provider value={{ items, fetchItems: fetchItemsSafe }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);